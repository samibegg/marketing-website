import Header from '../../components/Header'; // Adjust path as needed
import Footer from '../../components/Footer'; // Adjust path as needed
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Data for this specific case study
const caseStudyData = {
  title: 'Real-Time Predictive Maintenance for Industrial Equipment',
  industry: 'Manufacturing / Industrial',
  solution: 'AI Strategy (Predictive Maintenance, IoT, Machine Learning)',
  partner: 'Booz Allen', // Replace with your company name
  image: '/images/predictive-maintenance.png', // Ensure path is correct
  slug: 'real-time-predictive-maintenance-for-industrial-equipment',
};

export default function CaseStudyPredictiveMaintenance() {
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
              A heavy industrial equipment manufacturer faced significant operational disruptions and costs due to unexpected machinery failures on its production lines. Traditional time-based maintenance schedules were often inefficient, leading to either premature parts replacement or costly unplanned downtime. {partner} implemented an AI-driven predictive maintenance solution, integrating IoT sensor data with machine learning models to forecast potential equipment failures in real-time. This proactive approach resulted in a <strong>30% reduction in critical equipment downtime</strong> and a <strong>20% increase in overall production efficiency</strong> by enabling condition-based maintenance interventions.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Client Overview</h2>
            <p>
              The client operates large-scale manufacturing facilities producing [Specific Type of Industrial Goods]. Their production lines rely on complex, expensive machinery where uptime is critical to meeting production targets and maintaining profitability. Unplanned downtime due to equipment failure leads to significant production losses, repair costs, and potential safety hazards.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">The Challenge: Reactive vs. Proactive Maintenance</h2>
            <p>
              The manufacturer's existing maintenance strategy was primarily reactive or based on fixed schedules, leading to several inefficiencies:
            </p>
            <ol>
              <li><strong>Unplanned Downtime:</strong>  Equipment failures often occurred unexpectedly, halting production lines and causing significant financial losses due to lost output and emergency repair costs.</li>
              <li><strong>Inefficient Scheduled Maintenance:</strong>  Time-based maintenance often led to replacing components that still had significant useful life remaining or, conversely, failing to catch issues before they caused a breakdown between scheduled intervals.</li>
              <li><strong>Lack of Insight:</strong>  Maintenance teams lacked real-time visibility into the actual health and operating conditions of critical machinery components.</li>
              <li><strong>High Spare Parts Inventory:</strong>  Uncertainty about failure times often necessitated holding large, costly inventories of spare parts.</li>
              <li><strong>Safety Risks:</strong>  Catastrophic equipment failures could pose potential safety risks to personnel.</li>
            </ol>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">The Solution: AI-Driven Predictive Maintenance</h2>
            <p>
              {partner} designed and deployed an end-to-end solution leveraging IoT and AI:
            </p>
            <h3>1. IoT Sensor Integration & Data Acquisition:</h3>
            <ul>
              <li>Identified critical machinery components and instrumented them with relevant sensors (e.g., vibration, temperature, pressure, acoustic, power consumption).</li>
              <li>Established a secure data pipeline using IoT gateways and protocols (e.g., MQTT) to stream sensor data in real-time to a central cloud-based IoT platform (e.g., AWS IoT Core, Azure IoT Hub, Google Cloud IoT).</li>
            </ul>
            <h3>2. Data Processing and Storage:</h3>
            <ul>
              <li>Processed and cleaned the high-velocity sensor data streams using cloud-native tools (e.g., AWS Kinesis/Lambda, Azure Stream Analytics/Functions, Google Dataflow/Cloud Functions).</li>
              <li>Stored time-series sensor data along with historical maintenance records and operational parameters in a suitable data store (e.g., time-series databases like InfluxDB/TimescaleDB, data lakes).</li>
            </ul>
            <h3>3. Predictive Modeling (Machine Learning):</h3>
            <ul>
              <li>Developed machine learning models (e.g., using techniques like survival analysis, anomaly detection, regression, LSTMs) trained on historical sensor data and failure records.</li>
              <li>These models learned patterns indicative of impending failures and calculated Remaining Useful Life (RUL) estimates or anomaly scores for critical components.</li>
            </ul>
             <h3>4. Real-Time Alerting and Visualization:</h3>
             <ul>
               <li>Deployed the trained models to score incoming sensor data in near real-time.</li>
               <li>Generated alerts and notifications directed to maintenance teams when models predicted a high probability of failure within a specific timeframe or detected significant anomalies.</li>
               <li>Developed dashboards visualizing equipment health scores, sensor readings, RUL predictions, and maintenance alerts, providing actionable insights to operators and engineers.</li>
             </ul>
             <h3>5. Integration with Maintenance Systems (CMMS):</h3>
              <ul>
                <li>Integrated the predictive alerts with the client's existing Computerized Maintenance Management System (CMMS) to automatically generate condition-based work orders, streamlining the maintenance workflow.</li>
              </ul>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Implementation Highlights</h2>
            <p>
              The project combined expertise in IoT, data engineering, data science, and cloud platforms:
            </p>
            <ul>
              <li><strong>IoT Platform:</strong> [Chosen Cloud Provider IoT Service - e.g., AWS IoT Core, Azure IoT Hub].</li>
              <li><strong>Data Processing:</strong> Kafka/Kinesis/IoT Hub, Spark Streaming/Flink/Cloud Functions/Lambda/Stream Analytics.</li>
              <li><strong>Data Storage:</strong> Time-series databases (InfluxDB, TimescaleDB), Data Lakes (S3/ADLS/GCS).</li>
              <li><strong>Machine Learning:</strong> Python (Scikit-learn, TensorFlow/PyTorch, Prophet), ML Platforms (SageMaker/Azure ML/Vertex AI).</li>
              <li><strong>Visualization:</strong> Grafana, Tableau, Power BI, custom dashboards.</li>
              <li><strong>Connectivity:</strong> MQTT, OPC-UA, Modbus.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Results & Impact: Optimized Maintenance, Increased Efficiency</h2>
            <p>
              The AI-powered predictive maintenance solution delivered substantial operational improvements:
            </p>
            <ul>
              <li><strong>30% Reduction in Equipment Downtime:</strong> Proactive alerts enabled maintenance teams to address potential issues before they caused catastrophic failures, significantly reducing unplanned production stoppages.</li>
              <li><strong>20% Increase in Production Efficiency:</strong> Reduced downtime and optimized maintenance scheduling led to smoother, more consistent production runs and higher overall equipment effectiveness (OEE).</li>
              <li><strong>Optimized Maintenance Costs:</strong> Shifting from time-based to condition-based maintenance reduced unnecessary parts replacements and minimized costly emergency repairs.</li>
              <li><strong>Extended Equipment Lifespan:</strong> Early detection and intervention helped prevent minor issues from escalating into major damage, potentially extending the operational life of expensive machinery.</li>
              <li><strong>Improved Safety:</strong> Proactively addressing potential failures reduced the risk of equipment malfunctioning in a hazardous manner.</li>
              <li><strong>Data-Driven Maintenance Planning:</strong> Provided maintenance teams with objective data to prioritize tasks and allocate resources more effectively.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Conclusion</h2>
            <p>
              By integrating IoT sensor data with advanced AI/ML models, {partner} enabled the industrial manufacturer to transition from a reactive to a proactive maintenance strategy. The predictive maintenance solution provided unprecedented visibility into equipment health, leading to significant reductions in downtime, optimized maintenance spending, and substantial gains in production efficiency, demonstrating the power of data science in modern manufacturing.
            </p>

          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}

