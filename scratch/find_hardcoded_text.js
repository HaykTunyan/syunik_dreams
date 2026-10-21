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
  const lines = content.split('\n');
  const relPath = path.relative(process.cwd(), file);
  const potentialTexts = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Ignore imports, comments, console, className only lines
    const trimmed = line.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) continue;
    if (trimmed.startsWith('import ') || trimmed.startsWith('export type ') || trimmed.startsWith('export interface ')) continue;

    // Check for JSX text: >something< where something has english/armenian letters and isn't just {t(...)}
    const jsxTextMatches = line.match(/>([^<>{}]*[a-zA-Z\u0530-\u058F]{3,}[^<>{}]*)</g);
    if (jsxTextMatches) {
      for (const m of jsxTextMatches) {
        const text = m.slice(1, -1).trim();
        if (text && !text.startsWith('{') && !text.includes('className') && text.length > 2) {
          potentialTexts.push({ line: i + 1, text });
        }
      }
    }

    // Check for placeholder="..." or title="..." or alt="..." or aria-label="..." with plain strings
    const attrMatches = line.match(/\b(placeholder|title|aria-label|label)=["']([^"'{}$]+)["']/g);
    if (attrMatches) {
      for (const m of attrMatches) {
        const val = m.split('=')[1].replace(/["']/g, '').trim();
        if (val && /[a-zA-Z\u0530-\u058F]{3,}/.test(val)) {
          potentialTexts.push({ line: i + 1, text: `[Attr] ${m}` });
        }
      }
    }
  }

  if (potentialTexts.length > 0) {
    console.log(`\n=== ${relPath} (${potentialTexts.length} items) ===`);
    for (const item of potentialTexts.slice(0, 15)) {
      console.log(`  L${item.line}: ${item.text}`);
    }
    if (potentialTexts.length > 15) {
      console.log(`  ... and ${potentialTexts.length - 15} more`);
    }
  }
}
