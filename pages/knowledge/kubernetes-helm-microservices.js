import Image from 'next/image';
import Header from '../../components/Header'; // Adjust path as needed
import Footer from '../../components/Footer'; // Adjust path as needed
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function K8sHelmArticle() {
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
               Building Scalable Microservices with Kubernetes and Helm
             </h1>
             <p className="text-lg text-gray-600">
               Microservices architecture is the go-to solution for modern cloud-native applications, but it can be challenging to scale effectively. In this article, we’ll explore how Kubernetes and Helm can help you manage and scale microservices with ease, enabling you to build resilient, scalable, and highly available applications.
             </p>
          </div>


          {/* Image: Kubernetes and Helm for Microservices */}
          <div className="my-8">
            <Image src="/images/k8s-microservices.png" alt="Kubernetes and Helm for Microservices" width={800} height={400} className="rounded-lg shadow-md mx-auto" />
          </div>

          {/* Apply prose classes for article styling */}
          {/* Ensure you have @tailwindcss/typography installed and configured */}
          <article className="prose prose-lg lg:prose-xl max-w-none text-gray-700">

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">What is Kubernetes?</h2>
            <p>
              Kubernetes (often abbreviated as K8s) is an open-source container orchestration platform designed to automate the deployment, scaling, and management of containerized applications. Originally developed by Google, it provides a robust framework for running distributed systems resiliently, managing clusters of machines (nodes), and ensuring the availability, scalability, and reliability of your services.
            </p>

            <h3 className="text-xl font-semibold mt-4">Core Concepts in Kubernetes</h3>
            <p>
              Key components and abstractions in Kubernetes include:
            </p>
            <ul className="list-disc list-outside pl-5 mt-4 space-y-2"> {/* Adjusted list styling */}
              <li><strong>Pods:</strong> The smallest deployable units in Kubernetes, typically containing one container (though can contain more tightly coupled containers). Pods share network and storage resources.</li>
              <li><strong>Deployments:</strong> A higher-level object that manages the deployment and scaling of ReplicaSets (which in turn manage Pods). Deployments ensure the desired number of replicas (identical Pods) are running and handle rolling updates and rollbacks.</li>
              <li><strong>Services:</strong> Define a logical set of Pods and a policy by which to access them. Services provide a stable IP address and DNS name, acting as an internal load balancer for Pods managed by a Deployment.</li>
              <li><strong>Namespaces:</strong> Provide a mechanism for isolating groups of resources within a single cluster. Useful for organizing resources by environment (dev, staging, prod) or team.</li>
              <li><strong>Nodes:</strong> Worker machines (VMs or physical servers) in the cluster where Pods actually run.</li>
              <li><strong>Control Plane:</strong> Manages the cluster state, including the API server, scheduler, controller manager, and etcd (distributed key-value store).</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">What is Helm?</h2>
            <p>
              Helm is often described as the package manager for Kubernetes. It simplifies the process of defining, installing, upgrading, and managing applications within Kubernetes clusters. Instead of manually applying multiple individual Kubernetes YAML manifests, Helm packages these resources into a single unit called a chart.
            </p>

            <h3 className="text-xl font-semibold mt-4">How Helm Works</h3>
            <p>
              Helm helps you manage Kubernetes applications through <strong>Helm Charts</strong>. A chart is a collection of files describing a related set of Kubernetes resources. It contains templates for your Kubernetes manifests (Deployments, Services, ConfigMaps, etc.) and a `values.yaml` file that allows you to customize configurations for different environments or deployments without modifying the templates themselves.
            </p>

            <h3 className="text-xl font-semibold mt-4">Helm Commands Overview</h3>
             <p>Common Helm CLI commands include:</p>
            <ul className="list-disc list-outside pl-5 mt-4 space-y-2"> {/* Adjusted list styling */}
              <li><code>helm install [RELEASE_NAME] [CHART]</code>: Installs a Helm chart into your Kubernetes cluster, creating a new release (an instance of the chart).</li>
              <li><code>helm upgrade [RELEASE_NAME] [CHART]</code>: Upgrades an existing release to a newer chart version or with different configuration values.</li>
              <li><code>helm uninstall [RELEASE_NAME]</code>: Removes a release (and its associated Kubernetes resources) from your cluster.</li>
              <li><code>helm list</code>: Displays all the Helm releases deployed in the current namespace.</li>
              <li><code>helm create [CHART_NAME]</code>: Creates a directory structure for a new Helm chart.</li>
              <li><code>helm template [RELEASE_NAME] [CHART]</code>: Renders chart templates locally without installing, useful for debugging.</li>
            </ul>
            <p>Example installation:</p>
            {/* Keep user's preferred code block style */}
            <pre className="bg-gray-200 p-4 mt-4 text-gray-800 rounded-md overflow-x-auto text-sm">
{`# Install a chart named 'mychart' located in the current directory, naming the release 'myapp'
helm install myapp ./mychart`}
            </pre>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Building and Deploying Microservices</h2>
            <p>
              In a microservices architecture, your application is decomposed into smaller, independent services. Each service is typically containerized using Docker and then orchestrated using Kubernetes. Helm streamlines the deployment of these multiple services.
            </p>

            <h3 className="text-xl font-semibold mt-4">Step 1: Define Your Microservices</h3>
            <p>
              First, identify the distinct functional boundaries of your application. Each boundary often corresponds to a microservice. For example, a typical e-commerce platform might have services like <strong>Orders</strong>, <strong>Products</strong>, <strong>Users</strong>, <strong>Payments</strong>, and <strong>Inventory</strong>. Each service manages its own data and exposes a clear API.
            </p>

            <h3 className="text-xl font-semibold mt-4">Step 2: Containerize Your Microservices</h3>
            <p>
              Package each microservice into a Docker container image. This ensures consistency and portability. Create a `Dockerfile` for each service. Example for a Node.js Orders service:
            </p>
            {/* Keep user's preferred code block style */}
            <pre className="bg-gray-200 p-4 mt-4 text-gray-800 rounded-md overflow-x-auto text-sm">
{`# Use an official Node.js runtime as a parent image
FROM node:18-alpine AS base

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first for layer caching
COPY package*.json ./

# Install app dependencies
RUN npm ci --only=production

# Bundle app source code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["node", "server.js"]`}
            </pre>
             <p>Build the image: <code>docker build -t your-registry/orders-service:v1 .</code> and push it to a container registry (Docker Hub, ECR, ACR, GCR).</p>

            <h3 className="text-xl font-semibold mt-4">Step 3: Create Kubernetes Manifests (or Helm Chart Templates)</h3>
            <p>
              Define the Kubernetes resources needed for each microservice, typically including a Deployment (to manage Pods) and a Service (to expose the Pods). Example `deployment.yaml` for the Orders service:
            </p>
            {/* Keep user's preferred code block style */}
            <pre className="bg-gray-200 p-4 mt-4 text-gray-800 rounded-md overflow-x-auto text-sm">
{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: orders-deployment
spec:
  replicas: 3 # Start with 3 instances
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
          image: your-registry/orders-service:v1 # Use the image pushed earlier
          ports:
            - containerPort: 3000 # Port exposed in Dockerfile
          # Add readiness/liveness probes and resource limits here
`}
            </pre>
             <p>You would also create a corresponding `service.yaml`.</p>

            <h3 className="text-xl font-semibold mt-4">Step 4: Use Helm for Deployment and Management</h3>
            <p>
              Instead of applying individual YAML files with `kubectl apply`, package them into a Helm chart. Use `helm create orders-chart`. Place your Deployment and Service YAML into the `templates/` directory of the chart. Customize deployment settings using the `values.yaml` file.
            </p>
            <p>Deploy the chart:</p>
            {/* Keep user's preferred code block style */}
            <pre className="bg-gray-200 p-4 mt-4 text-gray-800 rounded-md overflow-x-auto text-sm">
{`# Install the chart, creating a release named 'orders-release'
helm install orders-release ./orders-chart

# Upgrade the release with new values or chart version
# helm upgrade orders-release ./orders-chart --set image.tag=v2`}
            </pre>
             <p>You can create separate charts for each microservice or use a single "umbrella" chart that lists other charts as dependencies to deploy the entire application stack.</p>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Scaling Microservices with Kubernetes</h2>
            <p>
              Kubernetes excels at scaling containerized applications:
            </p>
             <ul className="list-disc list-outside pl-5 mt-4 space-y-2">
                <li><strong>Manual Scaling:</strong> Increase or decrease the number of replicas for a specific service using `kubectl scale deployment orders-deployment --replicas=5`.</li>
                <li><strong>Autoscaling (HPA):</strong> The <strong>Horizontal Pod Autoscaler (HPA)</strong> automatically adjusts the number of Pods in a Deployment based on observed metrics like CPU utilization or custom metrics.</li>
             </ul>

            <h3 className="text-xl font-semibold mt-4">Autoscaling Example</h3>
            <p>
              To enable autoscaling for the Orders service based on CPU usage (assuming resource requests are set in the Deployment):
            </p>
            {/* Keep user's preferred code block style */}
            <pre className="bg-gray-200 p-4 mt-4 text-gray-800 rounded-md overflow-x-auto text-sm">
{`# Create an HPA targeting the deployment
kubectl autoscale deployment orders-deployment --cpu-percent=75 --min=3 --max=10`}
            </pre>
             <p>This command tells Kubernetes to maintain between 3 and 10 replicas for `orders-deployment`, scaling up when the average CPU utilization across pods exceeds 75%.</p>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Best Practices for Managing Microservices</h2>
            <p>
              Follow these practices for resilient and scalable microservices:
            </p>
            <ul className="list-disc list-outside pl-5 mt-4 space-y-2"> {/* Adjusted list styling */}
              <li><strong>Design for Failure:</strong> Implement patterns like retries with exponential backoff, timeouts, and circuit breakers (e.g., using a service mesh like Istio or Linkerd) to handle network issues or temporary service unavailability gracefully.</li>
              <li><strong>Decouple Services:</strong> Minimize direct dependencies. Use asynchronous communication (e.g., message queues like Kafka or RabbitMQ) where appropriate instead of synchronous request/response calls.</li>
              <li><strong>Centralized Logging & Monitoring:</strong> Aggregate logs (e.g., EFK/Loki stack) and metrics (e.g., Prometheus/Grafana) from all microservices into centralized systems for observability. Implement distributed tracing (e.g., Jaeger/Tempo).</li>
              <li><strong>Infrastructure as Code (IaC):</strong> Manage Kubernetes cluster setup and potentially Helm chart deployments using IaC tools like Terraform.</li>
              <li><strong>Use Helm for Application Lifecycle Management:</strong> Leverage Helm for versioning, templating configurations, managing dependencies between services, and performing reliable upgrades and rollbacks.</li>
              <li><strong>Implement Health Checks:</strong> Define meaningful readiness and liveness probes in your Kubernetes manifests so the orchestrator knows the true health of your application instances.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Conclusion</h2>
            <p>
              Kubernetes and Helm provide a powerful combination for deploying, managing, and scaling microservices in modern cloud-native environments. By containerizing services with Docker, orchestrating them with Kubernetes, and simplifying lifecycle management with Helm, development teams can build highly scalable, resilient, and maintainable applications capable of meeting complex business demands and achieving faster release cycles.
            </p>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
