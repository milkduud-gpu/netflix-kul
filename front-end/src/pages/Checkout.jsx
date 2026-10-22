import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const appearance = {
  theme: 'stripe',
  labels: 'auto',
  inputs: 'spaced',
  variables: {
    borderRadius: '4px',
    colorBackground: '#ffffff',
    colorDanger: '#df1b41',
    colorPrimary: '#0570de',
    colorSuccess: '#00c853',
    colorText: '#30313d',
    fontFamily: 'default',
    fontSizeBase: '16px',
    spacingUnit: '4px',
  },
}

export default function Checkout() {
  const [error, setError] = useState('')

  useEffect(() => {
    let form
    let cancelled = false

    async function setup() {
      const key = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
      if (!key || !window.Stripe) {
        throw new Error('Stripe is not configured (missing VITE_STRIPE_PUBLISHABLE_KEY).')
      }
      const stripe = window.Stripe(key)
      const clientSecret = supabase.functions
        .invoke('create-checkout-session', { method: 'POST' })
        .then(({ data, error }) => {
          if (error) throw error
          return data.client_secret
        })
      const checkout = stripe.initCheckoutFormSdk({ clientSecret, appearance })
      form = checkout.createForm({ layout: 'expanded' })
      form.mount('#checkout-form')

      const loadActionsResult = await checkout.loadActions()
      if (cancelled || loadActionsResult.type !== 'success') return
      form.on('confirm', async (event) => {
        try {
          await loadActionsResult.actions.confirm({ formConfirmEvent: event })
        } catch (error) {
          console.error('Payment confirmation error:', error)
        }
      })
    }

    setup().catch((err) => {
      console.error('Checkout setup error:', err)
      if (!cancelled) setError(err.message || 'Could not start checkout.')
    })
    return () => {
      cancelled = true
      form?.unmount?.()
    }
  }, [])

  return (
    <div className="page">
      {error && <p role="alert">{error}</p>}
      <div id="checkout-form" />
    </div>
  )
}
