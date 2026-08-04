import Header from "./components/Header";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import Menu from "./components/Menu";
import Gallery from "./components/Gallery";
import Reviews from "./components/Reviews";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <a href="#contenuto" className="skip-link">
        Salta al contenuto
      </a>
      <Header />
      <main id="contenuto">
        <Hero />
        <Intro />
        <Menu />
        <Gallery />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
