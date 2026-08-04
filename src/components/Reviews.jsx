import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import { reviews } from "../data/reviews";
import Reveal from "./Reveal";

const sourceStyles = {
  Google: "bg-cream text-wine",
  TripAdvisor: "bg-olive text-cream",
  Sluurpy: "bg-sand text-ink",
};

function Stars({ rating }) {
  return (
    <div role="img" aria-label={`${rating} stelle su 5`} className="flex shrink-0 gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={15}
          aria-hidden="true"
          className={i < rating ? "fill-amber-400 text-amber-400" : "text-cream/30"}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review, fluid = false, focusable = true }) {
  return (
    <li
      tabIndex={focusable ? 0 : -1}
      className={`flex shrink-0 flex-col gap-4 rounded-soft border border-cream/10 bg-cream/10 p-6 ${
        fluid ? "w-full" : "w-[19rem] md:w-[22rem]"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <Stars rating={review.rating} />
        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${
            sourceStyles[review.source] ?? "bg-cream/20 text-cream"
          }`}
        >
          {review.source}
        </span>
      </div>
      <blockquote className="italic leading-relaxed text-cream/90">
        “{review.text}”
      </blockquote>
      <footer className="mt-auto flex items-baseline justify-between gap-3 text-sm">
        <cite className="not-italic font-semibold text-sand">{review.name}</cite>
        <span className="shrink-0 text-cream/60">{review.date}</span>
      </footer>
    </li>
  );
}

function Marquee() {
  const trackRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const isDraggingRef = useRef(false);
  const isAutoScrollingRef = useRef(false);
  const dragStartX = useRef(0);
  const scrollStart = useRef(0);
  const resumeTimer = useRef(null);

  const pauseAutoScroll = () => {
    setIsInteracting(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  };

  const resumeAutoScroll = () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setIsInteracting(false), 1400);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track || isInteracting) return;

    let rafId;
    let lastTime = performance.now();
    const speed = 0.04;

    const step = (time) => {
      const delta = time - lastTime;
      lastTime = time;
      isAutoScrollingRef.current = true;
      track.scrollLeft += delta * speed;
      const half = track.scrollWidth / 2;
      if (track.scrollLeft >= half) {
        track.scrollLeft -= half;
      }
      isAutoScrollingRef.current = false;
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(rafId);
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, [isInteracting]);

  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    setIsDragging(true);
    pauseAutoScroll();
    dragStartX.current = e.clientX;
    scrollStart.current = trackRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    const delta = dragStartX.current - e.clientX;
    trackRef.current.scrollLeft = scrollStart.current + delta;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    setIsDragging(false);
    resumeAutoScroll();
  };

  return (
    <div
      ref={trackRef}
      className={`marquee-scroll flex overflow-x-auto [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] ${
        isDragging ? "cursor-grabbing select-none" : "cursor-grab"
      }`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={pauseAutoScroll}
      onTouchEnd={resumeAutoScroll}
      onTouchCancel={resumeAutoScroll}
      onWheel={pauseAutoScroll}
      aria-label="Recensioni degli ospiti"
    >
      <div className="marquee-track flex w-max">
        {[false, true].map((duplicate) => (
          <ul
            key={String(duplicate)}
            aria-hidden={duplicate || undefined}
            className="flex shrink-0 gap-6 pr-6"
          >
            {reviews.map((review) => (
              <ReviewCard
                key={`${duplicate}-${review.name}`}
                review={review}
                focusable={!duplicate}
              />
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export default function Reviews() {
  const reduce = useReducedMotion();

  return (
    <section
      id="recensioni"
      aria-labelledby="recensioni-heading"
      className="overflow-hidden bg-wine py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sand">
            La parola agli ospiti
          </p>
          <h2
            id="recensioni-heading"
            className="mt-3 font-display text-3xl font-semibold text-cream md:text-5xl"
          >
            Recensioni
          </h2>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="mt-12">
        {reduce ? (
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <ul aria-label="Recensioni degli ospiti" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review) => (
                <ReviewCard key={review.name} review={review} fluid />
              ))}
            </ul>
          </div>
        ) : (
          <Marquee />
        )}
      </Reveal>

      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal delay={0.15}>
          <p className="mt-10 text-sm italic text-cream/60">
            Recensioni pubbliche da Google, TripAdvisor e Sluurpy.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
