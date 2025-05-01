import Image from 'next/image';
import Header from '../../components/Header'; // Adjust path as needed
import Footer from '../../components/Footer'; // Adjust path as needed
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AzureAIArticle() {
  return (
    // Add the main page wrapper with flex-col and min-h-screen
    <div className="bg-white min-h-screen flex flex-col">
      <Header />

      {/* Add flex-grow and container styling for the main content */}
      <main className="flex-grow py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Optional: Add a back button here if desired*/}
          <div className="mb-8">
            <Link href="/knowledge-base" legacyBehavior> 
              <a className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Knowledge Base
              </a>
            </Link>
          </div>

          {/* Article Header */}
          <div className="mb-10 border-b border-gray-200 pb-8">
             <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
               Automating AI Workflows with Microsoft Azure AI Services
             </h1>
             <p className="text-lg text-gray-600">
               Microsoft Azure offers a comprehensive suite of AI services that can be integrated to build powerful and scalable AI workflows. In this guide, we'll explore how to automate AI workflows using Azure’s tools for natural language processing, computer vision, and machine learning.
             </p>
          </div>


          {/* Image: Azure AI Automation */}
          <div className="my-8"> {/* Added margin top/bottom */}
            <Image src="/images/azure-ai-automation.png" alt="Azure AI Workflow" width={800} height={400} className="rounded-lg shadow-md mx-auto" /> {/* Added shadow and centered */}
          </div>

          {/* Apply prose classes for article styling */}
          <article className="prose prose-lg lg:prose-xl max-w-none text-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Step 1: Setting Up Cognitive Services in Azure</h2>
            <p>
              To begin automating AI workflows, you'll first need to set up Azure Cognitive Services. These services provide pre-built APIs for tasks such as language understanding, sentiment analysis, and vision recognition.
            </p>
            <p>
              Start by creating a resource for the desired cognitive service in the Azure portal. For example, if you want to work with computer vision, you’ll need to create a Computer Vision resource and obtain your API key.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Step 2: Integrating Cognitive Services with Azure Logic Apps</h2>
            <p>
              Azure Logic Apps can be used to build automated workflows that integrate different services. In this step, we'll integrate Azure Cognitive Services with Logic Apps to create an automated image analysis workflow.
            </p>
            <p>
              You can start by creating a Logic App in the Azure portal and configuring it to trigger based on certain events, such as when a new image is uploaded to a storage account. You can then call the cognitive service API to analyze the image and take appropriate actions based on the results.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Step 3: Automating Data Processing with Azure Functions</h2>
            <p>
              Azure Functions allow you to run small pieces of code in response to events, such as HTTP requests or changes in data. In this step, we’ll use Azure Functions to process and analyze data automatically once the cognitive service returns a result.
            </p>
            <p>
              For instance, you can use an Azure Function to process text extracted from an image or to automate the next step in a multi-step AI workflow, such as sending an email or logging the results into a database.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Step 4: Monitoring and Optimizing AI Workflows</h2>
            <p>
              Once your AI workflow is up and running, it’s important to monitor its performance and make optimizations. Azure provides built-in monitoring tools such as Application Insights, which can help you track the performance of your Logic Apps, Functions, and Cognitive Services.
            </p>
            <p>
              You should also review usage and cost reports to ensure that the workflow is operating efficiently and within budget. By regularly assessing performance and cost, you can make adjustments as necessary.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Conclusion</h2>
            <p>
              By combining Microsoft Azure’s Cognitive Services, Logic Apps, and Functions, you can automate complex AI workflows without managing servers. This allows you to scale your AI solutions efficiently and easily integrate them into your business processes.
            </p>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
