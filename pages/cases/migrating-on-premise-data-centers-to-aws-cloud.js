import Header from '../../components/Header'; // Adjust path as needed
import Footer from '../../components/Footer'; // Adjust path as needed
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Data for this specific case study
const caseStudyData = {
  title: 'Migrating On-Premise Data Centers to AWS Cloud',
  industry: 'Manufacturing',
  solution: 'Cloud Transformation & Migration (AWS)',
  partner: 'Booz Allen', // Replace with your company name
  image: '/images/aws-migration-manufacturing.png', // Ensure path is correct
  slug: 'migrating-on-premise-data-centers-to-aws-cloud',
};

export default function CaseStudyManufacturingAwsMigration() {
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
              A large manufacturing company with multiple global production facilities relied on aging, disparate on-premise data centers to run its critical ERP, SCM, and operational systems. Facing high maintenance costs, scalability limitations, and complex disaster recovery processes, the company partnered with {partner} to execute a large-scale migration of its core infrastructure to Amazon Web Services (AWS). Utilizing a phased approach and leveraging AWS migration tools and cloud-native services, {partner} successfully transitioned the manufacturer's workloads, resulting in a <strong>50% reduction in infrastructure operational costs</strong>, significantly <strong>faster disaster recovery capabilities</strong> (reduced RTO/RPO), and improved global system performance and accessibility.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Client Overview</h2>
            <p>
              The client is a global leader in the manufacturing of [Specific Product Type, e.g., industrial machinery, automotive components]. Their operations span multiple continents, requiring reliable and performant IT systems to manage complex supply chains, production schedules, quality control, and financial operations. Their existing infrastructure consisted of several owned and co-located data centers running a mix of legacy and modern applications.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">The Challenge: The Weight of Legacy Data Centers</h2>
            <p>
              The manufacturer's on-premise data center strategy presented numerous obstacles:
            </p>
            <ol>
              <li><strong>High Capital & Operational Costs:</strong>  Significant ongoing investment was required for hardware refreshes, software licenses, power, cooling, physical space, and specialized IT staff across multiple locations.</li>
              <li><strong>Scalability Constraints:</strong>  Adding capacity for new projects or increased production required lengthy procurement cycles and significant upfront investment. Scaling down during slower periods was not cost-effective.</li>
              <li><strong>Complex Disaster Recovery:</strong>  Maintaining and testing DR across geographically dispersed data centers was complex, expensive, and often resulted in longer-than-desired recovery times (RTO) and potential data loss (RPO).</li>
              <li><strong>Inconsistent Global Performance:</strong>  Users and systems in different global regions experienced varying levels of performance and latency when accessing centralized applications.</li>
              <li><strong>Slow Innovation:</strong>  The rigid infrastructure hindered the adoption of modern technologies like IoT, advanced analytics, and AI/ML, which could optimize production processes.</li>
            </ol>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">The Solution: Strategic Migration to AWS</h2>
            <p>
              {partner} developed a comprehensive migration plan leveraging the AWS Cloud Adoption Framework (AWS CAF) and a tailored approach:
            </p>
            <h3>1. Assessment and Planning (Discover & Assess):</h3>
            <ul>
              <li>Utilized discovery tools (e.g., AWS Migration Evaluator, Application Discovery Service) and workshops to inventory applications, servers, databases, and dependencies across all data centers.</li>
              <li>Analyzed application suitability for the cloud, defining migration strategies (Rehost, Replatform, Refactor, etc.) for different workload categories based on the "7 Rs".</li>
              <li>Developed a detailed Total Cost of Ownership (TCO) analysis comparing on-premise costs to projected AWS spending.</li>
              <li>Created a phased migration plan, grouping applications into waves based on dependencies and business impact, starting with lower-risk workloads.</li>
            </ul>
            <h3>2. Foundation Building (Mobilize & Migrate Foundation):</h3>
            <ul>
              <li>Designed and deployed a secure and scalable AWS Landing Zone using AWS Control Tower and Infrastructure as Code (Terraform/CloudFormation).</li>
              <li>Established core networking (VPCs, Transit Gateway, Direct Connect/VPN), security controls (Security Hub, GuardDuty, IAM), and operational tooling within AWS.</li>
            </ul>
            <h3>3. Migration Execution (Migrate & Modernize):</h3>
            <ul>
              <li>Leveraged AWS migration services (e.g., AWS Server Migration Service (SMS), Database Migration Service (DMS), Snowball) and partner tools for efficient server and data migration.</li>
              <li>Executed migration waves according to the plan:
                <ul>
                  <li><em>Rehosting (Lift-and-Shift):</em> Migrated many existing virtual machines directly to EC2 instances using tools like SMS or CloudEndure Migration.</li>
                  <li><em>Replatforming:</em> Migrated databases to managed services like Amazon RDS or Aurora; containerized suitable applications to run on Amazon ECS or EKS.</li>
                  <li><em>Refactoring:</em> Identified key legacy applications (like parts of the ERP) for future modernization efforts post-initial migration.</li>
                </ul>
              </li>
              <li>Implemented robust testing and validation procedures before each application cutover.</li>
            </ul>
             <h3>4. Optimization and Operations:</h3>
             <ul>
               <li>Implemented AWS cost management tools (Cost Explorer, Budgets, Trusted Advisor) and FinOps practices to optimize spending.</li>
               <li>Utilized AWS Backup and designed multi-region DR strategies using services like CloudEndure Disaster Recovery or native AWS replication features to significantly improve RTO/RPO.</li>
               <li>Leveraged AWS Systems Manager for patching and operational task automation.</li>
               <li>Enhanced monitoring with Amazon CloudWatch and potentially third-party tools.</li>
             </ul>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Implementation Highlights</h2>
            <p>
              The project required careful planning and execution across multiple global sites:
            </p>
            <ul>
              <li><strong>Core AWS Services:</strong> EC2, S3, VPC, Direct Connect, Transit Gateway, RDS, Aurora, DMS, SMS, CloudEndure, Control Tower, IAM, Security Hub, GuardDuty, CloudWatch, Systems Manager, AWS Backup.</li>
              <li><strong>IaC Tools:</strong> Terraform, AWS CloudFormation.</li>
              <li><strong>Migration Tools:</strong> AWS Native Migration Services, potentially partner tools (e.g., Carbonite Migrate, Zerto).</li>
              <li><strong>Methodology:</strong> AWS Cloud Adoption Framework (CAF), Agile project management.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Results & Impact: Cost Savings, Resilience, and Agility</h2>
            <p>
              Migrating the data center footprint to AWS yielded substantial benefits for the manufacturer:
            </p>
            <ul>
              <li><strong>50% Reduction in Operational Costs:</strong> Eliminating data center facility costs, reducing hardware maintenance, optimizing resource usage via elasticity, and leveraging AWS pricing models led to significant savings compared to the previous on-premise model.</li>
              <li><strong>Faster Disaster Recovery:</strong> Cloud-based DR solutions dramatically reduced RTO and RPO, enabling quicker recovery from potential disruptions and ensuring business continuity with less data loss. DR testing became simpler and more frequent.</li>
              <li><strong>Improved Global Performance & Accessibility:</strong> Deploying resources closer to global users in different AWS Regions improved application latency and accessibility for international facilities and employees.</li>
              <li><strong>Enhanced Scalability:</strong> The ability to scale resources up or down on demand allowed the company to easily support new projects, acquisitions, or production increases without large upfront investments.</li>
              <li><strong>Increased IT Agility:</strong> Faster provisioning of infrastructure and services enabled IT teams to respond more quickly to business needs and support initiatives like IoT data collection and advanced analytics on the factory floor.</li>
              <li><strong>Strengthened Security Posture:</strong> Leveraging AWS security services and best practices provided enhanced visibility, automated threat detection, and simplified compliance management.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Conclusion</h2>
            <p>
              The strategic migration from costly, inflexible on-premise data centers to the AWS cloud, orchestrated by {partner}, was a pivotal transformation for the manufacturing client. This move not only delivered significant cost savings and drastically improved disaster recovery capabilities but also provided the scalable, agile, and secure foundation needed to support global operations and drive future innovation in a competitive industrial market.
            </p>

          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}

