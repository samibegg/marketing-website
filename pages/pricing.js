// pages/pricing.js
import React, { useState } from 'react';
import Head from 'next/head';
import { loadStripe } from '@stripe/stripe-js';
import { useSession } from 'next-auth/react';
import { useAuthModal } from '@/context/AuthModalContext'; // To prompt login if needed
import Header from '@/components/Header'; // Adjust path if needed
import Footer from '@/components/Footer'; // Adjust path if needed
import { CheckCircle } from 'lucide-react'; // Example icon

// Load Stripe.js outside of a component’s render to avoid
// recreating the Stripe object on every render.
// Use NEXT_PUBLIC_ prefix for client-side env var access.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const PricingPage = () => {
  const { data: session, status } = useSession();
  const { openModal } = useAuthModal();
  const [loadingPriceId, setLoadingPriceId] = useState(null); // Track loading state per button

  const handleCheckout = async (priceId) => {
    setLoadingPriceId(priceId); // Set loading state for the clicked button

    // 1. Check if user is logged in
    if (status === 'loading') return; // Wait if session is loading
    if (status === 'unauthenticated') {
      openModal(); // Prompt login if not authenticated
      setLoadingPriceId(null); // Reset loading state
      return;
    }

    // 2. User is logged in, proceed to checkout
    try {
      // 3. Call your backend to create a checkout session
      const response = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId: priceId }), // Send the selected price ID
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { sessionId } = await response.json();

      // 4. Redirect to Stripe Checkout
      const stripe = await stripePromise;
      if (!stripe) {
          console.error("Stripe.js has not loaded yet.");
          throw new Error("Stripe.js failed to load.");
      }
      const { error } = await stripe.redirectToCheckout({ sessionId });

      // If `redirectToCheckout` fails due to a browser issue or configuration error,
      // display the error message.
      if (error) {
        console.error("Stripe redirectToCheckout error:", error);
        // You could display this error to the user
      }
      // Note: If successful, the user is redirected and won't return here immediately.
      // Loading state might remain true until page navigation occurs.

    } catch (error) {
      console.error("Checkout error:", error);
      // Handle error (e.g., show an error message to the user)
    } finally {
      // Reset loading state only if there was an error before redirect
      // If redirect happens, this might not run until user navigates back
      setLoadingPriceId(null);
    }
  };

  // Define your pricing plans data
  const plans = [
    {
      name: 'Single Report',
      price: '$50',
      frequency: 'one-time purchase',
      priceId: process.env.STRIPE_SINGLE_REPORT_PRICE_ID, // Use env var
      description: 'Get access to one specific research report.',
      features: [
        'Full PDF download',
        'Data tables included',
        'Lifetime access to purchased report',
      ],
      cta: 'Buy Report',
    },
    {
      name: 'Full Subscription',
      price: '$10',
      frequency: 'per month',
      priceId: process.env.STRIPE_SUBSCRIPTION_PRICE_ID, // Use env var
      description: 'Unlimited access to all current and future reports.',
      features: [
        'Access all reports',
        'New reports added monthly',
        'Cancel anytime',
        'Exclusive analysis & insights',
      ],
      cta: 'Subscribe Now',
    },
  ];

  return (
    <>
      <Head>
        <title>Pricing - ForgeMission</title>
        <meta name="description" content="Choose the plan that best suits your research needs." />
      </Head>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-12 sm:mb-16">
              <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl">
                Simple, Transparent Pricing
              </h1>
              <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                Access in-depth AI research reports. Choose the plan that works for you.
              </p>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl mx-auto">
              {plans.map((plan) => (
                <div key={plan.name} className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200 bg-white flex flex-col">
                  <div className="p-6">
                    <h2 className="text-lg leading-6 font-semibold text-gray-900">{plan.name}</h2>
                    <p className="mt-2 text-sm text-gray-500">{plan.description}</p>
                    <p className="mt-4">
                      <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                      <span className="text-base font-medium text-gray-500 ml-1">{plan.frequency}</span>
                    </p>
                    <button
                      onClick={() => handleCheckout(plan.priceId)}
                      disabled={loadingPriceId === plan.priceId || status === 'loading'} // Disable specific button when loading
                      className={`mt-6 block w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-center text-sm font-medium text-white ${
                        plan.name === 'Full Subscription' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-blue-600 hover:bg-blue-700'
                      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition`}
                    >
                      {loadingPriceId === plan.priceId ? 'Processing...' : plan.cta}
                    </button>
                  </div>
                  <div className="pt-6 pb-8 px-6 flex-grow"> {/* Added flex-grow */}
                    <h3 className="text-xs font-medium text-gray-900 tracking-wide uppercase">What's included</h3>
                    <ul role="list" className="mt-4 space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex space-x-3">
                          <CheckCircle className="flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                          <span className="text-sm text-gray-500">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default PricingPage;

