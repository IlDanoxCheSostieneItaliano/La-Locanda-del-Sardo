import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { menuCategories, menuDisclaimer } from "../data/menu";
import MyrtleLeafIcon from "./MyrtleLeafIcon";
import Reveal from "./Reveal";

function SignatureIcon() {
  return (
    <span className="inline-flex shrink-0 items-center" title="Specialità della casa">
      <MyrtleLeafIcon size={17} className="text-sand" />
    </span>
  );
}

export default function Menu() {
  const [active, setActive] = useState(menuCategories[0].id);
  const tabRefs = useRef([]);
  const reduce = useReducedMotion();

  const category = menuCategories.find((c) => c.id === active);
  const index = menuCategories.findIndex((c) => c.id === active);

  const onKeyDown = (e) => {
    const len = menuCategories.length;
    let next = null;
    if (e.key === "ArrowRight") next = (index + 1) % len;
    else if (e.key === "ArrowLeft") next = (index - 1 + len) % len;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = len - 1;
    if (next === null) return;
    e.preventDefault();
    setActive(menuCategories[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="menu" aria-labelledby="menu-heading" className="bg-olive-dark py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sand">
            Dal mare e dalla terra
          </p>
          <h2 id="menu-heading" className="mt-3 font-display text-3xl font-semibold text-cream md:text-5xl">
            Il menu
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            role="tablist"
            aria-label="Categorie del menu"
            onKeyDown={onKeyDown}
            className="mt-10 flex flex-wrap gap-2"
          >
            {menuCategories.map((c, i) => {
              const selected = c.id === active;
              return (
                <button
                  key={c.id}
                  ref={(el) => (tabRefs.current[i] = el)}
                  role="tab"
                  id={`tab-${c.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${c.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(c.id)}
                  className={`rounded-leaf px-5 py-2.5 text-sm font-semibold transition-colors ${
                    selected
                      ? "bg-cream text-olive-dark shadow-md"
                      : "bg-ink/20 text-sand hover:bg-ink/35 hover:text-cream"
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-8 min-h-[22rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={category.id}
              role="tabpanel"
              id={`panel-${category.id}`}
              aria-labelledby={`tab-${category.id}`}
              tabIndex={-1}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <ul className="space-y-1">
                {category.items.map((item) => (
                  <li
                    key={item.name}
                    className="group rounded-soft px-3 py-3.5 transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-0.5 hover:bg-cream/10 hover:shadow-[0_10px_28px_rgba(0,0,0,0.28)] md:px-4"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="flex min-w-0 items-center gap-2">
                        <span className="truncate font-medium text-cream transition-colors group-hover:text-sand">
                          {item.name}
                        </span>
                        {item.signature && <SignatureIcon />}
                      </span>
                      <span
                        aria-hidden="true"
                        className="mx-1 flex-1 border-b-2 border-dotted border-sand/35 transition-colors group-hover:border-sand/60"
                      />
                      {item.price != null ? (
                        <span className="shrink-0 font-display text-lg text-sand">
                          €{item.price}
                        </span>
                      ) : (
                        <span className="shrink-0 text-sm italic text-sand/80">
                          Prezzo su richiesta
                        </span>
                      )}
                    </div>
                    {item.note && (
                      <p className="mt-1.5 text-sm italic text-sand/85">{item.note}</p>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-cream/15 pt-6 text-sm text-sand/85">
            <p className="inline-flex items-center gap-2">
              <MyrtleLeafIcon size={16} className="text-sand" />
              Specialità della casa — icona foglia di mirto
            </p>
            <p className="italic">{menuDisclaimer}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
