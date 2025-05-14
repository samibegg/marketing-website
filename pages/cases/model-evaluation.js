// /pages/cases/model-evaluation.js
import Head from 'next/head';

const AIEvaluationSOW = () => {
  return (
    <>
      <Head>
        <title>AI Approaches Evaluation</title>
        <meta name="description" content="Evaluating AI Approaches for External Data Validation and Anomaly Detection" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto+Slab:wght@400;700&display=swap" rel="stylesheet" />
      </Head>

      <div className="min-h-screen bg-slate-100 font-inter text-slate-800 py-8 md:py-12 px-4 sm:px-6 lg:px-8">
        <main className="max-w-4xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden">
          <header className="bg-gradient-to-r from-sky-600 to-cyan-500 p-8 md:p-10 text-white">
            <h1 className="text-3xl md:text-4xl font-bold font-roboto-slab text-center">
              Evaluating AI Approaches for External Data Validation and Anomaly Detection  
            </h1>
          </header>

          <div className="p-6 md:p-10 space-y-10">
            <section aria-labelledby="project-objective">
              <h2 id="project-objective" className="text-2xl md:text-3xl font-semibold font-roboto-slab text-sky-700 mb-5 pb-2 border-b border-sky-200">
                1. Objective
              </h2>
              <p className="text-base md:text-lg text-slate-700 leading-relaxed">
                To evaluate, compare and ultimately recommend the most suitable AI-based approach for validating external data against the ground truth, a known high-veracity, dynamic, proprietary dataset. The goal is to determine if prompted external data &quot;makes sense&quot; within the context of the trusted internal data.
              </p>
            </section>

            <section aria-labelledby="required-information">
              <h2 id="required-information" className="text-2xl md:text-3xl font-semibold font-roboto-slab text-sky-700 mb-5 pb-2 border-b border-sky-200">
                2. Required Starting Information <span className="text-lg font-medium">(for Evaluation Phase)</span>
              </h2>
              <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-6">
                To effectively evaluate the outlined AI approaches, the project team will require access to the following:
              </p>
              <ul className="list-disc list-outside pl-5 space-y-3 text-slate-700 text-base md:text-lg">
                <li>
                  <strong className="font-medium text-slate-800">Proprietary Dataset:</strong> A representative and accessible version of the company&apos;s trusted internal data. Understanding its structure, content, and update frequency is crucial.
                </li>
                <li>
                  <strong className="font-medium text-slate-800">Sample External Data:</strong> Examples of the external data that will be prompted and require validation. This should include data that is expected to be &quot;sensible&quot; and data that might be questionable.
                </li>
                <li>
                  <strong className="font-medium text-slate-800">Defined Validation Criteria:</strong> A clear definition from business stakeholders on what constitutes external data &quot;making sense&quot; in the context of the proprietary data (e.g., statistical similarity, factual consistency, adherence to specific patterns).
                </li>
                <li>
                  <strong className="font-medium text-slate-800">Technical Environment Details:</strong> Information about existing data infrastructure and preferred technology stack, if any.
                </li>
                <li>
                  <strong className="font-medium text-slate-800">Subject Matter Experts (SMEs):</strong> Access to personnel who understand the proprietary data and the business context for validation.
                </li>
              </ul>
            </section>

            <section aria-labelledby="proposed-ai-approaches">
              <h2 id="proposed-ai-approaches" className="text-2xl md:text-3xl font-semibold font-roboto-slab text-sky-700 mb-6 pb-2 border-b border-sky-200">
                3. Proposed AI Approaches for Evaluation
              </h2>
              <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-8">
                We will evaluate three primary AI approaches:
              </p>

              <div className="space-y-8">
                <article className="bg-slate-50 p-6 rounded-lg shadow-md border-l-4 border-sky-500">
                  <h3 className="text-xl md:text-2xl font-semibold text-sky-600 mb-3">
                    A. Approach 1: Training Custom Models
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    <strong>Brief Description:</strong> This involves building a bespoke AI model trained exclusively on your proprietary dataset. The model learns the unique patterns and characteristics of your internal data to establish a &quot;norm&quot; against which external data is compared.
                  </p>
                  <h4 className="text-lg font-medium text-slate-700 mt-5 mb-3">High-Level Implementation Steps for Evaluation:</h4>
                  <ol className="list-decimal list-outside pl-5 space-y-2 text-slate-600 leading-relaxed">
                    <li><strong>Data Preparation:</strong> Select and preprocess a significant portion of the proprietary dataset for training.</li>
                    <li><strong>Model Selection &amp; Design:</strong> Choose an appropriate model architecture (e.g., classifier, anomaly detector like an autoencoder) based on the nature of the data and validation criteria.</li>
                    <li><strong>Model Training:</strong> Train the selected model on the prepared proprietary data.</li>
                    <li><strong>Validation &amp; Testing:</strong> Use sample external data (and potentially a held-out portion of proprietary data) to test the model&apos;s ability to identify data that does or does not &quot;make sense.&quot;</li>
                    <li><strong>Performance Analysis:</strong> Evaluate accuracy, and how it handles new proprietary data (e.g., need for retraining).</li>
                  </ol>
                </article>

                <article className="bg-slate-50 p-6 rounded-lg shadow-md border-l-4 border-cyan-500">
                  <h3 className="text-xl md:text-2xl font-semibold text-cyan-600 mb-3">
                    B. Approach 2: Fine-tuning Pre-trained Models
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    <strong>Brief Description:</strong> This method adapts powerful, general-purpose AI models (like Large Language Models - LLMs) by further training them on your specific proprietary dataset.<span className="text-cyan-600 font-medium">[2]</span> This allows the model to specialize its broad knowledge to your unique context.
                  </p>
                  <h4 className="text-lg font-medium text-slate-700 mt-5 mb-3">High-Level Implementation Steps for Evaluation:</h4>
                  <ol className="list-decimal list-outside pl-5 space-y-2 text-slate-600 leading-relaxed">
                    <li><strong>Base Model Selection:</strong> Choose a suitable pre-trained model (e.g., an LLM appropriate for the data type).<span className="text-cyan-600 font-medium">[2]</span></li>
                    <li><strong>Proprietary Data Preparation:</strong> Curate a high-quality, relevant subset of your proprietary data for the fine-tuning process.<span className="text-cyan-600 font-medium">[2]</span></li>
                    <li><strong>Fine-tuning Process:</strong> Adjust the parameters of the pre-trained model using your proprietary data. This could involve full fine-tuning or more efficient methods like Parameter-Efficient Fine-Tuning (PEFT).<span className="text-cyan-600 font-medium">[2]</span></li>
                    <li><strong>Validation &amp; Testing:</strong> Test the fine-tuned model using sample external data, prompting it to assess consistency against the learned proprietary context.</li>
                    <li><strong>Performance Analysis:</strong> Evaluate accuracy, resource requirements for fine-tuning, and how it adapts to new proprietary data (e.g., need for re-fine-tuning).<span className="text-cyan-600 font-medium">[1, 3]</span></li>
                  </ol>
                </article>

                <article className="bg-slate-50 p-6 rounded-lg shadow-md border-l-4 border-teal-500">
                  <h3 className="text-xl md:text-2xl font-semibold text-teal-600 mb-3">
                    C. Approach 3: Retrieval Augmented Generation (RAG)
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    <strong>Brief Description:</strong> RAG connects an AI model (typically an LLM) to your proprietary dataset, treating it as an external knowledge base.<span className="text-teal-600 font-medium">[1, 3]</span> When external data is prompted, the system first retrieves relevant information from your proprietary data and then uses this retrieved context to help the AI model assess if the external data &quot;makes sense&quot;.<span className="text-teal-600 font-medium">[1, 4, 5]</span>
                  </p>
                  <h4 className="text-lg font-medium text-slate-700 mt-5 mb-3">High-Level Implementation Steps for Evaluation:</h4>
                  <ol className="list-decimal list-outside pl-5 space-y-2 text-slate-600 leading-relaxed">
                    <li><strong>Knowledge Base Creation:</strong> Process and store your proprietary data in a way that&apos;s efficiently searchable (e.g., a vector database after embedding the data <span className="text-teal-600 font-medium">[6]</span>).</li>
                    <li><strong>Retrieval Mechanism Setup:</strong> Implement a system to query this knowledge base based on the prompted external data.</li>
                    <li><strong>LLM Integration:</strong> Connect a suitable LLM to the retrieval system.</li>
                    <li><strong>Prompting &amp; Validation:</strong> Design prompts that instruct the LLM to use the retrieved proprietary context to validate the external data. Test with sample external data.</li>
                    <li><strong>Performance Analysis:</strong> Evaluate the accuracy of validation, the quality of retrieval, response times, and the ease of updating the knowledge base with new proprietary data.<span className="text-teal-600 font-medium">[1, 3, 4]</span></li>
                  </ol>
                </article>
              </div>
            </section>

            <section aria-labelledby="project-plan-outline">
              <h2 id="project-plan-outline" className="text-2xl md:text-3xl font-semibold font-roboto-slab text-sky-700 mb-5 pb-2 border-b border-sky-200">
                4. Project Plan Outline for Evaluation
              </h2>
              <ul className="space-y-6 text-slate-700 text-base md:text-lg">
                <li>
                  <strong className="font-medium text-slate-800">Phase 1: Setup &amp; Preparation</strong> <em className="text-slate-500">(Duration: [e.g., 1-2 Weeks])</em>
                  <ul className="list-disc list-outside pl-6 mt-2 space-y-1 text-slate-600">
                    <li>Gather and confirm access to all &quot;Required Starting Information.&quot;</li>
                    <li>Define detailed evaluation metrics and success criteria for each approach with business stakeholders.</li>
                    <li>Set up the necessary technical environment for testing.</li>
                  </ul>
                </li>
                <li>
                  <strong className="font-medium text-slate-800">Phase 2: Individual Approach Evaluation</strong> <em className="text-slate-500">(Duration: [e.g., 2-3 Weeks per Approach])</em>
                  <ul className="list-disc list-outside pl-6 mt-2 space-y-3 text-slate-600">
                    <li>
                      Task 2.1: Training Custom Models
                      <ul className="list-circle list-outside pl-6 mt-1 space-y-1 text-sm">
                        <li>Execute implementation steps outlined in 3.A.</li>
                        <li>Document performance, scalability, and maintenance considerations.</li>
                      </ul>
                    </li>
                    <li>
                      Task 2.2: Fine-tuning Pre-trained Models
                      <ul className="list-circle list-outside pl-6 mt-1 space-y-1 text-sm">
                        <li>Execute implementation steps outlined in 3.B.</li>
                        <li>Document performance, scalability, and maintenance considerations.</li>
                      </ul>
                    </li>
                    <li>
                      Task 2.3: Retrieval Augmented Generation (RAG)
                      <ul className="list-circle list-outside pl-6 mt-1 space-y-1 text-sm">
                        <li>Execute implementation steps outlined in 3.C.</li>
                        <li>Document performance, scalability, and maintenance considerations.</li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  <strong className="font-medium text-slate-800">Phase 3: Comparative Analysis &amp; Recommendation</strong> <em className="text-slate-500">(Duration: [e.g., 1 Week])</em>
                  <ul className="list-disc list-outside pl-6 mt-2 space-y-1 text-slate-600">
                    <li>Compare the evaluated approaches against the defined success criteria.</li>
                    <li>Analyze trade-offs (e.g., accuracy, cost, scalability, ease of updating with new proprietary data <span className="text-sky-600 font-medium">[1, 3, 4, 5]</span>).</li>
                    <li>Develop a recommendation for the most suitable approach or a hybrid approach.</li>
                  </ul>
                </li>
              </ul>
            </section>

            <section aria-labelledby="deliverables">
              <h2 id="deliverables" className="text-2xl md:text-3xl font-semibold font-roboto-slab text-sky-700 mb-5 pb-2 border-b border-sky-200">
                5. Deliverables
              </h2>
              <ul className="list-disc list-outside pl-5 space-y-4 text-slate-700 text-base md:text-lg">
                <li>
                  A detailed evaluation report for each of the three AI approaches, including:
                  <ul className="list-circle list-outside pl-6 mt-2 space-y-1 text-slate-600">
                    <li>Methodology used for testing.</li>
                    <li>Performance metrics.</li>
                    <li>Assessment of scalability and adaptability to new proprietary data.</li>
                    <li>Pros and cons in the context of the company&apos;s needs.</li>
                  </ul>
                </li>
                <li>A final recommendation report summarizing the findings and proposing the optimal path forward, including potential next steps for a pilot implementation.</li>
                <li>Working prototypes or proof-of-concepts for each evaluated approach (as feasible within the evaluation scope).</li>
              </ul>
            </section>

            <section aria-labelledby="success-criteria">
              <h2 id="success-criteria" className="text-2xl md:text-3xl font-semibold font-roboto-slab text-sky-700 mb-5 pb-2 border-b border-sky-200">
                6. Success Criteria for Evaluation Project
              </h2>
              <ul className="list-disc list-outside pl-5 space-y-3 text-slate-700 text-base md:text-lg">
                <li>Clear understanding of the performance of each AI approach on the sample data.</li>
                <li>Assessment of how each approach handles the dynamic nature of the proprietary data.</li>
                <li>Actionable recommendation for a preferred AI validation strategy.</li>
              </ul>
            </section>
          </div>

          <footer className="bg-slate-800 text-slate-300 p-6 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} Your Company Name. All Rights Reserved.</p>
            <p>AI Evaluation Statement of Work</p>
          </footer>
        </main>
      </div>
    </>
  );
};

export default AIEvaluationSOW;
