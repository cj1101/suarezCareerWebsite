"use client";

/**
 * OpenclawLogViewer
 *
 * Streams live logs from the Openclaw backend over SSE.
 * Provides two tabs: Router logs and Gateway logs.
 *
 * Renders nothing when STREAM_ENABLED is false — no network calls,
 * no regressions for the main site.
 *
 * Enable via: NEXT_PUBLIC_OPENCLAW_STREAM_ENABLED=true (build-time env var)
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { createLogStream, STREAM_ENABLED, type LogPath, type StreamState } from "@/lib/openclaw";
import { Terminal, Radio, WifiOff, RefreshCw, Trash2 } from "lucide-react";

type Tab = "router" | "gateway";

const TAB_PATHS: Record<Tab, LogPath> = {
  router: "/logs/router",
  gateway: "/logs/gateway",
};

const MAX_LINES = 500;

function StateIndicator({ state }: { state: StreamState }) {
  const configs: Record<StreamState, { icon: React.ReactNode; label: string; className: string }> = {
    connecting: {
      icon: <Radio size={13} className="animate-pulse" />,
      label: "Connecting…",
      className: "text-amber-500",
    },
    live: {
      icon: <Radio size={13} />,
      label: "Live",
      className: "text-green-500",
    },
    disconnected: {
      icon: <WifiOff size={13} />,
      label: "Disconnected",
      className: "text-red-500",
    },
    retrying: {
      icon: <RefreshCw size={13} className="animate-spin" />,
      label: "Retrying…",
      className: "text-amber-500",
    },
  };

  const cfg = configs[state];
  return (
    <span className={`flex items-center gap-1 text-xs font-medium ${cfg.className}`}>
      {cfg.icon}
      {cfg.label}
    </span>
  );
}

function LogPane({ path }: { path: LogPath }) {
  const [lines, setLines] = useState<string[]>([]);
  const [streamState, setStreamState] = useState<StreamState>("connecting");
  const bottomRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  const start = useCallback(() => {
    cleanupRef.current?.();
    setLines([]);
    cleanupRef.current = createLogStream(path, {
      onMessage: (line) =>
        setLines((prev) => {
          const next = [...prev, line];
          return next.length > MAX_LINES ? next.slice(next.length - MAX_LINES) : next;
        }),
      onStateChange: setStreamState,
    });
  }, [path]);

  useEffect(() => {
    start();
    return () => cleanupRef.current?.();
  }, [start]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <StateIndicator state={streamState} />
        <div className="flex gap-2">
          <button
            onClick={() => setLines([])}
            title="Clear log"
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            <Trash2 size={12} />
            Clear
          </button>
          <button
            onClick={start}
            title="Reconnect"
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            <RefreshCw size={12} />
            Reconnect
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto font-mono text-xs leading-5 bg-gray-950 text-green-400 p-3 min-h-0">
        {lines.length === 0 ? (
          <span className="text-gray-600">Waiting for log entries…</span>
        ) : (
          lines.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap break-all">
              {line}
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}

export default function OpenclawLogViewer() {
  const [activeTab, setActiveTab] = useState<Tab>("router");

  if (!STREAM_ENABLED) return null;

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm flex flex-col h-96">
      {/* Tab bar */}
      <div className="flex items-center gap-1 px-3 pt-2 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
        <Terminal size={14} className="text-amber-500 mr-1" />
        {(["router", "gateway"] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 text-xs font-medium rounded-t-md capitalize transition-colors ${
              activeTab === tab
                ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-b-0 border-gray-200 dark:border-gray-700"
                : "text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
        <span className="ml-auto text-xs text-gray-400 pb-1.5">
          Live — max {MAX_LINES} lines
        </span>
      </div>

      {/* Log pane — keyed by tab so stream restarts on tab switch */}
      <div className="flex-1 min-h-0">
        <LogPane key={activeTab} path={TAB_PATHS[activeTab]} />
      </div>
    </div>
  );
}
