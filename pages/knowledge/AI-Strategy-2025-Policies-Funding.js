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
 * Component to display the Funding & Contracts report page with advanced analytics.
 */
const ReportPageFunding = () => {
  // State for collapsible sections (A, B, C)
  const [sectionsOpen, setSectionsOpen] = useState({ A: false, B: false, C: false });
  const contentRef = useRef(null); // Ref for copy tracking
  const scrollMilestonesReached = useRef(new Set()); // Ref for scroll tracking
  const activeTimeStart = useRef(Date.now()); // Ref for active time tracking
  const totalActiveTime = useRef(0); // Ref for active time tracking

  // --- Analytics Tracking Effects ---

  // 1. Track initial page view
  useEffect(() => {
    trackEvent('page_view', { page_title: '2025 US AI Policy Report - Funding & Contracts' }); // Updated title
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
          trackEvent('scroll_depth', { depth_percentage: milestone, page_section: 'Funding & Contracts' }); // Updated section
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
        trackEvent('active_time_spent', { duration_seconds: Math.round(totalActiveTime.current / 1000), page_section: 'Funding & Contracts' }); // Updated section
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
          page_section: 'Funding & Contracts', // Updated section
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
    trackEvent('section_toggle', { section: `V-${sectionKey}`, action: newState ? 'expand' : 'collapse' }); // Updated section prefix
  };

  // Updated handler for Next button click tracking (assuming this is the last content page before a conclusion/summary)
  const handleNextSectionClick = () => {
    trackEvent('navigation_click', { button_text: 'Go to Conclusion', target_url: '/report/conclusion' }); // Update if needed
  };

  // Updated handler for Back button click tracking
  const handleBackSectionClick = () => {
    trackEvent('navigation_click', { button_text: 'Go to Previous Section', target_url: '/report/us-ai-policy-2025-opportunities' }); // Link to Opportunities page
  };

  // --- SEO Content ---
  const pageTitle = "Government Funding & Contract Opportunities in the 2025 US AI Policy Landscape"; // Updated
  const pageDescription = "Overview of funding streams (NSF, DoD, TMF), public-private partnerships, and strategies for winning performance-based AI contracts under the 2025 US AI policies."; // Updated
  const canonicalUrl = "https://www.forgemission.com/knowledge/AI-Strategy-2025-Policies-Executive-Summary"; // Updated - Replace
  const imageUrl = "https://www.forgemission.com/images/ai-policy-funding-preview.jpg"; // Updated - Replace
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

            {/* Section V Title */}
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mt-10 mb-5 pt-5 border-t border-gray-200">
              V. Government Funding and Contract Opportunities
            </h2>

            {/* Intro Paragraph for Section V */}
            <p className="text-gray-700 leading-relaxed text-base mb-4">
              The 2025 policy landscape not only creates demand for Al services but also shapes the funding environment and contracting mechanisms through which these services will be procured. Understanding the key funding streams, partnership avenues, and preferred contracting approaches is essential for Al consulting firms seeking to capture government business.
            </p>

            {/* --- Section A: Identifying Funding Streams --- */}
            <div className="mt-8 border-t pt-6">
              <h3
                className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4 cursor-pointer hover:text-indigo-600 flex justify-between items-center"
                onClick={() => toggleSection('A')}
                aria-expanded={sectionsOpen.A}
                aria-controls="section-a-content-funding"
              >
                <span>A. Identifying Funding Streams</span>
                <span className="text-sm font-normal text-indigo-500 ml-2">{sectionsOpen.A ? '[Collapse]' : '[Expand]'}</span>
              </h3>
              <div
                 id="section-a-content-funding"
                 className={`overflow-hidden transition-all duration-500 ease-in-out ${sectionsOpen.A ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'}`} // Increased max-h
               >
                <p className="text-gray-700 leading-relaxed text-base mb-4 pt-2">
                  Funding for federal Al initiatives will likely flow through several channels. A primary source will be direct agency budgets, as agencies must allocate resources to comply with the mandates in M-25-21 and M-25-22. This includes funding for developing Al strategies, establishing governance structures (CAIOS, boards), implementing risk management practices for high-impact Al, modernizing IT infrastructure to support Al, training personnel, and procuring Al solutions identified in their strategies. Consultants should target these existing operational, IT modernization, and program-specific budgets within individual agencies.
                </p>
                <p className="text-gray-700 leading-relaxed text-base mb-4">
                  Beyond general agency funding, several specific Al-focused initiatives and programs represent potential opportunities:
                </p>
                {/* Unordered List for Bullet Points */}
                <ul className="list-disc list-outside space-y-3 pl-8 mb-4 text-gray-700 leading-relaxed text-base">
                    <li>
                        <span className="font-semibold">National Science Foundation (NSF):</span> Historically a major funder of foundational Al research and development<sup>36</sup>, NSF supports areas like machine learning foundations, trustworthy Al, human-Al interaction, and Al applications across science and engineering domains. NSF also plays a key role in Al education and workforce development, including managing the National Al Research Institutes. However, consultants should be aware that NSF is undergoing priority reviews under the new administration, which has led to the termination of some grants perceived as misaligned with current priorities, particularly those focused on Diversity, Equity, and Inclusion (DEI) or combating "misinformation".<sup>16</sup> Funding priorities emphasize core S&E discovery, technological innovation, and broadening participation within statutory constraints.<sup>118</sup> Opportunities related to Al education, workforce development<sup>34</sup>, and potentially the NAIRR initiative<sup>63</sup> may align well.
                    </li>
                    <li>
                        <span className="font-semibold">Department of Defense (DoD):</span> The defense sector represents a significant potential growth area for Al funding, driven by national security priorities. A proposed FY2025 reconciliation bill included over $1 billion in additional funding specifically for DoD Al initiatives, covering R&D, deployment, ecosystem support, Cyber Command Al, testing infrastructure, and Al-based auditing.<sup>16</sup> The Defense Advanced Research Projects Agency (DARPA) continues to solicit innovative proposals for disruptive technologies, including Al, through various Broad Agency Announcements (BAAs) and program announcements across its technical offices.<sup>37</sup> DoD focus areas include Al for autonomy, cybersecurity, intelligence analysis, logistics, and achieving decision advantage.<sup>17</sup>
                    </li>
                    <li>
                        <span className="font-semibold">Technology Modernization Fund (TMF):</span> This fund provides resources to federal agencies for upgrading legacy IT systems, enhancing cybersecurity, and improving digital services for the public. The FY2025 budget request specifically highlighted Al and customer experience as priorities for TMF support.<sup>36</sup> Agencies may seek TMF funding for projects involving Al implementation to modernize operations or citizen-facing services.
                    </li>
                    <li>
                        <span className="font-semibold">Al Education Initiatives:</span> The Executive Order on Al Education for American Youth<sup>34</sup> creates potential funding avenues through the Department of Education (e.g., discretionary grants for teacher training), the Department of Labor (e.g., Workforce Innovation and Opportunity Act (WIOA) funding for Al skills and apprenticeships), and NSF programs focused on Al in education.<sup>16</sup>
                    </li>
                    <li>
                        <span className="font-semibold">Other Agency Missions:</span> Specific Al applications highlighted in the policy documents or agency use cases suggest targeted funding opportunities within various departments, such as the Department of Veterans Affairs (Al for patient care<sup>3</sup>), Department of Justice (Al for combating drug trafficking<sup>3</sup>), Environmental Protection Agency (Al for scientific modeling<sup>76</sup>), and Department of the Treasury (Al related to financial crime prevention<sup>52</sup>).
                    </li>
                </ul>
                <p className="text-gray-700 leading-relaxed text-base mb-4">
                  It is crucial for consulting firms to recognize that funding allocations will likely be heavily influenced by the administration's policy priorities outlined in EO 14179 and the OMB memos.<sup>29</sup> Proposals demonstrating clear alignment with goals such as enhancing US Al leadership, promoting innovation, ensuring national security, improving government efficiency, utilizing American Al, and responsibly managing high-impact Al risks will have a stronger competitive position. Understanding the specific focus of each funding source—whether R&D (NSF, DARPA) or implementation/modernization (TMF, agency budgets)—is also key to tailoring proposals effectively.<sup>4</sup>
                </p>
              </div>
            </div>

            {/* --- Section B: Public-Private Partnerships --- */}
             <div className="mt-8 border-t pt-6">
               <h3
                 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4 cursor-pointer hover:text-indigo-600 flex justify-between items-center"
                 onClick={() => toggleSection('B')}
                 aria-expanded={sectionsOpen.B}
                 aria-controls="section-b-content-funding"
               >
                 <span>B. Leveraging Public-Private Partnership Avenues</span>
                 <span className="text-sm font-normal text-indigo-500 ml-2">{sectionsOpen.B ? '[Collapse]' : '[Expand]'}</span>
               </h3>
               <div
                 id="section-b-content-funding"
                 className={`overflow-hidden transition-all duration-500 ease-in-out ${sectionsOpen.B ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
               >
                 <p className="text-gray-700 leading-relaxed text-base mb-4 pt-2">
                   The 2025 policy landscape actively encourages collaboration between the government, industry, and academia, creating opportunities through Public-Private Partnerships (PPPs). The Al Education EO explicitly mandates the establishment of PPPs involving industry organizations, academic institutions, and non-profits to collaboratively develop resources for K-12 Al education and teacher training.<sup>16</sup> If enacted, the CREATE AI Act's vision for a National Al Research Resource (NAIRR) would almost certainly rely heavily on PPPs for providing compute resources, datasets, and operational expertise.<sup>63</sup>
                 </p>
                 <p className="text-gray-700 leading-relaxed text-base mb-4">
                   Beyond these specific initiatives, there is a broader trend towards leveraging private sector innovation and expertise to achieve federal goals. This is evident in collaborations like Accenture Federal Services partnering with Google Public Sector on Al solutions<sup>55</sup> or Booz Allen Hamilton partnering with Shield Al for defense autonomy and Credo Al for governance platforms.<sup>68</sup> These partnerships serve as mechanisms to advance the "American Al" ecosystem favored by the administration.<sup>11, 11</sup> {/* Note: Duplicate footnote 11 in source */}
                 </p>
                 <p className="text-gray-700 leading-relaxed text-base mb-4">
                   Al consulting firms can play a role in this ecosystem by facilitating the formation and management of PPPs, advising private companies on how to effectively engage with government partnership opportunities, helping structure collaborative research or development projects, and contributing expertise to the development of shared resources or platforms stemming from these initiatives.
                 </p>
              </div>
            </div>

            {/* --- Section C: Performance-Based Contracts --- */}
             <div className="mt-8 border-t pt-6">
               <h3
                 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4 cursor-pointer hover:text-indigo-600 flex justify-between items-center"
                 onClick={() => toggleSection('C')}
                 aria-expanded={sectionsOpen.C}
                 aria-controls="section-c-content-funding"
               >
                 <span>C. Strategies for Winning Performance-Based Contracts</span>
                 <span className="text-sm font-normal text-indigo-500 ml-2">{sectionsOpen.C ? '[Collapse]' : '[Expand]'}</span>
               </h3>
               <div
                 id="section-c-content-funding"
                 className={`overflow-hidden transition-all duration-500 ease-in-out ${sectionsOpen.C ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
               >
                 <p className="text-gray-700 leading-relaxed text-base mb-4 pt-2">
                   OMB Memo M-25-22's strong encouragement of performance-based acquisition for Al necessitates a shift in how consulting firms and technology vendors approach federal proposals and contracts. Success in this environment requires moving beyond detailing the proposed effort or methodology to clearly demonstrating the expected results and how they will be measured.
                 </p>
                 <p className="text-gray-700 leading-relaxed text-base mb-4 font-semibold">
                   Key strategies for winning performance-based Al contracts include:
                 </p>
                 {/* Unordered List for Bullet Points */}
                 <ul className="list-disc list-outside space-y-3 pl-8 mb-4 text-gray-700 leading-relaxed text-base">
                    <li>
                        <span className="font-semibold">Outcome-Centric Proposals:</span> Frame proposals around the specific mission outcomes the Al solution will enable for the agency, aligning with goals potentially outlined in their Al Strategy. Quantify expected benefits (e.g., cost savings, efficiency gains, improved service delivery metrics) whenever possible.
                    </li>
                    <li>
                        <span className="font-semibold">Proposing Measurable and Relevant Metrics:</span> Work with the agency (or proactively propose) clear, specific, measurable, achievable, relevant, and time-bound (SMART) performance metrics that accurately reflect the value proposition of the Al solution. Avoid vanity metrics and focus on indicators tied to mission success.
                    </li>
                    <li>
                        <span className="font-semibold">Demonstrating Capability and Validation:</span> Be prepared to substantiate performance claims through demonstrations, pilot projects, or pre-award testing as required by M-25-22.<sup>19</sup> Have robust internal testing and validation processes.
                    </li>
                    <li>
                        <span className="font-semibold">Highlighting Flexibility and Interoperability:</span> Emphasize the solution's adaptability, scalability, and ability to integrate with existing agency systems, addressing M-25-22's concerns about vendor lock-in. Discuss adherence to open standards where applicable.
                    </li>
                    <li>
                        <span className="font-semibold">Building Trust through Transparency and Risk Management:</span> Provide comprehensive documentation regarding the Al model, data used, and limitations. Clearly articulate the risk management processes employed during development and planned for deployment, aligning with M-25-21 principles.<sup>14</sup>
                    </li>
                    <li>
                        <span className="font-semibold">Leveraging Relevant Past Performance:</span> Showcase previous projects, especially within the federal government, where similar Al solutions delivered quantifiable positive outcomes.
                    </li>
                 </ul>
                 <p className="text-gray-700 leading-relaxed text-base mb-4">
                   This shift requires consulting firms to invest in capabilities related to Al evaluation, metrics definition, outcome-based solution design, and potentially establishing environments for demonstrating and validating Al performance. It favors firms that can confidently link their Al expertise to tangible agency results.
                 </p>
              </div>
            </div>


            {/* Navigation Buttons Container */}
            <div className="mt-12 pt-6 border-t border-gray-200 flex justify-between items-center">
               {/* Back Button */}
               <Link href="/knowledge/AI-Strategy-2025-Policies-Opportunities" passHref> {/* Link to Opportunities page */}
                 <button
                   onClick={handleBackSectionClick}
                   className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                 >
                   <ArrowLeft className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
                   Previous Section
                 </button>
               </Link>

              {/* Next Button */}
              <Link href="/knowledge/AI-Strategy-2025-Policies-Competitive-Analysis" passHref> {/* Update href to your conclusion/final page */}
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

export default ReportPageFunding; // Ensure the component name is unique
