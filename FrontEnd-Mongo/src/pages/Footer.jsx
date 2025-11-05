// components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Sección Información de la Empresa */}
        <div className="footer-section">
          <h3>TechStore</h3>
          <p>Tu tienda de tecnología de confianza desde 2018. Ofrecemos los mejores productos tecnológicos con garantía y soporte premium.</p>
          <div className="social-links">
            <a href="#" aria-label="Facebook">📘</a>
            <a href="#" aria-label="Twitter">🐦</a>
            <a href="#" aria-label="Instagram">📷</a>
            <a href="#" aria-label="LinkedIn">💼</a>
          </div>
        </div>

        {/* Sección Enlaces Rápidos */}
        <div className="footer-section">
          <h4>Enlaces Rápidos</h4>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/productos">Productos</Link></li>
            <li><Link to="/ofertas">Ofertas Especiales</Link></li>
            <li><Link to="/nuevos">Nuevos Lanzamientos</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </div>

        {/* Sección Categorías */}
        <div className="footer-section">
          <h4>Categorías</h4>
          <ul>
            <li><Link to="/productos?categoria=laptops">Laptops & Computadoras</Link></li>
            <li><Link to="/productos?categoria=smartphones">Smartphones</Link></li>
            <li><Link to="/productos?categoria=tablets">Tablets</Link></li>
            <li><Link to="/productos?categoria=accesorios">Accesorios</Link></li>
            <li><Link to="/productos?categoria=audio">Audio & Sonido</Link></li>
          </ul>
        </div>

        {/* Sección Información de Contacto Falsa */}
        <div className="footer-section">
          <h4>Contacto</h4>
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <span>Av. Tecnología 1234<br />Cyber City, CP 5000</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <span>+1 (555) 123-TECH</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">✉️</span>
              <span>info@techstore-falsa.com</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">🕒</span>
              <span>Lun-Vie: 9:00-18:00<br />Sáb: 10:00-14:00</span>
            </div>
          </div>
        </div>

        {/* Sección Métodos de Pago */}
        <div className="footer-section">
          <h4>Métodos de Pago</h4>
          <div className="payment-methods">
            <span className="payment-icon">💳</span>
            <span className="payment-icon">🔗</span>
            <span className="payment-icon">📱</span>
            <span className="payment-icon">🏦</span>
            <span className="payment-icon">👛</span>
          </div>
          <div className="security-badges">
            <span className="badge">🔒 SSL Seguro</span>
            <span className="badge">⭐ 4.8/5 Rating</span>
          </div>
        </div>

      </div>

      {/* Línea inferior con copyright */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p>&copy; 2024 TechStore Ficticia. Todos los derechos reservados. | Esta es una tienda de demostración</p>
          <div className="legal-links">
            <Link to="/privacidad">Política de Privacidad</Link>
            <Link to="/terminos">Términos de Servicio</Link>
            <Link to="/devoluciones">Política de Devoluciones</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;