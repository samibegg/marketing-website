// pages/ai-cost-estimator.js
import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { NextSeo } from 'next-seo'; // Import NextSeo

import Header from '@/components/Header'; // Adjust path if needed
import Footer from '@/components/Footer'; // Adjust path if needed
import { ChevronDown, ChevronUp, Info, Sun, Moon, ExternalLink } from 'lucide-react';

// --- Analytics Helper Functions ---
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
// --- End Analytics Helpers ---


// --- Sample Data for Dropdowns ---
// (Keep the sample data arrays: llmOptions, vectorDbOptions, etc. as defined in the previous version)
const llmOptions = [
  { id: 'openai_gpt4_turbo', provider: 'OpenAI', model: 'GPT-4 Turbo', type: 'managed', inputCostMTok: 10.00, outputCostMTok: 30.00, notes: 'Context window: 128k' },
  { id: 'openai_gpt35_turbo', provider: 'OpenAI', model: 'GPT-3.5 Turbo', type: 'managed', inputCostMTok: 0.50, outputCostMTok: 1.50, notes: 'Context window: 16k' },
  { id: 'anthropic_claude3_opus', provider: 'Anthropic', model: 'Claude 3 Opus', type: 'managed', inputCostMTok: 15.00, outputCostMTok: 75.00, notes: 'Context window: 200k' },
  { id: 'anthropic_claude3_sonnet', provider: 'Anthropic', model: 'Claude 3 Sonnet', type: 'managed', inputCostMTok: 3.00, outputCostMTok: 15.00, notes: 'Context window: 200k' },
  { id: 'google_gemini_15_pro', provider: 'Google', model: 'Gemini 1.5 Pro', type: 'managed', inputCostMTok: 7.00, outputCostMTok: 21.00, notes: 'Context window: 1M' },
  { id: 'meta_llama3_70b', provider: 'Self-Hosted', model: 'Llama 3 70B', type: 'self-hosted', inputCostMTok: 0, outputCostMTok: 0, notes: 'Requires significant infrastructure' },
  { id: 'mistral_large', provider: 'Mistral/Managed', model: 'Mistral Large', type: 'managed', inputCostMTok: 8.00, outputCostMTok: 24.00, notes: 'Also available self-hosted' },
  { id: 'custom_self_hosted', provider: 'Self-Hosted', model: 'Custom/Other', type: 'self-hosted', inputCostMTok: 0, outputCostMTok: 0, notes: 'Enter costs manually' },
];
const vectorDbOptions = [
    { id: 'pinecone_serverless', name: 'Pinecone Serverless', type: 'saas', costModel: 'Usage-based', notes: 'Scales automatically' },
    { id: 'weaviate_cloud', name: 'Weaviate Cloud', type: 'saas', costModel: 'Tiered/Usage', notes: 'Managed Weaviate service' },
    { id: 'qdrant_cloud', name: 'Qdrant Cloud', type: 'saas', costModel: 'Tiered', notes: 'Managed Qdrant service' },
    { id: 'chromadb_self', name: 'ChromaDB (Self-Hosted)', type: 'self-hosted', costModel: 'Infrastructure', notes: 'Requires setup and maintenance' },
    { id: 'qdrant_self', name: 'Qdrant (Self-Hosted)', type: 'self-hosted', costModel: 'Infrastructure', notes: 'Requires setup and maintenance' },
    { id: 'other_self', name: 'Other (Self-Hosted)', type: 'self-hosted', costModel: 'Infrastructure', notes: 'Enter costs manually' },
];
const embeddingOptions = [
    { id: 'openai_ada_002', name: 'OpenAI text-embedding-ada-002', type: 'saas', costModel: '$0.10 / 1M Tokens', notes: '1536 dimensions' },
    { id: 'openai_3_small', name: 'OpenAI text-embedding-3-small', type: 'saas', costModel: '$0.02 / 1M Tokens', notes: '1536 dimensions' },
    { id: 'openai_3_large', name: 'OpenAI text-embedding-3-large', type: 'saas', costModel: '$0.13 / 1M Tokens', notes: '3072 dimensions' },
    { id: 'cohere_embed_v3', name: 'Cohere Embed v3.0', type: 'saas', costModel: '$0.10 / 1M Tokens', notes: 'English/Multilingual options' },
    { id: 'google_gecko', name: 'Google textembedding-gecko', type: 'saas', costModel: '$0.10 / 1M Tokens', notes: 'Part of Vertex AI' },
    { id: 'hf_sentence_transformers', name: 'Self-Hosted (SentenceTransformers)', type: 'self-hosted', costModel: 'Infrastructure', notes: 'e.g., all-MiniLM-L6-v2' },
    { id: 'other_self', name: 'Other (Self-Hosted)', type: 'self-hosted', costModel: 'Infrastructure', notes: 'Enter costs manually' },
];
const rerankingOptions = [
    { id: 'cohere_rerank', name: 'Cohere Rerank', type: 'saas', costModel: 'Usage-based', notes: 'Cost per 1k searches' },
    { id: 'voyage_rerank', name: 'Voyage Rerank', type: 'saas', costModel: 'Usage-based', notes: 'Cost per 1M tokens' },
    { id: 'self_hosted_rerank', name: 'Self-Hosted Reranker', type: 'self-hosted', costModel: 'Infrastructure', notes: 'Enter cost manually' },
    { id: 'none', name: 'None', type: 'none', costModel: 'N/A', notes: 'No reranking used' },
];
const orchestrationOptions = [
    { id: 'langsmith', name: 'LangSmith/Langchain Cloud', type: 'saas', costModel: 'Tiered/Usage', notes: 'Monitoring & Debugging focus' },
    { id: 'custom_self_hosted', name: 'Self-Hosted Framework', type: 'self-hosted', costModel: 'Infrastructure', notes: 'Using Langchain/LlamaIndex libs directly' },
    { id: 'none', name: 'None / Direct Calls', type: 'none', costModel: 'N/A', notes: 'Simple direct API calls' },
];
const dataUpdateFrequencyOptions = [
    { id: 'hourly', name: 'Hourly' }, { id: 'daily', name: 'Daily' }, { id: 'weekly', name: 'Weekly' },
    { id: 'monthly', name: 'Monthly' }, { id: 'quarterly', name: 'Quarterly' }, { id: 'infrequent', name: 'Infrequently / Manually' },
];
const cloudProviderOptions = [
    { id: 'aws', name: 'AWS (Amazon Web Services)' },
    { id: 'gcp', name: 'GCP (Google Cloud Platform)' },
    { id: 'azure', name: 'Microsoft Azure' },
    { id: 'other', name: 'Other / Multi-Cloud / On-Prem' },
];
const calculatorLinks = {
    dataPipeline: { aws: '...', gcp: '...', azure: '...', other: null },
    infra: { aws: '...', gcp: '...', azure: '...', other: null },
    monitoring: { aws: '...', gcp: '...', azure: '...', other: null }
};
// --- End Sample Data ---


// --- Helper Components ---
const AccordionSection = ({ title, id, children, isOpen, onToggle }) => {
    const handleToggle = () => {
        onToggle(id);
        // Track accordion toggle event
        trackEvent('accordion_toggle', {
            section_id: id,
            section_title: title,
            is_open: !isOpen // The new state after toggle
        });
    };
    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg mb-4 overflow-hidden shadow-sm bg-white dark:bg-gray-800">
          <button onClick={handleToggle} className="w-full flex justify-between items-center p-4 text-left text-lg font-medium text-gray-800 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out" aria-expanded={isOpen} aria-controls={`content-${id}`}>
            <span>{title}</span>
            {isOpen ? <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />}
          </button>
          <div id={`content-${id}`} className={`overflow-hidden transition-all duration-300 ease-in-out ${ isOpen ? 'max-h-[1500px] opacity-100' : 'max-h-0 opacity-0' }`}>
            <div className="p-5 border-t border-gray-200 dark:border-gray-700">{children}</div>
          </div>
        </div>
      );
};

const InputField = ({ label, type = 'number', id, name, value, onChange, placeholder, step = "0.01", min = "0", helpText, disabled = false }) => (
    <div className="mb-4">
        <label htmlFor={id || name} className={`block text-sm font-medium mb-1 ${disabled ? 'text-gray-400 dark:text-gray-500' : 'text-gray-700 dark:text-gray-300'}`}>{label}</label>
        <input
            type={type}
            id={id || name}
            name={name}
            value={value}
            onChange={onChange} // onChange handler passed from parent will trigger analytics
            placeholder={placeholder}
            step={step}
            min={min}
            disabled={disabled}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm ${disabled ? 'bg-gray-100 dark:bg-gray-700 cursor-not-allowed text-gray-500 dark:text-gray-400' : 'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100'}`}
        />
        {helpText && <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 flex items-center"><Info size={12} className="mr-1 inline"/> {helpText}</p>}
    </div>
);

const SelectField = ({ label, id, name, value, onChange, options, placeholder, helpText, disabled = false }) => (
    <div className="mb-4">
        <label htmlFor={id || name} className={`block text-sm font-medium mb-1 ${disabled ? 'text-gray-400 dark:text-gray-500' : 'text-gray-700 dark:text-gray-300'}`}>{label}</label>
        <select
            id={id || name}
            name={name}
            value={value}
            onChange={onChange} // onChange handler passed from parent will trigger analytics
            disabled={disabled}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm ${disabled ? 'bg-gray-100 dark:bg-gray-700 cursor-not-allowed text-gray-500 dark:text-gray-400' : 'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100'}`}
        >
            {placeholder && <option value="" disabled>{placeholder}</option>}
            {options.map((option) => (
                <option key={option.id || option.value} value={option.id || option.value}>
                    {option.name || option.model || option.label}
                </option>
            ))}
        </select>
        {helpText && <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 flex items-center"><Info size={12} className="mr-1 inline"/> {helpText}</p>}
    </div>
);

const DarkModeToggle = ({ darkMode, toggleDarkMode }) => {
    const handleToggle = () => {
        toggleDarkMode();
        // Track dark mode toggle
        trackEvent('dark_mode_toggle', { enabled: !darkMode });
    };
    return (
        <button
            onClick={handleToggle}
            className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    );
};
// --- End Helper Components ---


// --- Main Estimator Page Component ---
const AICostEstimatorPage = () => {
  // --- State ---
  const [openSections, setOpenSections] = useState({ llm: true, rag: false, agentic: false, dataPipeline: false, infra: false, monitoring: false, scaling: false });
  const [darkMode, setDarkMode] = useState(true);
  const [config, setConfig] = useState({ /* ... initial config state ... */
    llm: { type: 'managed', selectedOptionId: llmOptions[0].id, costPerTokenInput: llmOptions[0].inputCostMTok, costPerTokenOutput: llmOptions[0].outputCostMTok, infraCost: '', foundationModelCost: '' },
    rag: { enabled: false, vectorDbOptionId: vectorDbOptions[0].id, embeddingOptionId: embeddingOptions[0].id, rerankingOptionId: rerankingOptions.find(o => o.id === 'none').id, vectorDbCost: '', embeddingCost: '', rerankingCost: '' },
    agentic: { enabled: false, orchestrationOptionId: orchestrationOptions.find(o => o.id === 'none').id, orchestrationCost: '' },
    dataPipeline: { providerId: cloudProviderOptions[0].id, storageCost: '', etlCost: '', preprocessCost: '' },
    infra: { providerId: cloudProviderOptions[0].id, hostingCost: '', apiGatewayCost: '', networkCost: '' },
    monitoring: { providerId: cloudProviderOptions[0].id, loggingCost: '', metricsCost: '', tracingCost: '' },
    scaling: { requestsPerMonth: '100000', avgTokensPerRequest: '500', dataVolumeGB: '10', updateFrequencyId: dataUpdateFrequencyOptions.find(o => o.id === 'monthly').id },
   });
  const [estimatedCost, setEstimatedCost] = useState(null);

  // --- Refs for Analytics ---
  const scrollMilestonesReached = useRef(new Set());
  const activeTimeStart = useRef(null);
  const totalActiveTime = useRef(0);
  const contentRef = useRef(null); // Ref for main content area (optional for copy tracking)

  // --- Effects ---
  // Dark Mode
  useEffect(() => {
    if (darkMode) { document.documentElement.classList.add('dark'); }
    else { document.documentElement.classList.remove('dark'); }
  }, [darkMode]);

  // --- Analytics Tracking Effects ---
  // 1. Track initial page view
  useEffect(() => {
    trackEvent('page_view', { page_title: 'AI Cost Estimator' });
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
          trackEvent('scroll_depth', { page_title: 'AI Cost Estimator', depth_percentage: milestone });
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
        if (activeTimeStart.current) { totalActiveTime.current += Date.now() - activeTimeStart.current; activeTimeStart.current = null; }
      } else if (document.visibilityState === 'visible') { activeTimeStart.current = Date.now(); }
    };
    const handleBeforeUnload = () => {
      if (document.visibilityState === 'visible' && activeTimeStart.current) { totalActiveTime.current += Date.now() - activeTimeStart.current; }
      if (totalActiveTime.current > 1000) { trackEvent('active_time_spent', { page_title: 'AI Cost Estimator', duration_seconds: Math.round(totalActiveTime.current / 1000) }); }
    };
    if (document.visibilityState === 'visible') { activeTimeStart.current = Date.now(); }
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => { document.removeEventListener('visibilitychange', handleVisibilityChange); window.removeEventListener('beforeunload', handleBeforeUnload); handleBeforeUnload(); };
  }, []);
  // --- End Analytics Tracking Effects ---


  // --- Handlers ---
  const handleToggleSection = (sectionId) => {
    setOpenSections((prev) => ({ ...prev, [sectionId]: !prev[sectionId] }));
    // Analytics is handled within the AccordionSection component's onClick now
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    // Analytics is handled within the DarkModeToggle component's onClick now
  };

  // Generic handler for text/number input changes + Analytics
  const handleValueChange = (section, field, value) => {
    const oldValue = config[section][field];
    setConfig((prev) => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
    setEstimatedCost(null);
    // Track input change
    trackEvent('estimator_input_change', {
        section_id: section,
        field_id: field,
        old_value: oldValue,
        new_value: value
    });
  };

   // Handler for checkbox changes + Analytics
  const handleToggleChange = (section, field) => {
    const newValue = !config[section][field];
    setConfig((prev) => ({ ...prev, [section]: { ...prev[section], [field]: newValue } }));
    setEstimatedCost(null);
     // Track toggle change
     trackEvent('estimator_toggle_change', {
        section_id: section,
        field_id: field,
        is_enabled: newValue
    });
  };

  // Handler for dropdown changes + Analytics
  const handleSelectChange = (section, field, selectedId) => {
    const oldValue = config[section][field];
    let updatedSection = { ...config[section], [field]: selectedId };
    // Auto-populate logic
    if (section === 'llm' && field === 'selectedOptionId') { /* ... */
        const selectedLLM = llmOptions.find(opt => opt.id === selectedId);
        if (selectedLLM) {
            updatedSection.type = selectedLLM.type;
            updatedSection.costPerTokenInput = selectedLLM.inputCostMTok ?? '';
            updatedSection.costPerTokenOutput = selectedLLM.outputCostMTok ?? '';
            if (selectedLLM.type === 'managed') { updatedSection.infraCost = ''; updatedSection.foundationModelCost = ''; }
        }
     }
    else if (section === 'rag') {
        if (field === 'rerankingOptionId') {
            const selectedReranker = rerankingOptions.find(opt => opt.id === selectedId);
            if (selectedReranker?.type === 'none') updatedSection.rerankingCost = '0';
        }
    } else if (section === 'agentic' && field === 'orchestrationOptionId') {
        const selectedOrch = orchestrationOptions.find(opt => opt.id === selectedId);
        if (selectedOrch?.type === 'none') updatedSection.orchestrationCost = '0';
    }

    setConfig((prev) => ({ ...prev, [section]: updatedSection }));
    setEstimatedCost(null);
     // Track select change
     trackEvent('estimator_select_change', {
        section_id: section,
        field_id: field,
        old_value: oldValue,
        new_value: selectedId
    });
  };

  // Calculation + Analytics
  const calculateCost = () => {
    console.log("Calculating cost with config:", config);
    let totalCost = 0;
    // --- Calculation Logic (Placeholder) ---
    const monthlyRequests = parseFloat(config.scaling.requestsPerMonth || 0); const avgTokens = parseFloat(config.scaling.avgTokensPerRequest || 0); const selectedLLM = llmOptions.find(opt => opt.id === config.llm.selectedOptionId); if (selectedLLM) { if (selectedLLM.type === 'managed') { const inputCost = parseFloat(config.llm.costPerTokenInput || 0); const outputCost = parseFloat(config.llm.costPerTokenOutput || 0); const inputTokens = monthlyRequests * (avgTokens / 2); const outputTokens = monthlyRequests * (avgTokens / 2); totalCost += (inputTokens / 1000000 * inputCost) + (outputTokens / 1000000 * outputCost); } else { totalCost += parseFloat(config.llm.infraCost || 0); totalCost += parseFloat(config.llm.foundationModelCost || 0); } } if (config.rag.enabled) { totalCost += parseFloat(config.rag.vectorDbCost || 0); totalCost += parseFloat(config.rag.embeddingCost || 0); totalCost += parseFloat(config.rag.rerankingCost || 0); } if (config.agentic.enabled) { totalCost += parseFloat(config.agentic.orchestrationCost || 0); } totalCost += parseFloat(config.dataPipeline.storageCost || 0); totalCost += parseFloat(config.dataPipeline.etlCost || 0); totalCost += parseFloat(config.dataPipeline.preprocessCost || 0); totalCost += parseFloat(config.infra.hostingCost || 0); totalCost += parseFloat(config.infra.apiGatewayCost || 0); totalCost += parseFloat(config.infra.networkCost || 0); totalCost += parseFloat(config.monitoring.loggingCost || 0); totalCost += parseFloat(config.monitoring.metricsCost || 0); totalCost += parseFloat(config.monitoring.tracingCost || 0);
    // --- End Calculation Logic ---

    const finalCost = totalCost.toFixed(2);
    setEstimatedCost(finalCost);

    // Track calculation event
    trackEvent('calculate_cost_click', {
        estimated_cost: parseFloat(finalCost),
        // Include key config values for analysis
        llm_selection: config.llm.selectedOptionId,
        rag_enabled: config.rag.enabled,
        agentic_enabled: config.agentic.enabled,
        requests_per_month: monthlyRequests
    });
  };
  // --- End Handlers ---


  // --- Get selected details for display/logic ---
  const selectedLLMDetails = llmOptions.find(opt => opt.id === config.llm.selectedOptionId);
  const isLLMSelfHosted = selectedLLMDetails?.type === 'self-hosted';
  const selectedVectorDbDetails = vectorDbOptions.find(opt => opt.id === config.rag.vectorDbOptionId);
  const isVectorDbSelfHosted = selectedVectorDbDetails?.type === 'self-hosted';
  const selectedEmbeddingDetails = embeddingOptions.find(opt => opt.id === config.rag.embeddingOptionId);
  const isEmbeddingSelfHosted = selectedEmbeddingDetails?.type === 'self-hosted';
  const selectedRerankerDetails = rerankingOptions.find(opt => opt.id === config.rag.rerankingOptionId);
  const isRerankerSelfHosted = selectedRerankerDetails?.type === 'self-hosted';
  const isRerankerNone = selectedRerankerDetails?.type === 'none';
  const selectedOrchestrationDetails = orchestrationOptions.find(opt => opt.id === config.agentic.orchestrationOptionId);
  const isOrchestrationSelfHosted = selectedOrchestrationDetails?.type === 'self-hosted';
  const isOrchestrationNone = selectedOrchestrationDetails?.type === 'none';

  // --- SEO Content ---
  // TODO: Update all these values for the AI Cost Estimator page
  const pageTitle = "AI System Cost Estimator | ForgeMission";
  const pageDescription = "Estimate the monthly costs for running AI systems including LLM choices (OpenAI, Anthropic, Llama 3), RAG components, agentic features, infrastructure, and more.";
  const canonicalUrl = "https://www.forgemission.com/ai-cost-estimator"; // *** REPLACE with actual URL ***
  const imageUrl = "https://www.forgemission.com/images/og-ai-cost-estimator.jpg"; // *** REPLACE with actual OG image URL ***

  // --- JSON-LD Structured Data (Example for a WebApplication/Service) ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication", // Or SoftwareApplication, Service
    "name": "AI System Cost Estimator",
    "description": pageDescription,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web", // Indicate it's web-based
    "url": canonicalUrl,
    "image": imageUrl,
    "offers": { // Indicate it's a free tool/service
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    },
    "publisher": {
        "@type": "Organization",
        "name": "ForgeMission",
        "logo": { "@type": "ImageObject", "url": "https://www.forgemission.com/images/logo.png" }
    },
     "keywords": "ai cost estimator, llm cost calculator, rag cost, agent cost, openai cost, anthropic cost, llama 3 cost, vector database cost, ai infrastructure cost"
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
          type: 'website', // 'website' or 'tool' might be appropriate
          url: canonicalUrl,
          title: pageTitle,
          description: pageDescription,
          images: [ { url: imageUrl, width: 1200, height: 630, alt: pageTitle, } ],
        }}
        // No article tags needed for a tool page
        twitter={{ cardType: 'summary_large_image', /* site: '@YourTwitterHandle', handle: '@YourTwitterHandle' */ }}
      />
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} key="app-jsonld" />
      </Head>
      {/* --- End SEO Components --- */}


      <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
        <Header />

        {/* Use contentRef here if you want to track copy events within the main area */}
        <main ref={contentRef} className="flex-grow container mx-auto px-4 py-10 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Page Header & Dark Mode Toggle */}
            <div className="flex justify-between items-start mb-10">
              <div className="text-center flex-grow">
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-50 sm:text-4xl lg:text-5xl tracking-tight">
                  AI System Cost Estimator
                </h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                  Configure your desired architecture to get a preliminary cost estimate. <sup className="text-indigo-500 dark:text-indigo-400">Beta</sup>
                </p>
              </div>
              <div className="flex-shrink-0 ml-4">
                  <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
              </div>
            </div>

            {/* Estimator Sections */}
            <div className="space-y-5">
              {/* --- LLM Choice --- */}
              <AccordionSection title="1. LLM Choice" id="llm" isOpen={openSections.llm} onToggle={handleToggleSection}>
                 <SelectField
                    label="Select LLM Provider & Model" name="selectedOptionId" value={config.llm.selectedOptionId}
                    onChange={(e) => handleSelectChange('llm', 'selectedOptionId', e.target.value)}
                    options={llmOptions.map(o => ({ id: o.id, name: `${o.provider} - ${o.model}` }))}
                    placeholder="-- Select LLM --" helpText={selectedLLMDetails?.notes} />
                 {!isLLMSelfHosted && ( <div className="p-4 border bg-blue-50 dark:bg-blue-900/30 dark:border-blue-800 rounded-md mt-4"> <h4 className="font-medium text-gray-800 dark:text-blue-200 mb-2 text-sm">Managed Costs (Auto-populated)</h4> <InputField label="Cost per Input Token ($ / 1M tokens)" name="costPerTokenInput" value={config.llm.costPerTokenInput} onChange={(e) => handleValueChange('llm', 'costPerTokenInput', e.target.value)} placeholder="Auto-populated" helpText="Cost for processing prompt tokens." disabled={true}/> <InputField label="Cost per Output Token ($ / 1M tokens)" name="costPerTokenOutput" value={config.llm.costPerTokenOutput} onChange={(e) => handleValueChange('llm', 'costPerTokenOutput', e.target.value)} placeholder="Auto-populated" helpText="Cost for generating response tokens." disabled={true}/> </div> )}
                 {isLLMSelfHosted && ( <div className="p-4 border bg-green-50 dark:bg-green-900/30 dark:border-green-800 rounded-md mt-4"> <h4 className="font-medium text-gray-800 dark:text-green-200 mb-2 text-sm">Self-Hosted Costs (Manual Input)</h4> <InputField label="Infrastructure Cost ($ / month)" name="infraCost" value={config.llm.infraCost} onChange={(e) => handleValueChange('llm', 'infraCost', e.target.value)} placeholder="e.g., 500" helpText="Compute, storage, networking for hosting."/> <InputField label="Foundation Model Cost ($ one-time or / month)" name="foundationModelCost" value={config.llm.foundationModelCost} onChange={(e) => handleValueChange('llm', 'foundationModelCost', e.target.value)} placeholder="e.g., 0 or 1000" helpText="Licensing or access costs for the base model."/> </div> )}
              </AccordionSection>

              {/* --- RAG Components --- */}
              <AccordionSection title="2. RAG Components" id="rag" isOpen={openSections.rag} onToggle={handleToggleSection}>
                  <div className="flex items-center mb-4"> <input type="checkbox" id="ragEnabled" checked={config.rag.enabled} onChange={() => handleToggleChange('rag', 'enabled')} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 mr-2"/> <label htmlFor="ragEnabled" className="text-sm font-medium text-gray-700 dark:text-gray-300">Enable RAG (Retrieval-Augmented Generation)</label> </div>
                  {config.rag.enabled && ( <div className="space-y-6 pl-6 border-l-2 border-indigo-200 dark:border-indigo-700 ml-2"> <div> <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2 text-sm">Vector Database</h4> <SelectField label="Select Vector Database" name="vectorDbOptionId" value={config.rag.vectorDbOptionId} onChange={(e) => handleSelectChange('rag', 'vectorDbOptionId', e.target.value)} options={vectorDbOptions.map(o => ({ id: o.id, name: o.name }))} placeholder="-- Select Vector DB --" helpText={selectedVectorDbDetails?.notes} /> <InputField label="Estimated Cost ($ / month)" name="vectorDbCost" value={config.rag.vectorDbCost} onChange={(e) => handleValueChange('rag', 'vectorDbCost', e.target.value)} placeholder="e.g., 150" helpText={isVectorDbSelfHosted ? 'Infrastructure + maintenance.' : 'Based on usage/tier.'}/> </div> <div> <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2 text-sm">Embedding Service</h4> <SelectField label="Select Embedding Model/Service" name="embeddingOptionId" value={config.rag.embeddingOptionId} onChange={(e) => handleSelectChange('rag', 'embeddingOptionId', e.target.value)} options={embeddingOptions.map(o => ({ id: o.id, name: o.name }))} placeholder="-- Select Embedding --" helpText={selectedEmbeddingDetails?.notes} /> <InputField label="Estimated Cost ($ / month)" name="embeddingCost" value={config.rag.embeddingCost} onChange={(e) => handleValueChange('rag', 'embeddingCost', e.target.value)} placeholder="e.g., 20" helpText={isEmbeddingSelfHosted ? 'Infrastructure costs.' : 'Based on tokens/usage.'}/> </div> <div> <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2 text-sm">Re-ranking Service</h4> <SelectField label="Select Re-ranking Option" name="rerankingOptionId" value={config.rag.rerankingOptionId} onChange={(e) => handleSelectChange('rag', 'rerankingOptionId', e.target.value)} options={rerankingOptions.map(o => ({ id: o.id, name: o.name }))} placeholder="-- Select Reranker --" helpText={selectedRerankerDetails?.notes} /> <InputField label="Estimated Cost ($ / month)" name="rerankingCost" value={config.rag.rerankingCost} onChange={(e) => handleValueChange('rag', 'rerankingCost', e.target.value)} placeholder="e.g., 0 or 10" helpText={isRerankerSelfHosted ? 'Infrastructure cost.' : (isRerankerNone ? 'No cost.' : 'Based on usage.')} disabled={isRerankerNone}/> </div> </div> )}
              </AccordionSection>

              {/* --- Agentic Components --- */}
              <AccordionSection title="3. Agentic Components" id="agentic" isOpen={openSections.agentic} onToggle={handleToggleSection}>
                   <div className="flex items-center mb-4"> <input type="checkbox" id="agenticEnabled" checked={config.agentic.enabled} onChange={() => handleToggleChange('agentic', 'enabled')} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 mr-2"/> <label htmlFor="agenticEnabled" className="text-sm font-medium text-gray-700 dark:text-gray-300">Enable Agentic Features (Orchestration, Tools)</label> </div>
                   {config.agentic.enabled && ( <div className="space-y-6 pl-6 border-l-2 border-purple-200 dark:border-purple-700 ml-2"> <div> <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2 text-sm">Orchestration Service</h4> <SelectField label="Select Orchestration Option" name="orchestrationOptionId" value={config.agentic.orchestrationOptionId} onChange={(e) => handleSelectChange('agentic', 'orchestrationOptionId', e.target.value)} options={orchestrationOptions.map(o => ({ id: o.id, name: o.name }))} placeholder="-- Select Orchestration --" helpText={selectedOrchestrationDetails?.notes} /> <InputField label="Estimated Cost ($ / month)" name="orchestrationCost" value={config.agentic.orchestrationCost} onChange={(e) => handleValueChange('agentic', 'orchestrationCost', e.target.value)} placeholder="e.g., 30" helpText={isOrchestrationSelfHosted ? 'Infrastructure cost.' : (isOrchestrationNone ? 'No cost.' : 'Based on usage/tier.')} disabled={isOrchestrationNone}/> </div> </div> )}
              </AccordionSection>

              {/* --- Data Pipeline --- */}
              <AccordionSection title="4. Data Pipeline & Preprocessing" id="dataPipeline" isOpen={openSections.dataPipeline} onToggle={handleToggleSection}>
                  <SelectField label="Primary Cloud Provider" name="providerId" value={config.dataPipeline.providerId} onChange={(e) => handleSelectChange('dataPipeline', 'providerId', e.target.value)} options={cloudProviderOptions} placeholder="-- Select Provider --" />
                  {calculatorLinks.dataPipeline[config.dataPipeline.providerId] && ( <a href={calculatorLinks.dataPipeline[config.dataPipeline.providerId]} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs text-blue-600 dark:text-blue-400 hover:underline mb-4"> Open {cloudProviderOptions.find(p=>p.id === config.dataPipeline.providerId)?.name} Calculator <ExternalLink size={12} className="ml-1"/> </a> )}
                  <InputField label="Source Data Storage Cost ($ / month)" name="storageCost" value={config.dataPipeline.storageCost} onChange={(e) => handleValueChange('dataPipeline', 'storageCost', e.target.value)} placeholder="e.g., 50" helpText="S3, GCS, Azure Blob etc."/>
                  <InputField label="Data Ingestion/ETL Cost ($ / month)" name="etlCost" value={config.dataPipeline.etlCost} onChange={(e) => handleValueChange('dataPipeline', 'etlCost', e.target.value)} placeholder="e.g., 25" helpText="Serverless functions, managed pipelines."/>
                  <InputField label="Preprocessing Compute Cost ($ / month)" name="preprocessCost" value={config.dataPipeline.preprocessCost} onChange={(e) => handleValueChange('dataPipeline', 'preprocessCost', e.target.value)} placeholder="e.g., 100" helpText="Chunking, cleaning before embedding."/>
              </AccordionSection>

              {/* --- General Infrastructure --- */}
               <AccordionSection title="5. General Infrastructure & Networking" id="infra" isOpen={openSections.infra} onToggle={handleToggleSection}>
                  <SelectField label="Primary Cloud/Hosting Provider" name="providerId" value={config.infra.providerId} onChange={(e) => handleSelectChange('infra', 'providerId', e.target.value)} options={cloudProviderOptions} placeholder="-- Select Provider --" />
                  {calculatorLinks.infra[config.infra.providerId] && ( <a href={calculatorLinks.infra[config.infra.providerId]} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs text-blue-600 dark:text-blue-400 hover:underline mb-4"> Open {cloudProviderOptions.find(p=>p.id === config.infra.providerId)?.name} Calculator <ExternalLink size={12} className="ml-1"/> </a> )}
                  <InputField label="Application Hosting Cost ($ / month)" name="hostingCost" value={config.infra.hostingCost} onChange={(e) => handleValueChange('infra', 'hostingCost', e.target.value)} placeholder="e.g., 50" helpText="Vercel, Netlify, Lambda, EC2 etc."/>
                  <InputField label="API Gateway / Load Balancer Cost ($ / month)" name="apiGatewayCost" value={config.infra.apiGatewayCost} onChange={(e) => handleValueChange('infra', 'apiGatewayCost', e.target.value)} placeholder="e.g., 0 or 15" helpText="If applicable."/>
                  <InputField label="Estimated Network Egress Cost ($ / month)" name="networkCost" value={config.infra.networkCost} onChange={(e) => handleValueChange('infra', 'networkCost', e.target.value)} placeholder="e.g., 20" helpText="Data transfer out."/>
              </AccordionSection>

              {/* --- Monitoring --- */}
              <AccordionSection title="6. Observability & Monitoring" id="monitoring" isOpen={openSections.monitoring} onToggle={handleToggleSection}>
                   <SelectField label="Primary Cloud/Monitoring Provider" name="providerId" value={config.monitoring.providerId} onChange={(e) => handleSelectChange('monitoring', 'providerId', e.target.value)} options={cloudProviderOptions} placeholder="-- Select Provider --" />
                   {calculatorLinks.monitoring[config.monitoring.providerId] && ( <a href={calculatorLinks.monitoring[config.monitoring.providerId]} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs text-blue-600 dark:text-blue-400 hover:underline mb-4"> Open {cloudProviderOptions.find(p=>p.id === config.monitoring.providerId)?.name} Calculator <ExternalLink size={12} className="ml-1"/> </a> )}
                  <InputField label="Logging Cost ($ / month)" name="loggingCost" value={config.monitoring.loggingCost} onChange={(e) => handleValueChange('monitoring', 'loggingCost', e.target.value)} placeholder="e.g., 30" helpText="Datadog, CloudWatch Logs etc."/>
                  <InputField label="Metrics Cost ($ / month)" name="metricsCost" value={config.monitoring.metricsCost} onChange={(e) => handleValueChange('monitoring', 'metricsCost', e.target.value)} placeholder="e.g., 30" helpText="Datadog, CloudWatch Metrics etc."/>
                  <InputField label="Tracing Cost ($ / month)" name="tracingCost" value={config.monitoring.tracingCost} onChange={(e) => handleValueChange('monitoring', 'tracingCost', e.target.value)} placeholder="e.g., 0 or 40" helpText="Datadog APM, OpenTelemetry etc."/>
              </AccordionSection>

               {/* --- Scaling Factors --- */}
              <AccordionSection title="7. Usage & Scaling Factors" id="scaling" isOpen={openSections.scaling} onToggle={handleToggleSection}>
                   <InputField label="Estimated Requests per Month" name="requestsPerMonth" type="number" step="1000" value={config.scaling.requestsPerMonth} onChange={(e) => handleValueChange('scaling', 'requestsPerMonth', e.target.value)} placeholder="e.g., 100000" helpText="Total LLM/Agent calls."/>
                   <InputField label="Average Tokens per Request (Input + Output)" name="avgTokensPerRequest" type="number" step="50" value={config.scaling.avgTokensPerRequest} onChange={(e) => handleValueChange('scaling', 'avgTokensPerRequest', e.target.value)} placeholder="e.g., 500" helpText="Combined prompt and completion length."/>
                   <InputField label="RAG Data Volume (GB)" name="dataVolumeGB" type="number" step="1" value={config.scaling.dataVolumeGB} onChange={(e) => handleValueChange('scaling', 'dataVolumeGB', e.target.value)} placeholder="e.g., 10" helpText="Size of data indexed in Vector DB."/>
                   <SelectField label="RAG Data Update Frequency" name="updateFrequencyId" value={config.scaling.updateFrequencyId} onChange={(e) => handleSelectChange('scaling', 'updateFrequencyId', e.target.value)} options={dataUpdateFrequencyOptions.map(o => ({ id: o.id, name: o.name }))} placeholder="-- Select Frequency --" helpText="How often RAG data needs re-indexing/embedding." />
              </AccordionSection>

            </div>

            {/* Calculation Trigger & Result */}
            <div className="mt-10 pt-8 border-t border-gray-300 dark:border-gray-700 text-center">
              <button
                onClick={calculateCost}
                className="px-8 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
              >
                Calculate Estimated Cost
              </button>

              {estimatedCost !== null && (
                <div className="mt-8 p-6 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg border border-indigo-200 dark:border-indigo-800">
                  <h3 className="text-xl font-semibold text-indigo-800 dark:text-indigo-200">Estimated Monthly Cost:</h3>
                  <p className="text-4xl font-bold text-indigo-900 dark:text-indigo-100 mt-2">
                    ${estimatedCost}
                  </p>
                  <p className="text-sm text-indigo-700 dark:text-indigo-300 mt-1">
                    (This is a preliminary estimate based on your inputs.)
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AICostEstimatorPage;
