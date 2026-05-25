"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Shield, Clock } from "lucide-react";
import Link from "next/link";

function FiberCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create fiber-like particles
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        color: Math.random() > 0.5 ? "#06b6d4" : "#0ea5e9",
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.15 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      // Draw and update particles
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.6 }} />;
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-surface-elevated">
      <FiberCanvas />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

      <div className="section-container relative z-10 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500" />
            </span>
            <span className="text-sm font-medium text-brand-600 dark:text-brand-400">
              Now serving 50,000+ homes across Bangladesh
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            <span className="block">Internet that</span>
            <span className="block gradient-text">never slows down</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Premium fiber-optic connectivity for homes and businesses. Experience
            ultra-low latency, symmetrical speeds, and 99.9% uptime guarantee.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/packages"
              className="group px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-xl transition-all shadow-glow-brand hover:shadow-glow-cyan flex items-center gap-2"
            >
              Explore Packages
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/coverage"
              className="px-8 py-4 bg-surface-elevated hover:bg-surface-sunken text-foreground font-semibold rounded-xl border border-border transition-colors"
            >
              Check Availability
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto"
          >
            {[
              { icon: Zap, label: "Up to 1 Gbps", desc: "Symmetrical fiber" },
              { icon: Shield, label: "99.9% Uptime", desc: "Enterprise SLA" },
              { icon: Clock, label: "24/7 Support", desc: "Local NOC team" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm">
                <div className="p-2 rounded-lg bg-brand-500/10">
                  <item.icon className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold">{item.label}</div>
                  <div className="text-xs text-muted-foreground">{item.desc}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
