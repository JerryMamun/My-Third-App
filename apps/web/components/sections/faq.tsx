"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "How long does installation take?",
    a: "Standard installation takes 24-48 hours after confirmation. Our technician will visit your location, install the fiber cable, configure the ONU, and set up your WiFi router. You'll be online before they leave.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept bKash, Nagad, SSLCommerz (card/bank), bank transfer, and cash. All digital payments are processed instantly and reflect in your account within minutes.",
  },
  {
    q: "Is there a contract or commitment?",
    a: "No long-term contracts for residential plans. You can cancel anytime with 30 days notice. Business plans may have a 6-month minimum commitment with SLA guarantees.",
  },
  {
    q: "What happens if my internet goes down?",
    a: "Our NOC monitors the network 24/7. Most issues are resolved before you notice. If you experience downtime, create a ticket in the app or call our hotline. We guarantee <2 hour response time for critical issues.",
  },
  {
    q: "Can I upgrade or downgrade my plan?",
    a: "Yes, plan changes are instant. Upgrades take effect immediately. Downgrades apply from the next billing cycle. No extra fees for plan changes.",
  },
  {
    q: "Do you provide the router?",
    a: "Yes, we provide a dual-band WiFi 6 router free with all plans. For mesh coverage or larger homes, we offer premium routers at cost. The router remains our property and is replaced if faulty.",
  },
  {
    q: "What is BDIX peering and why does it matter?",
    a: "BDIX (Bangladesh Internet Exchange) peering means local content (BDIX-connected sites, local game servers, streaming) travels directly through our network without going through international routes. This results in much faster speeds for local content.",
  },
  {
    q: "Is there a fair usage policy?",
    a: "Residential plans have no FUP — truly unlimited. Business plans may have soft limits at extreme usage (10TB+/month) to ensure network quality for all customers. We will contact you before any action.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-surface-elevated">
      <div className="section-container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-semibold mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Frequently asked <span className="gradient-text">questions</span>
          </h2>
          <p className="text-muted-foreground">
            Everything you need to know before getting connected.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl bg-card border border-border/50 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-accent/50 transition-colors"
              >
                <span className="font-medium text-sm pr-4">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
