// pages/api/checkout_sessions.js
import { getSession } from 'next-auth/react';
import { getToken } from 'next-auth/jwt'; // Import getToken for deeper debugging
import Stripe from 'stripe';
import { connectToDatabase } from '@/lib/mongodb'; // Ensure DB connection is available if needed later

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const secret = process.env.NEXTAUTH_SECRET; // Get secret for getToken

// Define Price IDs
const SINGLE_REPORT_PRICE_ID = process.env.STRIPE_SINGLE_REPORT_PRICE_ID;
const SUBSCRIPTION_PRICE_ID = process.env.STRIPE_SUBSCRIPTION_PRICE_ID;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
    return;
  }

  console.log('\n--- [checkout_sessions] Request Received ---');
  // --- ADDED LOGGING ---
  console.log('[checkout_sessions] Request Headers:', JSON.stringify(req.headers, null, 2)); // Log all headers
  console.log('[checkout_sessions] NEXTAUTH_SECRET available:', !!secret);
  console.log('[checkout_sessions] NEXTAUTH_SECRET length:', secret?.length || 0);
  // --- END ADDED LOGGING ---

  // --- Attempt 1: Using getToken (More direct JWT check) ---
  let token = null;
  try {
      token = await getToken({ req, secret }); // Pass explicit secret
      console.log('[checkout_sessions] getToken result:', token ? 'Token Found' : 'No Token / Invalid Token');
      if (token) {
          // Log some decoded token data (avoid logging sensitive fields in production)
          console.log('[checkout_sessions] Decoded Token (subset):', { id: token.id, email: token.email, name: token.name, iat: token.iat, exp: token.exp });
      }
  } catch (error) {
      console.error('[checkout_sessions] Error calling getToken:', error);
  }
  // --- End Attempt 1 ---

  // --- Attempt 2: Using getSession (Original method) ---
  let session = null;
  try {
      // getSession implicitly uses the secret and verifies against DB/adapter if using database strategy
      session = await getSession({ req });
      console.log('[checkout_sessions] getSession result:', session ? `Session Found for ${session.user?.email}` : 'No Session Found / Invalid');
  } catch (error) {
      // This catch might not fire for simple auth failures, getSession usually returns null
      console.error('[checkout_sessions] Error calling getSession:', error);
  }
  // --- End Attempt 2 ---

  // --- Authorization Check ---
  // Prefer checking the token directly from getToken if available, otherwise use session
  // This helps differentiate between JWT decoding failure vs session retrieval failure
  const authorizedUser = token || session?.user;

  if (!authorizedUser?.id) { // Check for user ID specifically
    console.error('[checkout_sessions] Authorization failed (No valid token or session with user ID found)');
    // Provide a slightly more informative error if possible
    if (!token && !session) {
        console.error('[checkout_sessions] Reason: Both getToken and getSession failed.');
    } else if (!token) {
        console.error('[checkout_sessions] Reason: getToken failed, but getSession found something (maybe without user ID?). Session:', session);
    } else if (!session) {
        console.error('[checkout_sessions] Reason: getToken succeeded, but getSession failed.');
    }
    return res.status(401).json({ error: 'Authentication required. Please log in again.' }); // Suggest re-login
  }
  // If we reach here, authorization is considered successful
  console.log(`[checkout_sessions] User Authorized via ${token ? 'getToken' : 'getSession'}: ${authorizedUser.email || authorizedUser.id}`);


  // --- Proceed with checkout logic ---
  const { priceId, reportId } = req.body; // Include reportId if sent

  if (!priceId) {
      console.error('[checkout_sessions] Price ID missing from request body');
      return res.status(400).json({ error: 'Price ID is required.' });
  }
  // Basic validation if only two prices are expected
  if (priceId !== SINGLE_REPORT_PRICE_ID && priceId !== SUBSCRIPTION_PRICE_ID) {
      console.error(`[checkout_sessions] Invalid Price ID received: ${priceId}`);
      return res.status(400).json({ error: 'Invalid Price ID provided.' });
  }

  const mode = priceId === SUBSCRIPTION_PRICE_ID ? 'subscription' : 'payment';
  const successUrl = `${process.env.NEXTAUTH_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${process.env.NEXTAUTH_URL}/pricing`;

  try {
    const checkoutSessionParams = {
      line_items: [{ price: priceId, quantity: 1 }],
      mode: mode,
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: authorizedUser.email, // Use email from validated token/session
      client_reference_id: authorizedUser.id, // Use ID from validated token/session
      // Add metadata including reportId if it exists and it's a one-time payment
      metadata: mode === 'payment' && reportId ? { userId: authorizedUser.id, reportId: reportId } : { userId: authorizedUser.id },
      // Add metadata to subscription too if needed
      // subscription_data: mode === 'subscription' ? { metadata: { userId: authorizedUser.id } } : undefined,
    };

    console.log('[checkout_sessions] Creating Stripe session with params:', checkoutSessionParams);
    const checkoutSession = await stripe.checkout.sessions.create(checkoutSessionParams);
    console.log('[checkout_sessions] Stripe session created successfully:', checkoutSession.id);
    res.status(200).json({ sessionId: checkoutSession.id });

  } catch (error) {
    console.error('[checkout_sessions] Error creating Stripe Checkout Session:', error);
    // Provide more Stripe-specific error details if available
    const stripeErrorCode = error.code ? ` (Stripe Code: ${error.code})` : '';
    res.status(500).json({ error: `Could not create checkout session.${stripeErrorCode}`, details: error.message });
  }
}
