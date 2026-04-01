"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Briefcase, FolderKanban, User, FileText, Terminal, Lock, ExternalLink } from "lucide-react";

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/experience", label: "Experience", icon: Briefcase },
    { href: "/projects", label: "Projects", icon: FolderKanban },
    { href: "/blog", label: "Blog", icon: FileText },
    { href: "/about", label: "About", icon: User },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/90 dark:bg-gray-900/90 border-b border-gray-200/50 dark:border-gray-800/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            href="/" 
            className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform"
          >
            CS
          </Link>
          <div className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-105"
                  }`}
                >
                  <Icon size={18} />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}

            {/* Openclaw Dashboard — external private tool, opens in new tab */}
            <a
              href="/openclaw/"
              target="_blank"
              rel="noopener noreferrer"
              title="Openclaw Dashboard — requires authentication"
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:scale-105 border border-transparent hover:border-amber-200 dark:hover:border-amber-800"
            >
              <span className="relative">
                <Terminal size={18} />
                <Lock
                  size={9}
                  className="absolute -bottom-0.5 -right-1 stroke-[2.5]"
                />
              </span>
              <span className="hidden sm:inline">Openclaw</span>
              <ExternalLink size={12} className="hidden sm:inline opacity-60" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

