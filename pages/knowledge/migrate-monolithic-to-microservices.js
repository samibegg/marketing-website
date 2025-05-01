import Image from 'next/image';
import Header from '../../components/Header'; // Adjust path as needed
import Footer from '../../components/Footer'; // Adjust path as needed
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function MonolithToMicroservicesArticle() {
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
               Migrating from Monolithic to Microservices with Docker and Kubernetes
             </h1>
             <p className="text-lg text-gray-600">
               Migrating from a monolithic architecture to microservices is a complex process that requires careful planning and execution. In this guide, we explore how to use Docker and Kubernetes to containerize and manage microservices in a cloud-native environment.
             </p>
          </div>


          {/* Image: Monolithic to Microservices */}
          <div className="my-8">
            <Image src="/images/monolithic-to-microservices.png" alt="Monolithic to Microservices" width={800} height={400} className="rounded-lg shadow-md mx-auto" />
          </div>

          {/* Apply prose classes for article styling */}
          {/* Ensure you have @tailwindcss/typography installed and configured */}
          <article className="prose prose-lg lg:prose-xl max-w-none text-gray-700">

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">What is Monolithic Architecture?</h2>
            <p>
              Monolithic architecture refers to a traditional software design pattern where an entire application is built as a single, indivisible unit. All components—user interface (frontend), business logic (backend), data access layer, background jobs, etc.—are tightly coupled and deployed together. While often simpler to develop and deploy initially, monoliths can become bottlenecks as applications grow in complexity and scale.
            </p>

            <h3 className="text-xl font-semibold mt-4">Challenges of Monolithic Architecture</h3>
            <ul className="list-disc list-outside pl-5 mt-4 space-y-2"> {/* Adjusted list styling */}
              <li><strong>Scalability Difficulties:</strong> Scaling requires replicating the entire application, even if only one component is under heavy load, leading to inefficient resource utilization.</li>
              <li><strong>Slow Development & Deployment:</strong> Changes to any part of the application often require rebuilding, retesting, and redeploying the entire monolith, slowing down release cycles.</li>
              <li><strong>Technology Lock-in:</strong> The entire application is typically built with a single technology stack, making it difficult to adopt new languages or frameworks for specific features.</li>
              <li><strong>Reduced Fault Isolation:</strong> A failure or bug in one component can potentially bring down the entire application.</li>
              <li><strong>Maintenance Complexity:</strong> Large, complex codebases become harder to understand, maintain, and onboard new developers onto over time.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">What are Microservices?</h2>
            <p>
              Microservices architecture is an approach to building applications as a collection of small, independent, and loosely coupled services. Each service focuses on a specific business capability (e.g., user authentication, product catalog, order processing, payment gateway), runs in its own process, communicates over a network (typically using lightweight protocols like HTTP/REST or gRPC), and can be developed, deployed, and scaled independently.
            </p>

            <h3 className="text-xl font-semibold mt-4">Advantages of Microservices</h3>
            <ul className="list-disc list-outside pl-5 mt-4 space-y-2"> {/* Adjusted list styling */}
              <li><strong>Independent Scalability:</strong> Scale individual services based on their specific resource needs and traffic demands.</li>
              <li><strong>Technology Diversity:</strong> Choose the best technology stack (language, database, framework) for each specific service.</li>
              <li><strong>Faster Development Cycles:</strong> Smaller, focused teams can develop, test, and deploy their services independently and more frequently.</li>
              <li><strong>Improved Fault Isolation & Resilience:</strong> Failure in one service is less likely to impact others, improving overall application resilience (requires proper design patterns like circuit breakers).</li>
              <li><strong>Easier Maintenance:</strong> Smaller codebases are easier to understand, maintain, and update.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Step 1: Decompose the Monolith & Containerize Services</h2>
            <p>
              The migration typically starts by identifying logical boundaries within the monolith based on business capabilities (Domain-Driven Design is helpful here). Gradually extract these capabilities into separate microservices. The first practical step for deployment is containerizing each new microservice (and potentially the remaining monolith initially) using Docker.
            </p>

            <h3 className="text-xl font-semibold mt-4">Containerizing a Microservice</h3>
            <p>
              Create a `Dockerfile` for each microservice. Example for a Node.js microservice:
            </p>
            {/* Consistent dark code block style */}
            <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto text-sm my-4">
{`# Use an official Node.js runtime as a parent image
FROM node:18-alpine AS base

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy application source code
COPY . .

# Expose port (e.g., 3000)
EXPOSE 3000

# Run the microservice
CMD ["node", "service.js"]`}
            </pre>
             <p>Build and push the image for each service to a container registry: <code>docker build -t your-registry/service-name:v1 . && docker push your-registry/service-name:v1</code></p>


            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Step 2: Orchestrate with Kubernetes</h2>
            <p>
              Kubernetes manages the deployment, scaling, networking, and lifecycle of your containerized microservices.
            </p>

            <h3 className="text-xl font-semibold mt-4">Kubernetes Deployment per Microservice</h3>
            <p>
              Define a Kubernetes Deployment for each microservice to manage its Pods (running container instances). Example `deployment-orders.yaml`:
            </p>
            {/* Consistent dark code block style */}
            <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto text-sm my-4">
{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: orders-service-deployment
spec:
  replicas: 2 # Start with desired replicas
  selector:
    matchLabels:
      app: orders-service
  template:
    metadata:
      labels:
        app: orders-service
    spec:
      containers:
        - name: orders-container
          image: your-registry/orders-service:v1 # Image from registry
          ports:
            - containerPort: 3000 # Port exposed by the container
          # Add probes and resource limits
          readinessProbe:
             httpGet:
               path: /healthz
               port: 3000
             initialDelaySeconds: 5
             periodSeconds: 5
          resources:
            requests:
              cpu: "100m"
              memory: "128Mi"
            limits:
              cpu: "500m"
              memory: "256Mi"`}
            </pre>

            <h3 className="text-xl font-semibold mt-4">Kubernetes Service Configuration</h3>
            <p>
              Define a Kubernetes Service for each microservice to provide stable internal DNS names and load balancing across its Pods. Example `service-orders.yaml`:
            </p>
            {/* Consistent dark code block style */}
            <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto text-sm my-4">
{`apiVersion: v1
kind: Service
metadata:
  name: orders-service # Internal DNS name will be 'orders-service'
spec:
  selector:
    app: orders-service # Selects Pods managed by the orders-deployment
  ports:
    - protocol: TCP
      port: 80 # Port the service listens on
      targetPort: 3000 # Port the container listens on
  type: ClusterIP # Expose only within the cluster by default`}
            </pre>
             <p>Apply manifests: <code>kubectl apply -f deployment-orders.yaml -f service-orders.yaml</code></p>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Step 3: Handle Communication Between Microservices</h2>
            <p>
              Managing inter-service communication is critical:
            </p>
            <ul className="list-disc list-outside pl-5 mt-4 space-y-2">
                <li><strong>Service Discovery:</strong> Kubernetes provides DNS-based service discovery. A service can call another using its Service name (e.g., `http://orders-service/api/orders`).</li>
                <li><strong>Communication Protocols:</strong> Choose appropriate protocols (synchronous REST/gRPC, asynchronous messaging via Kafka/RabbitMQ/NATS). Asynchronous communication often improves resilience and decoupling.</li>
                <li><strong>API Gateway:</strong> Use an API Gateway (e.g., Nginx Ingress Controller, Traefik, Ambassador, Kong, cloud provider gateways) as a single entry point for external traffic. It handles routing, authentication, rate limiting, SSL termination, etc., directing requests to the appropriate internal microservices.</li>
                <li><strong>Service Mesh (Optional):</strong> For complex scenarios, consider a service mesh (e.g., Istio, Linkerd) to manage traffic, security (mTLS), observability, and resilience patterns (retries, circuit breaking) consistently across services.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Step 4: Implement Continuous Integration and Deployment (CI/CD)</h2>
            <p>
              Establish separate CI/CD pipelines for each microservice. This allows independent teams to build, test, and deploy their services frequently without impacting others.
            </p>
            <h3 className="text-xl font-semibold mt-4">Typical Microservice CI/CD Flow:</h3>
            <ul className="list-disc list-outside pl-5 mt-4 space-y-2">
              <li>Commit code to a service-specific Git repository.</li>
              <li>CI server (Jenkins, GitLab CI, GitHub Actions, etc.) triggers build: runs tests, builds Docker image.</li>
              <li>Push tagged Docker image to container registry.</li>
              <li>CD tool (Argo CD, Flux, Jenkins CD, etc.) updates the Kubernetes Deployment manifest (e.g., with the new image tag) and applies it to the cluster, triggering a rolling update.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Challenges and Considerations</h2>
            <p>
              Migrating to microservices introduces new complexities:
            </p>
            <ul className="list-disc list-outside pl-5 mt-4 space-y-2">
              <li><strong>Distributed System Complexity:</strong> Managing network communication, distributed transactions (consider sagas or event sourcing), and eventual consistency.</li>
              <li><strong>Operational Overhead:</strong> More moving parts to deploy, monitor, and manage compared to a single monolith. Requires robust automation and observability.</li>
              <li><strong>Data Consistency:</strong> Ensuring data consistency across services that own different data requires careful design (e.g., event-driven approaches, distributed transactions).</li>
              <li><strong>Testing Complexity:</strong> Requires comprehensive integration and end-to-end testing strategies in addition to unit tests.</li>
              <li><strong>Monitoring and Debugging:</strong> Requires distributed tracing, centralized logging, and aggregated metrics to understand behavior across multiple services.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Conclusion</h2>
            <p>
              Migrating from a monolithic architecture to microservices using Docker and Kubernetes is a strategic move towards building more scalable, resilient, and agile applications. While the transition involves careful planning, decomposition, and addressing the complexities of distributed systems, the combination of containerization (Docker) and orchestration (Kubernetes) provides the essential foundation for successfully deploying, managing, and scaling a microservices-based application in a cloud-native world.
            </p>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
