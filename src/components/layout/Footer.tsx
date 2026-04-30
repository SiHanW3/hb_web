import Link from "next/link";
import SocialIcons from "@/components/ui/SocialIcons";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/our-work", label: "Our Work" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
];

const serviceLinks = [
  { href: "/our-work/rigid-box", label: "Rigid Box" },
  { href: "/our-work/book-manual", label: "Book & Manual" },
  { href: "/our-work/label", label: "Label" },
];

export default function Footer() {
  return (
    <footer className="bg-surface-dark text-on-dark-soft">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-16">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
          <div className="max-w-[300px]">
            <h3 className="font-[family-name:var(--font-display)] text-[28px] text-on-dark tracking-tight mb-4">
              HuiBao
            </h3>
            <p className="text-sm leading-relaxed">
              Design-led packaging solutions for brands that stand out.
            </p>
          </div>

          <div className="flex flex-wrap gap-16">
            <div>
              <h4 className="text-[11px] font-medium text-muted-soft uppercase tracking-[1.5px] mb-3">
                Navigation
              </h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm hover:text-on-dark transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-medium text-muted-soft uppercase tracking-[1.5px] mb-3">
                Services
              </h4>
              <ul className="space-y-2">
                {serviceLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm hover:text-on-dark transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-medium text-muted-soft uppercase tracking-[1.5px] mb-3">
                Contact
              </h4>
              <ul className="space-y-2 text-sm">
                <li>hello@huibao.com</li>
                <li>+86 xxx xxxx xxxx</li>
                <li>Shenzhen, China</li>
              </ul>
              <div className="mt-4">
                <SocialIcons variant="dark" size={18} />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-surface-dark-elevated pt-6">
          <p className="text-[13px] text-muted-soft">
            &copy; {new Date().getFullYear()} HuiBao. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
