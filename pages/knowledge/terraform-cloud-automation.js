import Image from 'next/image';
import Header from '../../components/Header'; // Adjust path as needed
import Footer from '../../components/Footer'; // Adjust path as needed
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function TerraformAutomationArticle() {
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
               How to Automate Cloud Infrastructure Management with Terraform
             </h1>
             <p className="text-lg text-gray-600">
               Terraform is an open-source infrastructure as code (IaC) tool that allows you to define, provision, and manage infrastructure resources safely and predictably. In this article, we’ll dive into how to automate the creation and management of cloud infrastructure using Terraform, focusing on AWS examples.
             </p>
          </div>


          {/* Image: Terraform Automation */}
          <div className="my-8">
            <Image src="/images/terraform-automation.png" alt="Terraform Automation Workflow" width={800} height={400} className="rounded-lg shadow-md mx-auto" />
          </div>

          {/* Apply prose classes for article styling */}
          {/* Ensure you have @tailwindcss/typography installed and configured */}
          <article className="prose prose-lg lg:prose-xl max-w-none text-gray-700">

             <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">What is Infrastructure as Code (IaC)?</h2>
             <p>
               Infrastructure as Code (IaC) is the practice of managing and provisioning computer data centers through machine-readable definition files (code), rather than physical hardware configuration or interactive configuration tools. Terraform is a leading IaC tool that uses a declarative configuration language (HCL - HashiCorp Configuration Language) to define the desired state of your infrastructure.
             </p>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Step 1: Setting Up Your Terraform Environment</h2>
            <p>
              First, install Terraform on your local machine or development environment. Download the appropriate package for your operating system from the <a href="https://developer.hashicorp.com/terraform/downloads" target="_blank" rel="noopener noreferrer">official Terraform website</a> and follow the installation instructions.
            </p>
            <p>Verify the installation by opening your terminal and running:</p>
            {/* Consistent dark code block style */}
            <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto text-sm my-4">
{`terraform --version`}
            </pre>
             <p>You also need credentials configured for your target cloud provider (e.g., AWS). This is typically done via environment variables (<code>AWS_ACCESS_KEY_ID</code>, <code>AWS_SECRET_ACCESS_KEY</code>, <code>AWS_REGION</code>), an AWS credentials file (<code>~/.aws/credentials</code>), or an IAM role if running Terraform from within AWS (like EC2 or CodeBuild).</p>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Step 2: Writing Terraform Configuration (HCL)</h2>
            <p>
              Create a directory for your project. Inside, create configuration files (usually ending in <code>.tf</code>). The core file is often named <code>main.tf</code>. Here you define:
            </p>
             <ul className="list-disc list-outside pl-5 mt-4 space-y-2">
                <li><strong>Providers:</strong> Specify the cloud providers you want to interact with (e.g., AWS, Azure, GCP) and their versions.</li>
                <li><strong>Resources:</strong> Declare the infrastructure components you want to create (e.g., EC2 instances, S3 buckets, VPCs, databases).</li>
                <li><strong>Variables (optional):</strong> Define input variables (in <code>variables.tf</code>) to make your configuration reusable and customizable.</li>
                <li><strong>Outputs (optional):</strong> Define output values (in <code>outputs.tf</code>) to display useful information after deployment (e.g., an instance's IP address).</li>
             </ul>
             <p>Example <code>main.tf</code> defining an AWS provider and a simple S3 bucket:</p>
             <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto text-sm my-4">
{`terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0" # Use a specific version constraint
    }
  }

  # Optional: Configure remote state backend (recommended for teams)
  # backend "s3" {
  #   bucket         = "your-terraform-state-bucket-name" # Replace with your S3 bucket name
  #   key            = "global/s3/terraform.tfstate"
  #   region         = "us-east-1"
  #   encrypt        = true
  #   dynamodb_table = "your-terraform-lock-table" # Optional: for state locking
  # }
}

provider "aws" {
  region = "us-east-1" # Specify your desired AWS region
  # Credentials are typically configured outside the code (env vars, credentials file, IAM role)
}

resource "aws_s3_bucket" "my_bucket" {
  # Bucket names must be globally unique
  bucket = "my-unique-terraform-demo-bucket-12345" # Replace with a unique name

  tags = {
    Name        = "My Terraform Bucket"
    Environment = "Dev"
    ManagedBy   = "Terraform"
  }
}

# Example Output
output "bucket_name" {
  description = "The name of the created S3 bucket"
  value       = aws_s3_bucket.my_bucket.bucket
}`}
             </pre>
              <p className="text-sm text-gray-500 italic mt-2">Note: The S3 backend configuration is commented out but highly recommended for team collaboration to store the Terraform state file remotely and securely, enabling state locking.</p>


            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Step 3: Initializing Terraform (<code>terraform init</code>)</h2>
            <p>
              Navigate to your project directory in the terminal and run <code>terraform init</code>. This command performs several actions:
            </p>
             <ul className="list-disc list-outside pl-5 mt-4 space-y-2">
                <li>Downloads and installs the necessary provider plugins defined in the <code>required_providers</code> block (e.g., the AWS provider).</li>
                <li>Initializes the backend (if configured) for state file storage.</li>
                <li>Sets up the working directory for other Terraform commands.</li>
             </ul>
             <p>You only need to run <code>init</code> once per project, or again if you add new providers or change backend configuration.</p>
            <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto text-sm my-4">
{`terraform init`}
            </pre>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Step 4: Planning and Applying Changes (<code>plan</code> & <code>apply</code>)</h2>
            <p>
              Before making any changes, run <code>terraform plan</code>. Terraform reads your configuration, compares it to the current state (stored locally in <code>terraform.tfstate</code> or remotely in the configured backend), and generates an execution plan showing exactly what actions it will take (create, update, or destroy resources).
            </p>
            <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto text-sm my-4">
{`terraform plan`}
            </pre>
             <p>Review the plan carefully. If it looks correct, apply the changes using <code>terraform apply</code>:</p>
            <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto text-sm my-4">
{`terraform apply`}
            </pre>
            <p>
              Terraform will again show the plan and ask for confirmation (unless you use <code>-auto-approve</code>, not recommended for manual runs). Type <code>yes</code> to proceed. Terraform will then interact with the cloud provider's API to create or modify the resources as defined in the plan. After completion, it updates the state file.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Step 5: Managing Infrastructure Lifecycle</h2>
            <p>
              Terraform manages the entire lifecycle of your infrastructure:
            </p>
             <ul className="list-disc list-outside pl-5 mt-4 space-y-2">
                <li><strong>Updates:</strong> Modify your <code>.tf</code> files (e.g., change an instance type, add tags, add new resources). Run <code>terraform plan</code> to see the intended changes, then <code>terraform apply</code> to implement them.</li>
                <li><strong>Inspection:</strong> Use <code>terraform show</code> to inspect the current state managed by Terraform. Use <code>terraform state list</code> to list resources in the state.</li>
                <li><strong>Destruction:</strong> To remove all resources managed by your configuration, run <code>terraform destroy</code>. Review the plan carefully and confirm.</li>
             </ul>


            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Conclusion</h2>
            <p>
              Terraform provides a powerful and consistent workflow for automating cloud infrastructure management using Infrastructure as Code. By defining resources declaratively in HCL, using commands like <code>init</code>, <code>plan</code>, and <code>apply</code>, and leveraging features like remote state backends, you can reliably provision, update, and destroy infrastructure across various cloud providers like AWS. This approach enhances collaboration, reduces manual errors, increases deployment speed, and provides better visibility and control over your cloud resources.
            </p>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
