import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { stripeService } from '../services/stripeService';

const PagoExitoso = () => {
  const [searchParams] = useSearchParams();
  const { clearCart, items: cartItems } = useCart();
  const [paymentStatus, setPaymentStatus] = useState('verificando');

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    
    // Simulamos pago exitoso inmediatamente
    simulatePaymentSuccess(sessionId);
  }, [searchParams]);

  const simulatePaymentSuccess = async (sessionId) => {
    try {
      // Simulamos un delay para hacerlo más real
      setTimeout(async () => {
        // ✅ SIMULAR DATOS DE CLIENTE (en un caso real estos vendrían de tu estado o localStorage)
        const customerData = {
          email: 'cliente@real.com', // Esto sería dinámico en producción
          name: 'Cliente Real',
          sessionId: sessionId
        };

        console.log('✅ Simulando pago exitoso para:', customerData);
        
        // ✅ ENVIAR CONFIRMACIÓN A N8N
        await stripeService.simulateSuccessfulPayment(
          customerData.email,
          customerData.name,
          cartItems,
          sessionId
        );

        setPaymentStatus('success');
        clearCart();
        
      }, 2000); // 2 segundos de delay para simular verificación

    } catch (error) {
      console.error('Error en simulación:', error);
      setPaymentStatus('success'); // Igual mostramos éxito
      clearCart();
    }
  };

  if (paymentStatus === 'verificando') {
    return (
      <div className="pago-page">
        <div className="pago-verificando">
          <div className="loading-spinner"></div>
          <h2>Procesando tu pago...</h2>
          <p>Estamos confirmando tu transacción.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pago-page">
      <div className="pago-exitoso">
        <div className="success-icon">✅</div>
        <h1>¡Pago Exitoso!</h1>
        <p>Gracias por tu compra. Tu pedido ha sido procesado correctamente.</p>
        
        <div className="next-steps">
          <h3>Próximos pasos:</h3>
          <ul>
            <li>📧 Recibirás un email de confirmación</li>
            <li>🚚 Tu pedido será enviado en 24-48 horas</li>
            <li>📞 Te contactaremos si hay algún problema</li>
          </ul>
        </div>

        <div className="action-buttons">
          <Link to="/productos" className="btn-seguir-comprando">
            Seguir Comprando
          </Link>
          <Link to="/" className="btn-inicio">
            Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PagoExitoso;