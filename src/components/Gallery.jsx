import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { gallery, imageFallback } from "../data/gallery";
import Lightbox from "./Lightbox";
import Reveal from "./Reveal";

export default function Gallery() {
  const [openIndex, setOpenIndex] = useState(null);
  const triggerRef = useRef(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (openIndex !== null) {
      wasOpen.current = true;
    } else if (wasOpen.current) {
      wasOpen.current = false;
      triggerRef.current?.focus();
    }
  }, [openIndex]);

  const openImage = (index, element) => {
    triggerRef.current = element;
    setOpenIndex(index);
  };

  return (
    <section
      id="galleria"
      aria-labelledby="galleria-heading"
      className="bg-cream py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-myrtle">
            La sala e i piatti
          </p>
          <h2
            id="galleria-heading"
            className="mt-3 font-display text-3xl font-semibold text-olive-dark md:text-5xl"
          >
            Galleria
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 columns-2 gap-4 md:columns-3 lg:columns-4">
            {gallery.map((item, index) => (
              <button
                key={item.src}
                type="button"
                onClick={(e) => openImage(index, e.currentTarget)}
                aria-label={`Apri la foto: ${item.alt}`}
                className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-soft bg-sand text-left"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = imageFallback;
                  }}
                  className="h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink/70 via-ink/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-4 text-sm text-cream opacity-0 transition-[transform,opacity] duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
                >
                  {item.alt}
                </span>
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <Lightbox
            images={gallery}
            index={openIndex}
            onNavigate={setOpenIndex}
            onClose={() => setOpenIndex(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
