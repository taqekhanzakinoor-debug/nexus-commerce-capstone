# 03 — Remove customer-facing CRM links and add demo merchant login

## Feature / problem
The user wanted the merchant CRM hidden from ordinary customer navigation and accessible through a login screen.

## Actual user prompt (verbatim)

> can we hide merchant crm and give it a login

## Context given to the assistant
The existing React/Vite NEXUS-COMMERCE v0.2 prototype exposed the merchant CRM through its header, promotional CTA, footer and checkout receipt. It uses a single-browser localStorage store with fictional orders and inquiries. The uploaded capstone assignment requires a customer storefront and usable mini CRM; secure role separation is explicitly an optional advanced extension. No real customer data, backend, account service or user-supplied credentials were provided.

## Implementation choices / iterations

1. Removed navigation, promotional, footer and receipt links exposing the CRM.
2. Added a dedicated `/admin` route; the address can be entered directly (and reloaded with an SPA fallback).
3. Added a merchant login form with username/password, invalid-login feedback, a show/hide password control and a sign-out button.
4. Added sessionStorage tracking for demo sign-in state and protected the *rendering* of the CRM behind that state.
5. Used fictional demo credentials documented in README. Explicitly labeled **client-side login as a UI gate, not security**.
6. Replaced customer-facing CRM references in inquiry/receipt messages with neutral customer copy.
7. Added four unit tests for route resolution, demo credential validation, session set/remove and blocked-storage fallback.

## Implementation mapping

- `src/App.jsx` — login form, gated view, route handling, sign out, removed public links.
- `src/authDemo.js` — demo-only credentials/session helpers.
- `src/styles.css` — responsive login styles and logout button.
- `tests/authDemo.test.js` — four Node tests.
- `README.md` — exact demo access steps and limitations.
- `docs/architecture.md` — revised diagram; `docs/testing.md` — browser test checklist.

## Verification actually performed

- `npm test`: 16/16 tests pass (12 original + 4 added) in local artifact environment.
- `npm run check`: static project check passes after updating old CRM link marker assertions.
- Live browser login/logout and deployment-based route handling **remain to be tested**. No screenshot, account security, server authorization or successful deployment is claimed.

## Limitations

The frontend credentials are visible to anyone inspecting the shipped JavaScript. LocalStorage data is accessible regardless of the displayed login state. This is appropriate only as a fictional prototype UX demonstration, **not real access control**. A proper implementation needs server-side authorization and a shared database.
## Later Improvements and Live Verification

### Login Navigation Improvement

The user requested a way to access merchant login
directly from the customer storefront.

- Added a Login button to the storefront navigation.
- Connected the button to the existing /admin route.
- Corrected a duplicate Login button.
- Kept the CRM accessible through the merchant sign-in screen.

### Live Testing Results

- Merchant login page opened on Vercel.
- Merchant login worked successfully.
- Test checkout orders appeared in the CRM.
- Order status updates remained saved after refresh.
- Storefront and CRM navigation were tested.

### Remaining Limitation

Merchant authentication is client-side and intended
only for demonstration. It does not provide secure
access control for real customer data.