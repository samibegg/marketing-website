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
  // Example: window.gtag('event', eventName, eventData);
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
 * Component to display the Key Challenges report page with advanced analytics.
 */
const ReportPageKeyChallenges = () => {
  // State for collapsible sections (A, B, C, D, E) - Added E
  const [sectionsOpen, setSectionsOpen] = useState({ A: false, B: false, C: false, D: false, E: false });
  const contentRef = useRef(null); // Ref for copy tracking
  const scrollMilestonesReached = useRef(new Set()); // Ref for scroll tracking
  const activeTimeStart = useRef(Date.now()); // Ref for active time tracking
  const totalActiveTime = useRef(0); // Ref for active time tracking

  // --- Analytics Tracking Effects ---

  // 1. Track initial page view
  useEffect(() => {
    trackEvent('page_view', { page_title: '2025 US AI Policy Report - Key Challenges' }); // Updated title
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
          trackEvent('scroll_depth', { depth_percentage: milestone, page_section: 'Key Challenges' }); // Updated section
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
        trackEvent('active_time_spent', { duration_seconds: Math.round(totalActiveTime.current / 1000), page_section: 'Key Challenges' }); // Updated section
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
          page_section: 'Key Challenges', // Updated section
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
    trackEvent('section_toggle', { section: `III-${sectionKey}`, action: newState ? 'expand' : 'collapse' }); // Updated section prefix
  };

  // Updated handler for Next button click tracking
  const handleNextSectionClick = () => {
    trackEvent('navigation_click', { button_text: 'Go to Conclusion', target_url: '/report/conclusion' }); // Updated target/text
  };

  // Updated handler for Back button click tracking
  const handleBackSectionClick = () => {
    trackEvent('navigation_click', { button_text: 'Go to Previous Section', target_url: '/report/us-ai-policy-2025-sectoral-impacts' }); // Updated target
  };

  // --- SEO Content ---
  const pageTitle = "Key Challenges in the 2025 US AI Policy Environment"; // Updated
  const pageDescription = "Examining challenges from the 2025 US AI policies, including regulatory ambiguity, procurement standards, risk management, talent gaps, and budget scrutiny."; // Updated
  const canonicalUrl = "https://www.yourwebsite.com/report/us-ai-policy-2025-key-challenges"; // Updated - Replace
  const imageUrl = "https://www.yourwebsite.com/images/ai-policy-challenges-preview.jpg"; // Updated - Replace
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
       "logo": { "@type": "ImageObject", "url": "https://www.yourwebsite.com/images/logo.png" } // Replace
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

            {/* Section III Title */}
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mt-10 mb-5 pt-5 border-t border-gray-200">
              III. Key Challenges in the New Al Policy Environment
            </h2>

            {/* Intro Paragraph for Section III */}
            <p className="text-gray-700 leading-relaxed text-base mb-4">
              While the 2025 US Al policies aim to foster innovation and leadership, they also introduce significant challenges for both the government agencies tasked with implementation and the businesses operating within or serving this ecosystem. Navigating regulatory ambiguity, meeting stringent procurement standards, integrating robust risk management, addressing talent shortages, and coping with increased budget scrutiny are among the primary hurdles. Al consulting firms must understand these challenges intimately to effectively advise their clients and position their own services.
            </p>

            {/* --- Section A: Interpreting Regulations --- */}
            <div className="mt-8 border-t pt-6">
              <h3
                className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4 cursor-pointer hover:text-indigo-600 flex justify-between items-center"
                onClick={() => toggleSection('A')}
                aria-expanded={sectionsOpen.A}
                aria-controls="section-a-content-challenges"
              >
                <span>A. Interpreting and Complying with New Regulations (esp. "High-Impact Al")</span>
                <span className="text-sm font-normal text-indigo-500 ml-2">{sectionsOpen.A ? '[Collapse]' : '[Expand]'}</span>
              </h3>
              <div
                 id="section-a-content-challenges"
                 className={`overflow-hidden transition-all duration-500 ease-in-out ${sectionsOpen.A ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
               >
                <p className="text-gray-700 leading-relaxed text-base mb-4 pt-2">
                  A central challenge lies in the interpretation and consistent application of the new regulatory framework, particularly the definition of "high-impact Al" introduced in OMB M-25-21.<sup>3</sup> While consolidating the previous "rights-impacting" and "safety-impacting" categories into a single tier simplifies classification<sup>44</sup>, the definition itself relies on potentially ambiguous thresholds: Al whose output serves as a "principal basis" for decisions with "legal, material, binding, or significant effect" on key areas. Determining precisely which Al systems cross this threshold requires careful judgment and context-specific analysis.<sup>20</sup> Agencies and the vendors supplying them face uncertainty in consistently applying this definition. An overly broad interpretation could subject numerous low-risk systems to burdensome requirements, straining resources and hindering the memo's innovation goals. Conversely, an overly narrow interpretation might fail to capture genuinely high-risk applications, undermining the goal of protecting rights and safety. This ambiguity is compounded by the use of slightly different definitions for "Al" or "Al system" across key documents like EO 14179, M-25-21, and M-25-22, potentially adding layers of confusion.<sup>20</sup> Furthermore, the proliferation of distinct Al-related laws at the state level creates a complex patchwork quilt of regulations that businesses operating nationally must navigate.<sup>40</sup>
                </p>
                <p className="text-gray-700 leading-relaxed text-base mb-4">
                   The lack of clear, universally accepted criteria for the "high-impact" threshold risks inconsistent application across different federal agencies.<sup>56</sup> Individual CAIOS or governance boards might develop varying interpretations based on their agency's specific mission, risk appetite, or resource constraints. This potential inconsistency creates an uneven playing field for vendors selling solutions to multiple agencies and makes standardized compliance difficult. Consequently, there is a pressing need for practical guidance—whether from OMB, GSA's forthcoming procurement guides<sup>19</sup>, industry consortia, or expert consultants—on how to operationalize the definition and apply the minimum risk management practices in a consistent yet contextually appropriate manner.
                </p>
              </div>
            </div>

            {/* --- Section B: Procurement Standards --- */}
             <div className="mt-8 border-t pt-6">
               <h3
                 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4 cursor-pointer hover:text-indigo-600 flex justify-between items-center"
                 onClick={() => toggleSection('B')}
                 aria-expanded={sectionsOpen.B}
                 aria-controls="section-b-content-challenges"
               >
                 {/* Note: Removed bullet point from header text */}
                 <span>B. Meeting Stringent Federal Procurement Standards (M-25-22)</span>
                 <span className="text-sm font-normal text-indigo-500 ml-2">{sectionsOpen.B ? '[Collapse]' : '[Expand]'}</span>
               </h3>
               <div
                 id="section-b-content-challenges"
                 className={`overflow-hidden transition-all duration-500 ease-in-out ${sectionsOpen.B ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
               >
                 <p className="text-gray-700 leading-relaxed text-base mb-4 pt-2">
                   The Al acquisition guidance in OMB M-25-22, while intended to drive efficiency and leverage American innovation, imposes a demanding set of requirements on both agencies and vendors. Vendors seeking federal contracts must now be prepared to meet criteria that go beyond traditional technical specifications. The strong encouragement of performance-based acquisition means vendors must clearly articulate and demonstrate the specific mission outcomes their Al solutions will achieve, supported by measurable metrics. This often requires pre-award testing and validation capabilities.<sup>19</sup>
                 </p>
                 <p className="text-gray-700 leading-relaxed text-base mb-4">
                   Compliance with the "Buy American" preference for Al products and services adds another layer, requiring vendors to potentially demonstrate US origins for their technology, a complex task in the globalized software and cloud services market. Contract negotiations are likely to become more complex, focusing on securing specific data and IP rights for the government, implementing robust protections against vendor lock-in through interoperability standards, and ensuring explicit restrictions on the use of non-public government data for training commercial models. Vendors also face heightened expectations for transparency, requiring comprehensive documentation to facilitate explainability and performance tracking.<sup>14</sup>
                 </p>
                 <p className="text-gray-700 leading-relaxed text-base mb-4">
                   These multifaceted requirements may pose a disproportionate challenge for smaller Al vendors or startups compared to large, established government contractors who possess dedicated legal, compliance, and proposal teams.<sup>57</sup> While M-25-22 aims to foster competition<sup>3</sup>, the inherent complexity could inadvertently favor incumbents. Agencies themselves face the challenge of developing the internal expertise needed to effectively define performance requirements for Al, evaluate sophisticated technical proposals, conduct meaningful pre-award validation, and manage outcome-based contracts.<sup>10</sup>
                 </p>
              </div>
            </div>

            {/* --- Section C: Risk Management --- */}
             <div className="mt-8 border-t pt-6">
               <h3
                 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4 cursor-pointer hover:text-indigo-600 flex justify-between items-center"
                 onClick={() => toggleSection('C')}
                 aria-expanded={sectionsOpen.C}
                 aria-controls="section-c-content-challenges"
               >
                 {/* Note: Removed bullet point from header text */}
                 <span>C. Integrating Robust Risk Management (Aligning with M-25-21 & NIST AI RMF)</span>
                 <span className="text-sm font-normal text-indigo-500 ml-2">{sectionsOpen.C ? '[Collapse]' : '[Expand]'}</span>
               </h3>
               <div
                 id="section-c-content-challenges"
                 className={`overflow-hidden transition-all duration-500 ease-in-out ${sectionsOpen.C ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
               >
                 <p className="text-gray-700 leading-relaxed text-base mb-4 pt-2">
                   M-25-21 mandates that agencies implement comprehensive Al risk management practices, with a specific focus on the minimum requirements for systems designated as "high-impact". Successfully meeting this mandate requires a deep understanding of the diverse spectrum of Al-associated risks, including algorithmic bias leading to unfair outcomes, security vulnerabilities exploitable by adversaries (e.g., data poisoning, model evasion), privacy violations through data misuse or inference, operational failures due to model drift or unreliability, and broader ethical concerns.<sup>15</sup> Agencies must establish processes for identifying these risks within specific use cases, conducting thorough impact assessments, developing and implementing effective mitigation strategies, and ensuring continuous monitoring throughout the Al lifecycle.
                 </p>
                  <p className="text-gray-700 leading-relaxed text-base mb-4">
                    Although M-25-21 does not explicitly require adherence to the National Institute of Standards and Technology (NIST) AI Risk Management Framework (RMF)<sup>24</sup>, this framework is widely recognized and provides a valuable, structured methodology (Govern, Map, Measure, Manage) that aligns well with the memo's requirements.<sup>15</sup> Given its credibility and existing adoption in industry and government discussions, the NIST AI RMF is likely to serve as a de facto standard or benchmark for agencies seeking a systematic and defensible approach to implementing M-25-21's risk management directives. Consultants advising agencies should therefore possess strong proficiency in applying the NIST AI RMF.
                  </p>
                  <p className="text-gray-700 leading-relaxed text-base mb-4">
                    Furthermore, effective Al risk management cannot exist in a vacuum. It must be integrated with established practices for cybersecurity and data privacy. The recent updates to the NIST Privacy Framework (PFW) 1.1, which explicitly include a section on Al and privacy risk and align more closely with the NIST Cybersecurity Framework (CSF) 2.0, underscore this convergence.<sup>88</sup> Al systems introduce unique privacy challenges (e.g., inferring sensitive information from non-sensitive data) and cybersecurity threats (e.g., adversarial attacks targeting model integrity).<sup>22</sup> M-25-21 itself requires consideration of privacy and civil rights impacts. Therefore, implementing Al risk management necessitates a holistic approach that bridges Al governance, cybersecurity, and privacy protection, requiring cross-functional expertise within agencies and their consulting partners.<sup>67</sup>
                  </p>
              </div>
            </div>

            {/* --- Section D: Talent Gaps --- */}
             <div className="mt-8 border-t pt-6">
               <h3
                 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4 cursor-pointer hover:text-indigo-600 flex justify-between items-center"
                 onClick={() => toggleSection('D')}
                 aria-expanded={sectionsOpen.D}
                 aria-controls="section-d-content-challenges"
               >
                 {/* Note: Removed bullet point from header text */}
                 <span>D. Addressing Talent Gaps and Workforce Training Needs</span>
                 <span className="text-sm font-normal text-indigo-500 ml-2">{sectionsOpen.D ? '[Collapse]' : '[Expand]'}</span>
               </h3>
               <div
                 id="section-d-content-challenges"
                 className={`overflow-hidden transition-all duration-500 ease-in-out ${sectionsOpen.D ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
               >
                 <p className="text-gray-700 leading-relaxed text-base mb-4 pt-2">
                   A persistent challenge across both the public and private sectors is the scarcity of skilled Al talent.<sup>10</sup> Federal agencies face significant hurdles in recruiting, training, and retaining personnel with the expertise needed to develop, procure, manage, and oversee Al systems effectively, as mandated by M-25-21. While longer-term initiatives like the Al Education Executive Order<sup>34</sup> and proposed legislation aimed at workforce development<sup>60</sup> and research infrastructure<sup>63</sup> seek to build the domestic talent pipeline, agencies face immediate operational needs.
                 </p>
                 <p className="text-gray-700 leading-relaxed text-base mb-4">
                   The requirement extends beyond specialized Al practitioners. M-25-21 emphasizes the need for an "Al-ready workforce", implying that various roles within an agency require some level of Al literacy. This includes leaders who must make strategic decisions about Al adoption, managers overseeing Al-augmented teams, procurement officials evaluating Al solutions, legal and compliance staff assessing risks, and end-users interacting with Al tools.<sup>32</sup> Effective human oversight of high-impact Al, a key requirement of M-25-21, depends on personnel being adequately trained to understand the capabilities and limitations of the systems they monitor. Successfully implementing the administration's Al agenda hinges on addressing these workforce challenges through comprehensive training, reskilling initiatives, and effective change management strategies.<sup>40</sup>
                 </p>
              </div>
            </div>

             {/* --- Section E: Budget Scrutiny --- */}
             <div className="mt-8 border-t pt-6">
               <h3
                 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4 cursor-pointer hover:text-indigo-600 flex justify-between items-center"
                 onClick={() => toggleSection('E')}
                 aria-expanded={sectionsOpen.E}
                 aria-controls="section-e-content-challenges"
               >
                 <span>E. Navigating Increased Budget Scrutiny and Contract Reviews</span>
                 <span className="text-sm font-normal text-indigo-500 ml-2">{sectionsOpen.E ? '[Collapse]' : '[Expand]'}</span>
               </h3>
               <div
                 id="section-e-content-challenges"
                 className={`overflow-hidden transition-all duration-500 ease-in-out ${sectionsOpen.E ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
               >
                 <p className="text-gray-700 leading-relaxed text-base mb-4 pt-2">
                   The push for Al adoption within the federal government is occurring alongside intensified scrutiny of government spending, particularly on consulting services. The establishment and aggressive actions of the Department of Government Efficiency (DOGE), reportedly led by Elon Musk initially, have resulted in significant budget cuts and widespread reviews of federal contracts held by major consulting firms.<sup>26</sup> Firms like IBM, Accenture, Deloitte, and Booz Allen Hamilton, which derive substantial revenue from federal contracts, have reported contract cancellations or slowdowns attributed to these reviews.<sup>26</sup>
                 </p>
                 <p className="text-gray-700 leading-relaxed text-base mb-4">
                   This environment forces agencies to rigorously justify the value and necessity of their consulting engagements, particularly those deemed non-mission-critical.<sup>27</sup> Consulting firms, in turn, face increased pressure to demonstrate tangible results, efficiency gains, and clear alignment with agency missions to retain existing contracts and win new ones.<sup>27</sup> The focus is shifting away from effort-based billing towards outcome-based value. This heightened scrutiny creates significant uncertainty and risk, especially for consulting firms heavily dependent on federal sector revenue.<sup>26</sup>
                 </p>
                 <p className="text-gray-700 leading-relaxed text-base mb-4">
                   This shift in the power dynamic, driven by DOGE's mandate to cut waste<sup>27</sup>, compels consultants to adopt more transparent pricing models and clearly articulate the ROI of their services. While challenging for large incumbents accustomed to long-term, broad-scope contracts, this focus on efficiency and specific, demonstrable outcomes might create openings for smaller, more specialized or boutique consulting firms.<sup>106</sup> Such firms may be able to offer targeted expertise in high-demand areas like high-impact Al risk management or specific mission applications more cost-effectively, potentially appealing to agencies under pressure to optimize spending.<sup>26</sup>
                 </p>
              </div>
            </div>

            {/* Navigation Buttons Container */}
            <div className="mt-12 pt-6 border-t border-gray-200 flex justify-between items-center">
               {/* Back Button */}
               <Link href="/knowledge/AI-Strategy-2025-Policies-Sectoral-Impacts" passHref> {/* Updated href to previous page */}
                 <button
                   onClick={handleBackSectionClick}
                   className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                 >
                   <ArrowLeft className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
                   Previous Section
                 </button>
               </Link>

              {/* Next Button */}
              <Link href="/knowledge/AI-Strategy-2025-Policies-Opportunities" passHref> {/* Update href to your conclusion/next page */}
                 <button
                   onClick={handleNextSectionClick}
                   className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                 >
                   Go to Next Section {/* Updated Button Text */}
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

export default ReportPageKeyChallenges; // Ensure the component name is unique
