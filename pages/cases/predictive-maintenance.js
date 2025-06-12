import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header'; // Adjust path as needed
import Footer from '../../components/Footer'; // Adjust path as needed

// --- PredictiveMaintenance Page ---
export default function PredictiveMaintenance() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Head>
        <title>AI Predictive Maintenance</title>
        <meta name="description" content="Proactively detect IT issues with AI-powered predictive maintenance." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      {/* Main content area: added padding-top for header, flex-grow to push footer down */}
      <main className="flex-grow flex flex-col items-center pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg p-8 sm:p-10 lg:p-12">
          <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-6">
            Proactive IT: AI-Powered Predictive Maintenance & Anomaly Detection
          </h1>
          <p className="mt-3 text-xl text-gray-700 text-center leading-relaxed">
            <span className="font-bold text-indigo-600">"From Reactive to Proactive: Predict & Prevent IT Issues Before They Impact Your Clients!"</span>
            Transform your IT services by identifying potential system failures and performance degradation <strong className="text-indigo-600">before</strong> they occur. This AI tool continuously monitors client infrastructure data, leveraging advanced algorithms to detect subtle anomalies that humans might miss. Offer unparalleled uptime, reduce costly downtime for your clients, and solidify your reputation as an indispensable, forward-thinking IT partner.
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
                  <li><strong className="text-indigo-600">Prevent Costly Downtime:</strong> Identify and address potential issues before they cause system failures, saving your clients significant money and disruption.</li>
                  <li><strong className="text-indigo-600">Enhance Client Trust:</strong> Offer a truly proactive service, demonstrating your commitment to their operational stability and earning their deeper trust.</li>
                  <li><strong className="text-indigo-600">Optimize Resource Allocation:</strong> Shift from reactive firefighting to planned, preventative maintenance, allowing your team to work more efficiently.</li>
                  <li><strong className="text-indigo-600">Competitive Advantage:</strong> Stand out from competitors by offering cutting-edge, AI-driven predictive services.</li>
                  <li><strong className="text-indigo-600">Improved SLA Compliance:</strong> Consistently meet or exceed service level agreements by minimizing unexpected outages.</li>
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
                  <li><strong className="text-indigo-600">Maximized Uptime:</strong> Keep client systems running smoothly with minimal interruption.</li>
                  <li><strong className="text-indigo-600">Reduced Operational Costs:</strong> Fewer emergency fixes mean more efficient use of resources.</li>
                  <li><strong className="text-indigo-600">Stronger Client Relationships:</strong> Position yourself as a strategic, indispensable partner.</li>
                  <li><strong className="text-indigo-600">Data-Driven Decision Making:</strong> Use insights to optimize infrastructure and service delivery.</li>
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
                  <li><strong className="text-gray-900">Secure Data Ingestion & Connectors:</strong> The system is designed to securely connect and ingest data from a wide array of client systems. This includes network devices (routers, switches), servers (Windows, Linux), leading cloud platforms (AWS, Azure, GCP), various databases, and application logs. We'll build robust API integrations and custom data connectors.</li>
                  <li><strong className="text-gray-900">Sophisticated Data Pre-processing:</strong> Raw data is rarely ready for AI. We'll implement processes for cleaning, transforming, and normalizing diverse data streams. This includes handling time-series data, expert feature engineering, and advanced outlier removal to ensure data quality for analysis.</li>
                  <li><strong className="text-gray-900">Advanced Anomaly Detection Algorithms:</strong> We utilize cutting-edge machine learning algorithms (e.g., Isolation Forest, One-Class SVM, autoencoders, statistical process control) to learn what "normal" system behavior looks like. This allows the AI to precisely flag subtle deviations and precursors to failure.</li>
                  <li><strong className="text-gray-900">Configurable Alerting & Notification System:</strong> When anomalies or predictive failure indicators are detected, the system will trigger configurable alerts. These can be delivered via email, SMS, integrated into internal dashboards, or even push directly to your existing ticketing systems, ensuring your team is instantly aware. Alerts will include severity levels and critical contextual information.</li>
                  <li><strong className="text-gray-900">Assisted Root Cause Analysis:</strong> Beyond just detection, the AI can provide intelligent insights or suggestions on potential root causes of detected anomalies. This significantly aids your engineers in diagnosing problems faster and more accurately.</li>
                  <li><strong className="text-gray-900">Comprehensive Dashboard & Reporting:</strong> A user-friendly, intuitive dashboard will visualize system health, performance trends, detected anomalies, and a historical log of predictive alerts and their resolutions. This can be tailored for internal use or even adapted for client-facing reports to demonstrate value.</li>
                  <li><strong className="text-gray-900">Scalability & Enterprise-Grade Security:</strong> The architecture will be designed to handle large volumes of real-time data securely across multiple client environments. We prioritize robust data encryption, access management, and adherence to industry security best practices.</li>
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
                      <th scope="col" className="px-3 py-4 text-sm font-semibold text-gray-900">End Week</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    <tr><td className="px-3 py-4 text-sm font-medium text-gray-900">**Phase 1: Discovery & Data Architecture**</td><td></td><td></td><td></td><td></td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">1.1 Requirements & Client System Analysis</td><td className="px-3 py-4 text-sm text-gray-700">3</td><td className="px-3 py-4 text-sm text-gray-700">1</td><td className="px-3 py-4 text-sm text-gray-700">3</td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">1.2 Data Source Identification & Mapping</td><td className="px-3 py-4 text-sm text-gray-700">2</td><td className="px-3 py-4 text-sm text-gray-700">2</td><td className="px-3 py-4 text-sm text-gray-700">3</td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">1.3 Data Architecture & Security Design</td><td className="px-3 py-4 text-sm text-gray-700">2</td><td className="px-3 py-4 text-sm text-gray-700">3</td><td className="px-3 py-4 text-sm text-gray-700">4</td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">1.4 AI Algorithm Selection</td><td className="px-3 py-4 text-sm text-gray-700">1</td><td className="px-3 py-4 text-sm text-gray-700">3</td><td className="px-3 py-4 text-sm text-gray-700">3</td></tr>
                    <tr><td className="px-3 py-4 text-sm font-medium text-gray-900">**Phase 2: Data Ingestion & Pre-processing**</td><td></td><td></td><td></td><td></td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">2.1 Develop Data Connectors & APIs</td><td className="px-3 py-4 text-sm text-gray-700">5</td><td className="px-3 py-4 text-sm text-gray-700">4</td><td className="px-3 py-4 text-sm text-gray-700">8</td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">2.2 Build Data Pipelines & ETL Processes</td><td className="px-3 py-4 text-sm text-gray-700">4</td><td className="px-3 py-4 text-sm text-gray-700">5</td><td className="px-3 py-4 text-sm text-gray-700">8</td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">2.3 Data Normalization & Feature Engineering</td><td className="px-3 py-4 text-sm text-gray-700">3</td><td className="px-3 py-4 text-sm text-gray-700">7</td><td className="px-3 py-4 text-sm text-gray-700">9</td></tr>
                    <tr><td className="px-3 py-4 text-sm font-medium text-gray-900">**Phase 3: AI Model Development & Core System**</td><td></td><td></td><td></td><td></td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">3.1 Initial Model Training & Calibration</td><td className="px-3 py-4 text-sm text-gray-700">4</td><td className="px-3 py-4 text-sm text-gray-700">9</td><td className="px-3 py-4 text-sm text-gray-700">12</td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">3.2 Anomaly Detection Engine Development</td><td className="px-3 py-4 text-sm text-gray-700">5</td><td className="px-3 py-4 text-sm text-gray-700">10</td><td className="px-3 py-4 text-sm text-gray-700">14</td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">3.3 Alerting & Notification System Dev</td><td className="px-3 py-4 text-sm text-gray-700">3</td><td className="px-3 py-4 text-sm text-gray-700">12</td><td className="px-3 py-4 text-sm text-gray-700">14</td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">3.4 Dashboard & Reporting UI Dev</td><td className="px-3 py-4 text-sm text-gray-700">4</td><td className="px-3 py-4 text-sm text-gray-700">11</td><td className="px-3 py-4 text-sm text-gray-700">14</td></tr>
                    <tr><td className="px-3 py-4 text-sm font-medium text-gray-900">**Phase 4: Testing & Pilot Deployment**</td><td></td><td></td><td></td><td></td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">4.1 Integration Testing (Data -&gt Model -&gt Alerts)</td><td className="px-3 py-4 text-sm text-gray-700">3</td><td className="px-3 py-4 text-sm text-gray-700">15</td><td className="px-3 py-4 text-sm text-gray-700">17</td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">4.2 Security & Performance Testing</td><td className="px-3 py-4 text-sm text-gray-700">2</td><td className="px-3 py-4 text-sm text-gray-700">16</td><td className="px-3 py-4 text-sm text-gray-700">17</td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">4.3 Pilot Program with Select Clients</td><td className="px-3 py-4 text-sm text-gray-700">4</td><td className="px-3 py-4 text-sm text-gray-700">18</td><td className="px-3 py-4 text-sm text-gray-700">21</td></tr>
                    <tr><td className="px-3 py-4 text-sm font-medium text-gray-900">**Phase 5: Refinement & Launch**</td><td></td><td></td><td></td><td></td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">5.1 Model Refinement (based on pilot)</td><td className="px-3 py-4 text-sm text-gray-700">3</td><td className="px-3 py-4 text-sm text-gray-700">20</td><td className="px-3 py-4 text-sm text-gray-700">22</td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">5.2 Documentation & Training</td><td className="px-3 py-4 text-sm text-gray-700">2</td><td className="px-3 py-4 text-sm text-gray-700">21</td><td className="px-3 py-4 text-sm text-gray-700">22</td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">5.3 Full Launch & Ongoing Monitoring</td><td className="px-3 py-4 text-sm text-gray-700">1</td><td className="px-3 py-4 text-sm text-gray-700">23</td><td className="px-3 py-4 text-sm text-gray-700">23</td></tr>
                  </tbody>
                </table>
                <p className="mt-4 text-lg font-semibold text-gray-900 text-right">
                  Total Estimated Duration: Approximately 23 Weeks (Approx. 5.75 Months)
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