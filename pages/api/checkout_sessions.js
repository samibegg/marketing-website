// pages/api/checkout_sessions.js
import { getSession } from 'next-auth/react'; // To get user session server-side
import Stripe from 'stripe';

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Define Price IDs (could also be passed from frontend if more dynamic)
const SINGLE_REPORT_PRICE_ID = process.env.STRIPE_SINGLE_REPORT_PRICE_ID;
const SUBSCRIPTION_PRICE_ID = process.env.STRIPE_SUBSCRIPTION_PRICE_ID;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
    return;
  }

  // 1. Get user session
  const session = await getSession({ req }); // Requires req object

  if (!session?.user) {
    // Should ideally not happen if frontend checks, but good failsafe
    return res.status(401).json({ error: 'You must be logged in to make a purchase.' });
  }

  // 2. Get Price ID from request body
  const { priceId } = req.body;

  if (!priceId) {
    return res.status(400).json({ error: 'Price ID is required.' });
  }

  // 3. Determine checkout mode (payment or subscription)
  let mode = 'payment'; // Default to one-time payment
  if (priceId === SUBSCRIPTION_PRICE_ID) {
    mode = 'subscription';
  } else if (priceId !== SINGLE_REPORT_PRICE_ID) {
    // Basic validation if only two prices are expected
    return res.status(400).json({ error: 'Invalid Price ID provided.' });
  }

  // 4. Define Success and Cancel URLs
  const successUrl = `${process.env.NEXTAUTH_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`; // Example success page
  const cancelUrl = `${process.env.NEXTAUTH_URL}/pricing`; // Redirect back to pricing on cancel

  try {
    // 5. Prepare Checkout Session parameters
    const checkoutSessionParams = {
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: mode,
      success_url: successUrl,
      cancel_url: cancelUrl,
      // --- Associate with User ---
      // Prefill email (optional but recommended)
      customer_email: session.user.email,
      // VERY IMPORTANT: Include client_reference_id to link session to your user ID
      // This ID will be available in webhook events.
      client_reference_id: session.user.id, // Assumes user.id is available in session (added via callbacks)
      // --- Metadata (Optional) ---
      // You can add other metadata if needed for webhooks
      // metadata: {
      //   userId: session.user.id,
      //   // Add reportId if it's a single report purchase and known here
      //   // reportId: req.body.reportId || null,
      // },
      // --- Subscription specific (Optional) ---
      // subscription_data: {
      //   metadata: { // Metadata specifically for the subscription object
      //     userId: session.user.id,
      //   }
      // },
    };

    // 6. Create the Stripe Checkout Session
    const checkoutSession = await stripe.checkout.sessions.create(checkoutSessionParams);

    // 7. Respond with the Session ID
    res.status(200).json({ sessionId: checkoutSession.id });

  } catch (error) {
    console.error('Error creating Stripe Checkout Session:', error);
    res.status(500).json({ error: 'Could not create checkout session', details: error.message });
  }
}

