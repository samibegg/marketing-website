// pages/knowledge/advanced-prompting-considerations.js (Example Path)
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
  // Ensure gtag is available before calling
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventData);
  } else {
    console.warn('window.gtag not available for tracking event:', eventName);
  }
};


// --- Page Component ---
export default function AdvancedPromptingConsiderations() {
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
  // TODO: Update this if there's a page after this one
  const nextPageRoute = '/knowledge/prompt-engineering-evaluating-effectiveness'; // Example: Link back to index as this might be the last page
  const previousPageRoute = '/knowledge/prompt-engineering-tailoring-for-llms'; // Link to the previous page

  const handleConditionalClick = (targetRoute) => {
    const action = status === 'authenticated' ? 'navigate_next_section' : 'login_prompted';
    // TODO: Update page_section for tracking
    trackEvent('cta_click', { button_text: buttonText, action: action, page_section: 'Advanced Considerations Conclusion' });

    if (status === 'authenticated') {
      router.push(targetRoute);
    } else if (status === 'unauthenticated') {
      openModal();
    }
    // Do nothing if status is 'loading'
  };

  // Determine button text based on auth status
  let buttonText = 'Loading...';
  if (status === 'authenticated') {
    buttonText = 'Next Section'; // Assuming this is the last page
  } else if (status === 'unauthenticated') {
    buttonText = 'Login to Continue';
  }
  // --- End Conditional Button Logic ---


  // --- Analytics Tracking Effects ---

  // 1. Track initial page view
  useEffect(() => {
    // TODO: Update page_title for tracking
    trackEvent('page_view', { page_title: 'Advanced Prompting Considerations' });
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
          trackEvent('scroll_depth', { depth_percentage: milestone, page_section: 'Advanced Considerations' });
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
            page_section: 'Advanced Considerations'
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
          page_section: 'Advanced Considerations',
          content_snippet: selectedText.substring(0, 100) + (selectedText.length > 100 ? '...' : '')
        });
      }
    };
    const contentElement = contentRef.current;
    if (contentElement) { contentElement.addEventListener('copy', handleCopy); }
    return () => { if (contentElement) { contentElement.removeEventListener('copy', handleCopy); } };
  }, []);
  // --- End Analytics Tracking Effects ---


  // --- SEO Content ---
  // TODO: Update all these values for the new page
  const pageTitle = "Advanced Prompt Engineering: Implementation & Considerations";
  const pageDescription = "Explore practical implementation examples, multilingual prompting, phrasing impact, iteration, prompt complexity, and handling ambiguity in advanced prompt engineering.";
  const canonicalUrl = "https://www.forgemission.com/knowledge/prompt-engineering-advanced-considerations"; // *** REPLACE with actual URL ***
  const imageUrl = "https://www.forgemission.com/images/og-advanced-prompting.jpg"; // *** REPLACE with actual OG image URL ***
  const publicationDate = "2025-05-08T10:00:00Z"; // Adjust date
  const modifiedDate = "2025-05-08T11:00:00Z"; // Adjust date

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
    "keywords": "prompt engineering implementation, advanced prompting, multilingual prompting, prompt iteration, prompt refinement, prompt complexity, prompt ambiguity, llm examples, gpt-4 examples, claude 3 examples, llama 3 examples"
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
            tags: ['Prompt Engineering', 'LLM', 'AI Strategy', 'Implementation', 'Advanced Techniques', 'Multilingual AI'],
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

        <main ref={contentRef} className="flex-grow px-4 sm:px-6 py-12 max-w-4xl mx-auto w-full"> {/* Standard max-width */}
          {/* Back Link */}
          <div className="mb-8">
            <Link href={previousPageRoute} className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Model Reference
            </Link>
          </div>

          {/* --- Page Title & Intro --- */}
          <div className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-4 tracking-tight">
              Implementation and Advanced Considerations
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Applying prompt engineering effectively involves not only selecting the right techniques and tailoring them to specific models but also addressing practical implementation details and nuanced considerations. This section provides concrete examples and delves into advanced topics like multilingual prompting, the impact of subtle phrasing, the necessity of iteration, managing prompt complexity, and handling ambiguity.
            </p>
          </div>
          {/* --- End Page Title & Intro --- */}


          {/* --- Section 6.1: Concrete Examples (Accordion) --- */}
          <section className="mb-12">
             <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Concrete Examples for Specific Models
            </h2>
             <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
               To illustrate the application of techniques discussed, consider these examples tailored to specific models:
            </p>
            <div className="space-y-3">
                {[
                    { key: 'gpt4cot', title: 'GPT-4o with Chain-of-Thought (CoT)', content: (<> <p>For solving a multi-step math word problem, a prompt might include few-shot examples demonstrating the step-by-step breakdown or simply append "Let's think step by step." to the problem statement.<sup className="text-xs">85</sup></p> <p className="mt-2"><strong>Example Prompt Structure:</strong></p> <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-xs overflow-x-auto"><code>User: [Math Word Problem]. Let's think step by step.</code></pre> <p className="mt-2"><strong>Expected Behavior:</strong> GPT-4o generates intermediate reasoning steps before the final numerical answer.<sup className="text-xs">88</sup></p> </>) },
                    { key: 'claude3xml', title: 'Claude 3 Opus with Structured Prompting (XML)', content: (<> <p>To extract specific information from a contract, wrap the contract text in <code>&lt;contract&gt;</code> tags and provide instructions within <code>&lt;instructions&gt;</code> tags, specifying the desired output format perhaps using nested tags like <code>&lt;findings&gt;</code> and <code>&lt;recommendations&gt;</code>.<sup className="text-xs">73</sup></p> <p className="mt-2"><strong>Example Prompt Structure:</strong></p> <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-xs overflow-x-auto"><code>User: &lt;instructions&gt;Analyze the contract in the tags below...&lt;/instructions&gt;\n&lt;contract&gt;[Contract Text Here]&lt;/contract&gt;\nPlease output findings in &lt;findings&gt; tags.</code></pre> <p className="mt-2"><strong>Expected Behavior:</strong> Claude accurately parses the distinct sections and provides a structured response adhering to the XML format.<sup className="text-xs">73</sup></p> </>) },
                    { key: 'llama3fewshot', title: 'Llama 3 70B Instruct with Few-Shot and Template', content: (<> <p>To generate a product description in a specific style, use the official Llama 3 chat template, including a system prompt defining the role and few-shot examples demonstrating the input (product features) and desired output (description).<sup className="text-xs">128</sup></p> <p className="mt-2"><strong>Example Prompt Structure (simplified):</strong></p> <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-xs overflow-x-auto"><code>&lt;|begin_of_text|&gt;&lt;|start_header_id|&gt;system&lt;|end_header_id|&gt;\n\nYou are a creative copywriter.&lt;|eot_id|&gt;&lt;|start_header_id|&gt;user&lt;|end_header_id|&gt;\n\nProduct: [Features A]. Description: [Example Desc A]&lt;|eot_id|&gt;&lt;|start_header_id|&gt;assistant&lt;|end_header_id|&gt;\n\nOkay, I understand.&lt;|eot_id|&gt;&lt;|start_header_id|&gt;user&lt;|end_header_id|&gt;\n\nProduct: [New Product Features]. Description:&lt;|eot_id|&gt;&lt;|start_header_id|&gt;assistant&lt;|end_header_id|&gt;</code></pre> <p className="mt-2"><strong>Expected Behavior:</strong> Llama 3 follows the provided style and format based on the examples within its required template structure.<sup className="text-xs">149</sup></p> </>) },
                    { key: 'reactframework', title: 'ReAct with GPT-4o/Llama 3 via Frameworks', content: (<> <p>Using a framework like LangChain or LlamaIndex, define tools (e.g., a search API wrapper, a calculator) and structure a ReAct prompt that guides the model (e.g., GPT-4o or Llama 3) through Thought-Action-Observation cycles to answer a question requiring current information, like "What is the current weather in San Francisco?".<sup className="text-xs">126</sup></p> <p className="mt-2"><strong>Expected Behavior:</strong> The agent generates thoughts like "I need to find the current weather," actions like <code>Action: search(query="current weather San Francisco")</code>, receives observations, and reasons towards a final answer.<sup className="text-xs">127</sup></p> </>) },
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
          {/* --- End Section 6.1 --- */}


          {/* --- Section 6.2: Multilingual Prompting --- */}
          <section className="mb-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Multilingual Prompting
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Prompting LLMs for multilingual tasks presents unique challenges and requires specific strategies:
            </p>
            <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-2">Challenges:</h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 mb-4 ml-4 text-sm">
                <li>Performance often degrades in low-resource languages compared to high-resource languages like English.<sup className="text-xs">167</sup></li>
                <li>Models may struggle with linguistic nuances, cultural context, and code-mixing.<sup className="text-xs">167</sup></li>
                <li>Bias present in predominantly English training data can be amplified.<sup className="text-xs">167</sup></li>
                <li>Ensuring consistency across languages is difficult.<sup className="text-xs">169</sup></li>
            </ul>
             <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-2">Strategies:</h3>
             <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4 text-sm">
                <li><strong>Direct Prompting:</strong> Use zero-shot or few-shot prompting directly in the target language (effectiveness varies by language/model).<sup className="text-xs">32</sup></li>
                <li><strong>Translation-Based Prompting:</strong> Translate input to high-resource language (e.g., English), prompt in English, translate result back. Chain-of-Translation (CoTR) improves this for code-mixed text.<sup className="text-xs">167</sup> Quality depends on translation accuracy.<sup className="text-xs">167</sup></li>
                <li><strong>Code-Mixed Prompting:</strong> Design prompts to handle/identify mixed-language inputs.<sup className="text-xs">168</sup></li>
                <li><strong>Example Selection:</strong> Carefully select few-shot examples reflecting target language nuances.<sup className="text-xs">32</sup></li>
                <li><strong>Prompt Language:</strong> Experiment with instructions in English even for other language I/O, as models might follow English better.<sup className="text-xs">167</sup></li>
            </ul>
          </section>
          {/* --- End Section 6.2 --- */}


          {/* --- Section 6.3: Phrasing, Keywords, Structure --- */}
          <section className="mb-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Impact of Phrasing, Keywords, and Sentence Structure
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The exact wording and structure of a prompt can dramatically influence the LLM's output, highlighting the sensitivity of these models to input variations.<sup className="text-xs">7</sup>
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4 text-sm">
                <li><strong>Clarity and Specificity:</strong> Ambiguous phrasing leads to poor results.<sup className="text-xs">23</sup> Use precise terms, action verbs, quantifiable requests.<sup className="text-xs">1, 2</sup></li>
                <li><strong>Keywords:</strong> Specific words act as signals guiding the model.<sup className="text-xs">170</sup> Can emphasize aspects or bypass intermediate reasoning.<sup className="text-xs">170</sup></li>
                <li><strong>Sentence Structure:</strong> Well-structured sentences and logical flow improve comprehension.<sup className="text-xs">5</sup> Formatting (lists, JSON, XML) helps organize complex instructions.<sup className="text-xs">2</sup></li>
                <li><strong>Directive Phrasing:</strong> Affirmative ("Do X") often better than negative ("Don't do Y").<sup className="text-xs">171</sup></li>
                <li><strong>Emotional/Cognitive Cues:</strong> Phrases like "This is critical..." or "Think step by step..." can sometimes improve focus (effectiveness varies).<sup className="text-xs">174</sup></li>
                <li><strong>Parameter Interaction:</strong> Phrasing interacts with inference parameters (Temperature, Top-P) affecting randomness and style.<sup className="text-xs">175</sup></li>
            </ul>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 italic">
              Mastering these subtle linguistic elements often requires experimentation and iterative refinement.
            </p>
          </section>
          {/* --- End Section 6.3 --- */}


          {/* --- Section 6.4: Iteration and Refinement --- */}
          <section className="mb-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Iterative Prompting and Refinement
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Prompt engineering is rarely a one-time process; it is fundamentally iterative.<sup className="text-xs">25</sup> Getting a prompt to work reliably across various inputs and edge cases typically requires cycles of testing, analysis, and refinement.
            </p>
             <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
                <strong>Necessity:</strong> Iteration is needed due to language ambiguity, model quirks, task complexity, edge cases, or the probabilistic nature of LLMs.<sup className="text-xs">176</sup>
             </p>
            <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-2">The Process:</h3>
            <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 space-y-1 mb-4 ml-4 text-sm">
                <li><strong>Design Initial Prompt:</strong> Create based on best practices and task understanding.<sup className="text-xs">176</sup></li>
                <li><strong>Test with Diverse Inputs:</strong> Evaluate with typical cases, edge cases, ambiguous inputs, adversarial examples.<sup className="text-xs">176</sup></li>
                <li><strong>Analyze Outputs:</strong> Identify errors, inconsistencies, irrelevancies, format deviations. Understand *why* it failed.<sup className="text-xs">176</sup></li>
                <li><strong>Refine Prompt:</strong> Make targeted adjustments (clarify, add/modify examples, adjust structure, add constraints).<sup className="text-xs">176</sup></li>
                <li><strong>Repeat:</strong> Continue until satisfactory performance is achieved based on metrics/goals.<sup className="text-xs">176</sup></li>
            </ol>
             <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
                <strong>Benefits:</strong> Systematically improves accuracy, relevance, consistency, and robustness.<sup className="text-xs">176</sup> Aligns output with user intent.<sup className="text-xs">177</sup> Studies show significant gains.<sup className="text-xs">178</sup> Techniques like Self-Refine formalize this.<sup className="text-xs">181</sup>
             </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong>Stopping Criteria:</strong> Stop when performance is acceptable, returns diminish, or complexity/cost constraints are met.<sup className="text-xs">176</sup>
             </p>
          </section>
          {/* --- End Section 6.4 --- */}


          {/* --- Section 6.5: Length and Complexity --- */}
          <section className="mb-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Prompt Length and Complexity
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The length and complexity of a prompt have direct implications for both LLM performance and operational cost.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-4">
                <div>
                    <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-2">Impact on Performance</h3>
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li><strong className="text-green-600 dark:text-green-400">Benefits:</strong> More context, clear instructions, or few-shot examples can improve performance, especially for complex tasks or less capable models.<sup className="text-xs">138</sup> CoT boosts reasoning.<sup className="text-xs">84</sup></li>
                        <li><strong className="text-red-600 dark:text-red-400">Drawbacks:</strong> Excessive length can confuse, dilute focus, hit context limits (truncation).<sup className="text-xs">24</sup> Complex instructions can be misinterpreted. Increases latency.<sup className="text-xs">185</sup></li>
                    </ul>
                </div>
                 <div>
                    <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-2">Impact on Cost</h3>
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li><strong>Token Pricing:</strong> APIs charge for input (prompt) + output tokens.<sup className="text-xs">150</sup></li>
                        <li><strong>Direct Cost:</strong> Longer prompts = higher input cost.<sup className="text-xs">150</sup></li>
                        <li><strong>Indirect Cost:</strong> Complex prompts/CoT often lead to longer outputs = higher output cost.<sup className="text-xs">138</sup></li>
                         <li><strong>Multi-Call Cost:</strong> Self-Consistency, ReAct, ToT, GoT, iteration multiply costs significantly.<sup className="text-xs">138</sup></li>
                    </ul>
                </div>
            </div>
             <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-2">Optimization Strategies:</h3>
             <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 ml-4 text-sm">
                <li><strong>Conciseness:</strong> Be clear and specific, minimize redundancy.<sup className="text-xs">33</sup></li>
                <li><strong>Structuring:</strong> Use clear formatting (lists, tags) for clarity without excessive length.<sup className="text-xs">150</sup></li>
                <li><strong>Task Decomposition:</strong> Break complex tasks into smaller, sequential prompts (prompt chaining).<sup className="text-xs">10</sup></li>
                <li><strong>Model Selection:</strong> Use smaller/cheaper models for simpler sub-tasks.<sup className="text-xs">147</sup></li>
                <li><strong>Context Management:</strong> Use efficient techniques for long histories (summarization, RAG).</li>
                <li><strong>Balance:</strong> Trade off detail/complexity against cost/latency needs.<sup className="text-xs">150</sup></li>
            </ul>
          </section>
          {/* --- End Section 6.5 --- */}


          {/* --- Section 6.6: Ambiguity and Context --- */}
          <section className="mb-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Handling Ambiguity and Providing Sufficient Context
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Ambiguity is inherent in natural language and poses a significant challenge for LLMs.<sup className="text-xs">23</sup> Insufficient context is another common reason for poor or generic responses.<sup className="text-xs">171</sup>
            </p>
             <div className="grid md:grid-cols-2 gap-6 mb-4">
                <div>
                    <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-2">Strategies to Reduce Ambiguity:</h3>
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li><strong>Use Specific Language:</strong> Avoid vague terms; use precise terms, quantities, action verbs.<sup className="text-xs">2</sup></li>
                        <li><strong>Define Terms:</strong> Explicitly define potentially ambiguous key terms.<sup className="text-xs">1</sup></li>
                        <li><strong>Provide Examples:</strong> Few-shot examples clarify intent/format.<sup className="text-xs">10</sup></li>
                        <li><strong>Set Constraints:</strong> State boundaries, format, tone, negative constraints (though positive preferred).<sup className="text-xs">3</sup></li>
                    </ul>
                </div>
                 <div>
                    <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-2">Strategies to Provide Context:</h3>
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li><strong>Background Information:</strong> Include necessary details for the task.<sup className="text-xs">1</sup></li>
                        <li><strong>Specify Persona/Audience:</strong> Define LLM role or target audience.<sup className="text-xs">1</sup></li>
                        <li><strong>Reference External Data:</strong> Point to specific documents (moves towards RAG).<sup className="text-xs">1</sup></li>
                        <li><strong>Structure for Clarity:</strong> Use structured formats (XML, JSON, lists).<sup className="text-xs">73</sup></li>
                         <li><strong>Agent Clarification:</strong> Design agents to ask clarifying questions.<sup className="text-xs">174</sup></li>
                    </ul>
                </div>
            </div>
             <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 italic">
               <strong>Iterative Refinement:<sup className="text-xs">176</sup></strong> Testing with ambiguous inputs and refining prompts based on misinterpretations is key to managing these challenges.
            </p>
             <p className="mt-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                Effectively managing these advanced considerations requires moving beyond basic prompt construction. It involves a deep understanding of linguistic nuance, LLM behavior, the specific task requirements, and the practical constraints of cost and latency. The iterative refinement process<sup className="text-xs">176</sup> is central to navigating these complexities, allowing prompt engineers to systematically diagnose issues related to phrasing, context, or ambiguity and converge on prompts that reliably produce high-quality results for the target LLM and application.
            </p>
          </section>
          {/* --- End Section 6.6 --- */}


          {/* --- Navigation Buttons Container --- */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-center items-center gap-4">
             {/* Previous Button */}
             <Link href={previousPageRoute} passHref>
                <button
                    className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
                >
                    <ArrowLeft className="mr-3 -ml-1 h-5 w-5" aria-hidden="true" />
                    Previous Section
                </button>
             </Link>

            {/* Conditional Next/Login Button */}
            <div> {/* Keep div for layout consistency */}
              <button
                onClick={() => handleConditionalClick(nextPageRoute)} // Pass target route
                disabled={status === 'loading'}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
              >
                {buttonText}
                {/* Show Left arrow if linking back to index */}
                {status === 'authenticated' && nextPageRoute === '/knowledge-base' && (
                   <ArrowLeft className="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
                )}
                 {/* Show Right arrow if linking to another content page */}
                 {status === 'authenticated' && nextPageRoute !== '/knowledge/prompt-engineering-evaluating-effectiveness' && (
                   <ArrowRight className="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
          {/* --- End Navigation Buttons Container --- */}

        </main>

        <Footer />
      </div>
    </>
  );
}
