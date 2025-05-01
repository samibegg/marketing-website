import Image from 'next/image';
import Header from '../../components/Header'; // Adjust path as needed
import Footer from '../../components/Footer'; // Adjust path as needed
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AWSSagemakerArticle() {
  return (
    // Add the main page wrapper with flex-col and min-h-screen
    <div className="bg-white min-h-screen flex flex-col">
      <Header />

      {/* Add flex-grow and container styling for the main content */}
      <main className="flex-grow py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Back button using modern Link syntax (no legacyBehavior or <a> tag) */}
          <div className="mb-8">
            <Link href="/knowledge-base" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition"> {/* Apply styles directly to Link */}
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Knowledge Base
            </Link>
          </div>

          {/* Article Header */}
          <div className="mb-10 border-b border-gray-200 pb-8">
             <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
               Leveraging Cloud-Native Machine Learning with AWS Sagemaker
             </h1>
             <p className="text-lg text-gray-600">
               AWS Sagemaker is a powerful tool for building, training, and deploying machine learning models at scale. In this guide, we’ll explore how to leverage Sagemaker’s cloud-native features to build machine learning pipelines that are robust, scalable, and easy to manage.
             </p>
          </div>


          {/* Image: AWS Sagemaker */}
          <div className="my-8"> {/* Added margin top/bottom */}
            <Image src="/images/aws-sagemaker.png" alt="AWS Sagemaker" width={800} height={400} className="rounded-lg shadow-md mx-auto" /> {/* Added shadow and centered */}
          </div>

          {/* Apply prose classes for article styling */}
          {/* Ensure you have @tailwindcss/typography installed and configured */}
          <article className="prose prose-lg lg:prose-xl max-w-none text-gray-700">

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">What is AWS Sagemaker?</h2>
            <p>
              AWS Sagemaker is a fully managed service that enables developers and data scientists to build, train, and deploy machine learning models quickly. It offers a broad range of services, from data labeling to model training and deployment, all in a scalable and cloud-native environment.
            </p>

            <h3 className="text-xl font-semibold mt-4">Key Features of AWS Sagemaker</h3> {/* Changed from font-medium for consistency */}
            <ul className="list-disc list-outside pl-5 mt-4 space-y-2"> {/* Adjusted list styling */}
              <li>Fully managed infrastructure for building, training, and deploying models.</li>
              <li>Pre-built algorithms and support for custom models using TensorFlow, PyTorch, and more.</li>
              <li>Automatic scaling and distributed training for large datasets.</li>
              <li>Model monitoring and tuning capabilities.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Step 1: Data Preparation and Preprocessing</h2>
            <p>
              The first step in any machine learning project is to prepare your data. Sagemaker provides tools to help with data preprocessing, including built-in data processing containers and support for custom preprocessing scripts.
            </p>

            <h3 className="text-xl font-semibold mt-4">Using Sagemaker Processing for Data Preprocessing</h3> {/* Changed from font-medium */}
            <p>
              Sagemaker Processing enables you to run data preprocessing and postprocessing jobs on scalable infrastructure. You can use built-in containers like <code>sagemaker-python-sdk</code> or provide your own custom Docker images.
            </p>

            {/* Code Block - Prose plugin should handle styling */}
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
{`from sagemaker.processing import ScriptProcessor
from sagemaker import get_execution_role

role = get_execution_role()

processor = ScriptProcessor(
    image_uri='your-custom-image-uri',
    role=role,
    instance_count=1,
    instance_type='ml.m5.xlarge'
)

processor.run(
    code='data_preprocessing_script.py',
    inputs=[sagemaker.processing.ProcessingInput(source='s3://your-bucket/input/', destination='/opt/ml/processing/input')],
    outputs=[sagemaker.processing.ProcessingOutput(source='/opt/ml/processing/output', destination='s3://your-bucket/output/')]
)`}
            </pre>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Step 2: Model Training with AWS Sagemaker</h2>
            <p>
              After preprocessing the data, the next step is model training. Sagemaker offers pre-built algorithms like XGBoost, TensorFlow, and built-in support for custom model training. You can also use managed spot training to reduce costs by leveraging unused EC2 instances.
            </p>

            <h3 className="text-xl font-semibold mt-4">Training a Model with Sagemaker</h3> {/* Changed from font-medium */}
            <p>
              Below is an example of how to use AWS Sagemaker to train a model using the built-in XGBoost algorithm. The model will be trained on data stored in Amazon S3.
            </p>

            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
{`import sagemaker
from sagemaker import get_execution_role
# Note: XGBoostModel might be deprecated, consider using Estimator API
# from sagemaker.xgboost import XGBoostModel
from sagemaker.estimator import Estimator

role = get_execution_role()
session = sagemaker.Session()
region = session.boto_region_name

# Get XGBoost image URI
xgboost_image_uri = sagemaker.image_uris.retrieve('xgboost', region, '1.5-1') # Check for latest version

# Define the S3 locations for the training data and output
s3_input_train = sagemaker.inputs.TrainingInput(s3_data='s3://your-bucket/training-data/', content_type='csv')
s3_output = 's3://your-bucket/output/'

# Define the training job using Estimator
xgb_estimator = Estimator(
    image_uri=xgboost_image_uri,
    role=role,
    instance_count=1,
    instance_type='ml.m5.xlarge', # Choose appropriate instance type
    output_path=s3_output,
    sagemaker_session=session,
    # Define hyperparameters if needed
    hyperparameters={
        "objective": "reg:squarederror", # Example hyperparameter
        "num_round": 100
    }
)

# Fit the estimator
xgb_estimator.fit({'train': s3_input_train}, job_name='xgboost-training-job', wait=True)`}
            </pre>
             {/* Added note about Estimator API */}
             <p className="text-sm text-gray-500 italic mt-2">Note: The Sagemaker SDK evolves. The <code>Estimator</code> class is generally preferred over framework-specific `Model` classes like `XGBoostModel` for training jobs.</p>


            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Step 3: Model Deployment with AWS Sagemaker</h2>
            <p>
              After training your model, the next step is deployment. Sagemaker allows you to deploy models with a few simple API calls, either on real-time endpoints or batch transform jobs.
            </p>

            <h3 className="text-xl font-semibold mt-4">Deploying a Model with Sagemaker Endpoints</h3> {/* Changed from font-medium */}
            <p>
              You can deploy a trained model (from an Estimator or Model object) as a real-time inference endpoint. Here’s an example using the estimator from the previous step:
            </p>

            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
{`# Deploy the trained estimator
xgb_predictor = xgb_estimator.deploy(
    initial_instance_count=1,
    instance_type='ml.m5.xlarge', # Choose appropriate instance type for inference
    endpoint_name='xgboost-realtime-endpoint' # Optional: provide a name
)

# You can then make predictions:
# response = xgb_predictor.predict(your_inference_data)`}
            </pre>

            <h3 className="text-xl font-semibold mt-4">Scaling and Auto-Scaling Your Endpoints</h3> {/* Changed from font-medium */}
            <p>
              AWS Sagemaker supports auto-scaling for your endpoints based on incoming traffic or other CloudWatch metrics. You can configure auto-scaling policies directly in the Sagemaker console or using the AWS SDK/CLI.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Step 4: Model Monitoring and Tuning</h2>
            <p>
              Sagemaker provides tools to monitor your model’s performance and make adjustments as necessary. You can track metrics like latency, throughput, and cost. Sagemaker Model Monitor can help detect data quality issues and drift in the incoming data compared to the training baseline.
            </p>

            <h3 className="text-xl font-semibold mt-4">Using Model Monitor for Continuous Evaluation</h3> {/* Changed from font-medium */}
            <p>
              Model Monitor tracks the data being used for inference and compares it to the original training data baseline. If there are significant differences (data drift) or quality issues, it can trigger alerts via CloudWatch Events, allowing you to take corrective actions like retraining the model.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 border-t border-gray-200 pt-6 mt-8">Conclusion</h2>
            <p>
              AWS Sagemaker is a robust and scalable platform for building, training, and deploying machine learning models in a cloud-native environment. By leveraging Sagemaker’s fully managed infrastructure, integrated tools for data processing, training, deployment, and monitoring, you can significantly streamline your machine learning workflows, reduce operational overhead, manage costs effectively, and scale your AI solutions efficiently.
            </p>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
