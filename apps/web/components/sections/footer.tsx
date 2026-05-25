"use client";

import Link from "next/link";
import { Wifi, Mail, Phone, MapPin, Facebook, Twitter, Youtube, Instagram } from "lucide-react";

const footerLinks = {
  Services: [
    { label: "Residential Fiber", href: "/packages" },
    { label: "Business Internet", href: "/business" },
    { label: "Enterprise Solutions", href: "/enterprise" },
    { label: "Gaming Packages", href: "/gaming" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Coverage Map", href: "/coverage" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
  ],
  Support: [
    { label: "Help Center", href: "/support" },
    { label: "Contact Us", href: "/contact" },
    { label: "Status Page", href: "/status" },
    { label: "Report Outage", href: "/outage" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "SLA Agreement", href: "/sla" },
    { label: "Refund Policy", href: "/refund" },
  ],
};

export function PublicFooter() {
  return (
    <footer className="bg-surface-sunken border-t border-border/50">
      <div className="section-container py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-cyan-400 flex items-center justify-center">
                <Wifi className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold">Bluebird Online</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              Premium fiber internet service provider in Bangladesh. Connecting homes and businesses
              with ultra-fast, reliable connectivity.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>09678-123456</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>support@bluebird.online</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Gulshan, Dhaka-1212</span>
              </div>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-sm mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Bluebird Technologies Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {[Facebook, Twitter, Youtube, Instagram].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
