//This one is important

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

async function CreateStripeSession(req: any, res: any) {
  const redirectURL =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://stripe-checkout-next-js-demo.vercel.app';

  
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
        {
            price: process.env.PRICE_ID,
            quantity: 1,
        }
    ],
    mode: 'payment',
    success_url: redirectURL + '?status=success',
    cancel_url: redirectURL + '?status=cancelled',
  });

  res.json({ id: session.id });
}

export default CreateStripeSession;