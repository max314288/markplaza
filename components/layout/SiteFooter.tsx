const links = [
  { label: "Privacidad", href: "#" },
  { label: "Términos", href: "#" },
  { label: "Sostenibilidad", href: "#" },
  { label: "Soporte", href: "#" },
];

export function SiteFooter() {
  return (
    <footer className="w-full px-10 pb-12 pt-16">
      <div className="max-w-[1440px] mx-auto border-t border-primary-fixed-dim/10 pt-10 flex flex-col items-center gap-6">
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-3">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-on-surface-variant/40 hover:text-primary-fixed-dim transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
        <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-on-surface-variant/30 text-center">
          © {new Date().getFullYear()} MarkPlaza. Distrito Comercial Virtual.
        </p>
      </div>
    </footer>
  );
}
