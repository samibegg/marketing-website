import Header from '../../components/Header'; // Adjust path as needed
import Footer from '../../components/Footer'; // Adjust path as needed
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Data for this specific case study
const caseStudyData = {
  title: 'Big Data Analytics for Real-Time Retail Insights',
  industry: 'Retail',
  solution: 'Big Data Solutions (Kafka, Spark, Real-Time Analytics)',
  partner: 'Accenture', // Replace with your company name
  image: '/images/bigdata-retail.png', // Ensure path is correct
  slug: 'big-data-analytics-for-real-time-retail-insights',
};

export default function CaseStudyRetailBigData() {
  const { title, industry, solution, partner, image } = caseStudyData;

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Optional Back Button */}
          <div className="mb-8">
            <Link href="/case-studies" legacyBehavior>
              <a className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Case Studies
              </a>
            </Link>
          </div>

          {/* Header Section */}
          <div className="mb-10 border-b border-gray-200 pb-8">
            <p className="text-base font-semibold text-blue-600 uppercase tracking-wide mb-2">
              Case Study: {industry}
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
              {title}
            </h1>
            <p className="text-lg text-gray-600">
              Solution Provided: {solution}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Consulting Partner: {partner}
            </p>
          </div>

          {/* Optional: Image Section */}
          {image && (
            <div className="mb-10">
              <img
                src={image}
                alt={title}
                className="w-full h-auto rounded-lg shadow-md object-cover"
              />
            </div>
          )}

          {/* Main Content Area */}
          <article className="prose prose-lg lg:prose-xl max-w-none text-gray-700">

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Executive Summary</h2>
            <p>
              A large multi-channel retailer struggled to gain timely insights from its rapidly growing volume of sales, inventory, and customer interaction data across online and physical stores. Existing batch analytics processes resulted in delayed reporting, hindering effective inventory management, personalized marketing, and dynamic pricing decisions. {partner} implemented a scalable big data platform using Apache Kafka and Apache Spark to enable real-time data ingestion and analysis. This empowered the retailer with immediate insights, leading to <strong>3x faster inventory tracking updates across channels</strong> and enabling initiatives that resulted in **2x improvement in sales optimization campaign effectiveness**.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Client Overview</h2>
            <p>
              The client is a major retailer with hundreds of brick-and-mortar stores and a significant e-commerce presence. They manage a vast product catalog and handle millions of customer transactions daily. Success in the competitive retail landscape depends heavily on accurate inventory management, understanding customer behavior, and responding quickly to market trends.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">The Challenge: Lagging Behind with Batch Analytics</h2>
            <p>
              The retailer's traditional data warehouse and nightly batch ETL jobs were insufficient for the demands of modern retail:
            </p>
            <ol>
              <li><strong>Inventory Discrepancies:</strong>  Delayed updates between online sales, in-store purchases, and warehouse systems led to inaccurate inventory levels, resulting in stockouts, overselling, and poor customer experiences.</li>
              <li><strong>Missed Sales Opportunities:</strong>  Inability to analyze customer browsing and purchasing behavior in real-time hindered the deployment of timely, personalized promotions or recommendations.</li>
              <li><strong>Inefficient Pricing and Promotions:</strong>  Pricing decisions and promotional campaign adjustments were based on outdated data, reducing their effectiveness.</li>
              <li><strong>Slow Reporting:</strong>  Business intelligence reports on sales trends, campaign performance, and inventory status were often a day old, limiting agile decision-making by merchandising and marketing teams.</li>
              <li><strong>Scalability Limits:</strong>  The existing infrastructure struggled to cope with peak season data volumes, further delaying critical insights.</li>
            </ol>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">The Solution: Real-Time Retail Analytics Engine</h2>
            <p>
              {partner} architected and deployed a modern data platform capable of handling high-velocity retail data streams:
            </p>
            <h3>1. Centralized Data Ingestion (Kafka):</h3>
            <ul>
              <li>Established Apache Kafka as the central event streaming platform to ingest data in real-time from various sources: Point-of-Sale (POS) systems, e-commerce platform events (clicks, add-to-carts, purchases), inventory management systems, CRM data updates, and website clickstreams.</li>
              <li>Ensured reliable data capture using appropriate Kafka producers and connectors.</li>
            </ul>
            <h3>2. Stream Processing and Enrichment (Spark):</h3>
            <ul>
              <li>Utilized Apache Spark Structured Streaming to process incoming data streams from Kafka.</li>
              <li>Developed Spark jobs to perform real-time data cleansing, transformation, enrichment (e.g., joining sales data with customer profiles), and aggregation (e.g., calculating real-time sales totals per store/region/product).</li>
              <li>Calculated near real-time inventory positions across all channels by processing sales and stock movement events as they occurred.</li>
            </ul>
            <h3>3. Real-Time Analytics & Serving Layer:</h3>
            <ul>
              <li>Fed processed, real-time inventory data into low-latency databases accessible by the e-commerce platform and in-store systems.</li>
              <li>Streamed aggregated sales and customer behavior insights into real-time dashboards (e.g., using Kibana, Grafana, Tableau) for merchandising and marketing teams.</li>
              <li>Enabled the triggering of real-time actions, such as personalized offers via email/app notification based on immediate customer behavior, or dynamic price adjustments based on demand.</li>
              <li>Persisted processed data into a data lake/warehouse (e.g., S3/ADLS/GCS, Snowflake/Redshift/BigQuery) for deeper historical analysis and BI reporting.</li>
            </ul>
             <h3>4. Scalable Cloud Infrastructure:</h3>
             <ul>
               <li>Deployed the Kafka and Spark clusters, along with supporting databases and storage, on a flexible cloud platform (AWS/Azure/GCP) to ensure scalability and cost management based on load.</li>
               <li>Implemented robust monitoring and alerting for pipeline health and performance.</li>
             </ul>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Implementation Highlights</h2>
            <p>
              The project focused on integrating disparate systems into a unified real-time flow:
            </p>
            <ul>
              <li><strong>Core Technologies:</strong> Apache Kafka, Apache Spark (Structured Streaming), Python/Scala, SQL.</li>
              <li><strong>Data Stores:</strong> Cloud Data Lake (S3/ADLS/GCS), Cloud Data Warehouse (Snowflake/Redshift/BigQuery), NoSQL/Key-Value stores (Redis/DynamoDB) for real-time lookups.</li>
              <li><strong>Cloud Platform:</strong> [Chosen Cloud Provider - e.g., AWS, Azure, or GCP] managed services for Kafka, Spark, databases.</li>
              <li><strong>Connectivity:</strong> Kafka Connect, Debezium (for CDC), custom APIs, POS integration middleware.</li>
              <li><strong>BI & Visualization:</strong> Tableau, Power BI, Kibana, Grafana.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Results & Impact: Data-Driven Agility in Retail</h2>
            <p>
              The move to real-time analytics delivered significant competitive advantages:
            </p>
            <ul>
              <li><strong>3x Faster Inventory Tracking:</strong> Near real-time synchronization of inventory levels across online and offline channels drastically reduced stock discrepancies and improved order fulfillment accuracy.</li>
              <li><strong>2x Sales Optimization Effectiveness:</strong> Real-time insights into customer behavior and campaign performance allowed for rapid adjustments to promotions and personalized marketing efforts, doubling the effectiveness (e.g., conversion rate uplift) of targeted campaigns.</li>
              <li><strong>Improved Customer Experience:</strong> Accurate inventory visibility and timely personalized offers enhanced the online and in-store shopping experience.</li>
              <li><strong>Faster Decision Making:</strong> Merchandising, marketing, and operations teams gained access to up-to-the-minute dashboards and reports, enabling quicker responses to sales trends and competitor actions.</li>
              <li><strong>Optimized Stock Levels:</strong> Better understanding of real-time demand patterns allowed for more accurate forecasting and optimized stock replenishment, reducing holding costs and minimizing stockouts.</li>
              <li><strong>Scalable Foundation:</strong> The platform provided the ability to handle massive data volumes during peak seasons and easily integrate new data sources or analytics use cases in the future.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Conclusion</h2>
            <p>
              By implementing a modern big data platform focused on real-time stream processing with Kafka and Spark, {partner} enabled the multi-channel retailer to transform its operations. Access to immediate insights replaced outdated batch reporting, driving significant improvements in inventory management, sales optimization, and overall business agility, positioning the retailer for continued success in a data-driven market.
            </p>

          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}

