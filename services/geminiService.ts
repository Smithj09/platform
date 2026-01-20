
import { GoogleGenAI, Type } from "@google/genai";
import { SolarEstimateRequest, SolarEstimateResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const getSolarConsultation = async (request: SolarEstimateRequest): Promise<SolarEstimateResponse> => {
  const prompt = `
    Agis en tant que consultant professionnel en énergie solaire et ingénierie électrique pour "AD Innovation Services Plus".
    Calcule une estimation d'installation solaire basée sur ces détails :
    - Facture d'électricité mensuelle : ${request.monthlyBill}$
    - Type de toit : ${request.roofType}
    - Localisation : ${request.state}
    - Exposition au soleil : ${request.sunlightHours}

    Fournis une réponse d'ingénierie professionnelle exclusivement en français et au format JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            potentialSavings: { type: Type.STRING, description: "Économies mensuelles estimées en dollars" },
            recommendedPanels: { type: Type.NUMBER, description: "Nombre estimé de panneaux solaires nécessaires" },
            environmentalImpact: { type: Type.STRING, description: "Équivalent réduction CO2" },
            paybackPeriod: { type: Type.STRING, description: "Années estimées pour le retour sur investissement" },
            advice: { type: Type.STRING, description: "Bref conseil professionnel pour cet utilisateur spécifique" }
          },
          required: ["potentialSavings", "recommendedPanels", "environmentalImpact", "paybackPeriod", "advice"]
        }
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Erreur lors de la consultation solaire:", error);
    throw new Error("Impossible de calculer l'estimation pour le moment.");
  }
};
