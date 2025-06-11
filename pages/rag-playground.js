// pages/rag-playground.js
import { useState } from 'react';
import Head from 'next/head';

// Helper Component Definitions (Should be outside the main component)
const InputGroup = ({ label, children }) => (
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    {children}
  </div>
);

const Select = ({ value, onChange, options, disabled }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    disabled={disabled}
    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md disabled:bg-gray-100"
  >
    {options.map(opt => <option key={opt.id} value={opt.id}>{opt.name}</option>)}
  </select>
);

// Mock data for dropdowns
const embeddingModels = [
  { id: 'sentence-transformers/all-MiniLM-L6-v2', name: 'all-MiniLM-L6-v2 (Sentence Transformer)' },
  { id: 'sentence-transformers/msmarco-distilbert-base-tas-b', name: 'msmarco-distilbert-base-tas-b (Sentence Transformer)' },
  // OpenAI embeddings would require separate handling in backend if chosen,
  // or the backend would need to support OpenAI embedding model IDs directly.
  // { id: 'openai/text-embedding-ada-002', name: 'text-embedding-ada-002 (OpenAI)' },
];

const vectorDBs = [ { id: 'faiss-inmemory', name: 'FAISS (In-Memory)' } ]; // This is mainly conceptual as backend handles it

const llmModels = [
  { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo (OpenAI)' },
  { id: 'gpt-4', name: 'GPT-4 (OpenAI)' },
  { id: 'huggingfaceh4/zephyr-7b-beta', name: 'Zephyr-7B-beta (Hugging Face)' },
  { id: 'mistralai/Mistral-7B-Instruct-v0.2', name: 'Mistral-7B-Instruct (Hugging Face)'},
];

const PYTHON_BACKEND_URL = process.env.NEXT_PUBLIC_PYTHON_BACKEND_URL;

export default function RagPlaygroundPage() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [selectedEmbeddingModel, setSelectedEmbeddingModel] = useState(embeddingModels[0].id);
  // const [selectedVectorDB, setSelectedVectorDB] = useState(vectorDBs[0].id); // Not actively used by frontend if backend handles DB choice
  const [selectedLLM, setSelectedLLM] = useState(llmModels[0].id);
  const [prompt, setPrompt] = useState('');
  
  const [ragResult, setRagResult] = useState('');
  const [originalLlmResult, setOriginalLlmResult] = useState('');
  const [ragResultSource, setRagResultSource] = useState('');
  const [originalLlmResultSource, setOriginalLlmResultSource] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [vectorStoreSessionId, setVectorStoreSessionId] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.type === 'text/plain' || selectedFile.name.endsWith('.txt') || selectedFile.name.endsWith('.json')) {
        setFile(selectedFile);
        setFileName(selectedFile.name);
        setError('');
        setVectorStoreSessionId(null); 
        setRagResult(''); 
        setOriginalLlmResult(''); 
        setRagResultSource('');
        setOriginalLlmResultSource('');
      } else {
        setError('Please upload a .txt or .json files only.');
        setFile(null);
        setFileName('');
      }
    }
  };

  const handleUploadAndVectorize = async () => {
    if (!PYTHON_BACKEND_URL) {
        setError("Backend URL is not configured. Please check environment variables (NEXT_PUBLIC_PYTHON_BACKEND_URL).");
        console.error("PYTHON_BACKEND_URL is not set.");
        return;
    }
    if (!file) {
      setError('Please select a file first.');
      return;
    }
    setIsLoading(true);
    setError('');
    setRagResult(''); 
    setOriginalLlmResult(''); 
    setVectorStoreSessionId(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('embedding_model', selectedEmbeddingModel);

    try {
      console.log(`Uploading to: ${PYTHON_BACKEND_URL}/setup-rag/`);
      const response = await fetch(`${PYTHON_BACKEND_URL}/setup-rag/`, {
        method: 'POST',
        body: formData,
        // 'Content-Type' for FormData is set by the browser
      });

      const data = await response.json(); // Always try to parse JSON

      if (!response.ok) {
        // Use 'detail' if available (FastAPI standard), then 'error', then generic message
        throw new Error(data.detail || data.error || `Error ${response.status}: ${response.statusText}`);
      }

      setVectorStoreSessionId(data.session_id); 
      alert(`File "${fileName}" processed! Session ID: ${data.session_id}. Chunks: ${data.num_chunks}`);

    } catch (err) {
      console.error("Vectorization error:", err);
      setError(`Vectorization failed: ${err.message}`);
      setVectorStoreSessionId(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuery = async () => {
    if (!PYTHON_BACKEND_URL) {
        setError("Backend URL is not configured. Please check environment variables (NEXT_PUBLIC_PYTHON_BACKEND_URL).");
        console.error("PYTHON_BACKEND_URL is not set.");
        return;
    }
    if (!prompt.trim()) {
      setError('Please enter a prompt.');
      return;
    }
     if (!selectedLLM) {
      setError('Please select an LLM.');
      return;
    }

    setIsLoading(true);
    setError('');
    setRagResult(''); 
    setOriginalLlmResult(''); 
    setRagResultSource('');
    setOriginalLlmResultSource('');

    try {
      // --- Fetch RAG Result (if dataset is processed) ---
      if (vectorStoreSessionId) {
        console.log(`Querying RAG: ${PYTHON_BACKEND_URL}/query-rag/`);
        const ragResponse = await fetch(`${PYTHON_BACKEND_URL}/query-rag/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: prompt,
            llm_model: selectedLLM,
            embedding_model: selectedEmbeddingModel, 
            session_id: vectorStoreSessionId,
            use_rag: true, 
          }),
        });
        const ragData = await ragResponse.json();
        if (!ragResponse.ok) {
          setError(prevError => prevError ? `${prevError}\nRAG Query Error: ${ragData.detail || ragData.error || ragResponse.statusText}` : `RAG Query Error: ${ragData.detail || ragData.error || ragResponse.statusText}`);
        } else {
          setRagResult(ragData.result);
          setRagResultSource(ragData.source);
        }
      } else {
        console.log("Skipping RAG result as no dataset is vectorized.");
        setRagResult("N/A - Upload and vectorize a dataset to enable RAG.");
        setRagResultSource("skipped");
      }

      // --- Fetch Original LLM Result (Non-RAG) ---
      console.log(`Querying Original LLM: ${PYTHON_BACKEND_URL}/query-rag/`);
      const originalLlmResponse = await fetch(`${PYTHON_BACKEND_URL}/query-rag/`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt,
          llm_model: selectedLLM,
          use_rag: false, 
        }),
      });
      const originalLlmData = await originalLlmResponse.json();
      if (!originalLlmResponse.ok) {
         setError(prevError => prevError ? `${prevError}\nOriginal LLM Query Error: ${originalLlmData.detail || originalLlmData.error || originalLlmResponse.statusText}` : `Original LLM Query Error: ${originalLlmData.detail || originalLlmData.error || originalLlmResponse.statusText}`);
      } else {
        setOriginalLlmResult(originalLlmData.result);
        setOriginalLlmResultSource(originalLlmData.source);
      }
    } catch (err) { 
      console.error("Query processing error (Network/Fetch or JSON parsing):", err);
      setError(prevError => prevError ? `${prevError}\nNetwork/Fetch Error: ${err.message}` : `Network/Fetch Error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <Head>
        <title>RAG Playground (Decoupled Backend)</title>
        <meta name="description" content="RAG with separate Python backend" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full max-w-3xl space-y-8">
        <div>
          <h1 className="text-center text-4xl font-extrabold text-gray-900">
            RAG Playground
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            Using a Decoupled Python AI Backend.
          </p>
           {PYTHON_BACKEND_URL ? (
            <p className="mt-1 text-center text-xs text-gray-500">
              Backend: <code className="bg-gray-200 p-1 rounded">{PYTHON_BACKEND_URL}</code>
            </p>
          ) : (
            <p className="mt-1 text-center text-xs text-red-500 font-semibold">
              Backend URL (NEXT_PUBLIC_PYTHON_BACKEND_URL) is not configured!
            </p>
          )}
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative whitespace-pre-line" role="alert">
            <strong className="font-bold">Error(s): </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Step 1: Dataset & Vectorization */}
        <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">1. Dataset & Vectorization (for RAG)</h2>
          <InputGroup label="Upload your custom dataset (.txt or .json files)">
            <input
              type="file"
              onChange={handleFileChange}
              accept=".txt,.json"
              multiple
              disabled={isLoading}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 disabled:opacity-50"
            />
            {fileName && <p className="mt-2 text-xs text-gray-500">Selected: {fileName}</p>}
          </InputGroup>

          <InputGroup label="Choose Embedding Model (for RAG)">
            <Select value={selectedEmbeddingModel} onChange={setSelectedEmbeddingModel} options={embeddingModels} disabled={isLoading} />
          </InputGroup>

          <button
            onClick={handleUploadAndVectorize}
            disabled={isLoading || !file || !PYTHON_BACKEND_URL}
            className="w-full mt-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading && vectorStoreSessionId === null ? 'Processing...' : 'Upload & Vectorize Dataset'}
          </button>
          {vectorStoreSessionId && !isLoading && (
            <p className="mt-3 text-sm text-green-600 bg-green-50 p-3 rounded-md">
              Dataset processed for RAG! Session ID: <strong>{vectorStoreSessionId}</strong>.
            </p>
          )}
        </div>

        {/* Step 2: Querying */}
        <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">2. Query LLM</h2>
          <InputGroup label="Choose LLM">
            <Select value={selectedLLM} onChange={setSelectedLLM} options={llmModels} disabled={isLoading} />
          </InputGroup>

          <InputGroup label="Enter your prompt">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows="4"
              disabled={isLoading}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2 disabled:bg-gray-100"
              placeholder="Ask a question..."
            />
          </InputGroup>

          <button
            onClick={handleQuery}
            disabled={isLoading || !prompt.trim() || !selectedLLM || !PYTHON_BACKEND_URL} 
            className="w-full mt-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading && (ragResult === '' && originalLlmResult === '') ? 'Thinking...' : 'Get Answers (RAG & Original)'}
          </button>
        </div>

        {/* Step 3: Results */}
        {(!isLoading && (ragResult || originalLlmResult)) && ( 
          <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">3. Results Comparison</h2>
            
            {ragResult && (
              <div>
                <h3 className="text-lg font-semibold text-indigo-700 mb-2">RAG Augmented Result <span className="text-xs text-gray-500">({ragResultSource})</span>:</h3>
                <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none p-3 bg-indigo-50 rounded-md whitespace-pre-wrap">
                  {ragResult}
                </div>
              </div>
            )}
            
            {originalLlmResult && (
               <div>
                <h3 className="text-lg font-semibold text-teal-700 mb-2">Original LLM Result <span className="text-xs text-gray-500">({originalLlmResultSource})</span>:</h3>
                <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none p-3 bg-teal-50 rounded-md whitespace-pre-wrap">
                  {originalLlmResult}
                </div>
              </div>
            )}
          </div>
        )}
         {isLoading && (ragResult === '' && originalLlmResult === '') && ( 
          <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 text-center">
            <div className="animate-pulse text-gray-600">Fetching responses... please wait.</div>
          </div>
        )}
      </main>
      <footer className="text-center text-gray-500 mt-12 text-sm">
        RAG Playground. Frontend: Next.js. Backend: Python (FastAPI).
      </footer>
    </div>
  );
}

