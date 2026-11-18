# Context engineering evidence — initial version

This document describes **context that informed the generated code**, rather than pretending to capture a prompt that was never given.

## Source context

**User supplied:** `Beyond_Prompting_GDGoC_CUI_Wah_Capstone_Assignment_2026.pdf` (6 pages).

**Requirements extracted and applied:**

- Responsive catalog with product image, name, price, availability and filtering.
- Product details, quantity-editable cart, visible total and simulated checkout.
- Checkout produces an order visible to merchant view.
- CRM order ID/items/customer/total/status and fictional inquiry list/notes.
- Shared coherent data, persistence, validation, empty states, no live payments.
- Exact prompt logs, `.gitignore`, `.env.example`, README, deployment attempt.

## Concrete context dataset

We created *fictional* records in `src/data.js` because no real product data was supplied:

- 8 demo products across Home / Lifestyle / Tech / Stationery.
- 2 fictional seeded orders and 3 fictional seeded inquiries.
- Price in PKR; fixed sample inventory per product.
- Self-contained original SVGs in `public/images/`.

## Context constraints applied

- Browser-only `localStorage`; explicitly label it as **single browser** persistence.
- No real payment details, payment processing, API keys, authentication claims or genuine customer profiles.
- Shared order data in storefront and CRM with order status changes saved locally.
- Missing or sold-out products cannot be added; checkout validates form and stock.

## Verification mapping

- `src/data.js` → product/seed schema; manually inspect or run static checks.
- `src/App.jsx` → search/cart/checkout/CRM; **must be tested in a real browser**.
- `src/usePersistentState.js` → storage writes; refresh test required.
- `docs/testing.md` → record truthful outcomes.

**Next context iteration:** Replace fictional products with a product list the project owner chooses, then test each displayed product against the actual dataset.
