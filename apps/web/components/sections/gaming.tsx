"use client";

import { motion } from "framer-motion";
import { Gamepad2, Gauge, Wifi, Crosshair } from "lucide-react";

const features = [
  { icon: Gauge, title: "<5ms Latency", desc: "Ultra-low ping for competitive gaming" },
  { icon: Wifi, title: "Packet Loss 0%", desc: "Stable connection, no rubber-banding" },
  { icon: Crosshair, title: "Gaming Routes", desc: "Optimized routing to global servers" },
];

export function GamingSection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-cyan-500/5" />
      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="relative aspect-square max-w-md mx-auto lg:mx-0">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-3xl blur-2xl" />
              <div className="relative h-full rounded-3xl bg-card border border-border/50 p-8 flex flex-col items-center justify-center gap-6">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-glow-cyan">
                  <Gamepad2 className="w-12 h-12 text-white" />
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold gradient-text mb-2">3ms</div>
                  <div className="text-sm text-muted-foreground">Average latency to Singapore servers</div>
                </div>
                <div className="w-full space-y-3">
                  {[
                    { label: "Singapore", value: 3, color: "bg-emerald-500" },
                    { label: "Hong Kong", value: 18, color: "bg-cyan-500" },
                    { label: "Mumbai", value: 32, color: "bg-brand-500" },
                    { label: "Dubai", value: 65, color: "bg-violet-500" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground w-20">{item.label}</span>
                      <div className="flex-1 bg-surface-sunken rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(item.value / 80) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className={`h-full rounded-full ${item.color}`}
                        />
                      </div>
                      <span className="text-xs font-semibold w-8 text-right">{item.value}ms</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-4">
              <Gamepad2 className="w-3.5 h-3.5" />
              Gaming Optimized
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Built for <span className="gradient-text">competitive gaming</span>
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Our network is optimized for gaming with dedicated low-latency routes to major game servers.
              Say goodbye to lag spikes and packet loss.
            </p>

            <div className="grid sm:grid-cols-3 gap-4">
              {features.map((f, i) => (
                <div key={i} className="p-4 rounded-xl bg-card border border-border/50">
                  <div className="p-2 rounded-lg bg-emerald-500/10 w-fit mb-3">
                    <f.icon className="w-5 h-5 text-emerald-500" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{f.title}</h3>
                  <p className="text-xs text-muted-foreground">{f.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
