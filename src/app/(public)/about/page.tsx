import { PencilRuler, ShieldCheck, Rocket } from "lucide-react";
import AnimateIn from "@/components/ui/AnimateIn";
import SectionHeader from "@/components/ui/SectionHeader";
import CtaBand from "@/components/ui/CtaBand";
import TextReveal from "@/components/ui/TextReveal";
import ScrollRevealSection from "@/components/ui/ScrollRevealSection";
import ProcessTimeline from "./ProcessTimeline";
import GlobalPresenceMap from "./GlobalPresenceMap";

const steps = [
  {
    num: "01",
    title: "Consult",
    desc: "We listen to your brand story, goals, and packaging needs to build a clear creative brief.",
  },
  {
    num: "02",
    title: "Design",
    desc: "Our in-house team crafts custom concepts — from structural engineering to surface graphics.",
  },
  {
    num: "03",
    title: "Produce",
    desc: "Premium materials meet precision manufacturing across our own production lines.",
  },
  {
    num: "04",
    title: "Deliver",
    desc: "Rigorous QC, careful packing, and reliable logistics bring your packaging to life — on time.",
  },
];

const features = [
  {
    icon: PencilRuler,
    title: "In-House Design Team",
    desc: "Full creative control from concept to production, with designers who understand structural and graphic packaging.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Guaranteed",
    desc: "ISO-certified processes and multi-stage quality checks ensure every package meets exacting standards.",
  },
  {
    icon: Rocket,
    title: "Startup-Friendly",
    desc: "Flexible MOQs, transparent pricing, and guided onboarding — we make premium packaging accessible.",
  },
];

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="py-28 md:py-36 px-6 lg:px-10">
        <div className="max-w-[800px] mx-auto text-center">
          <AnimateIn direction="left" amount={16} blur>
            <span className="text-xs font-medium text-primary tracking-[1.5px] uppercase mb-4 block">
              About HuiBao
            </span>
          </AnimateIn>
          <TextReveal
            text="Crafting Brand Experiences Through Packaging"
            as="h1"
            className="font-[family-name:var(--font-display)] text-5xl md:text-6xl lg:text-7xl text-ink tracking-tight leading-[1.1]"
            delay={0.1}
            staggerDelay={0.05}
          />
          <AnimateIn delay={0.6} blur>
            <p className="mt-6 text-lg text-body max-w-[560px] mx-auto leading-relaxed">
              We partner with brands worldwide to create packaging that protects
              products, tells stories, and sparks connection.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 px-6 lg:px-10">
        <div className="max-w-[1200px] mx-auto space-y-20">
          {/* Mission */}
          <ScrollRevealSection className="grid md:grid-cols-2 gap-12 items-center">
            <AnimateIn clipReveal direction="left" amount={0}>
              <div className="aspect-[4/3] rounded-2xl bg-surface-soft" />
            </AnimateIn>
            <AnimateIn delay={0.2} direction="right" amount={32} blur>
              <span className="text-xs font-medium text-primary tracking-[1.5px] uppercase mb-3 block">
                Our Mission
              </span>
              <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-ink tracking-tight mb-4">
                Packaging That Elevates Brands
              </h2>
              <p className="text-body leading-relaxed">
                HuiBao exists to make world-class packaging design and
                manufacturing accessible to brands of every size. We believe
                that exceptional packaging is not a luxury — it is a strategic
                tool that builds trust, drives sales, and creates memorable
                unboxing moments.
              </p>
            </AnimateIn>
          </ScrollRevealSection>

          {/* Vision */}
          <ScrollRevealSection className="grid md:grid-cols-2 gap-12 items-center">
            <AnimateIn clipReveal direction="right" amount={0} className="md:order-2">
              <div className="aspect-[4/3] rounded-2xl bg-surface-soft" />
            </AnimateIn>
            <AnimateIn delay={0.2} direction="left" amount={32} blur className="md:order-1">
              <span className="text-xs font-medium text-primary tracking-[1.5px] uppercase mb-3 block">
                Our Vision
              </span>
              <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-ink tracking-tight mb-4">
                The Future of Sustainable Craft
              </h2>
              <p className="text-body leading-relaxed">
                We envision a world where sustainable materials and cutting-edge
                design converge — where every package leaving our facility
                minimises environmental impact while maximising brand impact.
              </p>
            </AnimateIn>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 px-6 lg:px-10 bg-surface-soft">
        <SectionHeader
          eyebrow="How We Work"
          title="From Concept to Doorstep"
          description="A proven four-step process that turns your vision into tangible, shelf-ready packaging."
        />

        <ProcessTimeline steps={steps} />
      </section>

      {/* Why HuiBao */}
      <section className="py-24 px-6 lg:px-10">
        <SectionHeader
          eyebrow="Why HuiBao"
          title="What Sets Us Apart"
          description="Three pillars that define how we serve our partners and deliver consistent excellence."
        />

        <div className="max-w-[1200px] mx-auto mt-16 grid md:grid-cols-3 gap-6">
          {features.map((feat, i) => (
            <AnimateIn
              key={feat.title}
              delay={i * 0.12}
              direction={i === 0 ? "left" : i === 2 ? "right" : "up"}
              amount={40}
              blur
              rotate={i === 0 ? -2 : i === 2 ? 2 : 0}
            >
              <div className="border border-hairline rounded-2xl p-8 h-full">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <feat.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-xl text-ink tracking-tight mb-2">
                  {feat.title}
                </h3>
                <p className="text-sm text-body leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-24 px-6 lg:px-10 bg-surface-soft">
        <SectionHeader
          eyebrow="Global Presence"
          title="Where We Operate"
          description="With offices in China and supply chain partners across Southeast Asia, we deliver world-class packaging wherever your brand needs it."
        />
        <div className="mt-16">
          <GlobalPresenceMap />
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
