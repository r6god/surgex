// scripts/fix-fallback.js
const fs = require("fs");
const path = require("path");
const file = path.join(process.cwd(), "app", "page.tsx");
if (!fs.existsSync(file)) process.exit(0);
let text = fs.readFileSync(file, "utf8");
const base64 = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MjAgMTIwIj48cmVjdCB3aWR0aD0iNDIwIiBoZWlnaHQ9IjEyMCIgZmlsbD0ibm9uZSIvPjx0ZXh0IHg9IjIxMCIgeT0iNjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJJbnRlciwgc3lzdGVtLXVpLCAtYXBwbGUtc3lzdGVtLCBTZWdvZSBVSSwgUm9ib3RvLCBVYnVudHUsIENhbnRhcmVsbCwgTm90byBTYW5zLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQ4IiBmb250LXdlaWdodD0iODAwIiBmaWxsPSIjMjJkM2VlIj5TdXJnZVg8L3RleHQ+PC9zdmc+";
const pattern = /const\s+FALLBACK_LOGO_SVG\s*=\s*[^;]+;/m;
if (!pattern.test(text)) process.exit(0);
text = text.replace(pattern, `const FALLBACK_LOGO_SVG = "${base64}";`);
text = text.replace(/utf8",\s*\+\s*encodeURIComponent\(`[\s\S]*?\`\);?/g, "").replace(/^\s*base64,[A-Za-z0-9+/=]+.*$/gm, "");
fs.writeFileSync(file, "utf8"); console.log("✔ fix-fallback.js: normalized FALLBACK_LOGO_SVG");
