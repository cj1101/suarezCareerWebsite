/**
 * Openclaw client library
 *
 * Base URL and feature flag are resolved from build-time env vars.
 * All values are baked into the static export at `next build` time.
 *
 * Required env vars (set in .env.local or CI/CD secrets before building):
 *   NEXT_PUBLIC_OPENCLAW_BASE_URL          — defaults to /openclaw
 *   NEXT_PUBLIC_OPENCLAW_STREAM_ENABLED    — set to "true" to activate health + log streaming UI
 */

export const OPENCLAW_BASE_URL =
  process.env.NEXT_PUBLIC_OPENCLAW_BASE_URL ??
  "/openclaw";

export const STREAM_ENABLED =
  process.env.NEXT_PUBLIC_OPENCLAW_STREAM_ENABLED === "true";

// ---------------------------------------------------------------------------
// Health check
// ---------------------------------------------------------------------------

export type HealthStatus = "healthy" | "degraded" | "unreachable";

export interface HealthResponse {
  status: HealthStatus;
  message?: string;
}

/**
 * Fetches `GET /health` from the Openclaw backend.
 * Expects a JSON body with at least `{ status: "healthy" | "degraded" }`.
 * Returns `{ status: "unreachable" }` on any network or non-2xx error.
 */
export async function fetchOpenclawHealth(
  signal?: AbortSignal
): Promise<HealthResponse> {
  try {
    const res = await fetch(`${OPENCLAW_BASE_URL}/health`, {
      signal,
      // Credentials omitted intentionally — Basic Auth is handled by the proxy
      // before the request reaches this endpoint.
      cache: "no-store",
    });
    if (!res.ok) {
      return { status: "degraded", message: `HTTP ${res.status}` };
    }
    const json = (await res.json()) as Partial<HealthResponse>;
    return {
      status: json.status ?? "healthy",
      message: json.message,
    };
  } catch {
    return { status: "unreachable" };
  }
}

// ---------------------------------------------------------------------------
// Log streaming (SSE)
// ---------------------------------------------------------------------------

export type LogPath = "/logs/router" | "/logs/gateway";

export type StreamState =
  | "connecting"
  | "live"
  | "disconnected"
  | "retrying";

export interface StreamCallbacks {
  onMessage: (line: string) => void;
  onStateChange: (state: StreamState) => void;
  onError?: (event: Event) => void;
}

const RETRY_DELAY_MS = 3_000;
const MAX_RETRIES = 5;

/**
 * Opens a Server-Sent Events connection to the given log path.
 * Automatically retries up to MAX_RETRIES times on connection failure.
 *
 * Returns a cleanup function — call it to permanently close the stream.
 *
 * NOTE: The AWS/Nginx proxy must have `proxy_buffering off` and a long
 * read timeout for SSE to work correctly. See OPENCLAW_INTEGRATION.md.
 */
export function createLogStream(
  path: LogPath,
  { onMessage, onStateChange, onError }: StreamCallbacks
): () => void {
  let es: EventSource | null = null;
  let retries = 0;
  let stopped = false;
  let retryTimer: ReturnType<typeof setTimeout> | null = null;

  function connect() {
    if (stopped) return;
    onStateChange("connecting");

    es = new EventSource(`${OPENCLAW_BASE_URL}${path}`);

    es.onopen = () => {
      retries = 0;
      onStateChange("live");
    };

    es.onmessage = (event: MessageEvent) => {
      onMessage(event.data as string);
    };

    es.onerror = (event: Event) => {
      onError?.(event);
      es?.close();
      es = null;

      if (stopped) return;

      if (retries < MAX_RETRIES) {
        retries++;
        onStateChange("retrying");
        retryTimer = setTimeout(connect, RETRY_DELAY_MS);
      } else {
        onStateChange("disconnected");
      }
    };
  }

  connect();

  return function cleanup() {
    stopped = true;
    if (retryTimer !== null) clearTimeout(retryTimer);
    es?.close();
    es = null;
  };
}
