import Image from 'next/image';
import Header from '../../components/Header'; // Adjust path as needed
import Footer from '../../components/Footer'; // Adjust path as needed
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function DotNetContainerizationArticle() {
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
               Containerizing Legacy .NET Apps for Cloud-Native Deployment
             </h1>
             <p className="text-lg text-gray-600">
               Legacy .NET applications are often difficult to migrate to modern cloud environments. This article explains how to containerize your old .NET applications using Docker, making them ready for Kubernetes and other cloud-native environments.
             </p>
          </div>


          {/* Dockerizing .NET Application Diagram */}
          <div className="my-8">
            <Image src="/images/containerize-dotnet.png" alt="Containerizing .NET App" width={800} height={400} className="rounded-lg shadow-md mx-auto" />
          </div>

          {/* Apply prose classes for article styling */}
          {/* Ensure you have @tailwindcss/typography installed and configured */}
          <article className="prose prose-lg lg:prose-xl max-w-none text-gray-700">

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Step 1: Assessing the Legacy .NET Application</h2>
            <p>
              Before containerizing your .NET application, start by understanding its architecture. Most legacy .NET applications are built on the .NET Framework, which isn’t directly compatible with the cloud-native .NET Core or modern .NET (e.g., .NET 6, 7, 8+) environments typically used in Linux containers. Begin by assessing the application for potential upgrades or code modifications needed for compatibility, or determine if Windows containers are necessary (which have different base images and host requirements).
            </p>
            <p>
              Key steps in the assessment phase:
            </p>
            <ul className="list-disc list-outside pl-5 mt-4 space-y-2"> {/* Adjusted list styling */}
              <li><strong>Framework Compatibility:</strong> Determine if the application targets .NET Framework or can be ported to modern .NET. If it strictly requires .NET Framework, you'll need Windows containers (e.g., `mcr.microsoft.com/dotnet/framework/aspnet`). The example Dockerfile below assumes modern .NET.</li>
              <li><strong>Code Compatibility:</strong> If porting, check for usage of APIs specific to .NET Framework (like System.Web, WCF server-side, Windows Forms/WPF) that need refactoring or replacement for modern .NET. Use tools like the .NET Portability Analyzer.</li>
              <li><strong>Dependency Management:</strong> Ensure that external NuGet packages and libraries are compatible with your target .NET version and operating system (Linux or Windows).</li>
              <li><strong>Configuration Management:</strong> How is the application configured (web.config, appsettings.json)? Adapt configuration loading for container environments (e.g., using environment variables).</li>
              <li><strong>State Management:</strong> Identify if the application stores session state in-memory. This needs to be externalized (e.g., Redis, database) for scalable container deployments.</li>
              <li><strong>Database Compatibility:</strong> Review database connections and ensure drivers are compatible. Consider cloud databases or containerized database services.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Step 2: Install Docker and Prepare the Environment</h2>
            <p>
              In this step, you will install Docker Desktop (or Docker Engine on Linux) and set up the necessary environment to build a Docker image for your .NET application.
            </p>
            <p>
              To begin, make sure Docker is installed and running. Navigate to the root directory of your .NET application solution (where the `.sln` file typically resides) and create a file named `Dockerfile` (no extension).
            </p>
            {/* Keep user's preferred code block style */}
            <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto text-sm my-4">
{`# Define the .NET SDK version (adjust as needed, e.g., 6.0, 7.0, 8.0)
ARG DOTNET_VERSION=8.0

# --- Build Stage ---
# Use the official .NET SDK image for building
FROM mcr.microsoft.com/dotnet/sdk:\${DOTNET_VERSION} AS build
WORKDIR /src

# Copy project files and restore dependencies first for layer caching
# Copy .sln and .csproj files for all projects in the solution
COPY *.sln .
COPY MyApp/*.csproj ./MyApp/
# Add other projects if needed: COPY MyOtherProject/*.csproj ./MyOtherProject/

# Restore dependencies for the entire solution
RUN dotnet restore

# Copy the rest of the source code
COPY . .

# Build the specific project (adjust path and project name)
WORKDIR "/src/MyApp"
RUN dotnet build "MyApp.csproj" -c Release -o /app/build --no-restore

# --- Publish Stage ---
FROM build AS publish
# Publish the application (adjust path and project name)
RUN dotnet publish "MyApp.csproj" -c Release -o /app/publish --no-build

# --- Final Runtime Stage ---
# Use the official ASP.NET Core runtime image (smaller than SDK)
FROM mcr.microsoft.com/dotnet/aspnet:\${DOTNET_VERSION} AS final
WORKDIR /app
# Copy the published output from the publish stage
COPY --from=publish /app/publish .

# Expose the port the application listens on (default for ASP.NET Core is 8080)
# If your app listens on 5000, change this to EXPOSE 5000
EXPOSE 8080

# Define the entry point for the container
# Replace MyApp.dll with the actual name of your application's DLL
ENTRYPOINT ["dotnet", "MyApp.dll"]`}
            </pre>
            <p>
              This `Dockerfile` uses a multi-stage build approach, which is best practice. It separates the build environment (with the larger SDK) from the final runtime environment (with the smaller ASP.NET Core runtime), resulting in a more secure and smaller final image. Adjust `MyApp` and the `.NET` version tag (`8.0` in the example) to match your project.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Step 3: Build and Run the Docker Container</h2>
            <p>
              After creating the `Dockerfile`, open a terminal in the directory containing the Dockerfile and your solution, then build and run the Docker container:
            </p>
            <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto text-sm my-4">
{`# Build the Docker image (replace 'myapp' with your desired image name)
docker build -t myapp .

# Run the Docker container
# Map host port 8080 to container port 8080 (adjust if your app uses a different port)
docker run -d -p 8080:8080 --name myapp-container myapp`}
            </pre>
            <p>
              These commands build the image and run the container in detached mode (`-d`), mapping port 8080 on your host machine to port 8080 inside the container. You can test the application by navigating to `http://localhost:8080` in your browser. Check `docker logs myapp-container` if it doesn't start correctly.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Step 4: Preparing for Kubernetes Deployment</h2>
            <p>
              Once your .NET application is containerized, you can deploy it on Kubernetes for cloud-native orchestration. Kubernetes automates deployment, scaling, and management.
            </p>
            <p>
              Create a Kubernetes deployment configuration file (e.g., `deployment.yaml`). This file defines how your container should run in the cluster:
            </p>
            <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto text-sm my-4">
{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-deployment # Descriptive name for the deployment
spec:
  replicas: 3 # Start with 3 instances of the application
  selector:
    matchLabels:
      app: myapp # Label to select the pods managed by this deployment
  template:
    metadata:
      labels:
        app: myapp # Label applied to the pods
    spec:
      containers:
        - name: myapp-container # Name of the container within the pod
          image: your-registry/myapp:latest # IMPORTANT: Replace with your image name and registry path
          ports:
            - containerPort: 8080 # Port the container listens on (must match EXPOSE in Dockerfile)
          # Add readiness and liveness probes for health checks
          readinessProbe:
            httpGet:
              path: /healthz # Replace with your actual health check endpoint
              port: 8080
            initialDelaySeconds: 5
            periodSeconds: 10
          livenessProbe:
            httpGet:
              path: /healthz # Replace with your actual health check endpoint
              port: 8080
            initialDelaySeconds: 15
            periodSeconds: 20
          # Define resource requests and limits (important for scheduling and stability)
          resources:
            requests:
              memory: "128Mi" # Example request
              cpu: "250m"    # Example request (0.25 vCPU)
            limits:
              memory: "512Mi" # Example limit
              cpu: "500m"    # Example limit (0.5 vCPU)
`}
            </pre>
            <p>
              This file defines the deployment with three replicas for high availability. **Crucially, replace `your-registry/myapp:latest` with the actual path to your image in a container registry** (like Docker Hub, AWS ECR, Azure ACR, Google GCR). It also includes placeholders for essential health checks (`readinessProbe`, `livenessProbe`) and resource requests/limits, which you should configure based on your application's needs.
            </p>

             {/* Add Kubernetes Service Definition */}
             <h3 className="text-xl font-semibold mt-6">Exposing the Application with a Service</h3>
             <p>
               To make your deployed application accessible within or outside the cluster, you need a Kubernetes Service. Create a `service.yaml` file:
             </p>
             <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto text-sm my-4">
{`apiVersion: v1
kind: Service
metadata:
  name: myapp-service # Descriptive name for the service
spec:
  selector:
    app: myapp # Selects pods with the label 'app: myapp'
  ports:
    - protocol: TCP
      port: 80 # Port the service will listen on
      targetPort: 8080 # Port the pods are listening on (must match containerPort)
  type: LoadBalancer # Or ClusterIP/NodePort depending on how you want to expose it
`}
             </pre>
             <p>
               This service selects the pods created by the deployment and exposes them. The `type: LoadBalancer` is common for cloud providers, automatically provisioning an external load balancer.
             </p>


            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Step 5: Deploying to Cloud Services</h2>
            <p>
              With your container image built and Kubernetes manifests ready, you can deploy to a managed Kubernetes service in the cloud:
            </p>
            <ul className="list-disc list-outside pl-5 mt-4 space-y-2"> {/* Adjusted list styling */}
              <li><strong>Create a Kubernetes Cluster:</strong> Use the cloud provider’s console or CLI to create a managed cluster (Amazon EKS, Azure AKS, Google GKE).</li>
              <li><strong>Push Docker Image to Cloud Registry:</strong> Tag your local Docker image (`docker tag myapp your-registry/myapp:latest`) and push it (`docker push your-registry/myapp:latest`) to your chosen cloud registry (ECR, ACR, GCR). Ensure your Kubernetes cluster has permissions to pull from this registry.</li>
              <li><strong>Deploy Kubernetes Manifests:</strong> Configure `kubectl` to connect to your cloud cluster. Apply the deployment and service configurations:
                <pre className="bg-gray-800 text-white p-2 rounded-md overflow-x-auto text-xs my-2">{`kubectl apply -f deployment.yaml\nkubectl apply -f service.yaml`}</pre>
              </li>
              <li><strong>Verify Deployment:</strong> Check the status using `kubectl get deployments`, `kubectl get pods`, and `kubectl get services`. Access the application via the external IP provided by the LoadBalancer service.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Step 6: Managing the Containerized .NET App</h2>
            <p>
              Once deployed, Kubernetes simplifies management:
            </p>
            <ul className="list-disc list-outside pl-5 mt-4 space-y-2"> {/* Adjusted list styling */}
              <li><strong>Scaling:</strong> Manually scale replicas (`kubectl scale deployment myapp-deployment --replicas=5`) or configure Horizontal Pod Autoscalers (HPAs) to scale automatically based on CPU or memory usage.</li>
              <li><strong>Rolling Updates:</strong> Update the image tag in your `deployment.yaml` and re-apply (`kubectl apply -f deployment.yaml`). Kubernetes performs rolling updates with zero downtime by default.</li>
              <li><strong>Health Checks & Self-Healing:</strong> Kubernetes uses the configured liveness and readiness probes to monitor pod health, automatically restarting unhealthy containers or redirecting traffic away from unready pods.</li>
              <li><strong>Monitoring & Logging:</strong> Integrate with cloud provider monitoring (CloudWatch, Azure Monitor, Google Cloud Monitoring) or use tools like Prometheus/Grafana for metrics and EFK/Loki for logging.</li>
              <li><strong>CI/CD Pipelines:</strong> Integrate your build, push, and deploy steps into a CI/CD pipeline (e.g., GitHub Actions, Azure DevOps, Jenkins) for fully automated updates.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Conclusion</h2>
            <p>
              Containerizing legacy .NET applications using Docker and orchestrating them with Kubernetes provides significant advantages for cloud-native deployment, including portability, scalability, resilience, and simplified management. While assessment and potential code adjustments are crucial first steps, this approach allows you to modernize application deployment and leverage the full power of cloud infrastructure, even for applications not originally designed for it.
            </p>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
