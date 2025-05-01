import Header from '../../components/Header'; // Adjust path as needed
import Footer from '../../components/Footer'; // Adjust path as needed
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Data for this specific case study
const caseStudyData = {
  title: 'Automated Infrastructure Scaling for a SaaS Platform',
  industry: 'SaaS (Software as a Service)',
  solution: 'Cloud Transformation & Automation (IaC, Auto-Scaling)',
  partner: 'Accenture', // Replace with your company name
  image: '/images/terraform-automation.png', // Ensure path is correct
  slug: 'automated-infrastructure-scaling-for-a-saas-platform',
};

export default function CaseStudySaaSScaling() {
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
              A rapidly growing SaaS provider offering a business-critical application experienced performance degradation and occasional outages during peak usage times due to manually scaled infrastructure. Managing infrastructure updates and provisioning new environments was also slow and error-prone. {partner} implemented a comprehensive cloud automation strategy, leveraging Infrastructure as Code (IaC) with Terraform and configuring robust auto-scaling groups on a major cloud platform (AWS/Azure/GCP). This resulted in achieving consistent <strong>99.99% platform uptime</strong>, even during extreme load, and <strong>reduced infrastructure costs by 40%</strong> through efficient, on-demand resource utilization, allowing the SaaS provider to focus on product innovation.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Client Overview</h2>
            <p>
              The client is a successful SaaS company providing a specialized platform for [Specific Industry or Function, e.g., project management, CRM, marketing automation]. Their customer base was expanding rapidly, leading to unpredictable and often spiky traffic patterns on their application infrastructure, hosted in the cloud.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">The Challenge: Manual Scaling and Infrastructure Drift</h2>
            <p>
              The SaaS provider's reliance on manual infrastructure management created several critical issues:
            </p>
            <ol>
              <li><strong>Performance Issues & Downtime:</strong>  Manual scaling often lagged behind rapid increases in user traffic, leading to slow application response times and, in some cases, outages during peak business hours, impacting customer satisfaction and retention.</li>
              <li><strong>High Operational Costs:</strong>  To avoid performance issues, the operations team often over-provisioned resources, leading to significant unnecessary infrastructure spending during off-peak hours.</li>
              <li><strong>Slow Environment Provisioning:</strong>  Setting up new environments (development, staging, testing) was a manual, time-consuming process, slowing down the development lifecycle.</li>
              <li><strong>Infrastructure Inconsistency (Drift):</strong>  Manual changes across different environments inevitably led to configuration drift, making deployments unreliable and troubleshooting difficult.</li>
              <li><strong>Operational Toil:</strong>  The operations team spent a disproportionate amount of time on repetitive manual tasks related to scaling, patching, and configuration management, diverting focus from strategic improvements.</li>
            </ol>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">The Solution: Infrastructure Automation and Elasticity</h2>
            <p>
              {partner} implemented a cloud-native automation strategy focused on IaC and auto-scaling:
            </p>
            <h3>1. Infrastructure as Code (IaC) Implementation:</h3>
            <ul>
              <li>Adopted Terraform as the primary IaC tool to define and manage all cloud resources (virtual machines, load balancers, databases, networking components, Kubernetes clusters) in version-controlled configuration files.</li>
              <li>Created reusable Terraform modules to ensure consistency and speed up the provisioning of standardized components and environments.</li>
              <li>Integrated IaC practices into the CI/CD pipeline, enabling automated infrastructure provisioning and updates triggered by code commits.</li>
            </ul>
            <h3>2. Auto-Scaling Configuration:</h3>
            <ul>
              <li>Re-architected application components (where necessary) to be stateless or manage state externally (e.g., using Redis, managed databases) to facilitate horizontal scaling.</li>
              <li>Configured cloud provider auto-scaling groups (e.g., AWS Auto Scaling Groups, Azure VM Scale Sets, GCP Managed Instance Groups) for the application's compute layer (VMs or Kubernetes pods).</li>
              <li>Defined scaling policies based on key performance metrics (e.g., CPU utilization, memory usage, request queue length, custom application metrics) to automatically add or remove instances/pods based on real-time demand.</li>
              <li>Implemented auto-scaling for managed database read replicas where applicable to handle fluctuating read loads.</li>
            </ul>
            <h3>3. CI/CD Pipeline Enhancement:</h3>
            <ul>
              <li>Integrated infrastructure deployment (via Terraform/IaC) directly into the application deployment pipelines (e.g., Jenkins, GitLab CI, Azure DevOps, GitHub Actions).</li>
              <li>Automated testing phases within the pipeline to validate both infrastructure and application changes before promotion to production.</li>
            </ul>
             <h3>4. Monitoring and Optimization:</h3>
             <ul>
               <li>Enhanced monitoring capabilities (e.g., using CloudWatch, Azure Monitor, Datadog, Prometheus/Grafana) to provide visibility into auto-scaling events, resource utilization, and application performance.</li>
               <li>Continuously analyzed metrics to fine-tune auto-scaling policies for optimal balance between performance and cost.</li>
             </ul>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Implementation Highlights</h2>
            <p>
              The project emphasized automation and leveraging cloud-native features:
            </p>
            <ul>
              <li><strong>Core Technologies:</strong> Terraform, Docker, Kubernetes (optional, or native VM auto-scaling), [Cloud Provider's Auto-Scaling Service], [CI/CD Toolchain].</li>
              <li><strong>Cloud Platform:</strong> [Chosen Cloud Provider - e.g., AWS, Azure, or GCP].</li>
              <li><strong>Monitoring:</strong> Cloud-native monitoring tools, Prometheus/Grafana, Datadog.</li>
              <li><strong>Scripting:</strong> Bash, Python (for automation scripts).</li>
              <li><strong>Version Control:</strong> Git (for both application code and IaC).</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Results & Impact: Scalability, Reliability, and Cost Savings</h2>
            <p>
              Automating the SaaS platform's infrastructure delivered profound benefits:
            </p>
            <ul>
              <li><strong>99.99% Uptime:</strong> Auto-scaling ensured the platform could seamlessly handle sudden traffic surges and maintain high availability, virtually eliminating performance-related downtime and meeting stringent SLA requirements.</li>
              <li><strong>40% Reduction in Server Costs:</strong> By automatically scaling resources down during off-peak hours and eliminating manual over-provisioning, the client achieved significant cost savings on their cloud infrastructure spend.</li>
              <li><strong>Rapid Environment Provisioning:</strong> IaC enabled the creation of complete, consistent environments (dev, staging, prod) in minutes instead of days, dramatically accelerating development and testing cycles.</li>
              <li><strong>Improved Deployment Reliability:</strong> Consistent infrastructure defined in code eliminated configuration drift, leading to more predictable and reliable application deployments.</li>
              <li><strong>Reduced Operational Burden:</strong> Automation freed up the operations team from manual scaling and provisioning tasks, allowing them to focus on higher-value activities like performance optimization and security enhancements.</li>
              <li><strong>Enhanced Developer Productivity:</strong> Faster environment setup and reliable deployments improved the overall developer experience and velocity.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Conclusion</h2>
            <p>
              Through the strategic implementation of Infrastructure as Code and cloud auto-scaling, {partner} enabled the SaaS provider to overcome critical scalability and operational challenges. The automated, elastic infrastructure not only delivered exceptional uptime and significant cost reductions but also provided the agility needed to support rapid growth and continuous innovation, solidifying the client's position in the competitive SaaS market.
            </p>

          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}

