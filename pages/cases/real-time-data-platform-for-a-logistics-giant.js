import Header from '../../components/Header'; // Adjust path as needed
import Footer from '../../components/Footer'; // Adjust path as needed
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Data for this specific case study
const caseStudyData = {
  title: 'Real-Time Data Platform for a Logistics Giant',
  industry: 'Supply Chain & Logistics',
  solution: 'Real-Time Big Data Platform Implementation (Kafka, Spark)',
  partner: 'Booz Allen', // Replace with your company name
  image: '/images/data-pipeline.png', // Ensure path is correct
  slug: 'real-time-data-platform-for-a-logistics-giant',
};

export default function CaseStudyLogisticsDataPlatform() {
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
              A major global logistics provider faced significant challenges in processing and analyzing vast streams of operational data (shipment tracking, vehicle telemetry, warehouse inventory) in real-time. Their existing batch-oriented systems couldn't provide the timely insights needed for dynamic route optimization, predictive delivery estimates, and efficient resource allocation. {partner} partnered with the client to architect and implement a scalable, real-time big data platform leveraging Apache Kafka for data ingestion and Apache Spark for stream processing. This transformation enabled the client to process data instantaneously, leading to <strong>3x faster route and resource optimization cycles</strong> and significantly improving operational efficiency, customer satisfaction, and decision-making capabilities.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Client Overview</h2>
            <p>
              Our client operates one of the world's largest logistics networks, managing millions of shipments daily across air, sea, and land. Their operations involve complex coordination between transportation fleets, warehousing facilities, customs brokerage, and last-mile delivery partners. Generating massive volumes of data from sensors, tracking devices, operational systems, and customer interactions is inherent to their business.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">The Challenge: Drowning in Data, Starving for Insights</h2>
            <p>
              The logistics giant's existing data infrastructure was primarily built on traditional data warehousing and batch ETL processes. This presented several critical limitations in a fast-paced industry demanding real-time responsiveness:
            </p>
            <ol>
              <li><strong>Delayed Decision-Making:</strong> Batch processing meant that critical operational data (e.g., traffic delays, vehicle breakdowns, sudden demand surges) was often hours old before it could be analyzed, hindering proactive decision-making and efficient exception handling.</li>
              <li><strong>Inefficient Resource Allocation:</strong> Lack of real-time visibility into fleet location, capacity, and demand patterns led to suboptimal routing, underutilized assets, and increased fuel consumption.</li>
              <li><strong>Inaccurate ETAs:</strong> Providing customers with accurate, real-time estimated times of arrival (ETAs) was difficult, impacting customer satisfaction and communication.</li>
              <li><strong>Scalability Bottlenecks:</strong> The sheer volume and velocity of incoming data (terabytes per day) strained the existing batch systems, leading to processing delays and high infrastructure costs.</li>
              <li><strong>Limited Advanced Analytics:</strong> The batch nature of the data made it difficult to implement advanced real-time analytics, such as predictive maintenance alerts for vehicles or dynamic pricing adjustments.</li>
            </ol>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">The Solution: Architecting a Real-Time Data Nervous System</h2>
            <p>
              {partner} designed and implemented a modern, stream-processing data platform tailored to the client's high-throughput, low-latency requirements. The core components included:
            </p>
            <h3>1. Data Ingestion Strategy:</h3>
            <ul>
              <li><strong>Kafka Implementation:</strong> Deployed a robust, fault-tolerant Apache Kafka cluster as the central data ingestion hub. This allowed diverse data sources (IoT sensors on trucks, handheld scanners, warehouse management systems, GPS feeds, customer portals) to publish data streams in real-time.</li>
              <li><strong>Data Producers:</strong> Developed custom data producers and utilized Kafka Connect connectors to reliably stream data from various legacy and modern systems into specific Kafka topics.</li>
            </ul>
            <h3>2. Stream Processing Engine:</h3>
            <ul>
              <li><strong>Spark Streaming Deployment:</strong> Implemented Apache Spark Streaming (or Structured Streaming) on a scalable cluster (e.g., running on Kubernetes or a cloud provider's managed service like EMR/Databricks/HDInsight) to consume data from Kafka topics in micro-batches or continuous streams.</li>
              <li><strong>Real-Time Analytics Logic:</strong> Developed Spark applications to perform complex event processing, data enrichment, aggregation, filtering, and real-time analytics (e.g., calculating dynamic ETAs, detecting route deviations, identifying potential delays, optimizing load balancing).</li>
            </ul>
            <h3>3. Data Storage and Serving:</h3>
            <ul>
              <li><strong>Data Lake Integration:</strong> Processed data streams were landed in a cloud-based data lake (e.g., S3, ADLS, GCS) for historical analysis, compliance, and batch processing needs.</li>
              <li><strong>Real-Time Datastores:</strong> Key processed insights and operational states were pushed to low-latency databases or key-value stores (e.g., Cassandra, Redis, DynamoDB, Cosmos DB) to power real-time dashboards and operational applications.</li>
              <li><strong>API Layer:</strong> Developed APIs to expose real-time insights and processed data to downstream consumers, including operational dashboards, customer-facing applications, and planning systems.</li>
            </ul>
            <h3>4. Infrastructure & Operations:</h3>
            <ul>
              <li><strong>Cloud Foundation:</strong> Leveraged a scalable cloud platform (AWS/Azure/GCP) for deploying Kafka, Spark, and associated storage/database services, ensuring elasticity and cost-efficiency.</li>
              <li><strong>Monitoring & Alerting:</strong> Implemented comprehensive monitoring using tools like Prometheus, Grafana, and cloud-native services to track data pipeline health, latency, throughput, and resource utilization.</li>
              <li><strong>Automation:</strong> Utilized Infrastructure as Code (Terraform) and CI/CD pipelines for automated deployment and management of the data platform components.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Implementation Highlights</h2>
            <p>
              The successful deployment involved expertise across big data technologies and cloud infrastructure:
            </p>
            <ul>
              <li><strong>Core Technologies:</strong> Apache Kafka, Apache Spark (Streaming/Structured Streaming), Hadoop Ecosystem (HDFS for intermediate storage if needed), Python/Scala (for Spark jobs).</li>
              <li><strong>Cloud Platform:</strong> [Chosen Cloud Provider - e.g., AWS, Azure, or GCP] services (Managed Kafka, Managed Spark/Kubernetes, Data Lake Storage, NoSQL Databases, Monitoring tools).</li>
              <li><strong>Data Formats:</strong> Standardized on efficient data formats like Avro or Protobuf for Kafka messages.</li>
              <li><strong>Connectivity:</strong> Kafka Connect, custom APIs, IoT gateways.</li>
              <li><strong>Observability:</strong> Prometheus, Grafana, ELK Stack/Cloud-native logging.</li>
              <li><strong>Automation:</strong> Terraform, Ansible, Jenkins/GitLab CI/Azure DevOps.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Results & Impact: Driving Operational Excellence with Real-Time Insights</h2>
            <p>
              The implementation of the real-time data platform yielded transformative results for the logistics provider:
            </p>
            <ul>
              <li><strong>3x Faster Optimization:</strong> Real-time processing of telemetry, traffic, and demand data allowed route planning and resource allocation systems to run optimization cycles significantly faster, reacting dynamically to changing conditions instead of relying on stale, batch-processed data.</li>
              <li><strong>Improved On-Time Delivery Rates:</strong> Dynamic ETA calculations based on real-time conditions led to more accurate delivery predictions and proactive management of potential delays, improving customer satisfaction.</li>
              <li><strong>Enhanced Asset Utilization:</strong> Real-time visibility into fleet location, status, and capacity enabled smarter dispatching and reduced idle time and empty miles.</li>
              <li><strong>Reduced Fuel Costs:</strong> Optimized routing based on live traffic and vehicle data contributed to significant fuel savings across the fleet.</li>
              <li><strong>Scalability for Growth:</strong> The Kafka and Spark-based architecture provided a highly scalable foundation capable of handling exponential data growth without performance degradation.</li>
              <li><strong>Foundation for Advanced Analytics:</strong> Enabled the development of new data products and services, including predictive maintenance and enhanced customer-facing tracking applications.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Conclusion</h2>
            <p>
              By embracing a real-time data architecture built on Kafka and Spark, the logistics giant, with the guidance of {partner}, transformed its operational capabilities. The move from batch processing to stream processing unlocked significant efficiencies, improved customer experience, and provided a scalable platform for future data-driven innovation in the highly competitive logistics industry.
            </p>

          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}

