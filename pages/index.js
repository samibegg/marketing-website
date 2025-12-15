'use client';

import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

import { useEffect, useState } from 'react';

const heroTexts = [
  ["Reclaim Your Time", "Scale Without Growing Your Team"],
  ["Transform Tasks into AI Agents", "Multiply Your Capabilities"],
  ["Automation That Actually Works", "Built for Your Bottom Line"],
  ["Stop Drowning in Manual Work", "Start Focusing on Growth"],
  ["Your AI Development Partner", "Workflows While You Sleep"],
  ["Revenue Up, Costs Down", "Intelligence in Every Process"]
];

// Testimonials for rotating display
const testimonials = [
  {
    text: "Their team delivered a comprehensive automation solution that eliminated 75% of our manual data entry. The ROI was evident within the first quarter—we've reallocated three FTEs to higher-value strategic work.",
    author: "Sarah Mitchell",
    company: "TechFlow Solutions",
    role: "Chief Operating Officer"
  },
  {
    text: "Lead response time dropped from 4 hours to under 10 minutes. Our close rate improved by 40% without adding headcount. The enrichment and routing system they built has become mission-critical to our sales organization.",
    author: "Marcus Johnson",
    company: "GrowthLabs",
    role: "VP of Sales"
  },
  {
    text: "The invoice processing automation saves our finance team approximately $90K annually in labor costs. More importantly, our accounts payable cycle time decreased from 12 days to 3, significantly improving vendor relationships.",
    author: "Jennifer Chen",
    company: "Meridian Consulting",
    role: "Chief Financial Officer"
  },
  {
    text: "Their AI support agent resolves 70% of tier-1 inquiries automatically, reducing our average response time by 80%. Our customer satisfaction scores improved 25 points while our support team focuses on complex technical issues.",
    author: "David Kumar",
    company: "RetailEdge",
    role: "VP of Customer Experience"
  },
  {
    text: "This team brings both deep technical expertise and genuine business acumen. They took time to understand our operational challenges and delivered solutions that transformed how our departments collaborate. Exceptional partner.",
    author: "Amanda Foster",
    company: "Catalyst Partners",
    role: "Managing Director"
  },
  {
    text: "The lead enrichment system transformed our sales productivity. Every prospect arrives with complete firmographic data and buying signals, automatically routed to the right rep. It's equivalent to adding two full-time SDRs to our team.",
    author: "Robert Hayes",
    company: "Venture Dynamics",
    role: "VP of Revenue Operations"
  }
];

// Use cases
const useCases = [
  {
    title: "Candidate Screening & Hiring Pipeline",
    description: "Applications are automatically parsed and scored against job requirements. Top candidates are routed to hiring managers with enriched profiles from LinkedIn and professional networks, interview scheduling is automated, and all activity syncs to your ATS in real-time."
  },
  {
    title: "Proposal & RFP Management",
    description: "When RFPs arrive, relevant content is automatically extracted from your knowledge base, previous proposals, and case studies. Stakeholders are notified, sections are pre-populated, and compliance requirements are tracked—cutting proposal development time by 60%."
  },
  {
    title: "Inventory Optimization & Reordering",
    description: "Stock levels are monitored across all locations in real-time. When inventory hits reorder points, purchase orders are automatically generated based on historical demand patterns, supplier lead times, and seasonal forecasts, then routed for approval."
  },
  {
    title: "Competitive Market Intelligence",
    description: "Competitor pricing, product launches, and market trends are automatically tracked from multiple sources. Data is aggregated into weekly intelligence reports with trend analysis, alerting your team to opportunities and threats before they impact revenue."
  },
  {
    title: "Lead Enrichment & Sales Routing",
    description: "Incoming leads are automatically scored and enriched with firmographic data, technographic signals, and buying intent. Qualified prospects are routed to the right sales rep based on territory, industry expertise, and workload—with full context delivered to your CRM."
  },
  {
    title: "Multi-System Data Synchronization",
    description: "Customer information, orders, and inventory data stays synchronized across your ERP, CRM, e-commerce platform, and accounting system. Changes in one system automatically propagate to all others, eliminating manual data entry and reconciliation errors."
  },
  {
    title: "Customer Onboarding Orchestration",
    description: "When deals close, customer records are automatically created across all systems, welcome sequences are triggered, training materials are delivered, implementation tasks are assigned in your project management tool, and stakeholders are notified at each milestone."
  },
  {
    title: "AI-Powered Customer Support",
    description: "Support tickets are automatically categorized and routed based on urgency and expertise required. An AI agent handles tier-1 questions by searching your knowledge base, creates tickets for complex issues, and escalates high-priority cases—reducing response times by 80%."
  }
];

// Pilot program examples
const pilotExamples = [
  "Candidate tracking system that parses resumes, scores against job requirements, schedules interviews & syncs with your ATS",
  "RFP response automation that extracts requirements, pulls relevant content from past proposals & generates draft sections",
  "Inventory monitoring system that tracks stock levels across locations, generates purchase orders & alerts procurement team",
  "Competitive intelligence aggregator that monitors competitor pricing, product launches & market trends with weekly reports",
  "Lead enrichment engine that scores prospects, appends firmographic data & routes qualified leads to sales reps with full context",
  "Multi-system sync platform that keeps customer data consistent across ERP, CRM, e-commerce & accounting systems",
  "Customer onboarding workflow that creates accounts across all systems, triggers welcome sequences & assigns implementation tasks",
  "AI support agent integrated with knowledge base that answers tier-1 questions, categorizes tickets & escalates complex issues",
  "Contract management system that extracts key terms, tracks renewal dates, routes for approval & updates status in legal database",
  "Sales performance dashboard that aggregates data from CRM, billing & marketing platforms with automated monthly executive reports"
];

// Software integrations with local logo paths
const integrations = [
  { name: "Airtable", logo: "/integration-logos/airtable.svg" },
  { name: "AWS", logo: "/integration-logos/aws.svg" },
  { name: "Shopify", logo: "/integration-logos/shopify.svg" },
  { name: "HubSpot", logo: "/integration-logos/hubspot.svg" },
  { name: "Docker", logo: "/integration-logos/docker.svg" },
  { name: "Notion", logo: "/integration-logos/notion.svg" },
  { name: "Trello", logo: "/integration-logos/trello.svg" },
  { name: "Intercom", logo: "/integration-logos/intercom.svg" },
  { name: "Stripe", logo: "/integration-logos/stripe.svg" },
  { name: "Asana", logo: "/integration-logos/asana.svg" },
  { name: "Azure", logo: "/integration-logos/azure.svg" },
  { name: "Slack", logo: "/integration-logos/slack.svg" },
  { name: "Salesforce", logo: "/integration-logos/salesforce.svg" },
  { name: "Pipedrive", logo: "/integration-logos/pipedrive.svg" },
  { name: "Instagram", logo: "/integration-logos/instagram.svg" },
  { name: "Oracle", logo: "/integration-logos/oracle.svg" },
  { name: "Customer.io", logo: "/integration-logos/customer-io.svg" },
  { name: "Postman", logo: "/integration-logos/postman.svg" },
  { name: "Claude", logo: "/integration-logos/claude.svg" },
  { name: "Calendly", logo: "/integration-logos/calendly.svg" },
  { name: "GitHub", logo: "/integration-logos/github.svg" },
  { name: "MongoDB", logo: "/integration-logos/mongodb.svg" },
  { name: "Trustpilot", logo: "/integration-logos/trustpilot.svg" },
  { name: "GoogleCloud", logo: "/integration-logos/google-cloud.svg" },
  { name: "Gemini", logo: "/integration-logos/gemini.svg" },
  { name: "WhatsApp", logo: "/integration-logos/whatsapp.svg" },
  { name: "YouTube", logo: "/integration-logos/youtube.svg" },
  { name: "Telegram", logo: "/integration-logos/telegram.svg" },
  { name: "Excel", logo: "/integration-logos/excel.svg" },
  { name: "OpenAI", logo: "/integration-logos/openai.svg" },
  { name: "Gmail", logo: "/integration-logos/gmail.svg" },
  { name: "WordPress", logo: "/integration-logos/wordpress.svg" },
  { name: "Ghost", logo: "/integration-logos/ghost.svg" },
  { name: "Webflow", logo: "/integration-logos/webflow.svg" },
  { name: "Dropbox", logo: "/integration-logos/dropbox.svg" },
  { name: "Word", logo: "/integration-logos/word.svg" },
  { name: "Upwork", logo: "/integration-logos/upwork.svg" },
  { name: "Zoho", logo: "/integration-logos/zoho.svg" },
  { name: "Twilio", logo: "/integration-logos/twilio.svg" },
  { name: "Grok", logo: "/integration-logos/grok.svg" }
];

export default function HomePage() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroFade, setHeroFade] = useState(true);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [testimonialFade, setTestimonialFade] = useState(true);

  // Hero text rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroFade(false);
      setTimeout(() => {
        setHeroIndex((prev) => (prev + 1) % heroTexts.length);
        setHeroFade(true);
      }, 500);
    }, 3100);
    return () => clearInterval(interval);
  }, []);

  // Testimonial rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialFade(false);
      setTimeout(() => {
        setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
        setTestimonialFade(true);
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const [heroLine1, heroLine2] = heroTexts[heroIndex];
  const currentTestimonial = testimonials[testimonialIndex];

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow flex flex-col justify-center items-center px-6 py-16">
        {/* Hero Section */}
        <section className="text-center max-w-3xl">
          <h1
            className={`text-5xl font-extrabold text-gray-900 mb-6 transition-opacity duration-500 ${heroFade ? 'opacity-100' : 'opacity-0'}`}
          >
            {heroLine1} <br /> {heroLine2}
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            We transform your most demanding tasks into intelligent AI agents. Handle complex processes that basic automation can't, connecting your essential tools to multiply your team's capabilities.
          </p>
          <p className="text-md text-gray-500 mb-8 italic">
            Our AI agents typically reduce the work of multiple employees, saving an estimated $90,000 - $120,000 every year.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="#pricing" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-md text-lg transition">
              See Plans
            </Link>
            <Link href="#contact" className="bg-gray-800 hover:bg-gray-900 text-white font-medium py-3 px-8 rounded-md text-lg transition">
              Schedule a Demo
            </Link>
          </div>
        </section>

        {/* Software Integrations */}
        <section className="py-16 w-full max-w-5xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Any software, any workflow
            </h2>
            <p className="text-lg text-gray-600">We've got you covered (integrations across all your systems)</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm border-2 border-red-200">
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6 items-center">
              {integrations.map((integration, idx) => (
                <img 
                  key={idx}
                  src={integration.logo}
                  alt={integration.name}
                  loading="lazy"
                  className="h-8 w-auto mx-auto opacity-70 hover:opacity-100 transition-opacity"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-16 w-full max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Is this for me?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Here are just some of the things we've tackled for our clients</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((useCase, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{useCase.title}</h3>
                <p className="text-gray-600 leading-relaxed">{useCase.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 w-full max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">See for yourself</h2>
            <p className="text-lg text-gray-600">What our clients say about working with us</p>
          </div>
          <div 
            className={`bg-gradient-to-br from-blue-50 via-white to-gray-50 p-12 rounded-2xl shadow-xl border border-gray-100 transition-opacity duration-500 ${testimonialFade ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="max-w-3xl mx-auto">
              <div className="flex justify-center mb-6">
                <div className="text-6xl text-blue-500 leading-none font-serif">"</div>
              </div>
              <p className="text-xl text-gray-800 mb-8 text-center leading-relaxed">
                {currentTestimonial.text}
              </p>
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <p className="font-bold text-gray-900 text-lg">{currentTestimonial.author}</p>
                  <p className="text-gray-600">{currentTestimonial.role}</p>
                  <p className="text-blue-600 font-medium">{currentTestimonial.company}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setTestimonialFade(false);
                  setTimeout(() => {
                    setTestimonialIndex(idx);
                    setTestimonialFade(true);
                  }, 300);
                }}
                className={`h-2 rounded-full transition-all ${
                  idx === testimonialIndex 
                    ? 'w-8 bg-blue-600' 
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </section>

        {/* About/Team Section */}
        <section className="py-16 w-full max-w-5xl">
          <div className="bg-gradient-to-br from-blue-50 to-gray-50 p-12 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">We're here to help</h2>
            <p className="text-lg text-gray-700 mb-4">
              We're a team of automation and AI specialists with years of experience helping organizations streamline operations and implement intelligent agents. Our backgrounds span operations engineering, software development, and enterprise automation.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              We've seen firsthand how manual processes can eat up your day. That's why we help ambitious teams like yours grow while keeping headcount lean through AI agents and automation. No corporate jargon, no unnecessary complexity - just practical solutions that free up your time for what really matters.
            </p>
            <p className="text-lg text-gray-700 font-medium mb-8">
              Imagine this: In just a week, that annoying task you've been putting off? Gone. Those spreadsheets that never seem to match up? Synced. Your team's time? Reclaimed for the tasks that actually grow your business.
            </p>
            
            {/* Company logos streamer */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-600 text-center mb-6 uppercase tracking-wide font-semibold">Our team has worked at</p>
              <div className="relative overflow-hidden">
                <div className="flex gap-12 animate-scroll-left">
                  {/* First set of logos */}
                  <img src="/integration-logos/google.svg" alt="Google" className="h-8 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all" />
                  <img src="/integration-logos/microsoft.svg" alt="Microsoft" className="h-8 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all" />
                  <img src="/integration-logos/aws.svg" alt="Amazon" className="h-8 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all" />
                  <img src="/integration-logos/crowdstrike.svg" alt="Crwd" className="h-8 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all" />
                  <img src="/integration-logos/openai.svg" alt="Openai" className="h-8 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all" />
                  <img src="/integration-logos/salesforce.svg" alt="Salesforce" className="h-8 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all" />
                  <img src="/integration-logos/oracle.svg" alt="Oracle" className="h-8 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all" />
                  <img src="/integration-logos/cisco.svg" alt="Cisco" className="h-8 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all" />
                  <img src="/integration-logos/palantir.svg" alt="Palantir" className="h-8 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all" />
                  {/* Duplicate set for seamless loop */}
                  <img src="/integration-logos/google.svg" alt="Google" className="h-8 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all" />
                  <img src="/integration-logos/microsoft.svg" alt="Microsoft" className="h-8 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all" />
                  <img src="/integration-logos/aws.svg" alt="Amazon" className="h-8 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all" />
                  <img src="/integration-logos/crowdstrike.svg" alt="Crwd" className="h-8 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all" />
                  <img src="/integration-logos/openai.svg" alt="Openai" className="h-8 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all" />
                  <img src="/integration-logos/salesforce.svg" alt="Salesforce" className="h-8 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all" />
                  <img src="/integration-logos/oracle.svg" alt="Oracle" className="h-8 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all" />
                  <img src="/integration-logos/cisco.svg" alt="Cisco" className="h-8 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all" />
                  <img src="/integration-logos/palantir.svg" alt="Palantir" className="h-8 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Add the CSS animation in a style tag */}
          <style jsx>{`
            @keyframes scroll-left {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            
            .animate-scroll-left {
              animation: scroll-left 30s linear infinite;
            }
            
            .animate-scroll-left:hover {
              animation-play-state: paused;
            }
          `}</style>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-16 w-full max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Get started today</h2>
            <p className="text-lg text-gray-600">Choose the approach that works best for your team</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
            
            {/* Main Offer */}
            <div className="bg-white p-10 rounded-xl shadow-lg border-2 border-blue-500">
              <p className="text-sm uppercase tracking-wide text-blue-600 font-semibold mb-2">Project</p>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Dedicated Automation & AI Partner</h3>
              <p className="text-gray-600 mb-6">starting at</p>
              <p className="text-5xl font-extrabold text-gray-900 mb-8">$7,499</p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-700">Dedicated AI Agent engineering team building solutions tailored to your business needs</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-700">Senior automation and AI specialists with years of experience</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-700">Automation projects delivered within 30-60 days, continuously updated with the latest tech</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-700">Personalized onboarding, 1-on-1 walkthrough of your solutions, and hands-on orientation for your team</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-700">No long-term commitment - keep everything, pay no additional fees</span>
                </li>
              </ul>
              
              <Link href="#contact" className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center font-medium py-4 rounded-md text-lg transition">
                Schedule a Discovery Call
              </Link>
            </div>

            {/* AI Implementation Plan Details */}
            <div className="bg-gray-50 p-10 rounded-xl border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What does a typical AI Implementation look like?</h3>
              <p className="text-gray-600 mb-6">Multiple of the following projects have been delivered to our clients, saving thousands of hours for teams:</p>
              
              <ul className="space-y-3">
                {pilotExamples.map((example, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-gray-700 text-sm">{example}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Benefits/ROI Section */}
        <section className="py-16 w-full max-w-6xl">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Don't wait</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">The impact on your business starts immediately</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white hover:bg-gray-900 p-8 rounded-xl shadow-sm border border-gray-200 transition-all duration-300 group cursor-pointer">
              <div className="text-5xl mb-4">🏆</div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-3 transition-colors">Return on Investment</h3>
              <p className="text-gray-700 group-hover:text-gray-100 mb-4 transition-colors">
                Implementing automation can generate an ROI between <strong>30% and 200%</strong> in the first year, mainly through FTE-time savings and increased efficiency.
              </p>
              <p className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">ServiceNow & FormStack</p>
            </div>
            
            <div className="bg-white hover:bg-gray-900 p-8 rounded-xl shadow-sm border border-gray-200 transition-all duration-300 group cursor-pointer">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-3 transition-colors">Faster to Market</h3>
              <p className="text-gray-700 group-hover:text-gray-100 mb-4 transition-colors">
                By expediting processes and reducing task completion time, automation <strong>accelerates the time to market for products and services</strong>, allowing businesses to capitalize on market opportunities more quickly, resulting in potential revenue gains and competitive advantages.
              </p>
              <p className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">manageengine</p>
            </div>
            
            <div className="bg-white hover:bg-gray-900 p-8 rounded-xl shadow-sm border border-gray-200 transition-all duration-300 group cursor-pointer">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-3 transition-colors">Team Support</h3>
              <p className="text-gray-700 group-hover:text-gray-100 mb-4 transition-colors">
                Approximately <strong>68% of employees report suffering from work overload</strong>, where they have too much to handle daily, often due to manual processes that could be streamlined through automation.
              </p>
              <p className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">thinkautomation</p>
            </div>
            
            <div className="bg-white hover:bg-gray-900 p-8 rounded-xl shadow-sm border border-gray-200 transition-all duration-300 group cursor-pointer">
              <div className="text-5xl mb-4">⏳</div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-3 transition-colors">Time to Stop Burnout</h3>
              <p className="text-gray-700 group-hover:text-gray-100 mb-4 transition-colors">
                Employees spend an average of <strong>51% of their workday on repetitive tasks</strong>, which can lead to significant inefficiencies and burnout.
              </p>
              <p className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">Flowforma</p>
            </div>
            
            <div className="bg-white hover:bg-gray-900 p-8 rounded-xl shadow-sm border border-gray-200 transition-all duration-300 group cursor-pointer">
              <div className="text-5xl mb-4">⭐</div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-3 transition-colors">Customer Satisfaction</h3>
              <p className="text-gray-700 group-hover:text-gray-100 mb-4 transition-colors">
                Proactive customer solutions, such as automated satisfaction surveys and personalised emails guiding customers from onboarding to registration <strong>improve customer satisfaction scores</strong>.
              </p>
              <p className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">Robinwaite</p>
            </div>
            
            <div className="bg-white hover:bg-gray-900 p-8 rounded-xl shadow-sm border border-gray-200 transition-all duration-300 group cursor-pointer">
              <div className="text-5xl mb-4">📢</div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-3 transition-colors">Employee Retention</h3>
              <p className="text-gray-700 group-hover:text-gray-100 mb-4 transition-colors">
                Automated systems often integrate collaborative tools that <strong>enhance communication among team members</strong>. This fosters a culture of trust and teamwork, reducing misunderstandings and conflicts, which contributes positively to employee satisfaction.
              </p>
              <p className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">Business-reporter</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 w-full max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Everything you need to know about working with us</p>
          </div>
          
          <div className="space-y-4">
            <details className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <summary className="font-semibold text-lg text-gray-900 cursor-pointer">How does the engagement process work?</summary>
              <p className="mt-4 text-gray-600">We begin with a discovery call to understand your operational challenges and automation opportunities. Our team works collaboratively with your stakeholders to identify high-impact projects and design a pilot program that maximizes ROI. We then build custom automation solutions using enterprise-grade platforms like n8n and proprietary code, incorporating your feedback throughout the development cycle. You'll receive thoroughly tested, production-ready automations with comprehensive documentation and team training.</p>
            </details>
            
            <details className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <summary className="font-semibold text-lg text-gray-900 cursor-pointer">Will our team be able to maintain these workflows independently?</summary>
              <p className="mt-4 text-gray-600">Absolutely. We build solutions using accessible, enterprise-grade platforms like n8n that your team can manage without specialized development resources. We provide comprehensive training and documentation, empowering your team to modify and extend workflows as your business needs evolve.</p>
            </details>
            
            <details className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <summary className="font-semibold text-lg text-gray-900 cursor-pointer">Why partner with us instead of hiring full-time automation engineers?</summary>
              <p className="mt-4 text-gray-600">Mid-level automation engineers command $80-200K annually, plus benefits and overhead. Even when hired, they're often consumed by existing technical debt and infrastructure maintenance. Our model gives you immediate access to senior automation specialists who focus exclusively on delivering measurable business value—at a fraction of the cost of a full-time hire. You gain enterprise-level expertise without the long-term commitment or hiring risks.</p>
            </details>
            
            <details className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <summary className="font-semibold text-lg text-gray-900 cursor-pointer">What is n8n and why do you use it?</summary>
              <p className="mt-4 text-gray-600">n8n is an enterprise-grade workflow automation platform that enables businesses to orchestrate complex, repeatable processes across multiple systems through API-based integrations. Unlike competitors such as Zapier, n8n offers unlimited workflows without per-execution costs, making it highly scalable for growing organizations. As a self-hosted solution, it provides complete control over your data and security posture. We leverage n8n to build production-grade automations for recurring business processes—invoice processing, lead routing, inventory management, customer onboarding—ensuring your team can maintain and modify these workflows long-term without dependency on external developers.</p>
            </details>
            
            <details className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <summary className="font-semibold text-lg text-gray-900 cursor-pointer">What are MCP servers and how do they complement workflow automation?</summary>
              <p className="mt-4 text-gray-600">MCP (Model Context Protocol) servers enable AI agents to interact directly with your business systems for discovery, configuration, and maintenance tasks. While n8n handles structured, repeatable workflows, MCP servers excel at exploratory work—analyzing your existing data structures, troubleshooting integration issues, configuring new system connections, and performing ad-hoc data migrations. This AI-powered layer accelerates implementation timelines and enables intelligent system management that adapts to your environment. Together, n8n and MCP servers provide both the automation infrastructure and the intelligent tooling needed to rapidly deploy and maintain complex integrations across your technology stack.</p>
            </details>
            
            <details className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <summary className="font-semibold text-lg text-gray-900 cursor-pointer">What is the lifecycle of these automation solutions?</summary>
              <p className="mt-4 text-gray-600">Our automations are designed for continuous, long-term operation—running 24/7 to eliminate repetitive manual tasks. You maintain full ownership and control, with the ability to modify or extend them as your business evolves. We provide comprehensive documentation and training to ensure your team can manage these solutions independently.</p>
            </details>
            
            <details className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <summary className="font-semibold text-lg text-gray-900 cursor-pointer">What technology stack do you work with?</summary>
              <p className="mt-4 text-gray-600">We leverage a dual-platform approach optimized for different automation needs. For repeatable workflows and complex multi-step processes requiring API-based integrations, we build on n8n—a powerful enterprise automation platform with native connectors for 99% of business applications. It offers superior flexibility and cost-effectiveness compared to platforms like Zapier and Make. For data discovery, system configuration, and maintenance tasks, we utilize MCP (Model Context Protocol) servers, which enable AI agents to interact directly with your systems for setup, troubleshooting, and ongoing optimization. This versatile architecture allows us to integrate with virtually any system in your technology ecosystem, regardless of its architecture or API structure.</p>
            </details>
            
            <details className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <summary className="font-semibold text-lg text-gray-900 cursor-pointer">What are the ongoing infrastructure costs?</summary>
              <p className="mt-4 text-gray-600">You'll need to maintain hosting infrastructure for n8n, typically around $30-50 per month depending on your automation complexity and volume. This ensures your automations run continuously with high availability. This is a minimal operational expense compared to the labor costs being eliminated—our clients typically save $90,000-120,000 annually in productivity gains.</p>
            </details>
            
            <details className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <summary className="font-semibold text-lg text-gray-900 cursor-pointer">Which platforms and systems can you integrate?</summary>
              <p className="mt-4 text-gray-600">We integrate with virtually all business software platforms. If a system has an API (REST, GraphQL, SOAP, etc.), we can connect it seamlessly. For legacy systems without modern APIs, we employ alternative integration methods including RPA, file-based transfers, and database connections. Our team has experience across CRMs, ERPs, marketing automation, e-commerce, financial systems, and custom enterprise applications.</p>
            </details>
            
            <details className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <summary className="font-semibold text-lg text-gray-900 cursor-pointer">How do you ensure data security and compliance?</summary>
              <p className="mt-4 text-gray-600">All automations are deployed on infrastructure you own and control, ensuring your data never leaves your security perimeter. Integrations use secure, encrypted connections with enterprise-grade authentication (OAuth 2.0, API keys, JWT tokens). Since n8n is self-hosted, you maintain complete control over data retention, access policies, and compliance requirements. We follow security best practices including least-privilege access, credential encryption, and comprehensive audit logging.</p>
            </details>
            
            <details className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <summary className="font-semibold text-lg text-gray-900 cursor-pointer">What if the delivered solution doesn't meet our expectations?</summary>
              <p className="mt-4 text-gray-600">We work iteratively with your team throughout the development process to ensure alignment with your requirements. If any aspect of the delivered solution doesn't meet expectations, we'll continue refining until you're completely satisfied. Our goal is to deliver measurable business value and ensure you have automation solutions that truly transform your operations.</p>
            </details>
          </div>
        </section>

        {/* Final CTA Section */}
        <section id="contact" className="text-center max-w-3xl mx-auto mt-12 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ready to transform your operations?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Schedule a 15-minute discovery call to discuss how automation and AI can eliminate bottlenecks, reduce costs, and accelerate your growth.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/contact" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-10 rounded-md text-lg transition inline-block">
              Schedule Discovery Call
            </Link>
            <Link href="mailto:info@forgemission.com" className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-4 px-10 rounded-md text-lg transition inline-block border border-gray-300">
              Email Us Instead
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

