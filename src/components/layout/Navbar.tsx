"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ourWorkItems = [
  { href: "/our-work/rigid-box", label: "Rigid Box" },
  { href: "/our-work/book-manual", label: "Book & Manual" },
  { href: "/our-work/label", label: "Label" },
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
    <nav className="sticky top-0 z-50 bg-canvas/95 backdrop-blur-sm border-b border-hairline">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 flex items-center justify-between h-[72px]">
        <Link href="/" className="font-[family-name:var(--font-display)] text-2xl text-ink tracking-tight">
          HuiBao
        </Link>

        <div className="hidden md:flex items-center gap-8">
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
                    size={14}
                    className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-52 bg-canvas rounded-lg border border-hairline shadow-[0_4px_20px_rgba(20,20,19,0.08)] overflow-hidden"
                    >
                      <Link
                        href="/our-work"
                        onClick={() => setDropdownOpen(false)}
                        className={`block px-4 py-3 text-sm font-medium border-b border-hairline-soft transition-colors ${
                          pathname === "/our-work"
                            ? "text-ink bg-surface-soft"
                            : "text-muted hover:text-ink hover:bg-surface-soft"
                        }`}
                      >
                        All Products
                      </Link>
                      {ourWorkItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setDropdownOpen(false)}
                          className={`block px-4 py-3 text-sm font-medium transition-colors ${
                            pathname === item.href
                              ? "text-ink bg-surface-soft"
                              : "text-muted hover:text-ink hover:bg-surface-soft"
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
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
                    ? "text-ink"
                    : "text-muted hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        <div className="hidden md:block">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center h-11 px-6 bg-primary text-on-primary text-sm font-medium rounded-lg hover:bg-primary-active transition-colors"
          >
            Contact Us
          </Link>
        </div>

        <button
          className="md:hidden text-ink"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-canvas border-t border-hairline"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {links.map((link) =>
                link.dropdown ? (
                  <div key={link.href}>
                    <button
                      className={`flex items-center justify-between w-full py-3 text-sm font-medium ${
                        isOurWorkActive ? "text-ink" : "text-muted"
                      }`}
                      onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
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
                              pathname === "/our-work" ? "text-ink" : "text-muted"
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
                                pathname === item.href ? "text-ink" : "text-muted"
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
  );
}
