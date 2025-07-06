// pages/api/researcher.js
import { randomUUID } from 'crypto';

export const maxDuration = 300;          // ⬅️  allow up to 5‑min on Vercel
// (If you self‑host with `next start`, keep it; Node will just ignore it.)

export default async function handler(req, res) {
  // ❶   Increase Node’s socket timeout as a second line of defence
  res.setTimeout(1000 * 240);            // 4‑minutes

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { prompt, sessionId: idFromClient } = req.body;
  if (!prompt)      return res.status(400).json({ error: 'Missing prompt' });

  const sessionId = idFromClient || randomUUID();
  const webhookUrl = process.env.N8N_WEBHOOK_URL;

  try {
    // ❷   Abort after 4 min if n8n never answers
    const ac = new AbortController();
    const guard = setTimeout(() => ac.abort(), 1000 * 240);

    const rsp  = await fetch(webhookUrl, {
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify({ sessionId, chatInput: prompt }),
      signal : ac.signal
    });
    clearTimeout(guard);

    if (!rsp.ok) throw new Error(`n8n replied ${rsp.status}`);

    // ❸   Whatever n8n returns—array, object, etc.—forward it exactly as is
    const n8nData = await rsp.json();
    return res.status(200).json({ data: n8nData, sessionId });
  } catch (err) {
    console.error('n8n webhook error:', err);
    return res.status(500).json({ error: err.message || 'Failed to call n8n webhook' });
  }
}
