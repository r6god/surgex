// scripts/guard-no-demo.js
const fs = require("fs"); const path = require("path");
const ROOT = process.cwd(); const exts = [".tsx",".ts",".jsx",".js"];
const bad = [/id=["']demo["']/i,/<\s*ProductDemo\b/i,/<\s*DemoMedia\b/i,/<\s*DemoSection\b/i,/\bDEMO_IMAGE\b/,/\bDEMO_EMBED_URL\b/,/Product\s+Demo/i];
function scan(dir){ for(const name of fs.readdirSync(dir)){ const p=path.join(dir,name); const st=fs.statSync(p);
 if(st.isDirectory()){ if(["node_modules",".next",".git"].includes(name)) continue; scan(p); }
 else if(exts.includes(path.extname(name))){ const s=fs.readFileSync(p,"utf8"); const hit=bad.find(re=>re.test(s));
  if(hit){ console.error(`❌ Demo content found in ${p} matching ${hit}`); process.exit(1); } } } }
scan(ROOT); console.log("✔ guard-no-demo.js: no demo code detected");
