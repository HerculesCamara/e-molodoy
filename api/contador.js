import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

  if (req.method === 'GET') {
    // Buscar contador atual
    const contador = await kv.get('molodoy_contador') || 0;
    return res.status(200).json({ contador });
  }

  if (req.method === 'POST') {
    // Incrementar contador
    const novoContador = await kv.incr('molodoy_contador');
    return res.status(200).json({ contador: novoContador });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
