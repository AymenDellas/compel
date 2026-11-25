## Compel video outreach

Open `/outreach` to publish and manage prospect videos. Enter a name, select an H.264 MP4, and click **Publish**. Compel uses a frame from the video unless you upload a thumbnail. **Copy link** shares an unlisted name-based address such as `https://getcompel.co/watch/sam-taylor`. Existing UUID links remain valid. Names in links stay fixed after publication. **Preview** opens an admin-only view with analytics disabled.

1. Create a Neon Postgres database and run [the initial outreach migration](data/migrations/001_video_outreach.sql) and [the page links migration](data/migrations/002_outreach_page_links.sql) in order in its SQL Editor. For an existing installation, apply the page links migration before deploying the name-based URLs. Set `OUTREACH_DATABASE_URL` to its connection string in Vercel.
2. Create a private Cloudflare R2 Standard bucket with public access disabled. Create an R2 **Object Read & Write** API token scoped to that bucket and set the four `OUTREACH_R2_*` variables in [the environment template](.env.outreach.example).
3. Set the bucket CORS policy below. Add the exact preview or local origin when using a separate test database and bucket. For local S3-compatible storage, set `OUTREACH_STORAGE_ENDPOINT` to its HTTP origin and use its credentials in the corresponding R2 variables.
4. Set `OUTREACH_ADMIN_PASSWORD` to a unique random passphrase of at least 24 characters. Generate a separate random value of at least 32 characters for `OUTREACH_SIGNING_SECRET`. Set another separate random secret as `CRON_SECRET` for daily cleanup. Run `node -e "console.log(require('node:crypto').randomBytes(32).toString('base64url'))"` once per secret. In local development, put the variables in `.env.local`.
5. Deploy on the existing Vercel project. Open `/outreach` on the deployment and confirm that a test upload can be watched from the copied link in a signed-out browser. Confirm that the preview leaves the counters unchanged, and that deleting the test page revokes the watch link.

```json
[
  {
    "AllowedOrigins": ["https://getcompel.co"],
    "AllowedMethods": ["GET", "HEAD", "PUT"],
    "AllowedHeaders": ["Content-Type", "Cache-Control", "If-None-Match", "Range"],
    "MaxAgeSeconds": 3600
  }
]
```

- Video files upload and play directly from the private R2 bucket. Uploads accept MP4s up to 500 MiB. H.264 video with AAC audio and a fast-start MP4 export gives the broadest browser support. The browser generates and sizes thumbnails locally, and video bytes start loading when the viewer presses play.
- A visit is counted when a viewer opens the page in a visible browser tab. Plays include starts and replays after the end. Watch time measures elapsed playback time. Best completion measures the largest share of the video watched in one visit and excludes skipped sections. Visits and last activity span the lifetime of the link. Video metrics reflect the current upload.
- Anyone holding a watch link can open it. Replacing or deleting a video stops new playback through the previous media endpoint immediately. Previously issued storage links can continue to work for up to 15 minutes. The daily Vercel job deletes retired and expired uploads and prunes old sign-in attempts.
- Provider references are the [Neon serverless driver](https://neon.com/docs/serverless/serverless-driver), [R2 presigned URLs](https://developers.cloudflare.com/r2/api/s3/presigned-urls/), and [R2 CORS configuration](https://developers.cloudflare.com/r2/buckets/cors/).

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
