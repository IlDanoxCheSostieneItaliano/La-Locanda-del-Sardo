import { Phone, MessageCircle, Clock } from "lucide-react";
import restaurant from "../data/restaurant";
import Reveal from "./Reveal";

export default function Intro() {
  return (
    <section aria-labelledby="intro-heading" className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-myrtle">
            Un angolo di Sardegna ai Castelli Romani
          </p>
          <h2
            id="intro-heading"
            className="mt-3 max-w-3xl font-display text-3xl font-semibold text-olive-dark md:text-5xl"
          >
            Il mare e la terra dell'isola, in piazza a Genzano
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 max-w-3xl space-y-4 text-lg leading-relaxed text-ink/85">
            <p>
              Nicola Perria porta a Genzano di Roma la cucina della sua Sardegna:
              culurgiones fatti a mano, pesce del giorno e il porceddu arrosto,
              da prenotare con un giorno di anticipo.
            </p>
            <p>
              In sala si sta come a casa dell'oste: pochi tavoli, porzioni
              generose e i vini dell'isola, dal Cannonau al Vermentino.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            <a
              href={restaurant.phoneHref}
              className="group rounded-soft border border-sand bg-sand/40 p-5 transition-transform hover:-translate-y-1"
            >
              <Phone size={20} className="text-wine" aria-hidden="true" />
              <p className="mt-3 text-sm font-semibold text-olive-dark">Telefono</p>
              <p className="font-display text-xl text-ink group-hover:text-wine">
                {restaurant.phone}
              </p>
            </a>
            <a
              href={restaurant.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-soft border border-sand bg-sand/40 p-5 transition-transform hover:-translate-y-1"
            >
              <MessageCircle size={20} className="text-myrtle" aria-hidden="true" />
              <p className="mt-3 text-sm font-semibold text-olive-dark">WhatsApp</p>
              <p className="font-display text-xl text-ink group-hover:text-myrtle">
                {restaurant.mobile}
              </p>
            </a>
            <div className="rounded-soft border border-sand bg-sand/40 p-5">
              <Clock size={20} className="text-sea" aria-hidden="true" />
              <p className="mt-3 text-sm font-semibold text-olive-dark">Orari</p>
              <p className="text-sm leading-relaxed text-ink/85">
                Lun solo cena · Mar–Dom pranzo e cena
                <br />
                Mercoledì chiuso
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
