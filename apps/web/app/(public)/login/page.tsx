"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Wifi, Eye, EyeOff, ArrowRight, Shield } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<"customer" | "staff">("customer");

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-cyan-500/5" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="relative w-full max-w-md mx-4"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-cyan-400 flex items-center justify-center shadow-glow-cyan">
              <Wifi className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">Bluebird Online</span>
          </Link>
          <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
          <p className="text-sm text-muted-foreground">Sign in to your account</p>
        </div>

        <div className="p-8 rounded-2xl bg-card border border-border/50 shadow-elevation-3">
          <div className="flex p-1 rounded-xl bg-surface-elevated border border-border/50 mb-6">
            <button onClick={() => setUserType("customer")}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
                userType === "customer" ? "bg-brand-600 text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >Customer</button>
            <button onClick={() => setUserType("staff")}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
                userType === "staff" ? "bg-brand-600 text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >Staff</button>
          </div>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">
                {userType === "customer" ? "Customer ID or Email" : "Staff Email"}
              </label>
              <input type="text"
                placeholder={userType === "customer" ? "BB-10245 or email@example.com" : "engineer@bluebird.online"}
                className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} placeholder="Enter your password"
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all text-sm pr-12"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-accent text-muted-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-border accent-brand-600" />
                <span className="text-sm text-muted-foreground">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-sm text-brand-600 dark:text-brand-400 hover:underline">
                Forgot password?
              </Link>
            </div>

            <button type="submit"
              className="w-full py-3 bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-xl transition-colors shadow-glow-brand flex items-center justify-center gap-2"
            >
              Sign In <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {userType === "customer" && (
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-brand-600 dark:text-brand-400 hover:underline font-medium">
                  Get connected
                </Link>
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Shield className="w-3 h-3" />
          <span>Secured with 256-bit encryption</span>
        </div>
      </motion.div>
    </div>
  );
}
