export const menuCategories = [
  {
    id: "antipasti",
    label: "Antipasti",
    items: [
      { name: "Soutè cozze, vongole e bottarga", price: 7 },
      { name: "Tagliere salumi e formaggi sardi", price: 12, signature: true },
      { name: "Antipasto misto di pesce, caldi e freddi", price: null },
      { name: "Crudités di mare", price: null },
    ],
  },
  {
    id: "primi",
    label: "Primi",
    items: [
      { name: "Culurgiones alla campidanese", price: 9, signature: true },
      { name: "Malloreddus alla crema di scampi", price: null },
      { name: "Fregola", price: null },
      { name: "Spaghetti vongole e bottarga di Cabras", price: null },
    ],
  },
  {
    id: "secondi",
    label: "Secondi",
    items: [
      {
        name: "Porceddu / maialetto sardo arrosto",
        price: null,
        signature: true,
        note: "da prenotare con 24h di anticipo",
      },
      { name: "Cinghiale al Cannonau", price: 15 },
      { name: "Spigola alla vernaccia", price: 13 },
      { name: "Tonno alla catalana", price: 8 },
      { name: "Gamberoni alla griglia", price: null },
    ],
  },
  {
    id: "pizze",
    label: "Pizze speciali",
    items: [
      { name: "Margherita", price: 6 },
      { name: "Capricciosa", price: 7.5 },
      { name: "Locanda", price: 8 },
      { name: "4 Formaggi", price: 8 },
      { name: "Bufala", price: 8 },
    ],
  },
  {
    id: "dolci",
    label: "Dolci",
    items: [
      { name: "Seadas al miele", price: 5, signature: true },
      { name: "Torta di ricotta di pecora", price: 4 },
      { name: "Dolcetti misti sardi", price: 3 },
    ],
  },
  {
    id: "bevande",
    label: "Bevande",
    items: [
      { name: "Selezione vini sardi, Cannonau e Vermentino", price: null },
      { name: "Birre artigianali", price: null },
    ],
  },
];

export const menuDisclaimer = "Menu e prezzi possono variare — verificare in loco";

export default menuCategories;
