"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Download, CheckCircle2, Clock, AlertTriangle, Wallet, Banknote, Smartphone } from "lucide-react";

const invoices = [
  { id: "INV-2026-0542", period: "May 2026", amount: 1299, status: "paid", date: "May 1, 2026", method: "bKash" },
  { id: "INV-2026-0541", period: "Apr 2026", amount: 1299, status: "paid", date: "Apr 1, 2026", method: "Nagad" },
  { id: "INV-2026-0540", period: "Mar 2026", amount: 1299, status: "paid", date: "Mar 1, 2026", method: "SSLCommerz" },
  { id: "INV-2026-0539", period: "Feb 2026", amount: 899, status: "paid", date: "Feb 1, 2026", method: "bKash" },
  { id: "INV-2026-0538", period: "Jan 2026", amount: 899, status: "paid", date: "Jan 1, 2026", method: "Bank Transfer" },
];

const paymentMethods = [
  { name: "bKash", icon: Smartphone, color: "bg-pink-500/10 text-pink-500", desc: "Mobile banking" },
  { name: "Nagad", icon: Wallet, color: "bg-amber-500/10 text-amber-500", desc: "Mobile banking" },
  { name: "SSLCommerz", icon: CreditCard, color: "bg-brand-500/10 text-brand-500", desc: "Card / Bank" },
  { name: "Bank Transfer", icon: Banknote, color: "bg-emerald-500/10 text-emerald-500", desc: "Direct deposit" },
];

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    paid: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    overdue: "bg-red-500/10 text-red-500 border-red-500/20",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status] || styles.pending}`}>
      {status === "paid" ? <CheckCircle2 className="w-3 h-3" /> : status === "pending" ? <Clock className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export default function BillingPage() {
  const [selectedMethod, setSelectedMethod] = useState("bKash");

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold">Billing</h1>
        <p className="text-sm text-muted-foreground">Manage invoices and payments</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="p-6 rounded-2xl bg-gradient-to-br from-brand-500/10 to-cyan-500/10 border border-brand-500/20"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-sm text-muted-foreground mb-1">Current Bill - June 2026</div>
            <div className="text-4xl font-bold">৳1,299</div>
            <div className="flex items-center gap-2 mt-2">
              <Clock className="w-4 h-4 text-amber-500" />
              <span className="text-sm text-amber-500">Due in 5 days (June 1, 2026)</span>
            </div>
          </div>
          <button className="px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-xl transition-colors shadow-glow-brand">
            Pay Now
          </button>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="p-6 rounded-2xl bg-card border border-border/50"
      >
        <h3 className="font-semibold mb-4">Payment Methods</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {paymentMethods.map((method) => (
            <button key={method.name} onClick={() => setSelectedMethod(method.name)}
              className={`p-4 rounded-xl border transition-all text-left ${
                selectedMethod === method.name ? "border-brand-500/50 bg-brand-500/5" : "border-border/50 hover:border-brand-500/30"
              }`}
            >
              <div className={`p-2 rounded-lg ${method.color} w-fit mb-3`}>
                <method.icon className="w-5 h-5" />
              </div>
              <div className="font-semibold text-sm">{method.name}</div>
              <div className="text-xs text-muted-foreground">{method.desc}</div>
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="p-6 rounded-2xl bg-card border border-border/50"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Invoice History</h3>
          <button className="text-sm text-brand-600 dark:text-brand-400 hover:underline">Download All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3">Invoice</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3">Period</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3">Amount</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3">Status</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3">Method</th>
                <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-accent/30 transition-colors">
                  <td className="py-3 text-sm font-medium">{inv.id}</td>
                  <td className="py-3 text-sm text-muted-foreground">{inv.period}</td>
                  <td className="py-3 text-sm font-semibold">৳{inv.amount.toLocaleString()}</td>
                  <td className="py-3"><StatusBadge status={inv.status} /></td>
                  <td className="py-3 text-sm text-muted-foreground">{inv.method}</td>
                  <td className="py-3 text-right">
                    <button className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
