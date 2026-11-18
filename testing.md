# Test log

## Completed in artifact-generation environment (18 November 2026)

- [x] Source structure and expected file names created.
- [x] Static project consistency check (`node scripts/check-project.mjs`) passed.
- [x] `npm test` equivalent, `npm test` (`node --test tests/*.test.js`): **16 tests passed, 0 failed** (12 store rules + 4 demo-login helpers).
- [x] JavaScript/JSX parsing check for `App.jsx`, `main.jsx`, `storeLogic.js`, `authDemo.js`: **0 syntax errors**.

## Not yet verified — run in your browser after `npm install`

Mark an item only after running the scenario and observing its actual result. Record errors honestly.

- [ ] Homepage loads on desktop at `http://localhost:5173`.
- [ ] Homepage and navigation work on a narrow mobile viewport.
- [ ] Category tabs filter visible products.
- [ ] Text search returns matching products; unmatched query shows an empty state.
- [ ] Product details open; sold-out product cannot be added.
- [ ] Cart add / remove / quantity update changes correct subtotal.
- [ ] Empty cart state displays appropriately.
- [ ] Checkout with bad email or incomplete fields displays an error.
- [ ] Successful demo checkout displays a visible receipt with order ID, items, and total, **without** a CRM link.
- [ ] Customer-facing header, footer, promotional section, and receipt do **not** expose a CRM link.
- [ ] Direct `/admin` URL shows login when not signed in; refresh at `/admin` still works.
- [ ] Invalid demo username/password shows an error, no dashboard.
- [ ] Correct demo credentials sign in; CRM dashboard becomes visible.
- [ ] The **Sign out** button hides CRM; reloading `/admin` requires login.
- [ ] Browser back/forward between `/` and `/admin` stays in sync.
- [ ] New order appears in CRM after signing in and decrements local inventory.
- [ ] CRM shows that order with ID, customer, items, value and status.
- [ ] Order status persists after refreshing the page.
- [ ] Demo inquiry appears in CRM; inquiry status and notes persist after refresh.
- [ ] Reset demo restores fictional orders, inquiries, cart and stock.
- [ ] `npm run build` succeeds on developer machine.
- [ ] Deployment URL works (or document failure in `docs/deployment.md`).

## Observed limitations

**Dependency installation and live browser verification not performed in the artifact-generation environment** because access to the npm package registry was unavailable in the initial build attempt. These are necessary next steps, not completed tests.

The new admin login is UI-only: its public demo password is shipped in the frontend; localStorage remains accessible independently of sign-in. Browser localStorage is a single-user, single-origin demo, not a server database. Real payment details must never be entered.

## Phase 3 build/deploy preparation (18 November 2026)

- [x] Local `npm test` run completed: 16 logic tests passed.
- [x] Local `npm run check` run completed after packaging.
- [x] GitHub Actions verification workflow added (not yet executed on GitHub). The earlier Netlify build configuration was removed in the Vercel-specific revision.
- [ ] `npm install` — attempted locally, failed with `getaddrinfo EAI_AGAIN registry.npmjs.org`; retry on your connected computer.
- [ ] `npm run build` — not run successfully because dependencies could not be fetched.
- [ ] Hosted deployment and `/admin` deep link tested.

## Vercel configuration pass (18 November 2026)

- [x] `npm test`: 16/16 Node unit tests passed with the Vercel-configured source.
- [x] `npm run check`: 22 required project files and eight product images checked.
- [x] `vercel.json`: inspected for Vite framework, `npm run build`, `dist`, and client-side `/admin` rewrites.
- [ ] `npm run build`: not verified on this Vercel package without npm dependencies.
- [ ] Vercel import and hosted deployment: not performed, pending user's GitHub/Vercel accounts.
- [ ] Public browser testing of `/` and direct `/admin`: pending after hosted deployment.
