# SurgeX Build Guards

Drop-in scripts to keep the demo section out and prevent SVG fallback build breaks.

## Install
1. Copy the `scripts/` folder to your repo root.
2. In `package.json`, add:

```json
{
  "scripts": {
    "prebuild": "node scripts/fix-fallback.js && node scripts/guard-no-demo.js",
    "build": "npm run prebuild && next build"
  }
}
```

3. Commit and push. Vercel will run `npm run build`, which runs the guards first.

### What they do
- `fix-fallback.js` — forces a safe base64 `FALLBACK_LOGO_SVG` and removes any accidental concatenations.
- `guard-no-demo.js` — fails the build if any demo code (`#demo`, `DemoMedia`, `DEMO_*`, etc.) reappears.
