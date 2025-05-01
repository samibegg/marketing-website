import Image from 'next/image';
import Header from '../../components/Header'; // Adjust path as needed
import Footer from '../../components/Footer'; // Adjust path as needed
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function MonolithRefactorArticle() {
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
               Refactoring a Monolith into Microservices Without Downtime
             </h1>
             <p className="text-lg text-gray-600">
               Refactoring a monolithic application into microservices can be a daunting task, especially if the application is mission-critical. This article walks you through how to use the strangler pattern, domain-driven design, and containerization to transition to microservices without disrupting your production environment.
             </p>
          </div>


          {/* Image: Monolith to Microservices */}
          <div className="my-8">
            <Image src="/images/monolithic-to-microservices.png" alt="Monolith to Microservices" width={800} height={400} className="rounded-lg shadow-md mx-auto" />
          </div>

          {/* Apply prose classes for article styling */}
          {/* Ensure you have @tailwindcss/typography installed and configured */}
          <article className="prose prose-lg lg:prose-xl max-w-none text-gray-700">

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Step 1: Understand Your Monolith Deeply</h2>
            <p>
              Before attempting to break apart a monolith, a deep understanding of its current state is paramount. This isn't just about code; it involves understanding business processes, data flows, dependencies, and operational characteristics.
            </p>
            <ul className="list-disc list-outside pl-5 mt-4 space-y-2"> {/* Adjusted list styling */}
              <li><strong>Document the Architecture:</strong> Create diagrams showing major components, databases, external integrations, and key data flows. Identify synchronous vs. asynchronous communication patterns.</li>
              <li><strong>Identify Business Capabilities & Domains:</strong> Map code modules or sections to specific business functions (e.g., user management, order processing, inventory lookup, reporting). This is crucial for defining potential microservice boundaries later.</li>
              <li><strong>Analyze Dependencies:</strong> Use code analysis tools and manual review to map dependencies between different parts of the monolith (e.g., shared libraries, direct function calls, shared database tables). Understand the coupling level.</li>
              <li><strong>Data Model Analysis:</strong> Examine the database schema. Identify tables primarily used by specific business capabilities versus those shared across many functions. Shared tables often represent significant challenges for decomposition.</li>
              <li><strong>Operational Assessment:</strong> Understand current deployment processes, monitoring practices, scaling bottlenecks, and failure modes.</li>
            </ul>
            <p>
              This thorough understanding forms the basis for identifying suitable candidates for extraction and planning the migration strategy.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Step 2: Implement the Strangler Fig Pattern</h2>
            <p>
              The Strangler Fig pattern (named after strangler vines that grow around trees) is a popular and relatively safe approach for incremental refactoring. Instead of a risky "big bang" rewrite, you gradually replace pieces of the monolith with new microservices, routing traffic to the new service while the old functionality still exists as a fallback.
            </p>
            <ul className="list-disc list-outside pl-5 mt-4 space-y-2">
              <li><strong>Introduce a Facade/Proxy:</strong> Place a routing layer (like an API Gateway, a dedicated reverse proxy like Nginx/Envoy, or even logic within the monolith's frontend) in front of the monolith. Initially, all traffic passes through to the existing monolith.</li>
              <li><strong>Identify & Extract a Candidate Service:</strong> Choose a relatively self-contained piece of functionality (often identified during the DDD assessment) to extract first. Build this as a new, independent microservice.</li>
              <li><strong>Intercept & Redirect Traffic:</strong> Modify the facade/proxy layer to intercept requests intended for the extracted functionality and route them to the new microservice instead of the monolith.</li>
              <li><strong>Iterate and Expand:</strong> Gradually identify, build, and redirect traffic for more functionalities, service by service. The new microservices "strangle" the old monolith over time.</li>
              <li><strong>Decommission the Monolith:</strong> Once all desired functionality has been extracted and traffic is fully routed to the new microservices, the original monolithic components can be safely decommissioned.</li>
            </ul>
            <p>
              The Strangler Fig pattern minimizes risk by allowing parallel operation and gradual rollout, enabling continuous delivery throughout the migration process without requiring significant downtime.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Step 3: Apply Domain-Driven Design (DDD) for Service Boundaries</h2>
            <p>
              Domain-Driven Design provides principles for modeling complex software based on the underlying business domain. It's invaluable for identifying logical, cohesive boundaries for your microservices.
            </p>
            <ul className="list-disc list-outside pl-5 mt-4 space-y-2">
              <li><strong>Identify Bounded Contexts:</strong> Work with domain experts to identify Bounded Contexts – specific areas within the business domain where a particular model and language apply (e.g., "Sales Context," "Shipping Context," "Inventory Context"). Each Bounded Context is a strong candidate for becoming one or more microservices.</li>
              <li><strong>Define Ubiquitous Language:</strong> Establish a common, unambiguous language shared by developers and domain experts within each Bounded Context.</li>
              <li><strong>Model Context Maps:</strong> Map the relationships between different Bounded Contexts (e.g., Shared Kernel, Customer-Supplier, Anti-Corruption Layer). This helps define how microservices will need to interact.</li>
              <li><strong>Focus on Cohesion:</strong> Ensure that functionality within a single microservice is highly cohesive (related to a single business capability).</li>
              <li><strong>Minimize Coupling:</strong> Design services to be loosely coupled, minimizing dependencies on the internal details of other services. Communication should happen via well-defined APIs.</li>
            </ul>
            <p>
              Applying DDD helps ensure that your microservices are aligned with business capabilities, leading to more maintainable, understandable, and independently evolvable services.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Step 4: Containerize and Orchestrate with Docker & Kubernetes</h2>
            <p>
              As you extract microservices, containerize them using Docker and orchestrate their deployment using Kubernetes.
            </p>
            <ul className="list-disc list-outside pl-5 mt-4 space-y-2">
              <li><strong>Dockerize Each Microservice:</strong> Create a `Dockerfile` for each new microservice, packaging its code, runtime, and dependencies into a portable image. (Refer to previous article examples for Dockerfile structure).</li>
              <li><strong>Set Up Kubernetes Cluster:</strong> Deploy a Kubernetes cluster (e.g., using managed services like EKS, AKS, GKE or on-premises).</li>
              <li><strong>Create Kubernetes Manifests:</strong> Define Kubernetes Deployments and Services for each microservice using YAML files (as shown in previous examples). Ensure you include health probes (liveness/readiness) and resource requests/limits.</li>
              <li><strong>Deploy via CI/CD:</strong> Implement separate CI/CD pipelines for each microservice to automate building, testing, pushing images, and deploying updates to Kubernetes independently.</li>
            </ul>
            <p>
              Kubernetes handles scaling, self-healing, service discovery, and load balancing, providing the necessary infrastructure foundation for a robust microservices architecture.
            </p>

            {/* Kubernetes Deployment Diagram (Re-using image placeholder) */}
            <div className="my-8">
              <Image src="/images/kubernetes-legacy.png" alt="Kubernetes Microservices Deployment" width={800} height={400} className="rounded-lg shadow-md mx-auto" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Step 5: Monitor and Manage the Distributed System</h2>
            <p>
              Microservices introduce distributed system complexities that require robust monitoring and management strategies:
            </p>
            <ul className="list-disc list-outside pl-5 mt-4 space-y-2">
              <li><strong>Centralized Logging:</strong> Aggregate logs from all microservice containers into a central system (e.g., EFK stack - Elasticsearch, Fluentd, Kibana; or Loki, Promtail, Grafana) for easier searching and analysis.</li>
              <li><strong>Distributed Tracing:</strong> Implement distributed tracing (e.g., Jaeger, Tempo, OpenTelemetry) to track requests as they flow across multiple microservices, essential for debugging latency and errors in complex interactions.</li>
              <li><strong>Metrics Collection:</strong> Gather key performance indicators (KPIs) and resource metrics from each microservice and the underlying infrastructure using tools like Prometheus and visualize them with Grafana.</li>
              <li><strong>Health Checks:</strong> Rely on Kubernetes liveness and readiness probes for automated health monitoring and recovery.</li>
              <li><strong>Alerting:</strong> Set up alerts based on logs, traces, and metrics to proactively notify teams of issues.</li>
            </ul>
            <p>
              Effective observability is non-negotiable for successfully operating a microservices architecture in production.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Conclusion</h2>
            <p>
              Refactoring a monolith into microservices without downtime is a challenging but achievable endeavor. By adopting an incremental approach like the Strangler Fig pattern, using Domain-Driven Design to define service boundaries, leveraging containerization with Docker, and orchestrating with Kubernetes, organizations can gradually modernize their applications. This transition unlocks benefits like improved scalability, faster development velocity, technology flexibility, and enhanced resilience, paving the way for future innovation. Remember that robust CI/CD, monitoring, and careful planning are crucial throughout the process.
            </p>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
