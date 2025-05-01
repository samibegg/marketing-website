import Image from 'next/image';
import Header from '../../components/Header'; // Adjust path as needed
import Footer from '../../components/Footer'; // Adjust path as needed
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AWSCostOptimizationArticle() {
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
               Optimizing AWS Costs with CloudWatch Alarms and Lambda Automation
             </h1>
             <p className="text-lg text-gray-600">
               AWS offers a powerful and scalable platform, but cost management can become a challenge without proper controls in place. In this guide, we will demonstrate how to leverage AWS CloudWatch Alarms and AWS Lambda to automatically monitor and manage your AWS costs, helping to reduce bill shock while maintaining a seamless cloud environment.
             </p>
          </div>


          {/* Image showing AWS Cost Optimization Diagram */}
          <div className="my-8">
            <Image src="/images/aws-costs.png" alt="AWS Cost Optimization" width={800} height={400} className="rounded-lg shadow-md mx-auto" />
          </div>

          {/* Apply prose classes for article styling */}
          {/* Ensure you have @tailwindcss/typography installed and configured */}
          <article className="prose prose-lg lg:prose-xl max-w-none text-gray-700">

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Step 1: Setting Up CloudWatch Alarms for Cost Monitoring</h2>
            <p>
              The first step in cost optimization is setting up CloudWatch alarms to monitor your AWS spending in real-time. You can create alarms that trigger when your estimated charges or usage exceed a predefined threshold.
            </p>
            <ul className="list-disc list-outside pl-5 mt-4 space-y-2"> {/* Adjusted list styling */}
              <li><strong>Define Cost Thresholds:</strong> Start by defining a budget limit for your AWS resources or specific services. Use AWS Cost Explorer to understand historical costs and trends to set realistic thresholds.</li>
              <li><strong>Create Billing Alarms:</strong> In the CloudWatch console (or via CLI/SDK), navigate to Billing alarms. Create an alarm based on the `EstimatedCharges` metric, setting your desired threshold (e.g., $500).</li>
              <li><strong>Set Up SNS Notifications:</strong> Configure an AWS Simple Notification Service (SNS) topic and subscription (e.g., email, SMS, Slack webhook via Lambda) to receive alerts when the alarm state changes (e.g., goes into ALARM).</li>
            </ul>
            <p>
              CloudWatch helps you monitor AWS costs dynamically, but without automation, you'll still need to manually take action when alarms are triggered. That's where AWS Lambda comes in.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Step 2: Automating Cost Controls with AWS Lambda</h2>
            <p>
              AWS Lambda allows you to run code in response to events, including CloudWatch alarm state changes. You can automate actions like shutting down non-essential resources or notifying specific teams.
            </p>
            <ul className="list-disc list-outside pl-5 mt-4 space-y-2"> {/* Adjusted list styling */}
              <li><strong>Create Lambda Functions:</strong> Write Lambda functions (e.g., in Python, Node.js) using the AWS SDK (Boto3 for Python) to perform specific actions. Examples include stopping EC2 instances tagged as 'dev', reducing DynamoDB provisioned throughput, or posting detailed messages to Slack. Ensure the Lambda execution role has the necessary permissions (e.g., `ec2:StopInstances`).</li>
              <li><strong>Integrate Lambda with SNS/CloudWatch Alarms:</strong> Configure the SNS topic (used by the CloudWatch alarm) to trigger your Lambda function when a message is published (i.e., when the alarm state changes).</li>
              <li><strong>Test the Workflow:</strong> Thoroughly test your Lambda functions. You can manually change an alarm's state using the AWS CLI (`aws cloudwatch set-alarm-state`) or temporarily set a very low threshold to trigger the alarm and verify the Lambda function executes correctly.</li>
            </ul>
            <p>
              By automating cost management with Lambda, you can proactively control and potentially reduce AWS spending without constant manual intervention.
            </p>

            {/* AWS Lambda Automation Diagram */}
            <div className="my-8"> {/* Added margin */}
              <Image src="/images/aws-lambda-automation.png" alt="AWS Lambda Automation" width={800} height={400} className="rounded-lg shadow-md mx-auto" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Step 3: Fine-Tuning the Automation for Different Use Cases</h2>
            <p>
              There are many use cases where Lambda automation can help control AWS costs. Here are a few examples:
            </p>
            <ul className="list-disc list-outside pl-5 mt-4 space-y-2"> {/* Adjusted list styling */}
              <li><strong>EC2 Instance Management:</strong> Tag non-production EC2 instances (e.g., `Environment=Dev`, `AutoStop=True`). Create a scheduled Lambda function (using CloudWatch Events/EventBridge scheduler) to stop instances with specific tags outside business hours (e.g., 7 PM - 7 AM weekdays, all weekend).</li>
              <li><strong>RDS Scaling:</strong> While more complex, you could potentially use Lambda triggered by CloudWatch metrics (e.g., low `CPUUtilization` for an extended period) to modify RDS instance classes (requires careful planning due to potential downtime during modification). Stopping RDS instances via Lambda is also possible for non-prod environments.</li>
              <li><strong>S3 Storage Lifecycle Management:</strong> While S3 Lifecycle Policies are the primary way to automate transitions (e.g., Standard to Glacier), Lambda could be used for more complex logic, like tagging objects for deletion based on external triggers or database lookups.</li>
              <li><strong>Unused Resource Cleanup:</strong> Schedule Lambda functions to identify and report (or optionally delete) unused resources like old EBS snapshots, unattached EBS volumes, or idle Elastic Load Balancers based on CloudWatch metrics or Trusted Advisor checks.</li>
            </ul>
            <p>
              Customizing Lambda functions and triggers for your specific workload patterns and cost concerns is key to achieving optimal AWS cost management.
            </p>

            {/* Lambda Use Case Diagram */}
            <div className="my-8"> {/* Added margin */}
              <Image src="/images/lambda-use-cases.png" alt="Lambda Use Cases" width={800} height={400} className="rounded-lg shadow-md mx-auto" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Step 4: Leveraging AWS Budgets and Cost Explorer for Further Insights</h2>
            <p>
              While CloudWatch alarms react to metrics, AWS Budgets and Cost Explorer provide higher-level financial tracking and analysis:
            </p>
            <ul className="list-disc list-outside pl-5 mt-4 space-y-2"> {/* Adjusted list styling */}
              <li><strong>Set Budget Alerts:</strong> Create AWS Budgets for overall cost, specific services, linked accounts, or tags. Configure budget actions to trigger SNS notifications (which can then trigger Lambda) when actual or forecasted spending exceeds thresholds (e.g., 80%, 100% of budget).</li>
              <li><strong>Use Cost Explorer for Detailed Analysis:</strong> Regularly analyze cost and usage trends in AWS Cost Explorer. Filter by service, tag, region, account, etc., to identify cost drivers. Use this data to refine CloudWatch alarm thresholds and identify new opportunities for Lambda automation.</li>
              <li><strong>Automate Cost Optimization Recommendations:</strong> While direct Lambda integration is limited, you can periodically use Lambda to query the AWS Trusted Advisor API for cost optimization checks and report findings or create tickets automatically.</li>
            </ul>
            <p>
              These tools provide crucial visibility and planning capabilities that complement the reactive automation provided by CloudWatch and Lambda.
            </p>

            {/* AWS Cost Explorer Diagram */}
            <div className="my-8"> {/* Added margin */}
              <Image src="/images/aws-cost-explorer.png" alt="AWS Cost Explorer" width={800} height={400} className="rounded-lg shadow-md mx-auto" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Conclusion</h2>
            <p>
              By strategically combining AWS CloudWatch alarms for real-time metric monitoring, AWS Lambda for automated actions, and AWS Budgets/Cost Explorer for financial tracking and analysis, you can implement a robust system for managing and optimizing your AWS costs. Automating cloud cost control ensures that your resources are used efficiently, helps prevent budget overruns, and allows your team to focus on innovation rather than manual cost management tasks.
            </p>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
