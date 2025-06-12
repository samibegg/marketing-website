import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header'; // Adjust path as needed
import Footer from '../../components/Footer'; // Adjust path as needed

// --- ITSupportBot Page ---
export default function ITSupportBot() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Head>
        <title>AI IT Help Desk & Knowledge Base</title>
        <meta name="description" content="Streamline IT support with an AI-powered chatbot." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      {/* Main content area: added padding-top for header, flex-grow to push footer down */}
      <main className="flex-grow flex flex-col items-center pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg p-8 sm:p-10 lg:p-12">
          <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-6">
            Streamline Your Support: The AI-Powered IT Help Desk & Knowledge Base
          </h1>
          <p className="mt-3 text-xl text-gray-700 text-center leading-relaxed">
            <span className="font-bold text-indigo-600">"Unlock 24/7 Support & Boost Efficiency with Your AI IT Assistant!"</span>
            This intelligent chatbot liberates your IT consultants from repetitive questions, providing instant answers to clients and internal staff around the clock. Reduce response times, empower self-service, and allow your experts to focus on complex, high-value tasks. It's not just support; it's a strategic shift towards proactive client engagement and optimized resource allocation.
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
                  <li><strong className="text-indigo-600">24/7 Instant Answers:</strong> Provide immediate support to clients and internal teams, regardless of business hours. No more waiting for a human agent for common issues.</li>
                  <li><strong className="text-indigo-600">Reduced Workload for IT Staff:</strong> Automate responses to frequently asked questions, freeing up your valuable IT consultants to tackle complex, high-impact projects and strategic initiatives.</li>
                  <li><strong className="text-indigo-600">Improved Client Satisfaction:</strong> Clients get faster resolutions and feel more empowered with self-service options, leading to a better overall experience.</li>
                  <li><strong className="text-indigo-600">Consistent Information:</strong> Ensure that all support responses are accurate and consistent, as they're drawn from a centralized, AI-powered knowledge base.</li>
                  <li><strong className="text-indigo-600">Scalability:</strong> Easily handle increased support volumes without proportionally increasing staffing costs, making your operations more scalable and efficient.</li>
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
                  <li><strong className="text-indigo-600">Save Time & Money:</strong> Significant reduction in operational costs associated with front-line support.</li>
                  <li><strong className="text-indigo-600">Enhanced Productivity:</strong> Your expert team can focus on innovation and high-value tasks.</li>
                  <li><strong className="text-indigo-600">Proactive Problem Solving:</strong> Identify trends in queries to preemptively address common issues.</li>
                  <li><strong className="text-indigo-600">Data-Driven Insights:</strong> Gain insights into common client pain points and knowledge gaps.</li>
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
                  <li><strong className="text-gray-900">Data Sourcing & Ingestion:</strong> The bot is trained on your existing support tickets, FAQs, internal documentation, and knowledge base articles. We'll integrate with common ticketing systems (e.g., Zendesk, ServiceNow, Freshdesk) for seamless data collection.</li>
                  <li><strong className="text-gray-900">AI Model Training:</strong> We'll leverage advanced Natural Language Processing (NLP) models (like BERT or GPT variants) to enable the bot to understand user queries, extract their intent, and provide highly relevant, accurate responses. This involves careful training on your specific IT terminology and common support scenarios.</li>
                  <li><strong className="text-gray-900">User Interface (UI) Integration:</strong> The bot can be deployed as an interactive widget directly on your website, embedded within client portals, or integrated into popular internal communication platforms such as Slack or Microsoft Teams.</li>
                  <li><strong className="text-900">Intelligent Escalation:</strong> Critical for handling complex issues, the system includes built-in mechanisms to intelligently recognize when a human touch is required. It will seamlessly hand off the conversation to your support team, providing all prior chat context.</li>
                  <li><strong className="text-gray-900">Continuous Learning & Improvement:</strong> The AI isn't static. We'll implement feedback loops where your human agents can easily correct or refine bot responses, ensuring the AI continuously learns and improves its accuracy and effectiveness over time.</li>
                  <li><strong className="text-gray-900">Robust Security & Privacy:</strong> Data security is paramount. We'll ensure robust data encryption, access controls, and strict compliance with relevant data protection regulations (e.g., GDPR, HIPAA if applicable) to protect sensitive client and operational information.</li>
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
                    <tr><td className="px-3 py-4 text-sm font-medium text-gray-900">**Phase 1: Discovery & Planning**</td><td></td><td></td><td></td><td></td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">1.1 Requirements Gathering & Use Cases</td><td className="px-3 py-4 text-sm text-gray-700">2</td><td className="px-3 py-4 text-sm text-gray-700">1</td><td className="px-3 py-4 text-sm text-gray-700">2</td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">1.2 Technology Stack Selection</td><td className="px-3 py-4 text-sm text-gray-700">1</td><td className="px-3 py-4 text-sm text-gray-700">2</td><td className="px-3 py-4 text-sm text-gray-700">2</td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">1.3 Data Sourcing & Privacy Strategy</td><td className="px-3 py-4 text-sm text-gray-700">2</td><td className="px-3 py-4 text-sm text-gray-700">1</td><td className="px-3 py-4 text-sm text-gray-700">2</td></tr>
                    <tr><td className="px-3 py-4 text-sm font-medium text-gray-900">**Phase 2: Data Preparation & Model Training**</td><td></td><td></td><td></td><td></td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">2.1 Data Collection & Ingestion</td><td className="px-3 py-4 text-sm text-gray-700">4</td><td className="px-3 py-4 text-sm text-gray-700">3</td><td className="px-3 py-4 text-sm text-gray-700">6</td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">2.2 Data Cleaning & Annotation</td><td className="px-3 py-4 text-sm text-gray-700">5</td><td className="px-3 py-4 text-sm text-gray-700">3</td><td className="px-3 py-4 text-sm text-gray-700">7</td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">2.3 Initial AI Model Training & Testing</td><td className="px-3 py-4 text-sm text-gray-700">3</td><td className="px-3 py-4 text-sm text-gray-700">6</td><td className="px-3 py-4 text-sm text-gray-700">8</td></tr>
                    <tr><td className="px-3 py-4 text-sm font-medium text-gray-900">**Phase 3: Development & Integration**</td><td></td><td></td><td></td><td></td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">3.1 Core Bot Logic Development</td><td className="px-3 py-4 text-sm text-gray-700">4</td><td className="px-3 py-4 text-sm text-gray-700">7</td><td className="px-3 py-4 text-sm text-gray-700">10</td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">3.2 User Interface (Chat Widget) Dev</td><td className="px-3 py-4 text-sm text-gray-700">3</td><td className="px-3 py-4 text-sm text-gray-700">8</td><td className="px-3 py-4 text-sm text-gray-700">10</td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">3.3 Integration with External Systems</td><td className="px-3 py-4 text-sm text-gray-700">4</td><td className="px-3 py-4 text-sm text-gray-700">9</td><td className="px-3 py-4 text-sm text-gray-700">12</td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">3.4 Escalation & Handoff Mechanism Dev</td><td className="px-3 py-4 text-sm text-gray-700">2</td><td className="px-3 py-4 text-sm text-gray-700">10</td><td className="px-3 py-4 text-sm text-gray-700">11</td></tr>
                    <tr><td className="px-3 py-4 text-sm font-medium text-gray-900">**Phase 4: Testing & Deployment**</td><td></td><td></td><td></td><td></td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">4.1 Internal QA & User Acceptance Testing</td><td className="px-3 py-4 text-sm text-gray-700">3</td><td className="px-3 py-4 text-sm text-gray-700">11</td><td className="px-3 py-4 text-sm text-gray-700">13</td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">4.2 Security Audits & Compliance Checks</td><td className="px-3 py-4 text-sm text-gray-700">2</td><td className="px-3 py-4 text-sm text-gray-700">12</td><td className="px-3 py-4 text-sm text-gray-700">13</td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">4.3 Pilot Deployment & Feedback Collection</td><td className="px-3 py-4 text-sm text-gray-700">2</td><td className="px-3 py-4 text-sm text-gray-700">14</td><td className="px-3 py-4 text-sm text-gray-700">15</td></tr>
                    <tr><td className="px-3 py-4 text-sm font-medium text-gray-900">**Phase 5: Refinement & Launch**</td><td></td><td></td><td></td><td></td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">5.1 AI Model Refinement & Retraining</td><td className="px-3 py-4 text-sm text-gray-700">3</td><td className="px-3 py-4 text-sm text-gray-700">15</td><td className="px-3 py-4 text-sm text-gray-700">17</td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">5.2 Documentation & Training Materials</td><td className="px-3 py-4 text-sm text-gray-700">2</td><td className="px-3 py-4 text-sm text-gray-700">16</td><td className="px-3 py-4 text-sm text-gray-700">17</td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">5.3 Full Launch & Ongoing Monitoring</td><td className="px-3 py-4 text-sm text-gray-700">1</td><td className="px-3 py-4 text-sm text-gray-700">18</td><td className="px-3 py-4 text-sm text-gray-700">18</td></tr>
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