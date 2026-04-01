import type { Metadata } from "next";
import { ExternalLink, Lock, Terminal, AlertTriangle, Wifi, HelpCircle } from "lucide-react";
import dynamic from "next/dynamic";
import { STREAM_ENABLED, OPENCLAW_BASE_URL } from "@/lib/openclaw";

// Feature-flagged components — loaded only when STREAM_ENABLED is true.
// next/dynamic with ssr:false prevents SSE/EventSource code from running at
// static build time (EventSource is browser-only).
const OpenclawHealthBadge = dynamic(
  () => import("@/components/openclaw/OpenclawHealthBadge"),
  { ssr: false }
);
const OpenclawLogViewer = dynamic(
  () => import("@/components/openclaw/OpenclawLogViewer"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Openclaw Dashboard",
  description: "Private Mission Control dashboard for Openclaw services.",
  robots: { index: false, follow: false },
};

export default function OpenclawPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-900/30 shadow-lg mb-2">
            <Terminal size={32} className="text-amber-600 dark:text-amber-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
            Openclaw Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto">
            Mission Control for Openclaw services — real-time router and gateway
            observability, hosted on AWS.
          </p>
        </div>

        {/* Auth notice */}
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 dark:border-amber-800/50 bg-amber-50 dark:bg-amber-900/20 px-5 py-4">
          <Lock
            size={20}
            className="text-amber-600 dark:text-amber-400 mt-0.5 shrink-0"
          />
          <div className="text-sm text-amber-800 dark:text-amber-300 space-y-1">
            <p className="font-semibold">Access is private and authenticated.</p>
            <p>
              The dashboard is protected by HTTP Basic Authentication enforced at
              the Nginx proxy layer. You will be prompted for credentials when you
              open the link below. Access is not granted publicly.
            </p>
          </div>
        </div>

        {/* CTA card */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="flex-1 space-y-2">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Open Mission Control
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Opens <code className="text-xs bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded font-mono">{OPENCLAW_BASE_URL}/</code> in a new tab.
              Your browser will present a login dialog.
            </p>
            {STREAM_ENABLED && (
              <div className="pt-1">
                <OpenclawHealthBadge />
              </div>
            )}
          </div>
          <a
            href={`${OPENCLAW_BASE_URL}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 whitespace-nowrap"
          >
            <Terminal size={18} />
            Launch Dashboard
            <ExternalLink size={15} className="opacity-80" />
          </a>
        </div>

        {/* Live log viewer (feature-flagged) */}
        {STREAM_ENABLED && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Wifi size={16} className="text-amber-500" />
              <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200">
                Live Log Stream
              </h2>
              <span className="text-xs text-gray-400 dark:text-gray-500 ml-1">
                — Router &amp; Gateway
              </span>
            </div>
            <div className="rounded-xl border border-amber-200 dark:border-amber-800/40 bg-amber-50/50 dark:bg-amber-900/10 px-4 py-2.5 text-xs text-amber-700 dark:text-amber-400 flex items-center gap-2">
              <AlertTriangle size={13} className="shrink-0" />
              Log data is sensitive. Stream access is controlled server-side. Do
              not share or screenshot log output.
            </div>
            <OpenclawLogViewer />
          </div>
        )}

        {/* What is Openclaw */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow border border-gray-100 dark:border-gray-700 p-8 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <HelpCircle size={18} className="text-amber-500" />
            What is Openclaw?
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Openclaw is a personal homelab project running on AWS. It provides a
            Mission Control interface for monitoring and managing internal
            services — including a custom router and API gateway. The dashboard
            surfaces real-time logs, health metrics, and routing state across
            active services.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            The stack sits behind an Nginx reverse proxy with Basic Auth under
            the path <code className="text-xs bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded font-mono">/openclaw/</code>.
            All traffic is encrypted in transit via HTTPS.
          </p>
        </div>

        {/* Troubleshooting */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow border border-gray-100 dark:border-gray-700 p-8 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <AlertTriangle size={18} className="text-amber-500" />
            Dashboard unavailable?
          </h2>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2 list-disc list-inside leading-relaxed">
            <li>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Browser login prompt appears but credentials fail:
              </span>{" "}
              Contact the admin for updated credentials. Basic Auth is managed
              server-side.
            </li>
            <li>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Site does not load at all (connection refused / timeout):
              </span>{" "}
              The AWS instance or Nginx service may be down. The subdomain is
              not guaranteed 24/7 uptime as it is a personal homelab.
            </li>
            <li>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Certificate error:
              </span>{" "}
              Ensure the SSL certificate for{" "}
              <code className="text-xs bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded font-mono">
                charlie.suarezhouse.net
              </code>{" "}
              has been issued and renewed (Let&apos;s Encrypt / ACM).
            </li>
            <li>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Log stream shows &quot;Disconnected&quot; after max retries:
              </span>{" "}
              The SSE endpoint may not yet be deployed. Set{" "}
              <code className="text-xs bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded font-mono">
                NEXT_PUBLIC_OPENCLAW_STREAM_ENABLED=false
              </code>{" "}
              and rebuild to hide the stream UI.
            </li>
          </ul>
        </div>

      </div>
    </main>
  );
}
