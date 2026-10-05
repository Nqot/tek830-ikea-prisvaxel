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
export const availableCategories = ['Storage cabinet'] as const
export const offerDiscountOptions = [0, 100, 150] as const
export function meetsProductNeeds(product: Product, maximumWidth: number, minimumShelves: number) {
  return product.category === 'storage-cabinet' && product.width <= maximumWidth && product.adjustableShelves >= minimumShelves
}
export const limits = { climateKg: 3600, materialKg: 1080, discountBudget: 12000 }
export const baseline = { units: 100, climateKg: 4000, materialKg: 1200, revenue: 89900 }
export const scenarios: Record<CampaignScenario['id'], CampaignScenario> = {
  planned: { id: 'planned', label: 'Moderate demand', additionalPurchases: 10, units: 110, climateKg: 3350, materialKg: 1040 },
  growth: { id: 'growth', label: 'Higher demand', additionalPurchases: 40, units: 140, climateKg: 4100, materialKg: 1280 },
}
