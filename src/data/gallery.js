const base = import.meta.env.BASE_URL;

export const gallery = [
  {
    src: `${base}img/sala.jpg`,
    remote: "https://img02.restaurantguru.com/c787-La-Locanda-del-Sardo-Genzano-di-Roma-meals.jpg",
    alt: "Sala e piatti del ristorante La Locanda del Sardo",
    hero: true,
  },
  {
    src: `${base}img/tartare-tonno.jpg`,
    remote: "https://img02.restaurantguru.com/cab7-Restaurant-La-Locanda-del-Sardo-tuna-tartare.jpg",
    alt: "Tartare di tonno",
  },
  {
    src: `${base}img/piatti-tradizione.jpg`,
    remote: "https://img02.restaurantguru.com/c0a2-Restaurant-La-Locanda-del-Sardo-dishes.jpg",
    alt: "Piatti della tradizione sarda",
  },
  {
    src: `${base}img/soute-cozze.jpg`,
    remote: "https://img02.restaurantguru.com/ccd4-La-Locanda-del-Sardo-mussels.jpg",
    alt: "Soutè di cozze",
  },
  {
    src: `${base}img/dolci.jpg`,
    remote: "https://img02.restaurantguru.com/c9fc-La-Locanda-del-Sardo-Genzano-di-Roma-dessert.jpg",
    alt: "Dolci della casa",
  },
  {
    src: `${base}img/pasta.jpg`,
    remote: "https://img02.restaurantguru.com/cae3-La-Locanda-del-Sardo-spaghetti-carbonara.jpg",
    alt: "Pasta fatta in casa",
  },
  {
    src: `${base}img/risotto.jpg`,
    remote: "https://img02.restaurantguru.com/c8f3-La-Locanda-del-Sardo-Genzano-di-Roma-risotto.jpg",
    alt: "Risotto della locanda",
  },
  {
    src: `${base}img/specialita.jpg`,
    remote: "https://menu.sluurpy.it/foto-piatti/133213/57347614.jpg",
    alt: "Specialità della casa",
  },
];

export const imageFallback = `${base}img/placeholder.svg`;

export default gallery;
