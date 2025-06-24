import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Stripe from 'npm:stripe@14.12.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    })

    const { 
      mode, 
      lineItems, 
      successUrl, 
      cancelUrl, 
      customerEmail, 
      metadata 
    } = await req.json()

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode,
      line_items: lineItems,
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: customerEmail,
      metadata,
      billing_address_collection: 'required',
      automatic_tax: { enabled: true },
    }

    if (mode === 'subscription') {
      sessionParams.subscription_data = {
        metadata: metadata || {},
      }
    }

    const session = await stripe.checkout.sessions.create(sessionParams)

    return new Response(
      JSON.stringify({ id: session.id, url: session.url }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Error creating checkout session:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})