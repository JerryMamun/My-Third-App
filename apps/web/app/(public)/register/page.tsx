"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Wifi, Eye, EyeOff, ArrowRight, MapPin, Check } from "lucide-react";

const steps = [
  { id: 1, label: "Check Coverage" },
  { id: 2, label: "Select Plan" },
  { id: 3, label: "Your Details" },
  { id: 4, label: "Confirm" },
];

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [areaAvailable, setAreaAvailable] = useState<boolean | null>(null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden py-12">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-cyan-500/5" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="relative w-full max-w-lg mx-4"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-cyan-400 flex items-center justify-center shadow-glow-cyan">
              <Wifi className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">Bluebird Online</span>
          </Link>
          <h1 className="text-2xl font-bold mb-2">Get Connected</h1>
          <p className="text-sm text-muted-foreground">Check availability and sign up in minutes</p>
        </div>

        <div className="flex items-center justify-between mb-8 px-4">
          {steps.map((step, i) => (
            <div key={step.id} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                currentStep >= step.id ? "bg-brand-600 text-white" : "bg-surface-elevated text-muted-foreground border border-border"
              }`}>
                {currentStep > step.id ? <Check className="w-4 h-4" /> : step.id}
              </div>
              {i < steps.length - 1 && (
                <div className={`w-12 h-0.5 mx-2 transition-colors ${currentStep > step.id ? "bg-brand-500" : "bg-border"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="p-8 rounded-2xl bg-card border border-border/50 shadow-elevation-3">
          {currentStep === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-lg font-semibold mb-4">Check coverage in your area</h2>
              <div className="relative mb-4">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input type="text" placeholder="Enter your area (e.g., Gulshan 2)"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-border focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all text-sm"
                />
              </div>
              <button onClick={() => setAreaAvailable(true)}
                className="w-full py-3 bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-xl transition-colors"
              >
                Check Availability
              </button>

              {areaAvailable === true && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center"
                >
                  <Check className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
                  <div className="font-semibold text-emerald-600">Great news!</div>
                  <div className="text-sm text-emerald-600/80">Fiber is available in your area</div>
                  <button onClick={() => setCurrentStep(2)}
                    className="mt-3 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-lg transition-colors"
                  >
                    Continue
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-lg font-semibold mb-4">Select your plan</h2>
              <div className="space-y-3 mb-6">
                {[
                  { name: "Fiber Home", speed: 50, price: 899, popular: false },
                  { name: "Fiber Pro", speed: 100, price: 1299, popular: true },
                  { name: "Fiber Ultra", speed: 200, price: 1999, popular: false },
                ].map((plan) => (
                  <label key={plan.name}
                    className="flex items-center gap-4 p-4 rounded-xl border border-border/50 hover:border-brand-500/30 transition-colors cursor-pointer bg-surface-elevated/50"
                  >
                    <input type="radio" name="plan" className="w-4 h-4 accent-brand-600" defaultChecked={plan.popular} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{plan.name}</span>
                        {plan.popular && <span className="px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-600 text-[10px] font-bold">POPULAR</span>}
                      </div>
                      <div className="text-xs text-muted-foreground">{plan.speed} Mbps symmetrical</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">৳{plan.price}</div>
                      <div className="text-xs text-muted-foreground">/month</div>
                    </div>
                  </label>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setCurrentStep(1)}
                  className="flex-1 py-3 border border-border hover:bg-accent rounded-xl transition-colors text-sm font-medium"
                >
                  Back
                </button>
                <button onClick={() => setCurrentStep(3)}
                  className="flex-1 py-3 bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-xl transition-colors"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-lg font-semibold mb-4">Your details</h2>
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">First Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Last Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Email</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Phone</label>
                  <input type="tel" placeholder="01XXXXXXXXX" className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Address</label>
                  <textarea rows={2} className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all text-sm resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Password</label>
                  <div className="relative">
                    <input type={showPassword ? "text" : "password"}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all text-sm pr-12"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-accent text-muted-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setCurrentStep(2)}
                  className="flex-1 py-3 border border-border hover:bg-accent rounded-xl transition-colors text-sm font-medium"
                >
                  Back
                </button>
                <button onClick={() => setCurrentStep(4)}
                  className="flex-1 py-3 bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-xl transition-colors"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-emerald-500" />
              </div>
              <h2 className="text-lg font-semibold mb-2">Registration Complete!</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Thank you for choosing Bluebird. Our team will contact you within 24 hours to schedule installation.
              </p>
              <div className="p-4 rounded-xl bg-surface-elevated border border-border/50 mb-6 text-left">
                <div className="text-sm font-medium mb-2">What happens next?</div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-500" /> Technician survey (within 48h)</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-500" /> Fiber cable installation</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-500" /> ONU & router setup</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-500" /> Go live!</li>
                </ul>
              </div>
              <Link href="/login"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-xl transition-colors"
              >
                Go to Login <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
