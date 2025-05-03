import Image from 'next/image';
import Header from '../../components/Header'; 
import Footer from '../../components/Footer'; 
import { ArrowRight } from 'lucide-react'; 
import Link from 'next/link';
import React, { useEffect, useRef } from 'react'; 
import Head from 'next/head';
import { NextSeo } from 'next-seo';

import { useState } from 'react';

/**
 * Placeholder function for analytics tracking.
 * Replace this with your actual analytics integration code.
 */
const trackEvent = (eventName, eventData) => {
  console.log('Analytics Event:', eventName, eventData);
  window.gtag('event', eventName, eventData);
};

/**
 * Simple debounce function.
 */
const debounce = (func, delay) => {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

/**
 * Component to display the Executive Summary report page with analytics.
 */
const ReportPageExecutiveSummary = () => {
  const contentRef = useRef(null); // Ref for potential future use
  const scrollMilestonesReached = useRef(new Set()); // Ref for scroll tracking
  const activeTimeStart = useRef(Date.now()); // Ref for active time tracking
  const totalActiveTime = useRef(0); // Ref for active time tracking

  // --- Analytics Tracking Effects ---

  // 1. Track initial page view
  useEffect(() => {
    trackEvent('page_view', { page_title: '2025 US AI Policy Report - Executive Summary' });
  }, []);

  // 2. Track Scroll Depth
  useEffect(() => {
    const handleScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollableHeight <= 0) return;
      const scrollPercent = Math.min(100, Math.round((window.scrollY / scrollableHeight) * 100));
      const milestones = [25, 50, 75, 100];
      milestones.forEach(milestone => {
        if (scrollPercent >= milestone && !scrollMilestonesReached.current.has(milestone)) {
          scrollMilestonesReached.current.add(milestone);
          trackEvent('scroll_depth', { depth_percentage: milestone, page_section: 'Executive Summary' });
        }
      });
    };
    const debouncedScrollHandler = debounce(handleScroll, 250);
    window.addEventListener('scroll', debouncedScrollHandler);
    return () => window.removeEventListener('scroll', debouncedScrollHandler);
  }, []);

  // 3. Track Active Time Spent
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        totalActiveTime.current += Date.now() - activeTimeStart.current;
      } else {
        activeTimeStart.current = Date.now();
      }
    };
    const handleBeforeUnload = () => {
      if (document.visibilityState === 'visible') {
        totalActiveTime.current += Date.now() - activeTimeStart.current;
      }
      if (totalActiveTime.current > 0) {
        trackEvent('active_time_spent', { duration_seconds: Math.round(totalActiveTime.current / 1000), page_section: 'Executive Summary' });
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);
    activeTimeStart.current = Date.now();
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

   // 4. Track Text Copying (Optional for Exec Summary, but kept for consistency)
   useEffect(() => {
    const handleCopy = () => {
      const selectedText = window.getSelection()?.toString() || '';
      if (selectedText.length > 0) {
        trackEvent('text_copied', {
          page_section: 'Executive Summary',
          content_snippet: selectedText.substring(0, 100) + (selectedText.length > 100 ? '...' : '')
        });
      }
    };
    const contentElement = contentRef.current;
    if (contentElement) contentElement.addEventListener('copy', handleCopy);
    return () => {
      if (contentElement) contentElement.removeEventListener('copy', handleCopy);
    };
  }, []);


  // --- Component Logic ---

  // Handler for Next button click tracking
  const handleNextSectionClick = () => {
    trackEvent('navigation_click', { button_text: 'Go to Next Section', target_url: '/report/us-ai-policy-2025' }); // Link to Landscape page
  };


  // --- SEO Content ---
  const pageTitle = "Executive Summary | 2025 US AI Policy Report";
  const pageDescription = "Executive summary of the report analyzing the 2025 US AI policy landscape, its impacts, challenges, opportunities, and strategic recommendations for AI consulting firms.";
  const canonicalUrl = "https://www.forgemission.com/knowledge/AI-Strategy-2025-Policies-Executive-Summary"; // Replace
  const imageUrl = "https://www.forgemission.com/images/ai-policy-report-preview.jpg"; // Replace

  // --- JSON-LD Structured Data ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Report", // Main type for the overall report
    "name": "Navigating the 2025 US Al Policy Landscape: Strategic Imperatives for AI Initiatives",
    "headline": pageTitle, // Headline specific to this page (Exec Summary)
    "description": pageDescription,
    "url": canonicalUrl, // URL of this specific page
    "image": imageUrl,
    "datePublished": "2025-04-30T10:00:00Z", // Adjust date
    "author": { "@type": "Organization", "name": "Your Organization Name" }, // Replace
    "publisher": {
       "@type": "Organization",
       "name": "Your Organization Name", // Replace
       "logo": { "@type": "ImageObject", "url": "https://www.forgemission.com/images/logo.png" } // Replace
    },
     "hasPart": [ // Indicate this is part of the report
        {
          "@type": "WebPage",
          "@id": canonicalUrl, // Link to itself as a part
          "name": "Executive Summary"
        }
        // Potentially add other parts here if desired for main report schema
     ]
  };

  // Signup modal logic
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
    trackEvent('signup_closed', { button_text: 'Closed Sign up', target_url: '/report/us-ai-policy-2025' }); // Link to Landscape page
  }

  function openModal() {
    trackEvent('signup_click', { button_text: 'Sign Up Button', target_url: '/report/us-ai-policy-2025' }); // Link to Landscape page
    setIsOpen(true);
  }


  return (
    <>
      <NextSeo
        title={pageTitle}
        description={pageDescription}
        canonical={canonicalUrl}
        openGraph={{
          type: 'article',
          url: canonicalUrl,
          title: pageTitle,
          description: pageDescription,
          images: [
            {
              url: imageUrl,
              alt: pageTitle,
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
          site: canonicalUrl,
          title: pageTitle,
          description: pageDescription,
          image: imageUrl,
        }}
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div className="bg-white min-h-screen flex flex-col">
        <Header />
          {/* Main content area with ref */}
          <div ref={contentRef} className="max-w-5xl mx-auto bg-white p-8 sm:p-10 lg:p-12 rounded-lg shadow-lg flex-grow">

            {/* Report Title (Consistent with overall report) */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-10 border-b-2 border-gray-200 pb-5">
              Navigating the 2025 US Al Policy Landscape: Strategic Imperatives for AI Initiatives
            </h1>

            {/* Section Title */}
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mt-10 mb-5 pt-5 border-t border-gray-200">
              Executive Summary
            </h2>

            {/* Executive Summary Content */}
            <p className="text-gray-700 leading-relaxed text-base mb-4">
              The year 2025 marks a pivotal moment in United States Artificial Intelligence (AI) policy, characterized by a decisive shift towards prioritizing American innovation, global competitiveness, and national security. Driven by Executive Order (EO) 14179 and implemented through key Office of Management and Budget (OMB) Memoranda M-25-21 and M-25-22, the new policy landscape emphasizes removing perceived regulatory barriers to accelerate Al adoption, particularly within the federal government. This report analyzes the implications of these changes for Al strategy, implementation consulting, and services companies seeking to thrive in this dynamic environment.
            </p>
            <p className="text-gray-700 leading-relaxed text-base mb-4">
              EO 14179 sets a "pro-innovation" tone, revoking the previous administration's safety-focused EO 14110 and mandating a national Al action plan aimed at securing US Al dominance. OMB Memos M-25-21 and M-25-22 translate this vision into actionable directives for federal agencies. M-25-21 mandates the development of public Al strategies, empowers Chief Al Officers (CAIOs) as innovation advocates, and establishes a risk management framework centered on "high-impact Al"—systems whose outputs significantly affect rights, safety, or critical services. M-25-22 overhauls Al procurement, strongly encouraging performance-based acquisition, preferencing American Al solutions, protecting government data rights, and preventing vendor lock-in.<sup>3</sup> Complementing these are stringent Bureau of Industry and Security (BIS) export controls restricting advanced Al hardware and models to geopolitical rivals.
            </p>
             <p className="text-gray-700 leading-relaxed text-base mb-4">
               These policies create significant impacts across sectors. Federal agencies face immediate pressure to develop Al strategies, implement governance structures, manage high-impact Al risks, and navigate complex new procurement rules, often with limited internal resources. Regulated industries like healthcare and finance, while not directly targeted by the OMB memos, will likely feel indirect pressure to align with federal standards for Al risk management, data privacy, and ethical considerations, particularly concerning high-impact applications.<sup>12</sup> The defense sector sees alignment with the national security focus and potential for increased Al funding, albeit potentially under a separate policy track.<sup>16</sup> Technology providers must adapt to stringent export controls and demanding federal procurement requirements.<sup>5</sup>
             </p>
             <p className="text-gray-700 leading-relaxed text-base mb-4">
               Key challenges arise from this new landscape. Interpreting the ambiguous "high-impact Al" definition consistently poses a significant hurdle.<sup>20</sup> Meeting the complex performance, data rights, and interoperability demands of M-25-22 procurement will be difficult, especially for smaller vendors. Integrating robust, context-aware Al risk management requires specialized expertise, often leveraging frameworks like the NIST AI RMF.<sup>22</sup> Addressing persistent Al talent gaps within agencies is critical for successful implementation.<sup>10</sup> Furthermore, increased budget scrutiny under initiatives like the Department of Government Efficiency (DOGE) demands that consulting engagements demonstrate clear value and efficiency.<sup>26</sup>
             </p>
             <p className="text-gray-700 leading-relaxed text-base mb-4">
                Despite challenges, significant opportunities emerge for Al consulting firms. High-demand services directly map to policy requirements: Al strategy development, governance and compliance advisory, high-impact Al risk assessment and mitigation, ethical Al framework implementation, secure Al development and data governance, Al procurement support, and workforce enablement. Government funding streams, particularly within DoD, NSF, and agency modernization budgets, offer avenues for growth, alongside potential Public-Private Partnerships.<sup>16</sup> The competitive landscape is shifting, with budget pressures impacting large incumbents<sup>26</sup> and creating potential openings for specialized firms demonstrating clear value and expertise in high-demand areas like risk management and performance-based outcomes.
             </p>
             <p className="text-gray-700 leading-relaxed text-base mb-4 font-semibold">
                Strategic recommendations for Al consulting firms include:
             </p>
             {/* Recommendations List (condensed for summary) */}
             <ol className="list-decimal list-inside space-y-2 pl-4 mb-4 text-gray-700 leading-relaxed text-base">
                 <li>Focus on High-Impact Al Risk & Governance.</li>
                 <li>Master Federal Al Strategy & Procurement.</li>
                 <li>Target Federal Agencies & Regulated Industries.</li>
                 <li>Develop Outcome-Based Service Offerings.</li>
                 <li>Invest in Specialized Talent.</li>
                 <li>Position as Trusted, Value-Driven Partners.</li>
             </ol>
             <p className="text-gray-700 leading-relaxed text-base mb-4">
                By strategically aligning service offerings, target markets, and capabilities with the specific demands and nuances of the 2025 US Al policy environment, Al consulting firms can effectively navigate the challenges and capitalize on the significant opportunities presented by this transformative period.
             </p>


            {/* Navigation Buttons Container */}
            <div className="mt-12 pt-6 border-t border-gray-200 flex justify-end items-center"> {/* Changed to justify-end */}
              <div>

              {/* Next Button */}
              <Link href="/knowledge/AI-Strategy-2025-Policies-Landscape" passHref> {/* Update href to your conclusion/final page */}
                 <button
                   onClick={handleNextSectionClick}
                   className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                 >
                   Go to Next Section {/* Or next section title */}
                   <ArrowRight className="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
                 </button>
              </Link>
              </div>
            </div>

          </div> {/* End of content card */}
        <Footer />
      </div>
    </>
  );
};

export default ReportPageExecutiveSummary; // Ensure the component name is unique
