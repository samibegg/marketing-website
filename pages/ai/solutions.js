// pages/ai/operations-admin-solutions.js // Renamed for clarity, adjust as needed

import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { NextSeo } from 'next-seo';

// Consider importing icons from a library like lucide-react for better visual appeal
// import { FileText, Zap, Users, Settings, DatabaseZap } from 'lucide-react';

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

const serviceCards = [
  {
    title: "Customer Service Automation",
    description: "Enhance support with AI-powered chatbots and virtual assistants, reducing costs and improving satisfaction.",
    link: "/ai/customer-service-solutions", // Ensure this path matches your actual page
    // icon: <MessageSquare className="w-10 h-10 text-sky-600 mb-4" />
  },
  {
    title: "Marketing & Sales Optimization",
    description: "Boost ROI with AI-driven campaign optimization, content personalization, and intelligent lead scoring.",
    link: "/ai/marketing-sales-solutions", // Ensure this path matches your actual page
    // icon: <Target className="w-10 h-10 text-sky-600 mb-4" />
  },
  {
    title: "Operations & Admin Automation",
    description: "Streamline tasks with AI-powered document processing and data entry automation for greater efficiency.",
    link: "/ai/operations-admin-solutions", // Ensure this path matches your actual page
    // icon: <FileText className="w-10 h-10 text-sky-600 mb-4" />
  },
  {
    title: "Inventory & Demand Forecasting",
    description: "Optimize stock levels and predict demand accurately with intelligent AI-driven forecasting tools.",
    link: "/ai/inventory-demand-solutions", // Ensure this path matches your actual page
    // icon: <PackageSearch className="w-10 h-10 text-sky-600 mb-4" />
  },
  {
    title: "HR & Recruitment Optimization",
    description: "Find top talent faster with AI-assisted candidate sourcing, screening, and initial communication.",
    link: "/ai/hr-recruitment-solutions", // This is the page from the current context
    // icon: <Users2 className="w-10 h-10 text-sky-600 mb-4" />
  },
  {
    title: "Social Media Content Automation",
    description: "Generate engaging posts, schedule content, and analyze performance with AI to save time and boost reach.",
    link: "/ai/social-media-solutions", // Ensure this path matches your actual page (create this page if needed)
    // icon: <Share2 className="w-10 h-10 text-sky-600 mb-4" />
  },
];

const painPointQuestions = [
  "Is Your Business Truly Capitalizing on AI, or Just Scratching the Surface?",
  "Are Missed AI Opportunities Costing Your Business More Than You Realize?",
  "Feeling Overwhelmed by AI Integration? Is 'Analysis Paralysis' Stalling Your Progress?",
  "Is the Breakneck Speed of AI Leaving Your Business Strategy in the Dust?",
  "The AI Revolution is Here. Is Your Business Leading the Charge, or Risking Irrelevance by Delaying?",
  "Beyond the Hype: Do You Have a Concrete AI Strategy, or Just a Collection of Ideas?",
];

// Main component for the AI Operations & Admin Solutions page
export default function AIOperationsAdminSolutionsPage() {
  const activeTimeStart = useRef(Date.now()); // Ref for active time tracking
  const totalActiveTime = useRef(0); // Ref for active time tracking
  const contentRef = useRef(null); // Ref for copy tracking
  const scrollMilestonesReached = useRef(new Set()); // Ref for scroll tracking
  const pageTitle = "AI Implementation Experts | ForgeMission";
  const pageDescription = "Transform your business with cutting-edge AI solutions. ForgeMission specializes in AI implementation for cost reduction and efficiency."; 
  const canonicalUrl = "https://www.forgemission.com/ai/solutions"; 
  const imageUrl = "https://www.forgemission.com/images/ai/solutions.jpg"; 
  const publicationDate = "2025-05-11T10:00:00Z"; // Keep or adjust

  // --- Analytics Tracking Effects ---

  // 1. Track initial page view
  useEffect(() => {
    trackEvent('page_view', { page_title: pageTitle }); // Updated title
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
          trackEvent('scroll_depth', { depth_percentage: milestone, page_section: pageTitle }); 
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
        trackEvent('active_time_spent', { duration_seconds: Math.round(totalActiveTime.current / 1000), page_section: pageTitle });
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
          page_section: pageTitle, 
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

  // --- JSON-LD Structured Data ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": pageTitle,
    "description": pageDescription,
    "image": imageUrl,
    "datePublished": publicationDate,
    "author": { "@type": "Organization", "name": "ForgeMission" }, 
    "publisher": {
       "@type": "Organization",
       "name": "ForgeMission", 
       "logo": { "@type": "ImageObject", "url": "https://www.forgemission.com/images/logo.png" } 
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": canonicalUrl }
  };

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

      {/* Main container for the page content */}
      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-gray-100 via-slate-100 to-gray-200 py-20 sm:py-32 text-center">
            <div className="max-w-4xl mx-auto px-6">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 mb-6">
                Unlock Your Business Potential with AI
              </h1>
              <p className="text-xl sm:text-2xl text-slate-700 mb-10 max-w-2xl mx-auto">
                We are your trusted partners in implementing strategic AI solutions that drive efficiency, cut costs, and foster innovation.
              </p>
              <Link href="/contact" legacyBehavior>
                <a className="bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-bold py-4 px-10 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 text-lg">
                  Request a Consultation
                </a>
              </Link>
            </div>
          </section>

          {/* "Pain Points / Questions" Section */}
          <section className="py-16 sm:py-24 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
            <div className="max-w-5xl mx-auto px-6"> {/* Increased max-w for wider content area */}
              <header className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
                  Is Your AI Strategy Future-Proof, or a Future Problem?
                </h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                  The AI landscape is evolving rapidly. If these critical questions resonate, it's time for expert guidance to revitalize your approach and ensure you're not left behind.
                </p>
              </header>
              {/* Grid for questions - 2 columns on medium screens and up */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {painPointQuestions.map((question, index) => (
                  <div key={index} className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-start">
                    {/* Icon placeholder: <AlertTriangle className="flex-shrink-0 w-6 h-6 mr-4 text-amber-500" /> */}
                     <span className="flex-shrink-0 inline-block w-6 h-6 mr-4 text-sky-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                        </svg>
                      </span>
                    <p className="text-lg text-slate-700 font-medium">
                      {question}
                    </p>
                  </div>
                ))}
              </div>
               <div className="text-center mt-16"> {/* Increased margin-top */}
                <Link href="/contact" legacyBehavior>
                  <a className="bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-bold py-4 px-10 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 text-lg">
                    Develop Your AI Roadmap
                  </a>
                </Link>
              </div>
            </div>
          </section>
           
          {/* "Here's The Problem / The Numbers Prove It" Section */}
          <section className="py-16 sm:py-24 bg-white">
            <div className="max-w-5xl mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Column: The Problem */}
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-6">
                    The AI Adoption Dilemma: <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500">Keeping Pace or Falling Behind?</span>
                  </h2>
                  <p className="text-lg text-slate-600 mb-4">
                    Keeping up with the relentless pace of AI advancements is virtually a full-time job – a commitment most business leaders can't afford. Yet, the untapped potential for growth and efficiency is too significant to ignore.
                  </p>
                  <p className="text-lg text-slate-600">
                    You might perceive AI as a distant future or a Silicon Valley buzzword, but the current landscape paints a very different, and urgent, picture.
                  </p>
                </div>

                {/* Right Column: The Numbers */}
                <div className="bg-slate-50 p-8 rounded-xl shadow-lg">
                  <h3 className="text-2xl font-semibold text-blue-600 mb-6 text-center">
                    {/* Icon placeholder: <BarChart className="inline-block mr-2" /> */}
                    The Numbers Don't Lie: AI is Now
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="flex-shrink-0 inline-block w-5 h-5 mr-3 mt-1 text-sky-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-full h-full"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                      </span>
                      <p className="text-slate-700"><strong className="font-bold text-sky-600">54% of businesses</strong> are actively looking to integrate AI right now – you're in ambitious company.</p>
                    </li>
                    <li className="flex items-start">
                       <span className="flex-shrink-0 inline-block w-5 h-5 mr-3 mt-1 text-sky-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-full h-full"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                      </span>
                      <p className="text-slate-700">This isn't surprising, as <strong className="font-bold text-sky-600">48% of companies</strong> have already embraced AI's power.</p>
                    </li>
                    <li className="flex items-start">
                       <span className="flex-shrink-0 inline-block w-5 h-5 mr-3 mt-1 text-sky-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-full h-full"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                      </span>
                      <p className="text-slate-700">The real driver? An astounding <strong className="font-bold text-sky-600">90% of leading global businesses</strong> are continuously investing in AI.</p>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-12 sm:mt-16">
                <h3 className="text-2xl sm:text-3xl font-bold text-center text-slate-800 mb-8">
                    Why This Urgent Push? <span className="block text-xl text-sky-600 font-semibold mt-1">The Impact is Undeniable.</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
                    <div className="p-6 bg-slate-50 rounded-lg shadow-md">
                        {/* Icon placeholder: <TrendingUp className="w-10 h-10 mx-auto mb-3 text-blue-500" /> */}
                        <h4 className="text-4xl font-extrabold text-blue-600 mb-2">$4.8 Trillion</h4>
                        <p className="text-slate-600">Added in global profits attributed to AI.</p>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-lg shadow-md">
                        {/* Icon placeholder: <TrendingUp className="w-10 h-10 mx-auto mb-3 text-blue-500" /> */}
                        <h4 className="text-4xl font-extrabold text-blue-600 mb-2">39%</h4>
                        <p className="text-slate-600">Productivity increase for Salesforce using AI (e.g., chatbots).</p>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-lg shadow-md">
                        {/* Icon placeholder: <TrendingUp className="w-10 h-10 mx-auto mb-3 text-blue-500" /> */}
                        <h4 className="text-4xl font-extrabold text-blue-600 mb-2">47%</h4>
                        <p className="text-slate-600">Predicted average profit boost for companies integrating AI (Accenture).</p>
                    </div>
                </div>
                 <p className="text-center text-slate-600 mt-8 text-lg italic">
                    And this transformation spans <strong className="text-slate-700">all industries</strong>: Manufacturing AI adoption surged by 270% in 4 years. Over half of healthcare invests in AI. Retail aims for 80% AI automation by 2027.
                </p>
              </div>

              <div className="mt-16 text-center bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 p-8 sm:p-12 rounded-xl shadow-xl">
                <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Future-Proof and Empower Your Team with AI Today!
                </h3>
                <p className="text-lg text-blue-100 mb-6 max-w-3xl mx-auto">
                  Up-skilling isn’t just a choice; it’s a strategic imperative. The window of opportunity to lead with AI is wide open, but it’s closing faster than you think. <strong className="text-white">87% of businesses</strong> are already convinced AI will be their competitive edge in the next 5 years.
                </p>
                <p className="text-2xl font-semibold text-white mb-8">
                    Don't get left behind. Now is your chance to integrate AI the right way.
                </p>
                <Link href="/contact" legacyBehavior>
                  <a className="bg-white text-blue-600 hover:bg-slate-100 font-bold py-4 px-10 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 text-lg">
                    Seize Your AI Advantage
                  </a>
                </Link>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="py-16 sm:py-24 bg-white">
            <div className="max-w-6xl mx-auto px-6">
              <header className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
                  Our AI Implementation Specialties
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Explore how we can help you leverage AI across various aspects of your business for tangible results.
                </p>
              </header>

              {/* Service Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {serviceCards.map((card) => (
                  <Link href={card.link} key={card.title} legacyBehavior>
                    <a 
                      className="block p-8 bg-slate-50 rounded-xl shadow-lg hover:shadow-blue-500/20 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-[1.02] group"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {/* Placeholder for Icon - uncomment and use if you have icons */}
                      {/* {card.icon} */}
                      <div className="flex justify-center items-center mb-4 w-12 h-12 bg-sky-100 text-sky-600 rounded-full group-hover:bg-sky-200 transition-colors">
                        {/* Generic Icon Placeholder - Replace with actual icons */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 12L17 13.75l-1.25-1.75L13.75 12l1.75-1.25L17 8.75l1.25 1.75L20.25 12l-1.75 1.25z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-semibold text-blue-600 mb-3 group-hover:text-sky-600 transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-slate-600 mb-4">
                        {card.description}
                      </p>
                      <span className="font-semibold text-sky-600 group-hover:text-blue-700 transition-colors inline-flex items-center">
                        Learn More
                        {/* Icon placeholder: <ArrowRight className="w-4 h-4 ml-2" /> */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-1 transition-transform duration-300 group-hover:translate-x-1">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </span>
                    </a>
                  </Link>
                ))}
                {/* You might need a fifth card to make it an odd number, or adjust grid for 5 items. For now, this grid will handle 5 items naturally, with the last one centered if on a new row in some screen sizes.
                    If you want a specific layout for 5, you might need to use col-span or a different grid approach for the last item, or add a placeholder/featured card.
                    For simplicity, this example will let the grid flow.
                */}
              </div>
            </div>
          </section>
         
        </main>

        <Footer />
      </div>
    </>
  );
}
