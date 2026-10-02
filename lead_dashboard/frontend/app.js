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
    automationStatus: document.getElementById("automation-status"),
    stats: {
        total: document.getElementById("stat-total"),
        pending: document.getElementById("stat-pending"),
        sent: document.getElementById("stat-sent"),
        accepted: document.getElementById("stat-accepted"),
        replied: document.getElementById("stat-replied"),
        emailed: document.getElementById("stat-emailed"),
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
        throw new Error(describeErrorDetail(body.detail) || `Request failed (${response.status})`);
    }
    return body;
}

// FastAPI sends validation errors (422) as a list: turn them into one readable line.
function describeErrorDetail(detail) {
    if (!Array.isArray(detail)) {
        return detail;
    }
    return detail
        .map((item) => {
            const field = (item.loc || []).filter((part) => part !== "body").join(".");
            const text = String(item.msg || "").replace(/^Value error, /, "");
            return field ? `${field.replaceAll("_", " ")}: ${text}` : text;
        })
        .join(" · ");
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

    cell.append(buildEmailLine(lead));
    return cell;
}

function buildEmailLine(lead) {
    const line = document.createElement("div");
    line.className = "lead-email";

    const button = document.createElement("button");
    button.type = "button";
    button.className = "button button-link";
    button.addEventListener("click", () => editEmail(lead));

    if (lead.email) {
        const address = document.createElement("span");
        address.textContent = lead.email;
        button.textContent = "Edit";
        button.setAttribute("aria-label", `Edit email for ${lead.name || profileSlug(lead.profile_url)}`);
        line.append(address, button);
    } else {
        button.textContent = "+ Add email";
        line.append(button);
    }
    return line;
}

async function editEmail(lead) {
    const answer = prompt("Email address for the email fallback (leave empty to remove):", lead.email || "");
    if (answer === null) {
        return; // cancelled
    }
    try {
        await api(`/api/leads/${lead.id}`, {
            method: "PATCH",
            body: JSON.stringify({ email: answer.trim() }),
        });
        await refreshData();
    } catch (error) {
        showMessage(error.message, true);
    }
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

    if (lead.emailed_at) {
        const emailed = document.createElement("span");
        emailed.className = "emailed-note";
        emailed.textContent = `✉ Emailed ${formatDate(lead.emailed_at)}`;
        cell.append(emailed);
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

    renderAutomationStatus(status.scheduler);
}

const JOB_LABELS = { dispatch: "dispatch", sync: "sync" };

function renderAutomationStatus(schedulerStatus) {
    const jobs = (schedulerStatus && schedulerStatus.jobs) || [];
    if (jobs.length === 0) {
        elements.automationStatus.textContent = "Automation is off. Turn it on in Settings.";
        return;
    }
    const parts = jobs
        .filter((job) => job.next_run_at)
        .map((job) => `next ${JOB_LABELS[job.id] || job.id} ${formatTime(job.next_run_at)}`);
    elements.automationStatus.textContent = `Automation on: ${parts.join(" · ")}`;
}

function formatTime(isoString) {
    return new Date(isoString).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
}

function describeFinishedTask(lastRun) {
    if (lastRun.error) {
        return `${capitalize(lastRun.name)} failed: ${lastRun.error}`;
    }
    const result = lastRun.result || {};
    if (lastRun.name === "sync") {
        let text = `Sync finished: ${result.accepted ?? 0} newly accepted, ${result.replied ?? 0} new replies.`;
        if (result.emailed) text += ` ${result.emailed} fallback email(s) sent.`;
        if (result.email_failed) text += ` ${result.email_failed} email(s) failed.`;
        if (result.email_error) text += ` Email fallback problem: ${result.email_error}`;
        return text;
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
            const lastRun = status.last_run;
            const hasProblem = Boolean(lastRun.error || (lastRun.result && lastRun.result.email_error));
            showMessage(describeFinishedTask(lastRun), hasProblem);
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

// --- Settings dialog ---

const settingsElements = {
    dialog: document.getElementById("settings-dialog"),
    form: document.getElementById("settings-form"),
    openButton: document.getElementById("settings-button"),
    error: document.getElementById("settings-error"),
    smtpPasswordStatus: document.getElementById("smtp-password-status"),
    webhookSecretStatus: document.getElementById("webhook-secret-status"),
    placeholderList: document.getElementById("placeholder-list"),
    webhookLog: document.getElementById("webhook-log"),
    testWebhookButton: document.getElementById("test-webhook-button"),
    testWebhookResult: document.getElementById("test-webhook-result"),
    testEmailTo: document.getElementById("test-email-to"),
    testEmailButton: document.getElementById("test-email-button"),
    testEmailResult: document.getElementById("test-email-result"),
};

// Every form control named after a setting, e.g. <input name="smtp_host">.
function settingInputs() {
    return Array.from(settingsElements.form.querySelectorAll("[name]"));
}

function fillSettingsForm(settings) {
    for (const input of settingInputs()) {
        const value = settings[input.name];
        if (input.type === "checkbox") {
            input.checked = Boolean(value);
        } else {
            input.value = value ?? "";
        }
    }
}

function readSettingsForm() {
    const values = {};
    for (const input of settingInputs()) {
        if (input.type === "checkbox") {
            values[input.name] = input.checked;
        } else if (input.type === "number") {
            values[input.name] = Number(input.value);
        } else {
            values[input.name] = input.value;
        }
    }
    return values;
}

function renderSecretStatus(element, isSet, missingText, isOptional = false) {
    element.textContent = isSet ? "set in .env ✓" : missingText;
    if (isSet) {
        element.className = "secret-set";
    } else {
        element.className = isOptional ? "" : "secret-missing";
    }
}

function renderWebhookLog(entries) {
    if (entries.length === 0) {
        const empty = document.createElement("li");
        empty.textContent = "No deliveries yet.";
        settingsElements.webhookLog.replaceChildren(empty);
        return;
    }
    settingsElements.webhookLog.replaceChildren(...entries.map((entry) => {
        const item = document.createElement("li");
        const outcome = entry.ok ? "✓" : "✗";
        item.textContent = `${outcome} ${formatDate(entry.at)} · ${entry.event} · ${entry.detail}`;
        return item;
    }));
}

function renderSettings(response) {
    fillSettingsForm(response.settings);
    renderSecretStatus(settingsElements.smtpPasswordStatus, response.secrets.smtp_password_set,
        "not set. Add SMTP_PASSWORD to .env (only needed if your server requires a login).");
    renderSecretStatus(settingsElements.webhookSecretStatus, response.secrets.webhook_secret_set,
        "Optional: add WEBHOOK_SECRET to .env to sign requests.", true);
    settingsElements.placeholderList.textContent = response.placeholders.map((name) => `{${name}}`).join(", ");
    renderWebhookLog(response.webhook_log);
}

function setTestResult(element, text, isOk) {
    element.textContent = text;
    element.classList.toggle("is-ok", isOk);
    element.classList.toggle("is-error", !isOk);
}

async function openSettings() {
    settingsElements.error.textContent = "";
    settingsElements.testWebhookResult.textContent = "";
    settingsElements.testEmailResult.textContent = "";
    try {
        renderSettings(await api("/api/settings"));
        settingsElements.dialog.showModal();
    } catch (error) {
        showMessage(`Could not load settings: ${error.message}`, true);
    }
}

async function saveSettings(event) {
    event.preventDefault();
    settingsElements.error.textContent = "";

    if (!settingsElements.form.checkValidity()) {
        settingsElements.form.reportValidity();
        return;
    }

    try {
        const response = await api("/api/settings", {
            method: "PUT",
            body: JSON.stringify(readSettingsForm()),
        });
        renderSettings(response);
        settingsElements.dialog.close();
        showMessage("Settings saved.");
        pollTaskStatus(); // refresh the automation schedule line
    } catch (error) {
        settingsElements.error.textContent = error.message;
    }
}

async function sendTestWebhook() {
    const url = settingsElements.form.elements.webhook_url.value.trim();
    if (!url) {
        setTestResult(settingsElements.testWebhookResult, "Enter a webhook URL first.", false);
        return;
    }
    settingsElements.testWebhookButton.disabled = true;
    setTestResult(settingsElements.testWebhookResult, "Sending…", true);
    try {
        const outcome = await api("/api/settings/test-webhook", {
            method: "POST",
            body: JSON.stringify({ url }),
        });
        setTestResult(settingsElements.testWebhookResult,
            outcome.ok ? `Delivered (${outcome.detail})` : `Failed: ${outcome.detail}`, outcome.ok);
        const fresh = await api("/api/settings");
        renderWebhookLog(fresh.webhook_log);
    } catch (error) {
        setTestResult(settingsElements.testWebhookResult, error.message, false);
    } finally {
        settingsElements.testWebhookButton.disabled = false;
    }
}

async function sendTestEmail() {
    const to = settingsElements.testEmailTo.value.trim();
    if (!to) {
        setTestResult(settingsElements.testEmailResult, "Enter an address to send the test to.", false);
        return;
    }
    settingsElements.testEmailButton.disabled = true;
    setTestResult(settingsElements.testEmailResult, "Sending…", true);
    try {
        const result = await api("/api/settings/test-email", {
            method: "POST",
            body: JSON.stringify({ to }),
        });
        setTestResult(settingsElements.testEmailResult, `Sent to ${result.sent_to}`, true);
    } catch (error) {
        setTestResult(settingsElements.testEmailResult, error.message, false);
    } finally {
        settingsElements.testEmailButton.disabled = false;
    }
}

settingsElements.openButton.addEventListener("click", openSettings);
settingsElements.form.addEventListener("submit", saveSettings);
settingsElements.form.addEventListener("input", () => {
    settingsElements.error.textContent = ""; // the old error no longer applies
});
settingsElements.testWebhookButton.addEventListener("click", sendTestWebhook);
settingsElements.testEmailButton.addEventListener("click", sendTestEmail);
for (const button of settingsElements.form.querySelectorAll("[data-close-dialog]")) {
    button.addEventListener("click", () => settingsElements.dialog.close());
}
// Clicking the dimmed backdrop (outside the dialog box) closes it too.
settingsElements.dialog.addEventListener("click", (event) => {
    if (event.target === settingsElements.dialog) {
        settingsElements.dialog.close();
    }
});

// --- Start up ---

refreshData();
pollTaskStatus();

// Pick up scheduled runs (started by the server, not this page) once a minute.
setInterval(() => {
    if (pollTimer === null) {
        pollTaskStatus();
    }
}, 60000);
