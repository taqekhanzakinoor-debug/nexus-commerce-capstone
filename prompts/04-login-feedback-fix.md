# Login feedback fix — actual troubleshooting record

## Problem
A user screenshot showed the correct demo credentials in the merchant login inputs while an "incorrect username or password" alert remained visible. The alert may have been from an earlier submit because the existing form only cleared errors after a successful submit. The screenshot alone does not establish a credential-validator defect.

## Request actually supplied
The user supplied a screenshot of the `/admin` login view displaying a red incorrect-credentials alert, with `merchant` and `NexusDemo2026!` visible in the fields.

## Context
- React `AdminLogin` component in `src/App.jsx`.
- `validDemoCredentials` in `src/authDemo.js`.
- Demo-only credentials in `README.md`.
- Must retain the separate merchant route and browser-only demonstration limitation.

## Implemented improvement
- Clear a stale error alert when the user edits either login field.
- Ignore leading/trailing whitespace in demo credential validation while retaining case-sensitive spelling.
- Clarify retry instructions in the README.

## Verification
- Confirmed supplied credentials match the values in source.
- Node unit suite passes, including a test of copied credentials with surrounding whitespace and rejection of wrong capitalization.
- Browser interaction not yet tested in a running app.

## Limitations
This is UI/demo logic, not real authentication. All frontend credentials remain visible in shipped source and stored records are not private.
## Later Live Verification — November 18, 2026

- Merchant login successfully tested in the browser.
- Correct demo credentials accepted.
- Merchant CRM dashboard opened successfully.
- Test orders appeared in the CRM.
- Order status changes remained saved after refresh.
- Login was verified on the live Vercel website.

Note: Authentication remains client-side and
is intended for demonstration purposes only.