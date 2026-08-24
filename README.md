
---

## Day 17 Exercise 01 - Structured Logs and Request Timing

### What Was Added
- Created `RequestLoggingFilter.java` in `com.example.supportdesk.filter`, a servlet filter that logs one structured line per request
- Set `@Order(Ordered.HIGHEST_PRECEDENCE)` so the filter wraps around Spring Security's filter chain, capturing accurate status codes even for requests rejected before reaching a controller
- Logged fields: request ID (short UUID), HTTP method, request path, response status, duration in milliseconds
- Confirmed no password, JWT token, request body, or Authorization header is ever logged
- Verified against a live request with an expired token: `GET /api/tickets` correctly logged `status=401` with accurate timing, proving the filter captures security-layer rejections, not just successful requests

### GitHub Commit
[https://github.com/Munaafifah/NFS_JAVA_C2_2026/tree/day17](https://github.com/Munaafifah/NFS_JAVA_C2_2026/tree/day17)

---
