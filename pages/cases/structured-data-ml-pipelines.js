import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { Chart, registerables } from 'chart.js';
import { enUS } from 'date-fns/locale';
import 'chartjs-adapter-date-fns';
import Header from '../../components/Header'; // Adjust path as needed
import Footer from '../../components/Footer'; // Adjust path as needed

// Register Chart.js components
Chart.register(...registerables);

// --- Data (Can be moved to a separate file or fetched from an API) ---
const projectData = {
    teamSize: '4+',
    startDate: '2025-06-16',
    endDate: '2025-08-08',
    tracks: [
        {
            id: 'A',
            title: 'Track A: Text-to-SQL Interface',
            goal: 'Enable users to query the database using plain English.',
            time: '~28-40 Business Days',
            phases: [
                { name: 'A1: Scoping & Design', start: '2025-06-16', end: '2025-06-20', tasks: 'Define SQL complexity, Finalize schema.', resources: 'Project Lead, 1 ML Eng.', details: '<ul class="list-disc pl-5 text-sm space-y-1"><li>Conduct workshops with BI team to identify top 5 most complex but valuable query types.</li><li>Document table relationships, primary/foreign keys, and column data types in a central markdown file.</li><li>Confirm scope will exclude real-time streaming data for V1.</li></ul>' },
                { name: 'A2: Data & Infra Setup', start: '2025-06-23', end: '2025-06-25', tasks: 'Export schema, Setup "teacher" LLM API, Create read-only DB replica.', resources: 'Data Eng., DevOps', details: '<ul class="list-disc pl-5 text-sm space-y-1"><li>Write script to extract CREATE TABLE statements.</li><li>Secure API keys for teacher model and store in AWS Secrets Manager.</li><li>Configure replication for the production database to a new read-only instance.</li></ul>' },
                { name: 'A3: Development', start: '2025-06-26', end: '2025-07-23', tasks: 'Develop synth data pipeline, Generate & validate 1k-2k pairs, Spot-check, Format to JSONL.', resources: '2 ML Eng.', details: '<ul class="list-disc pl-5 text-sm space-y-1"><li>Create a detailed prompt for the teacher model, including the full schema.</li><li>Build a validation script that runs generated SQL against the replica DB and logs errors.</li><li>Manually review at least 15% of successfully executed queries for logical correctness.</li></ul>' },
                { name: 'A4: Model Fine-Tuning', start: '2025-07-24', end: '2025-08-01', tasks: 'Setup NeMo env, Run fine-tuning, Experiment with hyperparameters.', resources: '1 ML Eng., MLOps', details: '<ul class="list-disc pl-5 text-sm space-y-1"><li>Provision p4d.24xlarge instance on AWS.</li><li>Start with a baseline LoRA rank of 16 and adjust based on performance.</li><li>Track experiments using MLflow or a similar tool.</li></ul>' },
                { name: 'A5: Testing & Deploy', start: '2025-08-04', end: '2025-08-08', tasks: 'Develop eval suite, Build simple API/UI, Initial UAT.', resources: 'Project Lead, 1 ML Eng., DevOps', details: '<ul class="list-disc pl-5 text-sm space-y-1"><li>Create a test set of 50 handwritten, high-quality question/SQL pairs not used in training.</li><li>Build a Flask API endpoint that takes a question and returns generated SQL.</li><li>Deploy the API endpoint on an EC2 instance for internal team testing.</li></ul>' },
            ]
        },
        {
            id: 'B',
            title: 'Track B: RAG Q&A System',
            goal: 'Build a Q&A system that provides direct natural language answers.',
            time: '~10-15 Business Days',
            phases: [
                { name: 'B1: Scoping & Design', start: '2025-06-16', end: '2025-06-19', tasks: 'Identify common questions, Design retrieval strategy.', resources: 'Project Lead, 1 ML Eng.', details: '<ul class="list-disc pl-5 text-sm space-y-1"><li>Analyze top 20 business questions from the BI team.</li><li>Design a keyword-to-table/column mapping system.</li><li>Create flowcharts for the retrieval logic.</li></ul>' },
                { name: 'B2: Development', start: '2025-06-20', end: '2025-06-28', tasks: 'Write retrieval logic, Develop data serializer, Create prompt template.', resources: '1 ML Eng., Data Eng.', details: '<ul class="list-disc pl-5 text-sm space-y-1"><li>Implement Python functions to query the database based on keywords.</li><li>Create a function to format SQL results into a clean, readable text block.</li><li>Design a prompt that clearly separates context from the user\'s question.</li></ul>' },
                { name: 'B3: Integration & UI', start: '2025-06-30', end: '2025-07-03', tasks: 'Integrate pipeline with base LLM, Build Streamlit/Flask UI.', resources: '1 ML Eng.', details: '<ul class="list-disc pl-5 text-sm space-y-1"><li>Connect to a hosted Llama 3 API endpoint.</li><li>Develop a simple UI with a text input for questions and a display area for answers.</li><li>Implement error handling for API failures.</li></ul>' },
                { name: 'B4: Testing & Deploy', start: '2025-07-07', end: '2025-07-08', tasks: 'Test with varied questions, Deploy for internal feedback.', resources: 'Project Lead, DevOps', details: '<ul class="list-disc pl-5 text-sm space-y-1"><li>Gather a list of 30 "golden questions" to test the system\'s accuracy.</li><li>Deploy the application using Docker and AWS App Runner.</li><li>Share the link with the BI team for initial user acceptance testing.</li></ul>' },
            ]
        },
        {
            id: 'C',
            title: 'Track C: LLM as Feature Engineer',
            goal: 'Improve a traditional ML model by adding LLM-generated features.',
            time: '~12-18 Business Days',
            phases: [
                { name: 'C1: Scoping & Design', start: '2025-06-16', end: '2025-06-19', tasks: 'Define predictive problem, Identify fields for feature extraction.', resources: 'Project Lead, 1 Data Scientist', details: '<ul class="list-disc pl-5 text-sm space-y-1"><li>Target Variable: "Predictive Maintenance Required in next 7 days (Yes/No)".</li><li>Identify Text Fields: `sensor_name`, `maintenance_logs`.</li><li>Identify Categorical Fields: `location.city`, `sensor_type`.</li></ul>' },
                { name: 'C2: Feature Generation', start: '2025-06-20', end: '2025-06-28', tasks: 'Develop prompts for attribute extraction, Create embeddings, Run over historical data.', resources: '1 ML Eng., Data Eng.', details: '<ul class="list-disc pl-5 text-sm space-y-1"><li>Prompt for feature extraction: "From `sensor_name`, extract `sensor_model` and `installation_area`".</li><li>Use `sentence-transformers/all-MiniLM-L6-v2` for embedding `maintenance_logs`.</li><li>Write a script to apply these transformations and create an enriched Parquet file.</li></ul>' },
                { name: 'C3: Model Development', start: '2025-06-30', end: '2025-07-08', tasks: 'Integrate new features, Train XGBoost model on enriched data.', resources: '1 Data Scientist', details: '<ul class="list-disc pl-5 text-sm space-y-1"><li>Establish an 80/10/10 train/validation/test split.</li><li>Use Optuna for hyperparameter tuning of the XGBoost model.</li><li>Log training runs and artifacts using MLflow.</li></ul>' },
                { name: 'C4: Evaluation', start: '2025-07-09', end: '2025-07-11', tasks: 'Compare model with/without LLM features, Analyze feature importance.', resources: '1 Data Scientist', details: '<ul class="list-disc pl-5 text-sm space-y-1"><li>Generate a classification report (precision, recall, F1-score).</li><li>Use SHAP to explain feature importance and compare against the baseline.</li><li>Prepare a summary report for stakeholders on the value of LLM-generated features.</li></ul>' },
            ]
        },
        {
            id: 'D',
            title: 'Track D: Traditional ML Baseline',
            goal: 'Establish a baseline predictive model using classic ML techniques.',
            time: '~15-22 Business Days',
            phases: [
                { name: 'D1: Scoping & Problem Def.', start: '2025-06-16', end: '2025-06-19', tasks: 'Define predictive problem, Define evaluation metrics.', resources: 'Project Lead, 1 Data Scientist', details: '<ul class="list-disc pl-5 text-sm space-y-1"><li>Finalize target variable and evaluation metrics (same as Track C).</li><li>Confirm data sources and access permissions with the Data Engineering team.</li><li>Establish a project repository and set up a virtual environment.</li></ul>' },
                { name: 'D2: Data Exploration', start: '2025-06-20', end: '2025-06-28', tasks: 'Perform EDA, Handle missing values, Scale features, Create splits.', resources: 'Data Eng., 1 Data Scientist', details: '<ul class="list-disc pl-5 text-sm space-y-1"><li>Generate data distribution plots for all numerical features using Matplotlib/Seaborn.</li><li>Analyze correlation matrix to identify and potentially remove highly correlated features.</li><li>Implement strategy for handling missing values (e.g., mean/median imputation).</li></ul>' },
                { name: 'D3: Model Development', start: '2025-06-30', end: '2025-07-10', tasks: 'Train baseline models, Train advanced model (XGBoost), Tune hyperparameters.', resources: '1 Data Scientist', details: '<ul class="list-disc pl-5 text-sm space-y-1"><li>Train a Logistic Regression model as a simple, interpretable baseline.</li><li>Train an XGBoost model on numerical features only.</li><li>Use GridSearchCV for an exhaustive hyperparameter search.</li></ul>' },
                { name: 'D4: Evaluation & Deploy', start: '2025-07-11', end: '2025-07-17', tasks: 'Evaluate on test set, Document performance, Package model.', resources: 'Data Scientist, MLOps', details: '<ul class="list-disc pl-5 text-sm space-y-1"><li>Generate a confusion matrix and ROC curve for the final model.</li><li>Compare model performance against a simple "always predict majority class" baseline.</li><li>Pickle the final model and pre-processing pipeline for deployment as a batch prediction job.</li></ul>' },
            ]
        }
    ]
};

const trackColors = {
    A: { bg: 'rgba(59, 130, 246, 0.7)', border: 'rgba(37, 99, 235, 1)' }, // blue
    B: { bg: 'rgba(16, 185, 129, 0.7)', border: 'rgba(5, 150, 105, 1)' }, // green
    C: { bg: 'rgba(234, 179, 8, 0.7)', border: 'rgba(202, 138, 4, 1)' }, // yellow
    D: { bg: 'rgba(139, 92, 246, 0.7)', border: 'rgba(124, 58, 237, 1)' }, // violet
};


// --- Sub-components for better organization ---

const PhaseDetailItem = ({ phase }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-slate-200 rounded-lg bg-slate-50 overflow-hidden">
            <div 
                className={`p-4 cursor-pointer hover:bg-slate-100 transition-colors phase-header ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex justify-between items-start">
                    <div>
                        <h4 className="font-bold text-slate-800">{phase.name}</h4>
                        <p className="text-sm text-slate-600 mt-1">{phase.tasks}</p>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                        <p className="text-xs font-semibold text-blue-800 bg-blue-100 px-2 py-1 rounded-full">
                            {new Date(phase.start).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(phase.end).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">{phase.resources}</p>
                    </div>
                </div>
            </div>
            <div className={`details-panel bg-white border-t border-slate-200 ${isOpen ? 'open' : ''}`}>
                 <div dangerouslySetInnerHTML={{ __html: phase.details || '<p class="text-sm text-slate-400">No implementation details available.</p>' }} />
            </div>
        </div>
    );
};


const GanttChart = ({ onTrackSelect }) => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }

            const ctx = chartRef.current.getContext('2d');
            chartInstanceRef.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    datasets: projectData.tracks.map(track => ({
                        label: track.title,
                        data: track.phases.map(phase => ({
                            x: [new Date(phase.start), new Date(phase.end)],
                            y: track.title,
                            name: phase.name
                        })),
                        backgroundColor: trackColors[track.id].bg,
                        borderColor: trackColors[track.id].border,
                        borderWidth: 1,
                        barPercentage: 0.6,
                        categoryPercentage: 0.7
                    }))
                },
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: { callbacks: { title: (c) => c[0].raw.name, label: (c) => `Duration: ${new Date(c.raw.x[0]).toLocaleDateString()} - ${new Date(c.raw.x[1]).toLocaleDateString()}` } }
                    },
                    scales: {
                        x: { 
                            type: 'time', 
                            time: { 
                                unit: 'week',
                                tooltipFormat: 'MMM dd, yyyy'
                            },
                            adapters: {
                                date: {
                                    locale: enUS
                                }
                            },
                            min: projectData.startDate, 
                            max: projectData.endDate, 
                            grid: { color: 'rgba(203, 213, 225, 0.5)' }, 
                            ticks: { font: { size: 10 } } 
                        },
                        y: { 
                            grid: { display: false }, 
                            ticks: { 
                                font: { size: 12 }, 
                                callback: function(value, index, values) { 
                                    const label = this.getLabelForValue(value); 
                                    return label.length > 25 ? label.substring(0, 25) + '...' : label; 
                                } 
                            } 
                        }
                    },
                    onClick: (e, els) => {
                        if (els.length > 0) {
                           const trackId = projectData.tracks[els[0].datasetIndex].id;
                           onTrackSelect(trackId);
                        }
                    }
                }
            });
        }

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
                chartInstanceRef.current = null;
            }
        };
    }, [onTrackSelect]);

    return (
        <div className="chart-container">
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

// --- Main Page Component ---

export default function ProjectDashboardPage() {
    const [selectedTrackId, setSelectedTrackId] = useState(null);
    const detailsRef = useRef(null);

    const handleSelectTrack = (trackId) => {
        setSelectedTrackId(trackId);
        // Scroll to details section after state update
        setTimeout(() => {
            detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

    const selectedTrack = projectData.tracks.find(t => t.id === selectedTrackId);

    return (
        <div className="bg-slate-50 min-h-screen flex flex-col">
            <Head>
                <title>Project Plan Dashboard | ML on Structured Data</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <Header />

            <main className="flex-grow">
                <div className="container mx-auto p-4 sm:p-6 lg:p-8 text-slate-800">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">ML on Structured Data Project</h1>
                        <p className="text-slate-600 mt-2">An interactive dashboard for tracking project progress and timelines.</p>
                    </div>

                    <section id="metrics" className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 text-center">
                            <h3 className="text-sm font-medium text-slate-500">Total Tracks</h3>
                            <p className="text-3xl font-bold text-amber-600">{projectData.tracks.length}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 text-center">
                            <h3 className="text-sm font-medium text-slate-500">Team Size</h3>
                            <p className="text-3xl font-bold text-amber-600">{projectData.teamSize}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 text-center">
                            <h3 className="text-sm font-medium text-slate-500">Start Date</h3>
                            <p className="text-3xl font-bold text-amber-600">{new Date(projectData.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 text-center">
                            <h3 className="text-sm font-medium text-slate-500">Est. Completion</h3>
                            <p className="text-3xl font-bold text-amber-600">{new Date(projectData.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                        </div>
                    </section>

                    <section id="gantt-chart-section" className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-slate-200 mb-8">
                        <h2 className="text-xl font-bold mb-4 text-slate-900">Project Timeline Overview</h2>
                        <GanttChart onTrackSelect={handleSelectTrack} />
                    </section>

                    <section id="track-selection" className="mb-8">
                        <h2 className="text-xl font-bold mb-4 text-slate-900">Explore Project Tracks</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {projectData.tracks.map(track => (
                                <div key={track.id} onClick={() => handleSelectTrack(track.id)} className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 cursor-pointer hover:shadow-lg hover:border-amber-500 transition-all">
                                    <h3 className="font-bold text-slate-800">{track.title}</h3>
                                    <p className="text-sm text-slate-600 mt-1">{track.goal}</p>
                                    <p className="text-xs font-semibold text-amber-700 bg-amber-100 inline-block px-2 py-0.5 rounded-full mt-3">{track.time}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section id="details" ref={detailsRef} className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-slate-200 min-h-[200px]">
                        {!selectedTrack ? (
                            <div className="text-center text-slate-500 py-12">
                                <p className="text-lg">Select a track from the timeline or cards above to see detailed phases and tasks.</p>
                            </div>
                        ) : (
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">{selectedTrack.title}</h2>
                                <p className="text-slate-600 mb-4">{selectedTrack.goal}</p>
                                <p className="font-semibold text-amber-700 bg-amber-100 inline-block px-3 py-1 rounded-full text-sm mb-6">{selectedTrack.time}</p>
                                <div className="space-y-4">
                                    {selectedTrack.phases.map((phase) => (
                                        <PhaseDetailItem key={phase.name} phase={phase} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </section>
                </div>
            </main>
            
            <Footer />

            {/* This style block is for demonstration. In a real Pages Router app,
                you would typically place these styles in globals.css or use a CSS-in-JS solution. */}
            <style jsx global>{`
                body {
                    font-family: 'Inter', sans-serif;
                }
                .chart-container {
                    position: relative;
                    width: 100%;
                    height: 400px;
                    max-height: 50vh;
                }
                .details-panel {
                    max-height: 0;
                    overflow: hidden;
                    transition: max-height 0.5s ease-out, padding 0.5s ease-out;
                    padding: 0 1rem;
                }
                .details-panel.open {
                    max-height: 500px; /* Adjust as needed */
                    padding: 1rem;
                }
                .phase-header::after {
                    content: '▼';
                    float: right;
                    transition: transform 0.3s ease-out;
                    font-size: 0.8em;
                    color: #94a3b8; /* slate-400 */
                }
                .phase-header.open::after {
                    transform: rotate(-180deg);
                }
            `}</style>
        </div>
    );
}
