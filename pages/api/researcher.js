// pages/api/researcher.js
import { randomUUID } from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST')
    return res.status(405).json({ error: 'Method not allowed' });

  const { prompt, sessionId: incoming } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Missing prompt' });

  const sessionId = incoming || randomUUID();
  const webhookUrl = process.env.N8N_WEBHOOK_URL;

  fetch(webhookUrl, {
    method  : 'POST',
    headers : { 'Content-Type': 'application/json' },
    body    : JSON.stringify({ sessionId, chatInput: prompt })
  }).catch(err => console.error('n8n call failed:', err));

  // Immediately tell the browser to start polling
  return res.status(200).json({ queued: true, sessionId });

}
