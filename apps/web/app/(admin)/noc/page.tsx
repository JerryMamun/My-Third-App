"use client";

import { motion } from "framer-motion";
import {
  Activity,
  Users,
  Router,
  Server,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Wifi,
  WifiOff,
  Gauge,
  Clock,
  MapPin,
  Zap,
} from "lucide-react";

function NocStatCard({ title, value, subtitle, icon: Icon, trend, trendUp, color, delay }: any) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.4 }}
      className="p-5 rounded-2xl bg-card border border-border/50 hover:border-brand-500/20 transition-colors"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2.5 rounded-xl ${color}`}><Icon className="w-5 h-5" /></div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-medium ${trendUp ? "text-emerald-500" : "text-red-500"}`}>
            {trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {trend}
          </div>
        )}
      </div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="text-sm text-muted-foreground">{title}</div>
      {subtitle && <div className="text-xs text-muted-foreground mt-1">{subtitle}</div>}
    </motion.div>
  );
}

function BandwidthChart() {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const data = hours.map(() => Math.floor(Math.random() * 60) + 20);
  const max = Math.max(...data);

  return (
    <div className="p-6 rounded-2xl bg-card border border-border/50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold">Network Bandwidth (24h)</h3>
          <p className="text-xs text-muted-foreground">Aggregate throughput across all POPs</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-brand-500" />
            <span className="text-xs text-muted-foreground">Download</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-400" />
            <span className="text-xs text-muted-foreground">Upload</span>
          </div>
        </div>
      </div>
      <div className="flex items-end gap-1 h-48">
        {data.map((val, i) => (
          <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${(val / max) * 100}%` }} transition={{ delay: i * 0.01, duration: 0.3 }}
            className="flex-1 rounded-t-sm bg-brand-500/30 hover:bg-brand-500/50 transition-colors relative group"
          >
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-medium bg-card border border-border px-2 py-1 rounded whitespace-nowrap">
              {val} Gbps
            </div>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-between mt-3 text-xs text-muted-foreground">
        <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>23:00</span>
      </div>
    </div>
  );
}

export default function NocDashboard() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">NOC Dashboard</h1>
          <p className="text-sm text-muted-foreground">Real-time network operations center</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-xs font-semibold text-emerald-600">All Systems Normal</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <NocStatCard title="Active PPPoE" value="12,847" subtitle="+234 today" icon={Users} trend="1.8%" trendUp={true} color="bg-brand-500/10 text-brand-500" delay={0} />
        <NocStatCard title="Bandwidth Usage" value="68.4 Gbps" subtitle="Peak: 89.2 Gbps" icon={Gauge} trend="5.2%" trendUp={true} color="bg-cyan-500/10 text-cyan-500" delay={0.1} />
        <NocStatCard title="ONU Online" value="12,802 / 12,847" subtitle="99.6% uptime" icon={Server} trend="0.1%" trendUp={false} color="bg-emerald-500/10 text-emerald-500" delay={0.2} />
        <NocStatCard title="Open Tickets" value="23" subtitle="3 critical" icon={AlertTriangle} trend="12%" trendUp={false} color="bg-amber-500/10 text-amber-500" delay={0.3} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2"><BandwidthChart /></div>
        <div className="space-y-4">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            className="p-5 rounded-2xl bg-card border border-border/50"
          >
            <h3 className="font-semibold mb-4">POP Status</h3>
            <div className="space-y-3">
              {[
                { name: "Gulshan POP", status: "Online", users: 3420, load: "72%", color: "bg-emerald-500" },
                { name: "Banani POP", status: "Online", users: 2890, load: "65%", color: "bg-emerald-500" },
                { name: "Dhanmondi POP", status: "Online", users: 4102, load: "89%", color: "bg-amber-500" },
                { name: "Uttara POP", status: "Online", users: 1987, load: "45%", color: "bg-emerald-500" },
                { name: "Mirpur POP", status: "Maintenance", users: 120, load: "N/A", color: "bg-violet-500" },
              ].map((pop, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-surface-elevated border border-border/30">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${pop.color} ${pop.status === "Online" ? "animate-pulse" : ""}`} />
                    <div>
                      <div className="text-sm font-medium">{pop.name}</div>
                      <div className="text-xs text-muted-foreground">{pop.users.toLocaleString()} users</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-medium">{pop.status}</div>
                    <div className="text-xs text-muted-foreground">{pop.load}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
            className="p-5 rounded-2xl bg-card border border-border/50"
          >
            <h3 className="font-semibold mb-4">Recent Alerts</h3>
            <div className="space-y-3">
              {[
                { type: "warning", text: "Dhanmondi POP at 89% capacity", time: "5 min ago" },
                { type: "error", text: "ONU-BB-1245 offline (LOS)", time: "12 min ago" },
                { type: "info", text: "Mirpur POP maintenance started", time: "1 hour ago" },
                { type: "success", text: "Backup link activated - Banani", time: "2 hours ago" },
              ].map((alert, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                  <div className={`p-1.5 rounded-lg ${
                    alert.type === "warning" ? "bg-amber-500/10" : alert.type === "error" ? "bg-red-500/10" : alert.type === "success" ? "bg-emerald-500/10" : "bg-brand-500/10"
                  }`}>
                    {alert.type === "warning" ? <AlertTriangle className="w-4 h-4 text-amber-500" /> :
                     alert.type === "error" ? <WifiOff className="w-4 h-4 text-red-500" /> :
                     alert.type === "success" ? <Wifi className="w-4 h-4 text-emerald-500" /> :
                     <Clock className="w-4 h-4 text-brand-500" />}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm">{alert.text}</div>
                    <div className="text-xs text-muted-foreground">{alert.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
