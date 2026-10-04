export interface Product {
  id: string
  name: string
  description: string
  finish: string
  price: number
  discount: number
  width: number
  depth: number
  height: number
  capacity: string
  climateKg: number
  virginMaterialKg: number
  illustration: 'original' | 'alternative'
}

export interface CampaignScenario {
  id: 'planned' | 'growth'
  label: string
  additionalPurchases: number
  units: number
  climateKg: number
  materialKg: number
  revenue: number
  discountSpend: number
  withinLimits: boolean
  explanation: string
}
