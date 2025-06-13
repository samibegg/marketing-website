import Head from 'next/head';
import Header from '../../components/Header'; // Adjust path as needed
import Footer from '../../components/Footer'; // Adjust path as needed
import Link from 'next/link';

// --- Inventory Forecasting Page ---
export default function InventoryForecasting() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Head>
        <title>AI Inventory & Demand Forecasting</title>
        <meta name="description" content="Optimize inventory and predict demand with AI." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex-grow flex flex-col items-center pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg p-8 sm:p-10 lg:p-12">
          <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-6">
            Smart Stock: AI-Driven Inventory & Demand Forecasting
          </h1>
          <p className="mt-3 text-xl text-gray-700 text-center leading-relaxed">
            <span className="font-bold text-indigo-600">"Never Miss a Sale or Overstock Again: Precision Inventory with AI Demand Forecasting!"</span>
            For retail, e-commerce, or any business that manages physical products, this tool uses AI to accurately predict future demand and optimize inventory levels. It minimizes stockouts, reduces overstocking (and associated carrying costs), improves cash flow, and ensures products are always available when customers want them, leading to increased sales and customer satisfaction.
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
                  <li><strong className="text-indigo-600">Minimize Stockouts:</strong> Ensure popular products are always in stock, preventing lost sales and customer frustration.</li>
                  <li><strong className="text-indigo-600">Reduce Carrying Costs:</strong> Avoid excessive inventory, saving on storage, insurance, and obsolescence expenses.</li>
                  <li><strong className="text-indigo-600">Improve Cash Flow:</strong> Tie up less capital in stagnant inventory, freeing up funds for other business needs.</li>
                  <li><strong className="text-indigo-600">Enhanced Customer Satisfaction:</strong> Meet customer demand consistently, leading to happier, more loyal customers.</li>
                  <li><strong className="text-indigo-600">Smarter Purchasing Decisions:</strong> Make data-driven decisions on what, when, and how much to order.</li>
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
                  <li><strong className="text-indigo-600">Increased Sales:</strong> Always have what customers want, when they want it.</li>
                  <li><strong className="text-indigo-600">Lower Operational Costs:</strong> Reduce waste and storage expenses.</li>
                  <li><strong className="text-indigo-600">Optimized Capital:</strong> Free up working capital from overstocked inventory.</li>
                  <li><strong className="text-indigo-600">Streamlined Operations:</strong> Automate ordering and inventory management processes.</li>
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
                  <li><strong className="text-gray-900">Historical Data Ingestion:</strong> Gather past sales data, existing inventory levels, promotional calendars, seasonal trends, and relevant external factors (e.g., local events, economic indicators, public holidays) to build a rich dataset for analysis.</li>
                  <li><strong className="text-gray-900">Time-Series Forecasting Models:</strong> Employ advanced time-series models (e.g., ARIMA, Prophet, LSTM neural networks) tailored to your business data to analyze historical patterns and generate accurate predictions of future demand.</li>
                  <li><strong className="text-gray-900">Inventory Optimization Algorithms:</strong> Utilize sophisticated optimization algorithms that factor in predicted demand, supplier lead times, and your desired service levels to recommend optimal reorder points, precise order quantities, and appropriate safety stock levels for each product.</li>
                  <li><strong className="text-gray-900">Integration with POS/ERP:</strong> Seamlessly connect with your existing Point-of-Sale (POS) and Enterprise Resource Planning (ERP) systems (e.g., Shopify, Square, QuickBooks, NetSuite). This ensures real-time inventory updates and allows for automated order suggestions directly within your current workflow.</li>
                  <li><strong className="text-gray-900">Automated Alerts & Notifications:</strong> Configure the system to automatically notify you about potential stockouts, situations of overstock, or upcoming periods of peak demand, enabling proactive management.</li>
                  <li><strong className="text-gray-900">Scenario Planning & Simulation:</strong> Incorporate features that allow users to simulate the impact of different promotions, external market shifts, or unforeseen events on demand forecasts, providing flexibility in planning.</li>
                  <li><strong className="text-gray-900">Supplier Management Insights:</strong> The tool can also provide insights to optimize ordering schedules and communication with your suppliers, ensuring better alignment with predicted needs and lead times.</li>
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
                    <tr><td className="px-3 py-4 text-sm font-medium text-gray-900">**Phase 1: Discovery & Data Scoping**</td><td></td><td></td><td></td><td></td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">1.1 Define Forecasting Objectives & KPIs</td><td className="px-3 py-4 text-sm text-gray-700">2</td><td className="px-3 py-4 text-sm text-gray-700">1</td><td className="px-3 py-4 text-sm text-gray-700">2</td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">1.2 Identify Data Sources (Sales, Inventory, Promotions)</td><td className="px-3 py-4 text-sm text-gray-700">3</td><td className="px-3 py-4 text-sm text-gray-700">1</td><td className="px-3 py-4 text-sm text-gray-700">3</td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">1.3 Choose Forecasting & Optimization Models</td><td className="px-3 py-4 text-sm text-gray-700">2</td><td className="px-3 py-4 text-sm text-gray-700">2</td><td className="px-3 py-4 text-sm text-gray-700">3</td></tr>
                    <tr><td className="px-3 py-4 text-sm font-medium text-gray-900">**Phase 2: Data Engineering & Model Development**</td><td></td><td></td><td></td><td></td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">2.1 Data Collection, ETL & Data Lake Setup</td><td className="px-3 py-4 text-sm text-gray-700">4</td><td className="px-3 py-4 text-sm text-gray-700">3</td><td className="px-3 py-4 text-sm text-gray-700">6</td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">2.2 Data Cleaning, Transformation & Feature Engineering</td><td className="px-3 py-4 text-sm text-gray-700">4</td><td className="px-3 py-4 text-sm text-gray-700">5</td><td className="px-3 py-4 text-sm text-gray-700">8</td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">2.3 Develop & Train Forecasting Models</td><td className="px-3 py-4 text-sm text-gray-700">5</td><td className="px-3 py-4 text-sm text-gray-700">7</td><td className="px-3 py-4 text-sm text-gray-700">11</td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">2.4 Develop & Implement Inventory Optimization Logic</td><td className="px-3 py-4 text-sm text-gray-700">4</td><td className="px-3 py-4 text-sm text-gray-700">8</td><td className="px-3 py-4 text-sm text-gray-700">11</td></tr>
                    <tr><td className="px-3 py-4 text-sm font-medium text-gray-900">**Phase 3: Application Development & Integration**</td><td></td><td></td><td></td><td></td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">3.1 User Interface (Dashboard & Recommendations) Dev</td><td className="px-3 py-4 text-sm text-gray-700">4</td><td className="px-3 py-4 text-sm text-gray-700">10</td><td className="px-3 py-4 text-sm text-gray-700">13</td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">3.2 POS/ERP Integration & Data Synchronization</td><td className="px-3 py-4 text-sm text-gray-700">3</td><td className="px-3 py-4 text-sm text-gray-700">12</td><td className="px-3 py-4 text-sm text-gray-700">14</td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">3.3 Alerting & Notification System</td><td className="px-3 py-4 text-sm text-gray-700">2</td><td className="px-3 py-4 text-sm text-gray-700">13</td><td className="px-3 py-4 text-sm text-gray-700">14</td></tr>
                    <tr><td className="px-3 py-4 text-sm font-medium text-gray-900">**Phase 4: Testing & Pilot**</td><td></td><td></td><td></td><td></td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">4.1 Internal QA & Accuracy Validation</td><td className="px-3 py-4 text-sm text-gray-700">3</td><td className="px-3 py-4 text-sm text-gray-700">15</td><td className="px-3 py-4 text-sm text-gray-700">17</td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">4.2 User Acceptance Testing (UAT)</td><td className="px-3 py-4 text-sm text-gray-700">2</td><td className="px-3 py-4 text-sm text-gray-700">16</td><td className="px-3 py-4 text-sm text-gray-700">17</td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">4.3 Pilot Program with Select Products/Locations</td><td className="px-3 py-4 text-sm text-gray-700">3</td><td className="px-3 py-4 text-sm text-gray-700">18</td><td className="px-3 py-4 text-sm text-gray-700">20</td></tr>
                    <tr><td className="px-3 py-4 text-sm font-medium text-gray-900">**Phase 5: Deployment & Optimization**</td><td></td><td></td><td></td><td></td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">5.1 Model Refinement & Retraining (Post-Pilot)</td><td className="px-3 py-4 text-sm text-gray-700">2</td><td className="px-3 py-4 text-sm text-gray-700">20</td><td className="px-3 py-4 text-sm text-gray-700">21</td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">5.2 Documentation & User Training</td><td className="px-3 py-4 text-sm text-gray-700">2</td><td className="px-3 py-4 text-sm text-gray-700">19</td><td className="px-3 py-4 text-sm text-gray-700">20</td></tr>
                    <tr><td className="px-3 py-4 text-sm text-gray-700"></td><td className="px-3 py-4 text-sm text-gray-700">5.3 Full Launch & Ongoing Monitoring</td><td className="px-3 py-4 text-sm text-gray-700">1</td><td className="px-3 py-4 text-sm text-gray-700">22</td><td className="px-3 py-4 text-sm text-gray-700">22</td></tr>
                  </tbody>
                </table>
                <p className="mt-4 text-lg font-semibold text-gray-900 text-right">
                  Total Estimated Duration: Approximately 22 Weeks (5.5 Months)
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
