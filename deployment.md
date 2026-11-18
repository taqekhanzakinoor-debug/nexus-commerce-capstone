# Vercel deployment log and verification

**Status:** Not yet deployed. No live URL is claimed by this source package.

## Platform: Vercel

1. Upload your code to your personal GitHub repo, with `package.json` at repository root.
2. Import that GitHub repository into https://vercel.com/new.
3. Use **Vite** preset, **`npm install`** installation, **`npm run build`** build, **`dist`** output, and **`./`** root directory.
4. `vercel.json` configures Vite and rewrites `/admin` to `/index.html` for direct browser visits/refreshes.
5. Visit the public storefront and direct `<actual-deployment-url>/admin` after publishing. Capture screenshot evidence and only then update README with actual URL.

For detailed step-by-step instructions see [`GO_LIVE_GUIDE.md`](GO_LIVE_GUIDE.md).

## Actual deployment attempt record — complete after attempting

- **Date/time:** Not attempted yet
- **Hosting platform:** Vercel (planned)
- **GitHub repository URL:** Not provided yet
- **Steps actually performed:** None yet
- **Build/deployment outcome:** Not yet verified
- **Build error details (if any):** Not applicable yet
- **Public website URL:** Not yet available
- **Verified storefront `/` and direct `/admin` reload:** Not yet tested
- **Local fallback:** `npm install && npm run dev`

## Browser-only demo limitations

Orders placed in one browser do **not** appear in other users' browsers. The CRM displays seeded fictional records and any orders created within the current browser origin. Merchant login is client-side and does **not** protect database or browser storage access. Do not store real customer details or accept real payments.
