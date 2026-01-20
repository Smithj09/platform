
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

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  comment: string;
  rating: number;
  image: string;
}

export interface NavItem {
  label: string;
  href: string;
}
