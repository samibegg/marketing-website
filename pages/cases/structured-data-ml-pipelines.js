import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { Chart, registerables } from 'chart.js';
import { enUS } from 'date-fns/locale';
import 'chartjs-adapter-date-fns';
import { addDays, differenceInDays } from 'date-fns';
import Header from '../../components/Header'; // Adjust path as needed
import Footer from '../../components/Footer'; // Adjust path as needed

// Register Chart.js components
Chart.register(...registerables);

// --- Base Data with Durations & Explanations ---
const projectDataBase = {
    teamSize: '4+',
    initialStartDate: '2025-06-16',
    tracks: [
        {
            id: 'A',
            title: 'Track A: Text-to-SQL Interface',
            goal: 'Enable users to query the database using plain English.',
            time: '~28-40 Business Days',
            approachExplanation: `
                <h3 class="font-bold text-lg mb-2">Approach: LLM as a Natural Language Interface</h3>
                <p class="mb-4 text-sm text-slate-600">This approach fine-tunes the LLM to act as an expert translator, converting a user's question in plain English into a precise, executable SQL query specific to our database schema.</p>
                <div class="space-y-3">
                    <div>
                        <h4 class="font-semibold">How it Works:</h4>
                        <p class="text-sm">We teach the model the relationship between natural language questions and the structure of our tables and columns. It learns to generate SQL that joins tables, filters data, and performs calculations correctly.</p>
                    </div>
                    <div>
                        <h4 class="font-semibold">Pipeline:</h4>
                        <ol class="list-decimal list-inside text-sm space-y-1">
                            <li>Generate a synthetic dataset of (Question, SQL Query) pairs.</li>
                            <li>Fine-tune the LLM on this dataset using NeMo and LoRA.</li>
                            <li>At inference, the model receives a new question and outputs a ready-to-execute SQL query.</li>
                            <li>The application runs the query and displays the raw data results.</li>
                        </ol>
                    </div>
                    <div>
                        <h4 class="font-semibold">When to Use:</h4>
                        <p class="text-sm">Ideal for creating powerful data analysis tools for users (like data analysts) who need to perform deep, precise, and varied queries but may not be SQL experts. The primary output is the data itself.</p>
                    </div>
                </div>
            `,
            phases: [
                { name: 'A1: Scoping & Design', startOffset: 0, duration: 4, tasks: 'Define SQL complexity, Finalize schema.', resources: 'Project Lead, 1 ML Eng.', details: '<ul class="list-disc pl-5 text-sm space-y-1"><li>Conduct workshops with BI team to identify top 5 most complex but valuable query types.</li><li>Document table relationships, primary/foreign keys, and column data types in a central markdown file.</li><li>Confirm scope will exclude real-time streaming data for V1.</li></ul>' },
                { name: 'A2: Data & Infra Setup', startOffset: 5, duration: 2, tasks: 'Export schema, Setup "teacher" LLM API, Create read-only DB replica.', resources: 'Data Eng., DevOps', details: '<ul class="list-disc pl-5 text-sm space-y-1"><li>Write script to extract CREATE TABLE statements.</li><li>Secure API keys for teacher model and store in AWS Secrets Manager.</li><li>Configure replication for the production database to a new read-only instance.</li></ul>' },
                { name: 'A3: Development', startOffset: 8, duration: 19, tasks: 'Develop synth data pipeline, Generate & validate 1k-2k pairs, Spot-check, Format to JSONL.', resources: '2 ML Eng.', details: '<ul class="list-disc pl-5 text-sm space-y-1"><li>Create a detailed prompt for the teacher model, including the full schema.</li><li>Build a validation script that runs generated SQL against the replica DB and logs errors.</li><li>Manually review at least 15% of successfully executed queries for logical correctness.</li></ul>' },
                { name: 'A4: Model Fine-Tuning', startOffset: 28, duration: 6, tasks: 'Setup NeMo env, Run fine-tuning, Experiment with hyperparameters.', resources: '1 ML Eng., MLOps', details: '<ul class="list-disc pl-5 text-sm space-y-1"><li>Provision p4d.24xlarge instance on AWS.</li><li>Start with a baseline LoRA rank of 16 and adjust based on performance.</li><li>Track experiments using MLflow or a similar tool.</li></ul>' },
                { name: 'A5: Testing & Deploy', startOffset: 35, duration: 4, tasks: 'Develop eval suite, Build simple API/UI, Initial UAT.', resources: 'Project Lead, 1 ML Eng., DevOps', details: '<ul class="list-disc pl-5 text-sm space-y-1"><li>Create a test set of 50 handwritten, high-quality question/SQL pairs not used in training.</li><li>Build a Flask API endpoint that takes a question and returns generated SQL.</li><li>Deploy the API endpoint on an EC2 instance for internal team testing.</li></ul>' },
            ]
        },
        {
            id: 'B',
            title: 'Track B: RAG Q&A System',
            goal: 'Build a Q&A system that provides direct natural language answers.',
            time: '~10-15 Business Days',
            approachExplanation: `
                <h3 class="font-bold text-lg mb-2">Approach: LLM as a Reasoner (RAG)</h3>
                <p class="mb-4 text-sm text-slate-600">This approach, known as Retrieval-Augmented Generation (RAG), uses the LLM to synthesize natural language answers based on data retrieved from the database. It doesn't require fine-tuning.</p>
                <div class="space-y-3">
                    <div>
                        <h4 class="font-semibold">How it Works:</h4>
                        <p class="text-sm">Instead of asking the LLM to write a query, the application first fetches relevant data using a simple, predefined query. This data is then provided to the LLM as context to answer the user's original question.</p>
                    </div>
                    <div>
                        <h4 class="font-semibold">Pipeline:</h4>
                        <ol class="list-decimal list-inside text-sm space-y-1">
                            <li>User asks a question.</li>
                            <li>Application runs a simple, hard-coded SQL query to retrieve relevant data.</li>
                            <li>The retrieved data is formatted into a text-based context.</li>
                            <li>The context and original question are sent to a base LLM.</li>
                            <li>The LLM generates a direct, natural language answer.</li>
                        </ol>
                    </div>
                    <div>
                        <h4 class="font-semibold">When to Use:</h4>
                        <p class="text-sm">Perfect for building Q&A systems or chatbots for a general audience that needs direct, easy-to-understand answers, not raw data. It's often much faster to implement than fine-tuning.</p>
                    </div>
                </div>
            `,
            phases: [
                { name: 'B1: Scoping & Design', startOffset: 0, duration: 3, tasks: 'Identify common questions, Design retrieval strategy.', resources: 'Project Lead, 1 ML Eng.', details: '<ul class="list-disc pl-5 text-sm space-y-1"><li>Analyze top 20 business questions from the BI team.</li><li>Design a keyword-to-table/column mapping system.</li><li>Create flowcharts for the retrieval logic.</li></ul>' },
                { name: 'B2: Development', startOffset: 4, duration: 6, tasks: 'Write retrieval logic, Develop data serializer, Create prompt template.', resources: '1 ML Eng., Data Eng.', details: '<ul class="list-disc pl-5 text-sm space-y-1"><li>Implement Python functions to query the database based on keywords.</li><li>Create a function to format SQL results into a clean, readable text block.</li><li>Design a prompt that clearly separates context from the user\'s question.</li></ul>' },
                { name: 'B3: Integration & UI', startOffset: 11, duration: 3, tasks: 'Integrate pipeline with base LLM, Build Streamlit/Flask UI.', resources: '1 ML Eng.', details: '<ul class="list-disc pl-5 text-sm space-y-1"><li>Connect to a hosted Llama 3 API endpoint.</li><li>Develop a simple UI with a text input for questions and a display area for answers.</li><li>Implement error handling for API failures.</li></ul>' },
                { name: 'B4: Testing & Deploy', startOffset: 15, duration: 1, tasks: 'Test with varied questions, Deploy for internal feedback.', resources: 'Project Lead, DevOps', details: '<ul class="list-disc pl-5 text-sm space-y-1"><li>Gather a list of 30 "golden questions" to test the system\'s accuracy.</li><li>Deploy the application using Docker and AWS App Runner.</li><li>Share the link with the BI team for initial user acceptance testing.</li></ul>' },
            ]
        },
        {
            id: 'C',
            title: 'Track C: LLM as Feature Engineer',
            goal: 'Improve a traditional ML model by adding LLM-generated features.',
            time: '~12-18 Business Days',
            approachExplanation: `
                <h3 class="font-bold text-lg mb-2">Approach: LLM as a Feature Engineer</h3>
                <p class="mb-4 text-sm text-slate-600">This hybrid approach uses the LLM as a sophisticated pre-processing tool to create new, meaningful features from raw data, which are then used to train a traditional ML model.</p>
                <div class="space-y-3">
                    <div>
                        <h4 class="font-semibold">How it Works:</h4>
                        <p class="text-sm">The LLM's semantic understanding is used to enrich the dataset. It can extract structured information from text (e.g., pulling a model number from a sensor name) or create numerical representations (embeddings) of text fields.</p>
                    </div>
                    <div>
                        <h4 class="font-semibold">Pipeline:</h4>
                        <ol class="list-decimal list-inside text-sm space-y-1">
                            <li>Identify descriptive text or categorical columns in the database.</li>
                            <li>Use an LLM (via API) to generate new feature columns based on this data.</li>
                            <li>Combine these new features with the original numerical data.</li>
                            <li>Train a classical ML model (like XGBoost) on the enriched dataset.</li>
                        </ol>
                    </div>
                    <div>
                        <h4 class="font-semibold">When to Use:</h4>
                        <p class="text-sm">When you have a classic predictive problem (e.g., forecasting, classification) and believe that text fields contain valuable information that a purely numerical model would miss. It boosts the performance of traditional ML.</p>
                    </div>
                </div>
            `,
            phases: [
                { name: 'C1: Scoping & Design', startOffset: 0, duration: 3, tasks: 'Define predictive problem, Identify fields for feature extraction.', resources: 'Project Lead, 1 Data Scientist', details: '<ul class="list-disc pl-5 text-sm space-y-1"><li>Target Variable: "Predictive Maintenance Required in next 7 days (Yes/No)".</li><li>Identify Text Fields: `sensor_name`, `maintenance_logs`.</li><li>Identify Categorical Fields: `location.city`, `sensor_type`.</li></ul>' },
                { name: 'C2: Feature Generation', startOffset: 4, duration: 6, tasks: 'Develop prompts for attribute extraction, Create embeddings, Run over historical data.', resources: '1 ML Eng., Data Eng.', details: '<ul class="list-disc pl-5 text-sm space-y-1"><li>Prompt for feature extraction: "From `sensor_name`, extract `sensor_model` and `installation_area`".</li><li>Use `sentence-transformers/all-MiniLM-L6-v2` for embedding `maintenance_logs`.</li><li>Write a script to apply these transformations and create an enriched Parquet file.</li></ul>' },
                { name: 'C3: Model Development', startOffset: 11, duration: 7, tasks: 'Integrate new features, Train XGBoost model on enriched data.', resources: '1 Data Scientist', details: '<ul class="list-disc pl-5 text-sm space-y-1"><li>Establish an 80/10/10 train/validation/test split.</li><li>Use Optuna for hyperparameter tuning of the XGBoost model.</li><li>Log training runs and artifacts using MLflow.</li></ul>' },
                { name: 'C4: Evaluation', startOffset: 19, duration: 2, tasks: 'Compare model with/without LLM features, Analyze feature importance.', resources: '1 Data Scientist', details: '<ul class="list-disc pl-5 text-sm space-y-1"><li>Generate a classification report (precision, recall, F1-score).</li><li>Use SHAP to explain feature importance and compare against the baseline.</li><li>Prepare a summary report for stakeholders on the value of LLM-generated features.</li></ul>' },
            ]
        },
        {
            id: 'D',
            title: 'Track D: Traditional ML Baseline',
            goal: 'Establish a baseline predictive model using classic ML techniques.',
            time: '~15-22 Business Days',
            approachExplanation: `
                <h3 class="font-bold text-lg mb-2">Approach: Traditional Machine Learning</h3>
                <p class="mb-4 text-sm text-slate-600">This is the classic, battle-tested approach for making predictions on structured, tabular data. It does not involve an LLM in the main prediction pipeline and serves as a critical performance baseline.</p>
                <div class="space-y-3">
                    <div>
                        <h4 class="font-semibold">How it Works:</h4>
                        <p class="text-sm">We use algorithms specifically designed for numerical and categorical data, such as Gradient Boosted Trees (XGBoost) or Random Forests, to learn patterns and make predictions.</p>
                    </div>
                    <div>
                        <h4 class="font-semibold">Pipeline:</h4>
                        <ol class="list-decimal list-inside text-sm space-y-1">
                            <li>Perform Exploratory Data Analysis (EDA).</li>
                            <li>Conduct rigorous data pre-processing (handling missing values, scaling, encoding).</li>
                            <li>Train a predictive model (e.g., XGBoost) on the cleaned data.</li>
                            <li>Evaluate the model using statistical metrics (F1-score, accuracy, etc.).</li>
                        </ol>
                    </div>
                    <div>
                        <h4 class="font-semibold">When to Use:</h4>
                        <p class="text-sm">This is the go-to approach for purely predictive, numerical tasks like forecasting future values, classifying outcomes, or detecting anomalies. It is often more accurate, faster, and more computationally efficient than LLMs for these specific problems.</p>
                    </div>
                </div>
            `,
            phases: [
                { name: 'D1: Scoping & Problem Def.', startOffset: 0, duration: 3, tasks: 'Define predictive problem, Define evaluation metrics.', resources: 'Project Lead, 1 Data Scientist', details: '<ul class="list-disc pl-5 text-sm space-y-1"><li>Finalize target variable and evaluation metrics (same as Track C).</li><li>Confirm data sources and access permissions with the Data Engineering team.</li><li>Establish a project repository and set up a virtual environment.</li></ul>' },
                { name: 'D2: Data Exploration', startOffset: 4, duration: 6, tasks: 'Perform EDA, Handle missing values, Scale features, Create splits.', resources: 'Data Eng., 1 Data Scientist', details: '<ul class="list-disc pl-5 text-sm space-y-1"><li>Generate data distribution plots for all numerical features using Matplotlib/Seaborn.</li><li>Analyze correlation matrix to identify and potentially remove highly correlated features.</li><li>Implement strategy for handling missing values (e.g., mean/median imputation).</li></ul>' },
                { name: 'D3: Model Development', startOffset: 11, duration: 8, tasks: 'Train baseline models, Train advanced model (XGBoost), Tune hyperparameters.', resources: '1 Data Scientist', details: '<ul class="list-disc pl-5 text-sm space-y-1"><li>Train a Logistic Regression model as a simple, interpretable baseline.</li><li>Train an XGBoost model on numerical features only.</li><li>Use GridSearchCV for an exhaustive hyperparameter search.</li></ul>' },
                { name: 'D4: Evaluation & Deploy', startOffset: 20, duration: 4, tasks: 'Evaluate on test set, Document performance, Package model.', resources: 'Data Scientist, MLOps', details: '<ul class="list-disc pl-5 text-sm space-y-1"><li>Generate a confusion matrix and ROC curve for the final model.</li><li>Compare model performance against a simple "always predict majority class" baseline.</li><li>Pickle the final model and pre-processing pipeline for deployment as a batch prediction job.</li></ul>' },
            ]
        }
    ]
};

const trackColors = {
    A: { bg: 'rgba(59, 130, 246, 0.7)', border: 'rgba(37, 99, 235, 1)' },
    B: { bg: 'rgba(16, 185, 129, 0.7)', border: 'rgba(5, 150, 105, 1)' },
    C: { bg: 'rgba(234, 179, 8, 0.7)', border: 'rgba(202, 138, 4, 1)' },
    D: { bg: 'rgba(139, 92, 246, 0.7)', border: 'rgba(124, 58, 237, 1)' },
};

// --- Helper Function to calculate dates ---
const generateProjectData = (baseData, startDate) => {
    let maxEndDate = new Date(startDate);
    const newTracks = baseData.tracks.map(track => {
        const newPhases = track.phases.map(phase => {
            const phaseStartDate = addDays(new Date(startDate), phase.startOffset);
            const phaseEndDate = addDays(phaseStartDate, phase.duration);
            if (phaseEndDate > maxEndDate) {
                maxEndDate = phaseEndDate;
            }
            return {
                ...phase,
                start: phaseStartDate.toISOString().split('T')[0],
                end: phaseEndDate.toISOString().split('T')[0],
            };
        });
        return { ...track, phases: newPhases };
    });

    return {
        ...baseData,
        startDate: new Date(startDate).toISOString().split('T')[0],
        endDate: maxEndDate.toISOString().split('T')[0],
        tracks: newTracks,
    };
};

const PhaseDetailItem = ({ phase }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border border-slate-200 rounded-lg bg-slate-50 overflow-hidden">
            <div className={`p-4 cursor-pointer hover:bg-slate-100 transition-colors phase-header ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
                <div className="flex justify-between items-start">
                    <div>
                        <h4 className="font-bold text-slate-800">{phase.name}</h4>
                        <p className="text-sm text-slate-600 mt-1">{phase.tasks}</p>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                        <p className="text-xs font-semibold text-blue-800 bg-blue-100 px-2 py-1 rounded-full">{new Date(phase.start).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(phase.end).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
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

const GanttChart = ({ projectData, onTrackSelect }) => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        if (chartRef.current && projectData) {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
            const ctx = chartRef.current.getContext('2d');
            chartInstanceRef.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    datasets: projectData.tracks.map(track => ({
                        label: track.title,
                        data: track.phases.map(phase => ({ x: [new Date(phase.start), new Date(phase.end)], y: track.title, name: phase.name })),
                        backgroundColor: trackColors[track.id].bg,
                        borderColor: trackColors[track.id].border,
                        borderWidth: 1, barPercentage: 0.6, categoryPercentage: 0.7
                    }))
                },
                options: {
                    indexAxis: 'y', responsive: true, maintainAspectRatio: false,
                    plugins: { legend: { display: false }, tooltip: { callbacks: { title: (c) => c[0].raw.name, label: (c) => `Duration: ${new Date(c.raw.x[0]).toLocaleDateString()} - ${new Date(c.raw.x[1]).toLocaleDateString()}` } } },
                    scales: {
                        x: { type: 'time', time: { unit: 'week', tooltipFormat: 'MMM dd, yyyy' }, adapters: { date: { locale: enUS } }, min: projectData.startDate, max: projectData.endDate, grid: { color: 'rgba(203, 213, 225, 0.5)' }, ticks: { font: { size: 10 } } },
                        y: { grid: { display: false }, ticks: { font: { size: 12 }, callback: function(value) { const label = this.getLabelForValue(value); return label.length > 25 ? label.substring(0, 25) + '...' : label; } } }
                    },
                    onClick: (e, els) => { if (els.length > 0) { onTrackSelect(projectData.tracks[els[0].datasetIndex].id); } }
                }
            });
        }
        return () => { if (chartInstanceRef.current) { chartInstanceRef.current.destroy(); chartInstanceRef.current = null; } };
    }, [projectData, onTrackSelect]);

    return (<div className="chart-container"><canvas ref={chartRef}></canvas></div>);
};

const ExplanationModal = ({ track, onClose }) => {
    if (!track) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full p-6 sm:p-8 relative" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 text-2xl">&times;</button>
                <div dangerouslySetInnerHTML={{ __html: track.approachExplanation }} />
            </div>
        </div>
    );
};

export default function ProjectDashboardPage() {
    const [dynamicProjectData, setDynamicProjectData] = useState(() => generateProjectData(projectDataBase, projectDataBase.initialStartDate));
    const [selectedTrackId, setSelectedTrackId] = useState(null);
    const [explanationTrack, setExplanationTrack] = useState(null);
    const detailsRef = useRef(null);

    const handleStartDateChange = (e) => {
        const newStartDate = e.target.value;
        if (newStartDate) {
            setDynamicProjectData(generateProjectData(projectDataBase, newStartDate));
        }
    };

    const handleSelectTrack = (trackId) => {
        setSelectedTrackId(trackId);
        setTimeout(() => { detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 100);
    };
    
    const handleShowExplanation = (e, trackId) => {
        e.stopPropagation();
        const track = dynamicProjectData.tracks.find(t => t.id === trackId);
        setExplanationTrack(track);
    };

    const selectedTrack = dynamicProjectData.tracks.find(t => t.id === selectedTrackId);

    return (
        <div className="bg-slate-50 min-h-screen flex flex-col">
            {/* <Head>
                <title>Project Plan Dashboard | ML on Structured Data</title>
                <link rel="icon" href="/favicon.ico" />
            </Head> */}
            <Header />
            <main className="flex-grow">
                <div className="container mx-auto p-4 sm:p-6 lg:p-8 text-slate-800">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">AI for Structured Data</h1>
                        <p className="text-slate-600 mt-2">Dashboard: Implementing multiple tracks of ML pipelines for structured data.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 items-center bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                        <section id="metrics" className="grid grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-sm font-medium text-slate-500">Total Tracks</h3>
                                <p className="text-2xl font-bold text-amber-600">{dynamicProjectData.tracks.length}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-slate-500">Team Size</h3>
                                <p className="text-2xl font-bold text-amber-600">{dynamicProjectData.teamSize}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-slate-500">Est. Completion</h3>
                                <p className="text-2xl font-bold text-amber-600">{new Date(dynamicProjectData.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                            </div>
                        </section>
                        <div className="flex flex-col items-start md:items-end">
                            <label htmlFor="start-date-picker" className="text-sm font-medium text-slate-500 mb-1">Project Start Date</label>
                            <input
                                type="date"
                                id="start-date-picker"
                                value={dynamicProjectData.startDate}
                                onChange={handleStartDateChange}
                                className="bg-white p-2 rounded-lg border border-slate-300 shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                            />
                        </div>
                    </div>

                    <section id="gantt-chart-section" className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-slate-200 mb-8">
                        <h2 className="text-xl font-bold mb-4 text-slate-900">Project Timeline Overview</h2>
                        <GanttChart projectData={dynamicProjectData} onTrackSelect={handleSelectTrack} />
                    </section>

                    <section id="track-selection" className="mb-8">
                        <h2 className="text-xl font-bold mb-4 text-slate-900">Explore Project Tracks</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {dynamicProjectData.tracks.map(track => (
                                <div key={track.id} onClick={() => handleSelectTrack(track.id)} className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 cursor-pointer hover:shadow-lg hover:border-amber-500 transition-all relative">
                                    <h3 className="font-bold text-slate-800 pr-8">{track.title}</h3>
                                    <p className="text-sm text-slate-600 mt-1">{track.goal}</p>
                                    <p className="text-xs font-semibold text-amber-700 bg-amber-100 inline-block px-2 py-0.5 rounded-full mt-3">{track.time}</p>
                                    <button onClick={(e) => handleShowExplanation(e, track.id)} className="absolute top-3 right-3 w-6 h-6 bg-slate-100 text-slate-500 hover:bg-amber-100 hover:text-amber-700 rounded-full flex items-center justify-center font-bold text-sm transition-colors" aria-label="Show details">i</button>
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
                                    {selectedTrack.phases.map((phase) => (<PhaseDetailItem key={phase.name} phase={phase} />))}
                                </div>
                            </div>
                        )}
                    </section>
                </div>
            </main>
            <Footer />
            <ExplanationModal track={explanationTrack} onClose={() => setExplanationTrack(null)} />
            <style jsx global>{`
                body { font-family: 'Inter', sans-serif; }
                .chart-container { position: relative; width: 100%; height: 400px; max-height: 50vh; }
                .details-panel { max-height: 0; overflow: hidden; transition: max-height 0.5s ease-out, padding 0.5s ease-out; padding: 0 1rem; }
                .details-panel.open { max-height: 500px; padding: 1rem; }
                .phase-header::after { content: '▼'; float: right; transition: transform 0.3s ease-out; font-size: 0.8em; color: #94a3b8; }
                .phase-header.open::after { transform: rotate(-180deg); }
            `}</style>
        </div>
    );
}