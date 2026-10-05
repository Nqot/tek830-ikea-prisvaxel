import assert from 'node:assert/strict'
import { test } from 'node:test'
import { alternative, evaluateCampaign, finalPrice, meetsProductNeeds, scenarios } from '../src/data/demo.ts'
import { priceDifference } from '../src/lib/format.ts'

test('moderate demand stays within the example limits at the default discount', () => {
  const result = evaluateCampaign(scenarios.planned, 150)
  assert.equal(result.units, 110)
  assert.equal(result.climateKg, 3350)
  assert.equal(result.materialKg, 1040)
  assert.equal(result.discountSpend, 10500)
  assert.equal(result.revenue, 95390)
  assert.ok(result.climateWithinLimit && result.materialWithinLimit && result.discountWithinLimit)
})

test('additional demand can exceed environmental limits despite lower impact per product', () => {
  const result = evaluateCampaign(scenarios.growth, 100)
  assert.equal(result.climateKg, 4100)
  assert.equal(result.materialKg, 1280)
  assert.equal(result.discountSpend, 10000)
  assert.ok(!result.climateWithinLimit && !result.materialWithinLimit)
  assert.ok(result.discountWithinLimit)
})

test('changing a discount never pretends to predict different demand', () => {
  const withoutDiscount = evaluateCampaign(scenarios.planned, 0)
  const withDiscount = evaluateCampaign(scenarios.planned, 150)
  assert.equal(withoutDiscount.climateKg, withDiscount.climateKg)
  assert.equal(withoutDiscount.units, withDiscount.units)
  assert.equal(withoutDiscount.discountSpend, 0)
  assert.equal(withoutDiscount.revenue - withDiscount.revenue, 10500)
})

test('price comparisons describe more, less and the same without negative savings', () => {
  assert.equal(priceDifference(finalPrice(alternative, 0), 899), '100 kr more')
  assert.equal(priceDifference(finalPrice(alternative, 100), 899), 'The same price')
  assert.equal(priceDifference(finalPrice(alternative, 150), 899), '50 kr less')
})

test('products cannot match a space that is too narrow or a shelf requirement they cannot meet', () => {
  assert.equal(meetsProductNeeds(alternative, 60, 2), false)
  assert.equal(meetsProductNeeds(alternative, 80, 3), false)
  assert.equal(meetsProductNeeds(alternative, 80, 2), true)
})
