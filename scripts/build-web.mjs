import { cp, mkdir, rm } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const output = new URL("../www/", import.meta.url);
const entries = ["index.html", "manifest.json", "service-worker.js", "css", "js", "icons"];

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const entry of entries) {
  await cp(new URL(entry, root), new URL(entry, output), { recursive: true });
}
console.log("AstralWorld web assets copied to www/");
