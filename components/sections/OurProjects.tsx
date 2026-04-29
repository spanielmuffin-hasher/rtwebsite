import { SectionReveal, StaggerReveal } from "@/components/SectionReveal";

const PROJECTS = [
  {
    title: "Make a wish",
    description:
      "“Make a Wish – Let the Magic Happen” is a heartfelt flagship initiative dedicated to fulfilling the cherished wishes of children battling cancer, bringing them moments of joy, hope, and unforgettable happiness.",
    year: "2026",
  },
  {
    title: "Namma Vote",
    description:
      "“Namma Vote” is a voter awareness initiative aimed at educating and empowering citizens, especially the youth, to actively participate in the democratic process.",
    year: "2026",
  },
];

export function OurProjects() {
  return (
    <section className="py-24 bg-white">
      <div className="container-wide section-padding">
        <SectionReveal className="text-center mb-16">

          <h2 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-5">
            Crystals in Action
          </h2>
          <p className="text-neutral-500 max-w-xl mx-auto leading-relaxed">
          Driven by service, united by purpose — creating change that truly matters.
          </p>
        </SectionReveal>

        <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project) => (
            <div
              key={project.title}
              className="group flex gap-5 p-7 rounded-3xl border border-neutral-100 hover:border-primary/20 hover:shadow-card transition-all duration-400"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center">
                <span className="w-3 h-3 rounded-full bg-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-neutral-300">·</span>
                  <span className="text-xs text-neutral-400">{project.year}</span>
                </div>
                <h3 className="font-display font-bold text-neutral-900 text-lg mb-2 group-hover:text-primary transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="text-neutral-500 text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
