"use client";

import { motion } from "framer-motion";
import { MapPin, Search, ArrowRight } from "lucide-react";
import Link from "next/link";

const coverageZones = [
  { name: "Gulshan", status: "Live", color: "bg-emerald-500" },
  { name: "Banani", status: "Live", color: "bg-emerald-500" },
  { name: "Dhanmondi", status: "Live", color: "bg-emerald-500" },
  { name: "Uttara", status: "Live", color: "bg-emerald-500" },
  { name: "Mirpur", status: "Live", color: "bg-emerald-500" },
  { name: "Mohammadpur", status: "Live", color: "bg-emerald-500" },
  { name: "Bashundhara", status: "Live", color: "bg-emerald-500" },
  { name: "Khilgaon", status: "Coming Soon", color: "bg-amber-500" },
  { name: "Malibagh", status: "Coming Soon", color: "bg-amber-500" },
  { name: "Rampura", status: "Planned", color: "bg-slate-400" },
];

export function CoveragePreview() {
  return (
    <section className="py-24 bg-surface-elevated">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-semibold mb-4">
              <MapPin className="w-3.5 h-3.5" />
              Coverage Map
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Expanding across{" "}
              <span className="gradient-text">Dhaka & beyond</span>
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Our fiber network covers major residential and commercial zones. Check if your area is
              serviceable and get an instant availability report.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Enter your area (e.g., Gulshan 2)"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-border focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50 outline-none transition-all"
                />
              </div>
              <button className="px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-xl transition-colors shadow-elevation-2">
                Check Now
              </button>
            </div>

            <Link href="/coverage" className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 dark:text-brand-400 hover:underline">
              View full coverage map <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-3"
          >
            {coverageZones.map((zone, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex items-center justify-between p-4 rounded-xl bg-card border border-border/50 hover:border-brand-500/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${zone.color} ${zone.status === "Live" ? "animate-pulse" : ""}`} />
                  <span className="font-medium text-sm">{zone.name}</span>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  zone.status === "Live" ? "bg-emerald-500/10 text-emerald-600" :
                  zone.status === "Coming Soon" ? "bg-amber-500/10 text-amber-600" :
                  "bg-slate-500/10 text-slate-600"
                }`}>
                  {zone.status}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
