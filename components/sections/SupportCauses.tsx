import { SectionReveal, StaggerReveal } from "@/components/SectionReveal";

const CAUSES = [
  {
    title: "Food Donation Drive",
    description:
      "Combating hunger in underserved communities through regular food distribution drives, reaching hundreds of families across Coimbatore.",
    icon: "🍱",
    color: "bg-orange-50 border-orange-100",
    accent: "text-orange-600",
  },
  {
    title: "Tribal Village Development",
    description:
      "Empowering tribal communities with education, healthcare access, and sustainable livelihood programs in remote villages.",
    icon: "🌿",
    color: "bg-green-50 border-green-100",
    accent: "text-green-700",
  },
  {
    title: "Freeze the Frame",
    description:
      "Preserving memories and creating opportunities through photography workshops and visual storytelling for underprivileged youth.",
    icon: "📸",
    color: "bg-blue-50 border-blue-100",
    accent: "text-blue-700",
  },
];

export function SupportCauses() {
  return (
    <section className="py-24 bg-white">
      <div className="container-wide section-padding">
        <SectionReveal className="text-center mb-16">
          <p className="text-primary text-xs font-semibold tracking-[0.25em] uppercase mb-3">
            Support Our Causes
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-5">
            Causes We Champion
          </h2>
          <p className="text-neutral-500 max-w-xl mx-auto leading-relaxed">
            Every initiative we take is driven by purpose. Here are the causes
            closest to our hearts.
          </p>
        </SectionReveal>

        <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CAUSES.map((cause) => (
            <div
              key={cause.title}
              className={`rounded-3xl border p-8 ${cause.color} hover:shadow-card-hover transition-shadow duration-500`}
            >
              <span className="text-4xl mb-5 block">{cause.icon}</span>
              <h3
                className={`font-display font-bold text-xl mb-3 ${cause.accent}`}
              >
                {cause.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed text-sm">
                {cause.description}
              </p>
            </div>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
