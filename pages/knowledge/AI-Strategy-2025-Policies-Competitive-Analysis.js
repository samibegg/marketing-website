import Image from 'next/image';
import Header from '../../components/Header'; // Adjust path as needed
import Footer from '../../components/Footer'; // Adjust path as needed
import { ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Head from 'next/head';

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
 * Component to display the Competitive Analysis report page with advanced analytics.
 */
const ReportPageCompetitiveAnalysis = () => {
  // State for collapsible sections (A, B, C)
  const [sectionsOpen, setSectionsOpen] = useState({ A: false, B: false, C: false });
  const contentRef = useRef(null); // Ref for copy tracking
  const scrollMilestonesReached = useRef(new Set()); // Ref for scroll tracking
  const activeTimeStart = useRef(Date.now()); // Ref for active time tracking
  const totalActiveTime = useRef(0); // Ref for active time tracking

  // --- Analytics Tracking Effects ---

  // 1. Track initial page view
  useEffect(() => {
    trackEvent('page_view', { page_title: '2025 US AI Policy Report - Competitive Analysis' }); // Updated title
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
          trackEvent('scroll_depth', { depth_percentage: milestone, page_section: 'Competitive Analysis' }); // Updated section
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
        trackEvent('active_time_spent', { duration_seconds: Math.round(totalActiveTime.current / 1000), page_section: 'Competitive Analysis' }); // Updated section
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

  // 4. Track Text Copying
  useEffect(() => {
    const handleCopy = () => {
      const selectedText = window.getSelection()?.toString() || '';
      if (selectedText.length > 0) {
        trackEvent('text_copied', {
          page_section: 'Competitive Analysis', // Updated section
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

  const toggleSection = (sectionKey) => {
    const newState = !sectionsOpen[sectionKey];
    setSectionsOpen(prevState => ({ ...prevState, [sectionKey]: newState }));
    trackEvent('section_toggle', { section: `VI-${sectionKey}`, action: newState ? 'expand' : 'collapse' }); // Updated section prefix
  };

  // Handler for Next button click tracking
  const handleNextSectionClick = () => {
    trackEvent('navigation_click', { button_text: 'Go to Conclusion', target_url: '/report/conclusion' }); // Assuming conclusion is next
  };

  // Handler for Back button click tracking
  const handleBackSectionClick = () => {
    trackEvent('navigation_click', { button_text: 'Go to Previous Section', target_url: '/report/us-ai-policy-2025-funding' }); // Link to Funding page
  };

  // --- SEO Content ---
  const pageTitle = "Competitive Landscape & Differentiation in the 2025 US AI Policy Environment"; // Updated
  const pageDescription = "Analysis of the competitive landscape for AI consulting in the federal market under 2025 policies, including major players, emerging dynamics, and differentiation strategies."; // Updated
  const canonicalUrl = "https://www.forgemission.com/knowledge/AI-Strategy-2025-Policies-Executive-Summary"; // Updated - Replace
  const imageUrl = "https://www.forgemission.com/images/ai-policy-competitive-preview.jpg"; // Updated - Replace
  const publicationDate = "2025-04-30T10:00:00Z"; // Keep or adjust

  // --- JSON-LD Structured Data ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": pageTitle,
    "description": pageDescription,
    "image": imageUrl,
    "datePublished": publicationDate,
    "author": { "@type": "Organization", "name": "Your Organization Name" }, // Replace
    "publisher": {
       "@type": "Organization",
       "name": "Your Organization Name", // Replace
       "logo": { "@type": "ImageObject", "url": "https://www.forgemission.com/images/logo.png" } // Replace
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": canonicalUrl }
  };


  return (
    <>
      <Head>
        {/* --- Meta Tags --- */}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={canonicalUrl} />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={pageDescription} />
        <meta property="twitter:image" content={imageUrl} />
        {/* --- JSON-LD --- */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div className="bg-white min-h-screen flex flex-col">
        <Header />
          {/* Main content area with ref for copy tracking */}
          <div ref={contentRef} className="max-w-5xl mx-auto bg-white p-8 sm:p-10 lg:p-12 rounded-lg shadow-lg flex-grow">

            {/* Report Title (Consistent with overall report) */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-10 border-b-2 border-gray-200 pb-5">
              Navigating the 2025 US Al Policy Landscape: Strategic Imperatives for AI Initiatives
            </h1>

            {/* Section VI Title */}
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mt-10 mb-5 pt-5 border-t border-gray-200">
              VI. Competitive Landscape Analysis and Differentiation
            </h2>

            {/* Intro Paragraph for Section VI */}
            <p className="text-gray-700 leading-relaxed text-base mb-4">
              The 2025 US Al policy changes, coupled with heightened budget scrutiny, are reshaping the competitive landscape for Al consulting firms serving the federal market. Understanding how major players are adapting and identifying opportunities for differentiation is crucial for strategic positioning.
            </p>

            {/* --- Section A: Impact on Major Competitors --- */}
            <div className="mt-8 border-t pt-6">
              <h3
                className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4 cursor-pointer hover:text-indigo-600 flex justify-between items-center"
                onClick={() => toggleSection('A')}
                aria-expanded={sectionsOpen.A}
                aria-controls="section-a-content-competitive"
              >
                {/* Note: Removed bullet point from header text */}
                <span>A. Impact of Policy and Budget Shifts on Major Competitors</span>
                <span className="text-sm font-normal text-indigo-500 ml-2">{sectionsOpen.A ? '[Collapse]' : '[Expand]'}</span>
              </h3>
              <div
                 id="section-a-content-competitive"
                 className={`overflow-hidden transition-all duration-500 ease-in-out ${sectionsOpen.A ? 'max-h-[4000px] opacity-100' : 'max-h-0 opacity-0'}`} // Increased max-h
               >
                <p className="text-gray-700 leading-relaxed text-base mb-4 pt-2">
                  Large government contractors with significant consulting arms are experiencing direct impacts from the current environment. The combination of policy shifts requiring adaptation and budget cuts driven by DOGE is creating turbulence.
                </p>
                {/* Unordered List for Competitors */}
                <ul className="list-none space-y-4 pl-0 mb-4 text-gray-700 leading-relaxed text-base"> {/* Use list-none for no bullets */}
                    <li className="pl-4 border-l-4 border-indigo-200 py-2"> {/* Indent and add border */}
                        <span className="font-semibold">Accenture:</span> The company has explicitly warned that the slowdown in federal procurement actions and contract reviews initiated under DOGE are negatively impacting its sales and revenue forecasts, leading to significant stock price declines.<sup>26</sup> Federal work constituted approximately 8% of Accenture's global revenue in FY2024.<sup>26</sup> In response, Accenture Federal Services is actively pursuing strategic partnerships, notably with Google Public Sector, to launch joint offerings like the "Federal Al Solution Factory" and an MxDR (Managed Extended Detection and Response) solution powered by Google SecOps, aiming to enhance their Al and cybersecurity capabilities for federal clients.<sup>55</sup> They also acquired Cognosante to strengthen their federal health portfolio, indicating a strategy of targeted growth and capability enhancement.<sup>55</sup> Accenture broadly emphasizes services around cloud, digital platforms, citizen experience, data & Al, and security for the public sector.<sup>80</sup>
                    </li>
                    <li className="pl-4 border-l-4 border-indigo-200 py-2">
                        <span className="font-semibold">Booz Allen Hamilton:</span> As a firm heavily reliant on government contracts (nearly all revenue, with ~40% reportedly from DoD<sup>27</sup>), Booz Allen is significantly exposed to budget cuts and policy shifts. Reports indicate substantial contract losses, particularly within the Defense Health Agency (DHA).<sup>28</sup> However, Booz Allen is positioning itself as the leading provider of Al and cybersecurity services to the federal government, citing significant contract obligations. Their strategy involves focusing on high-value, mission-critical work, particularly in Al, cybersecurity (including Zero Trust and post-quantum crypto readiness), digital twins, and space.<sup>28</sup> They are actively investing in and partnering with Al companies (e.g., strategic investment in and partnership with Shield Al for defense autonomy<sup>17</sup>; partnership with Credo Al for Al governance platforms<sup>68</sup>) and highlighting recent contract wins leveraging Al for agencies like EPA and NSF.<sup>76</sup> Booz Allen emphasizes its deep mission understanding and ability to operationalize emerging technologies like Al for defense, intelligence, and civil government clients.<sup>78</sup> The company has publicly stated its commitment to reviewing and updating programs to comply with new Executive Orders.<sup>119</sup>
                    </li>
                    <li className="pl-4 border-l-4 border-indigo-200 py-2">
                        <span className="font-semibold">IBM:</span> IBM also faces pressure from DOGE-related contract cancellations, acknowledging a $100 million impact from 15 canceled federal contracts in Q1 2025. Federal contracts represent about 5% of total revenue, but closer to 10% for its consulting business, which CEO Arvind Krishna noted is more susceptible to discretionary pullbacks.<sup>74</sup> Despite these cuts and broader economic uncertainty, IBM maintained its full-year financial forecast, buoyed by growth in its Al book of business (reaching $6 billion inception-to-date) and software segment.<sup>11</sup> IBM's strategy emphasizes hybrid cloud and Al solutions for enterprise clients, including government.<sup>108</sup> They are investing heavily in R&D ($30B+ planned) and US manufacturing for advanced computing (mainframe, quantum).<sup>120</sup> Recent initiatives include launching autonomous security operations capabilities leveraging agentic Al<sup>111</sup>, establishing a dedicated Microsoft Practice within IBM Consulting to streamline cloud and Al transformations using Azure and related tools<sup>112</sup>, acquiring specialized consulting firms like Hakkoda Inc. to bolster data engineering capabilities<sup>108</sup>, and promoting ethical Al tools like Al FactSheets and Al Fairness 360.<sup>108</sup> IBM is positioning itself as a leader in trusted, enterprise-grade Al for regulated industries.<sup>108</sup>
                    </li>
                    <li className="pl-4 border-l-4 border-indigo-200 py-2">
                        <span className="font-semibold">Deloitte:</span> As one of the "Big Four" accounting and consulting firms with a major Government & Public Services (GPS) practice deriving significant revenue from US government contracts, Deloitte is also under pressure from DOGE scrutiny.<sup>27</sup> Reports indicate a strained environment within Deloitte GPS, with project withdrawals and reduced new work leading to job insecurity among staff.<sup>27</sup> Deloitte lost numerous contracts worth hundreds of millions, primarily in IT services and consulting for the Defense Health Agency (DHA).<sup>28</sup> Deloitte's thought leadership focuses on trustworthy Al governance, emphasizing the need for dynamic approaches beyond static policies and checklists, potentially leveraging tools like their RegExplorer™ for regulatory analysis.<sup>84</sup> They highlight various Al use cases relevant to government, including claims processing automation, population risk analysis, biomedical data science, benefits administration, and environmental prediction.<sup>85</sup> Their focus areas include Al and emerging technologies, data & digital transformation, innovation, and regulation within the public sector.<sup>84</sup>
                    </li>
                </ul>
                <p className="text-gray-700 leading-relaxed text-base mb-4">
                  The common thread among these major players is the need to adapt to a more demanding federal market characterized by stricter procurement rules (M-25-22), a focus on demonstrable value and efficiency (DOGE), and specific requirements for Al governance and risk management (M-25-21). Strategies involve enhancing Al capabilities (often through partnerships or acquisitions), focusing on mission-critical applications, emphasizing trustworthy and secure Al, and potentially diversifying revenue streams.<sup>17</sup>
                </p>
              </div>
            </div>

            {/* --- Section B: Emerging Competitive Dynamics --- */}
             <div className="mt-8 border-t pt-6">
               <h3
                 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4 cursor-pointer hover:text-indigo-600 flex justify-between items-center"
                 onClick={() => toggleSection('B')}
                 aria-expanded={sectionsOpen.B}
                 aria-controls="section-b-content-competitive"
               >
                 <span>B. Emerging Competitive Dynamics and Niche Players</span>
                 <span className="text-sm font-normal text-indigo-500 ml-2">{sectionsOpen.B ? '[Collapse]' : '[Expand]'}</span>
               </h3>
               <div
                 id="section-b-content-competitive"
                 className={`overflow-hidden transition-all duration-500 ease-in-out ${sectionsOpen.B ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
               >
                 <p className="text-gray-700 leading-relaxed text-base mb-4 pt-2">
                    The disruption caused by policy shifts and budget cuts may create openings for different types of competitors. While large firms often dominate major federal contracts due to scale and established relationships<sup>55</sup>, the current environment could favor agility and specialization.
                 </p>
                 {/* Unordered List for Player Types */}
                 <ul className="list-disc list-outside space-y-3 pl-8 mb-4 text-gray-700 leading-relaxed text-base">
                    <li>
                        <span className="font-semibold">Specialized/Boutique Firms:</span> Firms with deep expertise in specific high-demand areas—such as high-impact Al risk assessment, NIST AI RMF implementation, specific agency mission domains (e.g., healthcare Al compliance, financial services Al regulation), performance-based contracting for Al, or secure Al development—may find opportunities. Their focused expertise and potentially lower overhead could appeal to agencies seeking targeted solutions and cost efficiency under DOGE scrutiny.<sup>106</sup>
                    </li>
                    <li>
                        <span className="font-semibold">Technology Platform Providers:</span> Companies offering Al governance platforms (like Credo Al, partnering with Booz Allen<sup>68</sup>), MLOps tools, data management solutions, or specialized Al models may compete directly or partner with consulting firms to deliver integrated solutions. The emphasis on interoperability and avoiding vendor lock-in<sup>29</sup> could favor platform providers with open architectures.
                    </li>
                    <li>
                        <span className="font-semibold">Small Businesses:</span> Government initiatives often include set-asides or preferences for small businesses.<sup>55</sup> Small businesses with relevant Al capabilities, particularly those certified under SBA programs, may benefit from targeted opportunities or partnerships with larger primes seeking to meet small business subcontracting goals, especially as agencies pilot new contracting platforms.<sup>55</sup>
                    </li>
                    <li>
                        <span className="font-semibold">Commercial Al Leaders Expanding into Federal:</span> Major technology companies known for commercial Al (e.g., Google, Microsoft, Amazon<sup>100</sup>) are increasingly targeting the public sector, often partnering with established government contractors (e.g., Google with Accenture<sup>109</sup>, Microsoft with IBM<sup>112</sup>). Their advanced Al models and cloud infrastructure are attractive, but they must adapt to federal security, compliance, and procurement requirements.
                    </li>
                 </ul>
                 <p className="text-gray-700 leading-relaxed text-base mb-4">
                    The competitive dynamic is shifting towards demonstrating specific expertise, quantifiable value, and alignment with the administration's priorities of innovation, security, and American leadership.
                 </p>
              </div>
            </div>

            {/* --- Section C: Areas for Differentiation --- */}
             <div className="mt-8 border-t pt-6">
               <h3
                 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4 cursor-pointer hover:text-indigo-600 flex justify-between items-center"
                 onClick={() => toggleSection('C')}
                 aria-expanded={sectionsOpen.C}
                 aria-controls="section-c-content-competitive"
               >
                 {/* Note: Removed bullet point from header text */}
                 <span>C. Areas for Differentiation</span>
                 <span className="text-sm font-normal text-indigo-500 ml-2">{sectionsOpen.C ? '[Collapse]' : '[Expand]'}</span>
               </h3>
               <div
                 id="section-c-content-competitive"
                 className={`overflow-hidden transition-all duration-500 ease-in-out ${sectionsOpen.C ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'}`} // Increased max-h
               >
                 <p className="text-gray-700 leading-relaxed text-base mb-4 pt-2">
                   In this evolving and competitive market, Al consulting firms need clear differentiators to stand out. Potential areas include:
                 </p>
                 {/* Ordered List for Differentiation Areas */}
                 <ol className="list-decimal list-inside space-y-4 pl-4 mb-4 text-gray-700 leading-relaxed text-base">
                    <li>
                        <span className="font-semibold">Deep Expertise in High-Impact Al Risk & Governance:</span> Becoming the recognized leader in interpreting and implementing M-25-21 requirements for high-impact Al, including nuanced risk assessments, tailored mitigation strategies, and robust governance frameworks (potentially certified against NIST AI RMF). This requires combining technical Al knowledge with regulatory understanding and ethical considerations.
                    </li>
                    <li>
                        <span className="font-semibold">Proven Methodologies for Performance-Based Al:</span> Developing and demonstrating effective methodologies for defining outcome metrics, structuring performance-based contracts (per M-25-22), and validating Al performance against mission goals. This addresses a key agency challenge and aligns with the push for efficiency.
                    </li>
                    <li>
                        <span className="font-semibold">Sector-Specific Al Solutions:</span> Building deep expertise and tailored solutions for specific federal domains (e.g., Al for healthcare compliance at HHS/VA, AI for financial crime detection at Treasury/DOJ, Al for environmental modeling at EPA) or regulated industries adapting to federal standards. This requires combining Al skills with intimate knowledge of sector-specific missions, data, and regulations.<sup>116</sup>
                    </li>
                    <li>
                        <span className="font-semibold">"American Al" Focus and Trust:</span> Explicitly positioning the firm as a provider of US-developed, secure, and trustworthy Al solutions, aligning with the "Buy American" preference in M-25-22 and broader national security concerns. This may involve highlighting US-based talent, partnerships with US tech companies, and robust security practices.
                    </li>
                    <li>
                        <span className="font-semibold">Data Governance and Secure Al Implementation Prowess:</span> Differentiating through advanced capabilities in managing sensitive government data for Al, ensuring compliance with privacy regulations and M-25-22 restrictions, implementing secure MLOps, and protecting against Al-specific cyber threats. This addresses a critical bottleneck and risk area for agencies.<sup>5</sup>
                    </li>
                    <li>
                        <span className="font-semibold">Integrated Al, Cyber, and Privacy Offerings:</span> Providing holistic solutions that address the interconnected risks across Al, cybersecurity (NIST CSF), and privacy (NIST PFW), reflecting the convergence highlighted in recent NIST updates.<sup>88</sup>
                    </li>
                    <li>
                        <span className="font-semibold">Agile and Efficient Delivery Models:</span> Countering the perception of large consulting projects as slow and costly by offering more agile delivery models, potentially leveraging reusable assets or platforms, and clearly demonstrating cost-effectiveness to appeal to agencies under DOGE scrutiny.
                    </li>
                 </ol>
                 <p className="text-gray-700 leading-relaxed text-base mb-4">
                   Firms that can successfully cultivate and communicate expertise in one or more of these areas will be better positioned to capture market share and build sustainable relationships in the 2025 federal Al landscape.
                 </p>
              </div>
            </div>


            {/* Navigation Buttons Container */}
            <div className="mt-12 pt-6 border-t border-gray-200 flex justify-between items-center">
               {/* Back Button */}
               <Link href="/knowledge/AI-Strategy-2025-Policies-Funding" passHref> {/* Link to Funding page */}
                 <button
                   onClick={handleBackSectionClick}
                   className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                 >
                   <ArrowLeft className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
                   Previous Section
                 </button>
               </Link>

              {/* Next Button */}
              <Link href="/knowledge/AI-Strategy-2025-Policies-Recommendations" passHref> {/* Update href to your conclusion/final page */}
                 <button
                   onClick={handleNextSectionClick}
                   className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                 >
                   Go to Next Section {/* Or next section title */}
                   <ArrowRight className="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
                 </button>
              </Link>
            </div>

          </div> {/* End of content card */}
        <Footer />
      </div>
    </>
  );
};

export default ReportPageCompetitiveAnalysis; // Ensure the component name is unique
