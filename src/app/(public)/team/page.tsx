import { Heart, Users, Lightbulb } from "lucide-react";
import AnimateIn from "@/components/ui/AnimateIn";
import SectionHeader from "@/components/ui/SectionHeader";
import CtaBand from "@/components/ui/CtaBand";
import TextReveal from "@/components/ui/TextReveal";
import ScrollRevealSection from "@/components/ui/ScrollRevealSection";
import { prisma } from "@/lib/prisma";

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

export default async function TeamPage() {
  const members = await prisma.teamMember.findMany({
    orderBy: { order: "asc" },
  });
  return (
    <main>
      {/* Hero */}
      <section className="min-h-[calc(100vh-88px)] flex items-center px-6 lg:px-10">
        <div className="max-w-[800px] mx-auto text-center">
          <AnimateIn direction="left" amount={16} blur>
            <span className="text-xs font-medium text-primary tracking-[1.5px] uppercase mb-4 block">
              Our Team
            </span>
          </AnimateIn>
          <TextReveal
            text="The People Behind Every Package"
            as="h1"
            className="font-[family-name:var(--font-display)] text-5xl md:text-6xl lg:text-7xl text-ink tracking-tight leading-[1.1]"
            delay={0.1}
            staggerDelay={0.05}
          />
          <AnimateIn delay={0.6} blur>
            <p className="mt-6 text-lg text-body max-w-[560px] mx-auto leading-relaxed">
              A multidisciplinary team of designers, engineers, and strategists
              united by one goal — exceptional packaging.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Team Members - Zigzag */}
      <section className="py-24 px-6 lg:px-10 bg-surface-soft">
        <div className="max-w-[1200px] mx-auto space-y-20">
          {members.map((member, i) => {
            const imageFirst = i % 2 === 0;
            return (
              <ScrollRevealSection key={member.name}>
                <div
                  className={`grid md:grid-cols-2 gap-10 lg:gap-16 items-center ${
                    !imageFirst ? "md:[direction:rtl]" : ""
                  }`}
                >
                  {/* Photo */}
                  <AnimateIn
                    direction={imageFirst ? "left" : "right"}
                    amount={40}
                    blur
                    delay={0.1}
                    className={!imageFirst ? "md:[direction:ltr]" : ""}
                  >
                    <div className="aspect-[3/4] rounded-2xl bg-surface-card overflow-hidden" />
                  </AnimateIn>

                  {/* Text */}
                  <div className={`flex flex-col justify-center ${!imageFirst ? "md:[direction:ltr]" : ""}`}>
                    <AnimateIn delay={0.15} blur>
                      <span className="text-xs font-medium text-primary tracking-[1.5px] uppercase mb-3 block">
                        {member.role}
                      </span>
                    </AnimateIn>
                    <AnimateIn delay={0.25} blur>
                      <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-ink tracking-tight mb-4">
                        {member.name}
                      </h2>
                    </AnimateIn>
                    {member.bio && (
                      <AnimateIn delay={0.35} blur>
                        <p className="text-base text-body leading-relaxed">
                          {member.bio}
                        </p>
                      </AnimateIn>
                    )}
                  </div>
                </div>
              </ScrollRevealSection>
            );
          })}
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
            <AnimateIn
              key={v.title}
              delay={i * 0.12}
              direction={i === 0 ? "left" : i === 2 ? "right" : "up"}
              amount={40}
              blur
            >
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
