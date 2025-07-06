// pages/researcher.js
import { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function Researcher() {
  const [prompt, setPrompt]   = useState('');
  const [results, setResults] = useState([]);      // array instead of single result
  const [loading, setLoading] = useState(false);
  const [globalErr, setGlobalErr] = useState('');
  const sessionRef = useRef(null);

  useEffect(() => {
    let sid = localStorage.getItem('sessionId');
    if (!sid) { sid = uuidv4(); localStorage.setItem('sessionId', sid); }
    sessionRef.current = sid;
  }, []);

  async function submitPrompt() {
    setLoading(true); setGlobalErr(''); setResults([]);
    try {
      const r = await fetch('/api/researcher', {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify({ prompt, sessionId: sessionRef.current })
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error);
      setResults(Array.isArray(j.data) ? j.data : [j.data]);
    } catch (e) { setGlobalErr(e.message); }
    setLoading(false);
  }

  async function doWebSearch(idx, doc) {
    const upd = [...results];
    upd[idx]._busy = 'search';
    setResults(upd);

    try {
      const r = await fetch('/api/tavily-search', {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({ doc })
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error);
      upd[idx] = { ...upd[idx], web_results: j.web_results, _query: j.query };
    } catch (e) {
      upd[idx]._err = e.message;
    }
    upd[idx]._busy = null;
    setResults([...upd]);
  }

  async function enrichEntity(idx, doc) {
    const upd = [...results];
    upd[idx]._busy = 'enrich';
    setResults(upd);

    try {
      const r = await fetch('/api/entity-enrich', {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify({ doc, sessionId: sessionRef.current })
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error);

      // Append the returned data under a new key
      upd[idx] = { ...upd[idx], n8n_enriched: j.data, _enriched: true };
    } catch (e) {
      upd[idx]._err = e.message;
    }
    upd[idx]._busy = null;
    setResults([...upd]);
  }
  
  async function saveToMongo(idx) {
    const upd = [...results];
    upd[idx]._busy = 'save';
    setResults(upd);

    // Remove UI keys
    const { _busy, _saved, _err, ...payload } = upd[idx];

    try {
      const r = await fetch('/api/save', {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({ doc: payload })
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error);
      upd[idx]._saved = true;
    } catch (e) {
      upd[idx]._err = e.message;
    }
    upd[idx]._busy = null;
    setResults([...upd]);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Research Assistant</h1>

        {/* Prompt box */}
        <textarea
          className="w-full p-3 border rounded-md resize-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          placeholder="Enter your research prompt…"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <button
          onClick={submitPrompt}
          disabled={loading || !prompt}
          className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 disabled:opacity-50">
          {loading ? 'Processing…' : 'Submit Prompt'}
        </button>

        {globalErr && <p className="mt-4 text-red-500">{globalErr}</p>}

        {/* Results list */}
        {results.length > 0 && (
          <ul className="mt-6 space-y-4">
            {results.map((item, idx) => (
              <li key={idx} className="bg-gray-50 rounded-xl p-4 shadow">
                <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(item, null, 2)}</pre>

                {/* Action buttons */}
                <div className="mt-2 flex gap-3">
                  <button
                    onClick={() => doWebSearch(idx, item)}
                    disabled={item._busy}
                    className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-sm disabled:opacity-50">
                    {item._busy==='search' ? 'Searching…' : '🔎 Do Web Search'}
                  </button>

                  <button
                    onClick={() => enrichEntity(idx, item)}
                    disabled={item._busy || item._enriched}
                    className="px-3 py-1 bg-teal-600 text-white rounded-lg text-sm disabled:opacity-50">
                    {item._busy==='enrich'
                      ? 'Enriching…'
                      : item._enriched
                        ? '✅ Enriched'
                        : '🔄 Enrich via n8n'}
                  </button>

                  <button
                    onClick={() => saveToMongo(idx)}
                    disabled={item._busy || item._saved}
                    className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-sm disabled:opacity-50">
                    {item._saved ? '✅ Saved' : item._busy==='save' ? 'Saving…' : '💾 Save'}
                  </button>
                </div>

                {item._err && <p className="text-red-500 text-xs mt-1">{item._err}</p>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
