import Image from 'next/image';
import Header from '../../components/Header'; // Adjust path as needed
import Footer from '../../components/Footer'; // Adjust path as needed
import { ArrowRight, ArrowLeft } from 'lucide-react'; // Added ArrowLeft
import Link from 'next/link';
import React, { useState, useEffect, useRef, useCallback } from 'react'; // Added useRef, useCallback
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
 * @param {Function} func - The function to debounce.
 * @param {number} delay - The debounce delay in milliseconds.
 * @returns {Function} - The debounced function.
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
 * Component to display the formatted AI Policy Report with advanced analytics.
 */
const ReportPage = () => {
  const [sectionsOpen, setSectionsOpen] = useState({ A: false, B: false, C: false, D: false });
  const contentRef = useRef(null); // Ref for the main content area
  const scrollMilestonesReached = useRef(new Set()); // Track reached scroll depths
  const activeTimeStart = useRef(Date.now()); // Track start time for active reading
  const totalActiveTime = useRef(0); // Accumulate active time

  // --- Analytics Tracking Effects ---

  // 1. Track initial page view
  useEffect(() => {
    trackEvent('page_view', { page_title: '2025 US AI Policy Report' });
  }, []);

  // 2. Track Scroll Depth
  useEffect(() => {
    const handleScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollableHeight <= 0) return; // Avoid division by zero if not scrollable

      const scrollPercent = Math.min(100, Math.round((window.scrollY / scrollableHeight) * 100));
      const milestones = [25, 50, 75, 100];

      milestones.forEach(milestone => {
        if (scrollPercent >= milestone && !scrollMilestonesReached.current.has(milestone)) {
          scrollMilestonesReached.current.add(milestone);
          trackEvent('scroll_depth', { depth_percentage: milestone });
        }
      });
    };

    const debouncedScrollHandler = debounce(handleScroll, 250); // Debounce scroll events
    window.addEventListener('scroll', debouncedScrollHandler);

    // Cleanup listener on unmount
    return () => window.removeEventListener('scroll', debouncedScrollHandler);
  }, []);

  // 3. Track Active Time Spent
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        // Tab became hidden, pause timer and record elapsed time
        totalActiveTime.current += Date.now() - activeTimeStart.current;
      } else {
        // Tab became visible, reset start timer
        activeTimeStart.current = Date.now();
      }
    };

    const handleBeforeUnload = () => {
      // User is leaving the page, record final active time segment
      if (document.visibilityState === 'visible') {
        totalActiveTime.current += Date.now() - activeTimeStart.current;
      }
      // Send the total accumulated time (convert ms to seconds)
      if (totalActiveTime.current > 0) {
        trackEvent('active_time_spent', { duration_seconds: Math.round(totalActiveTime.current / 1000) });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload); // Track leaving page

    // Initial start time
    activeTimeStart.current = Date.now();

    // Cleanup listeners
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      // Optionally send final time on unmount as well, though beforeunload is often better
      // handleBeforeUnload();
    };
  }, []);

  // 4. Track Text Copying
  useEffect(() => {
    const handleCopy = () => {
      const selectedText = window.getSelection()?.toString() || '';
      if (selectedText.length > 0) {
        trackEvent('text_copied', {
          content_snippet: selectedText.substring(0, 100) + (selectedText.length > 100 ? '...' : '') // Send snippet
        });
      }
    };

    const contentElement = contentRef.current; // Get the DOM node
    if (contentElement) {
      contentElement.addEventListener('copy', handleCopy);
    }

    // Cleanup listener
    return () => {
      if (contentElement) {
        contentElement.removeEventListener('copy', handleCopy);
      }
    };
  }, []); // Empty dependency means this runs once after mount


  // --- Component Logic ---

  const toggleSection = (sectionKey) => {
    const newState = !sectionsOpen[sectionKey];
    setSectionsOpen(prevState => ({ ...prevState, [sectionKey]: newState }));
    trackEvent('section_toggle', { section: sectionKey, action: newState ? 'expand' : 'collapse' });
  };

  const handleNextSectionClick = () => {
    trackEvent('navigation_click', { button_text: 'Go to Next Section', target_url: '/report/next-section' });
  };

  // Added handler for Back button click tracking
  const handleBackSectionClick = () => {
    trackEvent('navigation_click', { button_text: 'Go to Previous Section', target_url: '/report/us-ai-policy-2025' }); // Assuming previous page URL
  };

  // --- SEO Content ---
  const pageTitle = "Navigating the 2025 US AI Policy Landscape: Strategic Imperatives";
  const pageDescription = "Analysis of the 2025 US AI policy shift, including Executive Order 14179, OMB Memos M-25-21 & M-25-22, BIS controls, and legislative proposals.";
  const canonicalUrl = "https://www.forgemission.com/knowledge/AI-Strategy-2025-Policies-Executive-Summary"; // Replace
  const imageUrl = "https://www.forgemission.com/images/ai-policy-report-preview.jpg"; // Replace
  const publicationDate = "2025-04-30T10:00:00Z"; // Adjust

  // --- JSON-LD Structured Data ---
  const jsonLd = { /* ... (JSON-LD object remains the same as previous version) ... */
    "@context": "https://schema.org",
    "@type": "Article", // Or "Report"
    "headline": pageTitle,
    "description": pageDescription,
    "image": imageUrl,
    "datePublished": publicationDate,
    "author": { "@type": "Organization", "name": "Your Organization Name" },
    "publisher": {
       "@type": "Organization",
       "name": "Your Organization Name",
       "logo": { "@type": "ImageObject", "url": "https://www.forgemission.com/images/logo.png" }
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": canonicalUrl }
  };


  return (
    <>
      <Head>
        {/* --- Primary Meta Tags --- */}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        {/* --- Canonical URL --- */}
        <link rel="canonical" href={canonicalUrl} />
        {/* --- Open Graph / Facebook --- */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={imageUrl} />
        {/* --- Twitter --- */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={canonicalUrl} />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={pageDescription} />
        <meta property="twitter:image" content={imageUrl} />
        {/* --- JSON-LD Structured Data --- */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div className="bg-white min-h-screen flex flex-col">
        <Header />
          {/* Assign the ref to the main content container */}
          <div ref={contentRef} className="max-w-5xl mx-auto bg-white p-8 sm:p-10 lg:p-12 rounded-lg shadow-lg flex-grow">

            {/* Report Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-10 border-b-2 border-gray-200 pb-5">
              Navigating the 2025 US Al Policy Landscape: Strategic Imperatives for AI Initiatives
            </h1>

            {/* Section I Title (Not collapsible) */}
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mt-10 mb-5 pt-5 border-t border-gray-200">
              I. The 2025 US AI Policy Landscape: A Pro-Innovation, Pro-Competition Shift
            </h2>

            {/* Paragraphs under Section I (Always visible) */}
            <p className="text-gray-700 leading-relaxed text-base mb-4">
              The year 2025 ushered in a significant reorientation of United States policy concerning Artificial Intelligence (AI). Spearheaded by a new administration, the policy direction shifted markedly from the previous focus on preemptive safety guardrails towards an assertive stance prioritizing American innovation, global leadership, and national security. This transformation is primarily codified in Executive Order 14179 and operationalized through subsequent guidance from the Office of Management and Budget (OMB) and related regulatory actions by agencies like the Department of Commerce. Understanding the core tenets and specific mandates of this new framework is crucial for any entity operating within the Al ecosystem, particularly consulting firms advising clients on strategy and implementation.
               {/* Example Outbound Link Tracking:
               <a href="https://external-site.com" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('outbound_link_click', { url: 'https://external-site.com' })}>
                 External Link
               </a>
               */}
            </p>

            {/* --- Section A --- */}
            <div className="mt-8 border-t pt-6">
              <h3 /* ... (Section A header remains the same) ... */
                className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4 cursor-pointer hover:text-indigo-600 flex justify-between items-center"
                onClick={() => toggleSection('A')}
                aria-expanded={sectionsOpen.A}
                aria-controls="section-a-content"
              >
                <span>A. Analysis of Executive Order 14179: Setting the New Tone</span>
                <span className="text-sm font-normal text-indigo-500 ml-2">{sectionsOpen.A ? '[Collapse]' : '[Expand]'}</span>
              </h3>
              <div /* ... (Section A content remains the same) ... */
                 id="section-a-content"
                 className={`overflow-hidden transition-all duration-500 ease-in-out ${sectionsOpen.A ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
               >
                <p className="text-gray-700 leading-relaxed text-base mb-4 pt-2">
                  Signed on January 23, 2025, Executive Order (E.O.) 14179, titled "Removing Barriers to American Leadership in Artificial Intelligence," serves as the foundational document for the administration's Al policy.<sup>1</sup> Its stated purpose is unequivocal: "to sustain and enhance America's global Al dominance in order to promote human flourishing, economic competitiveness, and national security".<sup>2</sup> This objective permeates the order, signaling a departure from the more cautious approach of its predecessor. The text emphasizes the need to "remove unnecessary and bureaucratic requirements that inhibit innovation and responsible adoption"<sup>1</sup> and explicitly calls for the development of Al systems "free from ideological bias or engineered social agendas".<sup>2</sup> This language reflects a belief that prior policies acted as "barriers to American Al innovation" and that a new path must be cleared for the US "to act decisively to retain global leadership".<sup>2</sup> The philosophical underpinning represents a greater tolerance for certain risks associated with rapid Al development, viewing accelerated innovation as paramount for maintaining a competitive edge, particularly against geopolitical rivals like China.<sup>40</sup>
                </p>
                <p className="text-gray-700 leading-relaxed text-base mb-4">
                  A central action of EO 14179 is the explicit revocation of EO 14110, the Biden administration's order on "Safe, Secure, and Trustworthy Development and Use of Artificial Intelligence".<sup>2</sup> This revocation was not merely symbolic; EO 14179 mandated an immediate review of all policies, directives, regulations, and actions taken pursuant to the rescinded order. Key White House officials, including the Assistant to the President for Science and Technology (APST), the Special Advisor for Al and Crypto, and the Assistant to the President for National Security Affairs (APNSA), were tasked with identifying any such actions deemed inconsistent with the new policy of promoting Al dominance.<sup>2</sup> Agency heads were directed to suspend, revise, or rescind these identified actions promptly.<sup>2</sup> This directive signaled a clear intent to dismantle the regulatory architecture established under EO 14110, which was perceived by the new administration as overly restrictive.<sup>2</sup> However, the precise extent of this rollback created immediate uncertainty. While the overarching framework was revoked, specific initiatives launched under EO 14110, particularly those already well underway or enjoying bipartisan support (such as aspects of talent development or NIST AI Risk Management Framework adoption), might persist if deemed consistent with the new order's goals.<sup>41</sup> This necessitates close monitoring of agency-specific actions to understand the practical implications of the revocation.
                </p>
                <p className="text-gray-700 leading-relaxed text-base mb-4">
                  To operationalize its vision, EO 14179 mandated the development of a comprehensive Al Action Plan within 180 days of its issuance.<sup>2</sup> This plan, to be crafted by the APST, Special Advisor for Al and Crypto, and APNSA in coordination with OMB and relevant agency heads, is intended to outline the specific steps required to achieve and maintain US global Al leadership.<sup>2</sup> The creation of this plan suggests a move towards a more centralized, top-down approach to national Al strategy, concentrating decision-making within key White House roles. The release of this Action Plan will be a critical milestone, likely revealing specific funding priorities, research directions, and potential further policy adjustments relevant to the Al consulting sector.
                </p>
                <p className="text-gray-700 leading-relaxed text-base mb-4">
                  Furthermore, EO 14179 directly instructed the OMB Director to revise the existing OMB Memoranda M-24-10 (on Al governance and risk management) and M-24-18 (on Al acquisition) within 60 days to align them with the new policy's pro-innovation stance.<sup>2</sup> This mandate led directly to the issuance of OMB Memos M-25-21 and M-25-22 in April 2025, which form the core operational guidance for federal agencies.<sup>3</sup>
                </p>
              </div>
            </div>

            {/* --- Section B --- */}
             <div className="mt-8 border-t pt-6">
               <h3 /* ... (Section B header remains the same) ... */
                 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4 cursor-pointer hover:text-indigo-600 flex justify-between items-center"
                 onClick={() => toggleSection('B')}
                 aria-expanded={sectionsOpen.B}
                 aria-controls="section-b-content"
               >
                 <span>B. Deep Dive into OMB Memo M-25-21: Federal Al Use Mandates</span>
                 <span className="text-sm font-normal text-indigo-500 ml-2">{sectionsOpen.B ? '[Collapse]' : '[Expand]'}</span>
               </h3>
               <div /* ... (Section B content remains the same) ... */
                 id="section-b-content"
                 className={`overflow-hidden transition-all duration-500 ease-in-out ${sectionsOpen.B ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
               >
                 <p className="text-gray-700 leading-relaxed text-base mb-4 pt-2">
                   Issued on April 3, 2025, OMB Memorandum M-25-21, "Accelerating Federal Use of Al through Innovation, Governance, and Public Trust," provides detailed guidance to federal agencies on implementing EO 14179.<sup>1</sup> It formally rescinds and replaces the previous administration's M-24-10.<sup>20</sup> The memo applies broadly to Al systems developed, used, or acquired by executive departments and agencies, excluding national security systems and certain incidental uses.<sup>5</sup> Its overarching goal is to drive Al adoption to improve public services, enhance government efficiency, and provide the best value for taxpayers, while explicitly maintaining "strong safeguards for civil rights, civil liberties, and privacy".<sup>1</sup>
                 </p>
                 <p className="text-gray-700 leading-relaxed text-base mb-4">
                   A cornerstone requirement of M-25-21 is the mandate for each agency covered by the Chief Financial Officers (CFO) Act to develop and publicly release an Al Strategy within 180 days of the memo's issuance (roughly early October 2025).<sup>1</sup> These strategies, to be based on a forthcoming OMB template, must identify institutional barriers to responsible Al use and outline plans for enterprise-wide improvements in Al maturity.<sup>1</sup> Key components include detailing current and planned impactful Al use cases and assessing maturity levels across critical areas like infrastructure, data quality and access, innovation capacity, risk management processes, workforce readiness, and investment tracking.<sup>1</sup> This requirement creates an immediate and significant need for strategic Al consulting services within federal agencies to help them meet the deadline with compliant and effective strategies.
                 </p>
                 <p className="text-gray-700 leading-relaxed text-base mb-4">
                   The memo also redefines and empowers the role of the agency Chief Al Officer (CAIO). Agencies were required to designate or retain a CAIO (at a senior executive level for CFO Act agencies) within 60 days.<sup>1</sup> Significantly, M-25-21 reframes the CAIO role away from pure oversight towards being a proactive "change agent and Al advocate" tasked with promoting innovation and removing bureaucratic bottlenecks.<sup>3</sup> Their responsibilities include coordinating agency-wide Al adoption, ensuring legal compliance, advising leadership, maintaining the agency's Al Use Case Inventory, overseeing processes for high-impact Al, and guiding workforce transformation and Al investments.<sup>1</sup> An interagency CAIO Council is also established to facilitate coordination across the government.<sup>11</sup> These empowered CAIOs become crucial points of contact and influence for consultants offering strategic support.
                 </p>
                 <p className="text-gray-700 leading-relaxed text-base mb-4">
                   Perhaps the most significant policy shift within M-25-21 is the introduction of a single "high-impact Al" risk category, replacing the previous administration's more complex distinction between "rights-impacting" and "safety-impacting" Al.<sup>3</sup> Al is defined as "high-impact" when its output serves as a principal basis for decisions or actions having a legal, material, binding, or significant effect on critical areas such as civil rights, privacy, access to essential programs (education, housing, credit, employment), health and safety, critical infrastructure, or sensitive government assets.<sup>1</sup> While simplifying the classification, this definition introduces interpretive challenges around terms like "principal basis" and "significant effect".<sup>20</sup>
                 </p>
                 <p className="text-gray-700 leading-relaxed text-base mb-4">
                   For Al systems classified as high-impact, agencies must implement and document a set of minimum risk management practices within 365 days (by April 2026).<sup>1</sup> These practices include: conducting pre-deployment testing and risk mitigation planning; completing and periodically updating Al Impact Assessments (specifically considering impacts on privacy, civil rights, and civil liberties); conducting ongoing monitoring for performance, security, and potential adverse impacts; ensuring adequate human training and assessment for Al operators; providing additional human oversight, intervention, and accountability mechanisms appropriate for the context; offering consistent remedies or appeals processes for affected individuals; and consulting with end-users and the public, incorporating feedback.<sup>1</sup> If a high-impact Al system cannot meet these requirements or if risks cannot be properly mitigated, its use must be discontinued.<sup>1</sup> CAIOs can grant waivers under specific circumstances, but these require written justification and public reporting.<sup>1</sup> This area represents a critical opportunity for consulting firms specializing in Al risk management, governance, and ethical Al, particularly those adept at interpreting the new framework and potentially leveraging established standards like the NIST AI Risk Management Framework for implementation structure.<sup>22</sup> Notably, the explicit requirements from the previous memo regarding assessing impacts on "equity and fairness" to mitigate "algorithmic discrimination" were removed, though risks related to civil rights and liberties remain a focus.<sup>19</sup>
                 </p>
                 <p className="text-gray-700 leading-relaxed text-base mb-4">
                   M-25-21 also promotes efficiency through the reuse of Al assets. Agencies are directed to proactively share custom-developed Al code (including models and weights) and associated data across the government and, where practicable, release code as open-source software.<sup>1</sup> This requires coordination between CAIOs and Chief Data Officers (CDOs) on data governance, interoperability, and standardization<sup>4</sup>, creating opportunities for data strategy and governance consulting.
                 </p>
                 <p className="text-gray-700 leading-relaxed text-base mb-4">
                   Finally, recognizing the unique challenges posed by generative Al, the memo mandates that agencies develop specific policies governing its use within 270 days (around early January 2026).<sup>11</sup> These policies must address acceptable use cases, necessary safeguards, and oversight mechanisms.<sup>11</sup> This creates a specific demand for consulting expertise in developing responsible GenAl guidelines and implementation frameworks for federal agencies.
                 </p>
                 <p className="text-gray-700 leading-relaxed text-base mb-4">
                   The numerous, time-bound mandates within M-25-21 impose a significant operational burden on agencies, many of which may lack the internal expertise or resources to comply effectively.<sup>10</sup> This gap creates a substantial near-term demand for consulting support across strategy, governance, risk management, data, and workforce development. While the memo aims to balance accelerated innovation with safeguards<sup>1</sup>, the practical implementation and how agencies navigate the inherent tensions between speed and responsible deployment will be crucial areas for consulting engagement.
                 </p>
              </div>
            </div>

            {/* --- Section C --- */}
             <div className="mt-8 border-t pt-6">
               <h3 /* ... (Section C header remains the same) ... */
                 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4 cursor-pointer hover:text-indigo-600 flex justify-between items-center"
                 onClick={() => toggleSection('C')}
                 aria-expanded={sectionsOpen.C}
                 aria-controls="section-c-content"
               >
                 <span>C. Deep Dive into OMB Memo M-25-22: Navigating Al Acquisition</span>
                 <span className="text-sm font-normal text-indigo-500 ml-2">{sectionsOpen.C ? '[Collapse]' : '[Expand]'}</span>
               </h3>
               <div /* ... (Section C content remains the same) ... */
                 id="section-c-content"
                 className={`overflow-hidden transition-all duration-500 ease-in-out ${sectionsOpen.C ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
               >
                 <p className="text-gray-700 leading-relaxed text-base mb-4 pt-2">
                   Complementing M-25-21, OMB Memorandum M-25-22, "Driving Efficient Acquisition of Artificial Intelligence in Government," focuses specifically on the procurement process.<sup>5</sup> Also issued on April 3, 2025, it implements EO 14179 and rescinds the prior Al acquisition guidance, M-24-18.<sup>4</sup> The memo's goal is to enable agencies to acquire "best-in-class Al quickly, competitively, and responsibly".<sup>3</sup> Its provisions apply to Al systems or services acquired by covered agencies (excluding national security) for contracts awarded or renewed on or after October 1, 2025.<sup>5</sup>
                 </p>
                 <p className="text-gray-700 leading-relaxed text-base mb-4">
                   A prominent theme is the directive to support the American Al marketplace. M-25-22 explicitly states that "it is the policy of the United States to buy American and to maximize the use of Al products and services that are developed and produced in the United States," consistent with applicable law.<sup>1</sup> This policy aims to bolster domestic industry and ensure alignment with national security and economic goals. Agencies are encouraged to foster competition within this marketplace.<sup>3</sup> While reinforcing the administration's "America First" approach, the practical implementation of this preference for Al software and services faces challenges, including defining "American Al" in a globalized tech landscape and potential conflicts with existing trade agreements.<sup>6</sup>
                 </p>
                 <p className="text-gray-700 leading-relaxed text-base mb-4">
                   The memo strongly advocates for a shift towards performance-based acquisition techniques.<sup>3</sup> Agencies are encouraged to use Statements of Objectives (SOOs) and Performance Work Statements (PWS) that focus on desired outcomes rather than prescriptive technical requirements, supplemented by Quality Assurance Surveillance Plans (QASPs) and contract incentives.<sup>6</sup> This approach requires agencies to clearly define the mission needs and measurable performance metrics for Al solutions and necessitates that vendors demonstrate their ability to meet these outcomes, potentially through pre-award testing.<sup>19</sup> This shift presents a double-edged sword: it can drive innovation and focus on results, but defining meaningful and measurable performance metrics for complex Al systems is inherently difficult and requires significant expertise.<sup>19</sup>
                 </p>
                 <p className="text-gray-700 leading-relaxed text-base mb-4">
                   Protecting government interests regarding data and intellectual property is another key focus. M-25-22 mandates that agencies update their processes to ensure contracts include appropriately scoped data and IP rights to avoid vendor lock-in and safeguard government assets.<sup>5</sup> Critically, the memo explicitly prohibits vendors from using non-public government data to train publicly or commercially available Al models without the agency's explicit consent, requiring specific contractual clauses to enforce this.<sup>5</sup> This restriction underscores data stewardship concerns and necessitates careful contract negotiation and technical controls.
                 </p>
                 <p className="text-gray-700 leading-relaxed text-base mb-4">
                   Preventing vendor lock-in is addressed through multiple requirements. Agencies must consider lock-in risks throughout the acquisition lifecycle and prioritize interoperable products and services, potentially leveraging open standards and APIs.<sup>3</sup> This push for interoperability demands that vendors design solutions with portability in mind and requires agencies to develop strategies and technical requirements to ensure flexibility.
                 </p>
                 <p className="text-gray-700 leading-relaxed text-base mb-4">
                   Transparency and documentation are also emphasized. Agencies are directed to prioritize obtaining documentation from vendors that facilitates transparency and explainability, enabling adequate tracking of performance and effectiveness.<sup>14</sup> Furthermore, vendors may be required to disclose if they use Al incidentally during contract performance in ways the government might not anticipate.<sup>6</sup>
                 </p>
                 <p className="text-gray-700 leading-relaxed text-base mb-4">
                   To support implementation, M-25-22 directs the General Services Administration (GSA) to develop publicly available Al procurement guides and establish an online repository for agencies to share best practices and resources.<sup>19</sup> OMB also plans to release specific playbooks for procuring certain Al types, like generative Al and biometrics.<sup>11</sup> These resources will become essential references for agencies and consultants navigating the complexities of Al acquisition.
                 </p>
                 <p className="text-gray-700 leading-relaxed text-base mb-4">
                   Overall, M-25-22, while aiming for efficiency, introduces substantial new requirements and complexities into the Al procurement process for both agencies and vendors. Successfully navigating this landscape demands sophisticated technical, legal, and strategic expertise. The combination of performance-based evaluation, stringent data controls, interoperability demands, and domestic preference creates a challenging environment that may favor larger, more established contractors, despite the goal of fostering broader competition.<sup>55</sup>
                 </p>
              </div>
            </div>

            {/* --- Section D --- */}
             <div className="mt-8 border-t pt-6">
               <h3 /* ... (Section D header remains the same) ... */
                 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4 cursor-pointer hover:text-indigo-600 flex justify-between items-center"
                 onClick={() => toggleSection('D')}
                 aria-expanded={sectionsOpen.D}
                 aria-controls="section-d-content"
               >
                 <span>D. Overview of Relevant BIS Export Controls and 2025 Legislative Proposals</span>
                 <span className="text-sm font-normal text-indigo-500 ml-2">{sectionsOpen.D ? '[Collapse]' : '[Expand]'}</span>
               </h3>
               <div /* ... (Section D content remains the same) ... */
                 id="section-d-content"
                 className={`overflow-hidden transition-all duration-500 ease-in-out ${sectionsOpen.D ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
               >
                 <p className="text-gray-700 leading-relaxed text-base mb-4 pt-2">
                   Beyond the OMB directives focused on federal government use and acquisition, the broader 2025 US Al policy landscape includes significant regulatory actions concerning technology transfer and numerous legislative proposals indicating Congressional priorities.
                 </p>
                 <p className="text-gray-700 leading-relaxed text-base mb-4">
                   The Department of Commerce's Bureau of Industry and Security (BIS) took decisive action in January 2025 by issuing interim final rules that substantially expand export controls on technologies deemed critical for developing advanced Al capabilities.<sup>7</sup> Known as the "Al Diffusion Rule," this regulation tightens controls on high-performance computing integrated circuits (ICs) falling under specific Export Control Classification Numbers (ECCNs like 3A090.a, 3A090.b, 4A090.a and related.z items), associated manufacturing equipment, software, and technology.<sup>8</sup> It also introduces new controls on the export of model weights for certain advanced, closed-weight, dual-use Al models under the newly created ECCN 4E091.<sup>7</sup> These rules establish near-global licensing requirements, imposing a stringent "presumption of denial" policy for exports destined for "Prohibited Countries," explicitly including China (and Macau), Russia, and other nations subject to US arms embargoes.<sup>7</sup> Exports to other countries generally require licenses, potentially subject to quotas.<sup>7</sup> To facilitate legitimate trade and research, the rules introduce several new license exceptions, such as Artificial Intelligence Authorization (AIA) for exports to trusted partners in "Supplement 5 Countries" or for specific model weights, Low Processing Performance (LPP) for limited quantities of controlled chips, and Advanced Compute Manufacturing (ACM) for certain supply chain activities outside prohibited countries.<sup>7</sup> A revamped Data Center Validated End-User (DC VEU) program also allows eligible operators outside Supplement 5 countries to receive controlled items under strict security conditions.<sup>7</sup> These BIS regulations represent a clear strategic effort to use export controls as a tool to maintain US technological leadership in Al and prevent advanced capabilities from reaching geopolitical rivals, directly impacting the global operations of chip designers, manufacturers, cloud providers, and Al developers.<sup>7</sup> Compliance deadlines were set for mid-2025 and early 2026.<sup>7</sup>
                 </p>
                 <p className="text-gray-700 leading-relaxed text-base mb-4">
                   Concurrently, the 119th Congress saw the introduction of numerous Al-related bills, reflecting growing legislative interest, although few have advanced significantly beyond introduction.<sup>60</sup> Key themes include bolstering the foundational elements of US Al capacity. The administration's Executive Order on "Advancing Artificial Intelligence Education for American Youth" established a task force to promote Al literacy, integrate Al into K-12 education, train educators, foster public-private partnerships for educational resources, and encourage Al-related apprenticeships through agencies like the Department of Labor and NSF.<sup>16</sup> Legislative proposals echoed this focus, such as the bipartisan "Artificial Intelligence and Critical Technology Workforce Framework Act of 2025" (S. 1290), directing NIST to develop Al workforce frameworks<sup>60</sup>, and the "CREATE AI Act of 2025" (H.R. 2385), which aims to establish a National Al Research Resource (NAIRR) to provide researchers broader access to compute power and datasets, addressing concerns about resource concentration within large tech companies.<sup>63</sup>
                 </p>
                 <p className="text-gray-700 leading-relaxed text-base mb-4">
                   Other legislative efforts focused on Al governance and specific applications. The "Leveraging Artificial Intelligence to Streamline the Code of Federal Regulations Act of 2025" (S. 1110) proposed using Al systems (meeting NIST standards) to review federal regulations for redundancy or obsolescence.<sup>62</sup> Addressing security concerns, the "AI PLAN Act" (H.R. 2152) called for an interagency strategy (Treasury, DHS, Commerce) to defend against the use of Al in financial crimes, fraud, and misinformation, including threats like deepfakes and voice cloning.<sup>65</sup> In healthcare, the "Healthy Technology Act of 2025" (H.R. 238 / H.R. 238) explored the possibility of allowing Al or machine learning technologies, if authorized by state law and approved by the FDA, to qualify as practitioners eligible to prescribe certain drugs.<sup>61</sup> While these federal bills indicate areas of focus, significant legislative activity is also occurring at the state level, with numerous bills addressing issues like algorithmic discrimination, deepfakes, chatbot disclosures, and data privacy, creating a complex and fragmented regulatory landscape.<sup>40</sup> This legislative fragmentation contrasts sharply with the decisive executive actions, requiring businesses and consultants to navigate a multi-layered environment.
                 </p>
              </div>
            </div>

            {/* Next Section Button */}
            <div className="mt-12 pt-6 border-t border-gray-200 flex justify-between items-center">
               {/* Back Button */}
               <Link href="/knowledge/AI-Strategy-2025-Policies-Executive-Summary" passHref> {/* Update href to your previous page */}
                 <button
                   onClick={handleBackSectionClick}
                   className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                 >
                   <ArrowLeft className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
                   Previous Section
                 </button>
               </Link>

              {/* Next Button */}
              <Link href="/knowledge/AI-Strategy-2025-Policies-Sectoral-Impacts" passHref>
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

export default ReportPage;
