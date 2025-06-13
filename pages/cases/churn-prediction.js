import Head from 'next/head';
import Header from '../../components/Header'; // Adjust path as needed
import Footer from '../../components/Footer'; // Adjust path as needed
import Link from 'next/link';

// --- Churn Prediction Page ---
export default function ChurnPrediction() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Head>
        <title>AI Customer Churn Prediction</title>
        <meta name="description" content="Predict and prevent customer churn with AI." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex-grow flex flex-col items-center pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg p-8 sm:p-10 lg:p-12">
          <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-6">
            Keep Your Customers: AI-Powered Customer Churn Prediction & Retention
          </h1>
          <p className="mt-3 text-xl text-gray-700 text-center leading-relaxed">
            <span className="font-bold text-indigo-600">"Retain More, Grow More: Predict Churn Before It Happens and Actively Keep Your Best Customers!"</span>
            For any small business, retaining existing customers is far more cost-effective than acquiring new ones. This AI tool analyzes customer behavior, purchase history, engagement data, and feedback to predict which customers are at risk of churning. By identifying these "at-risk" customers early, you can proactively intervene with targeted retention strategies, personalized offers, or enhanced support, significantly boosting customer lifetime value and long-term revenue.
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
                  <li><strong className="text-indigo-600">Proactive Retention:</strong> Identify customers at risk of leaving *before* they churn, allowing for timely intervention.</li>
                  <li><strong className="text-indigo-600">Increased Customer Lifetime Value (CLTV):</strong> By retaining customers longer, you maximize the revenue generated from each one.</li>
                  <li><strong className="text-indigo-600">Optimized Marketing Spend:</strong> Focus retention efforts on the right customers, rather than broad, expensive acquisition campaigns.</li>
                  <li><strong className="text-indigo-600">Enhanced Customer Understanding:</strong> Gain deep insights into factors causing churn, enabling you to improve products and services.</li>
                  <li><strong className="text-indigo-600">Improved Customer Relationships:</strong> Personalized outreach based on churn prediction shows customers you value their business.</li>
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
                  <li><strong className="text-indigo-600">Higher Retention Rates:</strong> Directly impacts your bottom line by keeping more customers.</li>
                  <li><strong className="text-indigo-600">Smarter Resource Allocation:</strong> Direct your customer success team where they can make the most impact.</li>
                  <li><strong className="text-indigo-600">Actionable Insights:</strong> Understand *why* customers might leave and fix root causes.</li>
                  <li><strong className="text-indigo-600">Personalized Engagement:</strong> Deliver the right message to the right customer at the right time.</li>
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
                  <li><strong className="text-gray-900">Data Integration:</strong> Securely connect to your existing CRM, sales, marketing automation, and customer support platforms (e.g., HubSpot, Salesforce, Mailchimp, Zendesk) to collect comprehensive customer data.</li>
                  <li><strong className="text-gray-900">Feature Engineering:</strong> Extract relevant features from your customer data such as purchase frequency, average order value, last interaction date, support ticket history, website activity, product usage, and demographic information.</li>
                  <li><strong className="text-gray-900">Machine Learning Model Development:</strong> Train a sophisticated classification model (e.g., Logistic Regression, Random Forest, Gradient Boosting, or neural networks) using your historical churn data to accurately predict the likelihood of future churn.</li>
                  <li><strong className="text-gray-900">Churn Score & Segmentation:</strong> The system will assign a real-time "churn score" to each customer, automatically segmenting them into risk categories (e.g., Low, Medium, High Risk) for easy prioritization.</li>
                  <li><strong className="text-gray-900">Alerting & Action Triggers:</strong> Implement automated notifications to alert your sales or customer success teams about high-risk customers. The system can also trigger automated, personalized outreach campaigns (e.g., targeted discount offers, "we miss you" emails, personalized surveys) directly within your integrated marketing platforms.</li>
                  <li><strong className="text-gray-900">Dashboard & Reporting:</strong> Develop an intuitive, user-friendly dashboard that visualizes churn trends, identifies top factors contributing to churn, and tracks the real-time effectiveness of your retention campaigns and interventions.</li>
                  <li><strong className="text-gray-900">Continuous Learning & Optimization:</strong> The AI model is designed for continuous improvement. It will automatically learn from new customer data and the outcomes of your retention efforts, constantly refining its predictive accuracy over time.</li>
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
                    <tr><td className="px-3 py-4 text-sm font-medium text-gray-900">**Phase 1: Discovery & Data Strategy**</td><td></td><td></td><td></td><td></td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">1.1 Define Objectives & Churn Definition</td><td className="px-3 py-4 text-sm text-gray-700">2</td><td className="px-3 py-4 text-sm text-gray-700">1</td><td className="px-3 py-4 text-sm text-gray-700">2</td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">1.2 Data Source Identification & Mapping</td><td className="px-3 py-4 text-sm text-gray-700">3</td><td className="px-3 py-4 text-sm text-gray-700">1</td><td className="px-3 py-4 text-sm text-gray-700">3</td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">1.3 Technology & ML Algorithm Selection</td><td className="px-3 py-4 text-sm text-gray-700">1</td><td className="px-3 py-4 text-sm text-gray-700">2</td><td className="px-3 py-4 text-sm text-gray-700">2</td></tr>
                    <tr><td className="px-3 py-4 text-sm font-medium text-gray-900">**Phase 2: Data Engineering & Model Training**</td><td></td><td></td><td></td><td></td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">2.1 Data Collection & ETL Pipeline Development</td><td className="px-3 py-4 text-sm text-gray-700">4</td><td className="px-3 py-4 text-sm text-gray-700">3</td><td className="px-3 py-4 text-sm text-gray-700">6</td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">2.2 Data Cleaning, Preprocessing & Feature Engineering</td><td className="px-3 py-4 text-sm text-gray-700">5</td><td className="px-3 py-4 text-sm text-gray-700">4</td><td className="px-3 py-4 text-sm text-gray-700">8</td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">2.3 ML Model Training & Initial Validation</td><td className="px-3 py-4 text-sm text-gray-700">4</td><td className="px-3 py-4 text-sm text-gray-700">7</td><td className="px-3 py-4 text-sm text-gray-700">10</td></tr>
                    <tr><td className="px-3 py-4 text-sm font-medium text-gray-900">**Phase 3: System Development & Integration**</td><td></td><td></td><td></td><td></td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">3.1 Churn Score Calculation & Segmentation Logic</td><td className="px-3 py-4 text-sm text-gray-700">3</td><td className="px-3 py-4 text-sm text-gray-700">9</td><td className="px-3 py-4 text-sm text-gray-700">11</td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">3.2 Alerting & Notification System Development</td><td className="px-3 py-4 text-sm text-gray-700">2</td><td className="px-3 py-4 text-sm text-gray-700">11</td><td className="px-3 py-4 text-sm text-gray-700">12</td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">3.3 Dashboard & Reporting UI Development</td><td className="px-3 py-4 text-sm text-gray-700">4</td><td className="px-3 py-4 text-sm text-gray-700">10</td><td className="px-3 py-4 text-sm text-gray-700">13</td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">3.4 Integration with CRM/Marketing Automation</td><td className="px-3 py-4 text-sm text-gray-700">3</td><td className="px-3 py-4 text-sm text-gray-700">12</td><td className="px-3 py-4 text-sm text-gray-700">14</td></tr>
                    <tr><td className="px-3 py-4 text-sm font-medium text-gray-900">**Phase 4: Testing & Pilot Deployment**</td><td></td><td></td><td></td><td></td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">4.1 Internal QA & Model Performance Testing</td><td className="px-3 py-4 text-sm text-gray-700">3</td><td className="px-3 py-4 text-sm text-gray-700">14</td><td className="px-3 py-4 text-sm text-gray-700">16</td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">4.2 User Acceptance Testing (UAT) & Feedback</td><td className="px-3 py-4 text-sm text-gray-700">2</td><td className="px-3 py-4 text-sm text-gray-700">15</td><td className="px-3 py-4 text-sm text-gray-700">16</td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">4.3 Pilot Program with Select Customer Segments</td><td className="px-3 py-4 text-sm text-gray-700">3</td><td className="px-3 py-4 text-sm text-gray-700">17</td><td className="px-3 py-4 text-sm text-gray-700">19</td></tr>
                    <tr><td className="px-3 py-4 text-sm font-medium text-gray-900">**Phase 5: Refinement & Launch**</td><td></td><td></td><td></td><td></td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">5.1 Model Refinement & Retraining (Post-Pilot)</td><td className="px-3 py-4 text-sm text-gray-700">2</td><td className="px-3 py-4 text-sm text-gray-700">19</td><td className="px-3 py-4 text-sm text-gray-700">20</td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">5.2 Documentation & Team Training</td><td className="px-3 py-4 text-sm text-gray-700">2</td><td className="px-3 py-4 text-sm text-gray-700">18</td><td className="px-3 py-4 text-sm text-gray-700">19</td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">5.3 Full Rollout & Ongoing Monitoring</td><td className="px-3 py-4 text-sm text-gray-700">1</td><td className="px-3 py-4 text-sm text-gray-700">20</td><td className="px-3 py-4 text-sm text-gray-700">20</td></tr>
                  </tbody>
                </table>
                <p className="mt-4 text-lg font-semibold text-gray-900 text-right">
                  Total Estimated Duration: Approximately 20 Weeks (5 Months)
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
