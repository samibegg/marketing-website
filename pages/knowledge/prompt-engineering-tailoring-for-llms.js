// pages/knowledge/tailoring-prompts-llms.js (Example Path)
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Head from 'next/head';
import Image from 'next/image'; // Keep for potential future use
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useSession } from 'next-auth/react';
import { ArrowRight, ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react'; // Added Chevron icons

import Header from '@/components/Header'; // Adjust path if needed
import Footer from '@/components/Footer'; // Adjust path if needed
import { useAuthModal } from '@/context/AuthModalContext'; // Adjust path if needed

/**
 * Simple debounce function.
 */
const debounce = (func, delay) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

/**
 * Analytics Tracking Function (Placeholder)
 */
const trackEvent = (eventName, eventData) => {
  console.log('Analytics Event:', eventName, eventData);
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventData);
  } else {
    console.warn('window.gtag not available for tracking event:', eventName);
  }
};


// --- Page Component ---
export default function TailoringPromptsLLMs() {
  // --- State ---
  const [openAccordion, setOpenAccordion] = useState(null); // State for accordion

  // --- Refs for Analytics ---
  const contentRef = useRef(null); // Ref for copy tracking
  const scrollMilestonesReached = useRef(new Set()); // Ref for scroll tracking
  const activeTimeStart = useRef(null); // Ref for active time tracking start
  const totalActiveTime = useRef(0); // Ref for cumulative active time

  // --- Auth and Navigation Hooks ---
  const { data: session, status } = useSession(); // Get session status
  const { openModal } = useAuthModal(); // Get function to open login modal
  const router = useRouter(); // Get router instance

  // --- Accordion Toggle ---
  const toggleAccordion = (key) => {
    setOpenAccordion(openAccordion === key ? null : key);
    // Optional: Track accordion interaction
    trackEvent('accordion_toggle', { section_id: key, is_open: openAccordion !== key });
  };

  // --- Conditional Button Logic ---
  // TODO: Update this to the *next* page in your sequence, or remove/change button if this is the last page
  const nextPageRoute = '/knowledge-base'; // Example: Link back to index if last page

  const handleConditionalClick = () => {
    const action = status === 'authenticated' ? 'navigate_next_section' : 'login_prompted';
    // TODO: Update page_section for tracking
    trackEvent('cta_click', { button_text: buttonText, action: action, page_section: 'Tailoring Prompts Conclusion' });

    if (status === 'authenticated') {
      router.push(nextPageRoute);
    } else if (status === 'unauthenticated') {
      openModal();
    }
    // Do nothing if status is 'loading'
  };

  // Determine button text based on auth status
  let buttonText = 'Loading...';
  if (status === 'authenticated') {
    // TODO: Change button text if this is the last page
    buttonText = 'Back to Knowledge Base'; // Example if last page
  } else if (status === 'unauthenticated') {
    buttonText = 'Login to Continue';
  }
  // --- End Conditional Button Logic ---


  // --- Analytics Tracking Effects ---

  // 1. Track initial page view
  useEffect(() => {
    trackEvent('page_view', { page_title: 'Tailoring Prompts for Different LLMs' });
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
          // TODO: Update page_section for tracking
          trackEvent('scroll_depth', { depth_percentage: milestone, page_section: 'Tailoring Prompts' });
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
        if (activeTimeStart.current) {
             totalActiveTime.current += Date.now() - activeTimeStart.current;
             activeTimeStart.current = null;
        }
      } else if (document.visibilityState === 'visible') {
        activeTimeStart.current = Date.now();
      }
    };
    const handleBeforeUnload = () => {
      if (document.visibilityState === 'visible' && activeTimeStart.current) {
        totalActiveTime.current += Date.now() - activeTimeStart.current;
      }
      if (totalActiveTime.current > 1000) {
        // TODO: Update page_section for tracking
        trackEvent('active_time_spent', {
            duration_seconds: Math.round(totalActiveTime.current / 1000),
            page_section: 'Tailoring Prompts'
        });
      }
    };
    if (document.visibilityState === 'visible') { activeTimeStart.current = Date.now(); }
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      handleBeforeUnload(); // Send final time on cleanup
    };
  }, []);

  // 4. Track Text Copying
  useEffect(() => {
    const handleCopy = (event) => {
      const selectedText = window.getSelection()?.toString() || '';
      if (selectedText.length > 10) {
        // TODO: Update page_section for tracking
        trackEvent('text_copied', {
          page_section: 'Tailoring Prompts',
          content_snippet: selectedText.substring(0, 100) + (selectedText.length > 100 ? '...' : '')
        });
      }
    };
    const contentElement = contentRef.current;
    if (contentElement) { contentElement.addEventListener('copy', handleCopy); }
    return () => { if (contentElement) { contentElement.removeEventListener('copy', handleCopy); } };
  }, []);
  // --- End Analytics Tracking Effects ---

  // Updated handler for Next button click tracking (assuming this is the last content page)
  const handleNextSectionClick = () => {
    trackEvent('navigation_click', { button_text: 'Go to Conclusion', target_url: '/report/conclusion' }); // Or contact, etc.
  };

  // Updated handler for Back button click tracking
  const handleBackSectionClick = () => {
    trackEvent('navigation_click', { button_text: 'Go to Previous Section', target_url: '/report/us-ai-policy-2025-key-challenges' }); // Link to Challenges page
  };

  // --- SEO Content ---
  // TODO: Update all these values for the new page
  const pageTitle = "Tailoring Prompts for Different LLMs (GPT-4, Claude, Llama 3, Gemini)";
  const pageDescription = "Learn how to adapt prompt engineering techniques for specific LLMs like GPT-4o, Claude 3, Llama 3, Gemini, and Mistral based on model size and tuning.";
  const canonicalUrl = "https://www.forgemission.com/knowledge/tailoring-prompts-llms"; // *** REPLACE with actual URL ***
  const imageUrl = "https://www.forgemission.com/images/og-tailoring-prompts.jpg"; // *** REPLACE with actual OG image URL ***
  const publicationDate = "2025-05-06T10:00:00Z"; // Adjust date
  const modifiedDate = "2025-05-06T14:00:00Z"; // Adjust date

  // --- JSON-LD Structured Data ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": pageTitle,
    "description": pageDescription,
    "image": imageUrl,
    "datePublished": publicationDate,
    "dateModified": modifiedDate,
    "author": { "@type": "Organization", "name": "ForgeMission", "url": "https://www.forgemission.com" },
    "publisher": { "@type": "Organization", "name": "ForgeMission", "logo": { "@type": "ImageObject", "url": "https://www.forgemission.com/images/logo.png" } },
    "mainEntityOfPage": { "@type": "WebPage", "@id": canonicalUrl },
    "keywords": "prompt engineering, large language models, llm prompting, gpt-4 prompting, claude 3 prompting, llama 3 prompting, gemini prompting, mistral prompting, instruction tuning, base models, model size"
  };
  // --- End SEO Content ---


  return (
    <>
      {/* --- SEO Components --- */}
      <NextSeo
        title={pageTitle}
        description={pageDescription}
        canonical={canonicalUrl}
        openGraph={{
          type: 'article',
          url: canonicalUrl,
          title: pageTitle,
          description: pageDescription,
          images: [ { url: imageUrl, width: 1200, height: 630, alt: pageTitle, } ],
          article: {
            publishedTime: publicationDate,
            modifiedTime: modifiedDate,
            authors: [ 'https://www.forgemission.com' ],
            tags: ['Prompt Engineering', 'LLM', 'AI Strategy', 'GPT-4', 'Claude 3', 'Llama 3', 'Gemini', 'Mistral'],
          },
        }}
        twitter={{ cardType: 'summary_large_image', /* site: '@YourTwitterHandle', handle: '@YourTwitterHandle' */ }}
      />
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} key="article-jsonld" />
      </Head>
      {/* --- End SEO Components --- */}


      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <Header /> {/* Ensure Header/Footer support dark mode */}

        <main ref={contentRef} className="flex-grow px-4 sm:px-6 py-12 max-w-4xl mx-auto w-full">
          {/* Back Link */}
          <div className="mb-8">
            <Link href="/knowledge-base" className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Knowledge Base
            </Link>
          </div>

          {/* --- Page Title & Intro --- */}
          <div className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-4 tracking-tight">
              Tailoring Prompts for Different LLMs
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              While general prompt engineering principles apply broadly, achieving optimal performance often requires tailoring strategies to the specific characteristics of the Large Language Model being used. Factors like whether the model is a base model or instruction-tuned, its size and inherent capabilities, and even specific architectural nuances or training data idiosyncrasies can influence how it responds to different prompting techniques.
            </p>
          </div>
          {/* --- End Page Title & Intro --- */}


          {/* --- Section 5.1: Base vs Instruction-Tuned --- */}
          <section className="mb-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Base Models vs. Instruction-Tuned Models
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              A fundamental distinction exists between base LLMs and their instruction-tuned counterparts, significantly impacting effective prompting strategies.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Base Models */}
              <div className="border-l-4 border-orange-400 pl-4 py-2">
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-2">Base Models</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  (e.g., foundational GPT, Llama before instruct-tuning) These models are primarily trained to predict the next token. They possess broad knowledge but aren't optimized for following commands directly.<sup className="text-xs">47</sup> They might continue your prompt text instead of treating it as an instruction.<sup className="text-xs">47</sup>
                </p>
                <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-1">Prompting Strategies:</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>Relies heavily on **few-shot learning** (providing examples).<sup className="text-xs">46</sup></li>
                  <li>Structure prompts as completions (e.g., "Q: ... A: ...").<sup className="text-xs">145</sup></li>
                  <li>Zero-shot instructions may be poorly executed.<sup className="text-xs">47</sup></li>
                  <li>Requires careful structuring and clarity.</li>
                </ul>
              </div>
              {/* Instruction-Tuned Models */}
              <div className="border-l-4 border-teal-400 pl-4 py-2">
                 <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-2">Instruction-Tuned Models</h3>
                 <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                   (e.g., ChatGPT series, Claude, Gemini, Llama-Instruct, Mistral-Instruct) These undergo additional fine-tuning (SFT, RLHF/RLAIF) on instruction-response datasets.<sup className="text-xs">47</sup> They are much better at understanding and following zero-shot instructions.<sup className="text-xs">53</sup>
                 </p>
                 <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-1">Prompting Strategies:</h4>
                 <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                   <li>**Zero-shot prompting** is effective for many tasks.<sup className="text-xs">53</sup></li>
                   <li>Direct instructions, role prompting, format requests work well.<sup className="text-xs">53</sup></li>
                   <li>Few-shot examples still useful for complex tasks.<sup className="text-xs">53</sup></li>
                   <li>Advanced techniques (CoT) are effective.<sup className="text-xs">146</sup></li>
                   <li>Focus shifts from *showing* (few-shot) to *telling*.</li>
                 </ul>
              </div>
            </div>
             <p className="mt-6 text-sm text-gray-600 dark:text-gray-400 italic">
               This distinction is fundamental: instruction tuning essentially bakes in some level of prompt-following ability, reducing the burden on the prompt engineer for many common tasks.<sup className="text-xs">47</sup> However, even instruction-tuned models benefit from clear, specific, and well-structured prompts, especially as task complexity increases.
            </p>
          </section>
          {/* --- End Section 5.1 --- */}


           {/* --- Section 5.2: Model Size --- */}
          <section className="mb-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Impact of Model Size and Capability
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The size and inherent capability of an LLM are major factors influencing which prompting techniques are effective and necessary.
            </p>
             <div className="grid md:grid-cols-2 gap-6">
              {/* Smaller Models */}
              <div className="border-l-4 border-blue-400 pl-4 py-2">
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-2">Smaller Models</h3>
                 <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    (e.g., &lt; 10B parameters, sometimes up to ~70B like Mistral-7B, Llama 3 8B). Often have limitations in complex reasoning and following intricate instructions.<sup className="text-xs">146</sup>
                 </p>
                 <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-1">Prompting Strategies:</h4>
                 <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                   <li>Simpler prompts are often more effective.</li>
                   <li>Complex reasoning (CoT) may offer limited benefit or degrade performance.<sup className="text-xs">84</sup></li>
                   <li>Break down tasks into smaller, sequential prompts (prompt chaining).<sup className="text-xs">11</sup></li>
                   <li>Few-shot examples can be crucial.</li>
                   <li>More prompt optimization effort may be needed.<sup className="text-xs">146</sup></li>
                   <li>Self-Consistency, ToT, GoT generally unsuitable.</li>
                 </ul>
              </div>
              {/* Larger Models */}
              <div className="border-l-4 border-purple-400 pl-4 py-2">
                 <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-2">Larger Models</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    (e.g., &gt 70B-100B+ parameters like GPT-4 class, Claude 3 Opus, Llama 3 70B/405B). Exhibit "emergent abilities" like stronger reasoning and instruction following.<sup className="text-xs">35, 4</sup>
                 </p>
                 <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-1">Prompting Strategies:</h4>
                 <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                   <li>Respond well to zero-shot instructions.</li>
                   <li>Significantly benefit from CoT for complex reasoning.<sup className="text-xs">84</sup></li>
                   <li>Suitable for Self-Consistency, ReAct, ToT, GoT (consider cost).<sup className="text-xs">4</sup></li>
                   <li>Prompt optimization for conciseness is important due to cost.<sup className="text-xs">11</sup></li>
                   <li>Effectively utilize role prompting and structured prompts.</li>
                 </ul>
              </div>
            </div>
             <p className="mt-6 text-sm text-gray-600 dark:text-gray-400 italic">
               The scale of the model is arguably the most significant factor determining the applicability of advanced reasoning prompts like CoT, ToT, and GoT. These techniques often rely on emergent reasoning capabilities that are typically only present in very large models.<sup className="text-xs">84</sup> Attempting complex reasoning prompts with smaller models may lead to poor or nonsensical results.
            </p>
          </section>
          {/* --- End Section 5.2 --- */}


          {/* --- Section 5.3: Specific Models (Accordion) --- */}
          <section className="mb-12">
             <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Strategies for Specific Models
            </h2>
             <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
               Beyond general size and tuning distinctions, specific model families often have unique characteristics and recommended prompting practices:
            </p>
            <div className="space-y-3">
                {[
                    { key: 'gpt4', title: 'OpenAI GPT-4o / GPT-4.1', content: (<> <p>Highly capable across tasks (reasoning, instruction following, code).<sup className="text-xs">148</sup> Respond well to clear, direct instructions. Benefit significantly from CoT for complexity.<sup className="text-xs">85</sup> For agentic workflows (GPT-4.1), specific system prompts for planning/tools recommended.<sup className="text-xs">156</sup> Can be sensitive to conflicting instructions (prioritizing later ones).<sup className="text-xs">156</sup> Standard GPT-4 techniques often work for GPT-4o.<sup className="text-xs">149</sup> Remain among the more expensive models.<sup className="text-xs">149</sup></p></>) },
                    { key: 'claude3', title: 'Anthropic Claude 3 / 3.5 / 3.7 (Haiku, Sonnet, Opus)', content: (<> <p>Strong performance (Opus for reasoning, Sonnet for balance).<sup className="text-xs">61</sup> Strong affinity for **XML tags** (e.g., <code>&lt;instructions&gt;</code>, <code>&lt;example&gt;</code>) for structuring prompts is explicitly recommended.<sup className="text-xs">64</sup> Best practices: clear/direct instructions, few-shot examples (in <code>&lt;example&gt;</code> tags), assign roles, prefill Assistant turn start for format control, use CoT (potentially in <code>&lt;thinking&gt;</code> tags).<sup className="text-xs">62</sup> Improved safety and reduced refusals.<sup className="text-xs">83</sup> Strong long-context recall (Opus).<sup className="text-xs">61</sup></p></>) },
                    { key: 'llama3', title: 'Meta Llama 3 / 3.1 (Instruct Variants)', content: (<> <p>High-performing open-weight models. Instruct versions tuned for chat/instructions.<sup className="text-xs">148</sup> **Requires specific chat templates** (e.g., <code>&lt;|begin_of_text|&gt;</code>, <code>&lt;|start_header_id|&gt;</code> etc.) for optimal performance - using the correct template is vital.<sup className="text-xs">128</sup> Llama 3 70B competitive with GPT-4.<sup className="text-xs">149</sup> Good at following formatting without extra conversational text.<sup className="text-xs">149</sup> Few-shot and CoT effective.<sup className="text-xs">149</sup> 405B variant offers top-tier open performance but needs substantial resources.<sup className="text-xs">125</sup> GPT-4 strategies often adapt well if template is correct.<sup className="text-xs">149</sup></p></>) },
                    { key: 'gemini', title: 'Google Gemini (Flash, Pro, Ultra)', content: (<> <p>Family offering different capability/speed/cost balances.<sup className="text-xs">154</sup> Strong multimodal capabilities.<sup className="text-xs">157</sup> Respond best to specific, detailed prompts with ample context.<sup className="text-xs">70</sup> Few-shot prompting and instructing to "think step-by-step" (CoT) highly recommended for complex tasks.<sup className="text-xs">157</sup> Effective use of explicit output format requests (JSON, Markdown).<sup className="text-xs">160</sup> Role prompting ("Act as a...") helps tailor responses.<sup className="text-xs">70</sup> Breaking down complex tasks into smaller prompts is key.<sup className="text-xs">158</sup></p></>) },
                    { key: 'mistral', title: 'Mistral AI (7B Instruct, Large 2, Small 3)', content: (<> <p>Recognized for strong performance relative to size/cost.<sup className="text-xs">154</sup> Instruct models use specific chat template format (often <code>[INST]...[/INST]</code> tags).<sup className="text-xs">163</sup> Effective techniques: few-shot, delimiters (###, &lt;&lt;&lt; &gt;&gt;&gt;), role-playing, step-by-step instructions (CoT), requesting JSON output (via API parameter).<sup className="text-xs">65</sup> System prompts can enforce guardrails/behavior.<sup className="text-xs">163</sup></p></>) },
                ].map((item) => (
                    <div key={item.key} className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
                        <button
                        className="w-full text-left px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => toggleAccordion(item.key)}
                        aria-expanded={openAccordion === item.key}
                        aria-controls={`accordion-content-${item.key}`}
                        >
                        <span className="text-base font-medium text-gray-800 dark:text-gray-100">
                            {item.title}
                        </span>
                        {openAccordion === item.key ? <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />}
                        </button>
                        {openAccordion === item.key && (
                        <div
                            id={`accordion-content-${item.key}`}
                            className="px-4 pb-4 pt-3 text-sm text-gray-700 dark:text-gray-300 space-y-2 border-t border-gray-200 dark:border-gray-700"
                        >
                            {item.content}
                        </div>
                        )}
                    </div>
                ))}
            </div>
          </section>
          {/* --- End Section 5.3 --- */}


            {/* Navigation Buttons Container */}
            <div className="mt-12 pt-6 border-t border-gray-200 flex justify-between items-center">
               {/* Back Button */}
               <Link href="/knowledge/prompt-engineering-complete-field-guide" passHref> {/* Link to Challenges page */}
                 <button
                   onClick={handleBackSectionClick}
                   className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                 >
                   <ArrowLeft className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
                   Previous Section
                 </button>
               </Link>

              {/* Next Button */}
              <Link href="/knowledge/prompt-engineering-advanced-considerations" passHref> {/* Update href to your conclusion/final page */}
                 <button
                   onClick={handleNextSectionClick}
                   className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                 >
                   Next Section {/* Updated Button Text */}
                   <ArrowRight className="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
                 </button>
              </Link>
            </div>

        </main>

        <Footer />
      </div>
    </>
  );
}
