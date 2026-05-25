"use client";

import { motion } from "framer-motion";
import { Shield, Clock, Activity, Server } from "lucide-react";

const stats = [
  { label: "Network Uptime", value: "99.97%", icon: Activity, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { label: "Avg. Response Time", value: "<2 min", icon: Clock, color: "text-brand-500", bg: "bg-brand-500/10" },
  { label: "SLA Guarantee", value: "99.9%", icon: Shield, color: "text-cyan-500", bg: "bg-cyan-500/10" },
  { label: "Redundant POPs", value: "24/7", icon: Server, color: "text-violet-500", bg: "bg-violet-500/10" },
];

export function UptimeSection() {
  return (
    <section className="py-24 bg-surface-elevated relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-500/5 via-transparent to-transparent" />
      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-4">
              <Shield className="w-3.5 h-3.5" />
              Reliability
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Enterprise-grade <span className="gradient-text">reliability</span>
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Our network is built with redundancy at every layer. Dual uplinks, backup power, and
              24/7 NOC monitoring ensure your connection stays online.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <div key={i} className="p-4 rounded-xl bg-card border border-border/50">
                  <div className={`p-2 rounded-lg ${s.bg} w-fit mb-3`}>
                    <s.icon className={`w-5 h-5 ${s.color}`} />
                  </div>
                  <div className="text-2xl font-bold mb-1">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-brand-500/10 rounded-3xl blur-2xl" />
            <div className="relative p-8 rounded-3xl bg-card border border-border/50">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-sm font-medium">Network Status</div>
                  <div className="text-xs text-muted-foreground">Real-time monitoring</div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="text-xs font-semibold text-emerald-600">All Systems Operational</span>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { name: "Core Backbone", status: "Operational", uptime: "99.99%", color: "bg-emerald-500" },
                  { name: "Gulshan POP", status: "Operational", uptime: "99.98%", color: "bg-emerald-500" },
                  { name: "Banani POP", status: "Operational", uptime: "99.97%", color: "bg-emerald-500" },
                  { name: "Dhanmondi POP", status: "Operational", uptime: "99.96%", color: "bg-emerald-500" },
                  { name: "BDIX Peering", status: "Operational", uptime: "99.99%", color: "bg-emerald-500" },
                  { name: "International Uplink", status: "Operational", uptime: "99.95%", color: "bg-emerald-500" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-surface-elevated border border-border/30">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${item.color}`} />
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-muted-foreground">{item.uptime}</span>
                      <span className="text-xs font-medium text-emerald-600">{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
