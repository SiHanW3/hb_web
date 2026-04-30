"use client";

import { useState, FormEvent } from "react";
import { MapPin, Mail, Phone } from "lucide-react";
import AnimateIn from "@/components/ui/AnimateIn";
import { socialLinks } from "@/components/ui/SocialIcons";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    lines: ["Building 12, Xihu Industrial Park", "Hangzhou, Zhejiang 310000"],
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["hello@huibao.com", "design@huibao.com"],
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: ["+86 571 8888 6666", "Mon – Fri, 9:00 – 18:00 CST"],
  },
];

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <main>
      {/* Hero */}
      <section className="py-28 md:py-36 px-6 lg:px-10">
        <AnimateIn className="max-w-[800px] mx-auto text-center">
          <span className="text-xs font-medium text-primary tracking-[1.5px] uppercase mb-4 block">
            Contact
          </span>
          <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl lg:text-7xl text-ink tracking-tight leading-[1.1]">
            Get In Touch
          </h1>
          <p className="mt-6 text-lg text-body max-w-[560px] mx-auto leading-relaxed">
            Have a project in mind? We&apos;d love to hear about it. Reach out
            and let&apos;s start creating together.
          </p>
        </AnimateIn>
      </section>

      {/* Quick Contact Channels */}
      <section className="px-6 lg:px-10 pb-12">
        <AnimateIn className="max-w-[1200px] mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-ink tracking-tight mb-6 text-center">
            Reach Us Directly
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-3 rounded-xl border border-hairline bg-canvas hover:bg-surface-soft hover:border-primary/30 transition-all group"
              >
                <span className="w-6 h-6 text-body group-hover:text-primary transition-colors">
                  {link.icon}
                </span>
                <span className="text-sm font-medium text-ink">{link.name}</span>
              </a>
            ))}
          </div>
        </AnimateIn>
      </section>

      {/* Form + Info */}
      <section className="py-24 px-6 lg:px-10">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-5 gap-12">
          {/* Form */}
          <AnimateIn className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-ink mb-2"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full h-12 px-4 rounded-lg border border-hairline bg-canvas text-ink text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-ink mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full h-12 px-4 rounded-lg border border-hairline bg-canvas text-ink text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-ink mb-2"
                >
                  Company
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  className="w-full h-12 px-4 rounded-lg border border-hairline bg-canvas text-ink text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-ink mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-hairline bg-canvas text-ink text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center justify-center h-12 px-8 bg-primary text-on-primary text-sm font-medium rounded-lg hover:bg-primary-active transition-colors disabled:opacity-60"
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>

              {status === "sent" && (
                <p className="text-sm text-primary">
                  Thank you! We&apos;ll get back to you soon.
                </p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-600">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </AnimateIn>

          {/* Contact Info */}
          <AnimateIn className="lg:col-span-2 space-y-6" delay={0.15}>
            {contactInfo.map((item) => (
              <div
                key={item.title}
                className="border border-hairline rounded-2xl p-8"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-lg text-ink tracking-tight mb-2">
                  {item.title}
                </h3>
                {item.lines.map((line) => (
                  <p key={line} className="text-sm text-body leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </AnimateIn>
        </div>
      </section>
    </main>
  );
}
