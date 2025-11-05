import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { stripeService } from '../services/stripeService';
import { Link } from 'react-router-dom';

const Carrito = () => {
  const { 
    items: cartItems, 
    removeFromCart, 
    clearCart, 
    total,
    itemCount 
  } = useCart();
  
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheckout = async () => {
    try {
      setLoading(true);
      setError('');

      console.log('🛒 Iniciando checkout...');

      // Validaciones
      if (!customerEmail || !customerName) {
        setError('Por favor ingresa tu email y nombre completo');
        return;
      }

      if (!cartItems || cartItems.length === 0) {
        setError('El carrito está vacío');
        return;
      }

      if (!stripeService.isConfigured()) {
        setError('Stripe no está configurado correctamente');
        return;
      }

      console.log('📦 Items del carrito:', cartItems);
      console.log('👤 Cliente:', { email: customerEmail, name: customerName });

      // ✅ GUARDAR DATOS DEL CLIENTE TEMPORALMENTE
      localStorage.setItem('lastCustomer', JSON.stringify({
        email: customerEmail,
        name: customerName,
        cartItems: cartItems,
        timestamp: new Date().toISOString()
      }));

      // ✅ ENVIAR DATOS DEL CLIENTE A N8N INMEDIATAMENTE
      await stripeService.sendCustomerDataToN8N(customerEmail, customerName, cartItems);

      // Crear sesión de Stripe
      const checkoutData = await stripeService.createCheckoutSession(
        cartItems, 
        customerEmail, 
        customerName
      );
      
      console.log('🎫 Checkout data recibido:', checkoutData);
      
      // Redirigir a Stripe
      await stripeService.redirectToCheckout(checkoutData);
      
    } catch (error) {
      console.error('❌ Error durante el checkout:', error);
      setError(`Error al procesar el pago: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  // Función para probar n8n sin Stripe
  const handleTestN8N = async () => {
    try {
      if (!customerEmail || !customerName) {
        setError('Por favor ingresa tu email y nombre completo');
        return;
      }

      console.log('🧪 Probando envío a n8n...');
      
      // ✅ ENVIAR DATOS DEL CLIENTE A N8N
      await stripeService.sendCustomerDataToN8N(customerEmail, customerName, cartItems);
      
      // ✅ SIMULAR PAGO EXITOSO
      await stripeService.simulateSuccessfulPayment(customerEmail, customerName, cartItems);
      
      alert('✅ Datos enviados a n8n correctamente. Revisa tu webhook.');
      
    } catch (error) {
      console.error('❌ Error probando n8n:', error);
      setError(`Error probando n8n: ${error.message}`);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="carrito-vacio">
        <h2>Tu carrito está vacío</h2>
        <p>Agrega algunos productos para continuar.</p>
        <Link to="/productos" className="btn-primary">
          Ver Productos
        </Link>
      </div>
    );
  }

  return (
    <div className="carrito-container">
      <h2>Carrito de Compras</h2>
      
  

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* Lista de productos en el carrito */}
      <div className="carrito-items">
        {cartItems.map((item) => (
          <div key={item._id} className="carrito-item">
            <img 
              src={item.imagen} 
              alt={item.nombre}
              className="carrito-item-image"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/80x80/4A5568/FFFFFF?text=Imagen';
              }}
            />
            <div className="carrito-item-info">
              <h3>{item.nombre}</h3>
              <p>{item.descripcion}</p>
              <p className="carrito-item-precio">${item.precio} x {item.quantity}</p>
              <p className="carrito-item-subtotal">Subtotal: ${(item.precio * item.quantity).toFixed(2)}</p>
            </div>
            <button 
              onClick={() => handleRemoveItem(item._id)}
              className="btn-remove"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="carrito-total">
        <h3>Total: ${total.toFixed(2)}</h3>
        {total > 50 && (
          <p className="envio-gratis">🎉 ¡Envío gratis en compras mayores a $50!</p>
        )}
      </div>

      {/* Formulario de checkout */}
      <div className="checkout-form">
        <h3>Información del Comprador</h3>
        
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            placeholder="tu@email.com"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="nombre">Nombre Completo:</label>
          <input
            id="nombre"
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Tu nombre completo"
            required
          />
        </div>

       
        <div className="carrito-actions">
          <Link to="/productos" className="btn-secondary">
            ← Seguir Comprando
          </Link>
          
          <button 
            onClick={handleCheckout}
            disabled={loading || !stripeService.isConfigured()}
            className="checkout-button"
          >
            {loading ? 'Procesando...' : 'Proceder al Pago'}
          </button>

          <button 
            onClick={handleClearCart}
            className="btn-clear"
          >
            Vaciar Carrito
          </button>
        </div>

      
      </div>
    </div>
  );
};

export default Carrito;