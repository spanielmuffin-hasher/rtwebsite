import { SectionReveal } from "@/components/SectionReveal";

const MESSAGES = [
  {
    name: "President, 2025–26",
    message:
      "As President of the Rotaract Club of Coimbatore Crystals, It is both an honor and a responsibility to lead a team driven by passion and purpose. Our club stands as a platform for young individuals to grow, serve, and create meaningful impact in society. Through every project and initiative, we strive to foster leadership, strengthen bonds, and bring positive change to the community. Together, we continue to build a legacy of service, collaboration, and excellence.",
    avatar: "P",
    color: "bg-primary",
  },
  {
    name: "Secretary - Communication, 2025–26",
    message:
      "Being the Secretary Communication of the Rotaract Club of Coimbatore Crystals has been an enriching journey of coordination, learning, and teamwork. Every event we organize reflects the dedication and unity of our members. Behind the scenes, it is about ensuring smooth communication, structured planning, and bringing ideas to life efficiently. I am proud to be part of a club that consistently works towards growth while making a difference.",
    avatar: "S",
    color: "bg-neutral-800",
  },
  {
    name: "Secretary - Administration, 2025–26",
    message:
      "Serving as the Secretary Administration has given me the opportunity to contribute closely to the functioning and success of our club. It is a role that requires adaptability, support, and attention to detail, ensuring that every initiative is executed seamlessly. Working alongside a passionate team inspires me to learn and grow every day. I look forward to continuing this journey of service, creativity, and collaboration.",
    avatar: "s",
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
              key={item.name}
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
                
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
