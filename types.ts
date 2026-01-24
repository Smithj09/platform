
export interface Formation {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  instructor: string;
  capacity: number;
  enrolled: number;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  category: string;
  price: number;
  image?: string;
  createdAt: string;
}

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

