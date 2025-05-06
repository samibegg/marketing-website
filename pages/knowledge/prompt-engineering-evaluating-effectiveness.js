// pages/knowledge/evaluating-prompt-effectiveness.js (Example Path)
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
export default function EvaluatingPromptEffectiveness() {
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
  const nextPageRoute = '/knowledge/prompt-engineering-challenges-ethics-future'; // Example: Link back to index as this might be the last page
  const previousPageRoute = '/knowledge/prompt-engineering-advanced-considerations'; // Link to the previous page

  const handleConditionalClick = (targetRoute) => {
    const action = status === 'authenticated' ? 'navigate_next_section' : 'login_prompted';
    // TODO: Update page_section for tracking
    trackEvent('cta_click', { button_text: buttonText, action: action, page_section: 'Evaluating Prompts Conclusion' });

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
    trackEvent('page_view', { page_title: 'Evaluating Prompt Effectiveness' });
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
          trackEvent('scroll_depth', { depth_percentage: milestone, page_section: 'Evaluating Prompts' });
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
            page_section: 'Evaluating Prompts'
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
          page_section: 'Evaluating Prompts',
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
  const pageTitle = "Evaluating Prompt Effectiveness: Methods & Metrics";
  const pageDescription = "Learn about methods for evaluating LLM prompt effectiveness, including human evaluation, automated metrics (reference-based and reference-free), LLM-as-a-judge, and key metrics.";
  const canonicalUrl = "https://www.forgemission.com/knowledge/prompt-engineering-evaluating-effectiveness"; // *** REPLACE with actual URL ***
  const imageUrl = "https://www.forgemission.com/images/og-evaluating-prompts.jpg"; // *** REPLACE with actual OG image URL ***
  const publicationDate = "2025-05-09T10:00:00Z"; // Adjust date
  const modifiedDate = "2025-05-09T11:00:00Z"; // Adjust date

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
    "keywords": "prompt evaluation, prompt engineering metrics, llm evaluation, human evaluation, automated evaluation, bleu score, rouge score, bertscore, llm-as-a-judge, prompt testing, prompt performance"
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
            tags: ['Prompt Engineering', 'LLM Evaluation', 'AI Strategy', 'Metrics', 'Testing'],
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
              Back to Advanced Considerations
            </Link>
          </div>

          {/* --- Page Title & Intro --- */}
          <div className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-4 tracking-tight">
              Evaluating Prompt Effectiveness
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Evaluating the effectiveness of prompts is a critical, yet challenging, aspect of prompt engineering. Given the generative and often subjective nature of LLM outputs, traditional software testing or machine learning metrics are often insufficient. A multi-faceted approach combining automated metrics, human judgment, and potentially LLM-based evaluation is typically required to gain a comprehensive understanding of prompt performance.<sup className="text-xs">192</sup>
            </p>
          </div>
          {/* --- End Page Title & Intro --- */}


          {/* --- Section 7.1: Need for Evaluation --- */}
          <section className="mb-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              The Need for Evaluation
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Evaluation is essential for several reasons:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4 text-sm sm:text-base">
                <li><strong>Quality Assessment:</strong> To objectively measure if responses meet standards for accuracy, relevance, coherence, etc.<sup className="text-xs">192</sup></li>
                <li><strong>Comparison and Selection:</strong> To compare different prompt variations, techniques, or LLMs for a task.<sup className="text-xs">192</sup></li>
                <li><strong>Iterative Refinement:</strong> To guide prompt improvement by identifying weaknesses and measuring change impact.<sup className="text-xs">180</sup></li>
                <li><strong>Reliability and Safety:</strong> To ensure prompts consistently produce reliable, safe, unbiased, and ethical outputs.<sup className="text-xs">195</sup></li>
                <li><strong>Cost/Performance Optimization:</strong> To assess trade-offs between prompt complexity/performance and cost/latency.<sup className="text-xs">185</sup></li>
            </ul>
          </section>
          {/* --- End Section 7.1 --- */}


          {/* --- Section 7.2: Evaluation Methods (Accordion) --- */}
          <section className="mb-12">
             <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Evaluation Methods
            </h2>
             <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
               Several methods can be employed, often in combination:
            </p>
            <div className="space-y-3">
                {[
                    { key: 'human', title: 'Human Evaluation', content: (<>
                        <p>Widely considered the gold standard for assessing subjective qualities like coherence, relevance, style, creativity, and overall helpfulness.<sup className="text-xs">192</sup></p>
                        <p className="mt-2"><strong>Techniques:</strong> Using Likert scales (e.g., rating relevance 1-5), pairwise comparisons (A/B testing: choosing the better of two responses), binary judgments (e.g., thumbs up/down, factual/hallucinated), or collecting qualitative feedback.<sup className="text-xs">192</sup></p>
                        <p className="mt-2"><strong>Pros:</strong> Captures nuances automated metrics miss; directly reflects user perception.<sup className="text-xs">192</sup></p>
                        <p className="mt-2"><strong>Cons:</strong> Subjective (needs clear guidelines & multiple annotators), slow, expensive, hard to scale.<sup className="text-xs">193</sup></p>
                    </>) },
                    { key: 'autoRef', title: 'Automated Evaluation (Reference-Based)', content: (<>
                        <p>Compares the LLM's output against one or more predefined "ground truth" or reference answers.<sup className="text-xs">195</sup></p>
                        <p className="mt-2"><strong>Metrics:</strong></p>
                        <ul className="list-disc list-inside ml-4 text-sm space-y-1">
                            <li><strong>Exact Match:</strong> Checks for identical output (for specific formats/short answers).<sup className="text-xs">200</sup></li>
                            <li><strong>Overlap Metrics (BLEU, ROUGE, METEOR):</strong> Measure n-gram/word overlap; common but often correlate poorly with overall quality. BLEU=precision, ROUGE=recall.<sup className="text-xs">200</sup> METEOR considers synonyms/stemming.<sup className="text-xs">200</sup></li>
                            <li><strong>Semantic Similarity (BERTScore, MoverScore, COMET):</strong> Use embeddings to compare meaning; correlate better with human judgment.<sup className="text-xs">194</sup> COMET for translation.<sup className="text-xs">196</sup></li>
                        </ul>
                        <p className="mt-2"><strong>Pros:</strong> Objective (given references), fast, scalable, cheap.<sup className="text-xs">193</sup></p>
                        <p className="mt-2"><strong>Cons:</strong> Requires high-quality references (costly/difficult). May not capture semantic correctness or other qualities well.<sup className="text-xs">198</sup></p>
                    </>) },
                    { key: 'autoNoRef', title: 'Automated Evaluation (Reference-Free)', content: (<>
                        <p>Assesses output based on intrinsic properties or relationship to input/source, without needing a predefined correct answer.<sup className="text-xs">200</sup></p>
                        <p className="mt-2"><strong>Metrics:</strong></p>
                         <ul className="list-disc list-inside ml-4 text-sm space-y-1">
                            <li><strong>Quality/Fluency:</strong> Perplexity, grammaticality checkers, readability scores (Flesch-Kincaid).<sup className="text-xs">198</sup></li>
                            <li><strong>Factual Consistency/Faithfulness:</strong> NLI models (SummaC, FactCC, DAE) for entailment/contradiction against source<sup className="text-xs">195</sup>; QA-based methods (QuestEval, QAFactEval).<sup className="text-xs">201</sup> Crucial for RAG/summarization.</li>
                            <li><strong>Safety/Bias:</strong> Toxicity classifiers, bias benchmarks (StereoSet, BBQ), fairness metrics.<sup className="text-xs">38</sup></li>
                            <li><strong>Task-Specific:</strong> Accuracy/Precision/Recall/F1 (classification), code execution success (unit tests)<sup className="text-xs">200</sup>, format adherence (JSON validation, regex).<sup className="text-xs">200</sup></li>
                        </ul>
                        <p className="mt-2"><strong>Pros:</strong> Avoids need for reference outputs. Can measure critical properties like factuality or safety.<sup className="text-xs">201</sup></p>
                        <p className="mt-2"><strong>Cons:</strong> Often requires auxiliary models (NLI, classifiers). May not reflect overall quality or user satisfaction.</p>
                    </>) },
                    { key: 'llmJudge', title: 'LLM-as-a-Judge', content: (<>
                        <p>Using a powerful LLM (e.g., GPT-4, Claude Opus) itself as an evaluator to score or compare the outputs of another LLM, guided by a detailed evaluation prompt or rubric.<sup className="text-xs">124</sup></p>
                         <p className="mt-2"><strong>Techniques:</strong> Direct scoring against criteria (rate coherence 1-5), pairwise comparison (which is better?), reasoning-based evaluation (G-Eval asks LLM for reasoning behind score).<sup className="text-xs">201</sup></p>
                        <p className="mt-2"><strong>Pros:</strong> More scalable than human eval. Can potentially capture more nuance than simple automated metrics. Flexible.<sup className="text-xs">195</sup></p>
                        <p className="mt-2"><strong>Cons:</strong> Can exhibit evaluator LLM biases. Performance depends heavily on eval prompt quality and evaluator capability. Can be inconsistent/unreliable.<sup className="text-xs">202</sup> Can be costly (API calls). Active research area.<sup className="text-xs">204</sup></p>
                    </>) },
                     { key: 'benchmarks', title: 'Standardized Benchmarks', content: (<>
                        <p>Using established datasets and tasks (e.g., MMLU, GSM8K, HumanEval, AgentBench, ToolBench, WebArena) to compare performance against published results or other models/techniques.<sup className="text-xs">51</sup></p>
                        <p className="mt-2"><strong>Pros:</strong> Facilitates comparison with the broader field, helps track progress.<sup className="text-xs">189</sup></p>
                        <p className="mt-2"><strong>Cons:</strong> Benchmark performance may not correlate with specific real-world application performance. Models can "overfit" to popular benchmarks.<sup className="text-xs">7</sup></p>
                    </>) },
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
          {/* --- End Section 7.2 --- */}


           {/* --- Section 7.3: Key Metrics Summary --- */}
          <section className="mb-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Key Evaluation Metrics Summary
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Effective evaluation typically involves tracking metrics across several dimensions:
            </p>
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Output Quality:</h4>
                    <p className="text-gray-600 dark:text-gray-400">Relevance, Accuracy, Coherence, Fluency, Factual Consistency/Faithfulness, Readability.<sup className="text-xs">192</sup></p>
                </div>
                 <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Efficiency & Cost:</h4>
                    <p className="text-gray-600 dark:text-gray-400">Latency, Throughput, Token Usage, Computational Resource Use, Monetary Cost.</p>
                </div>
                 <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Safety & Responsibility:</h4>
                    <p className="text-gray-600 dark:text-gray-400">Bias Scores, Toxicity Levels, Fairness Metrics, Privacy Compliance.</p>
                </div>
                 <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Robustness & Reliability:</h4>
                    <p className="text-gray-600 dark:text-gray-400">Consistency across runs, Performance on edge cases, Resilience to adversarial inputs.</p>
                </div>
                 <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">User Experience (Interactive):</h4>
                    <p className="text-gray-600 dark:text-gray-400">User Satisfaction (CSAT, NPS), Task Completion Rate, Engagement Rate, Conversational Flow.</p>
                </div>
                 <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Agent-Specific Metrics:</h4>
                    <p className="text-gray-600 dark:text-gray-400">Task Adherence, Tool Call Accuracy, Intent Resolution, Planning Quality, Autonomy level.<sup className="text-xs">39</sup></p>
                </div>
            </div>
          </section>
          {/* --- End Section 7.3 --- */}


          {/* --- Section 7.4: Frameworks and Tools --- */}
          <section className="mb-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Evaluation Frameworks and Tools
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Numerous open-source and commercial frameworks exist to facilitate prompt evaluation, often integrating multiple methods and metrics. Examples include OpenAI Evals, Promptfoo, LangSmith (from LangChain), Helicone, Comet ML, Weights & Biases, Azure AI Evaluation, RAGAS (for RAG systems), Galileo, Arize, Confident AI, and Braintrust.<sup className="text-xs">144</sup>
            </p>
             <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              These tools typically provide capabilities for managing test datasets, executing prompts against models, calculating metrics, visualizing results, comparing prompt versions (A/B testing), logging interactions, and integrating with development workflows (CI/CD).<sup className="text-xs">203</sup>
            </p>
          </section>
          {/* --- End Section 7.4 --- */}


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
                {status === 'authenticated' && nextPageRoute === '/knowledge/prompt-engineering-tailoring-for-llms' && (
                   <ArrowLeft className="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
                )}
                 {/* Show Right arrow if linking to another content page */}
                 {status === 'authenticated' && nextPageRoute !== '/knowledge-base' && (
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
