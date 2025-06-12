import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header'; // Adjust path as needed
import Footer from '../../components/Footer'; // Adjust path as needed

// --- ProposalGenerator Page ---
export default function ProposalGenerator() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Head>
        <title>AI Project Proposal Generator</title>
        <meta name="description" content="Generate IT project proposals rapidly with AI." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      {/* Main content area: added padding-top for header, flex-grow to push footer down */}
      <main className="flex-grow flex flex-col items-center pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg p-8 sm:p-10 lg:p-12">
          <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-6">
            Accelerate Your Deals: AI-Powered Project Proposal Generation
          </h1>
          <p className="mt-3 text-xl text-gray-700 text-center leading-relaxed">
            <span className="font-bold text-indigo-600">"Close Deals Faster: Generate Professional IT Project Proposals in Minutes, Not Hours!"</span>
            Eliminate the time-consuming drudgery of drafting project proposals from scratch. This AI-powered tool rapidly constructs comprehensive, customized proposals and statements of work, ensuring consistency, accuracy, and professionalism. Spend less time on administrative tasks and more time on client relationships and project execution, significantly boosting your sales velocity and client satisfaction.
          </p>

          <div className="mt-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-indigo-200 pb-2">
              Discover the Core Business Value
            </h2>

            <details className="group bg-indigo-50 rounded-lg p-6 mb-4 shadow-sm hover:shadow-md transition-shadow duration-300">
              <summary className="flex justify-between items-center cursor-pointer text-xl font-semibold text-indigo-700">
                Why You Need This AI Tool
                <svg className="h-6 w-6 transform group-open:rotate-180 transition-transform duration-300 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="mt-4 text-gray-700 leading-relaxed">
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong className="text-indigo-600">Rapid Proposal Creation:</strong> Generate full-fledged proposals in minutes, not hours or days, dramatically accelerating your sales cycle.</li>
                  <li><strong className="text-indigo-600">Enhanced Professionalism:</strong> Ensure every proposal is consistent, error-free, and professionally formatted, boosting your firm's credibility.</li>
                  <li><strong className="text-indigo-600">Increased Win Rates:</strong> Faster, more polished, and accurately scoped proposals can give you a significant competitive edge.</li>
                  <li><strong className="text-indigo-600">Standardization & Consistency:</strong> Maintain a high standard across all client communications by leveraging pre-approved templates and content.</li>
                  <li><strong className="text-indigo-600">Free Up Consultant Time:</strong> Reclaim valuable time spent on administrative tasks, allowing your consultants to focus on client engagement and strategic planning.</li>
                </ul>
              </div>
            </details>

            <details className="group bg-indigo-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <summary className="flex justify-between items-center cursor-pointer text-xl font-semibold text-indigo-700">
                Key Benefits at a Glance
                <svg className="h-6 w-6 transform group-open:rotate-180 transition-transform duration-300 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="mt-4 text-gray-700 leading-relaxed">
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong className="text-indigo-600">Sales Velocity Boost:</strong> Shorten your sales cycle and close more deals.</li>
                  <li><strong className="text-indigo-600">Reduced Human Error:</strong> Minimize typos and inconsistencies in proposals.</li>
                  <li><strong className="text-indigo-600">Scalable Sales Process:</strong> Easily handle an increased volume of proposals without adding staff.</li>
                  <li><strong className="text-indigo-600">Data-Driven Pricing:</strong> Leverage historical data for more accurate pricing models.</li>
                </ul>
              </div>
            </details>
          </div>

          <div className="mt-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-indigo-200 pb-2">
              See How It's Built: Implementation Details
            </h2>

            <details className="group bg-white rounded-lg p-6 mb-4 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200">
              <summary className="flex justify-between items-center cursor-pointer text-xl font-semibold text-gray-800">
                Core Implementation Steps
                <svg className="h-6 w-6 transform group-open:rotate-180 transition-transform duration-300 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="mt-4 text-gray-700 leading-relaxed">
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong className="text-gray-900">Intuitive Input Interface:</strong> We'll design a user-friendly interface where your consultants can quickly input key project parameters such as client name, industry, specific project type (e.g., "Network Security Audit," "Cloud Migration"), desired outcomes, budget, and any unique client requirements.</li>
                  <li><strong className="text-gray-900">Robust Content Library:</strong> A powerful backend system will house customizable templates, meticulously crafted scope descriptions, standard deliverables, estimated timelines, and refined pricing models for all your IT services. This library will be your central "source of truth" for proposal content.</li>
                  <li><strong className="text-gray-900">Intelligent AI Generation Engine:</strong> Leveraging advanced AI (combining NLP for understanding inputs and Natural Language Generation - NLG for writing), the engine will intelligently interpret your inputs, select the most relevant content from the library, and generate coherent, grammatically perfect prose for every section of the proposal. It can even suggest appropriate technologies, methodologies, and potential project risks.</li>
                  <li><strong className="text-gray-900">Flexible Customization & Editing Tools:</strong> We'll provide easy-to-use in-line editing tools that allow your consultants to fine-tune the AI-generated content, add specific client nuances, personalize the language, and make any final adjustments before the proposal is sent.</li>
                  <li><strong className="text-gray-900">Versatile Output Formats:</strong> The tool will support exporting proposals in professional formats such as PDF and Microsoft Word. We can also integrate it directly with your existing CRM systems (e.g., HubSpot, Salesforce) for a completely streamlined sales workflow.</li>
                  <li><strong className="text-gray-900">Version Control & Collaborative Features:</strong> To ensure smooth team operations, the system will include features for tracking changes, managing approvals, and facilitating seamless collaboration among team members on proposal drafts.</li>
                </ul>
              </div>
            </details>

            <details className="group bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200">
              <summary className="flex justify-between items-center cursor-pointer text-xl font-semibold text-gray-800">
                Estimated Project Plan: A High-Level Timeline
                <svg className="h-6 w-6 transform group-open:rotate-180 transition-transform duration-300 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="mt-4 text-gray-700 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Phase</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Task</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Duration (Weeks)</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Start Week</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">End Week</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    <tr><td className="px-3 py-4 text-sm font-medium text-gray-900">**Phase 1: Discovery & Content Strategy**</td><td></td><td></td><td></td><td></td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">1.1 Requirements & Proposal Structure Def.</td><td className="px-3 py-4 text-sm text-gray-700">2</td><td className="px-3 py-4 text-sm text-gray-700">1</td><td className="px-3 py-4 text-sm text-gray-700">2</td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">1.2 Content Library Design & Categorization</td><td className="px-3 py-4 text-sm text-gray-700">3</td><td className="px-3 py-4 text-sm text-gray-700">1</td><td className="px-3 py-4 text-sm text-gray-700">3</td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">1.3 AI Model Selection (NLP/NLG)</td><td className="px-3 py-4 text-sm text-gray-700">1</td><td className="px-3 py-4 text-sm text-gray-700">2</td><td className="px-3 py-4 text-sm text-gray-700">2</td></tr>
                    <tr><td className="px-3 py-4 text-sm font-medium text-gray-900">**Phase 2: Content Development & Data Prep**</td><td></td><td></td><td></td><td></td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">2.1 Develop Core Templates & Placeholders</td><td className="px-3 py-4 text-sm text-gray-700">4</td><td className="px-3 py-4 text-sm text-gray-700">3</td><td className="px-3 py-4 text-sm text-gray-700">6</td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">2.2 Populate Content Library (Scope, Deliverables, Pricing)</td><td className="px-3 py-4 text-sm text-gray-700">6</td><td className="px-3 py-4 text-sm text-gray-700">4</td><td className="px-3 py-4 text-sm text-gray-700">9</td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">2.3 Data Labeling & Annotation (if needed for NLG)</td><td className="px-3 py-4 text-sm text-gray-700">3</td><td className="px-3 py-4 text-sm text-gray-700">7</td><td className="px-3 py-4 text-sm text-gray-700">9</td></tr>
                    <tr><td className="px-3 py-4 text-sm font-medium text-gray-900">**Phase 3: Core System Development**</td><td></td><td></td><td></td><td></td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">3.1 Input Interface Development</td><td className="px-3 py-4 text-sm text-gray-700">3</td><td className="px-3 py-4 text-sm text-gray-700">8</td><td className="px-3 py-4 text-sm text-gray-700">10</td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">3.2 AI Proposal Generation Engine Dev</td><td className="px-3 py-4 text-sm text-gray-700">5</td><td className="px-3 py-4 text-sm text-gray-700">9</td><td className="px-3 py-4 text-sm text-gray-700">13</td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">3.3 Customization & Editing Tools Dev</td><td className="px-3 py-4 text-sm text-gray-700">4</td><td className="px-3 py-4 text-sm text-gray-700">10</td><td className="px-3 py-4 text-sm text-gray-700">13</td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">3.4 Output Formatting & Export Dev</td><td className="px-3 py-4 text-sm text-gray-700">2</td><td className="px-3 py-4 text-sm text-gray-700">12</td><td className="px-3 py-4 text-sm text-gray-700">13</td></tr>
                    <tr><td className="px-3 py-4 text-sm font-medium text-gray-900">**Phase 4: Testing & Integration**</td><td></td><td></td><td></td><td></td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">4.1 Internal Testing & Quality Assurance</td><td className="px-3 py-4 text-sm text-gray-700">3</td><td className="px-3 py-4 text-sm text-gray-700">14</td><td className="px-3 py-4 text-sm text-gray-700">16</td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">4.2 User Acceptance Testing (UAT)</td><td className="px-3 py-4 text-sm text-gray-700">2</td><td className="px-3 py-4 text-sm text-gray-700">15</td><td className="px-3 py-4 text-sm text-gray-700">16</td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">4.3 CRM Integration (if applicable)</td><td className="px-3 py-4 text-sm text-gray-700">2</td><td className="px-3 py-4 text-sm text-gray-700">15</td><td className="px-3 py-4 text-sm text-gray-700">16</td></tr>
                    <tr><td className="px-3 py-4 text-sm font-medium text-gray-900">**Phase 5: Deployment & Optimization**</td><td></td><td></td><td></td><td></td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">5.1 Documentation & User Training</td><td className="px-3 py-4 text-sm text-gray-700">2</td><td className="px-3 py-4 text-sm text-gray-700">17</td><td className="px-3 py-4 text-sm text-gray-700">18</td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">5.2 Deployment & Launch</td><td className="px-3 py-4 text-sm text-gray-700">1</td><td className="px-3 py-4 text-sm text-gray-700">18</td><td className="px-3 py-4 text-sm text-gray-700">18</td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">5.3 Post-Launch Monitoring & Refinement</td><td className="px-3 py-4 text-sm text-gray-700">Ongoing</td><td className="px-3 py-4 text-sm text-gray-700">18</td><td className="px-3 py-4 text-sm text-gray-700">Ongoing</td></tr>
                  </tbody>
                </table>
                <p className="mt-4 text-lg font-semibold text-gray-900 text-right">
                  Total Estimated Duration: Approximately 18 Weeks (4.5 Months)
                </p>
              </div>
            </details>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}