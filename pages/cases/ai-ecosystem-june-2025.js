import Head from 'next/head';
import Header from '../../components/Header'; // Adjust path as needed
import Footer from '../../components/Footer'; // Adjust path as needed
import Link from 'next/link';
import React, { useState } from 'react';
import { NextSeo } from 'next-seo';


// --- Component for Table 1: LLM Providers ---
const LlmTable = () => {
  const llmData = [
    { provider: 'OpenAI', model: 'GPT-4o', suitedFor: 'All-Around Performance & Multimodality: Excels at a mix of text, audio, and vision tasks. Great for fast, high-quality conversational AI, creative content generation, and analyzing visual inputs.', link: 'https://openai.com', date: 'May 2024' },
    { provider: 'Google', model: 'Gemini 2.5 Pro', suitedFor: 'Complex Reasoning & Advanced Coding: State-of-the-art performance on difficult math, science, and coding benchmarks. Its "thinking" process allows it to solve highly complex, multi-step problems.', link: 'https://deepmind.google/models/gemini/pro/', date: 'June 2025' },
    { provider: 'Anthropic', model: 'Claude 3.5 Sonnet', suitedFor: 'Enterprise Use & Coding Workflows: A leader in enterprise-grade tasks, code generation/editing, and visual reasoning. Known for its reliability and strong safety features.', link: 'https://www.anthropic.com', date: 'June 2024' },
    { provider: 'Meta', model: 'Llama 3 Series', suitedFor: 'Open-Source Development & Efficiency: The leading open-source model family, excellent for developers who need to fine-tune models for specific tasks. Strong general performance.', link: 'https://ai.meta.com/llama/', date: 'April 2024' },
    { provider: 'Mistral AI', model: 'Mistral Large 2', suitedFor: 'Performance Efficiency & Multilingual Tasks: A powerful proprietary model known for strong performance with lower computational requirements and excellent multilingual capabilities.', link: 'https://mistral.ai', date: 'July 2024' },
    { provider: 'DeepSeek', model: 'DeepSeek V2', suitedFor: 'Open-Source Coding & Math: A top-performing open-source model specialized in code and mathematics, excelling at technical reasoning and supporting many programming languages.', link: 'https://www.deepseek.com/', date: 'May 2024' },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm align-top">
        <thead className="bg-gray-100">
          <tr>
            <th scope="col" className="px-6 py-3 text-left font-semibold text-gray-700 tracking-wider">Provider</th>
            <th scope="col" className="px-6 py-3 text-left font-semibold text-gray-700 tracking-wider">Model Family</th>
            <th scope="col" className="px-6 py-3 text-left font-semibold text-gray-700 tracking-wider">Best Suited For</th>
            <th scope="col" className="px-6 py-3 text-left font-semibold text-gray-700 tracking-wider">Availability</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {llmData.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
              <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">{item.provider}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-600">{item.model}</td>
              <td className="px-6 py-4 text-gray-600 max-w-md">{item.suitedFor}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 hover:underline transition-colors duration-200 font-medium">Website</a>
                <span className="text-gray-400 block mt-1 text-xs">{item.date}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// --- Component for Table 2: AI Ecosystem Tooling ---
const EcosystemTable = () => {
    const ecosystemData = [
        { category: 'AI Application Development', usage: 'Platforms that generate full-stack web applications from natural language prompts, managing everything from frontend UI to backend logic.', providers: [{ name: 'Lovable', link: 'https://lovable.dev', date: '2023' }, { name: 'Vellum', link: 'https://www.vellum.ai/', date: '2023' }] },
        { category: 'Generative AI: Image & Video', usage: 'Creating and editing images, videos, and design assets from text prompts or other inputs.', providers: [{ name: 'Midjourney', link: 'https://www.midjourney.com', date: '2022' }, { name: 'Runway', link: 'https://runwayml.com', date: '2018' }, { name: 'Pika Labs', link: 'https://pika.art', date: '2023' }] },
        { category: 'Agentic Workflows', usage: 'Automating complex, multi-step tasks by creating autonomous agents that can reason, plan, and use various tools.', providers: [{ name: 'LangChain', link: 'https://www.langchain.com', date: '2022' }, { name: 'CrewAI', link: 'https://www.crewai.com/', date: '2023' }] },
        { category: 'AI-Powered Developer Tools', usage: 'Assisting software developers with intelligent code completion, bug fixes, and automating development tasks.', providers: [{ name: 'GitHub Copilot', link: 'https://github.com/features/copilot', date: '2022' }, { name: 'Cursor', link: 'https://cursor.sh/', date: '2023' }] },
    ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm align-top">
        <thead className="bg-gray-100">
          <tr>
            <th scope="col" className="px-6 py-3 text-left font-semibold text-gray-700 tracking-wider">Category</th>
            <th scope="col" className="px-6 py-3 text-left font-semibold text-gray-700 tracking-wider">Usage</th>
            <th scope="col" className="px-6 py-3 text-left font-semibold text-gray-700 tracking-wider">Example Providers</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {ecosystemData.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
              <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">{item.category}</td>
              <td className="px-6 py-4 text-gray-600 max-w-md">{item.usage}</td>
              <td className="px-6 py-4">
                <div className="flex flex-col space-y-2">
                  {item.providers.map((p, i) => (
                    <a key={i} href={p.link} target="_blank" rel="noopener noreferrer" className="font-medium text-indigo-600 hover:text-indigo-800 hover:underline transition-colors duration-200">
                      {p.name} <span className="text-gray-400 text-xs font-normal">({p.date})</span>
                    </a>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// --- Component for Table 3: Emerging & Specialized Tooling ---
const EmergingTable = () => {
  const emergingData = [
    { category: 'AI Observability & MLOps', usage: 'Tracking the performance, cost, drift, and behavior of AI models in production to ensure they are working as expected.', providers: [{ name: 'Dynatrace', link: 'https://www.dynatrace.com', date: '2005' }, { name: 'Arize AI', link: 'https://arize.com', date: '2020' }, { name: 'WhyLabs', link: 'https://whylabs.ai', date: '2019' }] },
    { category: 'AI Governance & Ethics', usage: 'Managing AI risk, auditing models for bias and fairness, ensuring regulatory compliance, and protecting models from security threats.', providers: [{ name: 'Credo.AI', link: 'https://www.credo.ai', date: '2020' }, { name: 'Holistic AI', link: 'https://www.holisticai.com', date: '2020' }] },
    { category: 'Synthetic Data Generation', usage: 'Creating artificial, high-fidelity data to train AI models, especially when real-world data is scarce, private, or biased.', providers: [{ name: 'Gretel.ai', link: 'https://gretel.ai', date: '2020' }, { name: 'Mostly AI', link: 'https://mostly.ai', date: '2017' }] },
    { category: 'Industry-Specific AI (Vertical AI)', usage: 'Platforms tailored for the unique data, workflows, and regulatory requirements of specific industries like Healthcare, Finance, and Cybersecurity.', providers: [{ name: 'Insilico Medicine', link: 'https://insilico.com', date: '2014' }, { name: 'Zest AI', link: 'https://www.zest.ai', date: '2009' }, { name: 'Darktrace', link: 'https://darktrace.com', date: '2013' }] },
  ];

  return (
    <div className="overflow-x-auto">
        <table className="min-w-full text-sm align-top">
            <thead className="bg-gray-100">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left font-semibold text-gray-700 tracking-wider">Category</th>
                    <th scope="col" className="px-6 py-3 text-left font-semibold text-gray-700 tracking-wider">Usage</th>
                    <th scope="col" className="px-6 py-3 text-left font-semibold text-gray-700 tracking-wider">Example Providers</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {emergingData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">{item.category}</td>
                    <td className="px-6 py-4 text-gray-600 max-w-md">{item.usage}</td>
                    <td className="px-6 py-4">
                    <div className="flex flex-col space-y-2">
                        {item.providers.map((p, i) => (
                        <a key={i} href={p.link} target="_blank" rel="noopener noreferrer" className="font-medium text-indigo-600 hover:text-indigo-800 hover:underline transition-colors duration-200">
                            {p.name} <span className="text-gray-400 text-xs font-normal">({p.date})</span>
                        </a>
                        ))}
                    </div>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
};


// --- Main Page Component ---
export default function Home() {
  const [isPromptVisible, setIsPromptVisible] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-6 py-8">
        
        {/* --- Report Section with Expandable Prompt --- */}
        <section className="mb-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">A Note on the AI Landscape</h2>
          <div className="text-blue-800/80 space-y-3 text-sm">
            <p>
              The field of Artificial Intelligence is characterized by an unprecedented pace of innovation. New models, tools, and platforms emerge on a weekly, if not daily, basis, fundamentally altering the capabilities and economics of the ecosystem.
            </p>
            <p>
              The information presented in this report is a snapshot intended to provide a comprehensive overview of the key players and categories as of **June 2025**. Given the dynamic nature of this field, some information, particularly regarding the top-performing models, may evolve rapidly.
            </p>
          </div>
          
          {/* --- NEW: Expandable Section --- */}
          <div className="mt-4">
            <button
              onClick={() => setIsPromptVisible(!isPromptVisible)}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-800 focus:outline-none"
            >
              {isPromptVisible ? '▼ Hide Regeneration Prompt' : '► Show Regeneration Prompt'}
            </button>
            
            {isPromptVisible && (
              <div className="mt-3 bg-gray-100 border border-gray-300 rounded-md p-4">
                <p className="text-sm text-gray-600 mb-2">Use the following multi-step prompt to regenerate this report:</p>
                <code className="block whitespace-pre-wrap text-xs text-gray-800 bg-gray-200 p-3 rounded-md">
                  Generate a single Next.js page that serves as a comprehensive overview of the AI ecosystem, current as of June 2025.

                  The page should use the Next.js App Router and be styled with Tailwind CSS for a clean, professional, light-themed design. The page must be structured with a separate Header and Footer component, but all table data and components should be consolidated into the main `app/page.js` file, which should be a client component.

                  The page must contain the following sections in this order:

                  1.  A "Report Section" at the top. This section should explain the fast-paced nature of the AI field and state the report's date. It must also contain an expandable "Show Regeneration Prompt" element that, when clicked, reveals this exact prompt.

                  2.  A table titled "Major Large Language Models (LLMs)". It should list top models (like GPT-4o, Claude 3.5 Sonnet, Gemini 2.5 Pro) with columns for Provider, Model Family, a detailed "Best Suited For" description of their strengths, and a link to their website with availability date.

                  3.  A table titled "Core AI Ecosystem Tooling". It should cover categories like AI Application Development, Generative AI, Agentic Workflows, and AI Developer Tools. Columns should be Category, Usage, and a list of Example Providers with their website links and dates.

                  4.  A table titled "Emerging & Specialized Tooling". It should cover categories like AI Observability/MLOps, AI Governance/Ethics, Synthetic Data Generation, and Industry-Specific AI (for Healthcare, Finance, etc.). Columns should be the same as the Core Tools table.

                  Populate all tables with accurate, up-to-date examples of tool and model providers.
                </code>
              </div>
            )}
          </div>
        </section>

        {/* Section 1: Foundational Models */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-indigo-200">
            1. Major Large Language Models (LLMs)
          </h2>
          <div className="rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <LlmTable />
          </div>
        </section>

        {/* Section 2: Core Ecosystem Tooling */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-indigo-200">
            2. Core AI Ecosystem Tooling
          </h2>
          <div className="rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <EcosystemTable />
          </div>
        </section>

        {/* Section 3: Emerging & Specialized Tooling */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-indigo-200">
            3. Emerging & Specialized Tooling
          </h2>
          <div className="rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <EmergingTable />
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
