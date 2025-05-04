// pages/purchase-success.js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import Header from '@/components/Header'; // Adjust path if needed
import Footer from '@/components/Footer'; // Adjust path if needed
import { CheckCircle } from 'lucide-react'; // Assuming lucide-react is installed

const PurchaseSuccessPage = () => {
  const router = useRouter();
  const { session_id } = router.query; // Get session_id from URL query parameter
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sessionDetails, setSessionDetails] = useState(null); // Optional state to store session details

  // Optional: Fetch session details client-side to display specific info.
  // IMPORTANT: This is for display only. DO NOT grant access based on this client-side fetch.
  // Access should ONLY be granted via verified webhook events.
  useEffect(() => {
    // Only run when router is ready and session_id is present
    if (!router.isReady || !session_id) {
      // If there's no session_id, maybe redirect or show generic message after a delay
      if (router.isReady && !session_id) {
          console.warn("No session_id found in URL.");
          setError("Purchase details could not be loaded."); // Or set a different message
          setIsLoading(false);
      }
      return; // Wait for router.isReady and session_id
    }

    // --- Example: Fetching session details (Requires a backend API route) ---
    // This part is optional. You can just show a generic success message.
    // If you implement this, create an API route like `/api/get-checkout-session`
    // that takes the session_id, verifies the user is logged in, retrieves the
    // session from Stripe using your secret key, and returns relevant (non-sensitive) data.
    /*
    const fetchSession = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/get-checkout-session?id=${session_id}`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to fetch session details');
        }
        const data = await response.json();
        setSessionDetails(data); // Store retrieved details (e.g., amount, customer email)
      } catch (err) {
        console.error("Error fetching session:", err);
        setError('Could not retrieve purchase details.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchSession();
    */

    // --- For now: Just show a generic success message without fetching ---
    // Simulate loading completion
    const timer = setTimeout(() => {
        setSessionDetails({ status: 'complete' }); // Placeholder data
        setIsLoading(false);
    }, 500); // Simulate a short delay

    return () => clearTimeout(timer); // Cleanup timer on unmount

  }, [router.isReady, session_id]); // Dependencies for the effect

  return (
    <>
      <Head>
        <title>Purchase Successful - ForgeMission</title>
        <meta name="robots" content="noindex" /> {/* Prevent search engines from indexing */}
      </Head>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full bg-white p-8 text-center shadow-lg rounded-lg">
            {isLoading ? (
              // Loading State
              <div role="status">
                 <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                 </svg>
                 <span className="sr-only">Loading...</span>
                 <p className="mt-4 text-gray-600">Processing your purchase...</p>
              </div>
            ) : error ? (
              // Error State
              <>
                {/* You could add an error icon here */}
                <h2 className="text-2xl font-semibold text-red-600 mb-4">Oops! Something went wrong.</h2>
                <p className="text-red-700">{error}</p>
                <Link href="/pricing" passHref>
                  <span className="mt-6 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
                    Return to Pricing
                  </span>
                </Link>
              </>
            ) : sessionDetails ? (
              // Success State
              <>
                <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                <h2 className="mt-4 text-2xl font-semibold text-gray-900">
                  Thank You for Your Purchase!
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Your payment was successful. Access is being granted.
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  This may take a moment. You can check your account or the content shortly.
                </p>
                {/* Display specific details if fetched */}
                {/* {sessionDetails.amount_total && <p>Amount: {(sessionDetails.amount_total / 100).toFixed(2)} {sessionDetails.currency.toUpperCase()}</p>} */}
                <div className="mt-6">
                  <Link href="/dashboard" passHref> {/* Link to user dashboard or relevant area */}
                    <span className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
                      Go to My Account
                    </span>
                  </Link>
                  <Link href="/knowledge-base" passHref> {/* Link to content area */}
                    <span className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
                      Browse Reports
                    </span>
                  </Link>
                </div>
              </>
            ) : (
                 // Fallback / Initial state if no session_id or before fetch completes
                 <>
                    <h2 className="mt-4 text-2xl font-semibold text-gray-900">
                      Processing...
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                      Please wait while we confirm your purchase details.
                    </p>
                 </>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default PurchaseSuccessPage;

