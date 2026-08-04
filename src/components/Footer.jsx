import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";
import restaurant from "../data/restaurant";
import Reveal from "./Reveal";

function FacebookIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7h2.4l.6-3h-3V9.1c0-.9.3-1.6 1.6-1.6H16.6V4.8c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1V11H7.8v3h2.4v7h3.3z" />
    </svg>
  );
}

function InstagramIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer id="footer" className="bg-ink pt-16 pb-8 text-cream">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <p className="font-display text-xl font-semibold">
                La Locanda <span className="italic text-sand">del Sardo</span>
              </p>
              <p className="mt-2 text-sm leading-relaxed text-cream/70">
                {restaurant.address}
              </p>
              <ul className="mt-5 space-y-3 text-sm">
                <li>
                  <a
                    href={restaurant.phoneHref}
                    className="inline-flex items-center gap-2.5 transition-colors hover:text-sand"
                  >
                    <Phone size={16} className="text-wine" aria-hidden="true" />
                    {restaurant.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={restaurant.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 transition-colors hover:text-sand"
                  >
                    <MessageCircle size={16} className="text-myrtle" aria-hidden="true" />
                    WhatsApp {restaurant.mobile}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${restaurant.email}`}
                    className="inline-flex items-center gap-2.5 transition-colors hover:text-sand"
                  >
                    <Mail size={16} className="text-sea" aria-hidden="true" />
                    {restaurant.email}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sand">
                Orari
              </p>
              <table className="mt-4 w-full max-w-xs text-sm">
                <tbody>
                  {restaurant.hours.map((h) => (
                    <tr key={h.day} className="border-b border-cream/10 last:border-0">
                      <th scope="row" className="py-1.5 pr-4 text-left font-medium text-cream/85">
                        {h.day}
                      </th>
                      <td className={`py-1.5 text-right ${h.slots === "Chiuso" ? "italic text-wine" : "text-cream/70"}`}>
                        {h.slots}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-3 text-xs italic text-cream/60">{restaurant.hoursNote}</p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sand">
                Seguici
              </p>
              <div className="mt-4 flex gap-3">
                <a
                  href={restaurant.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Pagina Facebook della Locanda del Sardo"
                  className="rounded-soft bg-cream/10 p-3 transition-colors hover:bg-wine"
                >
                  <FacebookIcon size={18} />
                </a>
                <a
                  href={restaurant.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Profilo Instagram della Locanda del Sardo"
                  className="rounded-soft bg-cream/10 p-3 transition-colors hover:bg-wine"
                >
                  <InstagramIcon size={18} />
                </a>
              </div>
              <p className="mt-6 inline-flex items-start gap-2 text-sm text-cream/70">
                <MapPin size={16} className="mt-0.5 shrink-0 text-myrtle" aria-hidden="true" />
                Piazza Fosse Ardeatine 14, Genzano di Roma — a due passi dal centro storico
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 border-t border-cream/10 pt-6 text-xs text-cream/55">
          <p>
            © {new Date().getFullYear()} {restaurant.name} · {restaurant.vat} · Gestione di{" "}
            {restaurant.owner}
          </p>
          <p className="mt-1.5">Foto da fonti pubbliche — © degli aventi diritto</p>
        </div>
      </div>
    </footer>
  );
}
