import { practiceAreas } from "@/data/practiceAreas";

export default function PracticeAreas() {
  return (
    <section id="areas" className="bg-ivory-soft py-28">
      <div className="container-editorial">
        <p className="eyebrow mb-4">Áreas de atuação</p>
        <h2 className="max-w-2xl text-3xl text-charcoal md:text-4xl">
          Assessoria jurídica dedicada a cada frente do negócio.
        </h2>

        <div className="mt-16 grid gap-px overflow-hidden border border-charcoal/10 bg-charcoal/10 sm:grid-cols-2 lg:grid-cols-5">
          {practiceAreas.map((area) => (
            <div key={area.id} className="group bg-ivory-soft p-8 transition-colors duration-300 hover:bg-white">
              <h3 className="font-serif text-xl text-charcoal">{area.title}</h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-charcoal/65">
                {area.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
