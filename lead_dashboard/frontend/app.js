// Lead dashboard: talks to the FastAPI backend under /api.
// All lead data is inserted with textContent (never innerHTML), because
// names, headlines and replies come from LinkedIn and must not run as HTML.

const POLL_INTERVAL_MS = 3000;
const SHORT_REPLY_CHARS = 90;

const elements = {
    taskStatus: document.getElementById("task-status"),
    dispatchButton: document.getElementById("dispatch-button"),
    syncButton: document.getElementById("sync-button"),
    retryButton: document.getElementById("retry-button"),
    message: document.getElementById("message"),
    addLeadsForm: document.getElementById("add-leads-form"),
    leadUrls: document.getElementById("lead-urls"),
    leadsBody: document.getElementById("leads-body"),
    emptyState: document.getElementById("empty-state"),
    stats: {
        total: document.getElementById("stat-total"),
        pending: document.getElementById("stat-pending"),
        sent: document.getElementById("stat-sent"),
        accepted: document.getElementById("stat-accepted"),
        replied: document.getElementById("stat-replied"),
    },
};

let pollTimer = null;
// True once this page has seen a task running, so we only announce results we watched.
let watchingTask = false;

// --- API helpers ---

async function api(path, options = {}) {
    const response = await fetch(path, {
        headers: { "Content-Type": "application/json" },
        ...options,
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) {
        throw new Error(body.detail || `Request failed (${response.status})`);
    }
    return body;
}

function showMessage(text, isError = false) {
    elements.message.textContent = text;
    elements.message.classList.toggle("is-error", isError);
    elements.message.hidden = false;
}

function hideMessage() {
    elements.message.hidden = true;
}

// --- Analytics ---

async function loadAnalytics() {
    const counts = await api("/api/analytics");
    for (const [key, element] of Object.entries(elements.stats)) {
        element.textContent = counts[key] ?? 0;
    }
}

// --- Leads table ---

async function loadLeads() {
    const leads = await api("/api/leads");
    elements.leadsBody.replaceChildren(...leads.map(buildLeadRow));
    elements.emptyState.hidden = leads.length > 0;
}

function buildLeadRow(lead) {
    const row = document.createElement("tr");
    row.append(
        buildLeadCell(lead),
        buildStatusCell(lead),
        buildMessageCell(lead),
        buildReplyCell(lead),
        buildActionsCell(lead),
    );
    return row;
}

function buildLeadCell(lead) {
    const cell = document.createElement("td");

    const link = document.createElement("a");
    link.className = "lead-name";
    link.href = lead.profile_url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = lead.name || profileSlug(lead.profile_url);
    cell.append(link);

    if (lead.headline) {
        const headline = document.createElement("div");
        headline.className = "lead-headline";
        headline.textContent = lead.headline;
        cell.append(headline);
    }
    return cell;
}

function buildStatusCell(lead) {
    const cell = document.createElement("td");
    const badge = document.createElement("span");
    badge.className = `badge badge-${lead.status}`;
    badge.textContent = lead.status;
    cell.append(badge);

    if (lead.status === "failed" && lead.error) {
        const error = document.createElement("div");
        error.className = "error-text";
        error.textContent = lead.error;
        cell.append(error);
    }
    return cell;
}

function buildMessageCell(lead) {
    const cell = document.createElement("td");
    cell.className = "message-cell";
    if (lead.message) {
        cell.textContent = lead.message;
    } else {
        cell.append(mutedText("Not generated yet"));
    }
    return cell;
}

function buildReplyCell(lead) {
    const cell = document.createElement("td");
    if (!lead.reply_text) {
        cell.append(mutedText("—"));
        return cell;
    }

    const date = document.createElement("span");
    date.className = "reply-date";
    date.textContent = lead.replied_at ? `Replied ${formatDate(lead.replied_at)}` : "";

    // Short replies are shown in full; long ones get a click-to-expand preview.
    if (lead.reply_text.length <= SHORT_REPLY_CHARS) {
        const reply = document.createElement("div");
        reply.className = "reply";
        const text = document.createElement("p");
        text.className = "reply-full";
        text.textContent = lead.reply_text;
        reply.append(text, date);
        cell.append(reply);
        return cell;
    }

    const details = document.createElement("details");
    details.className = "reply";

    const summary = document.createElement("summary");
    const preview = document.createElement("span");
    preview.className = "reply-preview";
    preview.textContent = lead.reply_text;
    const toggle = document.createElement("span");
    toggle.className = "reply-toggle";
    toggle.textContent = "Show less";
    summary.append(preview, toggle);

    const fullText = document.createElement("p");
    fullText.className = "reply-full";
    fullText.textContent = lead.reply_text;

    details.append(summary, fullText, date);
    cell.append(details);
    return cell;
}

function buildActionsCell(lead) {
    const cell = document.createElement("td");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "button button-link";
    button.textContent = "Remove";
    button.addEventListener("click", () => removeLead(lead));
    cell.append(button);
    return cell;
}

function mutedText(text) {
    const span = document.createElement("span");
    span.className = "muted";
    span.textContent = text;
    return span;
}

function profileSlug(url) {
    const match = url.match(/\/in\/([^/]+)/);
    return match ? match[1] : url;
}

function formatDate(isoString) {
    return new Date(isoString).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
    });
}

async function refreshData() {
    try {
        await Promise.all([loadAnalytics(), loadLeads()]);
    } catch (error) {
        showMessage(`Could not load data: ${error.message}`, true);
    }
}

// --- Background tasks (dispatch / sync) ---

function renderTaskStatus(status) {
    const isRunning = Boolean(status.running);
    elements.dispatchButton.disabled = isRunning;
    elements.syncButton.disabled = isRunning;
    elements.taskStatus.classList.toggle("is-running", isRunning);

    if (isRunning) {
        const label = status.running === "sync" ? "Syncing inbox…" : "Dispatching…";
        elements.taskStatus.textContent = label;
    } else {
        elements.taskStatus.textContent = "Idle";
    }
}

function describeFinishedTask(lastRun) {
    if (lastRun.error) {
        return `${capitalize(lastRun.name)} failed: ${lastRun.error}`;
    }
    const result = lastRun.result || {};
    if (lastRun.name === "sync") {
        return `Sync finished: ${result.accepted ?? 0} newly accepted, ${result.replied ?? 0} new replies.`;
    }
    return `Dispatch finished: ${result.sent ?? 0} sent, ${result.failed ?? 0} failed.`;
}

function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

async function pollTaskStatus() {
    try {
        const status = await api("/api/tasks/status");
        renderTaskStatus(status);

        if (status.running) {
            watchingTask = true;
            await refreshData(); // show progress as leads change
            pollTimer = setTimeout(pollTaskStatus, POLL_INTERVAL_MS);
            return;
        }

        pollTimer = null;
        await refreshData();
        if (watchingTask && status.last_run) {
            watchingTask = false;
            showMessage(describeFinishedTask(status.last_run), Boolean(status.last_run.error));
        }
    } catch (error) {
        pollTimer = null;
        showMessage(`Lost contact with the server: ${error.message}`, true);
    }
}

async function startTask(path, startedText) {
    hideMessage();
    try {
        await api(path, { method: "POST" });
        watchingTask = true;
        showMessage(startedText);
    } catch (error) {
        // 409 means the other browser task is still running.
        showMessage(error.message, true);
    }
    if (pollTimer === null) {
        pollTaskStatus();
    }
}

// --- Event handlers ---

elements.syncButton.addEventListener("click", () => {
    startTask("/api/sync", "Syncing inbox… a browser window will open.");
});

elements.dispatchButton.addEventListener("click", () => {
    startTask("/api/dispatch", "Dispatching connection requests… a browser window will open.");
});

elements.retryButton.addEventListener("click", async () => {
    try {
        const result = await api("/api/leads/retry-failed", { method: "POST" });
        showMessage(`${result.requeued} failed lead(s) moved back to pending.`);
        await refreshData();
    } catch (error) {
        showMessage(error.message, true);
    }
});

elements.addLeadsForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const urls = elements.leadUrls.value.split(/\s+/).filter(Boolean);
    if (urls.length === 0) {
        return;
    }

    try {
        const result = await api("/api/leads", {
            method: "POST",
            body: JSON.stringify({ urls }),
        });
        let text = `Added ${result.added} lead(s).`;
        if (result.duplicates) text += ` ${result.duplicates} already in the list.`;
        if (result.invalid.length) text += ` Skipped ${result.invalid.length} invalid URL(s).`;
        showMessage(text, result.invalid.length > 0 && result.added === 0);
        elements.leadUrls.value = "";
        await refreshData();
    } catch (error) {
        showMessage(error.message, true);
    }
});

async function removeLead(lead) {
    const label = lead.name || profileSlug(lead.profile_url);
    if (!confirm(`Remove ${label} from the list?`)) {
        return;
    }
    try {
        await api(`/api/leads/${lead.id}`, { method: "DELETE" });
        await refreshData();
    } catch (error) {
        showMessage(error.message, true);
    }
}

// --- Start up ---

refreshData();
pollTaskStatus();
