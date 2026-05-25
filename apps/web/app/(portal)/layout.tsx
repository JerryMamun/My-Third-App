"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  CreditCard,
  Ticket,
  Wifi,
  Settings,
  Bell,
  User,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Zap,
} from "lucide-react";

const sidebarLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/billing", label: "Billing", icon: CreditCard },
  { href: "/tickets", label: "Support", icon: Ticket },
  { href: "/network", label: "Network", icon: Wifi },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="p-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-cyan-400 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold">Bluebird</span>
          </Link>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-brand-500/10 text-brand-600 dark:text-brand-400"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
                {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border/50">
          <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              className="fixed left-0 top-0 bottom-0 w-64 bg-card border-r border-border z-50 lg:hidden"
            >
              <div className="p-6 flex items-center justify-between">
                <Link href="/dashboard" className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-cyan-400 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-bold">Bluebird</span>
                </Link>
                <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-lg hover:bg-accent">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="px-3 space-y-1">
                {sidebarLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-brand-500/10 text-brand-600 dark:text-brand-400"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      }`}
                    >
                      <link.icon className="w-4 h-4" />
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 border-b border-border/50 flex items-center justify-between px-4 lg:px-8 bg-card/50 backdrop-blur-sm sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-accent">
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4 ml-auto">
            <button className="relative p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-500 rounded-full" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-cyan-400 flex items-center justify-center text-white text-xs font-bold">
                RK
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-medium">Rahim Khan</div>
                <div className="text-xs text-muted-foreground">BB-10245</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
