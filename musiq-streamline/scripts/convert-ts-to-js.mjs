import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const projectRoot = path.resolve(process.cwd());
const srcRoot = path.join(projectRoot, "src");

/** @param {string} p */
function isInSrc(p) {
  const rel = path.relative(srcRoot, p);
  return !!rel && !rel.startsWith("..") && !path.isAbsolute(rel);
}

/** @param {string} dir */
function walk(dir) {
  /** @type {string[]} */
  const out = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

/**
 * Remove explicit TS/TSX extensions from import/export specifiers.
 * This avoids needing to rewrite every import to .js/.jsx.
 * @param {string} code
 */
function stripTsExtensionsInSpecifiers(code) {
  return code.replace(
    /(from\s+["'][^"']+)\.(ts|tsx)(["'])/g,
    "$1$3"
  ).replace(
    /(import\s+["'][^"']+)\.(ts|tsx)(["'])/g,
    "$1$3"
  ).replace(
    /(export\s+\*\s+from\s+["'][^"']+)\.(ts|tsx)(["'])/g,
    "$1$3"
  );
}

/**
 * @param {string} absPath
 * @returns {"js"|"jsx"|null}
 */
function outExt(absPath) {
  if (absPath.endsWith(".tsx")) return "jsx";
  if (absPath.endsWith(".ts")) return "js";
  return null;
}

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

const files = walk(srcRoot).filter((p) => {
  if (!isInSrc(p)) return false;
  if (p.endsWith(".d.ts")) return false;
  return p.endsWith(".ts") || p.endsWith(".tsx");
});

let converted = 0;
for (const file of files) {
  const ext = outExt(file);
  if (!ext) continue;

  const input = fs.readFileSync(file, "utf8");
  const isTsx = file.endsWith(".tsx");
  const result = ts.transpileModule(input, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.ESNext,
      jsx: ts.JsxEmit.ReactJSX,
      sourceMap: false,
      importsNotUsedAsValues: ts.ImportsNotUsedAsValues.Remove,
    },
    fileName: file,
  });

  const rel = path.relative(srcRoot, file);
  const outRel = rel.replace(/\.tsx?$/, `.${ext}`);
  const outPath = path.join(srcRoot, outRel);

  let output = result.outputText;
  output = stripTsExtensionsInSpecifiers(output);

  ensureDir(outPath);
  fs.writeFileSync(outPath, output, "utf8");
  converted++;
}

console.log(`Converted ${converted} files.`);
