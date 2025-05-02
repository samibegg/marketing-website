import Image from 'next/image';
import Header from '../../components/Header'; // Adjust path as needed
import Footer from '../../components/Footer'; // Adjust path as needed
import { ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Head from 'next/head';
import { NextSeo } from 'next-seo';

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
 * Component to display the Recommendations report page with advanced analytics.
 */
const ReportPageRecommendations = () => {
  // State for collapsible sections (A, B, C, D, E)
  const [sectionsOpen, setSectionsOpen] = useState({ A: false, B: false, C: false, D: false, E: false });
  const contentRef = useRef(null); // Ref for copy tracking
  const scrollMilestonesReached = useRef(new Set()); // Ref for scroll tracking
  const activeTimeStart = useRef(Date.now()); // Ref for active time tracking
  const totalActiveTime = useRef(0); // Ref for active time tracking

  // --- Analytics Tracking Effects ---

  // 1. Track initial page view
  useEffect(() => {
    trackEvent('page_view', { page_title: '2025 US AI Policy Report - Recommendations' }); // Updated title
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
          trackEvent('scroll_depth', { depth_percentage: milestone, page_section: 'Recommendations' }); // Updated section
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
        trackEvent('active_time_spent', { duration_seconds: Math.round(totalActiveTime.current / 1000), page_section: 'Recommendations' }); // Updated section
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
          page_section: 'Recommendations', // Updated section
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
    trackEvent('section_toggle', { section: `VII-${sectionKey}`, action: newState ? 'expand' : 'collapse' }); // Updated section prefix
  };

  // Handler for Next button click tracking (Assuming no page after this one)
  const handleNextSectionClick = () => {
    trackEvent('navigation_click', { button_text: 'Report End', target_url: null }); // Indicate end
  };

  // Handler for Back button click tracking
  const handleBackSectionClick = () => {
    trackEvent('navigation_click', { button_text: 'Go to Previous Section', target_url: '/report/us-ai-policy-2025-competitive-analysis' }); // Link to Competitive Analysis page
  };

  // --- SEO Content ---
  const pageTitle = "Strategic Recommendations for AI Consulting Firms (2025 US Policy)"; // Updated
  const pageDescription = "Strategic recommendations for AI consulting firms based on the 2025 US AI policy landscape, covering focus areas, clients, services, talent, and positioning."; // Updated
  const canonicalUrl = "https://www.forgemission.com/knowledge/AI-Strategy-2025-Policies-Executive-Summary"; // Updated - Replace
  const imageUrl = "https://www.forgemission.com/images/ai-policy-recommendations-preview.jpg"; // Updated - Replace
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
      <NextSeo
        title={pageTitle}
        description={pageDescription}
        canonical={canonicalUrl}
        noindex={true}
        nofollow={true}
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
          {/* Main content area with ref for copy tracking */}
          <div ref={contentRef} className="max-w-5xl mx-auto bg-white p-8 sm:p-10 lg:p-12 rounded-lg shadow-lg flex-grow">

            {/* Report Title (Consistent with overall report) */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-10 border-b-2 border-gray-200 pb-5">
              Navigating the 2025 US Al Policy Landscape: Strategic Imperatives for AI Initiatives
            </h1>

            {/* Section VII Title */}
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mt-10 mb-5 pt-5 border-t border-gray-200">
              VII. Strategic Recommendations for Al Consulting Firms
            </h2>

            {/* Intro Paragraph for Section VII */}
            <p className="text-gray-700 leading-relaxed text-base mb-4">
              Based on the analysis of the 2025 US Al policy landscape, sectoral impacts, prevailing challenges, market opportunities, and competitive dynamics, the following strategic recommendations are provided for Al strategy, implementation consulting, and services companies seeking to succeed in this environment.
            </p>

            {/* --- Section A: Recommended Strategic Focus Areas --- */}
            <div className="mt-8 border-t pt-6">
              <h3
                className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4 cursor-pointer hover:text-indigo-600 flex justify-between items-center"
                onClick={() => toggleSection('A')}
                aria-expanded={sectionsOpen.A}
                aria-controls="section-a-content-recommendations"
              >
                {/* Note: Removed bullet point from header text */}
                <span>A. Recommended Strategic Focus Areas</span>
                <span className="text-sm font-normal text-indigo-500 ml-2">{sectionsOpen.A ? '[Collapse]' : '[Expand]'}</span>
              </h3>
              <div
                 id="section-a-content-recommendations"
                 className={`overflow-hidden transition-all duration-500 ease-in-out ${sectionsOpen.A ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
               >
                 {/* Ordered List for Focus Areas */}
                <ol className="list-decimal list-inside space-y-4 pl-4 my-4 text-gray-700 leading-relaxed text-base"> {/* Added my-4 */}
                  <li>
                    <span className="font-semibold">Master High-Impact Al Governance and Risk Management:</span> Prioritize developing deep, demonstrable expertise in navigating the requirements surrounding "high-impact Al" as defined in OMB M-25-21. This includes mastering the interpretation of the definition, conducting rigorous Al Impact Assessments (AllAs) with a focus on civil rights and privacy, implementing the mandated minimum risk practices (testing, monitoring, human oversight), and leveraging the NIST AI RMF as a core framework for structured implementation.<sup>13</sup> This area represents a mandatory compliance need for agencies and a significant market opportunity demanding specialized skills.
                  </li>
                  <li>
                    <span className="font-semibold">Specialize in Federal Al Strategy and Performance-Based Procurement:</span> Become experts in assisting federal agencies (especially CFO Act agencies) in developing compliant and effective Al Strategies within the M-25-21 timeframe. Concurrently, build strong capabilities in advising both agencies and vendors on navigating the performance-based acquisition requirements of M-25-22, including defining outcome metrics, structuring solicitations, validating performance, and negotiating contracts. Linking strategy development to procurement support offers end-to-end value.
                  </li>
                  <li>
                    <span className="font-semibold">Integrate Data Governance and Secure Al Implementation:</span> Focus on providing holistic solutions that address the critical interdependencies between Al, data governance, cybersecurity, and privacy. Offer services that help agencies manage data quality, ensure interoperability, comply with data usage restrictions (M-25-22), implement secure MLOps, and protect against Al-specific threats, aligning with converged frameworks like NIST CSF and PFW.<sup>18</sup> Solving data challenges is key to enabling successful Al adoption.<sup>5</sup>
                  </li>
                </ol>
              </div>
            </div>

            {/* --- Section B: Target Client Segments --- */}
             <div className="mt-8 border-t pt-6">
               <h3
                 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4 cursor-pointer hover:text-indigo-600 flex justify-between items-center"
                 onClick={() => toggleSection('B')}
                 aria-expanded={sectionsOpen.B}
                 aria-controls="section-b-content-recommendations"
               >
                 <span>B. Target Client Segments</span>
                 <span className="text-sm font-normal text-indigo-500 ml-2">{sectionsOpen.B ? '[Collapse]' : '[Expand]'}</span>
               </h3>
               <div
                 id="section-b-content-recommendations"
                 className={`overflow-hidden transition-all duration-500 ease-in-out ${sectionsOpen.B ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
               >
                 {/* Ordered List for Client Segments */}
                <ol className="list-decimal list-inside space-y-4 pl-4 my-4 text-gray-700 leading-relaxed text-base"> {/* Added my-4 */}
                  <li>
                    <span className="font-semibold">CFO Act Federal Agencies:</span> These 24 agencies face the most immediate and comprehensive mandates under M-25-21 (e.g., 180-day Al Strategy deadline) and M-25-22, creating urgent needs for strategy, governance, risk, and procurement support. Prioritize outreach and tailored offerings for these key departments.
                  </li>
                  <li>
                    <span className="font-semibold">Federal Agencies with High-Impact Al Use Cases:</span> Target agencies whose missions inherently involve decisions with significant effects on rights, safety, or critical services (e.g., HHS, VA, DHS, DOJ, DOT, Treasury, EPA) as they will require specialized support for high-impact Al risk management.<sup>3</sup>
                  </li>
                  <li>
                    <span className="font-semibold">Regulated Industries (Healthcare, Finance):</span> Engage with clients in these sectors who are adapting to the indirect influence of federal Al standards and facing sector-specific Al regulations. Focus on services related to compliance (FDA, financial regulators), ethical Al, model risk management, and secure data handling.<sup>22</sup>
                  </li>
                  <li>
                    <span className="font-semibold">Defense and Intelligence Community:</span> Pursue opportunities within DoD and IC agencies, leveraging expertise in secure Al, autonomy, data analytics, and mission-specific applications, while navigating the unique procurement and policy landscape potentially separate from OMB memos.<sup>16</sup> Emphasize alignment with national security goals and US-based solutions.
                  </li>
                  <li>
                    <span className="font-semibold">Technology Vendors Serving the Federal Market:</span> Provide advisory services to Al hardware, software, and platform vendors seeking to understand and comply with M-25-22 procurement requirements, BIS export controls<sup>7</sup>, and data handling mandates.
                  </li>
                 </ol>
              </div>
            </div>

            {/* --- Section C: Priority Service Offerings --- */}
             <div className="mt-8 border-t pt-6">
               <h3
                 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4 cursor-pointer hover:text-indigo-600 flex justify-between items-center"
                 onClick={() => toggleSection('C')}
                 aria-expanded={sectionsOpen.C}
                 aria-controls="section-c-content-recommendations"
               >
                 <span>C. Priority Service Offerings</span>
                 <span className="text-sm font-normal text-indigo-500 ml-2">{sectionsOpen.C ? '[Collapse]' : '[Expand]'}</span>
               </h3>
               <div
                 id="section-c-content-recommendations"
                 className={`overflow-hidden transition-all duration-500 ease-in-out ${sectionsOpen.C ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
               >
                  <p className="text-gray-700 leading-relaxed text-base mb-4 pt-2">
                    Based on policy drivers and market needs, prioritize developing and marketing the following service lines:
                  </p>
                  {/* Ordered List for Service Offerings */}
                  <ol className="list-decimal list-inside space-y-4 pl-4 mb-4 text-gray-700 leading-relaxed text-base">
                    <li>
                        <span className="font-semibold">Al Strategy & Compliance Package:</span> An integrated offering to help CFO Act agencies rapidly develop their M-25-21 compliant Al Strategy, including maturity assessment, use case identification, and roadmap development.
                    </li>
                    <li>
                        <span className="font-semibold">High-Impact Al Risk & Governance Solution:</span> A specialized service focused on identifying high-impact Al, conducting AllAs, implementing minimum risk practices using NIST AI RMF, and establishing agency governance structures (supporting CAIOs/Boards).
                    </li>
                    <li>
                        <span className="font-semibold">Performance-Based Al Procurement Advisory:</span> Services for both agencies (developing solicitations, metrics, evaluation criteria) and vendors (proposal support, performance validation strategies) aligned with M-25-22.
                    </li>
                    <li>
                        <span className="font-semibold">Trustworthy Al Implementation:</span> Services focused on building ethical frameworks, ensuring fairness, enhancing transparency/explainability, and mitigating bias in Al systems, particularly for regulated industries and high-impact applications.
                    </li>
                    <li>
                        <span className="font-semibold">Secure Data & Al Operations (SecDevOps for Al):</span> Offerings that combine data governance best practices, secure MLOps pipeline implementation, Al-specific cybersecurity assessments, and privacy compliance for government and regulated clients.
                    </li>
                    <li>
                        <span className="font-semibold">Al Workforce Transformation & Training:</span> Customized training programs for federal roles (leadership, technical, user), Al literacy initiatives, and change management support to accelerate adoption.
                    </li>
                  </ol>
              </div>
            </div>

            {/* --- Section D: Talent and Capability Development --- */}
             <div className="mt-8 border-t pt-6">
               <h3
                 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4 cursor-pointer hover:text-indigo-600 flex justify-between items-center"
                 onClick={() => toggleSection('D')}
                 aria-expanded={sectionsOpen.D}
                 aria-controls="section-d-content-recommendations"
               >
                 {/* Note: Removed bullet point from header text */}
                 <span>D. Talent and Capability Development</span>
                 <span className="text-sm font-normal text-indigo-500 ml-2">{sectionsOpen.D ? '[Collapse]' : '[Expand]'}</span>
               </h3>
               <div
                 id="section-d-content-recommendations"
                 className={`overflow-hidden transition-all duration-500 ease-in-out ${sectionsOpen.D ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
               >
                  {/* Ordered List for Talent Development */}
                  <ol className="list-decimal list-inside space-y-4 pl-4 my-4 text-gray-700 leading-relaxed text-base"> {/* Added my-4 */}
                    <li>
                        <span className="font-semibold">Cultivate Cross-Functional Expertise:</span> Build teams that blend AI/ML technical skills with expertise in federal policy and procurement, sector-specific regulations (healthcare, finance, defense), risk management frameworks (NIST AI RMF, CSF, PFW), data governance, cybersecurity, and ethics.
                    </li>
                    <li>
                        <span className="font-semibold">Invest in NIST Framework Proficiency:</span> Ensure consultants are deeply familiar with the NIST AI RMF, CSF, and PFW, as these are likely to be foundational frameworks for implementation, even if not explicitly mandated in all cases.<sup>22</sup>
                    </li>
                    <li>
                        <span className="font-semibold">Develop Performance Measurement Capabilities:</span> Invest in methodologies and potentially tools for defining and measuring Al performance in the context of federal missions to support performance-based contracting services.
                    </li>
                    <li>
                        <span className="font-semibold">Stay Abreast of Policy Evolution:</span> Establish processes for continuously monitoring federal and state Al policy developments, including the forthcoming White House Al Action Plan<sup>2</sup>, GSA procurement guides<sup>19</sup>, potential FAR updates<sup>11</sup>, and legislative progress.<sup>60</sup>
                    </li>
                  </ol>
              </div>
            </div>

             {/* --- Section E: Positioning and Messaging --- */}
             <div className="mt-8 border-t pt-6">
               <h3
                 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4 cursor-pointer hover:text-indigo-600 flex justify-between items-center"
                 onClick={() => toggleSection('E')}
                 aria-expanded={sectionsOpen.E}
                 aria-controls="section-e-content-recommendations"
               >
                 {/* Note: Removed bullet point from header text */}
                 <span>E. Positioning and Messaging</span>
                 <span className="text-sm font-normal text-indigo-500 ml-2">{sectionsOpen.E ? '[Collapse]' : '[Expand]'}</span>
               </h3>
               <div
                 id="section-e-content-recommendations"
                 className={`overflow-hidden transition-all duration-500 ease-in-out ${sectionsOpen.E ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
               >
                  {/* Ordered List for Positioning */}
                  <ol className="list-decimal list-inside space-y-4 pl-4 my-4 text-gray-700 leading-relaxed text-base"> {/* Added my-4 */}
                    <li>
                        <span className="font-semibold">Emphasize Value, Efficiency, and Compliance:</span> Position the firm not just as an Al implementer but as a strategic partner that helps agencies achieve mission outcomes efficiently, ensure compliance with new mandates, and demonstrate value for taxpayer dollars, directly addressing DOGE scrutiny.<sup>26</sup>
                    </li>
                    <li>
                        <span className="font-semibold">Highlight Trustworthiness and Security:</span> Emphasize capabilities in building secure, reliable, fair, and transparent Al systems, aligning with the enduring need for public trust in government Al use.<sup>1</sup>
                    </li>
                    <li>
                        <span className="font-semibold">Promote "American Al" Alignment:</span> Where applicable, highlight the firm's US presence, use of US-developed technologies, and contribution to US AI leadership goals outlined in EO 14179 and M-25-22.<sup>1</sup>
                    </li>
                    <li>
                        <span className="font-semibold">Showcase Sector-Specific Understanding:</span> Tailor messaging and case studies to demonstrate deep understanding of the unique challenges, missions, and regulatory contexts of target client segments (e.g., federal health, financial regulation, defense).
                    </li>
                    <li>
                        <span className="font-semibold">Focus on Partnership and Enablement:</span> Position the firm as an enabler that builds agency capacity and fosters sustainable Al adoption through training, governance support, and collaboration, rather than creating long-term dependencies.
                    </li>
                  </ol>
                   <p className="text-gray-700 leading-relaxed text-base mb-4">
                     By adopting these strategic recommendations, Al consulting firms can effectively navigate the complexities of the 2025 US Al policy environment, address the urgent needs of federal agencies and other impacted sectors, differentiate themselves in a competitive market, and ultimately achieve sustained success.
                   </p>
              </div>
            </div>

            {/* Navigation Buttons Container */}
            <div className="mt-12 pt-6 border-t border-gray-200 flex justify-between items-center">
               {/* Back Button */}
               <Link href="/knowledge/AI-Strategy-2025-Policies-Competitive-Analysis" passHref> {/* Link to Competitive Analysis page */}
                 <button
                   onClick={handleBackSectionClick}
                   className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                 >
                   <ArrowLeft className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
                   Previous Section
                 </button>
               </Link>

              {/* Next Button */}
              <Link href="/knowledge/AI-Strategy-2025-Policies-References" passHref> {/* Update href to your conclusion/final page */}
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

export default ReportPageRecommendations; // Ensure the component name is unique
