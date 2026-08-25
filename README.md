
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

