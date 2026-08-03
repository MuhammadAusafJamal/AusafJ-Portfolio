#!/bin/bash
# Claude Code status line: model + context-fill bar + plan usage (5h / weekly) + folder.
# Parses the stdin JSON with Node (jq is not installed on this machine).
#
# Plan-usage (rate_limits) fields only appear for Pro/Max plans and only AFTER the
# first API response in a session; until then each window renders as a dim "-- ".

node -e '
const fs = require("fs");
const os = require("os");
const path = require("path");
let raw = "";
try { raw = fs.readFileSync(0, "utf8"); } catch (e) {}
let j = {};
try { j = JSON.parse(raw); } catch (e) {}

const reset = "\x1b[0m";
const cyan  = "\x1b[36m";
const dim   = "\x1b[90m";
const amber = "\x1b[38;5;172m";
const clamp = (n) => { n = Math.round(n); if (n < 0) n = 0; if (n > 100) n = 100; return n; };
const tone  = (n) => (n >= 80 ? "\x1b[31m" : n >= 50 ? "\x1b[33m" : "\x1b[32m");

const model = (j.model && j.model.display_name) || "Claude";

const dir = (j.workspace && j.workspace.current_dir) || j.cwd || "";
const folder = dir.split(/[\\/]/).filter(Boolean).pop() || "";

// --- context-fill bar ---
const ctx = clamp((j.context_window && j.context_window.used_percentage) || 0);
const width = 10;
let filled = Math.round((ctx * width) / 100);
if (filled > width) filled = width;
if (filled < 0) filled = 0;
const bar = "#".repeat(filled) + "-".repeat(width - filled);
const ctxStr = tone(ctx) + "[" + bar + "] " + ctx + "%ctx" + reset;

// --- plan usage: 5-hour rolling window + 7-day (weekly) window ---
const rl = j.rate_limits || {};
const win = (obj, label) => {
  if (obj && typeof obj.used_percentage === "number") {
    const p = clamp(obj.used_percentage);
    return tone(p) + label + " " + p + "%" + reset;
  }
  return dim + label + " --" + reset;
};
const usageStr = win(rl.five_hour, "5h") + dim + " · " + reset + win(rl.seven_day, "wk");

// --- caveman mode badge (mirrors caveman-statusline.ps1) ---
// Reads the same flag files the plugin writes. Both are size-capped and
// stripped of control bytes so a tampered flag cannot emit escape sequences.
const claudeDir = process.env.CLAUDE_CONFIG_DIR || path.join(os.homedir(), ".claude");
const readFlag = (name, max) => {
  try {
    const p = path.join(claudeDir, name);
    const st = fs.lstatSync(p);
    if (st.isSymbolicLink() || st.size > max) return "";
    return fs.readFileSync(p, "utf8").split("\n")[0].trim();
  } catch (e) { return ""; }
};

const VALID = ["off","lite","full","ultra","wenyan-lite","wenyan","wenyan-full","wenyan-ultra","commit","review","compress"];
let cavemanStr = "";
const mode = readFlag(".caveman-active", 64).toLowerCase().replace(/[^a-z0-9-]/g, "");
if (VALID.includes(mode)) {
  cavemanStr = amber + (mode === "full" ? "[CAVEMAN]" : "[CAVEMAN:" + mode.toUpperCase() + "]") + reset;
  if (process.env.CAVEMAN_STATUSLINE_SAVINGS !== "0") {
    const savings = readFlag(".caveman-statusline-suffix", 64).replace(/[\x00-\x1F]/g, "");
    if (savings) cavemanStr += " " + amber + savings + reset;
  }
  cavemanStr += "  ";
}

process.stdout.write(
  cavemanStr +
  cyan + model + reset + "  " +
  ctxStr + "  " +
  usageStr + "  " +
  "📁 " + folder
);
'
