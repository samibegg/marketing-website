import Image from 'next/image';
import Header from '../../components/Header'; // Adjust path as needed
import Footer from '../../components/Footer'; // Adjust path as needed
import { ArrowLeft } from 'lucide-react'; // Only need ArrowLeft now
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
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
 * Simple debounce function - kept in case needed for future scroll/resize events
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
 * Component to display the References report page with analytics.
 */
const ReportPageReferences = () => {
  const contentRef = useRef(null); // Ref for potential future use
  const scrollMilestonesReached = useRef(new Set()); // Ref for scroll tracking
  const activeTimeStart = useRef(Date.now()); // Ref for active time tracking
  const totalActiveTime = useRef(0); // Ref for active time tracking

  // --- Analytics Tracking Effects ---

  // 1. Track initial page view
  useEffect(() => {
    trackEvent('page_view', { page_title: '2025 US AI Policy Report - References' });
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
          trackEvent('scroll_depth', { depth_percentage: milestone, page_section: 'References' });
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
        trackEvent('active_time_spent', { duration_seconds: Math.round(totalActiveTime.current / 1000), page_section: 'References' });
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

  // --- Component Logic ---

  // Handler for clicking on a reference link
  const handleReferenceLinkClick = (url) => {
    trackEvent('outbound_link_click', {
      link_url: url,
      page_section: 'References'
    });
    // Note: Actual navigation is handled by the <a> tag's href
  };

  // Handler for Back button click tracking
  const handleBackSectionClick = () => {
    trackEvent('navigation_click', { button_text: 'Go to Previous Section', target_url: '/report/us-ai-policy-2025-recommendations' }); // Link to Recommendations page
  };

  // --- SEO Content ---
  const pageTitle = "References | 2025 US AI Policy Report";
  const pageDescription = "Works cited and references for the report on Navigating the 2025 US AI Policy Landscape.";
  const canonicalUrl = "https://www.forgemission.com/knowledge/AI-Strategy-2025-Policies-Executive-Summary"; // Replace
  const imageUrl = "https://www.forgemission.com/images/ai-policy-report-preview.jpg"; // Replace

  // --- JSON-LD Structured Data ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": pageTitle,
    "description": pageDescription,
    "url": canonicalUrl,
     "isPartOf": {
        "@type": "Report",
        "name": "Navigating the 2025 US Al Policy Landscape: Strategic Imperatives for AI Initiatives"
     }
  };

  // --- Reference Data (Manually extracted and formatted from PDF) ---
  const references = [
      { text: 'April 3, 2025 M-25-21 MEMORANDUM FOR THE HEADS OF EXECUTIVE DEPARTMENTS AND AGENCIES FROM: R~ssell T. Vought \\\\ 1 \\ Director \\J - The White House, accessed April 29, 2025,', url: 'https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-21-Accelerating-Federal-Use-of-Al-through-Innovation-Governance-and-Public-Trust.pdf' },
      { text: 'Removing Barriers to American Leadership in Artificial Intelligence ..., accessed April 29, 2025,', url: 'https://www.whitehouse.gov/presidential-actions/2025/01/removing-barriers-to-american-leadership-in-artificial-intelligence/' },
      { text: 'Fact Sheet: Eliminating Barriers for Federal Artificial Intelligence Use and Procurement, accessed April 29, 2025,', url: 'https://www.whitehouse.gov/fact-sheets/2025/04/fact-sheet-eliminating-barriers-for-federal-artificial-intelligence-use-and-procurement/' },
      { text: "OMB Issues New Guidance for the Federal Government's Use of Al, and President Trump Signs EO for Al Data Centers - Al: The Washington Report | ML Strategies, accessed April 29, 2025,", url: 'https://www.mlstrategies.com/insights-center/viewpoints/54031/2025-04-11-omb-issues-new-guidance-federal-governments-use-ai-and' },
      { text: 'White House Issues Guidance on Use and Procurement of Artificial ..., accessed April 29, 2025,', url: 'https://www.ropesgray.com/en/insights/alerts/2025/04/white-house-issues-guidance-on-use-and-procurement-of-artificial-intelligence-technology' },
      { text: "Kickstarting Al in the Federal Government: OMB's Policy to Implement Executive Order 14179, accessed April 29, 2025,", url: 'https://govcon.mofo.com/topics/kickstarting-ai-in-the-federal-government-omb-s-policy-to-implement-executive-order-14179' },
      { text: 'US Commerce Dept. Rule Expands Licensing Requirements for Al-Related Materials | Skadden, Arps, Slate, Meagher & Flom LLP, accessed April 29, 2025,', url: 'https://www.skadden.com/insights/publications/2025/01/us-commerce-dept-rule-expands-licensing-requirements' },
      { text: 'US Department of Commerce Issues Interim Final Rule Designed to Protect American Al, accessed April 29, 2025,', url: 'https://www.mayerbrown.com/en/insights/publications/2025/01/us-department-of-commerce-issues-interim-final-rule-designed-to-protect-american-ai' },
      { text: 'www.bis.doc.gov, accessed April 29, 2025,', url: 'https://www.bis.doc.gov/index.php/component/docman/?task=doc_download&gid=3563' },
      { text: 'Agency Launches Enterprise-Wide Approach to Al Adoption - Guidehouse, accessed April 29, 2025,', url: 'https://guidehouse.com/case-studies/advanced-solutions/agency-launches-enterprise-wide-approach-to-ai-adoption?blaid=7338451' },
      { text: 'New Federal Agency Policies and Protocols for Artificial Intelligence Utilization and Procurement Can Provide Useful Guidance for Private Entities - Workforce Bulletin, accessed April 29, 2025,', url: 'https://www.workforcebulletin.com/new-federal-agency-policies-and-protocols-for-artificial-intelligence-utilization-and-procurement-can-provide-useful-guidance-for-private-entities' },
      { text: 'White House releases guidance for Al acquisition and use in government | DLA Piper, accessed April 29, 2025,', url: 'https://www.dlapiper.com/en-ie/insights/publications/2025/04/white-house-releases-guidance-for-ai-acquisition-and-use-in-government' },
      { text: 'OMB Issues Memos Driving Al Use and Procurement in Federal Agenci, accessed April 29, 2025,', url: 'https://natlawreview.com/article/new-federal-agency-policies-and-protocols-artificial-intelligence-utilization-and' },
      { text: 'White House Issues Guidance on Use and Procurement of Artificial Intelligence Technology, accessed April 29, 2025,', url: 'https://www.jdsupra.com/legalnews/white-house-issues-guidance-on-use-and-5932496/' },
      { text: 'Al Risk Management in 2025: What You Need To Know - Splunk, accessed April 29, 2025,', url: 'https://www.splunk.com/en_us/blog/learn/ai-risk-management.html' },
      { text: 'Science policy this week: April 28, 2025 - AIP.ORG, accessed April 29, 2025,', url: 'https://ww2.aip.org/newsletter/00000196-7dc0-d7df-a5f6-ffc669c00000' },
      { text: 'Shield Al Partner to Bring Autonomy to DOD - Booz Allen, accessed April 29, 2025,', url: 'https://www.boozallen.com/menu/media-center/q4-2025/shield-ai-partner-to-bring-ai-solutions-to-dod.html' },
      { text: 'OMB Issues Revised Policies on Al Use and Procurement by Federal Agencies, accessed April 29, 2025,', url: 'https://www.hunton.com/privacy-and-information-security-law/omb-issues-revised-policies-on-ai-use-and-procurement-by-federal-agencies' },
      { text: "OMB Issues First Trump 2.0-Era Requirements for Al Use and Procurement by Federal Agencies | Inside Government Contracts, accessed April 29, 2025,", url: 'https://www.insidegovernmentcontracts.com/2025/04/omb-issues-first-trump-2-0-era-requirements-for-ai-use-and-procurement-by-federal-agencies/' },
      { text: 'Sarah Hunt - Health & Voluntary Benefits Association, accessed April 29, 2025,', url: 'https://vbassociation.com/author/shunt/' },
      { text: 'Recent Al Policy Developments - Can Lessons be Learned from Telehealth Policy? pavmt, accessed April 29, 2025,', url: 'https://www.pavmt.org/blog-detail/recent-ai-policy-developments-can-lessons-be-learn' },
      { text: 'NIST AI Risk Management Framework: A tl;dr - Wiz, accessed April 29, 2025,', url: 'https://www.wiz.io/academy/nist-ai-risk-management-framework' },
      { text: 'NIST AI Risk Management Framework 1.0: Meaning, challenges, implementation, accessed April 29, 2025,', url: 'https://www.scrut.io/post/nist-ai-risk-management-framework' },
      { text: 'Trump Administration Revamps Guidance on Federal Use and Procurement of Al, accessed April 29, 2025,', url: 'https://www.wiley.law/alert-Trump-Administration-Revamps-Guidance-on-Federal-Use-and-Procurement-of-Al' },
      { text: 'Al Risk, Governance and Strategy Services | Cyber and Data Resilience - Kroll, accessed April 29, 2025,', url: 'https://www.kroll.com/en/services/cyber-risk/governance-advisory/ai-risk-governance-and-strategy' },
      { text: 'Accenture Shares Dive on Federal Spending Concerns - Sharecafe, accessed April 29, 2025,', url: 'https://www.sharecafe.com.au/2025/03/21/accenture-shares-dive-on-federal-spending-concerns/' },
      { text: 'Billions in government consulting contracts under DOGE scrutiny; Big Four accounting firms staff fear mass layoffs, many of these employees make six-figure salaries - The Economic Times, accessed April 29, 2025,', url: 'https://m.economictimes.com/news/international/us/billions-in-government-consulting-contracts-under-doge-scrutiny-big-four-accounting-firms-staff-fear-mass-layoffs-many-of-these-employees-make-six-figure-salaries/articleshow/118793850.cms' },
      { text: "DoD's Budget Cuts Send Shockwaves Through Major Consulting Firms | Markets Insider, accessed April 29, 2025,", url: 'https://markets.businessinsider.com/news/stocks/dod-s-budget-cuts-send-shockwaves-through-major-consulting-firms-1034577189' },
      { text: 'White House Unveils Updated Al Guidelines for Federal Agencies | Perkins Coie, accessed April 29, 2025,', url: 'https://perkinscoie.com/insights/update/white-house-unveils-updated-ai-guidelines-federal-agencies' },
      { text: 'Federal Agencies Ordered to Accelerate Responsible Al Adoption Under OMB Memo M-25-21, accessed April 29, 2025,', url: 'https://blog.cognitiveview.com/federal-agencies-ordered-to-accelerate-responsible-ai-adoption-under-omb-memo-m-25-21/' },
      { text: 'ISO 42001: Ultimate Implementation Guide 2025 - ISMS.online, accessed April 29, 2025,', url: 'https://www.isms.online/iso-42001/iso-42001-implementation-a-step-by-step-guide-2025/' },
      { text: "Al Governance Framework: The CEO's Survival Guide - Noel DCosta, accessed April 29, 2025,", url: 'https://noeldcosta.com/ai-governance-framework-guide-building-a-responsible-ai-plan/' },
      { text: 'Empowering US federal Al initiatives: How Elastic helps agencies comply with M-25-21 and M-25-22, accessed April 29, 2025,', url: 'https://www.elastic.co/blog/federal-ai-initiatives-comply-m-25-21-m-25-22' },
      { text: 'Fact Sheet: President Donald J. Trump Advances Al Education for American Youth, accessed April 29, 2025,', url: 'https://www.whitehouse.gov/fact-sheets/2025/04/fact-sheet-president-donald-j-trump-advances-ai-education-for-american-youth/' },
      { text: 'Advancing Artificial Intelligence Education for American Youth - The White House, accessed April 29, 2025,', url: 'https://www.whitehouse.gov/presidential-actions/2025/04/advancing-artificial-intelligence-education-for-american-youth/' },
      { text: 'Navigating Emerging Trends in Federal Funding for Al & Technology, accessed April 29, 2025,', url: 'https://everglade.com/navigating-emerging-trends-in-federal-funding/' },
      { text: 'R&D Opportunities - DARPA, accessed April 29, 2025,', url: 'https://www.darpa.mil/research/opportunities' },
      { text: 'US Artificial Intelligence Policies and Investments in 2025 - The National Law Review, accessed April 29, 2025,', url: 'https://natlawreview.com/article/look-us-governments-changed-approach-artificial-intelligence-development-and' },
      { text: 'Al legislation in the US: A 2025 overview - SIG - Software Improvement Group, accessed April 29, 2025,', url: 'https://www.softwareimprovementgroup.com/us-ai-legislation-overview/' },
      { text: 'The Outlook of US AI Regulations in 2025: A Concise Summary - Zartis, accessed April 29, 2025,', url: 'https://www.zartis.com/us-artificial-intelligence-regulations-in-2025-a-concise-summary/' },
      { text: 'The Road Ahead For U.S. Policy On Artificial Intelligence - ORF America, accessed April 29, 2025,', url: 'https://orfamerica.org/newresearch/us-policy-on-artificial-intelligence' },
      { text: 'White House Releases New Policies on Federal Agency Al Use and Procurement, accessed April 29, 2025,', url: 'https://www.whitehouse.gov/articles/2025/04/white-house-releases-new-policies-on-federal-agency-ai-use-and-procurement/' },
      { text: 'OMB M-25-21 Accelerating Federal Use of Al through Innovation, Governance, and Public Trust, accessed April 29, 2025,', url: 'https://digitalgovernmenthub.org/examples/omb-m-25-21-accelerating-federal-use-of-ai-through-innovation-governance-and-public-trust/' },
      { text: "OMB Guidance Provide First Glimpse into the Trump Administration's Al Action Plan - SIIA, accessed April 29, 2025,", url: 'https://www.siia.net/policies/omb-guidance-provide-first-glimpse-into-the-trump-administrations-ai-action-plan/' },
      { text: 'Holland & Knight Health Dose: April 8, 2025 | Insights, accessed April 29, 2025,', url: 'https://www.hklaw.com/en/insights/publications/2025/04/hk-health-dose-april-8-2025' },
      { text: 'Trump OMB issues memos revising policies on federal Al usage, acquisition, accessed April 29, 2025,', url: 'https://insideaipolicy.com/sites/insideaipolicy.com/files/documents/current%20issue/iaip_current.pdf?t=1739515573' },
      { text: 'White House Orders Federal Agencies to Accelerate Al Adoption - OODAloop, accessed April 29, 2025,', url: 'https://oodaloop.com/analysis/disruptive-technology/white-house-orders-federal-agencies-to-accelerate-ai-adoption/' },
      { text: 'Trump administration announces overhaul of federal Al policy | Biometric Update, accessed April 29, 2025,', url: 'https://www.biometricupdate.com/202504/trump-administration-announces-overhaul-of-federal-ai-policy' },
      { text: 'Navigating the New Federal Al Landscape: Implications for Businesses and the Role of Trust, accessed April 29, 2025,', url: 'https://ethyca.com/blog/navigating-the-new-federal-ai-landscape-implications-for-businesses-and-the-role-of-trust' },
      { text: 'White House Unveils Updated Al Guidelines for Federal Agencies | Perkins Coie - JDSupra, accessed April 29, 2025,', url: 'https://www.jdsupra.com/legalnews/white-house-unveils-updated-ai-6679436/' },
      { text: 'M-25-22-Driving-Efficient-Acquisition-of-Artificial-Intelligence-in-Government.pdf - The White House, accessed April 29, 2025,', url: 'https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-22-Driving-Efficient-Acquisition-of-Artificial-Intelligence-in-Government.pdf' },
      { text: 'Treasury and Artificial Intelligence, accessed April 29, 2025,', url: 'https://home.treasury.gov/policy-issues/financial-markets-financial-institutions-and-fiscal-service/treasury-and-artificial-intelligence' },
      { text: "House Democrats Seek Immediate Termination of DOGE's Unauthorized Use of AI Systems, Call Out Security Risks and Potential Criminal Liability | U.S. Representative Don Beyer, accessed April 29, 2025,", url: 'https://beyer.house.gov/news/documentsingle.aspx?DocumentID=6476' },
      { text: 'April 16, 2025 The Honorable Russell Vought Director Office of Management and Budget 725 17th St, NW Washington, DC 20503 Dear D, accessed April 29, 2025,', url: 'https://beyer.house.gov/uploadedfiles/congressional_letter_to_administration_on_doge_use_of_ai.pdf' },
      { text: 'Al set to dominate US federal market spending and discourse in 2025 - Canalys, accessed April 29, 2025,', url: 'https://www.canalys.com/insights/ai-set-to-dominate-us-federal-market-spending-and-discourse-in-2025' },
      { text: 'Commerce Department unveils new rules on responsible diffusion of artificial intelligence technology | DLA Piper, accessed April 29, 2025,', url: 'https://www.dlapiper.com/insights/publications/2025/01/commerce-department-unveils-new-rules-on-responsible-diffusion-of-artificial-intelligence-technology' },
      { text: 'U.S. Tech Legislative & Regulatory Update - First Quarter 2025 | Inside Global Tech, accessed April 29, 2025,', url: 'https://www.insideglobaltech.com/2025/04/23/u-s-tech-legislative-regulatory-update-first-quarter-2025/' },
      { text: 'Commerce Department Imposes Sweeping Global Restrictions on Al Technologies | Advisories | Arnold & Porter, accessed April 29, 2025,', url: 'https://www.arnoldporter.com/en/perspectives/advisories/2025/01/commerce-dept-global-restrictions-on-ai-technologies' },
      { text: 'Science policy this week: April 21, 2025 - AIP.ORG, accessed April 29, 2025,', url: 'https://ww2.aip.org/fyi/the-week-of-april-21-2025' },
      { text: 'All Info - S.1290 - 119th Congress (2025-2026): Artificial Intelligence and Critical Technology Workforce Framework Act of 2025, accessed April 29, 2025,', url: 'https://www.congress.gov/bill/119th-congress/senate-bill/1290/all-info' },
      { text: 'All Info - H.R.238 - 119th Congress (2025-2026): Healthy Technology Act of 2025, accessed April 29, 2025,', url: 'https://www.congress.gov/bill/119th-congress/house-bill/238/all-info' },
      { text: 'Text - S.1110 - 119th Congress (2025-2026): Leveraging Artificial Intelligence to Streamline the Code of Federal Regulations Act of 2025, accessed April 29, 2025,', url: 'https://www.congress.gov/bill/119th-congress/senate-bill/1110/text' },
      { text: 'Text - H.R.2385 - 119th Congress (2025-2026): CREATE AI Act of 2025 | Congress.gov, accessed April 29, 2025,', url: 'https://www.congress.gov/bill/119th-congress/house-bill/2385/text' },
      { text: 'H.R.238 - 119th Congress (2025-2026): Healthy Technology Act of 2025 | Congress.gov, accessed April 29, 2025,', url: 'https://www.congress.gov/bill/119th-congress/house-bill/238' },
      { text: 'Text - H.R.2152 - 119th Congress (2025-2026): AI PLAN Act, accessed April 29, 2025,', url: 'https://www.congress.gov/bill/119th-congress/house-bill/2152/text' },
      { text: "U.S. mandates Al education in schools as IBM's Andreas Horn highlights need for early Al literacy - EdTech Innovation Hub, accessed April 29, 2025,", url: 'https://www.edtechinnovationhub.com/news/us-mandates-ai-education-in-schools-as-ibms-andreas-horn-highlights-need-for-early-ai-literacy' },
      { text: 'Artificial Intelligence 2025 Legislation - National Conference of State Legislatures, accessed April 29, 2025,', url: 'https://www.ncsl.org/technology-and-communication/artificial-intelligence-2025-legislation' },
      { text: 'Al Governance Platform - Booz Allen, accessed April 29, 2025,', url: 'https://www.boozallen.com/insights/ai-research/responsible-ai-for-mission-innovation/ai-governance-platform.html' },
      { text: 'OMB Guidance: How Federal Government Agencies Can Adopt Al Responsibly - Credo Al, accessed April 29, 2025,', url: 'https://www.credo.ai/blog/omb-guidance-how-federal-government-agencies-can-adopt-ai-responsibly' },
      { text: 'Three Steps Trump Should Take to Advance Government Al Adoption, accessed April 29, 2025,', url: 'https://datainnovation.org/2025/04/three-steps-trump-can-take-to-advance-government-ai/' },
      { text: 'Beneath the Earnings: IBM Faces Contract Fallout, Intel Shrinks While Al Still Lags—What MSPs Should Watch - The Business of Tech, accessed April 29, 2025,', url: 'https://www.businessof.tech/2025/04/25/beneath-the-earnings-ibm-faces-contract-fallout-intel-shrinks-while-ai-still-lags-what-msps-should-watch/' },
      { text: "Accenture warns DOGE's Fed procurement audit hitting sales - The Register, accessed April 29, 2025,", url: 'https://www.theregister.com/2025/03/21/accenture_warns_doges_federal_procurement/' },
      { text: 'IBM Q1 2025 Earnings: CEO Krishna Maintains Financial Forecast Despite DOGE Cuts, Economic Uncertainty - CRN, accessed April 29, 2025,', url: 'https://www.crn.com/news/cloud/2025/ibm-q1-2025-earnings-ceo-krishna-maintains-financial-forecast-despite-doge-cuts-economic-uncertainty' },
      { text: 'IBM saw 15 federal contracts canceled by DOGE during Q1 2025 - Data Center Dynamics, accessed April 29, 2025,', url: 'https://www.datacenterdynamics.com/en/news/ibm-saw-15-federal-contracts-canceled-by-doge-during-q1-2025/' },
      { text: 'IBM puts on a brave face as US government cuts hit 15 contracts | IT Pro - ITPro, accessed April 29, 2025,', url: 'https://www.itpro.com/business/ibm-puts-on-a-brave-face-as-us-government-cuts-hit-15-contracts' },
      { text: 'Booz Allen Brings Al, Machine Learning to EPA Missions, accessed April 29, 2025,', url: 'https://www.boozallen.com/menu/media-center/q1-2025/ai-machine-learning-to-epa-missions.html' },
      { text: 'Embracing Outcomes as a Service in Federal Government - Booz Allen, accessed April 29, 2025,', url: 'https://www.boozallen.com/insights/data-optimization/outcomes-as-a-service-in-the-federal-government.html' },
      { text: 'Al for Civilian Services - Booz Allen, accessed April 29, 2025,', url: 'https://www.boozallen.com/markets/civil-government/ai-for-government.html' },
      { text: 'NSF Awards Booz Allen $419M IT Modernization Contract, accessed April 29, 2025,', url: 'https://www.boozallen.com/menu/media-center/q2-2025/nsf-awards-419m-it-modernization-contract.html' },
      { text: 'Public Sector Government Consulting Services - Accenture, accessed April 29, 2025,', url: 'https://www.accenture.com/us-en/industries/public-service' },
      { text: 'Leading Al Government Contractors in 2025 - ExecutiveBiz, accessed April 29, 2025,', url: 'https://executivebiz.com/2025/03/top-ai-govcons-2025/' },
      { text: 'Federal Data & Al | Accenture, accessed April 29, 2025,', url: 'https://www.accenture.com/us-en/services/us-federal-government/applied-intelligence-federal' },
      { text: 'Generative Al for US Federal Agencies - Accenture, accessed April 29, 2025,', url: 'https://www.accenture.com/us-en/services/us-federal-government/generative-ai' },
      { text: 'Dynamic Al governance: A recipe for crafting trustworthy Al - Deloitte, accessed April 29, 2025,', url: 'https://www2.deloitte.com/us/en/insights/industry/public-sector/static-to-dynamic-ai-governance.html' },
      { text: 'The Government and Public Services Al Dossier - Deloitte, accessed April 29, 2025,', url: 'https://www2.deloitte.com/us/en/pages/consulting/articles/ai-dossier-government-public-services.html' },
      { text: 'Beyond compliance: The opportunity of the White House Al executive order | Deloitte US, accessed April 29, 2025,', url: 'https://www2.deloitte.com/us/en/pages/public-sector/articles/opportunity-ai-executive-order.html' },
      { text: 'Modernizing regulatory review memorandum | Deloitte Insights, accessed April 29, 2025,', url: 'https://www2.deloitte.com/us/en/insights/industry/public-sector/considerations-modernizing-regulatory-review-memorandum.html' },
      { text: 'NIST Updates Privacy Framework, Tying It to Recent Cybersecurity..., accessed April 29, 2025,', url: 'https://www.nist.gov/news-events/news/2025/04/nist-updates-privacy-framework-tying-it-recent-cybersecurity-guidelines' },
      { text: 'NIST Proposes Revisions to Privacy Framework for Seamless Use with Cybersecurity Guidelines and To Address Al Risks, Seeks Public Comment | The CommLaw Group, accessed April 29, 2025,', url: 'https://commlawgroup.com/2025/nist-proposes-revisions-to-privacy-framework/' },
      { text: 'Farm Credit Administration Guidance on Navigating Al and Emerging Cybersecurity Risks, accessed April 29, 2025,', url: 'https://www.netbankaudit.com/resources/farm-credit-administration-ai-emerging-cybersecurity-risks' },
      { text: 'Artificial Intelligence | NSF - National Science Foundation, accessed April 29, 2025,', url: 'https://www.nsf.gov/focus-areas/artificial-intelligence' },
      { text: 'Al Model Risk Management Market Size, Share, Trends & Forecast, accessed April 29, 2025,', url: 'https://www.verifiedmarketresearch.com/product/ai-model-risk-management-market/' },
      { text: 'Al Model Risk Management Market Size, Share Report, 2030 - Grand View Research, accessed April 29, 2025,', url: 'https://www.grandviewresearch.com/industry-analysis/ai-model-risk-management-market-report' },
      { text: 'Principles of Al Governance and Model Risk Management | PDF - Scribd, accessed April 29, 2025,', url: 'https://ru.scribd.com/document/827067646/Principles-of-Al-Governance-and-Model-Risk-Management' },
      { text: 'Impending Threats From Al: The Problem with Trust | Coalfire, accessed April 29, 2025,', url: 'https://coalfire.com/the-coalfire-blog/impending-threats-from-ai-the-problem-with-trust' },
      { text: 'Booz Allen Maps the Next Wave of Tech for USG in 2025, accessed April 29, 2025,', url: 'https://investors.boozallen.com/news-releases/news-release-details/booz-allen-maps-next-wave-tech-usg-2025' },
      { text: 'Booz Allen Ranks First in Artificial Intelligence Services, accessed April 29, 2025,', url: 'https://www.boozallen.com/insights/ai-research/booz-allen-ranks-first-in-artificial-intelligence-services.html' },
      { text: 'Booz Allen Is the Leading Provider of Cyber to USG, accessed April 29, 2025,', url: 'https://www.boozallen.com/menu/media-center/q3-2025/leading-provider-of-cyber-to-usg.html' },
      { text: 'Booz Allen Hamilton, accessed April 29, 2025,', url: 'https://www.boozallen.com/' },
      { text: '7 Top Al Companies in 2025 - AutoGPT, accessed April 29, 2025,', url: 'https://autogpt.net/7-top-ai-companies-in-2025/' },
      { text: "Inside the Latest Version of NIST's Cybersecurity Framework | GovCIO Media & Research, accessed April 29, 2025,", url: 'https://govciomedia.com/inside-the-latest-version-of-nists-cybersecurity-framework/' },
      { text: 'Understanding the EU AI Act and the Road to Al Risk & Compliance - Coalfire, accessed April 29, 2025,', url: 'https://coalfire.com/the-coalfire-blog/understanding-the-eu-ai-act-and-the-road-to-ai-risk-compliance' },
      { text: 'NIST Al governance and risk management framework - BLG, accessed April 29, 2025,', url: 'https://www.blg.com/en/insights/2023/03/new-nist-framework-provides-organizations-guidance-on-ai-governance-and-risk-management' },
      { text: 'Overview of Al Regulations and Regulatory Proposals of 2023 - Centraleyes, accessed April 29, 2025,', url: 'https://www.centraleyes.com/ai-regulations-and-regulatory-proposals/' },
      { text: 'Artificial Intelligence Regulation: What Laws Do Countries Apply to This Tech? PixelPlex, accessed April 29, 2025,', url: 'https://pixelplex.io/blog/artificial-intelligence-regulation/' },
      { text: 'The 2025 Al Index Report | Stanford HAI, accessed April 29, 2025,', url: 'https://hai.stanford.edu/ai-index/2025-ai-index-report' },
      { text: 'What is the Average Cost of a Data Breach? - SCA Security - SCA Blog, accessed April 29, 2025,', url: 'https://blog.scasecurity.com/cost-of-a-data-breach' },
      { text: 'IBM and Artificial Intelligence: Leading the Future of Smarter Technologies - IBM Community, accessed April 29, 2025,', url: 'https://community.ibm.com/community/user/blogs/paul-glenn2/2025/04/22/ibm-and-artificial-intelligence-leading-the-future' },
      { text: 'Accenture Federal Services Announces MxDR for Government to be Powered by Google SecOps, Enhancing Federal Cybersecurity, accessed April 29, 2025,', url: 'https://newsroom.accenture.com/news/2025/accenture-federal-services-announces-mxdr-for-government-to-be-powered-by-google-secops-enhancing-federal-cybersecurity' },
      { text: 'Accenture Federal Services and Google Public Sector Launch MxDR for Government to Strengthen Cyber Defenses | MSSP Alert, accessed April 29, 2025,', url: 'https://www.msspalert.com/news/accenture-federal-services-and-google-public-sector-launch-mxdr-for-government-to-strengthen-cyber-defenses' },
      { text: 'IBM Delivers Autonomous Security Operations with Cutting-Edge Agentic Al, accessed April 29, 2025,', url: 'https://newsroom.ibm.com/2025-04-28-ibm-delivers-autonomous-security-operations-with-cutting-edge-agentic-ai' },
      { text: 'IBM Establishes Microsoft Practice to Streamline Cloud and Al Transformation - ChannelE2E, accessed April 29, 2025,', url: 'https://www.channele2e.com/news/ibm-establishes-microsoft-practice-to-streamline-cloud-and-ai-transformation' },
      { text: '5 Trends for 2025 - IBM, accessed April 29, 2025,', url: 'https://www.ibm.com/thought-leadership/institute-business-value/en-us/report/business-trends-2025' },
      { text: "Accenture Federal Services Launches 'Federal Al Solution Factory' with Google Public Sector - PR Newswire, accessed April 29, 2025,", url: 'https://www.prnewswire.com/news-releases/accenture-federal-services-launches-federal-ai-solution-factory-with-google-public-sector-302276380.html' },
      { text: 'Assessing Al: Surveying the Spectrum of Approaches to Understanding and Auditing Al Systems - Center for Democracy & Technology (CDT), accessed April 29, 2025,', url: 'https://cdt.org/wp-content/uploads/2025/01/2025-01-15-CDT-AI-Gov-Lab-Auditing-Al-report.pdf' },
      { text: 'How the US Public and Al Experts View Artificial Intelligence | Pew Research Center, accessed April 29, 2025,', url: 'https://www.pewresearch.org/internet/2025/04/03/how-the-us-public-and-ai-experts-view-artificial-intelligence/' },
      { text: 'Al Watch: Global regulatory tracker - United States | White & Case LLP, accessed April 29, 2025,', url: 'https://www.whitecase.com/insight-our-thinking/ai-watch-global-regulatory-tracker-united-states' },
      { text: 'Updates on NSF Priorities | NSF - National Science Foundation, accessed April 29, 2025,', url: 'https://www.nsf.gov/updates-on-priorities' },
      { text: 'Company Statement on Recent Executive Orders - Booz Allen, accessed April 29, 2025,', url: 'https://www.boozallen.com/menu/media-center/q4-2025/company-statement.html' },
      { text: 'IBM Unveils $150 Billion Investment in America to Accelerate Technology Opportunity, accessed April 29, 2025,', url: 'https://newsroom.ibm.com/2025-04-28-ibm-unveils-150-billion-investment-in-america-to-accelerate-technology-opportunity' },
      { text: 'IBM Launches Microsoft Practice to Deliver Transformative Business Value for Clients, accessed April 29, 2025,', url: 'https://newsroom.ibm.com/2025-04-29-ibm-launches-microsoft-practice-to-deliver-transformative-business-value-for-clients' }
    ];

  // --- Render Logic ---

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
              Works Cited
            </h2>

            {/* References List */}
            <ol className="list-decimal list-outside space-y-4 pl-6 text-gray-700 leading-relaxed text-base">
              {references.map((ref, index) => (
                <li key={index} className="break-words"> {/* Added break-words for long URLs */}
                  {ref.text}
                  {ref.url && ( // Only render link if URL exists
                    <a
                      href={ref.url}
                      target="_blank" // Open in new tab
                      rel="noopener noreferrer" // Security best practice
                      onClick={() => handleReferenceLinkClick(ref.url)}
                      className="ml-2 text-indigo-600 hover:text-indigo-800 underline break-all" // Added break-all
                    >
                      {ref.url} {/* Display the URL as the link text */}
                    </a>
                  )}
                </li>
              ))}
            </ol>

            {/* Navigation Buttons Container */}
            <div className="mt-12 pt-6 border-t border-gray-200 flex justify-start items-center"> {/* Changed justify-between to justify-start */}
               {/* Back Button */}
               <Link href="/knowledge/AI-Strategy-2025-Policies-Recommendations" passHref> {/* Link to Recommendations page */}
                 <button
                   onClick={handleBackSectionClick}
                   className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                 >
                   <ArrowLeft className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
                   Previous Section
                 </button>
               </Link>

               {/* Removed the Next button */}
            </div>

          </div> {/* End of content card */}
        <Footer />
      </div>
    </>
  );
};

export default ReportPageReferences; // Ensure the component name is unique
