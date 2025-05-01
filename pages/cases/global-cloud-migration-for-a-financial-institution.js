import Header from '../../components/Header'; // Adjust path based on your components folder
import Footer from '../../components/Footer'; // Adjust path based on your components folder
// Optional: Import Image from next/image if you want to optimize the image
// import Image from 'next/image';
import { ArrowLeft } from 'lucide-react'; // Optional: For a back button
import Link from 'next/link'; // Optional: For a back button

// Replace with the actual data for this specific case study
const caseStudyData = {
  title: 'Global Cloud Migration for a Financial Institution',
  industry: 'Finance & Banking',
  solution: 'Comprehensive Cloud Transformation & Migration Strategy and Execution',
  partner: 'Deloitte', // Replace with your actual company name
  image: '/images/cloud-diagram.png', // Make sure this path is correct
  slug: 'global-cloud-migration-for-a-financial-institution',
  // Add the content sections here
};

export default function CaseStudyPage() {
  // In a real dynamic page ([slug].js), you would fetch this data based on the slug
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
                // If using next/image:
                // width={1200} // Provide appropriate width
                // height={600} // Provide appropriate height
                // layout="responsive"
              />
            </div>
          )}

          {/* Main Content Area - Rendered from Markdown structure */}
          <article className="prose prose-lg lg:prose-xl max-w-none text-gray-700">
            {/* Use prose classes from @tailwindcss/typography for nice article styling */}

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Executive Summary</h2>
            <p>
              A leading global financial institution, grappling with aging on-premise infrastructure, escalating operational costs, and the need for greater agility, partnered with {partner} to undertake a comprehensive cloud transformation initiative. The primary goals were to modernize IT infrastructure, enhance operational resilience, improve security posture, reduce significant capital and operational expenditures, and enable faster innovation. By implementing a meticulously planned, multi-phased migration strategy to a hybrid-cloud environment, {partner} successfully transitioned the institution's core applications and data workloads. The project resulted in a remarkable <strong>60% reduction in infrastructure-related operational costs</strong> and achieved <strong>99.99% system uptime</strong>, significantly boosting efficiency, scalability, and the client's competitive edge in the demanding financial services market.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Client Overview</h2>
            <p>
              Our client is a well-established financial institution with a global footprint, offering a wide range of services including retail banking, investment management, and corporate finance. With decades of operation, the institution had accumulated a complex and sprawling IT infrastructure spread across multiple traditional data centers worldwide. While reliable in the past, this legacy environment was becoming increasingly burdensome, hindering the bank's ability to adapt to rapidly evolving market demands, regulatory changes, and the rise of fintech competitors.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">The Challenge: Navigating Legacy Constraints in a Digital-First World</h2>
            <p>
              The institution faced several critical challenges stemming from its reliance on aging, on-premise infrastructure:
            </p>
            <ol>
              <li><strong>High Operational Costs:</strong> Maintaining multiple physical data centers, including hardware refreshes, power, cooling, and physical security, resulted in substantial and continuously rising operational expenditures (OpEx) and capital expenditures (CapEx).</li>
              <li><strong>Scalability Limitations:</strong> Scaling resources up or down to meet fluctuating market demands (e.g., during peak trading hours or month-end processing) was slow, expensive, and often required significant lead time for hardware procurement.</li>
              <li><strong>Lack of Agility & Innovation:</strong> The rigid nature of the legacy infrastructure slowed down application development cycles and the deployment of new digital services, hindering the bank's ability to innovate and respond quickly to customer needs and competitive pressures.</li>
              <li><strong>Operational Resilience Concerns:</strong> While robust for their time, the existing disaster recovery (DR) solutions were complex, costly to test, and had longer recovery time objectives (RTOs) and recovery point objectives (RPOs) than desired in the modern financial landscape. Achieving near-continuous availability was a major hurdle.</li>
              <li><strong>Security & Compliance Burden:</strong> Managing security and ensuring compliance with stringent financial regulations (like GDPR, CCPA, PCI DSS, etc.) across disparate, aging systems required significant manual effort and constant vigilance, increasing risk exposure.</li>
            </ol>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">The Solution: A Strategic Migration to the Cloud</h2>
            <p>
              {partner} collaborated closely with the client's IT and business leadership to devise and execute a tailored cloud transformation strategy. The solution encompassed a holistic approach:
            </p>
            <h3>1. Assessment and Strategic Planning:</h3>
            <ul>
              <li><strong>Discovery:</strong> Conducted an exhaustive assessment of the existing infrastructure, application portfolio (~500 applications), dependencies, and data workloads.</li>
              <li><strong>Cloud Readiness:</strong> Evaluated applications based on the "6 Rs" of migration (Rehost, Replatform, Refactor, Rearchitect, Retire, Retain).</li>
              <li><strong>Provider Selection:</strong> Assisted the client in selecting a primary public cloud provider (e.g., AWS/Azure/GCP) based on technical requirements, regulatory compliance capabilities, cost models, and existing strategic relationships, while designing for potential multi-cloud flexibility.</li>
              <li><strong>Roadmap Development:</strong> Created a detailed, phased migration roadmap prioritizing applications based on business criticality, technical complexity, and potential ROI.</li>
            </ul>
             <h3>2. Secure Cloud Foundation Design:</h3>
            <ul>
              <li><strong>Landing Zone:</strong> Designed and implemented secure, compliant, and automated cloud landing zones using Infrastructure as Code (IaC) principles (e.g., Terraform, CloudFormation). This included setting up robust network architectures (VPCs/VNets, subnets, security groups, firewalls), identity and access management (IAM) policies, and organizational structures.</li>
              <li><strong>Security Framework:</strong> Integrated advanced cloud-native security services for threat detection, data encryption (at rest and in transit), vulnerability management, and compliance monitoring, tailored to financial industry standards.</li>
            </ul>
            <h3>3. Phased Migration Execution:</h3>
            <ul>
                <li><strong>Pilot Migrations:</strong> Started with less critical applications to validate the migration process, tooling, and operational readiness.</li>
                <li><strong>Wave-Based Approach:</strong> Grouped applications into logical migration waves, utilizing a mix of strategies:
                    <ul>
                        <li><em>Rehosting (Lift-and-Shift):</em> For applications requiring minimal modification to run in the cloud, enabling faster migration for certain workloads.</li>
                        <li><em>Replatforming:</em> Making minor adjustments to applications to leverage cloud-native services (e.g., managed databases like RDS/Azure SQL, containerization with EKS/AKS).</li>
                        <li><em>Refactoring/Rearchitecting:</em> For critical, monolithic applications where modernization was key to achieving scalability and agility goals, often breaking them down into microservices.</li>
                    </ul>
                </li>
                <li><strong>Data Migration:</strong> Employed various data migration strategies (e.g., database replication, offline transfer for large datasets, cloud-native data transfer services) ensuring data integrity and minimal downtime.</li>
                <li><strong>Testing & Validation:</strong> Rigorous testing (functional, performance, security, DR) was conducted at each stage before cutover.</li>
            </ul>
             <h3>4. Post-Migration Optimization & Management:</h3>
             <ul>
                <li><strong>Performance Tuning:</strong> Continuously monitored and optimized resource utilization, leveraging cloud elasticity and auto-scaling features.</li>
                <li><strong>Cost Management (FinOps):</strong> Implemented cost monitoring, tagging strategies, and optimization techniques (e.g., reserved instances, spot instances where appropriate, rightsizing) to maximize cost-efficiency.</li>
                <li><strong>Automation:</strong> Automated operational tasks, patching, backups, and monitoring using cloud-native tools and scripting.</li>
                <li><strong>Managed Services:</strong> Transitioned operational support to leverage cloud provider capabilities and {partner}'s managed cloud services where applicable.</li>
             </ul>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Implementation Highlights</h2>
            <p>
              The project spanned approximately 24 months, involving close collaboration between {partner}'s cloud architects, engineers, security specialists, and the client's internal IT teams. Key technologies utilized included:
            </p>
            <ul>
              <li><strong>Cloud Platforms:</strong> Primarily [Chosen Cloud Provider - e.g., AWS or Azure], with considerations for multi-cloud connectivity.</li>
              <li><strong>Infrastructure as Code:</strong> Terraform and [Cloud Provider's Native IaC - e.g., CloudFormation or ARM Templates] for automated provisioning and consistency.</li>
              <li><strong>Containerization:</strong> Docker and Kubernetes (e.g., EKS, AKS) for modernizing and deploying refactored applications.</li>
              <li><strong>CI/CD:</strong> Jenkins, GitLab CI, or Azure DevOps for automating build, test, and deployment pipelines.</li>
              <li><strong>Monitoring & Logging:</strong> CloudWatch, Azure Monitor, Datadog, Splunk, Prometheus, Grafana for comprehensive observability.</li>
              <li><strong>Security Tools:</strong> Cloud-native security hubs, WAFs, vulnerability scanners, and SIEM integrations.</li>
              <li><strong>Migration Tools:</strong> Cloud-native migration services (e.g., AWS DMS, Azure Migrate) and third-party tools.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Results & Impact: Tangible Business Transformation</h2>
            <p>
              The successful execution of the cloud migration strategy delivered significant and measurable benefits for the financial institution:
            </p>
            <ul>
              <li><strong>60% Operational Cost Reduction:</strong> Decommissioning legacy data centers, shifting from CapEx-heavy hardware cycles to OpEx-based cloud consumption, and aggressive FinOps optimization dramatically reduced infrastructure spending. The pay-as-you-go model eliminated costs associated with over-provisioning.</li>
              <li><strong>99.99% Uptime Achieved:</strong> Leveraging the cloud provider's resilient global infrastructure, designing for high availability across multiple Availability Zones, implementing automated failover mechanisms, and improving DR capabilities resulted in near-elimination of unplanned downtime for critical systems. This enhanced customer trust and operational stability.</li>
              <li><strong>Enhanced Agility and Faster Time-to-Market:</strong> Development teams could provision resources on-demand, significantly accelerating application development, testing, and deployment cycles. New digital products and features were launched months faster than previously possible.</li>
              <li><strong>Improved Scalability and Performance:</strong> The cloud's elastic nature allowed the institution to seamlessly scale resources to handle peak loads without performance degradation, ensuring a consistent customer experience.</li>
              <li><strong>Strengthened Security and Compliance:</strong> Centralized security management, automated compliance checks, and advanced cloud-native security tools provided a more robust and easily auditable security posture, simplifying adherence to strict financial regulations.</li>
              <li><strong>Focus on Innovation:</strong> By offloading infrastructure management, the internal IT team could refocus efforts on strategic initiatives and innovation, driving greater business value.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Conclusion</h2>
            <p>
              The global cloud migration project undertaken by {partner} for this major financial institution stands as a testament to the transformative power of strategic cloud adoption. By moving beyond legacy constraints, the client not only achieved significant cost savings and unprecedented levels of system availability but also fundamentally enhanced its operational agility, security posture, and capacity for innovation. This successful transformation has positioned the institution to better serve its customers, compete effectively in the digital era, and navigate the future of finance with confidence and resilience.
            </p>

          </article>

        </div>
      </main>

      <Footer />
    </div>
  );
}


