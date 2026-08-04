import { useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { imageFallback } from "../data/gallery";

const ease = [0.22, 1, 0.36, 1];

export default function Lightbox({ images, index, onNavigate, onClose }) {
  const closeRef = useRef(null);
  const total = images.length;
  const current = images[index];

  const prev = useCallback(
    () => onNavigate((index - 1 + total) % total),
    [index, total, onNavigate],
  );
  const next = useCallback(
    () => onNavigate((index + 1) % total),
    [index, total, onNavigate],
  );

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, prev, next]);

  const stop = (e) => e.stopPropagation();

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={current.alt}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4 md:p-10"
    >
      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 md:p-6">
        <p className="text-sm font-medium text-cream/80" aria-label={`Immagine ${index + 1} di ${total}`}>
          {index + 1} / {total}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={(e) => {
            stop(e);
            onClose();
          }}
          aria-label="Chiudi la galleria"
          className="rounded-full bg-cream/10 p-2.5 text-cream transition-colors hover:bg-cream/25"
        >
          <X size={20} aria-hidden="true" />
        </button>
      </div>

      <button
        type="button"
        onClick={(e) => {
          stop(e);
          prev();
        }}
        aria-label="Immagine precedente"
        className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-cream/10 p-2.5 text-cream transition-colors hover:bg-cream/25 md:left-6 md:p-3"
      >
        <ChevronLeft size={24} aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={(e) => {
          stop(e);
          next();
        }}
        aria-label="Immagine successiva"
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-cream/10 p-2.5 text-cream transition-colors hover:bg-cream/25 md:right-6 md:p-3"
      >
        <ChevronRight size={24} aria-hidden="true" />
      </button>

      <AnimatePresence mode="wait" initial={false}>
        <motion.figure
          key={current.src}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.3, ease }}
          onClick={stop}
          className="m-0 flex max-h-full max-w-4xl flex-col items-center"
        >
          <img
            src={current.src}
            alt={current.alt}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = imageFallback;
            }}
            className="max-h-[72vh] w-auto max-w-full rounded-soft object-contain shadow-2xl"
          />
          <figcaption className="mt-4 text-center text-sm text-cream/85">
            {current.alt}
          </figcaption>
        </motion.figure>
      </AnimatePresence>
    </motion.div>
  );
}
