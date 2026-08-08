import { readFileSync, readdirSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const REGISTRY_URL =
  "https://raw.githubusercontent.com/AlexAlvarezGallardo-GitHub/Aegis/main/docs/architecture/platform-registry.json";

const issues = [];

function readSources(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || entry.name === "node_modules" || entry.name === "dist") continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) readSources(full, out);
    else if (/\.(astro|ts|tsx)$/.test(entry.name)) out.push(full);
  }
  return out;
}

async function loadRegistry() {
  const res = await fetch(REGISTRY_URL, { redirect: "follow" });
  if (!res.ok) {
    console.error(`WARN: cannot fetch registry from ${REGISTRY_URL} (HTTP ${res.status}); using defaults`);
    return {
      platform: {
        forbiddenClaimPhrases: [
          "enterprise-grade financial platform",
          "multi-tenant financial platform",
          "cryptographically-linked audit",
          "no manual deployments exist",
          "real SaaS company",
        ],
      },
      artifacts: { backendServices: [{ id: "fraud" }, { id: "audit" }, { id: "reporting" }] },
    };
  }
  return res.json();
}

const registry = await loadRegistry();
const files = readSources(join(ROOT, "src"));
const forbidden = (registry.platform?.forbiddenClaimPhrases ?? []).map((p) => p.toLowerCase());
for (const file of files) {
  const content = readFileSync(file, "utf-8");
  const lower = content.toLowerCase();
  for (const phrase of forbidden) {
    if (lower.includes(phrase)) {
      issues.push(`forbidden claim "${phrase}" found in ${file.replace(ROOT + "\\", "")}`);
    }
  }
}

const siteTs = readFileSync(join(ROOT, "src", "data", "site.ts"), "utf-8");
const serviceStatus = {};
const serviceRe = /name: '([^']+)',\s*\n\s*status: '([^']+)'/g;
let m;
while ((m = serviceRe.exec(siteTs)) !== null) serviceStatus[m[1].toLowerCase()] = m[2];

const expected = { fraud: "Built", reporting: "Partial" };
for (const [svc, status] of Object.entries(expected)) {
  if (serviceStatus[svc] !== status) {
    issues.push(`site.ts: ${svc} status is "${serviceStatus[svc] ?? "missing"}", expected "${status}"`);
  }
}

const hero = readFileSync(join(ROOT, "src", "components", "Hero.astro"), "utf-8");
const heroMatch = /data-target="(\d+)"/.exec(hero);
const expectedServices = registry.artifacts?.backendServices?.length ?? 6;
if (heroMatch && Number(heroMatch[1]) !== expectedServices) {
  issues.push(`Hero.astro services counter is ${heroMatch[1]}, registry declares ${expectedServices} backend services`);
}

if (issues.length === 0) {
  console.log("OK: portfolio aligned with Aegis platform-registry.json");
} else {
  console.log(`DRIFT: ${issues.length} issue(s) found`);
  for (const issue of issues) console.log(`  - ${issue}`);
  process.exitCode = 1;
}
