import Stripe from 'npm:stripe@23.0.0'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2026-03-25.dahlia' as any,
})

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    // TODO: set mode to "subscription" for recurring products.
    const mode: 'payment' | 'subscription' = 'payment'

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      ui_mode: 'form',
      billing_address_collection: 'auto',
      phone_number_collection: { enabled: false },
      automatic_tax: { enabled: false },
      submit_type: 'auto',
      integration_identifier: 'custom_embedded_web_0001',
      mode,
      line_items: [{ price: 'price_...', quantity: 1 }],
    } as any
    if (mode === 'subscription') sessionParams.payment_method_collection = 'always'

    const session = await stripe.checkout.sessions.create(sessionParams)
    return json({ client_secret: session.client_secret })
  } catch (err) {
    return json({ error: (err as Error).message }, 500)
  }
})
