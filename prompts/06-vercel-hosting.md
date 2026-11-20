# Phase 3 host selection: Vercel — actual user prompt log

## Feature/problem

The project previously offered Netlify as the primary suggested host, but the user requires **Vercel**. Remove Netlify-specific files and update the deployment instructions while preserving direct `/admin` navigation and the capstone evidence structure.

## Exact prompt from user

`no ihave to use vercel`

## Context supplied

- The user had just been given v5 GitHub/Netlify-first deployment instructions.
- This is a React/Vite storefront with client-side `/admin` route, fictional records, and browser `localStorage` persistence.
- The GDGoC capstone brief requires a genuine deployment attempt and honest documentation, not necessarily a successful hosted link.

## Implementation mapping

- `vercel.json`: explicit Vite framework, Vite build/output paths, `/admin` fallback rewrites.
- `docs/GO_LIVE_GUIDE.md`: Vercel-only steps and live verification checklist.
- `docs/deployment.md`: truthful deployment-attempt record.
- `README.md`: Vercel as deployment platform and published-app limitations.
- `docs/SUBMISSION_CHECKLIST.md`: Vercel as required platform.
- `.gitignore`: excludes local Vercel CLI metadata.
- Removed `netlify.toml` and `public/_redirects` (Netlify-only files).

## Verification performed by assistant

- Vercel's official documentation consulted for Vite deployment, Git import and SPA rewrites.
- Local project structure check and dependency-free Node unit tests re-run on the updated package, with outcomes recorded in `docs/testing.md` if successful.
- **Not yet verified:** Vercel-hosted deployment, GitHub upload, interactive browser workflow, screenshots or production build unless explicitly recorded elsewhere.

## Remaining limitation

Client-side login is demonstrative only and browser storage does not sync orders across devices; this remains unsuitable for real customer data.
## Later Live Deployment Verification

### Deployment Platform
Vercel

### Live Website
https://nexus-commerce-capstone-eta.vercel.app

### GitHub Repository
https://github.com/taqekhanzakinoor-debug/nexus-commerce-capstone

### Deployment Issues Resolved
- Corrected the React entry-file path.
- Fixed missing product images.
- Uploaded changes using VS Code and GitHub.
- Successfully deployed the updated website.

### Live Testing Results
- Storefront loaded successfully.
- All eight product images displayed correctly.
- Shopping cart worked.
- Simulated checkout created a test order.
- Order appeared in the Merchant CRM.
- Order status remained saved after refresh.
- Merchant login worked on the live website.

### Limitations
- Checkout is simulated; no real payments.
- Merchant authentication is demo-only.
- Orders are stored in browser localStorage,
  not a shared database.