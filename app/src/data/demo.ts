import type { CampaignScenario, Product } from '../types/domain'

// Synthetic teaching data, not IKEA product, price or lifecycle assessment data.
export const products: Product[] = [
  { id: 'original', category: 'storage-cabinet', name: 'Everyday storage', description: 'Cabinet with two doors', finish: 'Light oak effect', price: 899, discount: 0, width: 80, depth: 40, height: 90, capacity: 'Two adjustable shelves', adjustableShelves: 2, climateKg: 40, virginMaterialKg: 12, illustration: 'original' },
  { id: 'alternative', category: 'storage-cabinet', name: 'Considered storage', description: 'Cabinet with two doors', finish: 'Warm white', price: 999, discount: 150, width: 80, depth: 40, height: 90, capacity: 'Two adjustable shelves', adjustableShelves: 2, climateKg: 25, virginMaterialKg: 8, illustration: 'alternative' },
]

export const original = products[0]
export const alternative = products[1]
export const finalPrice = (product: Product, activeDiscount = product.discount) =>
  product.price - (product.id === 'alternative' ? activeDiscount : 0)
export const offerDiscountOptions = [0, 100, 150] as const
export function meetsProductNeeds(product: Product, maximumWidth: number, minimumShelves: number) {
  return product.category === 'storage-cabinet' && product.width <= maximumWidth && product.adjustableShelves >= minimumShelves
}
export const exampleNeeds = { budget: '900', maxWidth: '80', minimumShelves: '2' }
export const campaignAssumptions = { baselineUnits: 100, switches: 60 }
export const baseline = {
  units: campaignAssumptions.baselineUnits,
  climateKg: campaignAssumptions.baselineUnits * original.climateKg,
  materialKg: campaignAssumptions.baselineUnits * original.virginMaterialKg,
  revenue: campaignAssumptions.baselineUnits * original.price,
}
export const limits = { climateKg: baseline.climateKg * 0.9, materialKg: baseline.materialKg * 0.9, discountBudget: 12000 }
export const scenarios: Record<CampaignScenario['id'], CampaignScenario> = {
  planned: { id: 'planned', label: 'Moderate demand', additionalPurchases: 10 },
  growth: { id: 'growth', label: 'Higher demand', additionalPurchases: 40 },
}

// Simple accounting for stated assumptions; this does not predict customer behaviour.
export function evaluateCampaign(scenario: CampaignScenario, discount: number) {
  const originalUnits = baseline.units - campaignAssumptions.switches
  const alternativeUnits = campaignAssumptions.switches + scenario.additionalPurchases
  const climateKg = originalUnits * original.climateKg + alternativeUnits * alternative.climateKg
  const materialKg = originalUnits * original.virginMaterialKg + alternativeUnits * alternative.virginMaterialKg
  const discountSpend = alternativeUnits * discount
  return {
    originalUnits, alternativeUnits, units: originalUnits + alternativeUnits,
    climateKg, materialKg, discountSpend,
    revenue: originalUnits * original.price + alternativeUnits * finalPrice(alternative, discount),
    climateWithinLimit: climateKg <= limits.climateKg,
    materialWithinLimit: materialKg <= limits.materialKg,
    discountWithinLimit: discountSpend <= limits.discountBudget,
  }
}
