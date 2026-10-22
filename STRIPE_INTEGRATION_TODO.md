# Stripe Integration TODO

## Values to Replace

The following values are placeholders and must be updated before going live.

**Files containing placeholders:**
- [supabase/functions/create-checkout-session/index.ts](supabase/functions/create-checkout-session/index.ts)

| Field | Current Value | What to Set |
|-------|--------------|-------------|
| mode | payment | Set to "payment" for one-time charges or "subscription" for recurring billing. |
| line_items[].price | price_... | Your actual Stripe Price ID from the Dashboard (https://dashboard.stripe.com/prices) or API. |

## Configured Parameters

These parameters were configured in Checkout Studio and are already set correctly.

**Files containing these parameters:**
- [supabase/functions/create-checkout-session/index.ts](supabase/functions/create-checkout-session/index.ts)

| Parameter | Value |
|-----------|-------|
| ui_mode | form |
| billing_address_collection | auto |
| phone_number_collection | `{ enabled: false }` |
| automatic_tax | `{ enabled: false }` |
| payment_method_collection | always (only sent when mode is "subscription") |
| submit_type | auto |
| integration_identifier | custom_embedded_web_0001 |

## Setup and next steps

### Setup
1. Set the secret key for the edge function (server-only, never prefixed with `VITE_`):
   `supabase secrets set STRIPE_SECRET_KEY=sk_test_...`
2. Add the publishable key to `front-end/.env.local` (and as a GitHub repo secret `VITE_STRIPE_PUBLISHABLE_KEY`):
   `VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...`
3. Add `VITE_STRIPE_PUBLISHABLE_KEY: ${{ secrets.VITE_STRIPE_PUBLISHABLE_KEY }}` to the build `env` in `.github/workflows/deploy.yml`.
4. Deploy the function: `supabase functions deploy create-checkout-session`.
5. Replace the placeholders above.

Keys: https://dashboard.stripe.com/test/apikeys. The function uses Stripe API version `2026-03-25.dahlia` with `stripe@23.0.0` (via Deno `npm:`).

### Files
- `supabase/functions/create-checkout-session/index.ts` — new edge function, returns `{ client_secret }`.
- `front-end/src/pages/Checkout.jsx` — new page at `/checkout` that mounts the embedded form.
- `front-end/src/App.jsx` — `/checkout` route.
- `front-end/index.html` — loads `https://js.stripe.com/dahlia/stripe.js` (never bundle or self-host).
- `front-end/.env.example` — `VITE_STRIPE_PUBLISHABLE_KEY`.

### Flow
1. `/checkout` loads and calls the `create-checkout-session` edge function.
2. The function creates a Checkout Session and returns its `client_secret`.
3. `stripe.initCheckoutFormSdk` renders the form in a Stripe iframe; on `confirm`, the payment is confirmed.

### Testing
Use test mode keys. Card `4242 4242 4242 4242`, any future expiry, any CVC, any ZIP. More: https://docs.stripe.com/testing

### Next steps
- Replace the placeholder product/price and choose the mode.
- Handle post-payment behavior: you may need to add a `return_url` to the session if Stripe requires one for your flow.
- Add a webhook (`checkout.session.completed`) for fulfillment and order tracking; none exists yet.
- Link to `/checkout` from the UI where appropriate.

### Resources
- https://support.stripe.com
- https://docs.stripe.com/mcp
