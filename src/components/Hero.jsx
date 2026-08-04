import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import restaurant from "../data/restaurant";

const TITLE = "La Locanda del Sardo";

export default function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, 140]);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.035, delayChildren: 0.3 } },
  };
  const letter = reduce
    ? {}
    : {
        hidden: { opacity: 0, y: 24 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
      };

  return (
    <section
      id="top"
      ref={ref}
      aria-label="La Locanda del Sardo — cucina sarda a Genzano di Roma"
      className="relative flex min-h-svh items-end overflow-hidden bg-olive-dark"
    >
      <motion.div
        aria-hidden="true"
        style={reduce ? undefined : { y: bgY }}
        className="absolute inset-x-0 -top-40 -bottom-24 will-change-transform"
      >
        <img
          src={restaurant.heroImage}
          alt=""
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
      </motion.div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/45 to-olive-dark/35"
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-20 pt-36 md:px-8 md:pb-28">
        <motion.div
          variants={reduce ? undefined : container}
          initial={reduce ? false : "hidden"}
          animate="show"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-sand md:text-sm">
            Genzano di Roma · Castelli Romani
          </p>
          <h1 className="font-display text-5xl font-bold leading-[1.05] text-cream md:text-7xl lg:text-8xl">
            {TITLE.split("").map((ch, i) =>
              ch === " " ? (
                <span key={i}> </span>
              ) : (
                <motion.span key={i} variants={letter} className="inline-block">
                  {ch}
                </motion.span>
              )
            )}
          </h1>
          <motion.p
            variants={letter}
            className="mt-5 max-w-xl font-display text-xl italic text-sand md:text-2xl"
          >
            Cucina sarda a Genzano di Roma
          </motion.p>

          <motion.div
            variants={letter}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#menu"
              className="rounded-leaf bg-wine px-7 py-3.5 font-semibold text-cream shadow-lg transition-transform hover:-translate-y-0.5"
            >
              Scopri il menu
            </a>
            <a
              href={restaurant.phoneHref}
              className="rounded-leaf border-2 border-cream/70 px-7 py-3.5 font-semibold text-cream transition-colors hover:bg-cream hover:text-ink"
            >
              Prenota un tavolo
            </a>
          </motion.div>

          <motion.p
            variants={letter}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink/45 px-4 py-2 text-sm text-sand backdrop-blur-sm"
          >
            <Star size={14} className="fill-sand text-sand" aria-hidden="true" />
            4,6 su Google · 4,5 su TripAdvisor
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
