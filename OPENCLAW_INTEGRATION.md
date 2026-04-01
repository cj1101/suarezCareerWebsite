# Openclaw Integration Guide

This document covers everything needed to configure, deploy, and enable the
Openclaw Dashboard integration in the `charlie.suarezhouse.net` website.

---

## Table of contents

1. [Architecture overview](#1-architecture-overview)
2. [Environment variables](#2-environment-variables)
3. [Feature flag rollout](#3-feature-flag-rollout)
4. [CSP — host-level config](#4-csp--host-level-config)
5. [AWS / Nginx proxy config](#5-aws--nginx-proxy-config)
6. [CORS requirements (AWS side)](#6-cors-requirements-aws-side)
7. [Authentication notes](#7-authentication-notes)
8. [Same-site / cookie implications](#8-same-site--cookie-implications)
9. [SSE vs WebSocket tradeoffs](#9-sse-vs-websocket-tradeoffs)
10. [Changed files summary](#10-changed-files-summary)
11. [Rollout checklist](#11-rollout-checklist)
12. [Troubleshooting](#12-troubleshooting)

---

## 1. Architecture overview

```
Browser (charlie.suarezhouse.net)
  │
  │  HTTPS  (nav link / CTA button)
  ▼
Nginx on AWS  ←  Basic Auth enforced here
  │
  ├─ /           →  Openclaw Mission Control frontend
  ├─ /health     →  JSON health response  { "status": "healthy" }
  ├─ /logs/router   →  SSE stream of router log lines
  └─ /logs/gateway  →  SSE stream of gateway log lines
```

The **main website is a Next.js static export** (`output: 'export'`).  
There is no Next.js server at runtime — all env vars are baked in at `next build`.  
All streaming connections are initiated by the **browser**, not the website server.

---

## 2. Environment variables

Set these in `.env.local` (local dev) or your CI/CD secrets before running
`next build`. They are baked into the static bundle — do **not** put secrets here.

| Variable | Default | Required | Description |
|---|---|---|---|
| `NEXT_PUBLIC_OPENCLAW_BASE_URL` | `https://openclaw.charlie.suarezhouse.net` | No | Base URL for the Openclaw backend. Override for staging/local testing. |
| `NEXT_PUBLIC_OPENCLAW_STREAM_ENABLED` | `false` | No | Set to `"true"` to enable `OpenclawHealthBadge` and `OpenclawLogViewer` on the `/openclaw` page. |

### Example `.env.local`

```dotenv
# Openclaw integration
NEXT_PUBLIC_OPENCLAW_BASE_URL=https://openclaw.charlie.suarezhouse.net
NEXT_PUBLIC_OPENCLAW_STREAM_ENABLED=false
```

> **Security note:** Never put API tokens, passwords, or secret keys in
> `NEXT_PUBLIC_*` variables — they are included in the browser bundle and
> publicly readable.

---

## 3. Feature flag rollout

The streaming UI (`OpenclawHealthBadge`, `OpenclawLogViewer`) is **disabled by
default**. When disabled, no network requests are made to the Openclaw backend
from the main website, and no code paths change for existing pages.

### Steps to enable

1. Confirm the AWS backend is live and responding at:
   - `GET /health` → `{ "status": "healthy" }`
   - `GET /logs/router` → SSE stream
   - `GET /logs/gateway` → SSE stream
2. Confirm CORS is configured (see §6).
3. Set in CI/CD / `.env.local`:
   ```dotenv
   NEXT_PUBLIC_OPENCLAW_STREAM_ENABLED=true
   ```
4. Run `next build` and deploy.
5. Navigate to `https://charlie.suarezhouse.net/openclaw` and verify:
   - Health badge shows "Operational".
   - Log viewer connects and streams lines.

### Steps to disable (rollback)

1. Set `NEXT_PUBLIC_OPENCLAW_STREAM_ENABLED=false` (or remove it).
2. Rebuild and redeploy — the components render `null` and no requests are made.

---

## 4. CSP — host-level config

Because the site is a static export, Next.js **cannot** set HTTP response
headers at runtime. The `Content-Security-Policy` header must be set by
whichever HTTP server hosts `charlie.suarezhouse.net`.

### Minimal `connect-src` addition

```
Content-Security-Policy: connect-src 'self' https://openclaw.charlie.suarezhouse.net
```

If you already have a CSP policy, **add** the Openclaw origin to the existing
`connect-src` directive rather than replacing the whole policy.

### Example Nginx snippet for the main site host

```nginx
# /etc/nginx/sites-available/charlie.suarezhouse.net
server {
    listen 443 ssl;
    server_name charlie.suarezhouse.net;

    # ... ssl, root, etc. ...

    add_header Content-Security-Policy
        "default-src 'self'; "
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'; "
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
        "font-src 'self' https://fonts.gstatic.com; "
        "img-src 'self' data:; "
        "connect-src 'self' https://openclaw.charlie.suarezhouse.net;"
        always;
}
```

> Adjust `script-src` / `style-src` to match your actual policy. The key
> addition is `connect-src ... https://openclaw.charlie.suarezhouse.net`.

---

## 5. AWS / Nginx proxy config

The Openclaw subdomain (`openclaw.charlie.suarezhouse.net`) must be proxied
by Nginx with specific settings for SSE and (optionally) WebSocket to work.

### Required Nginx config for SSE (`/logs/*`)

```nginx
# /etc/nginx/sites-available/openclaw.charlie.suarezhouse.net
server {
    listen 443 ssl;
    server_name openclaw.charlie.suarezhouse.net;

    # ... ssl certs (Let's Encrypt / ACM) ...

    # Basic Auth
    auth_basic "Openclaw — Restricted";
    auth_basic_user_file /etc/nginx/.htpasswd;

    # Proxy to local Openclaw service
    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;

        proxy_set_header Host              $host;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # SSE-specific settings for log endpoints
    location ~ ^/logs/ {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;

        proxy_set_header Host              $host;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # SSE REQUIRES these:
        proxy_buffering          off;      # stream bytes immediately to client
        proxy_cache              off;
        proxy_read_timeout       3600s;    # keep connection open for 1 hour
        proxy_send_timeout       3600s;
        keepalive_timeout        3600s;

        # SSE content-type (set by backend, but as fallback):
        # add_header Content-Type "text/event-stream";
        # add_header Cache-Control "no-cache";
        # add_header X-Accel-Buffering "no";
    }

    # Optional: WebSocket upgrade (if switching from SSE to WS later)
    # location /ws/ {
    #     proxy_pass http://127.0.0.1:8080;
    #     proxy_http_version 1.1;
    #     proxy_set_header Upgrade    $http_upgrade;
    #     proxy_set_header Connection "upgrade";
    #     proxy_read_timeout 3600s;
    # }
}
```

### Backend SSE response requirements

Your Openclaw backend must respond to `GET /logs/router` and `GET /logs/gateway`
with:

```
HTTP/1.1 200 OK
Content-Type: text/event-stream
Cache-Control: no-cache
Connection: keep-alive
X-Accel-Buffering: no          ← tells Nginx not to buffer even if config missed

data: <log line here>\n\n      ← SSE message format
```

---

## 6. CORS requirements (AWS side)

The browser will send cross-origin requests from `https://charlie.suarezhouse.net`
to `https://openclaw.charlie.suarezhouse.net`. The Openclaw backend (or Nginx)
must include the correct CORS headers.

### Required CORS headers

```
Access-Control-Allow-Origin:  https://charlie.suarezhouse.net
Access-Control-Allow-Methods: GET, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

> Do **not** use `Access-Control-Allow-Origin: *` — this would expose the
> health and log endpoints to any origin.

### Nginx CORS snippet

```nginx
# Inside the openclaw server block, before proxy_pass:
add_header Access-Control-Allow-Origin  "https://charlie.suarezhouse.net" always;
add_header Access-Control-Allow-Methods "GET, OPTIONS" always;
add_header Access-Control-Allow-Headers "Content-Type, Authorization" always;

if ($request_method = OPTIONS) {
    add_header Access-Control-Max-Age 600;
    return 204;
}
```

### Note on Basic Auth + CORS

When the browser sends a credentialed request (with an `Authorization` header
from Basic Auth), you may also need:

```
Access-Control-Allow-Credentials: true
```

However, the current frontend code does **not** send credentials
programmatically — the browser handles Basic Auth via its own credential store
after the first prompt. Test in your target browser and add this header if you
see `CORS` errors on credentialed requests.

---

## 7. Authentication notes

- **Mechanism:** HTTP Basic Authentication enforced by Nginx using
  `auth_basic_user_file`.
- **Password file:** Generate with `htpasswd -c /etc/nginx/.htpasswd <username>`.
- **No secrets in frontend:** The website never stores or transmits credentials
  programmatically. The browser handles the Basic Auth dialog natively.
- **Future upgrade path:** If you later replace Basic Auth with token-based auth
  (e.g., a short-lived JWT or API key), update `createLogStream` in
  `lib/openclaw.ts` to include an `Authorization` header in the `EventSource`
  constructor options, and add `Access-Control-Allow-Credentials: true` on the
  server.

---

## 8. Same-site / cookie implications

If you later introduce cookie-based sessions:

- The main site is `charlie.suarezhouse.net` and the dashboard is
  `openclaw.charlie.suarezhouse.net` — these share the same registrable domain
  (`suarezhouse.net`), so `SameSite=Lax` or `SameSite=Strict` cookies set on
  one will **not** automatically be sent to the other subdomain.
- To share cookies across subdomains, set `Domain=.suarezhouse.net` on the
  cookie and use `SameSite=None; Secure` for cross-origin requests.
- For the current Basic Auth approach, no cookies are involved.

---

## 9. SSE vs WebSocket tradeoffs

The current implementation uses **Server-Sent Events (SSE)** for log streaming.

| | SSE | WebSocket |
|---|---|---|
| Protocol | HTTP/1.1 or HTTP/2 | Upgraded TCP |
| Direction | Server → Client only | Bidirectional |
| Auto-reconnect | Built into browser | Must implement manually |
| Nginx config | `proxy_buffering off` | `Upgrade` + `Connection` headers |
| CORS | Standard CORS headers | Handled at upgrade handshake |
| Proxy support | Works everywhere | Some proxies strip `Upgrade` |

**Recommendation:** Keep SSE unless you need bidirectional communication
(e.g., sending commands from the browser to the backend). To switch to
WebSocket, replace `createLogStream` in `lib/openclaw.ts` with a `WebSocket`
implementation and update the Nginx `location /ws/` block above.

---

## 10. Changed files summary

| File | Change |
|---|---|
| `components/Navigation.tsx` | Added Openclaw external nav item (amber, `Lock` + `Terminal` + `ExternalLink` icons, `<a target="_blank">`) |
| `lib/openclaw.ts` | **New** — `OPENCLAW_BASE_URL`, `STREAM_ENABLED`, `fetchOpenclawHealth()`, `createLogStream()` |
| `components/openclaw/OpenclawHealthBadge.tsx` | **New** — polls `/health`, coloured dot badge; disabled when `STREAM_ENABLED=false` |
| `components/openclaw/OpenclawLogViewer.tsx` | **New** — Router/Gateway tab log viewer via SSE; disabled when `STREAM_ENABLED=false` |
| `app/openclaw/page.tsx` | **New** — `/openclaw` landing page: description, CTA, auth warning, troubleshooting, `noindex` metadata |
| `OPENCLAW_INTEGRATION.md` | **New** — this document |

**Files not changed:** `next.config.js`, `app/layout.tsx`, all existing pages,
`data/`, `content/`. No existing routes, SEO metadata, or performance
characteristics were affected.

---

## 11. Rollout checklist

- [ ] AWS EC2 instance running with Openclaw services
- [ ] Nginx installed and configured per §5
- [ ] SSL cert issued for `openclaw.charlie.suarezhouse.net` (Let's Encrypt: `certbot --nginx -d openclaw.charlie.suarezhouse.net`)
- [ ] Basic Auth `.htpasswd` file created
- [ ] CORS headers added to Nginx per §6
- [ ] Backend exposes `GET /health`, `GET /logs/router`, `GET /logs/gateway`
- [ ] Test `curl -u user:pass https://openclaw.charlie.suarezhouse.net/health` returns `{"status":"healthy"}`
- [ ] Test SSE: `curl -u user:pass -N https://openclaw.charlie.suarezhouse.net/logs/router` streams log lines
- [ ] Set `NEXT_PUBLIC_OPENCLAW_STREAM_ENABLED=true` in CI/CD secrets
- [ ] Run `next build` and deploy new static bundle
- [ ] Navigate to `https://charlie.suarezhouse.net/openclaw` and verify health badge + log viewer
- [ ] Add `connect-src` CSP header at the host serving `charlie.suarezhouse.net` (§4)

---

## 12. Troubleshooting

### Health badge stuck on "Checking status…"
- `STREAM_ENABLED` may be `false` — the badge returns `null`. Verify the env var was set before build.
- Check browser console for CORS errors on the `/health` fetch.
- Verify the Nginx CORS headers are present: `curl -I https://openclaw.charlie.suarezhouse.net/health`.

### Log viewer shows "Disconnected" immediately
- The SSE endpoint (`/logs/router` or `/logs/gateway`) may not be implemented yet on the backend.
- Check `proxy_buffering off` is set in Nginx — without it, SSE will appear to hang.
- Check `proxy_read_timeout` is long enough (default 60s is too short for persistent streams).

### Browser shows CORS error on `/health` or `/logs/*`
- Ensure `Access-Control-Allow-Origin: https://charlie.suarezhouse.net` is set in Nginx CORS config.
- Confirm the header is present in the **actual response** (not just preflight): `curl -v -H "Origin: https://charlie.suarezhouse.net" https://openclaw.charlie.suarezhouse.net/health`.

### Nav link shows amber "Openclaw" entry but clicking gives SSL error
- The SSL cert for `openclaw.charlie.suarezhouse.net` is missing or expired.
- Renew with: `sudo certbot renew` or reissue with `sudo certbot --nginx -d openclaw.charlie.suarezhouse.net`.

### Build fails after adding env vars
- Ensure `NEXT_PUBLIC_OPENCLAW_BASE_URL` is a valid URL (no trailing slash needed).
- `NEXT_PUBLIC_OPENCLAW_STREAM_ENABLED` must be the string `"true"` (not boolean `true`).
