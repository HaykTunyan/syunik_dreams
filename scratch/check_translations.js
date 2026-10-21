const fs = require('fs');
const path = require('path');
const en = require('../messages/en.json');
const hy = require('../messages/hy.json');

function getAllFiles(dir, exts = ['.tsx', '.ts']) {
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
const missingKeys = [];

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  // Find t declarations: const t = useTranslations("...") or const tFoo = useTranslations("...")
  const tVarRegex = /(?:const|let)\s+([a-zA-Z0-9_]+)\s*=\s*(?:await\s+)?(?:useTranslations|getTranslations)\(\s*['"]([^'"]*)['"]\s*\)/g;
  let match;
  const tVars = {};
  while ((match = tVarRegex.exec(content)) !== null) {
    tVars[match[1]] = match[2];
  }

  for (const [varName, ns] of Object.entries(tVars)) {
    // Search for varName("key") or varName('key')
    const callRegex = new RegExp(`\\b${varName}\\(\\s*['"]([^'"$\`]+)['"]\\s*\\)`, 'g');
    let cMatch;
    while ((cMatch = callRegex.exec(content)) !== null) {
      const key = cMatch[1];
      const fullPath = ns ? `${ns}.${key}` : key;
      const parts = fullPath.split('.');
      
      const checkObj = (obj) => {
        let cur = obj;
        for (const p of parts) {
          if (!cur || cur[p] === undefined) return false;
          cur = cur[p];
        }
        return true;
      };

      if (!checkObj(en)) {
        missingKeys.push({ file, varName, fullPath, lang: 'en' });
      }
      if (!checkObj(hy)) {
        missingKeys.push({ file, varName, fullPath, lang: 'hy' });
      }
    }
  }
}

console.log('Missing literal t keys found:', missingKeys.length);
const seen = new Set();
for (const m of missingKeys) {
  const k = `${m.lang}: ${m.fullPath}`;
  if (!seen.has(k)) {
    seen.add(k);
    console.log(k, `(used in ${path.relative(process.cwd(), m.file)})`);
  }
}
