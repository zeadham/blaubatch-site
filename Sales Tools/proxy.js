/**
 * Blau Batch — Local Anthropic Proxy + Pipeline Data Server
 * Runs on http://localhost:5180
 * - Forwards /v1/messages → https://api.anthropic.com/v1/messages (avoids browser CORS)
 * - Serves GET/POST /api/pipeline → reads/writes Sales Tools/data/pipeline.json
 */
const http  = require('http');
const https = require('https');
const fs    = require('fs');
const path  = require('path');

const PORT = 5180;
const DATA_DIR  = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'pipeline.json');

function readPipeline() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch {
    return { clients: [] };
  }
}

function writePipeline(data) {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

const server = http.createServer((req, res) => {
  // CORS headers — allow requests from the sales tools
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-api-key, anthropic-version, anthropic-dangerous-direct-browser-calls');

  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  if (req.method === 'GET' && req.url === '/api/pipeline') {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify(readPipeline()));
    return;
  }

  if (req.method === 'POST' && req.url === '/api/pipeline') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      let parsed;
      try {
        parsed = JSON.parse(body);
      } catch {
        res.writeHead(400, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
        return;
      }
      if (!parsed || !Array.isArray(parsed.clients)) {
        res.writeHead(400, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ error: 'Expected { clients: [...] }' }));
        return;
      }
      try {
        writePipeline(parsed);
      } catch (err) {
        res.writeHead(500, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ error: 'Could not write pipeline data: ' + err.message }));
        return;
      }
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify({ ok: true }));
    });
    return;
  }

  if (req.method !== 'POST' || req.url !== '/v1/messages') {
    res.writeHead(404); res.end('Not found'); return;
  }

  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    const apiKey = req.headers['x-api-key'] || '';
    const options = {
      hostname: 'api.anthropic.com',
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': req.headers['anthropic-version'] || '2023-06-01',
        'content-length': Buffer.byteLength(body),
      },
    };

    const upstream = https.request(options, (upRes) => {
      res.writeHead(upRes.statusCode, { 'content-type': 'application/json' });
      upRes.pipe(res);
    });

    upstream.on('error', (err) => {
      res.writeHead(502); res.end(JSON.stringify({ error: { message: err.message } }));
    });

    upstream.write(body);
    upstream.end();
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Blau Batch proxy running → http://localhost:${PORT}`);
  console.log('Forwarding /v1/messages to api.anthropic.com');
  console.log('Serving GET/POST /api/pipeline from data/pipeline.json');
});
