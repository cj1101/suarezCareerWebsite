# OpenClaw Path Integration (`/openclaw/*`)

This setup keeps the existing website behavior at `/` unchanged, and mounts
OpenClaw Mission Control under `/openclaw/*` on the same production domain:
`https://charlie.suarezhouse.net`.

## Routing targets (EC2 localhost)

- Dashboard (Next.js UI): `127.0.0.1:3000`
- Gateway: `127.0.0.1:18789`
- Router: `127.0.0.1:8787`

## Nginx config

Use `nginx.openclaw-path.conf` in this repository.

Key behaviors:

- `location /` stays as-is for the existing site.
- `location ^~ /openclaw/` proxies dashboard UI to `127.0.0.1:3000`.
- `location = /openclaw/logs/router` proxies SSE to `127.0.0.1:8787/logs/router`.
- `location = /openclaw/logs/gateway` proxies SSE to `127.0.0.1:18789/logs/gateway`.
- `location ^~ /openclaw/api/gateway/` proxies API namespace to `127.0.0.1:18789`.
- `location ^~ /openclaw/api/router/` proxies API namespace to `127.0.0.1:8787`.
- **Only** `/openclaw/*` has `auth_basic` enabled.

## App-side defaults

`lib/openclaw.ts` now defaults:

- `NEXT_PUBLIC_OPENCLAW_BASE_URL=/openclaw`

So health and stream requests resolve to:

- `/openclaw/health`
- `/openclaw/logs/router`
- `/openclaw/logs/gateway`

## Apply and verify on EC2

1. Install the server config (or merge its `location` blocks into your existing
   `charlie.suarezhouse.net` server block).
2. Validate and reload Nginx:
   - `sudo nginx -t`
   - `sudo systemctl reload nginx`
3. Verify root site remains unchanged:
   - `curl -I https://charlie.suarezhouse.net/`
4. Verify auth only on OpenClaw paths:
   - `curl -I https://charlie.suarezhouse.net/openclaw/` (expect `401` before auth)
   - `curl -I https://charlie.suarezhouse.net/` (should not require auth)
5. Verify backend proxying:
   - `curl -u <user>:<pass> https://charlie.suarezhouse.net/openclaw/health`
   - `curl -u <user>:<pass> -N https://charlie.suarezhouse.net/openclaw/logs/router`
