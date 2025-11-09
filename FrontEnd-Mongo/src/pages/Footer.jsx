// src/components/Footer.jsx
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="ft">
      <div className="ft__band">
        <div className="container ft__grid">
          <div className="ft__brand">
            <h3>TechStore</h3>
            <p>Desde 2018. Tecnología de confianza con garantía y soporte.</p>
            <div className="ft__badges">
              <span>🔒 SSL</span><span>⭐ 4.8/5</span>
            </div>
          </div>

          <nav className="ft__col">
            <h4>Enlaces</h4>
            <ul>
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/productos">Productos</Link></li>
              <li><Link to="/ofertas">Ofertas</Link></li>
              <li><Link to="/novedades">Novedades</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
            </ul>
          </nav>

          <nav className="ft__col">
            <h4>Categorías</h4>
            <ul>
              <li><Link to="/productos?c=laptops">Laptops</Link></li>
              <li><Link to="/productos?c=smartphones">Smartphones</Link></li>
              <li><Link to="/productos?c=audio">Audio</Link></li>
              <li><Link to="/productos?c=perifericos">Periféricos</Link></li>
              <li><Link to="/productos?c=monitores">Monitores</Link></li>
            </ul>
          </nav>

          <div className="ft__col">
            <h4>Contacto</h4>
            <ul className="ft__contact">
              <li>📍 Av. Tecnología 1234, Cyber City</li>
              <li>📞 +1 (555) 123-TECH</li>
              <li>✉️ info@techstore-falsa.com</li>
              <li>🕘 Lun–Vie 9–18 · Sáb 10–14</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="ft__bottom">
        <div className="container ft__bottom__wrap">
          <small>© 2024 TechStore · Demostración</small>
          <nav className="ft__legal">
            <Link to="/privacidad">Privacidad</Link>
            <Link to="/terminos">Términos</Link>
            <Link to="/devoluciones">Devoluciones</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
