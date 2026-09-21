# Decisions Log

| Date       | Decision | Rationale |
| ---------- | -------- | --------- |
| 2026-09-21 | Money stored as Number in rupees with 2 decimals max | Consistent with spec constraint, handled by shared `toMoney()` helper. |
| 2026-09-21 | Vite SPA with Prerendering | Met Phase 0 and spec instructions; Next.js SSR can be considered in v2. |
