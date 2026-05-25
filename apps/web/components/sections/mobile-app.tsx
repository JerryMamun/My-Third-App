"use client";

import { motion } from "framer-motion";
import { Smartphone, CreditCard, Gauge, MessageCircle, Power, BarChart3, Bell, Moon } from "lucide-react";

const features = [
  { icon: CreditCard, label: "Pay Bills", desc: "bKash, Nagad, Card" },
  { icon: Gauge, label: "Speed Test", desc: "Built-in Ookla" },
  { icon: MessageCircle, label: "Live Chat", desc: "24/7 Support" },
  { icon: Power, label: "Router Control", desc: "Restart remotely" },
  { icon: BarChart3, label: "Usage Stats", desc: "Real-time data" },
  { icon: Bell, label: "Alerts", desc: "Downtime & billing" },
  { icon: Moon, label: "Dark Mode", desc: "Easy on eyes" },
  { icon: Smartphone, label: "Multiple Lines", desc: "Manage family" },
];

export function MobileAppSection() {
  return (
    <section className="py-24 bg-background">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-semibold mb-4">
              <Smartphone className="w-3.5 h-3.5" />
              Mobile App
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Manage everything from <span className="gradient-text">your phone</span>
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Download the Bluebird app to pay bills, run speed tests, chat with support, and control
              your router — all in one place.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="p-3 rounded-xl bg-card border border-border/50 hover:border-brand-500/30 transition-colors text-center"
                >
                  <div className="p-2 rounded-lg bg-brand-500/10 w-fit mx-auto mb-2">
                    <f.icon className="w-4 h-4 text-brand-500" />
                  </div>
                  <div className="text-xs font-semibold mb-0.5">{f.label}</div>
                  <div className="text-[10px] text-muted-foreground">{f.desc}</div>
                </motion.div>
              ))}
            </div>

            <div className="flex gap-3 mt-8">
              <button className="px-5 py-3 bg-foreground text-background rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity">
                App Store
              </button>
              <button className="px-5 py-3 bg-foreground text-background rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity">
                Google Play
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative flex justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 to-cyan-500/10 rounded-3xl blur-2xl" />
            <div className="relative w-72 h-[500px] rounded-[2.5rem] bg-card border-4 border-border/50 shadow-elevation-5 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-8 bg-card border-b border-border/50 flex items-center justify-center">
                <div className="w-20 h-5 bg-background rounded-full" />
              </div>
              <div className="pt-12 px-4 space-y-4">
                <div className="p-4 rounded-xl bg-brand-500/10 border border-brand-500/20">
                  <div className="text-xs text-brand-600 dark:text-brand-400 mb-1">Current Plan</div>
                  <div className="text-lg font-bold">Fiber Pro</div>
                  <div className="text-xs text-muted-foreground">100 Mbps</div>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border/50">
                  <div className="text-xs text-muted-foreground mb-2">Usage This Month</div>
                  <div className="h-2 bg-surface-sunken rounded-full mb-2">
                    <div className="h-full w-3/4 bg-gradient-to-r from-brand-500 to-cyan-400 rounded-full" />
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">750 GB used</span>
                    <span className="font-semibold">Unlimited</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-card border border-border/50 text-center">
                    <Gauge className="w-5 h-5 text-brand-500 mx-auto mb-1" />
                    <div className="text-xs font-semibold">Speed Test</div>
                  </div>
                  <div className="p-3 rounded-xl bg-card border border-border/50 text-center">
                    <CreditCard className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
                    <div className="text-xs font-semibold">Pay Bill</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
