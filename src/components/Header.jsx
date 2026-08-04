import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import restaurant from "../data/restaurant";

const links = [
  { href: "#menu", label: "Menu" },
  { href: "#galleria", label: "Galleria" },
  { href: "#recensioni", label: "Recensioni" },
  { href: "#contatti", label: "Contatti" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "bg-cream/90 backdrop-blur-md shadow-[0_2px_24px_rgba(35,32,25,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-[72px] md:px-8">
        <a
          href="#top"
          className={`font-display text-lg font-semibold tracking-wide transition-colors md:text-xl ${
            scrolled ? "text-olive-dark" : "text-cream"
          }`}
        >
          La Locanda <span className={`italic ${scrolled ? "text-wine" : "text-sand"}`}>del Sardo</span>
        </a>

        <nav aria-label="Navigazione principale" className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm font-medium tracking-wide transition-colors hover:text-wine ${
                scrolled ? "text-ink" : "text-cream"
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href={restaurant.phoneHref}
            className="rounded-leaf inline-flex items-center gap-2 bg-wine px-5 py-2.5 text-sm font-semibold text-cream shadow-md transition-transform hover:-translate-y-0.5"
          >
            <Phone size={15} aria-hidden="true" />
            Prenota
          </a>
        </nav>

        <button
          type="button"
          className={`p-2 md:hidden ${scrolled ? "text-ink" : "text-cream"}`}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Chiudi il menu di navigazione" : "Apri il menu di navigazione"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Navigazione mobile"
            initial={reduce ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="border-t border-sand bg-cream/95 backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col px-5 py-4">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-soft px-2 py-3 font-medium text-ink transition-colors hover:bg-sand/60 hover:text-wine"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="mt-2">
                <a
                  href={restaurant.phoneHref}
                  onClick={() => setOpen(false)}
                  className="rounded-leaf inline-flex items-center gap-2 bg-wine px-5 py-3 text-sm font-semibold text-cream"
                >
                  <Phone size={15} aria-hidden="true" />
                  Prenota — {restaurant.phone}
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
