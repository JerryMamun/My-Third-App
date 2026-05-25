"use client";

import { motion } from "framer-motion";
import {
  Wifi,
  CreditCard,
  Ticket,
  Activity,
  Router,
  Zap,
  AlertTriangle,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Smartphone,
  Gauge,
} from "lucide-react";
import Link from "next/link";

function StatCard({ title, value, subtitle, icon: Icon, trend, trendUp, color, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="p-5 rounded-2xl bg-card border border-border/50 hover:border-brand-500/20 transition-colors"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2.5 rounded-xl ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-medium ${trendUp ? "text-emerald-500" : "text-red-500"}`}>
            {trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
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

function UsageChart() {
  const data = [45, 62, 38, 75, 55, 80, 65, 90, 70, 85, 60, 95, 55, 70, 88];
  const max = Math.max(...data);

  return (
    <div className="p-6 rounded-2xl bg-card border border-border/50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold">Data Usage</h3>
          <p className="text-xs text-muted-foreground">Last 15 days</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Total:</span>
          <span className="text-sm font-semibold">847 GB</span>
        </div>
      </div>
      <div className="flex items-end gap-1.5 h-40">
        {data.map((val, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${(val / max) * 100}%` }}
            transition={{ delay: i * 0.03, duration: 0.4 }}
            className="flex-1 rounded-t-sm bg-brand-500/20 hover:bg-brand-500/40 transition-colors relative group"
          >
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-medium bg-card border border-border px-2 py-1 rounded whitespace-nowrap">
              {val} GB
            </div>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-between mt-3 text-xs text-muted-foreground">
        <span>May 10</span>
        <span>May 25</span>
      </div>
    </div>
  );
}

export default function CustomerDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold">Welcome back, Rahim</h1>
          <p className="text-sm text-muted-foreground">Here&apos;s what&apos;s happening with your connection</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-xs font-semibold text-emerald-600">Online</span>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Current Plan"
          value="Fiber Pro"
          subtitle="100 Mbps"
          icon={Wifi}
          color="bg-brand-500/10 text-brand-500"
          delay={0}
        />
        <StatCard
          title="Bill Due"
          value="৳1,299"
          subtitle="Due June 1, 2026"
          icon={CreditCard}
          color="bg-amber-500/10 text-amber-500"
          delay={0.1}
        />
        <StatCard
          title="Open Tickets"
          value="1"
          subtitle="Last updated 2h ago"
          icon={Ticket}
          color="bg-cyan-500/10 text-cyan-500"
          delay={0.2}
        />
        <StatCard
          title="Data Used"
          value="847 GB"
          subtitle="Unlimited plan"
          icon={Activity}
          trend="12%"
          trendUp={false}
          color="bg-violet-500/10 text-violet-500"
          delay={0.3}
        />
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Usage Chart */}
        <div className="lg:col-span-2">
          <UsageChart />
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="p-5 rounded-2xl bg-card border border-border/50"
          >
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              {[
                { icon: CreditCard, label: "Pay Bill", href: "/billing", color: "text-emerald-500" },
                { icon: Ticket, label: "New Support Ticket", href: "/tickets/new", color: "text-cyan-500" },
                { icon: Gauge, label: "Run Speed Test", href: "#", color: "text-brand-500" },
                { icon: Router, label: "Restart Router", href: "#", color: "text-violet-500" },
              ].map((action, i) => (
                <Link
                  key={i}
                  href={action.href}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent transition-colors group"
                >
                  <div className={`p-2 rounded-lg ${action.color.replace("text-", "bg-").replace("500", "500/10")}`}>
                    <action.icon className={`w-4 h-4 ${action.color}`} />
                  </div>
                  <span className="text-sm font-medium flex-1">{action.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* ONU Status */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="p-5 rounded-2xl bg-card border border-border/50"
          >
            <h3 className="font-semibold mb-4">ONU Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm">Device Online</span>
                </div>
                <span className="text-xs text-muted-foreground">14d uptime</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Signal Strength</span>
                <span className="text-sm font-semibold text-emerald-500">-18.5 dBm</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Fiber Distance</span>
                <span className="text-sm font-semibold">1.2 km</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">OLT Port</span>
                <span className="text-sm font-semibold">PON-03 / ONU-12</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-6 rounded-2xl bg-card border border-border/50"
      >
        <h3 className="font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { icon: CreditCard, text: "Payment of ৳1,299 received", time: "2 days ago", color: "text-emerald-500", bg: "bg-emerald-500/10" },
            { icon: Ticket, text: "Ticket #TKT-2026-0042 resolved", time: "3 days ago", color: "text-cyan-500", bg: "bg-cyan-500/10" },
            { icon: AlertTriangle, text: "Brief outage detected (2 min)", time: "1 week ago", color: "text-amber-500", bg: "bg-amber-500/10" },
            { icon: Smartphone, text: "New device connected: iPhone 15", time: "1 week ago", color: "text-brand-500", bg: "bg-brand-500/10" },
            { icon: Clock, text: "Plan upgraded to Fiber Pro", time: "2 weeks ago", color: "text-violet-500", bg: "bg-violet-500/10" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent/50 transition-colors">
              <div className={`p-2 rounded-lg ${item.bg}`}>
                <item.icon className={`w-4 h-4 ${item.color}`} />
              </div>
              <div className="flex-1">
                <div className="text-sm">{item.text}</div>
              </div>
              <div className="text-xs text-muted-foreground">{item.time}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
