import { cp, mkdir, readdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'www');
const excludedDirectories = new Set(['.git', 'node_modules', 'android', 'www', '.github', 'scripts']);
const excludedFiles = new Set(['README.md', 'package.json', 'package-lock.json', 'capacitor.config.ts', '.gitignore']);

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const entry of await readdir(root, { withFileTypes: true })) {
  if (entry.isDirectory()) {
    if (!excludedDirectories.has(entry.name)) {
      await cp(path.join(root, entry.name), path.join(output, entry.name), { recursive: true });
    }
  } else if (!excludedFiles.has(entry.name) && !entry.name.startsWith('.')) {
    await cp(path.join(root, entry.name), path.join(output, entry.name));
  }
}

console.log('AstralWorld web assets prepared in ./www');
