import Image from 'next/image';
import Header from '../../components/Header'; // Adjust path as needed
import Footer from '../../components/Footer'; // Adjust path as needed
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ServerlessPipelineArticle() {
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
               How to Build a Serverless Data Pipeline with AWS Lambda and Kinesis
             </h1>
             <p className="text-lg text-gray-600">
               Building a serverless data pipeline allows you to easily process real-time streaming data without managing any infrastructure. In this guide, we will create a simple serverless data pipeline using AWS Lambda and Kinesis Data Streams.
             </p>
          </div>


          {/* Image: Serverless Data Pipeline */}
          <div className="my-8">
            <Image src="/images/serverless-pipeline.png" alt="Serverless Data Pipeline Architecture" width={800} height={400} className="rounded-lg shadow-md mx-auto" />
          </div>

          {/* Apply prose classes for article styling */}
          {/* Ensure you have @tailwindcss/typography installed and configured */}
          <article className="prose prose-lg lg:prose-xl max-w-none text-gray-700">

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Core Components: Kinesis & Lambda</h2>
             <p>
               This pattern leverages two key AWS serverless services:
             </p>
             <ul className="list-disc list-outside pl-5 mt-4 space-y-2">
                <li><strong>AWS Kinesis Data Streams:</strong> A scalable and durable real-time data streaming service. It acts as the ingestion point and buffer for your streaming data. Data is ingested into shards, which provide ordered processing within the shard.</li>
                <li><strong>AWS Lambda:</strong> A serverless compute service that lets you run code without provisioning or managing servers. Lambda functions can be automatically triggered by events from various AWS services, including Kinesis Data Streams.</li>
             </ul>


            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Step 1: Setting Up an AWS Kinesis Data Stream</h2>
            <p>
              First, create a Kinesis Data Stream to receive your incoming data. You define the stream's capacity by specifying the number of shards. Each shard provides a certain level of read and write throughput (e.g., 1 MB/sec write, 2 MB/sec read).
            </p>
            <p>You can create a stream via the AWS Management Console or the AWS CLI:</p>
            {/* Consistent dark code block style */}
            <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto text-sm my-4">
{`# Create a Kinesis stream named 'MyStream' with 1 shard
aws kinesis create-stream --stream-name MyStream --shard-count 1`}
            </pre>
            <p>Start with one shard for low volume, and increase the shard count later if needed to scale throughput.</p>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Step 2: Create the Lambda Function for Processing</h2>
            <p>
              Next, create an AWS Lambda function that will contain your data processing logic. This function will be triggered automatically when new records arrive in the Kinesis stream.
            </p>
            <p>
              Choose your preferred runtime (e.g., Node.js, Python, Java). The Lambda function handler will receive an event object containing a batch of records from the Kinesis stream. Your code needs to iterate through these records, decode the data (Kinesis records are Base64 encoded), and perform the desired processing (e.g., transformation, filtering, enrichment, writing to another service like S3, DynamoDB, or another Kinesis stream).
            </p>
             <p>Example structure for a Python Lambda handler:</p>
             <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto text-sm my-4">
{`import base64
import json

def lambda_handler(event, context):
    print(f"Received {len(event['Records'])} records.")
    for record in event['Records']:
        # Kinesis data is base64 encoded
        payload_bytes = base64.b64decode(record['kinesis']['data'])
        payload_str = payload_bytes.decode('utf-8')

        print(f"Partition Key: {record['kinesis']['partitionKey']}")
        print(f"Sequence Number: {record['kinesis']['sequenceNumber']}")
        print(f"Decoded payload: {payload_str}")

        try:
            # Example: Assuming JSON data
            data = json.loads(payload_str)
            # --- Your Processing Logic Here ---
            # e.g., transform data, filter records, write to S3/DynamoDB
            print(f"Processing data: {data}")
            # ---------------------------------

        except json.JSONDecodeError:
            print(f"Payload is not valid JSON: {payload_str}")
        except Exception as e:
            print(f"Error processing record: {e}")
            # Consider error handling strategy (e.g., send to DLQ)
            # Re-raising the exception might cause Lambda to retry the batch

    print("Successfully processed records.")
    # Return value isn't typically used for Kinesis triggers
    return {'status': 'success'}`}
             </pre>


            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Step 3: Grant Permissions to Lambda</h2>
            <p>
              The Lambda function needs permission to read from the Kinesis stream and write logs to CloudWatch Logs. Create an IAM execution role for your Lambda function. Attach the AWS managed policy <code>AWSLambdaKinesisExecutionRole</code> to this role. This policy grants the necessary permissions:
            </p>
             <ul className="list-disc list-outside pl-5 mt-4 space-y-2">
                <li><code>kinesis:DescribeStream</code></li>
                <li><code>kinesis:DescribeStreamSummary</code></li>
                <li><code>kinesis:GetRecords</code></li>
                <li><code>kinesis:GetShardIterator</code></li>
                <li><code>kinesis:ListShards</code></li>
                <li><code>kinesis:ListStreams</code></li>
                <li><code>kinesis:SubscribeToShard</code></li>
                <li><code>logs:CreateLogGroup</code></li>
                <li><code>logs:CreateLogStream</code></li>
                <li><code>logs:PutLogEvents</code></li>
             </ul>
             <p>If your function needs to write to other services (like S3 or DynamoDB), add permissions for those actions to the IAM role as well.</p>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Step 4: Configure the Kinesis Event Source Mapping</h2>
            <p>
              Connect the Kinesis stream to the Lambda function using an event source mapping. This tells AWS to invoke your Lambda function when new records are available in the stream.
            </p>
            <p>Configure this in the Lambda console ("Add trigger" section) or via the AWS CLI:</p>
            {/* Consistent dark code block style */}
            <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto text-sm my-4">
{`# Replace placeholders with your actual function name, stream ARN, and desired batch size/position
aws lambda create-event-source-mapping \\
    --function-name MyLambdaFunction \\
    --event-source-arn arn:aws:kinesis:us-east-1:123456789012:stream/MyStream \\
    --batch-size 100 \\
    --starting-position LATEST \\
    # Or TRIM_HORIZON to process from the beginning

# Optional parameters:
# --maximum-batching-window-in-seconds 10 # Wait up to 10s to fill batch
# --parallelization-factor 1 # Number of concurrent Lambda invocations per shard (default 1)
# --on-failure DestinationConfig={OnFailure={Destination=arn:aws:sqs:us-east-1:123456789012:my-dlq}} # Send failed batches to DLQ`}
            </pre>
             <p>Key parameters:</p>
             <ul className="list-disc list-outside pl-5 mt-4 space-y-2">
                <li><code>--batch-size</code>: Max number of records sent to Lambda per invocation.</li>
                <li><code>--starting-position</code>: Where to start reading (<code>LATEST</code> or <code>TRIM_HORIZON</code>).</li>
                <li><code>--maximum-batching-window-in-seconds</code>: Max time to wait to gather records before invoking Lambda.</li>
                <li><code>--on-failure</code>: Configure a Dead-Letter Queue (DLQ) like SQS or SNS to send records from failed batches for later analysis.</li>
             </ul>


            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Step 5: Testing the Pipeline</h2>
            <p>
              Send test data to your Kinesis stream to verify the pipeline is working. Use the AWS SDK or the CLI:
            </p>
            {/* Consistent dark code block style */}
            <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto text-sm my-4">
{`# Send a simple text record
aws kinesis put-record \\
    --stream-name MyStream \\
    --data "Hello Serverless Pipeline!" \\
    --partition-key "user123"

# Send JSON data (ensure it's properly escaped for CLI or use SDK)
aws kinesis put-record \\
    --stream-name MyStream \\
    --data '{"sensorId": "A7", "temperature": 25.5, "timestamp": "2025-04-24T17:40:00Z"}' \\
    --partition-key "sensorA7"`}
            </pre>
            <p>
              Monitor the Lambda function's execution logs in AWS CloudWatch Logs. You should see log entries indicating records were received and processed. Check any downstream services (like S3 or DynamoDB) if your function writes data there.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Conclusion</h2>
            <p>
              You have successfully built a basic serverless data pipeline using AWS Kinesis Data Streams and AWS Lambda. This architecture provides a highly scalable, cost-effective (pay-per-invocation/GB-second), and operationally simple way to process real-time streaming data. You can extend this pattern by adding more processing steps (chaining Lambda functions via SNS/SQS or Step Functions), writing to various data stores, or increasing Kinesis shard counts and Lambda concurrency to handle higher volumes.
            </p>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
