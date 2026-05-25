"use client";

import { motion } from "framer-motion";
import { Tv, Film, Music, Cast, Play, Monitor } from "lucide-react";

const platforms = [
  { name: "Netflix", icon: Film, color: "text-red-500" },
  { name: "YouTube", icon: Play, color: "text-red-600" },
  { name: "Spotify", icon: Music, color: "text-green-500" },
  { name: "Chromecast", icon: Cast, color: "text-blue-500" },
  { name: "Smart TV", icon: Monitor, color: "text-purple-500" },
];

export function StreamingSection() {
  return (
    <section className="py-24 bg-surface-elevated">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 text-xs font-semibold mb-4">
            <Tv className="w-3.5 h-3.5" />
            4K Streaming Ready
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Stream without <span className="gradient-text">buffering</span>
          </h2>
          <p className="text-muted-foreground">
            Our symmetrical fiber speeds handle multiple 4K streams simultaneously. Perfect for
            households with heavy streaming usage.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {[
              { label: "4K Netflix stream", bandwidth: "25 Mbps", icon: Film },
              { label: "4K YouTube stream", bandwidth: "20 Mbps", icon: Play },
              { label: "HD Video call", bandwidth: "3 Mbps", icon: Tv },
              { label: "Online gaming", bandwidth: "5 Mbps", icon: Gamepad2 },
              { label: "Music streaming", bandwidth: "0.5 Mbps", icon: Music },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50">
                <div className="p-2.5 rounded-lg bg-violet-500/10">
                  <item.icon className="w-5 h-5 text-violet-500" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{item.label}</div>
                  <div className="text-xs text-muted-foreground">per device</div>
                </div>
                <div className="text-sm font-semibold text-violet-500">{item.bandwidth}</div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-cyan-500/10 rounded-3xl blur-2xl" />
            <div className="relative grid grid-cols-3 gap-4 p-8 rounded-3xl bg-card border border-border/50">
              {platforms.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center gap-3 p-4 rounded-xl bg-surface-elevated border border-border/30 hover:border-violet-500/30 transition-colors"
                >
                  <p.icon className={`w-8 h-8 ${p.color}`} />
                  <span className="text-xs font-medium">{p.name}</span>
                </motion.div>
              ))}
              <div className="col-span-3 mt-4 p-4 rounded-xl bg-violet-500/5 border border-violet-500/20 text-center">
                <div className="text-2xl font-bold text-violet-500">10+ devices</div>
                <div className="text-xs text-muted-foreground">Simultaneous 4K streaming on 100 Mbps plan</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
