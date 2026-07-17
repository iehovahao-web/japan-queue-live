# Japan Queue Live (JQL)

A premium, multilingual public queue dashboard for Japan.

## Current MVP

- Osaka Immigration Bureau — Permission counter
- Official-source synchronization
- User-entered ticket number
- Remaining-number calculation
- Return / urgent / called status
- Traditional Chinese, Japanese and English
- Installable PWA for iPhone and Android
- Manual fallback when the source is unavailable
- Honest smart estimate: no prediction until sufficient samples exist

## Production architecture

This repository is designed for **Cloudflare Pages**:

- Static frontend: `/`
- Server-side data adapter: `/functions/api/queue.js`
- Official source: `https://omatase10.jp/h81000/`

GitHub Pages alone cannot execute the server-side adapter.

## Deploy to Cloudflare Pages

1. Push these files to the `main` branch.
2. In Cloudflare Dashboard, choose **Workers & Pages → Create → Pages → Connect to Git**.
3. Select `japan-queue-live`.
4. Framework preset: **None**
5. Build command: leave empty.
6. Build output directory: `/`
7. Deploy.

The public API becomes `/api/queue`.

## Data integrity

The product must:

- display the official update time;
- never invent a live call number;
- clearly show connection failures;
- treat on-site screens and announcements as authoritative;
- review source terms and robots policies before scaled commercial use.

## Next milestones

1. Historical snapshot database
2. Proper ETA model with confidence intervals
3. Web Push / LINE notifications
4. Institution adapter registry
5. Admin dashboard and source-health monitoring
6. Privacy policy, terms, incident response and analytics consent
