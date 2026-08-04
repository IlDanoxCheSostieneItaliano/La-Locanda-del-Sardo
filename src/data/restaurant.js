export const restaurant = {
  name: "La Locanda del Sardo",
  owner: "Nicola Perria",
  address: "Piazza Fosse Ardeatine 14, 00045 Genzano di Roma (RM)",
  phone: "06 9399506",
  phoneHref: "tel:+39069399506",
  mobile: "+39 393 4962902",
  whatsapp: "https://wa.me/3934962902",
  email: "nicola_perria@hotmail.com",
  facebook: "https://www.facebook.com/Sa.Locanda.sarda",
  instagram: "https://www.instagram.com/la_locanda_del_sardo.official/",
  vat: "P.IVA 12576681006",
  mapEmbed:
    "https://maps.google.com/maps?q=Piazza+Fosse+Ardeatine+14,+Genzano+di+Roma&z=16&output=embed",
  ratings: [
    { source: "Google", value: "4,6", label: "4,6 su Google" },
    { source: "TripAdvisor", value: "4,5", label: "4,5 su TripAdvisor (~774 recensioni, n.8 su 98 a Genzano)" },
  ],
  hours: [
    { day: "Lunedì", slots: "19:00 – 00:00" },
    { day: "Martedì", slots: "11:30 – 00:00" },
    { day: "Mercoledì", slots: "Chiuso" },
    { day: "Giovedì", slots: "19:00 – 00:00" },
    { day: "Venerdì", slots: "11:30 – 00:00" },
    { day: "Sabato", slots: "11:00 – 00:00" },
    { day: "Domenica", slots: "11:30 – 00:00" },
  ],
  hoursNote: "Orari soggetti a variazioni, verificare sui canali ufficiali",
  heroImage: `${import.meta.env.BASE_URL}img/sala.jpg`,
};

export default restaurant;
