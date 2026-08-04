import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import restaurant from "../data/restaurant";
import Reveal from "./Reveal";
import ReservationForm from "./ReservationForm";

export default function Contact() {
  return (
    <section
      id="contatti"
      aria-labelledby="contatti-heading"
      className="bg-cream py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-myrtle">
            Vieni a trovarci
          </p>
          <h2
            id="contatti-heading"
            className="mt-3 font-display text-3xl font-semibold text-olive-dark md:text-5xl"
          >
            Contatti e prenotazioni
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal delay={0.1}>
            <iframe
              src={restaurant.mapEmbed}
              title="Mappa: La Locanda del Sardo, Piazza Fosse Ardeatine 14, Genzano di Roma"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-72 w-full rounded-soft border border-sand bg-sand/40"
            />

            <address className="mt-7 not-italic">
              <p className="inline-flex items-start gap-3 text-ink/85">
                <MapPin size={19} className="mt-0.5 shrink-0 text-myrtle" aria-hidden="true" />
                {restaurant.address}
              </p>
            </address>

            <ul className="mt-5 space-y-3.5 text-sm">
              <li>
                <a
                  href={restaurant.phoneHref}
                  className="inline-flex items-center gap-3 font-medium text-ink transition-colors hover:text-wine"
                >
                  <Phone size={18} className="shrink-0 text-wine" aria-hidden="true" />
                  {restaurant.phone}
                </a>
              </li>
              <li>
                <a
                  href={restaurant.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 font-medium text-ink transition-colors hover:text-myrtle"
                >
                  <MessageCircle size={18} className="shrink-0 text-myrtle" aria-hidden="true" />
                  WhatsApp {restaurant.mobile}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${restaurant.email}`}
                  className="inline-flex items-center gap-3 font-medium text-ink transition-colors hover:text-sea"
                >
                  <Mail size={18} className="shrink-0 text-sea" aria-hidden="true" />
                  {restaurant.email}
                </a>
              </li>
            </ul>

            <div className="mt-7 border-t border-sand pt-6">
              <p className="inline-flex items-center gap-3 text-sm font-semibold text-olive-dark">
                <Clock size={18} className="shrink-0 text-sea" aria-hidden="true" />
                Lun/gio 19:00–00:00 · Mar/ven/dom 11:30–00:00 · Sab 11:00–00:00 · Mer chiuso
              </p>
              <p className="mt-2 text-xs italic text-ink/55">{restaurant.hoursNote}</p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <ReservationForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
