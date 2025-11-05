
import { Link } from 'react-router-dom';

const Home = () => {

  // Estadísticas falsas
  const stats = [
    { number: "10K+", label: "Clientes Satisfechos" },
    { number: "500+", label: "Productos Disponibles" },
    { number: "24/7", label: "Soporte Técnico" },
    { number: "5⭐", label: "Rating Promedio" }
  ];

  // Marcas asociadas falsas
  const brands = ["Apple", "Samsung", "Sony", "Dell", "HP", "Lenovo", "Bose", "Logitech"];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Bienvenido a <span className="highlight">TechStore</span></h1>
          <p className="hero-subtitle">
            Descubre los mejores productos tecnológicos con garantía oficial y envío gratis en compras mayores a $50
          </p>
          <div className="hero-buttons">
            <Link to="/productos" className="btn-primary">
              🛒 Comprar Ahora
            </Link>
            {/* <Link to="/ofertas" className="btn-secondary">
              💰 Ver Ofertas
            </Link> */}
          </div>
          <div className="hero-features">
            <span>🚚 Envío Gratis</span>
            <span>🔒 Pago Seguro</span>
            <span>🔄 30 Días Devolución</span>
          </div>
        </div>
        <div className="hero-image">
          <img 
            src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=600&h=400&fit=crop" 
            alt="Tecnología de vanguardia" 
          />
        </div>
      </section>

      {/* Estadísticas */}
      <section className="stats-section">
        <div className="stats-container">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Productos Destacados
      <section className="featured-products">
        <div className="section-header">
          <h2>🔥 Productos Destacados</h2>
          <p>Los favoritos de nuestros clientes</p>
        </div>
        <div className="products-grid">
          {featuredProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <div className="product-category">{product.category}</div>
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <div className="product-price">${product.price}</div>
                <Link to={`/producto/${product.id}`} className="btn-view-product">
                  Ver Detalles
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="section-actions">
          <Link to="/productos" className="btn-view-all">
            Ver Todos los Productos →
          </Link>
        </div>
      </section> */}

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2>🌟 ¿Por qué elegir TechStore?</h2>
          <p>La mejor experiencia de compra tecnológica</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>Tecnología de Vanguardia</h3>
            <p>Los últimos lanzamientos y productos más innovadores del mercado tecnológico</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">💳</div>
            <h3>Precios Competitivos</h3>
            <p>Las mejores ofertas, descuentos exclusivos y planes de financiación disponibles</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📦</div>
            <h3>Envío Express</h3>
            <p>Recibe tus productos en 24-48 horas con nuestro servicio de envío prioritario</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔧</div>
            <h3>Soporte Técnico</h3>
            <p>Asesoramiento especializado y soporte técnico post-venta incluido</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>Garantía Extendida</h3>
            <p>Todos nuestros productos incluyen garantía oficial del fabricante</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💎</div>
            <h3>Calidad Premium</h3>
            <p>Productos 100% originales y verificados por nuestro equipo de calidad</p>
          </div>
        </div>
      </section>

      {/* Marcas */}
      <section className="brands-section">
        <div className="section-header">
          <h2>🏆 Marcas de Confianza</h2>
          <p>Trabajamos con las mejores marcas del mercado</p>
        </div>
        <div className="brands-grid">
          {brands.map((brand, index) => (
            <div key={index} className="brand-item">
              {brand}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
   <section className="cta-section">
  <div className="cta-content">
    <h2>¿Listo para mejorar tu tecnología?</h2>
    <p>Únete a miles de clientes satisfechos y descubre por qué somos la tienda #1 en tecnología</p>
    <div className="cta-buttons">
      <Link to="/productos" className="btn-primary large">
        Comenzar a Comprar
      </Link>
      <a
        href="https://wa.me/5492235123456?text=Hola!%20Quisiera%20hablar%20con%20un%20asesor."
        target="_blank"
        rel="noopener noreferrer"
        className="btn-secondary large"
      >
        Contactar Asesor
      </a>
    </div>
  </div>
</section>


      {/* Newsletter */}
      {/* <section className="newsletter-section">
        <div className="newsletter-content">
          <h3>📧 Mantente Informado</h3>
          <p>Recibe las últimas ofertas y novedades tecnológicas en tu email</p>
          <div className="newsletter-form">
            <input 
              type="email" 
              placeholder="tu@email.com" 
              className="newsletter-input"
            />
            <button className="btn-newsletter">
              Suscribirse
            </button>
          </div>
          <small>Sin spam, puedes cancelar en cualquier momento</small>
        </div>
      </section> */}
    </div>
  );
};

export default Home;