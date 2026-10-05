# Prisväxeln

A TEK830 Sustainable digitalization prototype exploring how IKEA could make a comparable lower-impact product more affordable while considering the total effect of increased demand.

## Run locally

From this `app` folder, run:

```sh
npm install
npm run dev
```

Open the local URL shown by Vite. Keep the development server running while working. `npm run build` creates a production build; `npm run lint` checks the source. With Node 24, `npm test` checks campaign accounting, price comparisons and practical matching boundaries.

## Prototype views

- **The idea** introduces the affordability problem, Emma, the proposed process and its environmental, social and economic scope.
- **For the customer** lets Emma change a storage cabinet's maximum width, minimum shelf count and budget, then compare a fictional product pair and choose an example.
- **For IKEA** lets a visitor set one of three illustrative discounts. The customer view uses that same offer. Two fixed demand scenarios show how additional purchases could outweigh per-product improvements.
- **Data & assumptions** describes the example values, rules, proposed sustainability indicators and limits. Revenue is not profit; modelled product figures do not establish overall sustainability.

The offer, products, prices, matching rules and campaign scenarios are hardcoded teaching examples. The selected offer exists only in browser memory and resets on refresh. The app has no backend, accounts, checkout, live product feed or connection to IKEA systems. It does not predict demand or verify environmental impact.

## Source structure

- `src/pages/` contains the project, customer, IKEA and method views.
- `src/components/` contains the shared layout, product cards and original SVG cabinet illustration.
- `src/data/demo.ts` contains the demonstration dataset and simple campaign accounting. Demand assumptions stay independent of the chosen discount.
- `src/types/domain.ts` describes the product and scenario types.
- `src/lib/format.ts` keeps price and number formatting consistent.
