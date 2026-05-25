"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Zap, Gamepad2, Tv, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

interface Package {
  name: string;
  speed: number;
  price: number;
  features: string[];
  badge?: string;
  badgeColor?: string;
  recommended?: boolean;
  gaming?: boolean;
  streaming?: boolean;
}

const packages: Package[] = [
  {
    name: "Fiber Starter",
    speed: 20,
    price: 599,
    features: ["20 Mbps Download", "20 Mbps Upload", "Unlimited Data", "Standard Support", "1 Static IP"],
  },
  {
    name: "Fiber Home",
    speed: 50,
    price: 899,
    features: ["50 Mbps Download", "50 Mbps Upload", "Unlimited Data", "Priority Support", "1 Static IP", "Free Router"],
    streaming: true,
  },
  {
    name: "Fiber Pro",
    speed: 100,
    price: 1299,
    features: ["100 Mbps Download", "100 Mbps Upload", "Unlimited Data", "24/7 Support", "2 Static IPs", "Free Mesh WiFi", "Gaming Optimization"],
    gaming: true,
    streaming: true,
    recommended: true,
    badge: "Most Popular",
    badgeColor: "bg-brand-500",
  },
  {
    name: "Fiber Ultra",
    speed: 200,
    price: 1999,
    features: ["200 Mbps Download", "200 Mbps Upload", "Unlimited Data", "Dedicated Support", "5 Static IPs", "Enterprise Router", "Gaming Optimization", "4K Streaming Ready"],
    gaming: true,
    streaming: true,
    badge: "Best Value",
    badgeColor: "bg-cyan-500",
  },
  {
    name: "Fiber Gigabit",
    speed: 1000,
    price: 4999,
    features: ["1 Gbps Download", "1 Gbps Upload", "Unlimited Data", "VIP Support", "10 Static IPs", "Enterprise Equipment", "SLA Guarantee", "DDoS Protection"],
    badge: "Enterprise",
    badgeColor: "bg-violet-500",
  },
];

function SpeedVisualizer({ speed }: { speed: number }) {
  const percentage = Math.min((speed / 1000) * 100, 100);
  return (
    <div className="w-full bg-surface-sunken rounded-full h-2 mb-6 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${percentage}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="h-full rounded-full bg-gradient-to-r from-brand-500 to-cyan-400"
      />
    </div>
  );
}

export function PackagesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-background">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Internet Packages
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Choose your speed</h2>
          <p className="text-muted-foreground">All packages include unlimited data, symmetrical speeds, and no hidden fees.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-5">
          {packages.map((pkg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`relative flex flex-col p-6 rounded-2xl border transition-all duration-300 ${
                pkg.recommended
                  ? "border-brand-500/50 bg-brand-500/5 shadow-glow-brand"
                  : "border-border/50 bg-card hover:border-brand-500/30 hover:shadow-elevation-3"
              } ${hoveredIndex !== null && hoveredIndex !== i ? "opacity-70 scale-[0.98]" : ""}`}
            >
              {pkg.badge && (
                <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full ${pkg.badgeColor} text-white text-xs font-bold shadow-lg`}>
                  {pkg.badge}
                </div>
              )}

              <div className="mb-4">
                <h3 className="text-lg font-bold">{pkg.name}</h3>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-3xl font-bold">{pkg.speed}</span>
                  <span className="text-sm text-muted-foreground">Mbps</span>
                </div>
              </div>

              <SpeedVisualizer speed={pkg.speed} />

              <div className="flex items-center gap-2 mb-4">
                {pkg.gaming && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold">
                    <Gamepad2 className="w-3 h-3" /> Gaming
                  </span>
                )}
                {pkg.streaming && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-violet-500/10 text-violet-600 dark:text-violet-400 text-[10px] font-semibold">
                    <Tv className="w-3 h-3" /> 4K
                  </span>
                )}
              </div>

              <ul className="flex-1 space-y-2.5 mb-6">
                {pkg.features.map((feature, fi) => (
                  <li key={fi} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-sm text-muted-foreground">৳</span>
                  <span className="text-3xl font-bold">{pkg.price}</span>
                  <span className="text-sm text-muted-foreground">/month</span>
                </div>
                <Link
                  href={`/packages/${pkg.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                    pkg.recommended
                      ? "bg-brand-600 hover:bg-brand-500 text-white shadow-glow-brand"
                      : "bg-surface-elevated hover:bg-surface-sunken border border-border"
                  }`}
                >
                  Select Plan <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
