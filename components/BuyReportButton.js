// components/BuyReportButton.js
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useSession } from 'next-auth/react';
import { useAuthModal } from '@/context/AuthModalContext'; // Ensure path is correct

// Load Stripe.js outside of a component’s render
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

// --- Use the NEXT_PUBLIC_ prefixed environment variable ---
const ONE_TIME_PRICE_ID = process.env.NEXT_PUBLIC_STRIPE_SINGLE_REPORT_PRICE_ID;

/**
 * A reusable button component to initiate Stripe Checkout for a one-time purchase.
 * @param {object} props - Component props
 * @param {string} [props.reportId] - Optional: An identifier for the specific report being purchased.
 * @param {React.ReactNode} [props.children] - Content to display inside the button. Defaults to "Buy Now ($50)".
 * @param {string} [props.className] - Optional additional CSS classes for the button.
 */
export const BuyReportButton = ({ reportId, children, className = '' }) => {
  const { data: session, status } = useSession();
  const { openModal } = useAuthModal();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckout = async () => {
    setIsLoading(true);
    setError(null);

    // 1. Check Auth Status
    if (status === 'loading') {
      setIsLoading(false);
      return;
    }
    if (status === 'unauthenticated') {
      openModal();
      setIsLoading(false);
      return;
    }

    // 2. Proceed to create checkout session
    try {
      // --- Check if the Price ID is actually loaded from env var ---
      if (!ONE_TIME_PRICE_ID) {
        console.error("Stripe Price ID (NEXT_PUBLIC_STRIPE_SINGLE_REPORT_PRICE_ID) is not configured in .env.local or not exposed correctly.");
        throw new Error("Pricing configuration error.");
      }

      // 3. Call the backend API route
      const response = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // --- Ensure ONE_TIME_PRICE_ID has a value here ---
        body: JSON.stringify({
            priceId: ONE_TIME_PRICE_ID, // Use the correctly prefixed variable
            reportId: reportId
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error Data:", errorData); // Log the error response from API
        throw new Error(errorData.error || `Failed to create checkout session (Status: ${response.status})`);
      }

      const { sessionId } = await response.json();

      // 4. Redirect to Stripe Checkout
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe.js failed to load.');
      }

      const { error: stripeError } = await stripe.redirectToCheckout({ sessionId });

      if (stripeError) {
        console.error("Stripe redirectToCheckout error:", stripeError);
        setError(stripeError.message || "Could not redirect to payment page.");
        setIsLoading(false);
      }

    } catch (err) {
      console.error("Checkout initiation error:", err);
      setError(err.message || "An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleCheckout}
        disabled={isLoading || status === 'loading' || !ONE_TIME_PRICE_ID} // Also disable if Price ID isn't configured
        title={!ONE_TIME_PRICE_ID ? "Pricing not configured" : ""} // Add tooltip if disabled due to config
        className={`inline-flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed transition ${className}`}
      >
        {isLoading ? 'Processing...' : (children || 'Buy Now ($50)')}
      </button>
      {/* Optional: Display error message near the button */}
      {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
    </>
  );
};
