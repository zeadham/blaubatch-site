# Sales Pipeline & Sample Tracker Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a standalone "Pipeline & Sample Tracker" tool in `Sales Tools/` that tracks, per client, their problem (or "prospecting only") and every sample collected from them through its India-lab matching lifecycle, and generates an AI-drafted outreach email referencing the problem and sample codes.

**Architecture:** A single-file frontend (`Sales Tools/pipeline-tracker.html`) persists its state as JSON through two new endpoints (`GET`/`POST /api/pipeline`) added to the existing `Sales Tools/proxy.js` Node server, which reads/writes `Sales Tools/data/pipeline.json` on disk. This replaces the localStorage approach used by `client-matcher.html` (which resets depending on how the page is opened) with a real file the frontend always reaches via `localhost:5180`, regardless of the page's own origin. Email generation reuses the same `/v1/messages` Claude-proxy call pattern already used by `client-matcher.html`.

**Tech Stack:** Vanilla HTML/CSS/JS (no build step, no framework — matches every other file in `Sales Tools/`), Node's built-in `http`/`fs` modules in `proxy.js` (no new dependencies).

**Design reference:** `docs/superpowers/specs/2026-09-13-pipeline-tracker-design.md`

**Note on commits:** Per the user's global rule ("never auto-commit — only commit when explicitly asked"), this plan does **not** include `git commit` steps. Stage/review changes as you go, but leave committing to the user's explicit request at the end.

---

### Task 1: Add pipeline persistence endpoints to `proxy.js`

**Files:**
- Modify: `Sales Tools/proxy.js` (full rewrite — file is 57 lines)

- [ ] **Step 1: Replace the file with the version below**

The changes: import `fs`/`path`, add `readPipeline`/`writePipeline` helpers, widen the CORS `Access-Control-Allow-Methods` header to include `GET`, and handle `GET /api/pipeline` and `POST /api/pipeline` before the existing `/v1/messages`-only 404 guard.

```javascript
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
      writePipeline(parsed);
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
```

- [ ] **Step 2: Check the file has no syntax errors**

Run:
```bash
node --check "Sales Tools/proxy.js"
```
Expected: no output (a syntax error would print `SyntaxError: ...` and exit non-zero).

- [ ] **Step 3: Start the server and verify the new endpoints work end-to-end**

Run:
```bash
node "Sales Tools/proxy.js" &
sleep 1
curl -s http://localhost:5180/api/pipeline
```
Expected: `{"clients":[]}`

```bash
curl -s -X POST http://localhost:5180/api/pipeline -H "Content-Type: application/json" -d '{"clients":[{"id":"verify-test"}]}'
```
Expected: `{"ok":true}`

```bash
curl -s http://localhost:5180/api/pipeline
```
Expected: `{"clients":[{"id":"verify-test"}]}`

```bash
curl -s -X POST http://localhost:5180/api/pipeline -H "Content-Type: application/json" -d 'not json'
```
Expected: `{"error":"Invalid JSON"}`

- [ ] **Step 4: Clean up the test write and stop the server**

```bash
rm "Sales Tools/data/pipeline.json"
kill %1
```
This removes the throwaway `verify-test` entry so the real tool starts from an empty file. `kill %1` stops the background `node` process started in Step 3 (skip if your shell doesn't support job control — instead find and kill the PID listening on 5180).

---

### Task 2: Keep pipeline data out of git

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: Add the data directory to `.gitignore`**

Add this line at the end of `.gitignore`:
```
# Sales Tools live data (client/sample info — not code)
Sales Tools/data/
```

- [ ] **Step 2: Verify git ignores it**

```bash
mkdir -p "Sales Tools/data" && echo '{"clients":[]}' > "Sales Tools/data/pipeline.json"
git status --short "Sales Tools/data/"
```
Expected: no output (nothing untracked shown — confirms the ignore rule works). Leave the empty `pipeline.json` in place; it's the real data file the tool will use.

---

### Task 3: Build the pipeline tracker frontend

**Files:**
- Create: `Sales Tools/pipeline-tracker.html`

- [ ] **Step 1: Create the file**

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Blau Batch — Pipeline & Sample Tracker</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
<style>
  :root {
    --bg: #F7F8FC;
    --surface: #FFFFFF;
    --border: rgba(20,27,62,0.10);
    --border-lt: rgba(20,27,62,0.18);
    --text: #141B3E;
    --muted: rgba(20,27,62,0.55);
    --dim: rgba(20,27,62,0.30);
    --blue: #2B8DD0;
    --blue-dim: rgba(43,141,208,0.08);
    --amber: #D4840A;
    --amber-dim: rgba(212,132,10,0.08);
    --green: #16a34a;
    --green-dim: rgba(22,163,74,0.08);
    --red: #dc2626;
    --red-dim: rgba(220,38,38,0.08);
    --purple: #7c3aed;
    --purple-dim: rgba(124,58,237,0.08);
    --radius: 10px;
    --radius-lg: 14px;
  }
  *, *::before, *::after { box-sizing: border-box; margin:0; padding:0; }
  body {
    font-family: 'Inter', system-ui, sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
  }
  header { position: sticky; top:0; z-index:50; background: rgba(255,255,255,0.92); backdrop-filter: blur(16px); border-bottom: 1px solid var(--border); }
  .header-inner { max-width: 1280px; margin:0 auto; padding: 14px 28px; display:flex; align-items:center; gap:16px; }
  .back-link { font-size:12px; color: var(--muted); text-decoration:none; }
  .back-link:hover { color: var(--blue); }
  .divider-v { width:1px; height:20px; background: var(--border); }
  .header-title { font-size:14px; font-weight:700; }
  .api-pill { margin-left:auto; display:flex; align-items:center; gap:6px; padding:6px 12px; border-radius:20px; border:1px solid var(--border); font-size:11px; color: var(--muted); cursor:pointer; background:var(--surface); }
  .api-dot { width:6px; height:6px; border-radius:50%; background: var(--dim); }
  .api-dot.on { background: var(--green); }

  .layout { max-width:1280px; margin:0 auto; padding: 24px 28px 80px; display:grid; grid-template-columns: 340px 1fr; gap:20px; align-items:start; }
  @media (max-width: 900px) { .layout { grid-template-columns: 1fr; } }

  .panel { background: var(--surface); border:1px solid var(--border); border-radius: var(--radius-lg); padding:20px; position: sticky; top: 76px; }
  .panel h2 { font-size:13px; font-weight:700; margin-bottom:14px; }
  .field { margin-bottom:12px; }
  .field label { display:block; font-size:11px; font-weight:600; color: var(--muted); margin-bottom:5px; }
  .field input, .field select, .field textarea {
    width:100%; padding:8px 10px; border:1px solid var(--border-lt); border-radius:8px;
    font-family:inherit; font-size:13px; color: var(--text); background: var(--bg);
  }
  .field textarea { resize: vertical; min-height:56px; }
  .field-row { display:grid; grid-template-columns: 1fr 1fr; gap:10px; }
  .btn { padding:9px 16px; border-radius:8px; border:none; font-size:12.5px; font-weight:700; cursor:pointer; font-family:inherit; }
  .btn-primary { background: var(--blue); color:#fff; }
  .btn-primary:hover { background:#2478b8; }
  .btn-ghost { background: transparent; border:1px solid var(--border-lt); color: var(--muted); }
  .btn-ghost:hover { border-color: var(--blue); color: var(--blue); }
  .btn-sm { padding:5px 10px; font-size:11px; border-radius:6px; }
  .form-actions { display:flex; gap:8px; margin-top:16px; flex-wrap: wrap; }

  .toolbar { display:flex; gap:10px; margin-bottom:16px; flex-wrap:wrap; }
  .toolbar select { padding:7px 10px; border:1px solid var(--border-lt); border-radius:8px; font-size:12px; background: var(--surface); }

  .client-card { background: var(--surface); border:1px solid var(--border); border-radius: var(--radius-lg); padding:18px 20px; margin-bottom:14px; }
  .client-head { display:flex; align-items:flex-start; justify-content:space-between; gap:12px; flex-wrap:wrap; }
  .client-name { font-size:15px; font-weight:800; margin-bottom:4px; }
  .client-meta { font-size:12px; color: var(--muted); }
  .client-badges { display:flex; gap:6px; align-items:center; flex-wrap:wrap; }
  .badge { display:inline-block; padding:3px 10px; border-radius:20px; font-size:10.5px; font-weight:700; border:1px solid transparent; white-space:nowrap; }
  .badge.gray  { background: rgba(20,27,62,0.05); color: var(--dim); border-color: var(--border); }
  .badge.blue  { background: var(--blue-dim); color: var(--blue); border-color: rgba(43,141,208,0.25); }
  .badge.amber { background: var(--amber-dim); color: var(--amber); border-color: rgba(212,132,10,0.25); }
  .badge.green { background: var(--green-dim); color: var(--green); border-color: rgba(22,163,74,0.25); }
  .badge.red   { background: var(--red-dim); color: var(--red); border-color: rgba(220,38,38,0.25); }
  .badge.purple{ background: var(--purple-dim); color: var(--purple); border-color: rgba(124,58,237,0.25); }

  .stage-select { padding:5px 8px; border-radius:6px; border:1px solid var(--border-lt); font-size:11px; font-weight:600; background: var(--surface); }

  .client-body { margin-top:12px; padding-top:12px; border-top:1px solid var(--border); font-size:12.5px; color: var(--text); }
  .client-body > div { margin-bottom: 6px; }
  .client-notes { color: var(--muted); margin-top:6px; white-space:pre-wrap; }

  .samples-section { margin-top:14px; }
  .samples-head { display:flex; align-items:center; justify-content:space-between; margin-bottom:8px; }
  .samples-head strong { font-size:11.5px; text-transform:uppercase; letter-spacing:.4px; color: var(--muted); }
  table.samples-table { width:100%; border-collapse: collapse; font-size:12px; }
  table.samples-table th { text-align:left; font-size:10px; text-transform:uppercase; letter-spacing:.4px; color: var(--dim); padding:6px 8px; border-bottom:1px solid var(--border); }
  table.samples-table td { padding:6px 8px; border-bottom:1px solid var(--border); vertical-align:middle; }
  table.samples-table input, table.samples-table select { width:100%; padding:5px 6px; border:1px solid var(--border-lt); border-radius:6px; font-size:11.5px; font-family:inherit; background: var(--bg); }
  .sample-empty { padding:10px 0; font-size:12px; color: var(--dim); font-style:italic; }

  .email-box { margin-top:14px; background: var(--bg); border:1px solid var(--border); border-radius:10px; padding:14px 16px; }
  .email-box pre { white-space:pre-wrap; font-family:inherit; font-size:12.5px; line-height:1.65; color: var(--text); }
  .email-actions { display:flex; justify-content:flex-end; gap:8px; margin-top:10px; }

  .empty-state { text-align:center; padding:60px 20px; color: var(--dim); font-size:13px; line-height: 1.7; }

  .modal-overlay { position:fixed; inset:0; background: rgba(20,27,62,0.35); display:none; align-items:center; justify-content:center; z-index:200; }
  .modal-overlay.open { display:flex; }
  .modal { background: var(--surface); border-radius: var(--radius-lg); padding:24px; width:360px; max-width:90vw; }
  .modal h3 { font-size:14px; margin-bottom:12px; }
  .modal-actions { display:flex; justify-content:flex-end; gap:8px; margin-top:16px; }
</style>
</head>
<body>

<header>
  <div class="header-inner">
    <a class="back-link" href="/index.html">← Sales Tools</a>
    <div class="divider-v"></div>
    <span class="header-title">Pipeline &amp; Sample Tracker</span>
    <div class="api-pill" id="apiPill" onclick="openModal('apiModal')">
      <span class="api-dot" id="apiDot"></span>
      <span id="apiLabel">Set API Key</span>
    </div>
  </div>
</header>

<div class="layout">

  <div class="panel">
    <h2 id="formTitle">Add Client</h2>
    <div class="field"><label>Company *</label><input id="f-company" type="text" placeholder="Company name" /></div>
    <div class="field-row">
      <div class="field"><label>Contact Person</label><input id="f-contact" type="text" /></div>
      <div class="field"><label>Phone</label><input id="f-phone" type="text" /></div>
    </div>
    <div class="field"><label>Email</label><input id="f-email" type="email" /></div>
    <div class="field"><label>Industry</label><input id="f-industry" type="text" placeholder="e.g. Packaging, Caps & Closures" /></div>
    <div class="field-row">
      <div class="field"><label>Current Supplier</label><input id="f-supplier" type="text" /></div>
      <div class="field"><label>Polymer</label><input id="f-polymer" type="text" placeholder="PP / PE / PET..." /></div>
    </div>
    <div class="field-row">
      <div class="field"><label>Current Colour</label><input id="f-colour" type="text" /></div>
      <div class="field"><label>Visit Date</label><input id="f-visitdate" type="date" /></div>
    </div>
    <div class="field">
      <label>Problem</label>
      <select id="f-problem">
        <option value="dispersion">Poor dispersion</option>
        <option value="price">High price</option>
        <option value="color">Colour mismatch / change</option>
        <option value="none">No problem — prospecting</option>
        <option value="other">Other</option>
      </select>
    </div>
    <div class="field"><label>Problem Notes</label><textarea id="f-problemnotes" placeholder="Detail on the problem..."></textarea></div>
    <div class="field"><label>General Notes</label><textarea id="f-notes" placeholder="Meeting notes, context..."></textarea></div>
    <div class="form-actions">
      <button class="btn btn-primary" id="submitBtn" onclick="submitClientForm()">Add Client</button>
      <button class="btn btn-ghost" id="cancelEditBtn" style="display:none" onclick="cancelEdit()">Cancel</button>
    </div>
  </div>

  <div>
    <div class="toolbar">
      <select id="filterProblem" onchange="render()">
        <option value="all">All problems</option>
        <option value="dispersion">Poor dispersion</option>
        <option value="price">High price</option>
        <option value="color">Colour mismatch / change</option>
        <option value="none">No problem — prospecting</option>
        <option value="other">Other</option>
      </select>
      <select id="filterStage" onchange="render()">
        <option value="all">All stages</option>
        <option value="new">New</option>
        <option value="visited">Visited</option>
        <option value="sample_collected">Sample Collected</option>
        <option value="sent_to_lab">Sent to Lab</option>
        <option value="sample_ready">Sample Ready</option>
        <option value="proposal_sent">Proposal Sent</option>
        <option value="won">Won</option>
        <option value="lost">Lost</option>
      </select>
    </div>
    <div id="clientList"></div>
  </div>

</div>

<div class="modal-overlay" id="apiModal">
  <div class="modal">
    <h3>Set Claude API Key</h3>
    <div class="field"><label>API Key</label><input id="apiKeyInput" type="password" placeholder="sk-ant-..." /></div>
    <div class="modal-actions">
      <button class="btn btn-ghost btn-sm" onclick="closeModal('apiModal')">Cancel</button>
      <button class="btn btn-primary btn-sm" onclick="saveKey()">Save</button>
    </div>
  </div>
</div>

<script>
/* ── Config ── */
const API_BASE = 'http://localhost:5180';
const MODEL_ID = 'claude-sonnet-5';

const PROBLEM_LABELS = {
  dispersion: 'Poor dispersion',
  price: 'High price',
  color: 'Colour mismatch / change',
  none: 'No problem — prospecting',
  other: 'Other',
};
const PROBLEM_BADGE = { dispersion:'amber', price:'red', color:'blue', none:'green', other:'gray' };

const STAGE_LABELS = {
  new:'New', visited:'Visited', sample_collected:'Sample Collected', sent_to_lab:'Sent to Lab',
  sample_ready:'Sample Ready', proposal_sent:'Proposal Sent', won:'Won', lost:'Lost',
};
const STAGE_ORDER = ['new','visited','sample_collected','sent_to_lab','sample_ready','proposal_sent','won','lost'];

const SAMPLE_STAGE_LABELS = {
  collected:'Collected', sent_to_lab:'Sent to India Lab', matched:'Matched', sent_to_client:'Sent to Client', approved:'Approved', rejected:'Rejected',
};
const SAMPLE_STAGE_ORDER = ['collected','sent_to_lab','matched','sent_to_client','approved','rejected'];

/* ── State ── */
let state = { clients: [] };
let editingId = null;

/* ── Persistence ── */
async function loadState() {
  try {
    const res = await fetch(`${API_BASE}/api/pipeline`, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error(`Server responded ${res.status}`);
    state = await res.json();
  } catch (err) {
    document.getElementById('clientList').innerHTML =
      `<div class="empty-state">Could not reach the local server (port 5180).<br>Make sure it's running (via launch.bat), then reload this page.<br><span style="font-size:11px">${esc(err.message)}</span></div>`;
    state = { clients: [] };
    return false;
  }
  return true;
}

async function saveState() {
  try {
    const res = await fetch(`${API_BASE}/api/pipeline`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(state),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`Server responded ${res.status}`);
  } catch (err) {
    alert(`Could not save — local server unreachable (port 5180). Your last change was NOT saved.\n${err.message}`);
  }
}

/* ── Helpers ── */
function esc(s) { return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function uid() { return 'c-' + Date.now().toString(36) + Math.random().toString(36).slice(2,8); }

function nextSampleId() {
  const year = new Date().getFullYear();
  const prefix = `BB-${year}-`;
  let max = 0;
  state.clients.forEach(c => (c.samples||[]).forEach(s => {
    if (s.id && s.id.startsWith(prefix)) {
      const n = parseInt(s.id.slice(prefix.length), 10);
      if (!isNaN(n) && n > max) max = n;
    }
  }));
  return prefix + String(max + 1).padStart(3, '0');
}

/* ── Form ── */
function clearForm() {
  ['company','contact','phone','email','industry','supplier','polymer','colour','visitdate','problemnotes','notes'].forEach(k => {
    document.getElementById('f-' + k).value = '';
  });
  document.getElementById('f-problem').value = 'dispersion';
}

function fillForm(c) {
  document.getElementById('f-company').value = c.company || '';
  document.getElementById('f-contact').value = c.contactPerson || '';
  document.getElementById('f-phone').value = c.phone || '';
  document.getElementById('f-email').value = c.email || '';
  document.getElementById('f-industry').value = c.industry || '';
  document.getElementById('f-supplier').value = c.currentSupplier || '';
  document.getElementById('f-polymer').value = c.polymer || '';
  document.getElementById('f-colour').value = c.currentColour || '';
  document.getElementById('f-visitdate').value = c.visitDate || '';
  document.getElementById('f-problem').value = c.problem || 'dispersion';
  document.getElementById('f-problemnotes').value = c.problemNotes || '';
  document.getElementById('f-notes').value = c.notes || '';
}

function submitClientForm() {
  const company = document.getElementById('f-company').value.trim();
  if (!company) { alert('Company name is required.'); return; }

  const data = {
    company,
    contactPerson: document.getElementById('f-contact').value.trim(),
    phone: document.getElementById('f-phone').value.trim(),
    email: document.getElementById('f-email').value.trim(),
    industry: document.getElementById('f-industry').value.trim(),
    currentSupplier: document.getElementById('f-supplier').value.trim(),
    polymer: document.getElementById('f-polymer').value.trim(),
    currentColour: document.getElementById('f-colour').value.trim(),
    visitDate: document.getElementById('f-visitdate').value,
    problem: document.getElementById('f-problem').value,
    problemNotes: document.getElementById('f-problemnotes').value.trim(),
    notes: document.getElementById('f-notes').value.trim(),
  };

  const now = new Date().toISOString();

  if (editingId) {
    const c = state.clients.find(x => x.id === editingId);
    Object.assign(c, data, { updatedAt: now });
    cancelEdit();
  } else {
    state.clients.unshift({
      id: uid(), ...data, stage: 'new', samples: [], createdAt: now, updatedAt: now,
    });
    clearForm();
  }
  saveState();
  render();
}

function startEdit(id) {
  editingId = id;
  const c = state.clients.find(x => x.id === id);
  fillForm(c);
  document.getElementById('formTitle').textContent = 'Edit Client';
  document.getElementById('submitBtn').textContent = 'Save Changes';
  document.getElementById('cancelEditBtn').style.display = '';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function cancelEdit() {
  editingId = null;
  clearForm();
  document.getElementById('formTitle').textContent = 'Add Client';
  document.getElementById('submitBtn').textContent = 'Add Client';
  document.getElementById('cancelEditBtn').style.display = 'none';
}

function deleteClient(id) {
  if (!confirm('Delete this client and all its samples? This cannot be undone.')) return;
  state.clients = state.clients.filter(c => c.id !== id);
  saveState();
  render();
}

/* ── Stage changes ── */
function setClientStage(id, stage) {
  const c = state.clients.find(x => x.id === id);
  c.stage = stage;
  c.updatedAt = new Date().toISOString();
  saveState();
  render();
}

/* ── Samples ── */
function addSample(clientId) {
  const description = prompt('Sample description (e.g. "red opaque PP cap sample"):');
  if (description === null) return;
  const c = state.clients.find(x => x.id === clientId);
  const sample = {
    id: nextSampleId(),
    description: description.trim(),
    collectedDate: new Date().toISOString().slice(0,10),
    stage: 'collected',
    labCode: '',
    notes: '',
  };
  c.samples = c.samples || [];
  c.samples.push(sample);
  if (c.stage === 'new' || c.stage === 'visited') c.stage = 'sample_collected';
  c.updatedAt = new Date().toISOString();
  saveState();
  render();
}

function setSampleField(clientId, sampleId, field, value) {
  const c = state.clients.find(x => x.id === clientId);
  const s = c.samples.find(x => x.id === sampleId);
  s[field] = value;
  if (field === 'stage' && value === 'matched' && c.stage !== 'won' && c.stage !== 'lost') {
    c.stage = 'sample_ready';
  }
  c.updatedAt = new Date().toISOString();
  saveState();
  render();
}

function deleteSample(clientId, sampleId) {
  if (!confirm('Delete this sample?')) return;
  const c = state.clients.find(x => x.id === clientId);
  c.samples = c.samples.filter(s => s.id !== sampleId);
  saveState();
  render();
}

/* ── Email generation ── */
async function generateEmail(clientId) {
  const c = state.clients.find(x => x.id === clientId);
  const apiKey = localStorage.getItem('bb_key');
  if (!apiKey) { openModal('apiModal'); return; }

  const box = document.getElementById('email-' + clientId);
  box.style.display = '';
  box.innerHTML = '<div style="color:var(--muted);font-size:12px">Generating…</div>';

  const problemText = c.problem === 'none'
    ? 'This client has no active complaint — the goal is to introduce Blau Batch as a potential new supplier.'
    : `Problem: ${PROBLEM_LABELS[c.problem]}.${c.problemNotes ? ' Detail: ' + c.problemNotes : ''}`;

  const samples = (c.samples || []).map(s => {
    const stageDesc = (s.stage === 'matched' || s.stage === 'sent_to_client' || s.stage === 'approved')
      ? `matched and ready — lab code ${s.labCode || 'pending'}`
      : s.stage === 'sent_to_lab' ? 'currently with our India lab for matching'
      : s.stage === 'rejected' ? 'did not pass matching'
      : 'collected, about to be sent for matching';
    return `- ${s.id}: ${s.description} (${stageDesc})`;
  }).join('\n') || '(no samples collected yet)';

  const system = 'You are a masterbatch sales rep at Blau Batch writing a short, professional outreach/follow-up email to a plastics manufacturer client. Be specific, not generic. Reference the client\'s problem (or frame Blau Batch as a new supplier option if they have none) and the samples listed, using their exact codes. Keep it under 200 words. Return plain email text only, no subject line, no markdown.';
  const user = `Client: ${c.company}${c.contactPerson ? ' (contact: ' + c.contactPerson + ')' : ''}\nIndustry: ${c.industry || 'unknown'}\n${problemText}\n\nSamples:\n${samples}`;

  try {
    const res = await fetch(`${API_BASE}/v1/messages`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: MODEL_ID, max_tokens: 1024, system, messages: [{ role: 'user', content: user }] }),
      signal: AbortSignal.timeout(60000),
    });
    if (!res.ok) {
      const e = await res.json().catch(() => ({}));
      throw new Error(e?.error?.message || `API error ${res.status}`);
    }
    const data = await res.json();
    const text = data.content?.[0]?.text || '(empty response)';
    box.innerHTML = `<pre id="emailtext-${clientId}">${esc(text)}</pre>
      <div class="email-actions">
        <button class="btn btn-ghost btn-sm" onclick="copyEmail('${clientId}')">Copy</button>
      </div>`;
  } catch (err) {
    box.innerHTML = `<div style="color:var(--red);font-size:12px">Could not generate email — is the local proxy running on port 5180?<br>${esc(err.message)}</div>`;
  }
}

function copyEmail(clientId) {
  const el = document.getElementById('emailtext-' + clientId);
  navigator.clipboard.writeText(el.textContent);
}

/* ── API key modal ── */
function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }
function saveKey() {
  const k = document.getElementById('apiKeyInput').value.trim();
  if (!k.startsWith('sk-ant-')) { alert('Key must start with sk-ant-'); return; }
  localStorage.setItem('bb_key', k);
  updateKeyStatus();
  closeModal('apiModal');
}
function updateKeyStatus() {
  const k = localStorage.getItem('bb_key');
  document.getElementById('apiDot').classList.toggle('on', !!k);
  document.getElementById('apiLabel').textContent = k ? 'API Connected' : 'Set API Key';
}
document.querySelectorAll('.modal-overlay').forEach(o => o.addEventListener('click', e => { if (e.target === o) o.classList.remove('open'); }));

/* ── Render ── */
function render() {
  const problemFilter = document.getElementById('filterProblem').value;
  const stageFilter = document.getElementById('filterStage').value;
  const list = document.getElementById('clientList');

  let clients = state.clients;
  if (problemFilter !== 'all') clients = clients.filter(c => c.problem === problemFilter);
  if (stageFilter !== 'all') clients = clients.filter(c => c.stage === stageFilter);

  if (!clients.length) {
    list.innerHTML = '<div class="empty-state">No clients match this filter yet.</div>';
    return;
  }

  list.innerHTML = clients.map(c => renderClientCard(c)).join('');
}

function renderClientCard(c) {
  const samples = c.samples || [];
  const sampleRows = samples.map(s => `
    <tr>
      <td><strong>${esc(s.id)}</strong></td>
      <td><input value="${esc(s.description)}" onchange="setSampleField('${c.id}','${s.id}','description',this.value)" /></td>
      <td>
        <select onchange="setSampleField('${c.id}','${s.id}','stage',this.value)">
          ${SAMPLE_STAGE_ORDER.map(st => `<option value="${st}" ${s.stage===st?'selected':''}>${SAMPLE_STAGE_LABELS[st]}</option>`).join('')}
        </select>
      </td>
      <td><input value="${esc(s.labCode||'')}" placeholder="—" onchange="setSampleField('${c.id}','${s.id}','labCode',this.value)" /></td>
      <td><input value="${esc(s.notes||'')}" onchange="setSampleField('${c.id}','${s.id}','notes',this.value)" /></td>
      <td><button class="btn btn-ghost btn-sm" onclick="deleteSample('${c.id}','${s.id}')">✕</button></td>
    </tr>`).join('');

  return `
    <div class="client-card">
      <div class="client-head">
        <div>
          <div class="client-name">${esc(c.company)}</div>
          <div class="client-meta">${esc(c.contactPerson||'')}${c.contactPerson && (c.phone||c.email) ? ' · ' : ''}${esc(c.phone||'')}${c.phone && c.email ? ' · ' : ''}${esc(c.email||'')}</div>
        </div>
        <div class="client-badges">
          <span class="badge ${PROBLEM_BADGE[c.problem]}">${PROBLEM_LABELS[c.problem]}</span>
          <select class="stage-select" onchange="setClientStage('${c.id}', this.value)">
            ${STAGE_ORDER.map(st => `<option value="${st}" ${c.stage===st?'selected':''}>${STAGE_LABELS[st]}</option>`).join('')}
          </select>
        </div>
      </div>

      <div class="client-body">
        ${c.industry ? `<div><strong>Industry:</strong> ${esc(c.industry)}</div>` : ''}
        ${(c.currentSupplier||c.polymer||c.currentColour) ? `<div><strong>Currently running:</strong> ${esc(c.polymer||'—')} · ${esc(c.currentColour||'—')} · supplier: ${esc(c.currentSupplier||'—')}</div>` : ''}
        ${c.problemNotes ? `<div class="client-notes"><strong>Problem detail:</strong> ${esc(c.problemNotes)}</div>` : ''}
        ${c.notes ? `<div class="client-notes">${esc(c.notes)}</div>` : ''}

        <div class="samples-section">
          <div class="samples-head">
            <strong>Samples (${samples.length})</strong>
            <button class="btn btn-ghost btn-sm" onclick="addSample('${c.id}')">+ Add Sample</button>
          </div>
          ${samples.length ? `
            <table class="samples-table">
              <thead><tr><th>Code</th><th>Description</th><th>Stage</th><th>Lab Code</th><th>Notes</th><th></th></tr></thead>
              <tbody>${sampleRows}</tbody>
            </table>` : '<div class="sample-empty">No samples collected yet.</div>'}
        </div>

        <div class="form-actions">
          <button class="btn btn-ghost btn-sm" onclick="startEdit('${c.id}')">Edit</button>
          <button class="btn btn-ghost btn-sm" onclick="deleteClient('${c.id}')">Delete</button>
          <button class="btn btn-primary btn-sm" onclick="generateEmail('${c.id}')">Generate Email</button>
        </div>

        <div class="email-box" id="email-${c.id}" style="display:none"></div>
      </div>
    </div>`;
}

/* ── Init ── */
updateKeyStatus();
loadState().then(render);
</script>
</body>
</html>
```

- [ ] **Step 2: Sanity-check the embedded JS has no syntax errors**

Run:
```bash
node -e "
const fs = require('fs');
const html = fs.readFileSync('Sales Tools/pipeline-tracker.html', 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
new Function(script);
console.log('JS syntax OK');
"
```
Expected: `JS syntax OK` (this only parses the script into a function without running it, since running it needs a DOM — a syntax error would throw `SyntaxError` instead).

---

### Task 4: Add the tool to the Sales Tools index

**Files:**
- Modify: `Sales Tools/index.html:228-230`

- [ ] **Step 1: Insert a new card between the "Client Intelligence Tool" and "Proposal Reference" cards**

Find this exact text:
```html
    </a>

    <a href="/sample-proposal.html" class="tool-card">
```

Replace it with:
```html
    </a>

    <a href="/pipeline-tracker.html" class="tool-card">
      <div class="card-icon">
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
          <path d="M9 11l3 3L22 4"/>
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
        </svg>
      </div>
      <div>
        <div class="card-title">Pipeline &amp; Sample Tracker</div>
        <div class="card-desc">Track each client's problem, log samples sent to the India lab for matching, and generate a follow-up email referencing their sample codes.</div>
      </div>
      <div class="card-footer">
        <div class="card-tags">
          <span class="card-tag">Sample Tracking</span>
          <span class="card-tag">AI Email</span>
        </div>
        <svg class="card-arrow" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </div>
    </a>

    <a href="/sample-proposal.html" class="tool-card">
```

- [ ] **Step 2: Verify the file is still valid HTML by checking the tag count balances**

```bash
grep -o '<a href="/pipeline-tracker.html"' "Sales Tools/index.html"
```
Expected: one line of output, `<a href="/pipeline-tracker.html"` — confirms the card was inserted exactly once.

---

### Task 5: End-to-end manual verification

**Files:** none (verification only)

- [ ] **Step 1: Start the real servers**

```bash
"Sales Tools/launch.bat"
```
This opens `http://localhost:5179` in your default browser, with the proxy running in the background on port 5180.

- [ ] **Step 2: Open the new tool**

Navigate to `http://localhost:5179/pipeline-tracker.html` (or click the new "Pipeline & Sample Tracker" card from the tools index).

Expected: empty state message "No clients match this filter yet." — confirms `GET /api/pipeline` returned `{"clients":[]}` successfully (the file created in Task 2, Step 2).

- [ ] **Step 3: Add a client with a problem**

Fill in Company (e.g. "Test Co"), pick "Poor dispersion" as the problem, add some Problem Notes, click "Add Client".

Expected: a client card appears on the right with a "Poor dispersion" amber badge and "New" stage.

- [ ] **Step 4: Add two samples**

Click "+ Add Sample" twice, entering different descriptions.

Expected: both samples appear in the table with auto-generated codes `BB-2026-001` and `BB-2026-002`, stage "Collected", and the client's stage badge auto-advances to "Sample Collected".

- [ ] **Step 5: Advance a sample and confirm the client stage auto-suggests**

Change the first sample's stage dropdown to "Matched", type a lab code (e.g. "IN-4471").

Expected: the client's own stage dropdown jumps to "Sample Ready".

- [ ] **Step 6: Reload the page and confirm persistence**

Press F5 / reload the browser tab.

Expected: the client, both samples, and their stages/lab code are all still there — this confirms the file-backed persistence (Task 1) actually fixed the reset problem, since this reload re-fetches from `GET /api/pipeline` rather than relying on browser storage.

- [ ] **Step 7: Generate an email**

Click "Generate Email" on the client card (set your Claude API key via the "Set API Key" pill first if not already set from `client-matcher.html` — it's the same `localStorage['bb_key']`).

Expected: within a few seconds, a drafted email appears referencing "Test Co", the dispersion problem, and mentions sample `BB-2026-001` / `BB-2026-002` with their current stages. Click "Copy" and confirm it copies to the clipboard.

- [ ] **Step 8: Test the "no problem" case**

Add a second client with problem "No problem — prospecting" and no samples, then generate its email.

Expected: the email frames Blau Batch as a potential new supplier rather than addressing a complaint, and doesn't reference nonexistent samples.

- [ ] **Step 9: Clean up test data**

Delete "Test Co" and the second test client using each card's "Delete" button, so the tool starts empty for real use.

```bash
cat "Sales Tools/data/pipeline.json"
```
Expected: `{"clients":[]}` (or equivalent pretty-printed empty array) — confirms deletes persisted too.

- [ ] **Step 10: Stop the servers when done testing**

```bash
"Sales Tools/stop.bat"
```
