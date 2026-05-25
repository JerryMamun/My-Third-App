"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Clock, CheckCircle2, ChevronRight } from "lucide-react";

const tickets = [
  { id: "TKT-2026-0045", subject: "Slow speed during peak hours", category: "Slow Speed", priority: "medium", status: "open", created: "May 24, 2026", lastUpdate: "2 hours ago" },
  { id: "TKT-2026-0042", subject: "Router not responding after restart", category: "No Internet", priority: "high", status: "resolved", created: "May 20, 2026", lastUpdate: "3 days ago" },
  { id: "TKT-2026-0038", subject: "Bill discrepancy for April", category: "Billing Issue", priority: "low", status: "resolved", created: "May 15, 2026", lastUpdate: "1 week ago" },
  { id: "TKT-2026-0035", subject: "Request static IP upgrade", category: "Package Change", priority: "low", status: "closed", created: "May 10, 2026", lastUpdate: "2 weeks ago" },
];

function PriorityBadge({ priority }: { priority: string }) {
  const styles: Record<string, string> = {
    low: "bg-slate-500/10 text-slate-500",
    medium: "bg-amber-500/10 text-amber-500",
    high: "bg-orange-500/10 text-orange-500",
    critical: "bg-red-500/10 text-red-500",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${styles[priority]}`}>
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    open: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
    resolved: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    closed: "bg-slate-500/10 text-slate-500 border-slate-500/20",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
      {status === "open" ? <Clock className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export default function TicketsPage() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? tickets : tickets.filter((t) => t.status === filter);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Support Tickets</h1>
          <p className="text-sm text-muted-foreground">Manage your support requests</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-xl transition-colors text-sm">
          <Plus className="w-4 h-4" /> New Ticket
        </button>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex items-center gap-2">
        {["all", "open", "resolved", "closed"].map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filter === f ? "bg-brand-500/10 text-brand-600 dark:text-brand-400" : "text-muted-foreground hover:text-foreground hover:bg-accent"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-3">
        {filtered.map((ticket) => (
          <div key={ticket.id} className="p-5 rounded-2xl bg-card border border-border/50 hover:border-brand-500/20 transition-colors cursor-pointer group">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-mono text-muted-foreground">{ticket.id}</span>
                  <PriorityBadge priority={ticket.priority} />
                  <StatusBadge status={ticket.status} />
                </div>
                <h3 className="font-semibold mb-1 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">{ticket.subject}</h3>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{ticket.category}</span>
                  <span>Created {ticket.created}</span>
                  <span>Last update {ticket.lastUpdate}</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-brand-500 transition-colors" />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
