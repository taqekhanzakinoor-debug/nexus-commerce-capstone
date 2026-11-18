# Prompt engineering evidence index

| Project scope / section | Actual prompt record | Source files | Evidence status |
| --- | --- | --- | --- |
| Initial build request and capstone requirements | [01-kickoff.md](01-kickoff.md) | `src/App.jsx`, `src/data.js`, `src/styles.css` | User's exact prompt and the uploaded PDF context recorded |
| Checkout tests and explicit order receipt | [02-checkout-verification.md](02-checkout-verification.md) | `src/storeLogic.js`, `src/App.jsx`, `tests/storeLogic.test.js` | Exact follow-up prompt, implementation, and 12 passing Node tests recorded |
| Hidden merchant route and demo sign-in | [03-merchant-login.md](03-merchant-login.md) | `src/App.jsx`, `src/authDemo.js`, `tests/authDemo.test.js` | Verbatim user prompt and 4 passing demo-auth logic tests |
| Future features and bug fixes | [PROMPT_LOG_TEMPLATE.md](PROMPT_LOG_TEMPLATE.md) | Add paths when real changes occur | Blank template only — not evidence of a completed feature |

**Authenticity:** User prompts were brief (`lets build it together`, `next`, and `can we hide merchant crm and give it a login`). Do not invent detailed prompts or claim that the user wrote the assistant's expanded feature specification. The capstone PDF served as the project context. Add real observations and screenshots after running the app in a browser.

- [04-login-feedback-fix.md](04-login-feedback-fix.md): user screenshot troubleshooting, implemented form feedback and login whitespace handling.

- [05-deployment-preparation.md](05-deployment-preparation.md): user confirmed login is solved and requested next stage; documented actual deployment-preparation changes and unverified steps.

- [06-vercel-hosting.md](06-vercel-hosting.md): exact user requirement to use Vercel, host configuration changes, and remaining verification tasks.
