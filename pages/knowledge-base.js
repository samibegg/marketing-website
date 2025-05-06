import BlogCard from '../components/BlogCard';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

const blogPosts = [
  {
    title: "How to Migrate a Legacy Application to AWS Cloud with Zero Downtime",
    excerpt: "Learn how to migrate your legacy applications to AWS without causing any downtime or business disruption.",
    category: "Cloud Transformation",
    image: "/images/aws-migration.jpeg",
    slug: "/knowledge/aws-migration-zero-downtime",
    date: "December 3, 2022"
  },
  {
    title: "Optimizing Kafka for Low-Latency, High-Throughput Data Pipelines",
    excerpt: "Master the configuration and optimization of Kafka to handle high-throughput and low-latency data streams.",
    category: "Big Data Solutions",
    image: "/images/kafka-pipeline.jpeg",
    slug: "/knowledge/kafka-low-latency",
    date: "April 5, 2024"
  },
  {
    title: "Optimizing AWS Costs with CloudWatch Alarms and Lambda Automation",
    excerpt: "Reduce AWS bill shock by automating cost controls using CloudWatch alarms and Lambda.",
    category: "Cloud Transformation",
    image: "/images/aws-costs.jpeg",
    slug: "/knowledge/aws-costs-automation",
    date: "February 14, 2022"
  },
  {
    title: "Scaling Kafka Clusters for Millions of Messages per Second",
    excerpt: "Learn best practices for horizontally scaling Kafka clusters to support massive data throughput.",
    category: "Big Data Solutions",
    image: "/images/kafka-cluster.jpeg",
    slug: "/knowledge/scaling-kafka-clusters",
    date: "September 9, 2021"
  },
  {
    title: "Tuning Apache Spark for Optimal Performance on Big Data Workloads",
    excerpt: "Detailed guide to optimizing Spark jobs using partitioning, caching, and memory tuning.",
    category: "Big Data Solutions",
    image: "/images/spark-performance.jpeg",
    slug: "/knowledge/spark-tuning",
    date: "May 20, 2023"
  },
  {
    title: "Refactoring a Monolith into Microservices Without Downtime",
    excerpt: "Modernize a legacy monolith using the strangler pattern, domain boundaries, and containerization.",
    category: "App Development",
    image: "/images/monolith-to-microservices.jpeg",
    slug: "/knowledge/refactor-monolith-microservices",
    date: "January 26, 2021"
  },
  {
    title: "Zero Downtime Database Migration with Blue-Green Deployments",
    excerpt: "Master the art of zero downtime database migrations using blue-green deployment and replication strategies.",
    category: "Cloud Transformation",
    image: "/images/db-migration.jpeg",
    slug: "/knowledge/zero-downtime-db-migration",
    date: "June 8, 2023"
  },
  {
    title: "2025 US AI Policy Report",
    excerpt: "Research and analysis of the 2025 US AI policy landscape, its impacts, challenges, opportunities, and strategic recommendations for AI initiatives.",
    category: "Government Research",
    image: "/images/washington-dc.jpeg",
    slug: "/knowledge/AI-Strategy-2025-Policies-Executive-Summary",
    date: "April 30, 2025"
  },
  {
    title: "Prompt Engineering Field Guide",
    excerpt: "A comparative overview of prompt engineering techniques for LLMs.",
    category: "AI Strategy",
    image: "/images/prompt-engineering.jpeg",
    slug: "/knowledge/prompt-engineering-complete-field-guide",
    date: "May 5, 2025"
  },
  {
    title: "Design Patterns for Retrieval-Augmented Generation (RAG) Architectures",
    excerpt: "Explore advanced design patterns for building scalable RAG systems in production.",
    category: "AI Strategy",
    image: "/images/rag-patterns.jpeg",
    slug: "/knowledge/rag-architecture-patterns",
    date: "August 16, 2021"
  },
  {
    title: "Building Agentic AI Workflows with LangChain and OpenAI",
    excerpt: "How to orchestrate complex AI tasks using agent-based architectures with LangChain.",
    category: "AI Strategy",
    image: "/images/agentic-workflow.jpeg",
    slug: "/knowledge/agentic-ai-workflows",
    date: "July 12, 2024"
  },
  {
    title: "Containerizing Legacy .NET Apps for Cloud-Native Deployment",
    excerpt: "Steps to package old .NET Framework apps into Docker containers for Kubernetes.",
    category: "App Development",
    image: "/images/containerize-dotnet.jpeg",
    slug: "/knowledge/containerize-legacy-dotnet",
    date: "October 4, 2023"
  },
  {
    title: "GraphQL vs REST for Modern App Architectures: When to Choose What",
    excerpt: "Understand the trade-offs and best use cases for GraphQL and RESTful API design.",
    category: "App Development",
    image: "/images/graphql-vs-rest.jpeg",
    slug: "/knowledge/graphql-vs-rest-api",
    date: "November 17, 2022"
  },
  {
    title: "Building Real-Time Data Lakes with Kafka, Spark, and Delta Lake",
    excerpt: "Learn how to integrate Kafka, Spark Streaming, and Delta Lake to create a real-time data lake for analytics.",
    category: "Big Data Solutions",
    image: "/images/real-time-datalake.jpeg",
    slug: "/knowledge/real-time-datalake",
    date: "March 6, 2021"
  },
  {
    title: "How to Automate Cloud Infrastructure Management with Terraform",
    excerpt: "Use Terraform to automate cloud infrastructure provisioning, versioning, and deployment pipelines.",
    category: "Cloud Transformation",
    image: "/images/terraform-automation.jpeg",
    slug: "/knowledge/terraform-cloud-automation",
    date: "July 21, 2022"
  },
  {
    title: "How to Build a Serverless Data Pipeline with AWS Lambda and Kinesis",
    excerpt: "Learn how to create a cost-effective serverless data pipeline using AWS Lambda and Kinesis.",
    category: "Big Data Solutions",
    image: "/images/serverless-pipeline.jpeg",
    slug: "/knowledge/serverless-data-pipeline",
    date: "May 2, 2021"
  },
  {
    title: "Kubernetes for Legacy Applications: Transitioning to Cloud-Native",
    excerpt: "A step-by-step guide on how to migrate legacy apps to Kubernetes for better scalability and reliability.",
    category: "Cloud Transformation",
    image: "/images/kubernetes-legacy.jpeg",
    slug: "/knowledge/kubernetes-legacy-apps",
    date: "August 23, 2024"
  },
  {
    title: "Automating AI Workflows with Microsoft Azure AI Services",
    excerpt: "Leverage Microsoft Azure’s suite of AI tools to automate and orchestrate complex workflows.",
    category: "AI Strategy",
    image: "/images/azure-ai-automation.jpeg",
    slug: "/knowledge/azure-ai-workflows",
    date: "April 15, 2022"
  },
  {
    title: "Optimizing Spark Performance with Data Partitioning and Caching",
    excerpt: "Boost the performance of your Apache Spark workloads using data partitioning and efficient caching.",
    category: "Big Data Solutions",
    image: "/images/spark-partitioning.jpeg",
    slug: "/knowledge/spark-performance-optimization",
    date: "December 10, 2021"
  },
  {
    title: "Building Scalable Microservices with Kubernetes and Helm",
    excerpt: "Learn how to scale microservices in a Kubernetes environment using Helm charts for management.",
    category: "App Development",
    image: "/images/k8s-microservices.jpeg",
    slug: "/knowledge/kubernetes-helm-microservices",
    date: "March 18, 2024"
  },
  {
    title: "Creating a Hybrid Cloud Environment with AWS and Azure",
    excerpt: "How to integrate AWS and Azure services into a unified hybrid cloud architecture for multi-cloud benefits.",
    category: "Cloud Transformation",
    image: "/images/hybrid-cloud.jpeg",
    slug: "/knowledge/hybrid-cloud-aws-azure",
    date: "January 30, 2023"
  },
  {
    title: "Improving Data Consistency in Kafka Streams with Exactly-Once Semantics",
    excerpt: "Learn how to configure Kafka Streams to achieve exactly-once semantics for data consistency in your pipelines.",
    category: "Big Data Solutions",
    image: "/images/kafka-exactly-once.jpeg",
    slug: "/knowledge/kafka-exactly-once",
    date: "February 7, 2025"
  },
  {
    title: "Migrating from Monolithic to Microservices with Docker and Kubernetes",
    excerpt: "Step-by-step guide on breaking a monolithic application into microservices and deploying them with Docker and Kubernetes.",
    category: "App Development",
    image: "/images/monolithic-to-microservices.jpeg",
    slug: "/knowledge/migrate-monolithic-to-microservices",
    date: "November 28, 2024"
  },
  {
    title: "Leveraging Cloud-Native Machine Learning with AWS Sagemaker",
    excerpt: "Create scalable and robust machine learning pipelines on AWS with Sagemaker and Lambda functions.",
    category: "AI Strategy",
    image: "/images/aws-sagemaker.jpeg",
    slug: "/knowledge/aws-sagemaker-ml",
    date: "October 13, 2021"
  }
];


export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="px-6 py-16 max-w-7xl mx-auto flex-1">
        <h1 className="text-4xl font-bold mb-4">Knowledge Base</h1>
        <p className="text-lg text-gray-600 mb-12">Technical Articles Contributed by Our Architects & Consultants</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {blogPosts.map((post, index) => (
            <BlogCard key={index} {...post} />
          ))}
        </div>

        <section className="text-center max-w-3xl mx-auto mt-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Transform Your Business?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Let's discuss how our expertise in cloud, data, AI, and application development can accelerate your digital journey and drive meaningful growth.
          </p>
          <Link href="/contact" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-md text-lg transition inline-block">
            Get In Touch
          </Link>
        </section>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}