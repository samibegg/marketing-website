import Image from 'next/image';
import Header from '../../components/Header'; // Adjust path as needed
import Footer from '../../components/Footer'; // Adjust path as needed
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AWSMigrationArticle() {
  return (
    // Add the main page wrapper with flex-col and min-h-screen
    <div className="bg-white min-h-screen flex flex-col">
      <Header />

      {/* Add flex-grow and container styling for the main content */}
      <main className="flex-grow py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Back button using modern Link syntax */}
          <div className="mb-8">
            <Link href="/knowledge-base" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition"> {/* Adjust href as needed */}
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Knowledge Base
            </Link>
          </div>

          {/* Article Header */}
          <div className="mb-10 border-b border-gray-200 pb-8">
             <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
               How to Migrate a Legacy Application to AWS Cloud with Zero Downtime
             </h1>
             <p className="text-lg text-gray-600">
               Migrating legacy applications to the cloud is a complex task that involves a well-planned strategy to ensure zero downtime during the transition. In this comprehensive guide, we’ll walk you through the steps, best practices, and techniques for successfully migrating your legacy systems to AWS without affecting business operations.
             </p>
          </div>


          {/* Image showing the process of cloud migration */}
          <div className="my-8">
            <Image src="/images/aws-migration-process.png" alt="AWS Migration Process" width={800} height={400} className="rounded-lg shadow-md mx-auto" />
          </div>

          {/* Apply prose classes for article styling */}
          {/* Ensure you have @tailwindcss/typography installed and configured */}
          <article className="prose prose-lg lg:prose-xl max-w-none text-gray-700">

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Step 1: Assessing the Existing Infrastructure</h2>
            <p>
              Before beginning the migration, the first critical step is to perform a comprehensive assessment of your legacy infrastructure. This involves identifying key components such as:
            </p>
            <ul className="list-disc list-outside pl-5 mt-4 space-y-2"> {/* Adjusted list styling */}
              <li><strong>Architecture:</strong> Document your existing architecture, including all critical systems and components.</li>
              <li><strong>Dependencies:</strong> Identify dependencies and how they interconnect.</li>
              <li><strong>Current Performance:</strong> Analyze current system performance, bottlenecks, and resource utilization.</li>
              <li><strong>Security Considerations:</strong> Ensure your security protocols and compliance requirements are documented.</li>
            </ul>
            <p>
              By the end of this phase, you should have a clear understanding of your legacy application’s architecture and be ready to move forward with selecting the right AWS services to support the migration.
            </p>

            {/* Diagram for application assessment */}
            <div className="my-8"> {/* Added margin */}
              <Image src="/images/aws-architecture-assessment.png" alt="Application Assessment Diagram" width={800} height={400} className="rounded-lg shadow-md mx-auto" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Step 2: Setting Up Cloud Infrastructure</h2>
            <p>
              Now that you have a clear understanding of your existing environment, the next step is to set up the cloud infrastructure. This step involves configuring AWS services that will host your legacy application while maintaining operational readiness.
            </p>
            <p> {/* Removed text-lg text-gray-600 as prose handles it */}
              The following AWS services are commonly used for this purpose:
            </p>
            <ul className="list-disc list-outside pl-5 mt-4 space-y-2"> {/* Adjusted list styling */}
              <li><strong>AWS Elastic Beanstalk:</strong> A Platform as a Service (PaaS) that automates the deployment and scaling of applications.</li>
              <li><strong>AWS RDS (Relational Database Service):</strong> Managed relational database services for scalable, secure databases.</li>
              <li><strong>AWS S3 (Simple Storage Service):</strong> For storage and backup of data files.</li>
              <li><strong>AWS CloudWatch:</strong> Monitoring service to track application performance and log data.</li>
            </ul>
            <p>
              With AWS Elastic Beanstalk, for instance, you can automatically handle capacity provisioning, load balancing, scaling, and application health monitoring. This ensures your application will be continuously available during the migration process.
            </p>

            {/* Diagram showing AWS service architecture */}
            <div className="my-8"> {/* Added margin */}
              <Image src="/images/aws-architecture-setup.png" alt="AWS Architecture Setup" width={800} height={400} className="rounded-lg shadow-md mx-auto" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Step 3: Data Migration and Synchronization</h2>
            <p>
              One of the most crucial aspects of migrating to the cloud is moving your data. This phase ensures your data is accurately transferred and kept synchronized between your on-premises infrastructure and AWS cloud services. For minimal downtime, consider the following options:
            </p>
            <ul className="list-disc list-outside pl-5 mt-4 space-y-2"> {/* Adjusted list styling */}
              <li><strong>AWS Database Migration Service (DMS):</strong> This helps you migrate your databases to AWS with minimal downtime.</li>
              <li><strong>Hybrid Cloud Configuration:</strong> Setting up a hybrid cloud where your on-premises infrastructure and AWS work together seamlessly during migration.</li>
              <li><strong>Continuous Replication:</strong> Using tools like AWS DataSync or DMS's Change Data Capture (CDC) features to replicate data in real-time, ensuring consistency.</li>
            </ul>
            <p>
              Using AWS DMS, for example, you can migrate your databases to RDS without disrupting your application’s availability. This process also includes synchronization of ongoing changes during the migration period.
            </p>

            {/* Image showing database migration */}
            <div className="my-8"> {/* Added margin */}
              <Image src="/images/aws-database-migration.png" alt="AWS Database Migration" width={800} height={400} className="rounded-lg shadow-md mx-auto" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Step 4: Testing and Validation</h2>
            <p>
              Before switching over to the AWS-hosted environment completely, it’s essential to run a series of tests to validate the migration. This includes:
            </p>
            <ul className="list-disc list-outside pl-5 mt-4 space-y-2"> {/* Adjusted list styling */}
              <li><strong>Unit Testing:</strong> Test each application component to ensure functionality in the new environment.</li>
              <li><strong>Integration Testing:</strong> Verify interactions between different components and services.</li>
              <li><strong>Performance Testing:</strong> Test the application’s performance under load against pre-established benchmarks.</li>
              <li><strong>Security Testing:</strong> Run vulnerability scans and penetration tests on the new AWS environment.</li>
              <li><strong>User Acceptance Testing (UAT):</strong> Have end-users validate the application's functionality and usability.</li>
            </ul>
            <p>
              By performing rigorous testing, you ensure that your application behaves as expected in the cloud and meets your organization’s performance and security standards.
            </p>

            {/* Image showing testing phase */}
            <div className="my-8"> {/* Added margin */}
              <Image src="/images/aws-testing-validation.png" alt="Testing Phase" width={800} height={400} className="rounded-lg shadow-md mx-auto" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Step 5: Final Cutover and Go-Live</h2>
            <p>
              After successful testing, it’s time for the final cutover. The final cutover involves switching the traffic to the AWS environment while ensuring that everything works smoothly. Key steps during the cutover include:
            </p>
            <ul className="list-disc list-outside pl-5 mt-4 space-y-2"> {/* Adjusted list styling */}
              <li><strong>DNS Switch:</strong> Update DNS records (e.g., using Amazon Route 53) to point to your new cloud-based application endpoints (often using weighted routing or blue/green deployment strategies for a gradual shift).</li>
              <li><strong>Final Data Sync & Verification:</strong> Ensure all data changes are fully replicated and verified in the cloud environment just before the switch.</li>
              <li><strong>Application Cutover:</strong> Stop the legacy application (or put it in read-only mode) and activate the new cloud application.</li>
              <li><strong>Post-Cutover Monitoring:</strong> Intensively monitor system performance, application logs (via CloudWatch Logs), and user feedback immediately after cutover to quickly identify and resolve any unforeseen issues.</li>
              <li><strong>Rollback Plan:</strong> Have a documented and tested rollback plan in case of critical issues during cutover.</li>
            </ul>
            <p>
              Once the cutover is complete and stability is confirmed, your legacy application will be fully operational in the AWS cloud with zero (or minimal planned) downtime. At this stage, you can begin decommissioning the old on-premise infrastructure and fully leverage cloud-native features like auto-scaling, load balancing, and enhanced security.
            </p>

            {/* Image showing Go-Live process */}
            <div className="my-8"> {/* Added margin */}
              <Image src="/images/aws-go-live.png" alt="Go-Live Process" width={800} height={400} className="rounded-lg shadow-md mx-auto" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Conclusion</h2>
            <p>
              Migrating legacy applications to AWS with zero or minimal downtime is a challenging yet achievable goal with careful planning and execution. By following these steps—thorough assessment, robust cloud foundation setup, employing appropriate migration and synchronization tools (like AWS DMS), and performing rigorous testing—you can ensure a seamless transition. With the right preparation, strategy, and AWS services, your business can continue its operations uninterrupted while embracing the scalability, reliability, and innovation potential of cloud computing.
            </p>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
