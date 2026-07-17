# Japan Queue Live (JQL)

日本入管即時叫號公共測試版  
日本入管リアルタイム呼出し 公開ベータ版  
Japan Immigration Live Queue · Public Beta

**Version:** V1.1 Public Beta  
**Developer:** Ludwig Cheung  
**First developed:** 2026  
**Live site:** https://japan-queue-live.pages.dev



## About

Japan Queue Live is an independent multilingual public queue information tool for Japan.

It is designed to help users:

- view publicly available queue information;
- select a service category;
- enter their own ticket number;
- calculate how many numbers remain;
- receive a simple queue-status assessment;
- use the service in Traditional Chinese, Japanese, or English.

This project is not affiliated with the Immigration Services Agency of Japan. On-site screens, announcements, and staff instructions always take priority.

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
4. Framework preset: **None**.
5. Build command: leave empty.
6. Build output directory: `.`
7. Deploy.

The public API becomes `/api/queue`.

## Data integrity

The product must:

- display the official update time;
- never invent a live call number;
- clearly show connection failures;
- clearly mark stale data;
- treat on-site screens and announcements as authoritative;
- review source terms and robots policies before scaled commercial use.

## Next milestones

1. Multi-service support for all six Osaka Immigration queue categories
2. Historical snapshot database
3. Proper ETA model with confidence intervals
4. Web Push / LINE notifications
5. Institution adapter registry
6. Admin dashboard and source-health monitoring
7. Privacy policy, terms, incident response, and analytics consent

## Copyright

© 2026 Ludwig Cheung. All rights reserved.

Japan Queue Live and the JQL visual identity were created by Ludwig Cheung.

## License

All rights reserved. No permission is granted to copy, redistribute, modify, or commercially reuse this project without prior written authorization.
