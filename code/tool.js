#!/usr/bin/env node
/**
 * export-subsession-md.js
 *
 * Export a subsession to Markdown, omitting any part outputs longer than a threshold.
 *
 * Usage:
 *   # install dependency first:
 *   npm install better-sqlite3
 *
 *   # print to stdout (default max length = 80 chars):
 *   node export-subsession-md.js --session ses_3c9cc4315ffeFZhCVMNoAHuVA1
 *
 *   # write to a file and change max length:
 *   node export-subsession-md.js --session ses_3c9cc4315ffeFZhCVMNoAHuVA1 --out ./subsession.md --max 80
 *
 *   # specify DB path:
 *   node export-subsession-md.js --db /path/to/opencode.db --session <SESSION_ID> --out ./subsession.md
 *
 * Behavior:
 *  - Produces a human-friendly markdown file grouping messages and their parts.
 *  - Detects common textual fields (text parts, reasoning, tool output, file text embedded in data: URLs).
 *  - Omits any detected textual output whose character length is greater than --max (default 80).
 *  - For omitted items nothing is printed (no placeholder), but a summary line at the end reports how many parts were skipped.
 *
 * Notes:
 *  - The script only reads the DB and does not access remote or external resources.
 *  - If a part contains nested JSON, we try to extract likely text fields; unknown/long blobs are omitted.
 */

const fs = require("fs");
const os = require("os");
const path = require("path");
const Database = require("better-sqlite3");
const { Buffer } = require("buffer");

function usageAndExit() {
  console.error("Usage: node export-subsession-md.js --session <SESSION_ID> [--db <DB_PATH>] [--out <OUT_PATH>] [--max <MAX_CHARS>]");
  process.exit(1);
}

const argv = process.argv.slice(2);
let dbPath;
let sessionId;
let outPath;
let maxLen = 80;

for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a === "--db" && argv[i + 1]) {
    dbPath = argv[++i];
  } else if ((a === "--session" || a === "-s") && argv[i + 1]) {
    sessionId = argv[++i];
  } else if ((a === "--out" || a === "-o") && argv[i + 1]) {
    outPath = argv[++i];
  } else if ((a === "--max" || a === "-m") && argv[i + 1]) {
    maxLen = Number(argv[++i]) || maxLen;
  } else {
    // ignore unknown flags
  }
}

if (!sessionId) usageAndExit();

if (!dbPath) {
  dbPath = path.join(os.homedir(), ".local", "share", "opencode", "opencode.db");
}

if (!fs.existsSync(dbPath)) {
  console.error(`Database not found at: ${dbPath}`);
  console.error("If your OpenCode data directory is different, pass --db /path/to/opencode.db");
  process.exit(2);
}

function safeParseJson(txt) {
  if (txt === null || txt === undefined) return null;
  if (typeof txt !== "string") return txt;
  try {
    return JSON.parse(txt);
  } catch {
    return txt;
  }
}

function extractTextFromPartData(part) {
  // part is parsed JSON or raw; try to extract most likely textual content.
  // Return string or null if none found / not safe to include.
  if (!part || typeof part !== "object") return null;

  // Text parts
  if (part.type === "text" && typeof part.text === "string") return part.text;

  // Reasoning parts (text)
  if (part.type === "reasoning" && typeof part.text === "string") return part.text;

  // Subtask/Agent parts may have 'prompt' or 'source.value'
  if (part.type === "subtask" && typeof part.prompt === "string") return part.prompt;
  if (part.type === "agent" && part.source && typeof part.source.value === "string") return part.source.value;

  // Tool parts
  if (part.type === "tool") {
    // tool outputs are usually in state.output or state.metadata.output
    if (part.state && typeof part.state.output === "string") return part.state.output;
    if (part.state && part.state.metadata && typeof part.state.metadata.output === "string") return part.state.metadata.output;
    // some tools include textual result in state.metadata.result or similar - try a few guesses
    if (part.state && part.state.metadata) {
      for (const k of ["result", "text", "stdout", "stderr"]) {
        if (typeof part.state.metadata[k] === "string") return part.state.metadata[k];
      }
    }
  }

  // File parts (data: URLs or text embedded)
  if (part.type === "file" && typeof part.url === "string") {
    if (part.url.startsWith("data:")) {
      // data:MIME;base64,<data>
      const match = part.url.match(/^data:([^;]+);base64,(.*)$/);
      if (match) {
        const mime = match[1];
        const b64 = match[2];
        // Only attempt to decode text-like MIME types
        if (mime.startsWith("text/") || mime === "application/json" || mime === "application/javascript") {
          try {
            const decoded = Buffer.from(b64, "base64").toString("utf8");
            return decoded;
          } catch {
            return null;
          }
        }
      }
    }
    // If it's a file:// URL or http(s) we do not fetch content; return filename if present
    if (part.filename && typeof part.filename === "string") return `(file) ${part.filename}`;
    return null;
  }

  // Fallback: check common string fields
  for (const key of ["text", "output", "value", "content", "prompt", "description"]) {
    if (typeof part[key] === "string") return part[key];
  }

  return null;
}

const db = new Database(dbPath, { readonly: true, fileMustExist: true });

// Fetch session row
const sessionRow = db.prepare("SELECT * FROM session WHERE id = ?").get(sessionId);
if (!sessionRow) {
  console.error(`Session not found: ${sessionId}`);
  process.exit(3);
}

// Fetch messages for session
const messagesRows = db
  .prepare("SELECT id, data, time_created, time_updated FROM message WHERE session_id = ? ORDER BY time_created")
  .all(sessionId);

// Pre-fetch all parts for these messages in a single query
const messageIds = messagesRows.map((m) => m.id);
let partsByMessage = new Map();
if (messageIds.length > 0) {
  const placeholders = messageIds.map(() => "?").join(",");
  const partsRows = db
    .prepare(`SELECT id, message_id, data, time_created, time_updated FROM part WHERE message_id IN (${placeholders}) ORDER BY time_created`)
    .all(...messageIds);

  for (const p of partsRows) {
    if (!partsByMessage.has(p.message_id)) partsByMessage.set(p.message_id, []);
    partsByMessage.get(p.message_id).push(p);
  }
}

let skippedParts = 0;
let totalParts = 0;

function mdEscape(text) {
  // simple escape for triple backticks in code blocks
  return text.replace(/```/g, "``\\`");
}

function renderMessageToMarkdown(m) {
  const info = safeParseJson(m.data) || {};
  const role = info.role || (info.id && info.id.startsWith("user") ? "user" : info.role || "assistant");
  const agent = info.agent ? ` — agent: ${info.agent}` : "";
  const modelStr =
    info.model || (info.providerID && info.modelID)
      ? ` — model: ${info.providerID ?? info.model?.providerID}/${info.modelID ?? info.model?.modelID ?? ""}`
      : "";
  const time = m.time_created ? new Date(m.time_created).toISOString() : "";

  let md = `\n\n## Message ${m.id}\n\n- role: **${role}**${agent}${modelStr}\n- time: ${time}\n\n`;

  const parts = partsByMessage.get(m.id) || [];
  if (parts.length === 0 && Array.isArray(info.parts) && info.parts.length) {
    // fallback: sometimes message.data already contains parts array
    // but to be safe we won't duplicate; prefer DB part rows when available.
  }

  for (const pRow of parts) {
    totalParts++;
    const raw = safeParseJson(pRow.data);
    const partType = raw?.type || "(unknown)";
    const partTime = pRow.time_created ? new Date(pRow.time_created).toISOString() : "";
    const extracted = extractTextFromPartData(raw);

    // If we found textual content, check the length threshold
    if (extracted && typeof extracted === "string") {
      if (extracted.length > maxLen) {
        skippedParts++;
        continue; // omit this part entirely
      }
      // include textual part in markdown as a fenced code block for readability
      md += `### Part ${pRow.id} — ${partType} — ${partTime}\n\n`;
      md += "```text\n";
      md += mdEscape(extracted) + "\n";
      md += "```\n\n";
    } else {
      // No textual content discovered or content is non-text; include a small summary instead
      // For file parts include filename and URL (but do not fetch file contents)
      if (partType === "file" && raw && raw.filename) {
        md += `### Part ${pRow.id} — file — ${partTime}\n\n`;
        md += `- filename: \`${raw.filename}\`\n`;
        if (raw.url) md += `- url: \`${raw.url}\`\n`;
        md += "\n";
      } else if (partType === "tool" && raw && raw.tool) {
        // If a tool part had no string we could include metadata (short)
        md += `### Part ${pRow.id} — tool (${raw.tool}) — ${partTime}\n\n`;
        // attempt to include short metadata if present and short enough
        let metaStr = null;
        try {
          const meta = raw.state && raw.state.metadata ? raw.state.metadata : null;
          if (meta) {
            const s = typeof meta === "string" ? meta : JSON.stringify(meta);
            if (s.length <= maxLen) metaStr = s;
          }
        } catch {}
        if (metaStr) {
          md += "```json\n" + mdEscape(metaStr) + "\n```\n\n";
        } else {
          md += "- (no short textual output available or output omitted)\n\n";
        }
      } else {
        // Generic fallback: include a short JSON summary if small enough
        let small = null;
        try {
          const s = JSON.stringify(raw);
          if (s && s.length <= maxLen) small = s;
        } catch {}
        md += `### Part ${pRow.id} — ${partType} — ${partTime}\n\n`;
        if (small) {
          md += "```json\n" + mdEscape(small) + "\n```\n\n";
        } else {
          md += "- (no textual content or content too large/complex; omitted)\n\n";
        }
      }
    }
  }

  return md;
}

// Build markdown
let out = `# Export: session ${sessionId}\n\n`;
out += `title: ${sessionRow.title || ""}\n`;
out += `directory: ${sessionRow.directory || ""}\n`;
out += `created: ${sessionRow.time_created ? new Date(sessionRow.time_created).toISOString() : ""}\n`;
out += `updated: ${sessionRow.time_updated ? new Date(sessionRow.time_updated).toISOString() : ""}\n`;
out += `\n---\n`;

// Append messages
for (const m of messagesRows) {
  out += renderMessageToMarkdown(m);
}

out += `\n---\n\n`;
out += `Export summary:\n\n- messages: ${messagesRows.length}\n- total parts encountered: ${totalParts}\n- parts omitted (length > ${maxLen}): ${skippedParts}\n`;

if (outPath) {
  fs.writeFileSync(outPath, out, "utf8");
  console.log(`Wrote Markdown export to ${outPath}`);
} else {
  console.log(out);
}