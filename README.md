# NEXUS Commerce — Capstone Prototype v0.5 (React + Vite, Vercel deployment configuration)

An educational e-commerce storefront connected to a mini CRM dashboard, built for the **GDGoC CUI Wah "Beyond Prompting"** capstone. This is a **fictional single-browser prototype**, not a production shopping service. **Deployment platform: Vercel.**

## Main features

- Responsive storefront with 8 fictional illustrated products, categories, search, stock availability, product details.
- Cart quantities and totals, simulated checkout, confirmation receipt with order ID.
- Merchant CRM with seeded demo orders/inquiries, updates to order status and inquiry notes, simple metrics.
- Shared demo state through browser `localStorage` (in one browser only).
- A **hidden merchant entry route** and **demo login screen**; no CRM links or controls in the public storefront, receipt, or footer.
- Direct merchant entry at `/admin`, sign in and sign out. Login state lives in `sessionStorage` for the active tab session.
- No live payment processing or real customer data. Use invented names, emails and addresses.

## How to run

Requires Node.js 20.19+ or 22.12+ and npm.

```bash
npm install
npm run dev
```

Visit the address printed in the terminal (usually `http://localhost:5173`).

```bash
npm test        # 16 pure-logic Node tests, no third-party packages needed
npm run check  # static structure checks, NOT a browser test
npm run build  # production build, after npm install
npm run preview
```

## Demo merchant login

Customer storefront: **`http://localhost:5173/`**

Merchant login: **`http://localhost:5173/admin`** (enter this address directly; not linked from customer pages)

| Field | Fictional demo value |
| --- | --- |
| Username | `merchant` |
| Password | `NexusDemo2026!` |

If an error stays visible after correcting an entry, click **Sign in to CRM** again. In this revision, editing either field clears the previous error, and accidental leading/trailing spaces are ignored. Username/password spelling and capitalization must still match.

- Invalid credentials show an error instead of the dashboard.
- Correct demo credentials display the merchant CRM.
- The **Sign out** button returns you to the login screen, and a reload after sign-out stays signed out.
- The same tab's session can stay signed in through a refresh; a fresh session requires logging in again.

**Critical security limitation:** This is a **client-side visual login gate only**. Username and password are deliberately shipped with frontend source code, and records are still accessible/alterable in browser storage/dev tools. This is **not secure authentication**, does **not** protect customer information, and does **not** authorize real access. Do not use the demo password for any actual account. For real merchant privacy, move orders/inquiries/inventory to a backend or hosted database and require **server-enforced authorization** for every CRM API request (for example, a managed auth + database solution). Never collect real private details with this version.

## How to demonstrate storefront → CRM

1. Open `/` and confirm that the CRM is **not in the navigation**, promotional section, footer, or order receipt.
2. Find an item, add it to cart, enter **fictional** checkout details, and submit.
3. Save the resulting order ID shown in the receipt.
4. Manually navigate to `/admin` in the same browser.
5. Test a wrong login, then log in with the fictional demo credentials above.
6. Find your order ID in the CRM, change its status, and refresh to check persistence.
7. Select **Sign out**; verify dashboard is hidden. Open `/admin` again and verify login is required.
8. Return to storefront, create a fictional inquiry; revisit `/admin`, sign in and edit its status and note.

Browser localStorage is scoped to the same browser origin; orders will **not sync between different users, computers, or devices**. Its contents are not protected by the login UI.

## Structure

```text
nexus-commerce/
├── index.html
├── src/
│   ├── App.jsx                   # Storefront, CRM, demo login, routing
│   ├── authDemo.js               # DEMO-ONLY account validation/session logic
│   ├── data.js                   # 8 products, fictional orders/inquiries
│   ├── storeLogic.js             # Cart/checkout functions
│   ├── usePersistentState.js     # localStorage persistence
│   └── styles.css
├── public/images/              # Original SVG product images
├── tests/                      # 12 store tests + 4 demo-login tests
├── scripts/check-project.mjs
├── prompts/                    # Actual prompts and iterations
├── docs/                       # Architecture, tests, deployment
├── screenshots/                # Fill with genuine application screenshots
├── .env.example                # Placeholders; no secrets
└── .gitignore
```

## Verification so far (18 November 2026)

- ✅ 16/16 `node:test` tests passed (12 store-logic + 4 route/login/session).
- ✅ Static project structure and basic feature-marker checks passed.
- ⏳ Dependency installation (`EAI_AGAIN` from npm registry), Vite production build, interactive browser tests, actual screenshot capture, GitHub upload and deployment have **not** been completed here. See `docs/testing.md`.

## Phase 3 — Publish and submit with Vercel

**Next action for the project owner:** follow [`docs/GO_LIVE_GUIDE.md`](docs/GO_LIVE_GUIDE.md) to publish the project in your own GitHub repository, then import that repository into Vercel. Use [`docs/SUBMISSION_CHECKLIST.md`](docs/SUBMISSION_CHECKLIST.md) to record only tests and publication milestones actually completed.

The project includes `.github/workflows/verify.yml` for GitHub-hosted checks and `vercel.json` for Vite build settings and SPA routing to `/admin`. No hosted deployment or interactive production browser test has been performed as part of this package.

## Deployment and submission

Vercel settings: framework preset **Vite**, root directory **`./`** (select the folder containing `package.json`), install command **`npm install`**, build command **`npm run build`**, output directory **`dist`**. The included `vercel.json` rewrites `/admin` to the SPA's `index.html` so refreshing the admin login route can work on a static host. After deploying, manually verify both the home page and the login URL.

Record original prompts, actual tests, screenshots and genuine deployment attempts. The assignment PDF states the submission deadline as **25 November 2026, 4:30 PM PKT**.

## Remaining improvements

Replace browser-only local data with a real database for multi-device use, add genuinely secure merchant authentication/authorization, improve browser-test coverage, and verify responsive UX on actual devices.
