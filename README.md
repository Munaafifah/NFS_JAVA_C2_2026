
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

## Day 17 Exercise 02 - Readiness Endpoint

### What Was Added
- Created `ReadinessService.java` in `com.example.supportdesk.service`, which pings MongoDB via `MongoTemplate` and returns whether the database is reachable
- Created `ReadinessController.java` exposing `GET /api/readiness`, returning `200` with `status: "READY"` and `database: "CONNECTED"` when the ping succeeds, or `503 Service Unavailable` with `status: "NOT_READY"` when it fails
- Added `/api/readiness` to the permitted (public) endpoints in `SecurityConfig.java`, matching how `/api/health` is already handled, so the check doesn't require a JWT
- Verified the ready path live: stopped the local MongoDB service, confirmed the app logs connection errors while retrying, then restarted MongoDB and confirmed `/api/readiness` returned `200 READY` again once the connection recovered
- Noted the MongoDB driver's default 30-second server-selection timeout means a brief outage can resolve before the app gives up and returns 503 — currently adjusting `serverSelectionTimeoutMS` in the Mongo connection config so the 503 path responds quickly instead of hanging

### Output Screenshot
![Readiness Endpoint](screenshots/Day17/D17_Exercise02.png)

### GitHub Commit
[https://github.com/Munaafifah/NFS_JAVA_C2_2026/tree/day17](https://github.com/Munaafifah/NFS_JAVA_C2_2026/tree/day17)

---