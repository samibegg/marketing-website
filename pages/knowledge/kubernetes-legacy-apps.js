import Image from 'next/image';
import Header from '../../components/Header'; // Adjust path as needed
import Footer from '../../components/Footer'; // Adjust path as needed
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function KubernetesLegacyArticle() {
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
               Kubernetes for Legacy Applications: Transitioning to Cloud-Native
             </h1>
             <p className="text-lg text-gray-600">
               Migrating legacy applications to a cloud-native architecture using Kubernetes is an essential step for organizations aiming for scalability, flexibility, and reliability. In this guide, we will explore how to transition legacy applications into a Kubernetes-based system with minimal disruptions.
             </p>
          </div>


          {/* Kubernetes Migration Diagram */}
          <div className="my-8">
            <Image src="/images/kubernetes-legacy.png" alt="Kubernetes for Legacy Applications" width={800} height={400} className="rounded-lg shadow-md mx-auto" />
          </div>

          {/* Apply prose classes for article styling */}
          {/* Ensure you have @tailwindcss/typography installed and configured */}
          <article className="prose prose-lg lg:prose-xl max-w-none text-gray-700">

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">What is Kubernetes?</h2>
            <p>
              Kubernetes (K8s) is an open-source container orchestration platform that automates the deployment, scaling, and management of containerized applications. It is designed to handle complex workloads in production and is ideal for managing microservices, but its benefits can also be leveraged for legacy monolithic applications, often as a stepping stone towards modernization.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Why Kubernetes for Legacy Applications?</h2>
            <p>
              While legacy applications might not have been designed for containers, running them on Kubernetes (after containerization) offers significant advantages over traditional VM-based deployments:
            </p>
            <ul className="list-disc list-outside pl-5 mt-4 space-y-2"> {/* Adjusted list styling */}
              <li><strong>Improved Scalability:</strong> Kubernetes can horizontally scale even monolithic applications by running multiple identical container instances (Pods) behind a load balancer (Service), handling increased traffic more effectively than manual VM scaling.</li>
              <li><strong>Resource Optimization:</strong> Kubernetes' scheduler efficiently packs containers onto nodes, improving resource utilization compared to potentially underutilized VMs.</li>
              <li><strong>Deployment Automation & Consistency:</strong> Standardizes the deployment process across environments (dev, staging, prod), reducing manual errors and ensuring consistency via declarative configuration (YAML).</li>
              <li><strong>Portability:</strong> Containerized applications packaged with their dependencies can run consistently across different environments – on-premises Kubernetes clusters, various public clouds (AWS EKS, Azure AKS, Google GKE), or local development setups (Docker Desktop, Minikube).</li>
              <li><strong>Enhanced Resilience:</strong> Kubernetes automatically restarts failed containers and can reschedule Pods onto healthy nodes, improving application availability.</li>
              <li><strong>Simplified Management:</strong> Provides built-in service discovery, load balancing, and automated rollouts/rollbacks, simplifying operational tasks.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Step 1: Containerizing Legacy Applications ("Lift and Shift")</h2>
            <p>
              The initial step is often a "lift and shift" approach: containerize the application with minimal code changes. This involves packaging the application and its runtime dependencies into a container image using Docker.
            </p>
            <p><strong>Assessment is Key:</strong> Before writing the Dockerfile, assess:</p>
             <ul className="list-disc list-outside pl-5 mt-4 space-y-2">
                <li><strong>Operating System Dependency:</strong> Does the app require Windows? If so, you'll need Windows containers and Windows nodes in your Kubernetes cluster. If it can run on Linux (e.g., modern .NET, Java, Python, Node.js), use Linux base images.</li>
                <li><strong>Configuration:</strong> How is the app configured? Plan to inject configuration via environment variables or mounted ConfigMaps/Secrets in Kubernetes, rather than relying on files baked into the image.</li>
                <li><strong>State Management:</strong> Does the app store state locally (e.g., in-memory sessions, local file system)? This state will be lost when a container restarts. Externalize state to a database, cache (Redis), or persistent volume.</li>
                <li><strong>Dependencies:</strong> Identify external dependencies (databases, APIs, message queues) and ensure they are accessible from within the Kubernetes cluster network.</li>
             </ul>
            <p>Example Dockerfile for a modern .NET app (adapt base image for other runtimes or Windows):</p>
            {/* Consistent dark code block style */}
            <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto text-sm my-4">
{`# Dockerfile example for a modern .NET legacy app (adapt version/runtime)
# Use an appropriate base image for the runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
# Expose the port the application listens on (e.g., 8080)
EXPOSE 8080

# Build stage (can be separate if needed, but simpler for lift-and-shift)
# Assumes application is pre-built and published to './publish' directory
COPY ./publish .

# Define the entry point
ENTRYPOINT ["dotnet", "MyLegacyApp.dll"]`}
            </pre>
            <p>
              After creating the Dockerfile, build the image and push it to a container registry accessible by your Kubernetes cluster:
            </p>
            <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto text-sm my-4">
{`# Build the Docker image
docker build -t your-registry/my-legacy-app:v1 .

# Push the image to your registry (requires prior docker login)
docker push your-registry/my-legacy-app:v1`}
            </pre>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Step 2: Deploying Containers to Kubernetes</h2>
            <p>
              Deploy the containerized application using Kubernetes Deployments. A Deployment manages ReplicaSets, ensuring the desired number of application instances (Pods) are running.
            </p>
            <p>Create a `deployment.yaml` file:</p>
            {/* Consistent dark code block style */}
            <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto text-sm my-4">
{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-legacy-app-deployment # Renamed for clarity
spec:
  replicas: 2 # Start with 2 replicas for availability
  selector:
    matchLabels:
      app: my-legacy-app
  template:
    metadata:
      labels:
        app: my-legacy-app
    spec:
      containers:
        - name: my-legacy-app-container # Renamed for clarity
          image: your-registry/my-legacy-app:v1 # Use the image pushed to your registry
          ports:
            - containerPort: 8080 # Port the container listens on
          # IMPORTANT: Add liveness and readiness probes!
          readinessProbe:
            httpGet:
              path: /health # Replace with your app's health check endpoint
              port: 8080
            initialDelaySeconds: 10 # Wait before first probe
            periodSeconds: 15
          livenessProbe:
            httpGet:
              path: /health # Replace with your app's health check endpoint
              port: 8080
            initialDelaySeconds: 30
            periodSeconds: 30
          # Define resource requests/limits
          resources:
            requests:
              memory: "256Mi"
              cpu: "500m"
            limits:
              memory: "1Gi"
              cpu: "1"`}
            </pre>
            <p>
              Apply the deployment to your cluster:
            </p>
            <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto text-sm my-4">
{`kubectl apply -f deployment.yaml`}
            </pre>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Step 3: Service Discovery and Networking</h2>
            <p>
              Expose the deployed Pods using a Kubernetes Service. This provides a stable IP address and DNS name for accessing the application, load balancing traffic across the replicas.
            </p>
            <p>Create a `service.yaml` file:</p>
            {/* Consistent dark code block style */}
            <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto text-sm my-4">
{`apiVersion: v1
kind: Service
metadata:
  name: my-legacy-app-service
spec:
  selector:
    app: my-legacy-app # Selects Pods with this label
  ports:
    - protocol: TCP
      port: 80 # Port the Service listens on
      targetPort: 8080 # Port the container listens on
  # Type determines how the service is exposed:
  # ClusterIP: Exposes only within the cluster (default)
  # NodePort: Exposes on each Node's IP at a static port
  # LoadBalancer: Provisions a cloud load balancer (for external access)
  type: LoadBalancer`}
            </pre>
             <p>Apply the service: <code>kubectl apply -f service.yaml</code></p>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Step 4: Managing Configurations and Secrets</h2>
            <p>
              Externalize configuration from the container image using Kubernetes ConfigMaps (for non-sensitive data) and Secrets (for sensitive data like API keys, passwords). Mount these into your Pods as volumes or environment variables.
            </p>
            {/* Consistent dark code block style */}
            <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto text-sm my-4">
{`# Example: Create a Secret from literal values
kubectl create secret generic db-credentials \\
  --from-literal=DB_USER=admin \\
  --from-literal=DB_PASSWORD='SuperSecretP@ssw0rd!'

# Example: Create a ConfigMap from a file
kubectl create configmap app-config --from-file=config.properties`}
            </pre>
            <p>Reference these in your `deployment.yaml` under the container spec using `envFrom` or `volumeMounts`.</p>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Step 5: Continuous Integration and Deployment (CI/CD)</h2>
            <p>
              Implement a CI/CD pipeline (using tools like Jenkins, GitLab CI, GitHub Actions, Azure DevOps) to automate the process:
            </p>
            <ul className="list-disc list-outside pl-5 mt-4 space-y-2">
              <li><strong>Build:</strong> Compile code (if necessary) and build the Docker image on code commit.</li>
              <li><strong>Test:</strong> Run unit and integration tests.</li>
              <li><strong>Push:</strong> Push the built image to your container registry.</li>
              <li><strong>Deploy:</strong> Update the Kubernetes Deployment manifest (e.g., change the image tag) and apply it to the cluster (`kubectl apply` or using tools like Helm/Argo CD). Kubernetes handles the rolling update.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Challenges in Migrating Legacy Applications</h2>
            <p>
              Be prepared for challenges:
            </p>
            <ul className="list-disc list-outside pl-5 mt-4 space-y-2">
              <li><strong>Dependency Management:</strong> Ensuring all OS-level and application-level dependencies are correctly included in the container image.</li>
              <li><strong>Stateful Applications:</strong> Requires careful handling of persistent data using PersistentVolumes, StatefulSets (if pod identity/ordering matters), or externalizing state.</li>
              <li><strong>Networking Complexity:</strong> Understanding Kubernetes networking (Services, Ingress, Network Policies) to ensure proper communication and security.</li>
              <li><strong>Monitoring & Logging:</strong> Adapting existing monitoring/logging practices to work with containerized, ephemeral workloads (use centralized logging/monitoring tools).</li>
              <li><strong>Application Refactoring (Optional but Recommended):</strong> While lift-and-shift is the first step, true cloud-native benefits often require refactoring parts of the monolith into microservices over time.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Conclusion</h2>
            <p>
              Transitioning legacy applications to Kubernetes, even via an initial "lift and shift" containerization approach, offers substantial benefits in deployment consistency, scalability, resilience, and operational efficiency. By containerizing your application, defining its deployment and networking in Kubernetes, managing configuration externally, and automating with CI/CD, you lay the foundation for modernizing your infrastructure and gradually adopting more cloud-native patterns.
            </p>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
