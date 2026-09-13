# Sales Pipeline & Sample Tracker — Design

**Date:** 2026-09-13
**Status:** Approved for planning

## Problem

Adham visits/contacts plastics manufacturers, identifies problems they face with their current masterbatch (poor dispersion, high price, colour mismatch) — or no problem at all, when he's simply trying to become a supplier option. He collects physical masterbatch samples from clients and sends them to Blau Batch's partner labs in India for colour/formulation matching, which come back with a lab-assigned sample code.

There is currently no tracker for this workflow. The existing `client-matcher.html` tool has a basic pipeline (localStorage-based prospect history + AI product matching) but doesn't model problems or the sample→lab→match lifecycle, and its localStorage-based storage has been unreliable (resets depending on how the file is opened / browser state).

Needed: a dedicated tool to track, per client, the problem they face (if any) and every sample collected from them (with internal + lab codes, and lifecycle stage), plus a way to generate an outreach email that references both the problem and the relevant sample codes.

## Scope

New standalone tool, separate from `client-matcher.html`, living alongside it in `Sales Tools/`. Does not touch or depend on `client-matcher.html`'s data.

## Architecture

**Frontend:** `Sales Tools/pipeline-tracker.html` — single-file HTML/CSS/JS, matching the existing tools' visual style (light theme, Inter font, Blau Batch blue `#2B8DD0` accent, card-based layout as seen in `index.html` and `client-matcher.html`). Added as a new card on `index.html`'s tools grid.

**Persistence:** Extends the existing `Sales Tools/proxy.js` (already running as a background process on port 5180 via `launch.bat`) with two new endpoints, alongside its existing `/v1/messages` Anthropic proxy:
- `GET /api/pipeline` — reads and returns `Sales Tools/data/pipeline.json` (returns `{"clients": []}` if the file doesn't exist yet).
- `POST /api/pipeline` — validates the request body is well-formed JSON with a `clients` array, writes it to `Sales Tools/data/pipeline.json`, creating the `data/` directory if needed.

This fixes the localStorage reset problem: the frontend always reads/writes through `localhost:5180` regardless of how the HTML page itself is loaded (via `localhost:5179` or `file://`), and the data lives in a real file on disk rather than browser storage that can be cleared or scoped to the wrong origin.

`Sales Tools/data/` is added to `.gitignore` — this is live client/sample data, not code, and may contain sensitive commercial info.

**Email generation:** Reuses the same Claude API call pattern as `client-matcher.html` — POST to `localhost:5180/v1/messages` using the API key already stored by the user (in `localStorage['bb_key']`, set via the existing "Set API Key" flow in `client-matcher.html`, read the same way here). No changes needed to `proxy.js`'s existing `/v1/messages` forwarding.

## Data Model

`Sales Tools/data/pipeline.json`:

```json
{
  "clients": [
    {
      "id": "uuid",
      "company": "string",
      "contactPerson": "string",
      "phone": "string",
      "email": "string",
      "industry": "string",
      "currentSupplier": "string",
      "polymer": "string",
      "currentColour": "string",
      "visitDate": "YYYY-MM-DD",
      "notes": "string (free text)",
      "problem": "dispersion | price | color | none | other",
      "problemNotes": "string (free text detail, e.g. custom problem description when 'other')",
      "stage": "new | visited | sample_collected | sent_to_lab | sample_ready | proposal_sent | won | lost",
      "samples": [
        {
          "id": "BB-2026-014",
          "description": "string, e.g. 'red opaque PP cap sample'",
          "collectedDate": "YYYY-MM-DD",
          "stage": "collected | sent_to_lab | matched | sent_to_client | approved | rejected",
          "labCode": "string or null",
          "notes": "string"
        }
      ],
      "createdAt": "ISO timestamp",
      "updatedAt": "ISO timestamp"
    }
  ]
}
```

- One problem per client (or `none`/`other`), multiple samples per client.
- Sample `id` is auto-generated sequentially on creation: `BB-{year}-{3-digit sequence}`, computed from the highest existing sample id across all clients in the file.
- Client `stage` is set manually by the user; the UI suggests (but does not force) advancing it — e.g. suggests `sample_collected` when the first sample is added, and `sample_ready` when a sample reaches `matched`.

## UI

Two-pane layout on one page:

**Left — Add/Edit Client form:** company, contact person, phone, email, industry, current supplier, polymer, current colour, visit date, notes, problem (dropdown: Poor dispersion / High price / Colour mismatch or change / No problem — prospecting / Other) with a `problemNotes` text field for detail.

**Right — Client list:** cards, filterable by problem type and by stage. Each card shows company name, problem badge, stage badge (editable dropdown), and an expandable samples section:
- Table of samples: internal code, description, stage (dropdown), lab code (editable text, blank until known), notes.
- "+ Add Sample" button generates the next internal code automatically and appends a row in `collected` stage.
- "Generate Email" button per client.

**Generate Email flow:** builds a prompt from the client's company/contact, problem + problemNotes (or a "no active problem, prospecting" framing when `problem === 'none'`), and the sample list (code, description, current stage — e.g. "matched, ready to send" vs "currently with the India lab"). Sends it to Claude via the local proxy, same as `client-matcher.html`'s existing pitch generation. Displays the result in a copyable box with a "Copy" button.

## Error Handling

- Proxy unreachable (port 5180 down): show the same message pattern already used in `client-matcher.html` — "Could not reach local proxy (port 5180). Make sure the proxy is running."
- `pipeline.json` missing on first load: server returns an empty client list; first save creates the file and `data/` directory.
- Malformed POST body: server responds 400 without writing the file, so a bad client-side state can never corrupt the on-disk data.

## Testing / Verification

No automated test suite — this matches the existing untested single-file tools in `Sales Tools/`. Verification is manual after implementation:
1. Add a client with a problem, add two samples, reload the page — confirm data persists (validates the localStorage-reset fix).
2. Advance a sample through all stages, add a lab code, confirm it saves.
3. Generate an email for a client with a problem, and for one with `problem: none`, confirm both read naturally.
4. Confirm the new tool appears correctly on `index.html`'s tools grid.

## Out of Scope

- No linking to `client-matcher.html`'s existing pipeline/history — this tool has its own separate client list.
- No multi-user sync — this is a local, single-user file-backed tool, same as the rest of `Sales Tools/`.
- No automated stage transitions — all stage changes are manual, with UI suggestions only.
