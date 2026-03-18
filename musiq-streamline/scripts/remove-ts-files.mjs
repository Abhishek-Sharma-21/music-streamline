import fs from "node:fs";
import path from "node:path";

const projectRoot = path.resolve(process.cwd());

function walk(dir) {
  const out = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

const srcRoot = path.join(projectRoot, "src");
const files = walk(srcRoot).filter(
  (p) =>
    (p.endsWith(".ts") || p.endsWith(".tsx")) &&
    !p.endsWith(".d.ts")
);

for (const f of files) fs.rmSync(f, { force: true });
console.log(`Removed ${files.length} TS/TSX files from src/.`);

