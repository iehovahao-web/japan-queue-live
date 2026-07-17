# JQL V1 Beta — Internal Debug Report

## Verdict

**Suitable for limited public beta after deployment validation. Not yet suitable for paid commercial launch.**

## Passed

- JavaScript syntax checks
- Manifest JSON validation
- Official-page parser test using the observed 2026-07-17 page structure
- Defensive parser failure on malformed or implausible data
- Mobile-first responsive layout
- Three-language switching
- Manual fallback
- PWA manifest and service worker
- Honest no-data behavior
- Official update timestamp
- Stale-data blocking
- Privacy notice and beta terms

## Commercial blockers still open

1. Source permission / terms / robots and trademark review
2. Production monitoring and automated incident alerts
3. Historical database for real ETA modelling
4. Real notification delivery (Web Push / LINE)
5. Cross-browser testing on physical iPhone and Android devices
6. Accessibility audit (WCAG 2.2 AA)
7. Security review and rate limiting
8. Business identity, contact channel and legal operator details
9. Analytics consent and retention policy
10. Load testing and source-failure circuit breaker

## Recommended release label

`V1 Beta — Public Test`

Do not market the current ETA as AI. Label it “Smart estimate” until a validated historical model exists.
