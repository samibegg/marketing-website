// pages/prompt-comparison.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Head from 'next/head';
import Image from 'next/image'; // Keep even if not used directly yet
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useSession } from 'next-auth/react';
import { ArrowRight, ArrowLeft } from 'lucide-react'; // Assuming lucide-react is installed

import Header from '../../components/Header'; // Adjust path if needed
import Footer from '../../components/Footer'; // Adjust path if needed
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
export default function PromptEngineeringFieldGuide() {
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
    trackEvent('accordion_toggle', { section_id: key, is_open: openAccordion !== key });
  };

  // --- Conditional Button Logic ---
  const nextPageRoute = '/knowledge/prompt-engineering-tailoring-for-llms'; // Define the target page

  const handleConditionalClick = () => {
    const action = status === 'authenticated' ? 'navigate_next_section' : 'login_prompted';
    trackEvent('cta_click', { button_text: buttonText, action: action });

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
    buttonText = 'Go to Next Section';
  } else if (status === 'unauthenticated') {
    buttonText = 'Login to Continue';
  }
  // --- End Conditional Button Logic ---


  // --- Analytics Tracking Effects ---

  // 1. Track initial page view
  useEffect(() => {
    trackEvent('page_view', { page_title: 'Prompt Engineering Field Guide' });
  }, []); // Empty dependency array ensures this runs only once on mount

  // 2. Track Scroll Depth
  useEffect(() => {
    const handleScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollableHeight <= 0) return; // Avoid division by zero

      const scrollPercent = Math.min(100, Math.round((window.scrollY / scrollableHeight) * 100));
      const milestones = [25, 50, 75, 100];

      milestones.forEach(milestone => {
        if (scrollPercent >= milestone && !scrollMilestonesReached.current.has(milestone)) {
          scrollMilestonesReached.current.add(milestone);
          // Consider making page_section dynamic based on visible content if needed
          trackEvent('scroll_depth', { depth_percentage: milestone, page_section: 'Prompt Techniques Overview' });
        }
      });
    };

    const debouncedScrollHandler = debounce(handleScroll, 250); // Debounce scroll events
    window.addEventListener('scroll', debouncedScrollHandler);

    // Cleanup function to remove the event listener
    return () => window.removeEventListener('scroll', debouncedScrollHandler);
  }, []); // Empty dependency array

  // 3. Track Active Time Spent
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        // If tab becomes hidden, add the time elapsed since it became active
        if (activeTimeStart.current) {
             totalActiveTime.current += Date.now() - activeTimeStart.current;
             activeTimeStart.current = null; // Reset start time
        }
      } else if (document.visibilityState === 'visible') {
        // If tab becomes visible, record the start time
        activeTimeStart.current = Date.now();
      }
    };

    const handleBeforeUnload = () => {
       // If the page is visible when unloading, add the final time segment
      if (document.visibilityState === 'visible' && activeTimeStart.current) {
        totalActiveTime.current += Date.now() - activeTimeStart.current;
      }
      // Send the final event only if some time was actually spent
      if (totalActiveTime.current > 1000) { // Send only if > 1 second
        trackEvent('active_time_spent', {
            duration_seconds: Math.round(totalActiveTime.current / 1000),
            page_section: 'Prompt Techniques Overview' // Adjust section if needed
        });
      }
    };

    // Set initial start time
    if (document.visibilityState === 'visible') {
        activeTimeStart.current = Date.now();
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload); // Track time when closing tab/browser

    // Cleanup function
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      // Send final time if component unmounts while visible (e.g., navigation)
      handleBeforeUnload();
    };
  }, []); // Empty dependency array

  // 4. Track Text Copying
  useEffect(() => {
    const handleCopy = (event) => {
      const selectedText = window.getSelection()?.toString() || '';
      if (selectedText.length > 10) { // Track only if a meaningful amount is copied
        trackEvent('text_copied', {
          page_section: 'Prompt Techniques Overview', // Make dynamic if possible
          content_snippet: selectedText.substring(0, 100) + (selectedText.length > 100 ? '...' : '')
        });
      }
    };

    // Attach listener to the main content area using the ref
    const contentElement = contentRef.current;
    if (contentElement) {
        contentElement.addEventListener('copy', handleCopy);
    }

    // Cleanup function
    return () => {
      if (contentElement) {
        contentElement.removeEventListener('copy', handleCopy);
      }
    };
  }, []); // Empty dependency array
  // --- End Analytics Tracking Effects ---


  // --- SEO Content ---
  const pageTitle = "Prompt Engineering Field Guide: Techniques Compared"; // Make title more specific
  const pageDescription = "A comparative overview and field guide to essential prompt engineering techniques for LLMs, from zero-shot to ReAct, ToT, and GoT."; // Expanded description
  const canonicalUrl = "https://www.forgemission.com/knowledge/prompt-engineering-field-guide"; // Ensure this is the correct final URL
  const imageUrl = "https://www.forgemission.com/images/og-prompt-engineering-guide.jpg"; // Use a specific OG image if possible
  const publicationDate = "2025-05-05T10:00:00Z"; // Adjust date
  const modifiedDate = "2025-05-06T11:30:00Z"; // Add modified date if applicable

  // --- JSON-LD Structured Data (Improved) ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle", // More specific type
    "headline": pageTitle,
    "description": pageDescription,
    "image": imageUrl,
    "datePublished": publicationDate,
    "dateModified": modifiedDate, // Add modified date
    "author": {
        "@type": "Organization",
        "name": "ForgeMission", // Replace if needed
        "url": "https://www.forgemission.com" // Add organization URL
    },
    "publisher": {
        "@type": "Organization", // Use Organization type consistently
        "name": "ForgeMission", // Replace if needed
        "logo": {
            "@type": "ImageObject",
            "url": "https://www.forgemission.com/images/logo.png" // Replace if needed
        }
    },
    "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": canonicalUrl
    },
    "keywords": "prompt engineering, large language models, llm, zero-shot, few-shot, chain-of-thought, react prompting, tree of thoughts, graph of thoughts, ai prompting techniques" // Add relevant keywords
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
          type: 'article', // Use 'article' for blog posts/guides
          url: canonicalUrl,
          title: pageTitle,
          description: pageDescription,
          images: [
            {
              url: imageUrl, // Ensure this image is optimized for OG (e.g., 1200x630)
              width: 1200, // Specify dimensions if known
              height: 630,
              alt: pageTitle,
            },
          ],
          article: { // Add article specific OG tags
            publishedTime: publicationDate,
            modifiedTime: modifiedDate,
            // section: 'Artificial Intelligence', // Optional section
            authors: [
              'https://www.forgemission.com', // Link to author profile or org page
            ],
            tags: ['Prompt Engineering', 'LLM', 'AI Strategy', 'Artificial Intelligence'], // Add relevant tags
          },
        }}
        twitter={{
          cardType: 'summary_large_image',
          // site: '@YourTwitterHandle', // Optional: Add Twitter handle
          handle: '@YourTwitterHandle', // Optional: Add Twitter handle
          // title, description, image are often inherited from openGraph, but can be specified
        }}
      />
      <Head>
        {/* Standard Head elements */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Add JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          key="article-jsonld" // Add a key for React reconciliation
        />
        {/* Add other meta tags if needed (e.g., theme-color) */}
      </Head>
      {/* --- End SEO Components --- */}


      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <Header /> {/* Ensure Header/Footer support dark mode */}

        {/* Use the ref here for copy tracking */}
        <main ref={contentRef} className="flex-grow px-4 sm:px-6 py-12 max-w-4xl mx-auto w-full">
          {/* Back Link */}
          <div className="mb-8">
            <Link href="/knowledge-base" className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Knowledge Base
            </Link>
          </div>

          {/* --- Intro Section 1 --- */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8 mb-12 animate-fadeIn border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-2" aria-hidden="true">📌</span>
              <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                Insight
              </span>
            </div>
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Prompt Engineering: The New Power Skill No One Told You About
            </h1>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              You’ve heard the buzzwords—ChatGPT, generative AI, large language models. Maybe you’ve even seen some slick demos. But here’s what most of the hype skips over: the real magic doesn’t come from the model—it comes from <strong>the prompt</strong>.
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              That’s right. In this new AI era, it’s not just what the machine can do, it’s how well <em>you</em> can ask it to do it. This is the quiet revolution happening behind the scenes: <strong>prompt engineering</strong>, a deceptively simple yet profoundly strategic practice that’s starting to separate AI dabblers from those actually driving results.
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              We're not talking about tweaking code or training models. We’re talking about crafting precise, structured language that coaxes the best out of probabilistic systems—systems that think in tokens and patterns, not logic and loops. This is less like programming and more like negotiating with a highly trained expert who speaks fluent probability and metaphor. Get it right, and you can summarize complex documents, generate compelling marketing copy, debug code, or even simulate strategic decisions. Get it wrong, and you'll be drowning in plausible nonsense.
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              Sound abstract? It is—until you understand how it really works.
            </p>
            <p className="text-gray-700 dark:text-gray-300 font-medium">
              In this post, we’ll pull back the curtain on what prompt engineering actually involves, why it matters, and how business and technical leaders alike can start building intuition around this essential skill. If you're serious about leveraging AI beyond the surface-level gimmicks, keep reading.
            </p>
          </div>
          {/* --- End Intro Section 1 --- */}


          {/* --- Intro Section 2 --- */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl shadow-inner p-6 sm:p-8 mb-12 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
              Think You Know Prompts? Think Again.
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              If you believe prompt engineering is just about asking better questions, this report will change your mind—and maybe your roadmap.
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              Behind every impressive AI demo lies a hidden layer of strategy: <strong>the prompt</strong>. And while most conversations stop at “just tell the AI what you want,” the truth is far more nuanced—and far more powerful. This isn’t just about clever phrasing. It’s about mastering a new interface between human intention and machine behavior.
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              In this report, we break down the full landscape of prompt engineering for large language models (LLMs), from foundational tricks to bleeding-edge reasoning frameworks. We’ll start with the basics—<strong>zero-shot</strong>, <strong>few-shot</strong>, <strong>role prompting</strong>—and quickly move into the sophisticated methods that drive real performance: <strong>Chain-of-Thought</strong>, <strong>ReAct</strong>, <strong>Tree of Thoughts</strong>, <strong>Graph of Thoughts</strong>, and more.
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              You'll get a side-by-side comparison of techniques based on effectiveness, complexity, and cost, along with practical guidance on tailoring prompts for different LLM types—whether you're working with <strong>GPT-4o</strong>, <strong>Claude 3</strong>, <strong>Llama 3</strong>, <strong>Gemini</strong>, or <strong>Mistral</strong>. We also cover how factors like model size, tuning style, and architecture affect what works—and what fails.
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              From <strong>multilingual prompts</strong> to <strong>managing ambiguity</strong>, from <strong>prompt length</strong> to <strong>iterative refinement</strong>, from <strong>implementation patterns</strong> to <strong>performance evaluation metrics</strong>, this report goes deep. And we don’t shy away from the tough stuff either: ethical dilemmas, emerging risks, and the foggy future of prompt-native systems.
            </p>
            <p className="text-gray-700 dark:text-gray-300 font-medium">
              If you're building with LLMs—or planning to—you’ll want this knowledge in your toolkit. <strong>This is your field guide to prompt engineering:</strong> strategic, technical, and designed to separate serious practitioners from weekend tinkerers.
            </p>
          </div>
           {/* --- End Intro Section 2 --- */}


          {/* --- Accordion Section --- */}
          <div className="space-y-4 mb-12">
            {[
              { key: "zero", title: "Zero-Shot Prompting: The No-Frills, High-Stakes First Move", content: (<> <p> Zero-shot prompting is the LLM equivalent of throwing it in the deep end and seeing if it swims. No examples, no training wheels—just a clear instruction and the model’s raw, pre-trained intelligence to get the job done. </p> <p> <strong>Think:</strong><br /> “Translate this sentence to French: Hello, world!”<br /> “Summarize this article: [insert text here]” </p> <p> You’re not teaching the model how to do the task—you’re trusting that it’s already seen enough to figure it out. And with today’s top-tier models (think GPT-4o, Claude 3), that’s often a pretty safe bet—for the right kind of tasks. </p> <p> <strong>Why it works:</strong> It’s dead simple. Fast. Cheap. There’s no setup, no example crafting, no extra tokens bloating your cost. For tasks that fall squarely within what the model was trained on—summarization, basic Q&A, straightforward text generation—it often just works. Instruction tuning and RLHF have only made this better, turning LLMs into surprisingly capable zero-shot performers. </p> <p> <strong>But here’s the catch:</strong> Without examples, you're flying without a net. The model might misunderstand your intent, ignore your formatting request, or just hallucinate something confidently wrong. For complex reasoning or highly structured outputs, performance can drop fast. You’re not in the driver’s seat—you’re more like a passenger giving verbal directions to a very polite but unpredictable assistant. </p> <div> <strong>When to use it:</strong> <ul className="list-disc pl-6 mt-2 space-y-1"> <li>General knowledge lookups</li> <li>Basic content generation</li> <li>Quick-and-dirty summaries</li> <li>Simple classification tasks</li> </ul> </div> <p> In short: zero-shot is your go-to for speed and simplicity—but don’t mistake it for precision engineering. It’s a powerful tool if you know when to use it—and when to bring in something smarter. </p> </>) },
              { key: "few", title: "Few-Shot Prompting: Show, Don’t Just Tell", content: (<> <p> If zero-shot is a blind trust fall, few-shot prompting gives the model a hint—or three. Instead of just issuing a command, you show the model what you want by including a few carefully chosen examples in your prompt. Think of it as setting the vibe before asking for a performance. </p> <p> <strong>Example:</strong><br /> “Translate to French:<br /> Hello, world! → Bonjour le monde!<br /> How are you? → Comment ça va?<br /> Good night → [??]” </p> <p> Now the model isn’t guessing your intent—it’s pattern matching. You’re priming it with structure, tone, and style, so it knows not just what to do, but <em>how</em> to do it. </p> <p> <strong>Why it works:</strong> LLMs are masters of pattern recognition. A few well-placed examples can dramatically boost performance, especially for tasks that aren’t obvious from a standalone instruction. Few-shot prompting makes things like tone matching, formatting, or domain-specific nuance easier to lock in—without modifying the model or writing a line of code. </p> <p> <strong>What to watch out for:</strong> Those extra examples don’t come free. Each one eats up precious tokens—especially problematic for longer inputs or smaller context windows. And if your examples are inconsistent, unclear, or irrelevant, they’ll just confuse the model. Garbage in, garbage out. </p> <div> <strong>Best for:</strong> <ul className="list-disc pl-6 mt-2 space-y-1"> <li>Custom tone/style generation</li> <li>Structured outputs with specific formatting</li> <li>Domain-specific tasks (e.g., legal text classification)</li> <li>Bootstrapping behavior when zero-shot falls flat</li> </ul> </div> <p> Few-shot prompting is like giving your AI intern a few sample reports before asking for the next one. If you care about quality, it’s often well worth the investment. </p> </>) },
              { key: "role", title: "Role Prompting: Cast the LLM, Then Let It Perform", content: (<> <p> Sometimes, the fastest way to get the right output is to assign the model a role—literally. Role prompting primes the LLM by telling it who it is supposed to be before asking it to perform a task. </p> <p> <strong>Example:</strong><br /> “You are a world-class cybersecurity analyst. Given the following log file, identify any signs of a breach.”<br /> “Act as a startup pitch coach. Rewrite this elevator pitch to appeal to investors.” </p> <p> <strong>Why it works:</strong> Large language models are trained on oceans of role-specific content—emails from lawyers, advice from therapists, answers from teachers, feedback from editors. When you set a role, you immediately narrow the model’s behavioral space, activating relevant tone, style, and domain-specific reasoning patterns. It’s a subtle way to raise the floor and the ceiling of performance—no extra logic or training required. </p> <p> <strong>What to watch out for:</strong> Roles work best when they’re believable, specific, and aligned with the task. Go too vague (“act professional”) or overly abstract, and the model may flounder. Also, stacking too many roles can cause confusion or dilute the effect. </p> <div> <strong>Best for:</strong> <ul className="list-disc pl-6 mt-2 space-y-1"> <li>Domain adaptation (e.g., legal, medical, marketing)</li> <li>Consistent tone/style generation</li> <li>Guiding the model toward best practices or frameworks</li> <li>Teaching the model how to frame an answer before generating it</li> </ul> </div> <p> Role prompting doesn’t just ask the model to perform—it casts it in the right mindset. Treat it like method acting for LLMs, and you’ll get better results with less effort. </p> </>) },
              { key: "structured", title: "Structured Prompting: Set the Format, Shape the Output", content: (<> <p> Want consistent, clean, parseable results from your LLM? Then you need structured prompting—the art of specifying the format before the model starts talking. </p> <p> <strong>Example:</strong><br /> “Respond in the following JSON format:<br /> {'{ "summary": "...", "sentiment": "positive/neutral/negative", "keywords": ["..."] }'}<br /> “Provide your answer in bullet points, grouped under ‘Pros’, ‘Cons’, and ‘Next Steps’.” </p> <p> <strong>Why it works:</strong> LLMs are flexible—but without structure, they tend to improvise. And that’s fine for storytelling, but terrible for downstream use, automation, or analysis. Structured prompting constrains the output shape, helping with reliability, consistency, and machine-readability. It’s essential for integrating LLMs into real-world workflows and pipelines. </p> <p> <strong>What to watch out for:</strong> The model isn’t a strict parser—it follows structure approximately. Complex schemas may still require post-processing or validation. Also, overly rigid prompts can sometimes reduce creativity or cause the model to freeze if it’s unsure how to fill a field. </p> <div> <strong>Best for:</strong> <ul className="list-disc pl-6 mt-2 space-y-1"> <li>API-ready output (e.g., JSON, tables, YAML)</li> <li>Business reports, summaries, templates</li> <li>Workflow integration (e.g., Zapier, LangChain, custom apps)</li> <li>Making LLMs play nicely with code and other tools</li> </ul> </div> <p> Structured prompting is the difference between “chatbot” and toolchain component. If you want your AI to fit into a system, not just give an answer, structure is non-negotiable. </p> </>) },
              { key: "cot", title: "Chain-of-Thought Prompting: Make It Think, Step by Step", content: (<> <p> Want your LLM to reason instead of guess? Don’t just ask for the answer—ask it to think. That’s the core idea behind Chain-of-Thought (CoT) prompting: instead of jumping straight to the final output, you guide the model to show its work—just like a student solving a math problem. </p> <p> <strong>Example:</strong><br /> “Q: If a train leaves at 2 PM going 60 mph and another at 3 PM going 90 mph, when will they meet?<br /> A: Let’s think step by step…” </p> <p> <strong>Why it works:</strong> LLMs aren’t calculators—they’re token predictors. But when prompted to generate intermediate steps, they’re better able to avoid logic gaps and hallucinations. CoT gives you a window into the model’s “thinking process” and often leads to more reliable conclusions. </p> <p> <strong>What to watch out for:</strong> CoT adds length—both in prompt and output. That means more tokens, higher cost, and potential context limits. And if the model gets off track mid-thought? The final answer will still sound confident… and still be wrong. </p> <div> <strong>Best for:</strong> <ul className="list-disc pl-6 mt-2 space-y-1"> <li>Math and logic problems</li> <li>Multi-step reasoning tasks</li> <li>Any complex decision-making that requires traceability</li> <li>Situations where explainability matters (audits, compliance, etc.)</li> </ul> </div> <p> CoT is your prompt’s version of slow is smooth, smooth is fast. It’s not just about getting the answer—it’s about why the answer makes sense. And in business, that’s often what separates automation from actual intelligence. </p> </>) },
              { key: "selfConsistency", title: "Self-Consistency: Ask Again, Smarter", content: (<> <p> Chain-of-Thought helps models reason. But what if they reason differently every time? That’s where Self-Consistency comes in. It embraces the probabilistic nature of LLMs—rather than fearing variability, it uses it as a strength. </p> <p> <strong>How it works:</strong> You run the same CoT prompt multiple times, let the model generate several different reasoning paths, and then aggregate the answers—usually by voting or frequency. It’s like getting five smart consultants in a room, letting them think independently, and then going with the most common solution. </p> <p> <strong>Why it works:</strong> LLMs often produce better answers when “thinking out loud”—but they don’t always arrive at the same conclusion. By generating multiple diverse outputs and filtering for consensus, you reduce the risk of flukes and hallucinations. It’s statistical grounding meets structured thinking. </p> <p> <strong>What to watch out for:</strong> Self-Consistency isn’t fast. You’re paying for multiple completions and then post-processing the result. It’s ideal when accuracy is worth the wait—but overkill for quick-turn tasks or low-stakes outputs. </p> <div> <strong>Best for:</strong> <ul className="list-disc pl-6 mt-2 space-y-1"> <li>High-stakes decision support</li> <li>Complex reasoning (math, analysis, structured logic)</li> <li>Scenarios where reliability &gt speed</li> <li>Building confidence in model responses</li> </ul> </div> <p> If CoT makes your LLM think, Self-Consistency makes it double-check itself—a powerful combination when precision matters. </p> </>) },
              { key: "gkp", title: "Generated Knowledge Prompting: Teach the Model Before You Ask", content: (<> <p> What if your LLM doesn’t quite have the answer—but could find it, if it just knew a little more? Enter Generated Knowledge Prompting (GKP): a strategy where you first have the model generate relevant background information, and then use that as part of the actual prompt to complete the task. </p> <p> <strong>Example flow:</strong><br /> Prompt: “Explain what the concept of zero trust architecture means in cybersecurity.”<br /> Use that explanation as part of the context for a follow-up task:<br /> “Now, using that background, assess the strengths and weaknesses of a zero trust implementation in a financial services environment.” </p> <p> <strong>Why it works:</strong> Even the best LLMs can flounder if the original prompt assumes too much. By explicitly generating foundational knowledge first—either manually or through prompt chaining—you reduce the cognitive load on the model during the main task. This is especially powerful when tackling niche, emerging, or complex domains that the model wasn’t deeply trained on. </p> <p> <strong>What to watch out for:</strong> Generated knowledge is only as good as the prompt that created it. Hallucinations and inaccuracies can creep in, especially when dealing with facts or sensitive domains. You’ll want to include validation, retrieval augmentation, or human-in-the-loop checks when precision matters. </p> <div> <strong>Best for:</strong> <ul className="list-disc pl-6 mt-2 space-y-1"> <li>Multi-step analysis where foundational context is missing</li> <li>Domain-specific tasks (e.g., legal, technical, financial)</li> <li>Prompt chains that build reasoning layer by layer</li> <li>Teams using LLMs to scale knowledge work across unfamiliar areas</li> </ul> </div> <p> Generated Knowledge Prompting flips the script: instead of assuming the model knows, you make it learn first—on demand, in-context, and purpose-built for the job ahead. </p> </>) },
              { key: "react", title: "ReAct: Reasoning Meets Action", content: (<> <p> ReAct (short for Reasoning + Acting) turns your LLM from a passive generator into a decision-making agent that can both think through a problem and take steps toward solving it—like searching the web, querying tools, or consulting external data sources mid-prompt. </p> <p> <strong>Example:</strong><br /> “Let’s think step by step.”<br /> [Reasoning…]<br /> “I should look this up.”<br /> [Searches…]<br /> [Continues reasoning with new info] </p> <p> <strong>Why it works:</strong> Pure reasoning is limited by what the model already knows. ReAct blends thinking with doing. It allows the model to iteratively reason, take an action, observe the result, and continue—all within one prompt loop. This mirrors how humans solve problems: research, assess, refine. </p> <p> <strong>What to watch out for:</strong> ReAct requires an agentic framework—the model alone can’t take external actions. You need infrastructure (like LangChain, OpenAI function calling, or custom tools) to make this work. Also, ReAct can get expensive fast, since it chains multiple steps with external calls. </p> <div> <strong>Best for:</strong> <ul className="list-disc pl-6 mt-2 space-y-1"> <li>Retrieval-augmented generation (RAG)</li> <li>Real-time decision support</li> <li>Research agents, task automation</li> <li>Complex problem solving that requires fresh data or tool use</li> </ul> </div> <p> ReAct isn’t just prompt engineering—it’s system design. When you want your AI to think and act with purpose, this is your go-to strategy. </p> </>) },
              { key: "tot", title: "Tree of Thoughts (ToT): Strategic Reasoning at Scale", content: (<> <p> Tree of Thoughts (ToT) adds strategy to Chain-of-Thought reasoning. Instead of one path from question to answer, ToT generates multiple branches of reasoning, explores them in parallel, and selects the best outcome based on defined criteria. </p> <p> <strong>Why it works:</strong> Complex problems rarely have a single solution path. ToT embraces that by exploring multiple options, backtracking if needed, and using search-like algorithms to score and compare outcomes. It brings planning and evaluation into the reasoning process—something standard prompts can’t do. </p> <p> <strong>What to watch out for:</strong> ToT is powerful but compute-intensive. You’ll need orchestration logic (again, think LangChain-style frameworks), evaluation functions, and smart stopping rules. It’s best suited for advanced use cases where brute-force prompting just isn’t enough. </p> <div> <strong>Best for:</strong> <ul className="list-disc pl-6 mt-2 space-y-1"> <li>Creative problem solving</li> <li>Strategic planning and optimization</li> <li>Multi-step logic tasks with branching outcomes</li> <li>Scenarios where exploration beats immediacy</li> </ul> </div> <p> Tree of Thoughts turns your prompt into a multi-path search tree—the difference between a hunch and a plan. </p> </>) },
              { key: "got", title: "Graph of Thoughts (GoT): Reasoning Without Limits", content: (<> <p> Graph of Thoughts (GoT) breaks the mold of structured reasoning. Instead of a fixed tree with branches, GoT allows nodes of reasoning to connect in any direction—forward, backward, sideways. It models thinking as a flexible, dynamic graph. </p> <p> <strong>Why it works:</strong> Real-world reasoning isn’t linear. It loops, revisits, merges, diverges. GoT captures this by allowing arbitrary relationships between “thoughts,” enabling LLMs to work more like a network of ideas than a single path. It’s ideal for tasks requiring creativity, iteration, and lateral thinking. </p> <p> <strong>What to watch out for:</strong> GoT is bleeding-edge. It requires a strong scaffolding system and careful orchestration of how thoughts (nodes) are evaluated and connected. It’s not something you run as a simple prompt—it’s a full reasoning architecture. </p> <div> <strong>Best for:</strong> <ul className="list-disc pl-6 mt-2 space-y-1"> <li>Creative generation (stories, designs, innovations)</li> <li>Complex planning with many interdependencies</li> <li>Knowledge synthesis and mapping</li> <li>Any use case that benefits from non-linear thought</li> </ul> </div> <p> Graph of Thoughts isn’t just next-gen prompting—it’s prompt-native cognition. This is where prompt engineering begins to look like actual thinking. </p> </>) },
            ].map((item) => (
              <div key={item.key} className="border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
                <button
                  className="w-full text-left px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => toggleAccordion(item.key)}
                  aria-expanded={openAccordion === item.key}
                  aria-controls={`accordion-content-${item.key}`}
                >
                  <span className="text-base font-semibold text-gray-800 dark:text-gray-100">
                    {item.title}
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-300 ${openAccordion === item.key ? "rotate-180" : ""}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.08 1.04l-4.25 4.66a.75.75 0 01-1.08 0L5.25 8.27a.75.75 0 01-.02-1.06z" clipRule="evenodd" />
                  </svg>
                </button>
                {openAccordion === item.key && (
                  <div
                    id={`accordion-content-${item.key}`}
                    className="px-4 pb-4 pt-2 text-sm text-gray-700 dark:text-gray-300 space-y-3 border-t border-gray-200 dark:border-gray-700"
                  >
                    {item.content}
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* --- End Accordion Section --- */}


          {/* --- Comparison Table --- */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-6 text-center">
            Prompt Engineering Techniques: Comparative Analysis
          </h2>
          <div className="overflow-x-auto shadow-md rounded-lg mb-12">
            <table className="w-full border-collapse text-sm md:text-base bg-white dark:bg-gray-800">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="border dark:border-gray-600 px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">Technique</th>
                  <th className="border dark:border-gray-600 px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">Effectiveness</th>
                  <th className="border dark:border-gray-600 px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">Complexity</th>
                  <th className="border dark:border-gray-600 px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">Cost</th>
                  <th className="border dark:border-gray-600 px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">Best Use Cases</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {[
                  { name: "Zero-shot", effectiveness: "⚪ Medium", complexity: "🟢 Very low", cost: "🟢 Minimal", useCases: "General tasks, prototyping, low-stakes queries" },
                  { name: "Few-shot", effectiveness: "🟡 Higher for nuanced tasks", complexity: "🟡 Medium", cost: "🟡 Moderate", useCases: "Classification, formatting, style transfer" },
                  { name: "Role Prompting", effectiveness: "🟢 High", complexity: "🟢 Low", cost: "🟢 Minimal", useCases: "Domain adaptation, tone/style control" },
                  { name: "Structured Prompting", effectiveness: "🟢 High", complexity: "🟡 Medium", cost: "🟢 Minimal–Moderate", useCases: "APIs, workflows, system integration" },
                  { name: "Chain-of-Thought (CoT)", effectiveness: "🟢 High", complexity: "🟡 Medium", cost: "🟡 Moderate", useCases: "Logic, stepwise math, complex Q&A" },
                  { name: "Self-Consistency (CoT++)", effectiveness: "🟢 Very high", complexity: "🔴 High", cost: "🔴 High", useCases: "Research, complex analysis" },
                  { name: "Generated Knowledge", effectiveness: "🟢 High", complexity: "🟡 Medium–High", cost: "🟡 Moderate–High", useCases: "Knowledge work, onboarding LLMs" },
                  { name: "ReAct", effectiveness: "🟢 Very high", complexity: "🔴 High", cost: "🔴 High", useCases: "Agents, workflows, decision support" },
                  { name: "Tree of Thoughts (ToT)", effectiveness: "🟢 Very high", complexity: "🔴 High", cost: "🔴 High", useCases: "Optimization, planning" },
                  { name: "Graph of Thoughts (GoT)", effectiveness: "🟢 Experimental but promising", complexity: "🔴 Very high", cost: "🔴 Very high", useCases: "Creative generation, ideation" },
                ].map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="border dark:border-gray-600 px-4 py-3 font-medium text-gray-900 dark:text-gray-100">{item.name}</td>
                    <td className="border dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300">{item.effectiveness}</td>
                    <td className="border dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300">{item.complexity}</td>
                    <td className="border dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300">{item.cost}</td>
                    <td className="border dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300">{item.useCases}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mb-12 text-gray-600 dark:text-gray-400 text-xs text-center">
            <p>🟢 = Advantage &nbsp; 🟡 = Trade-off &nbsp; 🔴 = Cost/Complexity Flag</p>
          </div>
          {/* --- End Comparison Table --- */}


          {/* --- Call to Action / Next Section Prompt --- */}
          <div className="mt-12 pt-6 flex justify-center items-center text-center">
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Want to go deeper? Continue for implementation strategies and real-world examples.
            </p>
          </div>
          {/* --- End Call to Action --- */}


          {/* --- Navigation Buttons Container --- */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-center items-center">
            <div>
              {/* Conditional Next/Login Button */}
              <button
                onClick={handleConditionalClick}
                disabled={status === 'loading'}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
              >
                {buttonText}
                {status === 'authenticated' && (
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
