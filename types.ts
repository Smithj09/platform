
export interface SolarEstimateRequest {
  monthlyBill: number;
  roofType: string;
  state: string;
  sunlightHours: string;
}

export interface SolarEstimateResponse {
  potentialSavings: string;
  recommendedPanels: number;
  environmentalImpact: string;
  paybackPeriod: string;
  advice: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  isAdmin?: boolean;
  createdAt?: string;
  lastLogin?: string;
}

