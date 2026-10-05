const numberFormatter = new Intl.NumberFormat('en-GB', { maximumFractionDigits: 0 })
export const number = (value: number) => numberFormatter.format(value)
export const money = (value: number) => `${number(value)} kr`

export const priceDifference = (price: number, referencePrice: number) =>
  price === referencePrice ? 'The same price' : `${money(Math.abs(price - referencePrice))} ${price < referencePrice ? 'less' : 'more'}`
