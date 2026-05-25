"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rahim Ahmed",
    role: "Pro Gamer",
    avatar: "RA",
    content: "Switched from cable to Bluebird fiber. My ping dropped from 45ms to 3ms. Game changer for competitive CS2.",
    rating: 5,
    package: "Fiber Pro",
  },
  {
    name: "Fatima Khan",
    role: "Content Creator",
    avatar: "FK",
    content: "Uploading 4K videos used to take hours. Now it takes minutes. The symmetrical speeds are incredible.",
    rating: 5,
    package: "Fiber Ultra",
  },
  {
    name: "Tanvir Hassan",
    role: "Small Business Owner",
    avatar: "TH",
    content: "We run 15 devices in our office. No slowdowns, no downtime. The static IP and SLA are exactly what we needed.",
    rating: 5,
    package: "Fiber Gigabit",
  },
  {
    name: "Nusrat Jahan",
    role: "Software Engineer",
    avatar: "NJ",
    content: "Working from home with video calls all day. The connection is rock solid. Support team is actually helpful.",
    rating: 5,
    package: "Fiber Home",
  },
  {
    name: "Imran Hossain",
    role: "Streamer",
    avatar: "IH",
    content: "Streaming 1080p60 to Twitch with zero dropped frames. BDIX peering makes local content lightning fast.",
    rating: 5,
    package: "Fiber Ultra",
  },
  {
    name: "Sabrina Rahman",
    role: "Family of 6",
    avatar: "SR",
    content: "Kids gaming, parents working, grandma video calling — all at once. No complaints. Worth every taka.",
    rating: 5,
    package: "Fiber Pro",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-background">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold mb-4">
            <Star className="w-3.5 h-3.5" />
            Customer Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Loved by <span className="gradient-text">50,000+ subscribers</span>
          </h2>
          <p className="text-muted-foreground">
            Real feedback from real customers across Bangladesh.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative p-6 rounded-2xl bg-card border border-border/50 hover:border-brand-500/20 transition-colors"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-brand-500/10" />
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, ri) => (
                  <Star key={ri} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">&ldquo;{t.content}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-cyan-400 flex items-center justify-center text-white text-sm font-bold">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role} &middot; {t.package}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
