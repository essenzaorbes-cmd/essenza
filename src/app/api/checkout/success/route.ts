import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16' as any,
})

// Webhook para procesar pagos exitosos
export async function POST(request: Request) {
  const payload = await request.text()
  const sig = request.headers.get('stripe-signature')

  if (!sig) return NextResponse.json({ error: 'No signature' }, { status: 400 })

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    // Need a service role client to bypass RLS and insert the order
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // Insert order into Supabase using the service role key
    const { error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: session.metadata?.userId === 'guest' ? null : session.metadata?.userId,
        order_number: `ESS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        status: 'paid',
        items_total: (session.amount_subtotal || 0) / 100,
        total: (session.amount_total || 0) / 100,
        currency: session.currency?.toUpperCase() || 'EUR',
        stripe_payment_intent_id: session.payment_intent as string,
        stripe_session_id: session.id,
        // En una app real, aqui insertariamos ademas los items de la orden recuperandolos de line_items
      })

    if (orderError) {
      console.error('Error inserting order:', orderError)
      return NextResponse.json({ error: orderError.message }, { status: 500 })
    }
  }

  return NextResponse.json({ received: true })
}
