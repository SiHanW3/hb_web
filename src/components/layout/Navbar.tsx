"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const smooth = [0.22, 1, 0.36, 1] as const;

const ourWorkItems = [
  {
    href: "/our-work/rigid-box",
    label: "Rigid Box",
    desc: "Premium boxes for luxury brands",
  },
  {
    href: "/our-work/book-manual",
    label: "Book & Manual",
    desc: "Beautifully bound printed materials",
  },
  {
    href: "/our-work/label",
    label: "Label",
    desc: "Custom labels with shelf impact",
  },
];

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/our-work", label: "Our Work", dropdown: true },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isOurWorkActive = pathname.startsWith("/our-work");

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
      <nav className="w-full max-w-[1100px] bg-canvas/80 backdrop-blur-xl border border-hairline/60 rounded-2xl shadow-[0_2px_24px_rgba(20,20,19,0.06)]">
        <div className="px-8 lg:px-10 flex items-center justify-between h-[64px]">
          <Link
            href="/"
            className="font-[family-name:var(--font-display)] text-2xl text-ink tracking-tight"
          >
            HuiBao
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {links.map((link) =>
              link.dropdown ? (
                <div key={link.href} className="relative" ref={dropdownRef}>
                  <button
                    className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                      isOurWorkActive ? "text-ink" : "text-muted hover:text-ink"
                    }`}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    {link.label}
                    <ChevronDown
                      size={13}
                      className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.97 }}
                        transition={{ duration: 0.2, ease: smooth }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[280px] origin-top"
                      >
                        {/* Dropdown card */}
                        <div className="bg-canvas/95 backdrop-blur-xl rounded-xl border border-hairline/60 shadow-[0_8px_32px_rgba(20,20,19,0.1),0_1px_2px_rgba(20,20,19,0.04)] overflow-hidden">
                          {/* Header */}
                          <Link
                            href="/our-work"
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center justify-between px-5 py-3.5 border-b border-hairline/40 group transition-colors hover:bg-surface-soft/50"
                          >
                            <span
                              className={`text-sm font-semibold tracking-tight ${
                                pathname === "/our-work" ? "text-primary" : "text-ink"
                              }`}
                            >
                              All Products
                            </span>
                            <ArrowRight
                              size={13}
                              className="text-muted-soft group-hover:text-primary group-hover:translate-x-0.5 transition-all"
                            />
                          </Link>

                          {/* Items */}
                          <div className="py-1.5">
                            {ourWorkItems.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setDropdownOpen(false)}
                                className={`block px-5 py-3 transition-colors group ${
                                  pathname === item.href
                                    ? "bg-surface-soft/60"
                                    : "hover:bg-surface-soft/40"
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <span
                                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                                      pathname === item.href
                                        ? "bg-primary"
                                        : "bg-hairline group-hover:bg-primary/50"
                                    }`}
                                  />
                                  <span
                                    className={`text-sm font-medium ${
                                      pathname === item.href
                                        ? "text-ink"
                                        : "text-body group-hover:text-ink"
                                    }`}
                                  >
                                    {item.label}
                                  </span>
                                </div>
                                <p className="text-xs text-muted mt-0.5 ml-[14px] leading-relaxed">
                                  {item.desc}
                                </p>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    pathname === link.href ||
                    (link.href !== "/" && pathname.startsWith(link.href))
                      ? "text-ink"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center h-10 px-6 bg-primary text-on-primary text-sm font-medium rounded-lg hover:bg-primary-active transition-colors"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-ink"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-hairline/40 overflow-hidden"
            >
              <div className="px-6 py-4 flex flex-col gap-1">
                {links.map((link) =>
                  link.dropdown ? (
                    <div key={link.href}>
                      <button
                        className={`flex items-center justify-between w-full py-3 text-sm font-medium ${
                          isOurWorkActive ? "text-ink" : "text-muted"
                        }`}
                        onClick={() =>
                          setMobileDropdownOpen(!mobileDropdownOpen)
                        }
                      >
                        {link.label}
                        <ChevronDown
                          size={14}
                          className={`transition-transform ${mobileDropdownOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      <AnimatePresence>
                        {mobileDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-4 flex flex-col gap-1 overflow-hidden"
                          >
                            <Link
                              href="/our-work"
                              onClick={() => setMobileOpen(false)}
                              className={`py-2 text-sm font-medium ${
                                pathname === "/our-work"
                                  ? "text-ink"
                                  : "text-muted"
                              }`}
                            >
                              All Products
                            </Link>
                            {ourWorkItems.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className={`py-2 text-sm font-medium ${
                                  pathname === item.href
                                    ? "text-ink"
                                    : "text-muted"
                                }`}
                              >
                                {item.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`py-3 text-sm font-medium ${
                        pathname === link.href ? "text-ink" : "text-muted"
                      }`}
                    >
                      {link.label}
                    </Link>
                  )
                )}
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 inline-flex items-center justify-center h-11 px-6 bg-primary text-on-primary text-sm font-medium rounded-lg"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}
