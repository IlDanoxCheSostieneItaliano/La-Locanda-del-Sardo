# La Locanda del Sardo

Sito vetrina del ristorante La Locanda del Sardo (Genzano di Roma), built with React + Vite + Tailwind CSS and published on GitHub Pages at https://ildanoxchesostieneitaliano.github.io/La-Locanda-del-Sardo/.

## Come arrivano le prenotazioni

Il sito è statico, senza backend: le richieste del modulo "Prenota un tavolo" arrivano al ristorante via **WhatsApp** (+39 393 4962902). Dopo la validazione, il form apre WhatsApp con un messaggio precompilato (nome, telefono, data, ora, persone, note) che l'ospite deve solo inviare.

Canale alternativo opzionale: configurando le variabili in `.env` (vedi `.env.example`) con un account gratuito [EmailJS](https://www.emailjs.com/), le richieste vengono inviate via email e hanno la precedenza su WhatsApp:

```
VITE_EMAILJS_SERVICE=...
VITE_EMAILJS_TEMPLATE=...
VITE_EMAILJS_KEY=...
```

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
