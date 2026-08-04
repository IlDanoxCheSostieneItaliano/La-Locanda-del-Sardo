import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";
import restaurant from "../data/restaurant";

const PHONE_RE = /^(?:\+39|0039)?[ .-]?3\d{2}[ .-]?\d{3,4}[ .-]?\d{3,4}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ease = [0.22, 1, 0.36, 1];

const emptyValues = {
  nome: "",
  telefono: "",
  email: "",
  data: "",
  ora: "",
  persone: "",
  note: "",
  website: "",
};

const todayISO = () => {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
};

const inRange = (time, from, to) => time >= from && time <= to;

const WEEKDAYS = [
  "domenica",
  "lunedì",
  "martedì",
  "mercoledì",
  "giovedì",
  "venerdì",
  "sabato",
];

const formatDateIT = (iso) => {
  const [y, m, d] = iso.split("-").map(Number);
  const weekday = WEEKDAYS[new Date(y, m - 1, d).getDay()];
  const mm = String(m).padStart(2, "0");
  const dd = String(d).padStart(2, "0");
  return `${weekday} ${dd}/${mm}/${y}`;
};

function buildWhatsAppUrl(values) {
  const note = values.note.trim();
  const lines = [
    "🍽️ *Nuova richiesta di prenotazione*",
    `_${restaurant.name} — Genzano di Roma_`,
    "",
    `👤 *Nome:* ${values.nome.trim()}`,
    `📞 *Telefono:* ${values.telefono.trim()}`,
    ...(values.email.trim() ? [`📧 *Email:* ${values.email.trim()}`] : []),
    `📅 *Data:* ${formatDateIT(values.data)}`,
    `🕗 *Ora:* ${values.ora}`,
    `👥 *Persone:* ${values.persone}`,
    ...(note ? ["", `📝 *Note:* ${note}`] : []),
  ];
  return `${restaurant.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
}

function validate(values) {
  const errors = {};

  if (!values.nome.trim()) {
    errors.nome = "Il nome è obbligatorio.";
  }

  if (!values.telefono.trim()) {
    errors.telefono = "Il telefono è obbligatorio.";
  } else if (!PHONE_RE.test(values.telefono.trim())) {
    errors.telefono = "Inserisci un numero di cellulare italiano valido (es. 333 123 4567).";
  }

  if (values.email.trim() && !EMAIL_RE.test(values.email.trim())) {
    errors.email = "Inserisci un indirizzo email valido.";
  }

  let dayOfWeek = null;
  if (!values.data) {
    errors.data = "La data è obbligatoria.";
  } else if (values.data < todayISO()) {
    errors.data = "La data non può essere nel passato.";
  } else {
    const [y, m, d] = values.data.split("-").map(Number);
    dayOfWeek = new Date(y, m - 1, d).getDay();
    if (dayOfWeek === 3) {
      errors.data = "Il mercoledì siamo chiusi: scegli un altro giorno.";
    }
  }

  if (!values.ora) {
    errors.ora = "L'orario è obbligatorio.";
  } else if (dayOfWeek !== null && dayOfWeek !== 3) {
    const dinner = inRange(values.ora, "18:30", "22:30");
    const lunch = inRange(values.ora, "11:30", "15:00");
    if (dayOfWeek === 1 && !dinner) {
      errors.ora = "Il lunedì siamo aperti solo a cena, tra le 18:30 e le 22:30.";
    } else if (dayOfWeek !== 1 && !lunch && !dinner) {
      errors.ora = "Scegli un orario nelle fasce di apertura: 11:30–15:00 oppure 18:30–22:30.";
    }
  }

  if (!values.persone) {
    errors.persone = "Indica il numero di persone.";
  } else {
    const guests = Number(values.persone);
    if (!Number.isInteger(guests) || guests < 1 || guests > 20) {
      errors.persone = "Il numero di persone deve essere compreso tra 1 e 20.";
    }
  }

  return errors;
}

function Field({ id, label, required, error, hint, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-olive-dark">
        {label}
        {required && (
          <span aria-hidden="true" className="ml-0.5 text-wine">
            *
          </span>
        )}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-xs text-ink/55">{hint}</p>}
      {error && (
        <p id={`${id}-err`} className="mt-1.5 text-sm font-medium text-wine">
          {error}
        </p>
      )}
    </div>
  );
}

function SuccessView({ onReset, channel, waUrl }) {
  const reduce = useReducedMotion();
  const viaWhatsApp = channel === "whatsapp";

  return (
    <motion.div
      key="success"
      initial={reduce ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? undefined : { opacity: 0 }}
      transition={{ duration: 0.5, ease }}
      className="flex flex-col items-center rounded-soft border border-sand bg-sand/40 p-8 text-center md:p-10"
      role="status"
    >
      <svg viewBox="0 0 52 52" className="h-20 w-20" aria-hidden="true">
        <motion.circle
          cx="26"
          cy="26"
          r="23"
          fill="none"
          stroke="var(--color-myrtle)"
          strokeWidth="2.5"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, ease }}
        />
        <motion.path
          d="M15 27l8 8 15-17"
          fill="none"
          stroke="var(--color-olive)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.45, delay: 0.55, ease }}
        />
      </svg>
      <h3 className="mt-5 font-display text-2xl font-semibold text-olive-dark">
        {viaWhatsApp ? "Quasi fatto!" : "Richiesta inviata!"}
      </h3>
      {viaWhatsApp ? (
        <>
          <p className="mt-2 text-ink/80">
            Stiamo aprendo WhatsApp con la tua richiesta già compilata: premi
            invio per spedirla al ristorante.
          </p>
          {waUrl && (
            <p className="mt-3 text-sm text-ink/65">
              Se la finestra non si è aperta{" "}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-myrtle underline"
              >
                apri WhatsApp
              </a>
              .
            </p>
          )}
        </>
      ) : (
        <p className="mt-2 text-ink/80">Ti richiameremo per confermare.</p>
      )}
      <p className="mt-4 text-sm text-ink/65">
        Per conferme immediate puoi anche contattarci direttamente:
      </p>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium">
        <a href={restaurant.phoneHref} className="inline-flex items-center gap-2 text-wine hover:underline">
          <Phone size={16} aria-hidden="true" />
          {restaurant.phone}
        </a>
        <a
          href={restaurant.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-myrtle hover:underline"
        >
          <MessageCircle size={16} aria-hidden="true" />
          WhatsApp {restaurant.mobile}
        </a>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="mt-8 rounded-leaf bg-olive-dark px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-olive"
      >
        Nuova prenotazione
      </button>
    </motion.div>
  );
}

export default function ReservationForm() {
  const [values, setValues] = useState(emptyValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [success, setSuccess] = useState({ channel: null, waUrl: null });
  const reduce = useReducedMotion();

  const set = (field) => (e) =>
    setValues((v) => ({ ...v, [field]: e.target.value }));

  const inputCls = (field) =>
    `w-full rounded-soft border bg-white px-4 py-2.5 text-ink placeholder:text-ink/35 ${
      errors[field] ? "border-wine" : "border-sand"
    }`;

  const ariaProps = (field) => ({
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `${field}-err` : undefined,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (values.website.trim()) {
      setSuccess({ channel: "whatsapp", waUrl: null });
      setStatus("success");
      return;
    }
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("sending");
    const { VITE_EMAILJS_SERVICE, VITE_EMAILJS_TEMPLATE, VITE_EMAILJS_KEY } =
      import.meta.env;

    if (VITE_EMAILJS_SERVICE && VITE_EMAILJS_TEMPLATE && VITE_EMAILJS_KEY) {
      try {
        const emailjs = await import("@emailjs/browser");
        await emailjs.send(
          VITE_EMAILJS_SERVICE,
          VITE_EMAILJS_TEMPLATE,
          {
            from_name: values.nome,
            phone: values.telefono,
            email: values.email || "Non fornita",
            date: values.data,
            time: values.ora,
            guests: values.persone,
            notes: values.note || "—",
            to_email: restaurant.email,
          },
          { publicKey: VITE_EMAILJS_KEY },
        );
        setSuccess({ channel: "email", waUrl: null });
        setStatus("success");
      } catch {
        setStatus("error");
      }
    } else {
      const waUrl = buildWhatsAppUrl(values);
      window.open(waUrl, "_blank", "noopener");
      setSuccess({ channel: "whatsapp", waUrl });
      setStatus("success");
    }
  };

  const reset = () => {
    setValues(emptyValues);
    setErrors({});
    setStatus("idle");
    setSuccess({ channel: null, waUrl: null });
  };

  const errorList = Object.values(errors);

  return (
    <div>
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <SuccessView onReset={reset} channel={success.channel} waUrl={success.waUrl} />
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={handleSubmit}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease }}
            className="relative rounded-soft border border-sand bg-sand/40 p-6 md:p-8"
            aria-labelledby="reservation-heading"
          >
            <h3
              id="reservation-heading"
              className="font-display text-2xl font-semibold text-olive-dark"
            >
              Prenota un tavolo
            </h3>
            <p className="mt-1.5 text-sm text-ink/65">
              Compila il modulo: la richiesta arriverà al ristorante su
              WhatsApp, ti confermeremo la disponibilità al più presto.
            </p>

            <div aria-live="polite" className="mt-4">
              {errorList.length > 0 && (
                <div className="rounded-soft border border-wine/30 bg-wine/10 p-4 text-sm text-wine">
                  <p className="font-semibold">
                    Correggi {errorList.length === 1 ? "il campo indicato" : "i campi indicati"} per procedere.
                  </p>
                  <ul className="mt-1.5 list-inside list-disc space-y-0.5">
                    {errorList.map((msg) => (
                      <li key={msg}>{msg}</li>
                    ))}
                  </ul>
                </div>
              )}
              {status === "error" && (
                <div className="rounded-soft border border-wine/30 bg-wine/10 p-4 text-sm font-medium text-wine">
                  Invio non riuscito: riprova oppure contattaci al{" "}
                  <a href={restaurant.phoneHref} className="underline">
                    {restaurant.phone}
                  </a>
                  .
                </div>
              )}
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field id="nome" label="Nome e cognome" required error={errors.nome}>
                  <input
                    id="nome"
                    name="nome"
                    type="text"
                    autoComplete="name"
                    placeholder="Es. Maria Rossi"
                    value={values.nome}
                    onChange={set("nome")}
                    className={inputCls("nome")}
                    {...ariaProps("nome")}
                  />
                </Field>
              </div>

              <Field id="telefono" label="Telefono" required error={errors.telefono}>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="Es. 333 123 4567"
                  value={values.telefono}
                  onChange={set("telefono")}
                  className={inputCls("telefono")}
                  {...ariaProps("telefono")}
                />
              </Field>

              <Field id="email" label="Email" error={errors.email}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Facoltativa"
                  value={values.email}
                  onChange={set("email")}
                  className={inputCls("email")}
                  {...ariaProps("email")}
                />
              </Field>

              <Field id="data" label="Data" required error={errors.data}>
                <input
                  id="data"
                  name="data"
                  type="date"
                  min={todayISO()}
                  value={values.data}
                  onChange={set("data")}
                  className={inputCls("data")}
                  {...ariaProps("data")}
                />
              </Field>

              <Field
                id="ora"
                label="Ora"
                required
                error={errors.ora}
                hint="Pranzo 11:30–15:00 · Cena 18:30–22:30"
              >
                <input
                  id="ora"
                  name="ora"
                  type="time"
                  value={values.ora}
                  onChange={set("ora")}
                  className={inputCls("ora")}
                  {...ariaProps("ora")}
                />
              </Field>

              <Field id="persone" label="Persone" required error={errors.persone}>
                <input
                  id="persone"
                  name="persone"
                  type="number"
                  min="1"
                  max="20"
                  inputMode="numeric"
                  placeholder="1–20"
                  value={values.persone}
                  onChange={set("persone")}
                  className={inputCls("persone")}
                  {...ariaProps("persone")}
                />
              </Field>

              <div className="sm:col-span-2">
                <Field id="note" label="Note" error={errors.note}>
                  <textarea
                    id="note"
                    name="note"
                    rows={3}
                    placeholder="Allergie, seggiolone, occasioni speciali…"
                    value={values.note}
                    onChange={set("note")}
                    className={inputCls("note")}
                    {...ariaProps("note")}
                  />
                </Field>
              </div>
            </div>

            <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
              <label htmlFor="website">Non compilare questo campo</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={values.website}
                onChange={set("website")}
              />
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <button
                type="submit"
                disabled={status === "sending"}
                className="rounded-leaf bg-wine px-7 py-3 text-sm font-semibold text-cream transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {status === "sending" ? "Invio in corso…" : "Invia richiesta"}
              </button>
              <p className="text-xs text-ink/55">
                <span aria-hidden="true" className="text-wine">
                  *
                </span>{" "}
                Campi obbligatori
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
