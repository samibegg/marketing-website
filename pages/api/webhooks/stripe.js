// pages/api/webhooks/stripe.js
import Stripe from 'stripe';
import { buffer } from 'micro'; // Helper to read the raw request body
import { connectToDatabase } from '@/lib/mongodb'; // Your DB connection utility

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET; // Your webhook signing secret

// --- IMPORTANT: Disable Next.js body parsing for this route ---
// Stripe requires the raw request body to verify the signature.
export const config = {
  api: {
    bodyParser: false,
  },
};

// --- Helper function to update user access in DB ---
// NOTE: Adapt this function based on YOUR user schema and access logic!
async function grantAccess(userId, type, details = {}) {
  try {
    const { db } = await connectToDatabase();
    const usersCollection = db.collection('users');

    let updateData = {};

    if (type === 'subscription') {
      // Example: Set subscription status and Stripe customer/subscription IDs
      updateData = {
        $set: {
          // --- Example Schema Fields ---
          'subscription.status': 'active', // or 'trialing', etc.
          'subscription.stripeSubscriptionId': details.subscriptionId,
          'subscription.stripeCustomerId': details.customerId,
          'subscription.currentPeriodEnd': new Date(details.currentPeriodEnd * 1000), // Convert Stripe timestamp
          'subscription.priceId': details.priceId,
          // --- End Example ---
          updatedAt: new Date(),
        },
      };
      console.log(`Granting subscription access for user: ${userId}`);
    } else if (type === 'single_purchase') {
      // Example: Add the report ID to an array of purchased items
      if (!details.reportId) {
        console.warn(`Missing reportId for single purchase for user: ${userId}`);
        // Decide how to handle this - maybe store generic access?
        // For now, we'll just log and potentially set a general purchase flag
        updateData = { $set: { lastPurchaseType: 'single_report', updatedAt: new Date() } };
      } else {
         updateData = {
           $addToSet: { purchasedReportIds: details.reportId }, // Add reportId if not already present
           $set: { updatedAt: new Date() }
         };
         console.log(`Granting access to report ${details.reportId} for user: ${userId}`);
      }
    } else if (type === 'subscription_cancelled') {
        updateData = {
           $set: {
               'subscription.status': 'cancelled', // Or 'ended' based on Stripe event
               // Optionally keep other subscription details but mark as inactive
               updatedAt: new Date(),
           },
           // Consider $unset for fields if needed
        };
        console.log(`Marking subscription as cancelled for user: ${userId}`);
    }
    // Add more types as needed (e.g., 'refund')

    if (Object.keys(updateData).length > 0) {
      await usersCollection.updateOne({ _id: new require('mongodb').ObjectId(userId) }, updateData); // Ensure userId is ObjectId if stored as such
    }

  } catch (error) {
    console.error(`Error granting access for user ${userId}:`, error);
    // Consider alerting mechanism for failed DB updates
  }
}


// --- Webhook Handler ---
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
    return;
  }

  const buf = await buffer(req); // Read the raw request body
  const sig = req.headers['stripe-signature']; // Get the signature from the header

  let event;

  // 1. Verify the event signature
  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    // console.log('Stripe event constructed:', event.type);
  } catch (err) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // 2. Handle the event type
  try {
    switch (event.type) {
      // --- Checkout Session Completed (Both one-time and subscription initiations) ---
      case 'checkout.session.completed': {
        const session = event.data.object;
        console.log(`Processing checkout.session.completed for session: ${session.id}`);

        // Check if payment status is 'paid' (for one-time) or session mode is 'subscription'
        if (session.payment_status === 'paid' || session.mode === 'subscription') {
          const userId = session.client_reference_id; // Get user ID stored during checkout creation
          const customerId = session.customer; // Stripe Customer ID
          const subscriptionId = session.subscription; // Stripe Subscription ID (only for subscriptions)

          if (!userId) {
            console.error('ERROR: client_reference_id missing in checkout.session.completed');
            break; // Don't proceed without user ID
          }

          if (session.mode === 'subscription') {
            // Retrieve the subscription details to get period end, priceId etc.
            // Note: Sometimes subscription details might not be immediately available,
            // relying on invoice.payment_succeeded might be more robust for activation.
            if (subscriptionId) {
               const subscription = await stripe.subscriptions.retrieve(subscriptionId);
               await grantAccess(userId, 'subscription', {
                 subscriptionId: subscription.id,
                 customerId: customerId,
                 currentPeriodEnd: subscription.current_period_end,
                 priceId: subscription.items.data[0]?.price.id, // Get priceId from subscription item
               });
            } else {
                console.warn(`Subscription ID missing in checkout.session.completed for user ${userId}`);
                // Maybe wait for invoice.payment_succeeded
            }
          } else if (session.mode === 'payment') {
            // Handle one-time payment - retrieve metadata if needed
            const reportId = session.metadata?.reportId; // Example: Get reportId from metadata if set
            await grantAccess(userId, 'single_purchase', { reportId: reportId, customerId: customerId });
          }
        } else {
            console.log(`Checkout session ${session.id} completed but not paid/subscription.`);
        }
        break;
      }

      // --- Invoice Payment Succeeded (Good for confirming subscription activation/renewal) ---
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object;
        console.log(`Processing invoice.payment_succeeded for invoice: ${invoice.id}`);

        // Check if it's for a subscription
        if (invoice.subscription && invoice.billing_reason?.includes('subscription')) {
          const subscriptionId = invoice.subscription;
          const customerId = invoice.customer;

          // Retrieve subscription to get user ID from metadata (if stored there) or customer details
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);
          // IMPORTANT: Need a reliable way to link Stripe Customer/Subscription back to your User ID.
          // Using metadata during creation is best. If not, you might need to query your DB
          // using subscription.id or customerId if you stored them previously.
          const userId = subscription.metadata?.userId || invoice.customer_metadata?.userId; // Example: Get userId from metadata

          if (!userId) {
             // Fallback: Find user by stripeCustomerId if you stored it
             const { db } = await connectToDatabase();
             const user = await db.collection('users').findOne({ 'subscription.stripeCustomerId': customerId });
             if (!user) {
                 console.error(`ERROR: Cannot find user for successful invoice payment. Customer: ${customerId}, Subscription: ${subscriptionId}`);
                 break;
             }
             // userId = user._id.toString(); // Use the found user ID
          }


          if (userId) {
              await grantAccess(userId, 'subscription', { // Grant/confirm access
                subscriptionId: subscription.id,
                customerId: customerId,
                currentPeriodEnd: subscription.current_period_end,
                priceId: subscription.items.data[0]?.price.id,
              });
          } else {
               console.error(`ERROR: Could not determine user ID for invoice.payment_succeeded. Customer: ${customerId}, Subscription: ${subscriptionId}`);
          }
        }
        break;
      }

      // --- Subscription Deleted/Cancelled ---
      case 'customer.subscription.deleted':
      // case 'customer.subscription.updated': // Handle status changes like 'canceled' here too
      {
        const subscription = event.data.object;
        console.log(`Processing customer.subscription.deleted for subscription: ${subscription.id}`);
        const customerId = subscription.customer;

        // Find user associated with this subscription/customer ID
        // IMPORTANT: Again, linking back to your user ID is key. Use metadata or stored IDs.
        const userId = subscription.metadata?.userId; // Example

         if (!userId) {
             // Fallback: Find user by stripeCustomerId if you stored it
             const { db } = await connectToDatabase();
             const user = await db.collection('users').findOne({ 'subscription.stripeCustomerId': customerId });
             if (!user) {
                 console.error(`ERROR: Cannot find user for subscription cancellation. Customer: ${customerId}, Subscription: ${subscription.id}`);
                 break;
             }
             // userId = user._id.toString(); // Use the found user ID
          }

        if (userId) {
            await grantAccess(userId, 'subscription_cancelled', { subscriptionId: subscription.id });
        } else {
             console.error(`ERROR: Could not determine user ID for customer.subscription.deleted. Customer: ${customerId}, Subscription: ${subscription.id}`);
        }
        break;
      }

      // ... handle other event types as needed (e.g., payment_failed, refunds)

      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (error) {
      console.error(`Error handling event ${event.type}:`, error);
      // Send a 500 status code to Stripe if processing fails, so it retries
      return res.status(500).json({ error: 'Webhook handler failed.', details: error.message });
  }

  // 3. Return a 200 response to acknowledge receipt of the event
  res.status(200).json({ received: true });
}

