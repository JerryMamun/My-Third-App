"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity, Users, Globe, Server } from "lucide-react";

interface StatItem {
  icon: typeof Activity;
  label: string;
  value: number;
  suffix: string;
  color: string;
}

const stats: StatItem[] = [
  { icon: Activity, label: "Current Network Load", value: 72, suffix: "%", color: "text-brand-500" },
  { icon: Users, label: "Active Subscribers", value: 52430, suffix: "+", color: "text-emerald-500" },
  { icon: Globe, label: "Coverage Areas", value: 127, suffix: "", color: "text-cyan-500" },
  { icon: Server, label: "POP Locations", value: 24, suffix: "", color: "text-violet-500" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);

  return <span>{count.toLocaleString()}{suffix}</span>;
}

export function LiveStatsSection() {
  return (
    <section className="relative py-16 bg-surface-elevated border-y border-border/50">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="relative p-6 rounded-2xl bg-card border border-border/50 hover:border-brand-500/30 transition-colors group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2.5 rounded-xl bg-background ${stat.color} group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</span>
              </div>
              <div className={`text-3xl lg:text-4xl font-bold tracking-tight ${stat.color}`}>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-2 flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                </span>
                <span className="text-xs text-muted-foreground">Live data</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
