const numberFormatter = new Intl.NumberFormat('en-GB', { maximumFractionDigits: 0 })
export const number = (value: number) => numberFormatter.format(value)
export const money = (value: number) => `${number(value)} kr`
