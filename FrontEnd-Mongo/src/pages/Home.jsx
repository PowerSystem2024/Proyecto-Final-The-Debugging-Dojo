import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";

const slidesFallback = [
  { src: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1600&auto=format", alt: "Auriculares y teclado" },
  { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format", alt: "Laptop y gadgets" },
  { src: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1600&auto=format", alt: "Programación y hardware" },
];

const categories = [
  { icon: "🎧", label: "Audio" },
  { icon: "💻", label: "Laptops" },
  { icon: "📱", label: "Smartphones" },
  { icon: "⌚", label: "Wearables" },
  { icon: "🖱️", label: "Periféricos" },
  { icon: "🖥️", label: "Monitores" },
  { icon: "🎮", label: "Gaming" },
];

const featured = [
  {
    id: 1,
    name: "Auriculares Sony WH-1000XM5",
    price: 379.99,
    // Preferible: imagen local
    img: "/images/featured-headphones.jpg",
    // Fallback si no tenés la local:
    // img: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1200&auto=format"
  },
  {
    id: 2,
    name: "Teclado Mecánico Pro",
    price: 119.99,
    img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format",
  },
  {
    id: 3,
    name: "Mouse Inalámbrico MX",
    price: 89.99,
    img: "https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=1200&auto=format",
  },
  {
    id: 4,
    name: "Monitor 27'' 144Hz",
    price: 329.99,
    // Preferible: imagen local
    img: "/images/featured-monitor.jpg",
    // Fallback si no tenés la local:
    // img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&sat=-100"
  },
];


const reviews = [
  { text: "La compra más rápida y prolija que hice. El soporte me ayudó a configurar todo.", author: "Camila R." },
  { text: "Excelente atención y productos de calidad. ¡Repetiré sin dudas!", author: "Martín G." },
  { text: "Llegó todo perfecto y antes de lo esperado. Muy recomendable.", author: "Laura P." },
  { text: "Increíble servicio postventa, resolvieron mi problema en minutos.", author: "Tomás V." },
  { text: "Me encantó el diseño del sitio, súper fácil comprar y comparar productos.", author: "Julieta D." },
  { text: "Gran variedad y precios justos, sin dudas volveré a comprar.", author: "Nicolás H." },
];


const Home = () => {
  const [current, setCurrent] = useState(0);
  const slides = useMemo(() => slidesFallback, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <main className="home">

      {/* HERO */}
      <section className="hero">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`slide ${i === current ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.src})` }}
            aria-label={slide.alt}
          />
        ))}
        <div className="overlay">
          <h1>Bienvenido a TechStore</h1>
          <p>Tu tienda tecnológica ideal.</p>
        </div>
        <div className="dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={i === current ? "dot active" : "dot"}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section className="cats" aria-labelledby="cats-title">
        <div className="container">
          <h2 id="cats-title">Explorá por categorías</h2>
          <div className="cats__panel">
            <nav className="cats__row" aria-label="Categorías">
              {categories.map((c) => (
                <Link key={c.label} to="/productos" className="cats__item">
                  <span className="cats__icon">{c.icon}</span>
                  <span className="cats__label">{c.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* DESTACADOS
      <section className="featured">
        <div className="container">
          <h2>Productos destacados de la semana</h2>
          <div className="featured__grid">
            {featured.map(p => (
              <article key={p.id} className="card">
                <img src={p.img} alt={p.name} />
                <div className="card__body">
                  <h3>{p.name}</h3>
                  <p className="price">${p.price}</p>
                  <Link to={`/producto/${p.id}`} className="btn">Ver detalle</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section> */}

      {/* BENEFICIOS */}
      <section className="benefits">
        <div className="container benefits__grid">
          <div>
            <h3>🚚 Envíos a todo el país</h3>
            <p>Rápidos, seguros y con seguimiento online.</p>
          </div>
          <div>
            <h3>🛠️ Garantía oficial</h3>
            <p>Comprá con confianza y soporte posventa.</p>
          </div>
          <div>
            <h3>💬 Atención personalizada</h3>
            <p>Nuestro equipo te ayuda a elegir lo mejor.</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="reviews">
        <div className="container">
          <h2>Opiniones de nuestros clientes</h2>
          <div className="reviews__grid">
            {reviews.map((r, i) => (
              <blockquote key={i}>
                <p>“{r.text}”</p>
                <footer>— {r.author}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
};

export default Home;
