# Architecture — capstone MVP v0.3

```text
CUSTOMER (route /)                        MERCHANT (route /admin)
  └── Storefront and cart                   └── Demo login form (client-side)
      └── Simulated checkout                    └── SessionStorage demo flag
          └── Receipt                                  └── Merchant CRM display
                    │                                         │
                    └── React App.jsx shared state ──────────┘
                                     │
                             localStorage
                    Products/inventory/orders/inquiries
```

The public storefront displays **no admin navigation link**. A merchant opens `/admin` manually, enters fictional demo credentials from README, and receives an interface to edit orders and inquiries. `src/authDemo.js` contains the UI demo's cleartext credentials, route resolver, and sessionStorage helpers. `App.jsx` handles browser history and back/forward navigation.

**Security statement:** This is deliberately **not** real authentication or authorization. Because all records and the demo password live in browser JavaScript/storage, they can be accessed without the form. No server validates identity or authorizes requests. Do not use real customer data. Production requires backend authentication, server-protected records/API endpoints and shared database persistence.

## Responsibilities

- `App.jsx`: customer/admin view switch, login form, CRM, products, cart, checkout and receipts.
- `authDemo.js`: demo-only account checking, route mapping and sessionStorage flags.
- `storeLogic.js`: deterministic stock/cart/checkout rules.
- `usePersistentState.js`: browser localStorage read/write.
- `data.js`: fictional catalog/orders/inquiries.
- `styles.css`: responsive UI, including login screen.
- `tests/`: pure Node tests for business logic and the demo login helpers.

## Scope

Single browser profile only. Different devices do not share orders. The only practical purpose of the login is to demonstrate a separate merchant interface; it cannot serve as an access-control security feature.
