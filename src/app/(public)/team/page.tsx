import { Heart, Users, Lightbulb } from "lucide-react";
import AnimateIn from "@/components/ui/AnimateIn";
import SectionHeader from "@/components/ui/SectionHeader";
import CtaBand from "@/components/ui/CtaBand";

const members = [
  { name: "David Chen", role: "CEO" },
  { name: "Sarah Liu", role: "Creative Director" },
  { name: "James Wang", role: "Production Manager" },
  { name: "Emily Zhang", role: "Senior Designer" },
  { name: "Michael Li", role: "QC Lead" },
  { name: "Anna Zhou", role: "Client Relations" },
  { name: "Kevin Wu", role: "Structural Engineer" },
  { name: "Lisa Tang", role: "Graphic Designer" },
];

const values = [
  {
    icon: Heart,
    title: "Passion for Craft",
    desc: "Every fold, finish, and colour choice is made with care. We sweat the details because our partners' brands deserve nothing less.",
  },
  {
    icon: Users,
    title: "Client Partnership",
    desc: "We don't just take orders — we collaborate. Your success is our success, from first sketch to final shipment.",
  },
  {
    icon: Lightbulb,
    title: "Continuous Innovation",
    desc: "New materials, sustainable processes, smarter structures — we invest in R&D so your packaging stays ahead of the curve.",
  },
];

export default function TeamPage() {
  return (
    <main>
      {/* Hero */}
      <section className="py-28 md:py-36 px-6 lg:px-10">
        <AnimateIn className="max-w-[800px] mx-auto text-center">
          <span className="text-xs font-medium text-primary tracking-[1.5px] uppercase mb-4 block">
            Our Team
          </span>
          <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl lg:text-7xl text-ink tracking-tight leading-[1.1]">
            The People Behind Every Package
          </h1>
          <p className="mt-6 text-lg text-body max-w-[560px] mx-auto leading-relaxed">
            A multidisciplinary team of designers, engineers, and strategists
            united by one goal — exceptional packaging.
          </p>
        </AnimateIn>
      </section>

      {/* Team Grid */}
      <section className="py-24 px-6 lg:px-10 bg-surface-soft">
        <div className="max-w-[1200px] mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((m, i) => (
            <AnimateIn key={m.name} delay={i * 0.08} amount={32} spring>
              <div className="bg-canvas rounded-2xl overflow-hidden">
                <div className="aspect-[3/4] bg-surface-card" />
                <div className="p-6">
                  <h3 className="font-[family-name:var(--font-display)] text-lg text-ink tracking-tight">
                    {m.name}
                  </h3>
                  <p className="text-sm text-muted mt-1">{m.role}</p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 lg:px-10">
        <SectionHeader
          eyebrow="Our Values"
          title="What Drives Us"
          description="The principles that guide every decision we make and every package we create."
        />

        <div className="max-w-[1200px] mx-auto mt-16 grid md:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <AnimateIn key={v.title} delay={i * 0.1}>
              <div className="border border-hairline rounded-2xl p-8 h-full">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <v.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-xl text-ink tracking-tight mb-2">
                  {v.title}
                </h3>
                <p className="text-sm text-body leading-relaxed">{v.desc}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      <CtaBand
        title="Join Our Team"
        description="We're always looking for talented people who share our passion for craft and innovation."
        buttonText="View Openings"
        buttonHref="/careers"
      />
    </main>
  );
}
