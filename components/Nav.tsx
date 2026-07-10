const LINKS = [
  { href: "#sobre", label: "Sobre" },
  { href: "#areas", label: "Áreas" },
  { href: "#equipe", label: "Equipe" },
  { href: "#contato", label: "Contato" },
];

export default function Nav() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="container-editorial flex items-center justify-between py-8">
        <span className="font-serif text-lg tracking-wide text-charcoal">DRC</span>
        <nav className="hidden gap-8 font-sans text-xs uppercase tracking-widest2 text-charcoal/70 md:flex">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-charcoal">
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
