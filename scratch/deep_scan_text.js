const fs = require('fs');
const path = require('path');

function getAllFiles(dir, exts = ['.tsx']) {
  let files = [];
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      if (!['node_modules', '.next', '.git'].includes(item)) {
        files = files.concat(getAllFiles(full, exts));
      }
    } else if (exts.includes(path.extname(full))) {
      files.push(full);
    }
  }
  return files;
}

const files = getAllFiles('./src');

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const relPath = path.relative(process.cwd(), file);
  
  // Clean comments
  const clean = content
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*/g, '');

  // Look for text between > and <
  const matches = [];
  const tagContentRegex = />([^<]+)</g;
  let m;
  while ((m = tagContentRegex.exec(clean)) !== null) {
    const text = m[1].trim();
    // exclude template expressions, single words like numbers or simple icons, or empty
    if (!text || text.startsWith('{') || text.endsWith('}') || text === '&nbsp;' || text === '·' || text === '/' || text === '→' || text === '←') {
      continue;
    }
    // Check if it contains at least one English or Armenian word
    if (/[a-zA-Z\u0530-\u058F]{2,}/.test(text)) {
      // filter out pure css or code snippets
      if (!text.includes('className=') && !text.includes('return ') && !text.includes('const ')) {
        matches.push(text.replace(/\s+/g, ' '));
      }
    }
  }

  // Also check string literals in JSX attributes like placeholder, title, aria-label, alt, etc.
  const attrRegex = /\b(placeholder|title|aria-label|label|alt)\s*=\s*["']([^"']+)["']/g;
  let am;
  while ((am = attrRegex.exec(clean)) !== null) {
    const val = am[2].trim();
    if (/[a-zA-Z\u0530-\u058F]{2,}/.test(val)) {
      // ignore pure icon names or technical strings if any
      matches.push(`[${am[1]}] ${val}`);
    }
  }

  if (matches.length > 0) {
    console.log(`\n========================================`);
    console.log(`${relPath} (${matches.length} matches):`);
    console.log(`========================================`);
    for (const item of matches) {
      console.log(`  - ${item}`);
    }
  }
}
