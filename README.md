
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

