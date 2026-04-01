"use client";

/**
 * OpenclawHealthBadge
 *
 * Polls GET /health on the Openclaw backend and renders a coloured
 * status badge. Renders nothing when STREAM_ENABLED is false so that
 * no network calls are made on the production site until the backend
 * is confirmed live.
 *
 * Enable via: NEXT_PUBLIC_OPENCLAW_STREAM_ENABLED=true (build-time env var)
 */

import { useEffect, useState } from "react";
import { fetchOpenclawHealth, STREAM_ENABLED, type HealthStatus } from "@/lib/openclaw";

const POLL_INTERVAL_MS = 30_000;

const statusConfig: Record<
  HealthStatus,
  { label: string; dotClass: string; textClass: string }
> = {
  healthy: {
    label: "Operational",
    dotClass: "bg-green-500 animate-pulse",
    textClass: "text-green-700 dark:text-green-400",
  },
  degraded: {
    label: "Degraded",
    dotClass: "bg-amber-500 animate-pulse",
    textClass: "text-amber-700 dark:text-amber-400",
  },
  unreachable: {
    label: "Unreachable",
    dotClass: "bg-red-500",
    textClass: "text-red-700 dark:text-red-400",
  },
};

export default function OpenclawHealthBadge() {
  const [status, setStatus] = useState<HealthStatus | "loading">("loading");

  useEffect(() => {
    if (!STREAM_ENABLED) return;

    let controller = new AbortController();

    async function poll() {
      const result = await fetchOpenclawHealth(controller.signal);
      if (!controller.signal.aborted) {
        setStatus(result.status);
      }
    }

    poll();
    const interval = setInterval(() => {
      controller.abort();
      controller = new AbortController();
      poll();
    }, POLL_INTERVAL_MS);

    return () => {
      controller.abort();
      clearInterval(interval);
    };
  }, []);

  if (!STREAM_ENABLED) return null;

  if (status === "loading") {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500">
        <span className="h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-600" />
        Checking status…
      </div>
    );
  }

  const cfg = statusConfig[status];

  return (
    <div
      className={`flex items-center gap-2 text-sm font-medium ${cfg.textClass}`}
      title="Openclaw backend health"
    >
      <span className={`h-2 w-2 rounded-full ${cfg.dotClass}`} />
      {cfg.label}
    </div>
  );
}
