import type { CampaignScenario, Product } from '../types/domain'

// Synthetic teaching data, not IKEA product, price or lifecycle assessment data.
export const products: Product[] = [
  { id: 'original', name: 'Everyday storage', description: 'Cabinet with two doors', finish: 'Light oak effect', price: 899, discount: 0, width: 80, depth: 40, height: 90, capacity: 'Two adjustable shelves', climateKg: 40, virginMaterialKg: 12, illustration: 'original' },
  { id: 'alternative', name: 'Considered storage', description: 'Cabinet with two doors', finish: 'Warm white', price: 999, discount: 150, width: 80, depth: 40, height: 90, capacity: 'Two adjustable shelves', climateKg: 25, virginMaterialKg: 8, illustration: 'alternative' },
]

export const original = products[0]
export const alternative = products[1]
export const finalPrice = (product: Product) => product.price - product.discount
export const limits = { climateKg: 3600, materialKg: 1080, discountBudget: 12000 }
export const baseline = { units: 100, climateKg: 4000, materialKg: 1200, revenue: 89900 }
export const scenarios: Record<CampaignScenario['id'], CampaignScenario> = {
  planned: { id: 'planned', label: 'Moderate demand', additionalPurchases: 10, units: 110, climateKg: 3350, materialKg: 1040, revenue: 95390, discountSpend: 10500, withinLimits: true, explanation: 'This example stays within the campaign’s climate, material and discount limits. It is a candidate for further evaluation, not proof of real-world impact.' },
  growth: { id: 'growth', label: 'Higher demand', additionalPurchases: 40, units: 140, climateKg: 4100, materialKg: 1280, revenue: 120860, discountSpend: 15000, withinLimits: false, explanation: 'Additional purchases outweigh the benefit of switching. Total emissions and material use exceed the baseline, and all three campaign limits are exceeded.' },
}
