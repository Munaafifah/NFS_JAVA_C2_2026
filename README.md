
---

## Day 18 Exercise 01 - Frontend Dockerfile

### What Was Added
- Confirmed toolchain versions before starting: Java 21.0.5, Node v24.18.0, npm 11.3.0, Docker 29.7.2, Docker Compose v5.3.1
- Created a multi-stage `Dockerfile` in `frontend/support-desk-ui/`
- Build stage: `node:24-alpine`, runs `npm ci` then `npm run build` to produce the production Vite build in `/app/dist`
- Runtime stage: `nginx:alpine`, copies only the built static files from the build stage via `COPY --from=build /app/dist /usr/share/nginx/html` — no Node, npm, or source code present in the final image
- Confirmed `npm run dev` is never used anywhere in the Dockerfile; the runtime container only ever serves pre-built static files through Nginx
- Adjusted the trainer's example file layout (`Dockerfile` + `frontend/Dockerfile` at repo root) to match the project's actual structure: `support-desk-api/` and `frontend/support-desk-ui/` as separate folders, rather than a nested `frontend/` inside the backend

### GitHub Commit
[https://github.com/Munaafifah/NFS_JAVA_C2_2026/tree/day18](https://github.com/Munaafifah/NFS_JAVA_C2_2026/tree/day18)

---

## Day 18 Exercise 02 - Nginx Config

### What Was Added
- Created `nginx.conf` in `frontend/support-desk-ui/`, proxying `/api/` to the backend service and falling back to `index.html` for React Router routes
- Initial version used a static `proxy_pass http://backend:8081`, which resolves the hostname once at nginx startup — this crashed the container immediately (`host not found in upstream "backend"`) when tested standalone, since `backend` only exists as a resolvable name inside a Compose network
- Fixed by adding `resolver 127.0.0.11 valid=10s;` (Docker's embedded DNS server) combined with a `set $backend_upstream` + `proxy_pass $backend_upstream` pattern, forcing nginx to resolve `backend` per-request instead of at startup. This also protects against a real Compose startup race: even with `depends_on`, the frontend container could otherwise crash if it starts a moment before the backend is ready
- Verified standalone (no Compose network) with `docker build -t support-desk-ui:day18 .` and `docker run --rm --name support-desk-ui-day18 -p 5174:80 support-desk-ui:day18`:
  - Static file serving confirmed: `/`, JS bundle, CSS, and favicon all returned `200`
  - React Router fallback confirmed: navigating to `/login` correctly served `index.html` instead of a 404
  - API proxy correctly failed as expected in this standalone context: attempting login produced a `Connection refused` resolving `backend` via `127.0.0.11:53`, since no Compose network exists yet to make that hostname resolvable — this confirms the proxy config is wired correctly and only needs Exercise 3's network to complete the picture

### GitHub Commit
[https://github.com/Munaafifah/NFS_JAVA_C2_2026/tree/day18](https://github.com/Munaafifah/NFS_JAVA_C2_2026/tree/day18)

---

## Day 18 Exercise 03 - Compose File

### What Was Added
- Created `compose.yaml` and `mongo-init.js` at the repo root (`NFS_JAVA_C2_2026/`), defining three services: `mongo`, `backend`, `frontend`
- All container-to-container communication uses Compose service names, not `localhost` — the backend connects via `MONGODB_HOST: mongo`, and Nginx proxies via `http://backend:8081`
- `mongo-init.js` creates the same `support_app_user` account (scoped to `support_desk_db` only, not root/admin) that the local database already uses, so a fresh Compose volume ends up matching local dev
- Mapped Mongo's container port to host port `27018` instead of `27017`, deliberately avoiding a collision with the native local MongoDB service already running on the host
- Added healthchecks for all three services with `depends_on: condition: service_healthy`, so `backend` waits for Mongo to respond to a ping, and `frontend` waits for the backend's port to be open, before starting
- **Debugged a false-negative healthcheck:** the frontend container was reported `unhealthy` even though the app worked correctly end-to-end in the browser. `docker inspect` showed a consistent `wget: can't connect to remote host: Connection refused` since startup. Root cause: `wget http://localhost/` inside the container likely resolved to the IPv6 loopback (`::1`), which `nginx.conf`'s `listen 80;` doesn't bind, while Docker's port mapping talks to the container over IPv4 directly (explaining why the browser worked fine). Fixed by pointing the healthcheck at `http://127.0.0.1/` explicitly instead of `localhost`
- Verified the full stack end to end: brought up all three containers with `docker compose up --build`, confirmed `docker compose ps` shows all three as `running (healthy)`, hit `GET /api/readiness` directly against the backend (`200 READY`), and logged in through the browser at `http://localhost:5174` — successfully reached the protected dashboard, proving frontend → Nginx → backend → MongoDB all connected correctly through the Compose network

### Output Screenshot
![Docker Compose ps output](screenshots/Day18/D18_Exercise03a.png)
![Support Desk dashboard running via Compose](screenshots/Day18/D18_Exercise03b.png)

### GitHub Commit
[https://github.com/Munaafifah/NFS_JAVA_C2_2026/tree/day18](https://github.com/Munaafifah/NFS_JAVA_C2_2026/tree/day18)

---

