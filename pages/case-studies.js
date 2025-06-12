import CaseStudyCard from '../components/CaseStudyCard';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

const caseStudies = [
  {
    title: 'Retrieval-Augmented Generation Transforms Info to Intel',
    industry: 'All',
    solution: 'AI (Machine Learning, RAG)',
    impact: '10x faster and 10x optimization',
    image: '/images/real-time-datalake.jpeg',
    slug: '/cases/rag-value', 
  },
  {
    title: 'Fine-tune Models to Build Powerful AI Domain Experts',
    industry: 'All',
    solution: 'AI (Machine Learning, Fine-tuning, LLMs)',
    impact: '10x faster and 10x optimization',
    image: '/images/spark-performance.jpeg',
    slug: '/cases/fine-tuning-value', 
  },
  {
    title: 'Build AI Pipelines to Enhance Structured Data',
    industry: 'All',
    solution: 'AI (Machine Learning, Custom Pipelines)',
    impact: '10x faster and 10x optimization',
    image: '/images/kafka-exactly-once.jpeg',
    slug: '/cases/structured-data-ml-pipelines', 
  },
  {
    title: 'AI-Powered IT Help Desk Implementation',
    industry: 'IT Consulting',
    solution: 'Automated IT Support & Knowledge Base Bot',
    impact: 'Reduced support tickets by 40% and improved client response time by 80%',
    image: '/images/serverless-pipeline.jpeg',
    slug: '/cases/it-support-bot', 
  },
  {
    title: 'Rapid Proposal Generation for Tech Solutions',
    industry: 'Technology Services',
    solution: 'AI Project Proposal & Scope Generator',
    impact: 'Decreased proposal creation time by 75% and boosted sales conversion rates by 15%',
    image: '/images/kafka-pipeline.jpeg',
    slug: '/cases/proposal-generator', 
  },
  {
    title: 'Proactive System Health Monitoring & Anomaly Detection',
    industry: 'Managed IT Services',
    solution: 'Predictive Maintenance & Anomaly Detection for Client Systems',
    impact: 'Achieved 95% reduction in critical incidents and extended hardware lifespan by 20%',
    image: '/images/kafka-cluster.jpeg',
    slug: '/cases/predictive-maintenance', 
  },  
  {
    title: 'Global Cloud Migration for a Financial Institution',
    industry: 'Finance',
    solution: 'Cloud Transformation & Migration',
    impact: '60% cost reduction and 99.99% uptime',
    image: '/images/aws-migration.jpeg',
    slug: '/cases/global-cloud-migration-for-a-financial-institution', 
  },
  {
    title: 'E-Commerce Platform Modernization with Microservices',
    industry: 'E-Commerce',
    solution: 'App Development (Microservices)',
    impact: '40% increase in transaction speed and 50% improved scalability',
    image: '/images/serverless-pipeline.jpeg',
    slug: '/cases/e-commerce-platform-modernization-with-microservices', 
  },
  {
    title: 'AI-Powered Fraud Detection for a Banking Network',
    industry: 'Banking',
    solution: 'AI Strategy (Machine Learning, Fraud Detection)',
    impact: '70% reduction in false-positive fraud alerts',
    image: '/images/agentic-workflow.jpeg',
    slug: '/cases/ai-powered-fraud-detection-for-a-banking-network', 
  },
  {
    title: 'Cloud-Native App Development for a Healthcare Provider',
    industry: 'Healthcare',
    solution: 'App Development (Cloud-Native)',
    impact: '50% improvement in patient data access and security',
    image: '/images/terraform-automation.jpeg',
    slug: '/cases/cloud-native-app-development-for-a-healthcare-provider', 
  },
  {
    title: 'Big Data Analytics for Real-Time Retail Insights',
    industry: 'Retail',
    solution: 'Big Data Solutions (Kafka, Spark)',
    impact: '3x faster inventory tracking and 2x sales optimization',
    image: '/images/real-time-datalake.jpeg',
    slug: '/cases/big-data-analytics-for-real-time-retail-insights', 
  },
  {
    title: 'Automated Infrastructure Scaling for a SaaS Platform',
    industry: 'SaaS',
    solution: 'Cloud Transformation & Automation',
    impact: '99.99% uptime and reduced server costs by 40%',
    image: '/images/hybrid-cloud.jpeg',
    slug: '/cases/automated-infrastructure-scaling-for-a-saas-platform', 
  },
  {
    title: 'Real-Time Data Platform for a Logistics Giant',
    industry: 'Supply Chain',
    solution: 'Big Data Solutions',
    impact: '3x faster optimization with Kafka/Spark',
    image: '/images/spark-performance.jpeg',
    slug: '/cases/real-time-data-platform-for-a-logistics-giant', 
  },
  {
    title: 'Migrating On-Premise Data Centers to AWS Cloud',
    industry: 'Manufacturing',
    solution: 'Cloud Transformation & Migration',
    impact: '50% reduction in operational costs and faster disaster recovery',
    image: '/images/kafka-exactly-once.jpeg',
    slug: '/cases/migrating-on-premise-data-centers-to-aws-cloud', 
  },
  {
    title: 'Real-Time Predictive Maintenance for Industrial Equipment',
    industry: 'Manufacturing',
    solution: 'AI Strategy (Predictive Maintenance, IoT)',
    impact: '30% reduction in equipment downtime and 20% increase in production efficiency',
    image: '/images/kafka-cluster.jpeg',
    slug: '/cases/real-time-predictive-maintenance-for-industrial-equipment', 
  },
  {
    title: 'Real-Time Personalization for Streaming Services',
    industry: 'Entertainment',
    solution: 'Big Data Solutions (Kafka, Spark)',
    impact: '25% increase in user engagement and 15% increase in subscriptions',
    image: '/images/kafka-pipeline.jpeg',
    slug: '/cases/real-time-personalization-for-streaming-services', 
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="px-6 py-16 max-w-7xl mx-auto flex-1">
        <h1 className="text-4xl font-bold mb-4">Case Studies</h1>
        <p className="text-lg text-gray-600 mb-12">Transformations Delivered to Our Clients</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {caseStudies.map((cs, i) => (
            <CaseStudyCard key={i} {...cs} />
          ))}
        </div>

        <section className="text-center max-w-3xl mx-auto mt-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Transform Your Business?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Let's discuss how our expertise in cloud, data, AI, and application development can accelerate your digital journey and drive meaningful growth.
          </p>
          <Link href="/contact" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-md text-lg transition inline-block">
            Get In Touch
          </Link>
        </section>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
