# Deployment Guide - Node.js Version Fix

## Issue
The build was failing due to Node.js v22.x compatibility issues with some dependencies.

## Solution Applied

### 1. Node Version Configuration Files Created

**`.nvmrc`** - For NVM users and many deployment platforms:
```
20
```

**`.node-version`** - For deployment platforms that read this file:
```
20
```

### 2. Package.json Updated

Added `engines` field to specify Node.js version:
```json
"engines": {
  "node": ">=20.x"
}
```

### 3. Netlify Configuration

Created `netlify.toml` with Node 20 specified:
```toml
[build.environment]
  NODE_VERSION = "20"
```

### 4. Vercel Configuration

Updated `vercel.json` to use Node 20:
```json
"functions": {
  "app/**/*.{js,ts,tsx}": {
    "runtime": "nodejs20.x"
  }
}
```

## Deployment Platforms

### Vercel (Recommended)
- Auto-deploys from GitHub
- Reads `.nvmrc` and `package.json` engines
- Configuration: `vercel.json`
- Should work automatically now

### Netlify
- Configuration: `netlify.toml`
- Explicitly set to Node 20
- Install Netlify plugin: `@netlify/plugin-nextjs`

### Other Platforms

**Railway**:
```
# Uses .nvmrc automatically
```

**Render**:
```yaml
# render.yaml
services:
  - type: web
    env: node
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_VERSION
        value: 20
```

**Fly.io**:
```dockerfile
# Dockerfile
FROM node:20-alpine
```

## Local Development

If you want to use Node 20 locally:

```bash
# Using NVM
nvm install 20
nvm use 20

# Using n
n 20

# Verify
node --version  # Should show v20.x.x
```

## Why Node 20?

- **React 19**: Works best with Node 18+ (Node 20 LTS recommended)
- **Next.js 15**: Officially supports Node 18.17+, Node 20 is stable
- **TypeScript 5**: Compatible with Node 20
- **Dependency Compatibility**: Most packages in this project are compatible with Node 20

## Troubleshooting

### Build Still Failing?

1. **Clear Build Cache**:
   - Vercel: Settings → Build & Development → Clear Cache
   - Netlify: Deploys → Trigger Deploy → Clear cache and deploy

2. **Check Build Logs** for specific errors

3. **Verify Node Version** in build logs - should show v20.x.x

4. **Manual Deployment**:
   ```bash
   # Test build locally
   npm install
   npm run build
   
   # If successful, commit and push
   git add -A
   git commit -m "fix: node version configuration"
   git push
   ```

### Dependencies Issues

If specific packages fail:

1. **Update Dependencies**:
   ```bash
   npm update
   npm audit fix
   ```

2. **Check Package Compatibility**:
   ```bash
   npx npm-check-updates
   ```

3. **Remove Lock File** (last resort):
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

## Build Commands

### Development
```bash
npm run dev
```

### Production Build (Test Locally)
```bash
npm run build
npm start
```

### Lint Check
```bash
npm run lint
```

## Environment Variables

Make sure these are set in your deployment platform:

**Required**:
- `NEXT_PUBLIC_SITE_URL` - Your deployed URL
- `NEXT_PUBLIC_SITE_NAME` - "Base Ninja"

**Optional** (for Farcaster features):
- `NEXT_PUBLIC_NEYNAR_API_KEY`
- `KV_REST_API_READ_ONLY_TOKEN`
- `KV_REST_API_TOKEN`
- `KV_REST_API_URL`
- `KV_URL`

## Success Indicators

Build should show:
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Creating an optimized production build
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization
```

## Next Steps After Successful Deployment

1. ✅ Verify the app loads at your deployment URL
2. ✅ Test game functionality
3. ✅ Deploy smart contract (see `DEPLOY_CONTRACT.md`)
4. ✅ Update contract address in `src/lib/contract.ts`
5. ✅ Test NFT minting feature

## Platform-Specific Notes

### Vercel
- ✅ Best for Next.js
- ✅ Auto-detects framework
- ✅ Fast global CDN
- ✅ Easy environment variable management

### Netlify  
- ✅ Great alternative
- ✅ May need `@netlify/plugin-nextjs`
- ✅ Good for static sites

### Self-Hosted
```bash
# Build
npm run build

# Start
npm start

# Or use PM2
pm2 start npm --name "base-ninja" -- start
```

## Contact & Support

If you continue to have issues:
1. Check GitHub Issues
2. Review deployment platform documentation
3. Ensure all environment variables are set
4. Try deploying to a different platform

---

**Status**: ✅ Node version fixed to v20.x for compatibility
**Last Updated**: October 5, 2025
