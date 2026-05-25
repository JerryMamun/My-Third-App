"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Wifi, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

const navLinks = [
  { href: "/packages", label: "Packages" },
  { href: "/coverage", label: "Coverage" },
  { href: "/support", label: "Support" },
  { href: "/about", label: "About" },
];

export function PublicNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-elevation-1"
          : "bg-transparent"
      }`}
    >
      <div className="section-container">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-brand-500 to-cyan-400 flex items-center justify-center shadow-glow-cyan group-hover:shadow-glow-brand transition-shadow">
              <Wifi className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight leading-none">Bluebird</span>
              <span className="text-[10px] font-medium text-muted-foreground tracking-widest uppercase leading-none">Online</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {mounted && (
              <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors" aria-label="Toggle theme">
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            )}
            <Link href="/login" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Sign In</Link>
            <Link href="/packages" className="px-5 py-2.5 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-500 rounded-lg transition-colors shadow-elevation-2 hover:shadow-elevation-3">Get Started</Link>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-lg hover:bg-accent">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border">
            <div className="section-container py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="px-4 py-3 text-sm font-medium rounded-lg hover:bg-accent">{link.label}</Link>
              ))}
              <div className="border-t border-border my-2" />
              <Link href="/login" onClick={() => setMobileOpen(false)} className="px-4 py-3 text-sm font-medium rounded-lg hover:bg-accent">Sign In</Link>
              <Link href="/packages" onClick={() => setMobileOpen(false)} className="px-4 py-3 text-sm font-semibold text-white bg-brand-600 rounded-lg text-center">Get Started</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
