
import React, { useState } from 'react';
import { getSolarConsultation } from '../services/geminiService';
import { SolarEstimateRequest, SolarEstimateResponse } from '../types';

const Calculator: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<SolarEstimateRequest>({
    monthlyBill: 150,
    roofType: 'Bardeaux d\'Asphalte',
    state: 'France',
    sunlightHours: 'Haute Exposition'
  });
  const [result, setResult] = useState<SolarEstimateResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await getSolarConsultation(formData);
      setResult(data);
    } catch (err) {
      setError("Échec de la génération de l'estimation. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="calculator" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-start">
          
          <div className="mb-12 lg:mb-0">
            <h2 className="text-[#FFC600] font-black tracking-widest uppercase text-xs mb-3">Moteur d'Innovation</h2>
            <h3 className="text-4xl font-extrabold text-[#0D3156] mb-6 leading-tight">
              Conseiller en <span className="text-[#4A6278] underline decoration-[#FFC600]/30 italic">Économies Solaires</span>
            </h3>
            <p className="text-lg text-[#4A6278] mb-8 leading-relaxed">
              Obtenez instantanément un audit énergétique calculé par IA. AD Innovation Services Plus analyse votre emplacement et vos factures pour fournir des estimations de précision.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6 bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-[#0D3156] mb-2">Facture Mensuelle ($)</label>
                  <input 
                    type="number" 
                    value={formData.monthlyBill}
                    onChange={(e) => setFormData({...formData, monthlyBill: parseInt(e.target.value)})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0D3156] focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-[#0D3156] mb-2">Localisation</label>
                  <input 
                    type="text" 
                    placeholder="ex: Paris, France"
                    value={formData.state}
                    onChange={(e) => setFormData({...formData, state: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0D3156] focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-[#0D3156] mb-2">Type de Toit</label>
                  <select 
                    value={formData.roofType}
                    onChange={(e) => setFormData({...formData, roofType: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0D3156] focus:border-transparent outline-none transition-all bg-white"
                  >
                    <option>Tuiles</option>
                    <option>Métal</option>
                    <option>Ardoise</option>
                    <option>Toit plat</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-[#0D3156] mb-2">Exposition</label>
                  <select 
                    value={formData.sunlightHours}
                    onChange={(e) => setFormData({...formData, sunlightHours: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0D3156] focus:border-transparent outline-none transition-all bg-white"
                  >
                    <option>Exposition Élevée</option>
                    <option>Exposition Moyenne</option>
                    <option>Faible Exposition</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-[#0D3156] text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-[#1a457a] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#0D3156]/10 disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <i className="fa-solid fa-circle-notch animate-spin"></i>
                    Analyse en cours...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-bolt text-[#FFC600]"></i>
                    Générer le rapport IA
                  </>
                )}
              </button>
              {error && <p className="text-red-500 text-xs font-bold text-center uppercase tracking-widest">{error}</p>}
            </form>
          </div>

          <div className="relative">
            {result ? (
              <div className="bg-white rounded-3xl p-8 border-4 border-[#0D3156] shadow-2xl relative z-10 animate-in fade-in zoom-in duration-500">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-[#FFC600] rounded-xl flex items-center justify-center text-[#0D3156]">
                    <i className="fa-solid fa-chart-line text-xl"></i>
                  </div>
                  <h4 className="text-2xl font-black uppercase tracking-tighter text-[#0D3156]">Résumé de l'Audit</h4>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-4 bg-[#0D3156]/5 rounded-2xl border border-[#0D3156]/10">
                    <span className="text-[#0D3156] text-[10px] font-black uppercase tracking-[0.2em] block mb-1">Économies</span>
                    <span className="text-3xl font-black text-[#0D3156]">{result.potentialSavings}</span>
                  </div>
                  <div className="p-4 bg-[#FFC600]/10 rounded-2xl border border-[#FFC600]/20">
                    <span className="text-[#FFC600] text-[10px] font-black uppercase tracking-[0.2em] block mb-1">Panneaux</span>
                    <span className="text-3xl font-black text-[#0D3156]">{result.recommendedPanels}</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <h5 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#0D3156] mb-2">
                      <i className="fa-solid fa-leaf text-green-500"></i> Impact Éco
                    </h5>
                    <p className="text-sm font-bold text-[#4A6278]">{result.environmentalImpact}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <h5 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#0D3156] mb-2">
                      <i className="fa-solid fa-calendar-check text-[#FFC600]"></i> Amortissement
                    </h5>
                    <p className="text-sm font-bold text-[#4A6278]">{result.paybackPeriod}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-100">
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-[#0D3156] mb-2">Note du Conseiller</h5>
                    <p className="text-sm italic font-medium text-[#4A6278] leading-relaxed">"{result.advice}"</p>
                  </div>
                </div>

                <button className="mt-8 w-full border-2 border-[#0D3156] text-[#0D3156] py-3 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-slate-50 transition-all">
                  Télécharger les données d'ingénierie
                </button>
              </div>
            ) : (
              <div className="h-full min-h-[500px] flex flex-col items-center justify-center text-center p-12 bg-[#0D3156]/5 rounded-3xl border-2 border-dashed border-[#0D3156]/10 group">
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-500 shadow-xl">
                  <i className="fa-solid fa-calculator text-3xl text-[#FFC600]"></i>
                </div>
                <h4 className="text-xl font-black uppercase tracking-widest text-[#0D3156] mb-2">Prêt pour l'Audit</h4>
                <p className="text-[#4A6278] text-sm font-medium max-w-xs uppercase tracking-tight">Saisissez vos paramètres pour commencer l'analyse énergétique.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

const calculator: React.FC = () => {
  return null; // This tells React to render nothing
};

export default calculator;
// export default Calculator;
