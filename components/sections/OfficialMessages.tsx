import { SectionReveal } from "@/components/SectionReveal";

const MESSAGES = [
  {
    role: "Message from President",
    name: "President, 2024–25",
    message:
      "As we embark on another remarkable year of service, I am proud to lead a club that consistently demonstrates the Rotaract spirit — fellowship, professional development, and community impact. Together we will set new benchmarks for District 3206.",
    avatar: "P",
    color: "bg-primary",
  },
  {
    role: "Message from Secretary",
    name: "Secretary, 2024–25",
    message:
      "Every great project begins with a shared vision and disciplined execution. As Secretary, my commitment is to ensure our members are empowered, informed, and inspired to give their best to every initiative we undertake this year.",
    avatar: "S",
    color: "bg-neutral-800",
  },
  {
    role: "Message from Immediate Past President",
    name: "Immediate Past President",
    message:
      "The foundation we built together stands strong. I pass the torch with immense pride and complete confidence in this team. The best of Rotaract Crystals is always the chapter being written right now.",
    avatar: "I",
    color: "bg-neutral-600",
  },
];

export function OfficialMessages() {
  return (
    <section className="py-24 bg-neutral-50">
      <div className="container-wide section-padding">
        <SectionReveal className="text-center mb-16">
          <p className="text-primary text-xs font-semibold tracking-[0.25em] uppercase mb-3">
            Message from Club Officials
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-neutral-900">
            Words from Our Leaders
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MESSAGES.map((item, i) => (
            <SectionReveal
              key={item.role}
              delay={i * 0.12}
              className="relative bg-white rounded-3xl p-8 shadow-card hover:shadow-card-hover transition-shadow duration-500"
            >
              {/* Quote mark */}
              <span className="absolute top-6 right-7 text-7xl font-serif text-neutral-100 leading-none select-none">
                &ldquo;
              </span>

              <p className="text-neutral-600 leading-relaxed text-sm mb-8 relative z-10">
                {item.message}
              </p>

              <div className="flex items-center gap-3">
                <span
                  className={`w-10 h-10 rounded-full ${item.color} flex items-center justify-center text-white font-display font-bold text-base flex-shrink-0`}
                >
                  {item.avatar}
                </span>
                <div>
                  <p className="font-display font-bold text-neutral-900 text-sm">
                    {item.name}
                  </p>
                  <p className="text-primary text-xs font-semibold tracking-wide">
                    {item.role}
                  </p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
