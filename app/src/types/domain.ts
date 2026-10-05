export interface Product {
  id: string
  category: 'storage-cabinet'
  name: string
  description: string
  finish: string
  price: number
  discount: number
  width: number
  depth: number
  height: number
  capacity: string
  adjustableShelves: number
  climateKg: number
  virginMaterialKg: number
  illustration: 'original' | 'alternative'
}

export interface CampaignScenario {
  id: 'planned' | 'growth'
  label: string
  additionalPurchases: number
}
