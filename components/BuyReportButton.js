// components/BuyReportButton.js
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useSession } from 'next-auth/react';
import { useAuthModal } from '@/context/AuthModalContext';

// Load Stripe.js outside of the component render
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
const PRICE_ID = process.env.STRIPE_SINGLE_REPORT_PRICE_ID; // Specific price for this button

export const BuyReportButton = ({ reportId, children = "Buy This Report ($50)" }) => {
  const { data: session, status } = useSession();
  const { openModal } = useAuthModal();
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);
    if (status === 'loading') return;
    if (status === 'unauthenticated') {
      openModal();
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Pass the specific price ID and potentially the report ID
        body: JSON.stringify({ priceId: PRICE_ID, reportId: reportId }),
      });

      if (!response.ok) throw new Error('Failed to create session');

      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe.js failed to load');

      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) console.error("Stripe redirect error:", error);

    } catch (error) {
      console.error("Checkout error:", error);
      // Show error message to user
    } finally {
      // Only reset loading if there was an error before redirect
      // setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={isLoading || status === 'loading'}
      className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition"
    >
      {isLoading ? 'Processing...' : children}
    </button>
  );
};

