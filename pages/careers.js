import { useState } from 'react'; // Import useState
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Define detailed job data (expanded content)
const jobsData = [
  {
    id: 'nodejs-dev-01', // Unique ID for linking and keys
    title: 'Node.js Full Stack Senior Developer',
    location: '(Hybrid / Remote Options Available)',
    shortDescription: `Architect and build robust backend services (Node.js) and integrate them with modern frontends (React, Next.js), creating scalable, secure, and high-performance applications.`,
    roleSummary: `As a Senior Node.js Full Stack Developer at ForgeMission, you will play a pivotal role in designing, developing, and deploying sophisticated web applications for our enterprise clients. You'll leverage your expertise in both backend (Node.js) and frontend (React/Next.js) development to build end-to-end solutions, working closely with cross-functional teams to deliver high-impact digital transformation projects.`,
    responsibilities: [
      'Architect, design, develop, test, deploy, and maintain robust and scalable backend APIs and microservices using Node.js (Express, Koa, or NestJS).',
      'Develop dynamic, responsive, and user-friendly frontend applications using React, Next.js, and modern JavaScript/TypeScript practices.',
      'Collaborate closely with product managers, UI/UX designers, and other engineers to translate requirements into technical solutions.',
      'Integrate backend services with frontend components and third-party systems.',
      'Optimize application performance, scalability, security, and reliability.',
      'Implement database solutions using both SQL (e.g., PostgreSQL) and NoSQL (e.g., MongoDB) databases.',
      'Write clean, maintainable, well-documented, and testable code (unit, integration tests).',
      'Implement and manage CI/CD pipelines for automated testing and deployment (e.g., Jenkins, GitLab CI, GitHub Actions).',
      'Containerize applications using Docker and manage deployments (potentially with Kubernetes).',
      'Participate in code reviews, providing and receiving constructive feedback.',
      'Mentor junior developers and contribute to team knowledge sharing.',
      'Troubleshoot and debug complex issues across the full stack.',
    ],
    requiredQualifications: [
      'Bachelor’s degree in Computer Science, Engineering, or a related field, or equivalent practical experience.',
      '5+ years of professional software development experience with a strong focus on Node.js.',
      'Demonstrable expertise in building RESTful APIs and/or GraphQL APIs.',
      'Solid experience with microservices architecture patterns.',
      'Proficiency in modern frontend frameworks, particularly React and/or Next.js.',
      'Strong understanding of JavaScript (ES6+) and/or TypeScript.',
      'Experience with both SQL (e.g., PostgreSQL, MySQL) and NoSQL (e.g., MongoDB, DynamoDB) databases.',
      'Familiarity with software development lifecycle (SDLC) best practices, including Agile methodologies.',
      'Experience with version control systems, primarily Git.',
      'Understanding of CI/CD principles and tools.',
      'Experience with containerization using Docker.',
      'Excellent problem-solving and analytical skills.',
      'Strong communication and collaboration abilities.',
    ],
    preferredQualifications: [
      'Master’s degree in Computer Science or related field.',
      'Experience with cloud platforms (AWS, Azure, or GCP), particularly serverless functions (Lambda, Azure Functions) and managed services.',
      'Experience with message queuing systems (e.g., Kafka, RabbitMQ, SQS).',
      'Experience with Infrastructure as Code (IaC) tools like Terraform or CloudFormation.',
      'Familiarity with Kubernetes or other container orchestration platforms.',
      'Experience contributing to open-source projects.',
      'Knowledge of web security best practices (OWASP).',
    ],
    whatWeOffer: [
      'Competitive salary, comprehensive health benefits (medical, dental, vision), and 401(k) plan.',
      'Opportunity to work on challenging, large-scale projects for diverse enterprise clients.',
      'A collaborative, innovative, and supportive work environment.',
      'Significant opportunities for professional growth and career advancement.',
      'Budget for continuous learning, certifications, and conference attendance.',
      'Flexible hybrid work model balancing in-office (Tysons, VA) collaboration with remote work.',
      'Generous paid time off (PTO) policy.',
    ],
  },
  {
    id: 'bigdata-arch-01',
    title: 'Senior Big Data Architect',
    location: '(Hybrid / Remote Options Available)',
    shortDescription: `Lead the design and implementation of large-scale data pipelines for real-time and batch processing, delivering efficient solutions using modern cloud data platforms.`,
    roleSummary: `As a Senior Big Data Architect at ForgeMission, you will be instrumental in shaping the future of our clients' data capabilities. You will lead the strategic design, development, and implementation of scalable, resilient, and high-performance big data solutions, enabling advanced analytics, real-time insights, and data-driven decision-making across the enterprise.`,
    responsibilities: [
      'Lead the architectural design and implementation of end-to-end big data solutions on cloud platforms (AWS, Azure, GCP).',
      'Develop blueprints and reference architectures for data ingestion, processing (batch and stream), storage (data lakes, data warehouses), and analytics platforms.',
      'Evaluate, select, and integrate appropriate big data technologies (e.g., Kafka, Spark, Flink, Hadoop, Hive, Presto, Snowflake, Databricks, BigQuery, Redshift).',
      'Design and implement robust data pipelines ensuring data quality, reliability, and efficiency.',
      'Define and enforce data governance, data security, and data privacy policies within the designed architectures.',
      'Optimize the performance, scalability, and cost-effectiveness of big data systems.',
      'Collaborate closely with data scientists, data engineers, analysts, and business stakeholders to understand requirements and deliver value.',
      'Provide technical leadership and mentorship to data engineering teams.',
      'Stay abreast of emerging trends and technologies in the big data and cloud landscape.',
      'Develop proofs-of-concept (PoCs) and prototypes for new technologies and approaches.',
      'Create detailed technical documentation, including architecture diagrams and design specifications.',
    ],
    requiredQualifications: [
      'Bachelor’s or Master’s degree in Computer Science, Engineering, Information Systems, or a related quantitative field.',
      '8+ years of experience in data engineering, data warehousing, or data architecture roles.',
      'Proven track record of architecting and delivering complex, large-scale big data solutions.',
      'Deep expertise with the Hadoop ecosystem (HDFS, MapReduce, Hive, Pig, Spark, YARN).',
      'Extensive hands-on experience with stream processing technologies (e.g., Kafka, Spark Streaming, Flink, Kinesis).',
      'Strong experience with at least one major cloud providers data services (e.g., AWS EMR, Redshift, Glue, Kinesis, Lake Formation; Azure Synapse, Databricks, HDInsight, Data Factory; GCP BigQuery, Dataflow, Dataproc, Pub/Sub).',
      'Proficiency in data modeling techniques for both relational and non-relational data stores.',
      'Solid understanding of ETL/ELT design patterns and best practices.',
      'Proficiency in programming languages commonly used in data engineering (e.g., Python, Scala, Java).',
      'Experience designing solutions for high-volume, distributed systems.',
      'Excellent analytical, problem-solving, and strategic thinking skills.',
      'Strong communication and presentation skills, with the ability to explain complex technical concepts to diverse audiences.',
    ],
    preferredQualifications: [
      'Advanced degree (PhD) in a relevant field.',
      'Experience with modern data warehousing platforms (e.g., Snowflake, BigQuery, Redshift Spectrum).',
      'Familiarity with data mesh or data fabric concepts.',
      'Experience with containerization (Docker) and orchestration (Kubernetes) in data environments.',
      'Knowledge of machine learning concepts and MLOps.',
      'Relevant certifications in cloud platforms (AWS Certified Solutions Architect/Data Analytics, Azure Data Engineer/Solutions Architect, GCP Professional Data Engineer/Cloud Architect) or big data technologies.',
      'Experience in a client-facing consulting role.',
    ],
    whatWeOffer: [
       'Highly competitive compensation package including bonus potential.',
       'Comprehensive benefits package (health, dental, vision, life insurance, 401k).',
       'Lead impactful projects shaping data strategies for major organizations.',
       'Access to cutting-edge technologies and cloud platforms.',
       'Culture of continuous learning with professional development support.',
       'Collaborative team environment with opportunities for thought leadership.',
       'Flexible hybrid work arrangements (office / Remote).',
    ],
  },
  {
    id: 'ai-ds-01',
    title: 'AI Data Scientist',
    location: '(Hybrid / Remote Options Available)',
    shortDescription: `Design, build, and deploy machine learning models to drive decision-making, personalization, and automation across various client projects involving NLP, computer vision, and predictive analytics.`,
    roleSummary: `Join ForgeMission's growing AI practice as an AI Data Scientist. You will be at the forefront of applying advanced machine learning techniques, including deep learning and generative AI, to solve challenging business problems for our clients. You'll work end-to-end, from data exploration and feature engineering to model development, validation, deployment, and monitoring.`,
    responsibilities: [
      'Explore, clean, and preprocess large datasets to prepare them for machine learning model development.',
      'Identify opportunities to apply AI/ML techniques to address client business needs.',
      'Design, develop, train, and evaluate machine learning models using various algorithms and frameworks (e.g., regression, classification, clustering, deep learning, reinforcement learning).',
      'Work on projects involving Natural Language Processing (NLP), Computer Vision (CV), time series analysis, recommender systems, or predictive analytics.',
      'Develop and implement state-of-the-art models, potentially including Large Language Models (LLMs), vector databases, and Retrieval-Augmented Generation (RAG) patterns.',
      'Perform feature engineering and selection to improve model performance.',
      'Validate model performance and ensure fairness, interpretability, and robustness.',
      'Collaborate with data engineers to deploy models into production environments using MLOps best practices.',
      'Monitor model performance in production and iterate as needed.',
      'Communicate complex findings, insights, and recommendations clearly to both technical and non-technical stakeholders.',
      'Stay current with the latest advancements in AI/ML research and technologies.',
      'Contribute to internal knowledge sharing and capability building within the AI team.',
    ],
    requiredQualifications: [
      'Master’s or PhD degree in Computer Science, Statistics, Mathematics, Physics, or a related quantitative field.',
      'Proven experience (typically 3+ years post-grad) working as a Data Scientist or Machine Learning Engineer.',
      'Strong theoretical foundation in statistics, probability, and machine learning algorithms.',
      'Proficiency in Python and relevant data science libraries (e.g., Pandas, NumPy, SciPy, scikit-learn).',
      'Hands-on experience with deep learning frameworks such as TensorFlow, PyTorch, or Keras.',
      'Experience with data querying languages (e.g., SQL).',
      'Experience processing and analyzing large datasets.',
      'Familiarity with the end-to-end machine learning lifecycle, including data preprocessing, model training, evaluation, deployment, and monitoring.',
      'Excellent problem-solving skills and analytical thinking.',
      'Strong communication and presentation skills.',
      'Ability to work independently and collaboratively in a fast-paced environment.',
    ],
    preferredQualifications: [
      'PhD in a relevant field.',
      'Experience with cloud ML platforms (e.g., AWS SageMaker, Azure Machine Learning, Google AI Platform/Vertex AI).',
      'Experience with MLOps tools and practices (e.g., MLflow, Kubeflow, DVC).',
      'Experience with big data technologies (e.g., Spark, Hadoop).',
      'Experience with specific AI domains like NLP (e.g., Transformers, spaCy, NLTK), Computer Vision (e.g., OpenCV), or Reinforcement Learning.',
      'Experience with LLMs, vector databases (e.g., Pinecone, Weaviate), and RAG architectures.',
      'Experience deploying models as APIs (e.g., Flask, FastAPI).',
      'Contributions to research publications or open-source projects.',
      'Experience in a consulting environment.',
    ],
    whatWeOffer: [
       'Exciting opportunity to work on diverse and impactful AI projects.',
       'Competitive salary, bonus, and comprehensive benefits.',
       'Access to powerful computing resources and cloud platforms.',
       'Collaborative environment with leading experts in AI, cloud, and data.',
       'Strong emphasis on learning, research, and professional development.',
       'Flexible work arrangements promoting work-life balance (Hybrid/Remote).',
       'Opportunity to contribute to building a cutting-edge AI practice.',
    ],
  },
  {
    id: 'cloud-arch-01',
    title: 'Cloud Infrastructure Implementation Architect',
    location: '(Hybrid / Remote Options Available)',
    shortDescription: `Lead cloud transformation initiatives by designing secure, scalable infrastructure on AWS, Azure, or GCP, defining IaC, networking, and automation strategies.`,
    roleSummary: `As a Cloud Infrastructure Implementation Architect at ForgeMission, you will be a key leader guiding our enterprise clients through complex cloud adoption and modernization journeys. You will design resilient, secure, cost-effective, and automated cloud infrastructure solutions on major platforms (AWS, Azure, GCP) and oversee their successful implementation, ensuring alignment with business objectives and industry best practices.`,
    responsibilities: [
      'Lead the design and architecture of scalable, highly available, and fault-tolerant cloud infrastructure solutions on AWS, Azure, and/or GCP.',
      'Conduct cloud readiness assessments and develop cloud migration strategies and roadmaps.',
      'Define technical requirements based on client business needs, translating them into robust cloud architectures.',
      'Develop and implement Infrastructure as Code (IaC) using tools like Terraform, CloudFormation, or ARM templates.',
      'Design secure network architectures within cloud environments (VPCs, subnets, security groups, firewalls, VPNs, Direct Connect/ExpressRoute).',
      'Implement containerization and orchestration solutions using Docker, Kubernetes (EKS, AKS, GKE), or other container services.',
      'Design and implement CI/CD pipelines for infrastructure and application deployments.',
      'Define and implement cloud security best practices, including identity and access management (IAM), data encryption, and compliance controls.',
      'Develop strategies for monitoring, logging, alerting, and cost management in the cloud.',
      'Lead implementation teams, providing technical guidance and oversight throughout the project lifecycle.',
      'Collaborate with client stakeholders, development teams, and operations teams.',
      'Create comprehensive technical documentation, diagrams, and runbooks.',
      'Provide expertise on cloud governance, FinOps, and operational best practices.',
    ],
    requiredQualifications: [
      'Bachelor’s degree in Computer Science, Information Technology, Engineering, or a related field, or equivalent experience.',
      '10+ years of experience in IT infrastructure roles, with a significant focus (5+ years) on cloud architecture and implementation.',
      'Deep, hands-on expertise with at least one major cloud platform (AWS, Azure, or GCP), with strong preference for multi-cloud experience.',
      'Proven experience designing and implementing core cloud infrastructure components (compute, storage, networking, databases).',
      'Strong proficiency with Infrastructure as Code (IaC) tools (Terraform strongly preferred).',
      'Experience with containerization (Docker) and container orchestration (Kubernetes).',
      'Solid understanding of networking concepts (TCP/IP, DNS, HTTP, VPNs, load balancing, firewalls).',
      'Experience with CI/CD tools and practices.',
      'Strong understanding of cloud security principles and best practices (IAM, encryption, network security, compliance frameworks like SOC2, ISO 27001, HIPAA).',
      'Experience with scripting languages (e.g., Python, Bash, PowerShell).',
      'Excellent client-facing communication, presentation, and consulting skills.',
      'Proven ability to lead technical teams and projects.',
    ],
    preferredQualifications: [
      'Master’s degree in a relevant field.',
      'Professional-level cloud certifications (e.g., AWS Solutions Architect Professional, Azure Solutions Architect Expert, GCP Professional Cloud Architect).',
      'Specialty certifications in Networking, Security, or Kubernetes (e.g., CKA).',
      'Experience with serverless architectures.',
      'Experience with configuration management tools (e.g., Ansible, Chef, Puppet).',
      'Experience with disaster recovery and business continuity planning in the cloud.',
      'Experience with FinOps practices and cloud cost optimization.',
      'Experience migrating large-scale enterprise workloads to the cloud.',
    ],
    whatWeOffer: [
      'Leadership role in high-visibility cloud transformation projects.',
      'Competitive compensation package, including bonus and comprehensive benefits.',
      'Work with a talented team of cloud experts and engineers.',
      'Access to the latest cloud technologies and training resources.',
      'Support for obtaining advanced certifications.',
      'Opportunity to influence client strategies and technical direction.',
      'Flexible hybrid work environment based out of Tysons, VA.',
    ],
  },
  {
    id: 'sre-01',
    title: 'Senior Site Reliability Engineer (SRE)',
    location: '(Hybrid / Remote Options Available)',
    shortDescription: `Drive observability, performance, and reliability for critical client systems by building resilient infrastructure, automating operations, and ensuring high availability.`,
    roleSummary: `ForgeMission is seeking a passionate Senior Site Reliability Engineer (SRE) to embed SRE principles and practices within our client engagements and internal operations. You will be responsible for ensuring the availability, performance, scalability, and reliability of complex distributed systems, primarily hosted on cloud platforms. You will achieve this through automation, robust monitoring, incident management, and close collaboration with development and infrastructure teams.`,
    responsibilities: [
      'Design, build, and maintain scalable, reliable, and performant infrastructure on cloud platforms (AWS, Azure, GCP).',
      'Develop and implement comprehensive monitoring, logging, and alerting solutions (e.g., Prometheus, Grafana, Datadog, ELK Stack, CloudWatch, Azure Monitor).',
      'Automate infrastructure provisioning, configuration management, and application deployments using tools like Terraform, Ansible, Kubernetes, and CI/CD pipelines.',
      'Define Service Level Objectives (SLOs) and Service Level Indicators (SLIs) for critical systems and services.',
      'Manage and improve incident response processes; participate in on-call rotations and lead post-mortem analyses to prevent recurrence.',
      'Perform deep dives into performance issues, conduct root cause analysis (RCA), and implement remediation strategies.',
      'Develop tools and automation to reduce operational toil and improve system efficiency.',
      'Champion SRE best practices (e.g., error budgets, blameless post-mortems, chaos engineering) across engineering teams.',
      'Work closely with development teams to influence system design for reliability and operability.',
      'Implement and manage container orchestration platforms (Kubernetes preferred).',
      'Ensure security best practices are integrated into infrastructure and operations.',
      'Manage system capacity planning and performance tuning.',
    ],
    requiredQualifications: [
      'Bachelor’s degree in Computer Science, Engineering, or a related technical field, or equivalent practical experience.',
      '5+ years of experience in Site Reliability Engineering, DevOps, or Systems Engineering roles.',
      'Strong experience with at least one major cloud provider (AWS, Azure, or GCP).',
      'Proven expertise in building and managing observability stacks (monitoring, logging, tracing). Experience with tools like Prometheus, Grafana, ELK/OpenSearch, Datadog, Jaeger, etc.',
      'Proficiency in scripting and automation using languages such as Python, Go, Bash, or PowerShell.',
      'Hands-on experience with Infrastructure as Code (IaC) tools like Terraform or CloudFormation.',
      'Experience with containerization (Docker) and container orchestration (Kubernetes).',
      'Solid understanding of Linux/Unix operating systems and networking fundamentals (TCP/IP, DNS, HTTP, Load Balancing).',
      'Experience with CI/CD tools and methodologies.',
      'Experience with incident management and participating in on-call rotations.',
      'Strong troubleshooting and problem-solving skills in complex distributed systems.',
      'Excellent communication and collaboration skills.',
    ],
    preferredQualifications: [
      'Master’s degree in a relevant field.',
      'Experience with configuration management tools (Ansible, Chef, Puppet).',
      'Experience with chaos engineering principles and tools.',
      'Database administration experience (SQL or NoSQL).',
      'Understanding of security engineering principles.',
      'Relevant certifications (e.g., AWS DevOps Engineer, Azure DevOps Engineer Expert, GCP Professional Cloud DevOps Engineer, CKA/CKAD).',
      'Experience working in a consulting or client-facing environment.',
    ],
    whatWeOffer: [
       'Opportunity to shape reliability practices for diverse client systems.',
       'Work with modern cloud-native technologies and observability tools.',
       'Highly competitive salary, benefits, and bonus structure.',
       'Collaborative environment focused on automation and continuous improvement.',
       'Support for professional development, training, and certifications.',
       'Flexible hybrid work model (office / Remote).',
       'Impactful role ensuring the stability of critical enterprise applications.',
    ],
  },
];

// Helper component for the expand/collapse icon
const ExpandIcon = ({ isExpanded }) => (
  <svg
    className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);


export default function CareersPage() {
  const [openJobIndex, setOpenJobIndex] = useState(null); // State to track open job index

  const toggleJob = (index) => {
    setOpenJobIndex(openJobIndex === index ? null : index);
  };

  // General EEO Statement
  const eeoStatement = "ForgeMission is an Equal Opportunity Employer. We celebrate diversity and are committed to creating an inclusive environment for all employees. All qualified applicants will receive consideration for employment without regard to race, color, religion, sex, sexual orientation, gender identity, national origin, disability, veteran status, or any other protected characteristic as outlined by federal, state, or local laws.";


  return (
    <div className="bg-white min-h-screen text-gray-900">
      <Header />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-10">Join Our Team</h1>
        <p className="text-lg text-center text-gray-600 mb-16 max-w-3xl mx-auto">
          We’re pioneering digital transformation and looking for driven, skilled professionals passionate about building the future of enterprise technology. Explore our open opportunities below.
        </p>
        <div className="space-y-6"> {/* Reduced space between job items */}
          {jobsData.map((job, idx) => {
            const isExpanded = openJobIndex === idx;
            const contentId = `job-content-${job.id}`;

            return (
              <div key={job.id} className="border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                {/* Clickable Header */}
                <button
                  className="flex justify-between items-center w-full text-left p-4 sm:p-6 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                  onClick={() => toggleJob(idx)}
                  aria-expanded={isExpanded}
                  aria-controls={contentId}
                >
                  <div>
                    <h2 className="text-xl sm:text-2xl font-semibold text-blue-700">{job.title}</h2>
                    <p className="text-sm text-gray-500 mt-1">{job.location}</p>
                  </div>
                  <ExpandIcon isExpanded={isExpanded} />
                </button>

                {/* Collapsible Content Area */}
                <div
                  id={contentId}
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[2000px]' : 'max-h-0'}`} // Adjust max-h if needed
                  style={{ transitionProperty: 'max-height' }} // Ensure transition targets max-height
                >
                  <div className="p-4 sm:p-6 border-t border-gray-200">
                    {job.roleSummary && (
                       <div className="mb-6">
                         <h3 className="text-lg font-semibold text-gray-800 mb-2">Role Summary</h3>
                         <p className="text-gray-700">{job.roleSummary}</p>
                       </div>
                    )}

                    {job.responsibilities && job.responsibilities.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Key Responsibilities</h3>
                        <ul className="list-disc list-outside pl-5 text-gray-700 space-y-1">
                          {job.responsibilities.map((resp, i) => <li key={i}>{resp}</li>)}
                        </ul>
                      </div>
                    )}

                    {job.requiredQualifications && job.requiredQualifications.length > 0 && (
                       <div className="mb-6">
                         <h3 className="text-lg font-semibold text-gray-800 mb-2">Required Qualifications</h3>
                         <ul className="list-disc list-outside pl-5 text-gray-700 space-y-1">
                           {job.requiredQualifications.map((qual, i) => <li key={i}>{qual}</li>)}
                         </ul>
                       </div>
                    )}

                    {job.preferredQualifications && job.preferredQualifications.length > 0 && (
                       <div className="mb-6">
                         <h3 className="text-lg font-semibold text-gray-800 mb-2">Preferred Qualifications</h3>
                         <ul className="list-disc list-outside pl-5 text-gray-700 space-y-1">
                           {job.preferredQualifications.map((qual, i) => <li key={i}>{qual}</li>)}
                         </ul>
                       </div>
                    )}

                     {job.whatWeOffer && job.whatWeOffer.length > 0 && (
                       <div className="mb-6">
                         <h3 className="text-lg font-semibold text-gray-800 mb-2">What We Offer</h3>
                         <ul className="list-disc list-outside pl-5 text-gray-700 space-y-1">
                           {job.whatWeOffer.map((offer, i) => <li key={i}>{offer}</li>)}
                         </ul>
                       </div>
                    )}

                    {/* Apply Button (Optional) */}
                        {/* UPDATED Apply Button */}
                        <div className="mt-6 text-center sm:text-left">
                           <Link
                            href={{
                              pathname: '/apply',
                              query: {
                                jobTitle: encodeURIComponent(job.title), // Pass job title as query param
                                jobId: job.id                          // Pass job ID as query param
                              },
                            }}
                            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition"
                           >

                            Apply Now

                          </Link>
                        </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>

         {/* EEO Statement Section */}
         <section className="mt-16 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">Equal Opportunity Employer</h2>
            <p className="text-sm text-gray-600 text-center max-w-3xl mx-auto">
              {eeoStatement}
            </p>
          </section>

      </main>
      <Footer />
    </div>
  );
}