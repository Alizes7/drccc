import Image from "next/image";
import { team } from "@/data/team";

export default function Team() {
  return (
    <section id="equipe" className="bg-white py-28">
      <div className="container-editorial">
        <p className="eyebrow mb-4">Equipe</p>
        <h2 className="max-w-2xl text-3xl text-charcoal md:text-4xl">
          Sócios e sócias à frente da prática.
        </h2>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <div key={member.id} className="group">
              <div className="relative aspect-[4/5] overflow-hidden bg-ivory-soft">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                />
              </div>
              <h3 className="mt-5 font-serif text-lg text-charcoal">{member.name}</h3>
              <p className="mt-1 font-mono text-xs uppercase tracking-widest2 text-charcoal/50">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
