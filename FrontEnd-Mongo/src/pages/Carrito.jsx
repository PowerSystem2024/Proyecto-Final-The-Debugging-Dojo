import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { stripeService } from '../services/stripeService';
import { Link } from 'react-router-dom';

const formatPrice = (n) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n);

const Carrito = () => {
  const { items: cartItems, removeFromCart, clearCart, total } = useCart();

  const [customerEmail, setCustomerEmail] = useState('');
  const [customerName,   setCustomerName]   = useState('');
  const [loading,        setLoading]        = useState(false);
  const [error,          setError]          = useState('');

  const handleCheckout = async () => {
    try {
      setLoading(true); setError('');
      if (!customerEmail || !customerName) { setError('Ingresa email y nombre completo'); return; }
      if (!cartItems || cartItems.length === 0) { setError('El carrito está vacío'); return; }
      if (!stripeService.isConfigured()) { setError('Stripe no está configurado'); return; }

      localStorage.setItem('lastCustomer', JSON.stringify({
        email: customerEmail, name: customerName, cartItems, timestamp: new Date().toISOString()
      }));

      await stripeService.sendCustomerDataToN8N(customerEmail, customerName, cartItems);

      const checkoutData = await stripeService.createCheckoutSession(cartItems, customerEmail, customerName);
      await stripeService.redirectToCheckout(checkoutData);
    } catch (e) {
      setError(`Error al procesar el pago: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <div className="cart-empty-card">
          <div className="cart-empty-emoji">🛍️</div>
          <h2>Tu carrito está vacío</h2>
          <p>Agregá productos para continuar.</p>
          <Link to="/productos" className="btn-primary">Ver productos</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-wrap">
      <div className="cart-header">
        <h1>Carrito</h1>
        <span className="cart-count">{cartItems.length} ítem(s)</span>
      </div>

      {error && <div className="cart-error">{error}</div>}

      <div className="cart-grid">
        {/* Columna izquierda: items */}
        <div className="cart-list">
          {cartItems.map((item) => (
            <article key={item._id} className="cart-item">
              <img
                src={item.imagen}
                alt={item.nombre}
                className="cart-item-img"
                onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/96x96/1f2937/ffffff?text=Sin+img'; }}
              />
              <div className="cart-item-info">
                <h3 className="cart-item-title">{item.nombre}</h3>
                <p className="cart-item-desc">{item.descripcion}</p>
                <div className="cart-item-meta">
                  <span className="cart-item-price">{formatPrice(item.precio)}</span>
                  <span className="cart-item-qty">x {item.quantity}</span>
                  <span className="cart-item-sub">{formatPrice(item.precio * item.quantity)}</span>
                </div>
              </div>
              <button className="cart-remove" onClick={() => removeFromCart(item._id)} aria-label="Quitar">
                🗑️
              </button>
            </article>
          ))}

          <div className="cart-actions">
            <Link to="/productos" className="btn-secondary">← Seguir comprando</Link>
            <button onClick={clearCart} className="btn-danger">Vaciar carrito</button>
          </div>
        </div>

        {/* Columna derecha: resumen */}
        <aside className="cart-summary">
          <h2>Resumen</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatPrice(total)}</span>
          </div>
          <div className="summary-row">
            <span>Envío</span>
            <span>{total > 50000 ? 'Gratis' : formatPrice(0)}</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>

          <div className="checkout-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" value={customerEmail}
                     onChange={(e) => setCustomerEmail(e.target.value)} placeholder="tu@email.com" />
            </div>
            <div className="form-group">
              <label htmlFor="nombre">Nombre completo</label>
              <input id="nombre" type="text" value={customerName}
                     onChange={(e) => setCustomerName(e.target.value)} placeholder="Nombre y apellido" />
            </div>
            <button
              className="btn-primary btn-buy"
              onClick={handleCheckout}
              disabled={loading || !stripeService.isConfigured()}
            >
              {loading ? 'Procesando…' : 'Proceder al pago'}
            </button>
            <p className="summary-hint">Pagos protegidos SSL</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Carrito;
