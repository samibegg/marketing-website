import Image from 'next/image';
import Header from '../../components/Header'; // Adjust path as needed
import Footer from '../../components/Footer'; // Adjust path as needed
import { ArrowRight, ArrowLeft } from 'lucide-react'; // Added ArrowLeft
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
 * Component to display the Sectoral Impacts report page with advanced analytics.
 */
const ReportPageSectoralImpacts = () => {
  // State for collapsible sections (A, B, C, D)
  const [sectionsOpen, setSectionsOpen] = useState({ A: false, B: false, C: false, D: false });
  const contentRef = useRef(null); // Ref for copy tracking
  const scrollMilestonesReached = useRef(new Set()); // Ref for scroll tracking
  const activeTimeStart = useRef(Date.now()); // Ref for active time tracking
  const totalActiveTime = useRef(0); // Ref for active time tracking

  // --- Analytics Tracking Effects ---

  // 1. Track initial page view
  useEffect(() => {
    trackEvent('page_view', { page_title: '2025 US AI Policy Report - Sectoral Impacts' });
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
          trackEvent('scroll_depth', { depth_percentage: milestone, page_section: 'Sectoral Impacts' });
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
        trackEvent('active_time_spent', { duration_seconds: Math.round(totalActiveTime.current / 1000), page_section: 'Sectoral Impacts' });
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
          page_section: 'Sectoral Impacts',
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
    trackEvent('section_toggle', { section: `II-${sectionKey}`, action: newState ? 'expand' : 'collapse' });
  };

  const handleNextSectionClick = () => {
    trackEvent('navigation_click', { button_text: 'Go to Summary', target_url: '/report/summary' });
  };

  // Added handler for Back button click tracking
  const handleBackSectionClick = () => {
    trackEvent('navigation_click', { button_text: 'Go to Previous Section', target_url: '/report/us-ai-policy-2025' }); // Assuming previous page URL
  };

  // --- SEO Content ---
  const pageTitle = "Sectoral Impacts of 2025 US AI Policy | AI Consulting Imperatives";
  const pageDescription = "Analysis of how the 2025 US AI policy changes impact federal agencies, regulated industries (healthcare, finance), defense, and the technology sector.";
  const canonicalUrl = "https://www.yourwebsite.com/report/us-ai-policy-2025-sectoral-impacts"; // Replace
  const imageUrl = "https://www.yourwebsite.com/images/ai-policy-sectoral-preview.jpg"; // Replace
  const publicationDate = "2025-04-30T10:00:00Z"; // Adjust

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

            {/* Report Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-10 border-b-2 border-gray-200 pb-5">
              Navigating the 2025 US Al Policy Landscape: Strategic Imperatives for AI Initiatives
            </h1>

            {/* Section II Title */}
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mt-10 mb-5 pt-5 border-t border-gray-200">
              II. Sectoral Impacts and Evolving Client Needs
            </h2>

            {/* Intro Paragraph for Section II */}
            <p className="text-gray-700 leading-relaxed text-base mb-4">
              The 2025 US Al policy shifts, encompassing executive orders, OMB mandates, export controls, and legislative proposals, ripple outwards, impacting various sectors differently. Federal agencies face the most direct and immediate pressure to adapt, while regulated industries like healthcare and finance must navigate both direct regulations and the indirect influence of federal standards. The defense sector aligns with national security priorities but may operate under distinct guidelines, and the technology sector itself must grapple with new restrictions and procurement demands. Understanding these sector-specific impacts is vital for Al consulting firms aiming to tailor their services and strategies effectively.
            </p>

            {/* --- Section A: Federal Agencies --- */}
            <div className="mt-8 border-t pt-6">
              <h3
                className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4 cursor-pointer hover:text-indigo-600 flex justify-between items-center"
                onClick={() => toggleSection('A')}
                aria-expanded={sectionsOpen.A}
                aria-controls="section-a-content-sectoral"
              >
                <span>A. Federal Agencies: Responding to M-25-21/22 Mandates</span>
                <span className="text-sm font-normal text-indigo-500 ml-2">{sectionsOpen.A ? '[Collapse]' : '[Expand]'}</span>
              </h3>
              <div
                 id="section-a-content-sectoral"
                 className={`overflow-hidden transition-all duration-500 ease-in-out ${sectionsOpen.A ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
               >
                <p className="text-gray-700 leading-relaxed text-base mb-4 pt-2">
                  Federal agencies are at the epicenter of the 2025 policy changes. They are driven by the explicit mandates within OMB Memos M-25-21 and M-25-22, facing tight deadlines for compliance. Simultaneously, they are encouraged by the administration's "pro-innovation" stance to actively adopt Al to enhance efficiency, reduce costs, and improve the delivery of public services. This push for adoption, however, occurs under the shadow of increased budgetary scrutiny and contract reviews, exemplified by the actions of the Department of Government Efficiency (DOGE), which has targeted consulting contracts perceived as offering low value or being non-mission-critical.<sup>26</sup>
                </p>
                <p className="text-gray-700 leading-relaxed text-base mb-4">
                  This confluence of pressures creates a surge in demand for specific Al consulting services tailored to federal needs. Agencies, particularly the 24 CFO Act agencies, require immediate assistance in developing their mandated public Al Strategies within the 180-day timeframe set by M-25-21.<sup>1</sup> This involves conducting Al maturity assessments, identifying and prioritizing use cases, analyzing barriers to adoption, and formulating actionable plans aligned with OMB's template. The requirement to manage "high-impact Al" responsibly generates significant demand for governance and risk management expertise. Consultants are needed to help agencies interpret the "high-impact" definition, establish processes for classification, implement the minimum risk management practices (including pre-deployment testing, Al impact assessments focusing on privacy and civil rights, ongoing monitoring), set up agency Al Governance Boards, and support the newly empowered CAIOs in their oversight roles. Aligning these practices with established frameworks like the NIST AI RMF can provide a structured and defensible approach.<sup>22</sup>
                </p>
                <p className="text-gray-700 leading-relaxed text-base mb-4">
                  Navigating the revamped procurement landscape under M-25-22 is another critical area. Agencies need support in shifting to performance-based acquisition models, which involves defining clear outcome metrics, evaluating vendor capabilities through potential pre-award testing, and managing contracts based on results. Consultants can also advise on implementing the "Buy American" preference for Al, negotiating favorable data and IP rights clauses to prevent vendor lock-in, ensuring vendor transparency, and verifying compliance with restrictions on using government data for external model training.<sup>4</sup>
                </p>
                 <p className="text-gray-700 leading-relaxed text-base mb-4">
                   Furthermore, agencies require assistance with foundational elements like data governance—improving data quality, establishing interoperability standards, and creating secure protocols for data sharing and reuse as encouraged by M-25-21. Workforce enablement is also key, necessitating consulting services for developing Al training programs tailored to various agency roles, defining clear responsibilities, and fostering a culture receptive to Al adoption. Finally, there are opportunities to support the implementation of specific Al use cases aimed at improving mission effectiveness, such as automating claims processing, enhancing fraud detection, supporting scientific modeling (e.g., at EPA<sup>76</sup>), or optimizing IT operations.<sup>1</sup>
                 </p>
                 <p className="text-gray-700 leading-relaxed text-base mb-4">
                   The sheer volume and tight deadlines of the OMB mandates create an immediate compliance-driven demand surge for these services, as many agencies lack the internal capacity to meet these requirements alone.<sup>10</sup> However, looking beyond initial compliance, the administration's emphasis on innovation, value, and performance, combined with DOGE's focus on efficiency<sup>27</sup>, signifies a longer-term shift. Consulting engagements will increasingly need to demonstrate tangible ROI and measurable improvements in mission delivery, moving beyond effort-based justifications to outcome-based value propositions.
                 </p>
              </div>
            </div>

            {/* --- Section B: Regulated Industries --- */}
             <div className="mt-8 border-t pt-6">
               <h3
                 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4 cursor-pointer hover:text-indigo-600 flex justify-between items-center"
                 onClick={() => toggleSection('B')}
                 aria-expanded={sectionsOpen.B}
                 aria-controls="section-b-content-sectoral"
               >
                 <span>B. Regulated Industries (Healthcare, Finance): Adapting Al Strategies</span>
                 <span className="text-sm font-normal text-indigo-500 ml-2">{sectionsOpen.B ? '[Collapse]' : '[Expand]'}</span>
               </h3>
               <div
                 id="section-b-content-sectoral"
                 className={`overflow-hidden transition-all duration-500 ease-in-out ${sectionsOpen.B ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
               >
                 <p className="text-gray-700 leading-relaxed text-base mb-4 pt-2">
                   While EO 14179 and the OMB memos primarily target federal agencies, their influence extends to heavily regulated sectors like healthcare and finance. These industries must navigate their own existing regulatory frameworks while also considering the standards and priorities being set at the federal level for Al.
                 </p>
                 <p className="text-gray-700 leading-relaxed text-base mb-4">
                   In healthcare, federal policies directly impact agencies like the Department of Health and Human Services (HHS), the Food and Drug Administration (FDA), the Centers for Medicare & Medicaid Services (CMS), and the National Institutes of Health (NIH).<sup>45</sup> The FDA, for instance, actively regulates the use of Al and machine learning in medical devices.<sup>40</sup> The definition of "high-impact Al" in M-25-21 explicitly includes applications affecting "human health and safety" and potentially "medically relevant functions of medical devices," suggesting that Al systems used in clinical settings or interacting with federal health programs will face heightened scrutiny. Legislative proposals like the Healthy Technology Act (H.R. 238) even contemplate a future where state-authorized and FDA-approved Al could prescribe drugs.<sup>61</sup> Given the sensitivity of health data (Protected Health Information - PHI), robust risk management, stringent privacy protection (aligning with HIPAA and potentially the Al-related updates in the NIST Privacy Framework<sup>88</sup>), and careful consideration of ethical issues like algorithmic bias in health outcomes are paramount.<sup>22</sup> The Department of Veterans Affairs' use of Al for patient care exemplifies federal adoption in this space. Consulting opportunities in healthcare therefore include advising on FDA compliance for Al/ML medical devices, implementing risk management frameworks for high-impact clinical Al (especially systems interfacing with CMS or VA), developing ethical Al strategies focused on health equity, ensuring robust data governance for PHI in Al applications, supporting Al use in biomedical research and drug discovery<sup>85</sup>, and navigating evolving state regulations impacting healthcare Al (e.g., California's rules on Al in prior authorization<sup>67</sup>).
                 </p>
                 <p className="text-gray-700 leading-relaxed text-base mb-4">
                   In the financial services sector, Al is widely used for fraud detection, risk modeling, algorithmic trading, and customer service. However, the potential for misuse, such as Al-driven financial crimes, market manipulation through false signals, or sophisticated fraud using deepfakes and synthetic identities, is a growing concern, as highlighted by the proposed AI PLAN Act (H.R. 2152) which mandates a federal strategy to combat these threats.<sup>65</sup> The US Department of the Treasury is actively monitoring Al use and promoting security best practices within the sector.<sup>52</sup> The "high-impact Al" definition from M-25-21 also covers Al affecting access to critical financial services like credit and insurance. Consequently, financial institutions face pressure to ensure their Al models are not only effective but also secure, explainable, fair, and compliant with numerous regulations (e.g., fair lending laws, consumer protection rules).<sup>22</sup> Additionally, fintech companies involved in developing or utilizing advanced Al may be impacted by BIS export controls on high-performance computing resources. Consulting needs in finance include developing Al strategies aligned with financial regulations, implementing comprehensive Al model risk management (MRM) programs<sup>92</sup>, building secure and resilient Al infrastructure, creating explainable Al (XAI) solutions to meet regulatory demands for transparency, advising on Al applications for fraud prevention and Anti-Money Laundering (AML), ensuring fairness and mitigating bias in algorithms used for lending, underwriting, or customer segmentation, and helping firms navigate BIS export controls for global operations.
                 </p>
                 <p className="text-gray-700 leading-relaxed text-base mb-4">
                   A key consideration for both sectors is the indirect influence of federal Al policy. Even if not directly subject to OMB M-25-21, companies operating in these regulated environments, especially those contracting with the government, receiving federal funding, or requiring federal approvals (like FDA clearance), will likely find it prudent to align their internal Al governance and risk management practices with the standards being established for federal agencies.<sup>15</sup> The principles outlined in the federal framework, particularly regarding high-impact Al risk management, data privacy, and ethical considerations, are likely to shape broader regulatory expectations and industry best practices. Furthermore, the extreme sensitivity of health and financial data amplifies the importance and stakes of Al governance, security, and privacy in these sectors, making specialized consulting expertise that combines Al knowledge with deep sector-specific regulatory understanding highly valuable.<sup>22</sup>
                 </p>
              </div>
            </div>

            {/* --- Section C: Defense Sector --- */}
             <div className="mt-8 border-t pt-6">
               <h3
                 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4 cursor-pointer hover:text-indigo-600 flex justify-between items-center"
                 onClick={() => toggleSection('C')}
                 aria-expanded={sectionsOpen.C}
                 aria-controls="section-c-content-sectoral"
               >
                 <span>C. Defense Sector: Aligning with National Security Priorities</span>
                 <span className="text-sm font-normal text-indigo-500 ml-2">{sectionsOpen.C ? '[Collapse]' : '[Expand]'}</span>
               </h3>
               <div
                 id="section-c-content-sectoral"
                 className={`overflow-hidden transition-all duration-500 ease-in-out ${sectionsOpen.C ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
               >
                 <p className="text-gray-700 leading-relaxed text-base mb-4 pt-2">
                   The defense sector operates within a unique context regarding the 2025 Al policies. While OMB Memos M-25-21 and M-25-22 largely exclude "national security systems" from their direct applicability, the overarching goal of EO 14179 to enhance "national security" through Al dominance remains a central driver. Several aspects of the broader policy landscape strongly resonate with Department of Defense (DoD) priorities. The emphasis on maximizing the use of US-developed and produced Al products and services ("Buy American") aligns closely with long-standing defense acquisition preferences for trusted domestic suppliers. The stringent BIS export controls are explicitly designed to prevent adversaries from obtaining advanced Al capabilities relevant to military applications.
                 </p>
                 <p className="text-gray-700 leading-relaxed text-base mb-4">
                   Furthermore, the defense sector represents a significant potential market for Al investment. A proposed FY2025 reconciliation bill included over $1 billion earmarked specifically for DoD Al research, deployment into existing systems, advancing the Al ecosystem, supporting Cyber Command's Al programs, enhancing Al testing capabilities, and even using Al for financial audits.<sup>16</sup> Leading defense contractors like Booz Allen Hamilton are actively positioning themselves as leaders in federal Al, particularly for defense and intelligence missions, highlighting capabilities in Al-enabled autonomy, cybersecurity, decision support, and partnerships with specialized Al firms like Shield Al.<sup>17</sup>
                 </p>
                 <p className="text-gray-700 leading-relaxed text-base mb-4">
                   Consulting opportunities within the defense sector involve supporting both the DoD and its contractors. This includes developing secure, resilient, and trustworthy Al systems tailored for mission-critical defense applications (e.g., autonomous systems, command and control, intelligence surveillance and reconnaissance (ISR), logistics, cybersecurity, predictive maintenance). Advising on the complex ethical considerations of Al in warfare and autonomous decision-making is another crucial area. Consultants can also assist with navigating the unique defense acquisition processes for Al technologies, supporting the integration of Al into legacy platforms, and ensuring compliance with existing and potential future DoD-specific Al directives. While the Biden administration had issued an Al National Security Memorandum (AI NSM) in 2024<sup>19</sup>, its status under the new administration and EO 14179 is unclear, suggesting that revised or new DoD-specific guidance may emerge.
                 </p>
                 <p className="text-gray-700 leading-relaxed text-base mb-4">
                   The exclusion of national security systems from the primary OMB memos suggests the potential for a "dual-track" Al policy within the US government. This implies that the rules, risk tolerance levels, transparency requirements, and potentially even ethical guardrails applied to Al in defense and intelligence contexts might differ from those applied to civilian agencies. This necessitates specialized knowledge for consultants operating in the defense space, who must track DoD-specific directives and understand the unique mission requirements and security constraints. The "Buy American" imperative is also likely to be applied most rigorously in defense procurement due to national security and supply chain integrity concerns, creating a strong preference for domestic Al vendors and consulting partners with appropriate clearances and trusted relationships within the defense industrial base.
                 </p>
              </div>
            </div>

            {/* --- Section D: Technology Sector --- */}
             <div className="mt-8 border-t pt-6">
               <h3
                 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4 cursor-pointer hover:text-indigo-600 flex justify-between items-center"
                 onClick={() => toggleSection('D')}
                 aria-expanded={sectionsOpen.D}
                 aria-controls="section-d-content-sectoral"
               >
                 <span>D. Technology Sector Clients: Adapting to Controls and Restrictions</span>
                 <span className="text-sm font-normal text-indigo-500 ml-2">{sectionsOpen.D ? '[Collapse]' : '[Expand]'}</span>
               </h3>
               <div
                 id="section-d-content-sectoral"
                 className={`overflow-hidden transition-all duration-500 ease-in-out ${sectionsOpen.D ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
               >
                 <p className="text-gray-700 leading-relaxed text-base mb-4 pt-2">
                   The technology sector, encompassing Al developers, hardware manufacturers, cloud service providers, and software companies, is directly impacted by several facets of the 2025 policy changes. The most immediate and significant impact stems from the BIS export controls. These regulations restrict the sale and transfer of advanced Al chips (e.g., high-performance GPUs), related manufacturing equipment, and sophisticated Al model weights to designated countries, particularly China. This affects companies involved in hardware design and manufacturing (like Nvidia<sup>100</sup>), cloud providers offering Al training and inference services, and developers of large-scale Al models, potentially disrupting global supply chains, sales strategies, and international research collaborations.
                 </p>
                 <p className="text-gray-700 leading-relaxed text-base mb-4">
                   Technology companies serving the federal government face additional pressures from the OMB procurement guidance (M-25-22). The restriction on using non-public government data to train commercial Al models requires careful data handling protocols and contractual safeguards. Vendors must also meet heightened expectations regarding performance validation, interoperability (to prevent lock-in), transparency through documentation, and negotiating data/IP rights. Furthermore, the patchwork of emerging state-level Al regulations (e.g., California's potential requirement for developers to document copyrighted training data<sup>67</sup>, or Utah's chatbot disclosure laws<sup>57</sup>) adds another layer of complexity for technology providers operating nationwide.
                 </p>
                  <p className="text-gray-700 leading-relaxed text-base mb-4">
                    These challenges create demand for specialized consulting services within the technology sector itself. Companies require expert advice on navigating the complex BIS export control regime, including interpreting the rules, applying for necessary licenses or exceptions (AIA, LPP, ACM), qualifying for the VEU program, and implementing robust compliance programs. Consultants can help develop strategies to mitigate supply chain risks arising from these controls. For government contractors, advisory services are needed to ensure compliance with M-25-22 procurement requirements, including secure data handling practices, performance validation methodologies, strategies for ensuring interoperability, and negotiation support for data/IP clauses. Developing internal Al governance frameworks aligned with standards like the NIST AI RMF and navigating the fragmented landscape of state Al laws are also critical areas where tech companies need guidance.
                  </p>
                  <p className="text-gray-700 leading-relaxed text-base mb-4">
                    The aggressive US export controls risk accelerating a bifurcation of the global Al market.<sup>101</sup> By restricting China's access to leading-edge US technology, the policy may force global companies to navigate increasingly separate ecosystems and potentially push China to intensify efforts in developing its own independent Al capabilities. This geopolitical dynamic fundamentally reshapes the competitive environment for technology firms. In this context, demonstrating robust Al governance, security, transparency, and compliance with relevant regulations (federal, state, and international like the EU AI Act<sup>25</sup>) becomes not just a legal necessity but a crucial competitive differentiator for technology companies, particularly those selling into government or other regulated industries.<sup>11</sup>
                  </p>
              </div>
            </div>

            {/* Navigation Buttons Container */}
            <div className="mt-12 pt-6 border-t border-gray-200 flex justify-between items-center">
               {/* Back Button */}
               <Link href="/knowledge/AI-Strategy-2025-Policies-Landscape" passHref> {/* Update href to your previous page */}
                 <button
                   onClick={handleBackSectionClick}
                   className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                 >
                   <ArrowLeft className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
                   Previous Section
                 </button>
               </Link>

              {/* Next Button */}
              <Link href="/knowledge/AI-Strategy-2025-Policies-Key-Challenges" passHref> {/* Update href to your summary/next page */}
                 <button
                   onClick={handleNextSectionClick}
                   className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                 >
                   Go to Next Section
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

export default ReportPageSectoralImpacts;
