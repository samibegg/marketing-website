import Header from '../../components/Header'; // Adjust path as needed
import Footer from '../../components/Footer'; // Adjust path as needed
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Data for this specific case study
const caseStudyData = {
  title: 'Cloud-Native App Development for a Healthcare Provider',
  industry: 'Healthcare',
  solution: 'App Development (Cloud-Native Architecture, HIPAA Compliance)',
  partner: 'Deloitte', // Replace with your company name
  image: '/images/cloud-native-healthcare.png', // Ensure path is correct
  slug: 'cloud-native-app-development-for-a-healthcare-provider',
};

export default function CaseStudyHealthcareCloudNative() {
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
              A progressive healthcare provider sought to improve patient care coordination and clinician access to critical data by developing a modern, secure, and scalable Electronic Health Record (EHR) access portal. Their legacy systems were siloed and difficult to access remotely. {partner} collaborated with the provider to design and build a cloud-native application leveraging microservices, containerization, and serverless technologies, ensuring strict adherence to HIPAA compliance regulations. The resulting platform delivered a <strong>50% improvement in authorized personnel's access speed to patient data</strong> and significantly enhanced data security and interoperability, ultimately supporting better patient outcomes.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Client Overview</h2>
            <p>
              The client is a multi-facility healthcare provider committed to delivering high-quality patient care. They operate hospitals and clinics, employing a large network of physicians, nurses, and support staff. Efficient and secure access to comprehensive patient information is critical for their clinical decision-making and operational workflows.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">The Challenge: Legacy Systems Hindering Modern Healthcare Delivery</h2>
            <p>
              The provider's existing IT environment faced several obstacles common in healthcare:
            </p>
            <ol>
              <li><strong>Data Silos:</strong> Patient data was often fragmented across different legacy systems (EHRs, lab systems, imaging archives) making it difficult for clinicians to get a complete, unified view of a patient's history quickly.</li>
              <li><strong>Limited Accessibility:</strong> Accessing patient records often required being on the hospital network, hindering physicians working remotely or moving between facilities. Mobile access was limited and cumbersome.</li>
              <li><strong>Scalability Concerns:</strong> The legacy systems struggled to handle increasing data volumes and user load, leading to performance issues during peak times.</li>
              <li><strong>Integration Difficulties:</strong> Integrating new digital health tools or third-party applications with the rigid legacy systems was complex and costly.</li>
              <li><strong>Compliance Overhead:</strong> Ensuring HIPAA compliance across disparate, older systems required significant manual auditing and security patching efforts.</li>
            </ol>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">The Solution: A Secure, Scalable Cloud-Native Portal</h2>
            <p>
              {partner} architected a modern application platform built entirely on cloud-native principles:
            </p>
            <h3>1. Microservices Architecture:</h3>
            <ul>
              <li>Decomposed application functionality into independent services (e.g., Patient Demographics, Clinical Notes, Lab Results, Imaging Links, Authentication, Audit Logging).</li>
              <li>Developed services using appropriate technologies (e.g., Node.js, Python, .NET Core) communicating via secure APIs (REST/GraphQL).</li>
            </ul>
            <h3>2. Containerization and Orchestration:</h3>
            <ul>
              <li>Containerized each microservice using Docker for consistency across environments.</li>
              <li>Deployed and managed containers using Kubernetes (e.g., EKS, AKS, GKE) for automated scaling, self-healing, and efficient resource utilization.</li>
            </ul>
            <h3>3. Serverless Components:</h3>
            <ul>
              <li>Utilized serverless functions (e.g., AWS Lambda, Azure Functions, Google Cloud Functions) for event-driven tasks like data synchronization triggers, notifications, and background processing, optimizing cost and reducing operational burden.</li>
            </ul>
            <h3>4. Secure Data Management:</h3>
            <ul>
              <li>Leveraged cloud-native managed databases (e.g., RDS/Azure SQL with encryption, DynamoDB/Cosmos DB) designed for scalability and security.</li>
              <li>Implemented robust data encryption at rest and in transit.</li>
              <li>Ensured data segregation and implemented fine-grained access controls based on user roles (RBAC).</li>
            </ul>
             <h3>5. API-Driven Integration & FHIR Compliance:</h3>
             <ul>
               <li>Built APIs adhering to healthcare interoperability standards like HL7 FHIR where applicable, facilitating easier integration with existing hospital systems and future third-party applications.</li>
               <li>Utilized an API Gateway for secure access, throttling, and monitoring of APIs.</li>
             </ul>
             <h3>6. Rigorous Security & HIPAA Compliance:</h3>
             <ul>
                <li>Designed the entire infrastructure and application stack adhering to HIPAA security and privacy rule requirements.</li>
                <li>Implemented multi-factor authentication (MFA), comprehensive audit logging for all data access and modifications, intrusion detection, and regular vulnerability scanning.</li>
                <li>Utilized cloud provider services specifically designed for HIPAA compliance (e.g., signing Business Associate Agreements - BAAs).</li>
             </ul>
             <h3>7. Modern Frontend:</h3>
              <ul>
                <li>Developed a responsive web frontend (e.g., using React, Angular, or Vue.js) providing clinicians with a clean, intuitive interface accessible from desktops, tablets, and mobile devices.</li>
              </ul>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Implementation Highlights</h2>
            <p>
              Security and compliance were paramount throughout the development lifecycle:
            </p>
            <ul>
              <li><strong>Technologies:</strong> Docker, Kubernetes, [Serverless Platform], Node.js/Python/.NET Core, React/Angular/Vue, PostgreSQL/DynamoDB, Terraform, [Cloud Provider Security Tools].</li>
              <li><strong>Standards:</strong> HIPAA, potentially HL7 FHIR.</li>
              <li><strong>Cloud Platform:</strong> [Chosen Cloud Provider - e.g., AWS, Azure, or GCP] with HIPAA eligibility.</li>
              <li><strong>Development Practices:</strong> DevSecOps, CI/CD, automated security testing, regular audits.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Results & Impact: Faster Access, Stronger Security</h2>
            <p>
              The cloud-native EHR access portal delivered critical improvements:
            </p>
            <ul>
              <li><strong>50% Improvement in Data Access Speed:</strong> Clinicians experienced significantly faster load times and easier navigation when accessing comprehensive patient records through the unified portal, saving valuable time during patient encounters.</li>
              <li><strong>Enhanced Data Security:</strong> Centralized, robust security controls, automated audit logging, and end-to-end encryption significantly strengthened the protection of sensitive Patient Health Information (PHI), simplifying HIPAA compliance.</li>
              <li><strong>Improved Accessibility:</strong> Secure access from any authorized device (including mobile) enabled clinicians to retrieve patient information when and where they needed it, improving care coordination and responsiveness.</li>
              <li><strong>Increased Scalability & Reliability:</strong> The Kubernetes-based infrastructure automatically scaled to handle varying user loads and offered high availability, ensuring the portal was consistently accessible.</li>
              <li><strong>Foundation for Interoperability:</strong> The API-first design and adoption of standards like FHIR laid the groundwork for easier integration with future digital health tools and data exchange partners.</li>
              <li><strong>Reduced Operational Overhead:</strong> Leveraging managed cloud services and automation reduced the burden on internal IT staff for infrastructure maintenance and patching.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Conclusion</h2>
            <p>
              By partnering with {partner} to develop a secure, scalable, cloud-native application, the healthcare provider successfully modernized access to critical patient data. The new platform not only improved clinician efficiency and data security in compliance with HIPAA regulations but also established a flexible, future-ready foundation to support ongoing digital transformation efforts aimed at enhancing patient care.
            </p>

          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}

