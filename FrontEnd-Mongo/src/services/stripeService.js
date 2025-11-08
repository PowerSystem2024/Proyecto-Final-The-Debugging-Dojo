import { loadStripe } from '@stripe/stripe-js';

const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const n8nWebhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;

const stripePromise = stripePublicKey ? loadStripe(stripePublicKey) : null;

export const stripeService = {
  createCheckoutSession: async (cartItems, customerEmail = '', customerName = '') => {
    try {
      if (!stripePromise) {
        throw new Error('Stripe no está configurado correctamente.');
      }

      const baseUrl = window.location.origin;
      const successUrl = `${baseUrl}/pago-exitoso?session_id={CHECKOUT_SESSION_ID}`;
      const cancelUrl = `${baseUrl}/carrito`;

      console.log('📤 Enviando datos del cliente a n8n:', {
        email: customerEmail,
        name: customerName
      });

      // ✅ ENVIAR DATOS DEL CLIENTE A N8N INMEDIATAMENTE
      await stripeService.sendCustomerDataToN8N(customerEmail, customerName, cartItems);

      const response = await fetch(`${apiBaseUrl}/pagos/crear-sesion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartItems,
          customer_email: customerEmail,
          customer_name: customerName,
          success_url: successUrl,
          cancel_url: cancelUrl
        }),
      });

      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
      }

      const data = await response.json();
      return {
        sessionId: data.sessionId,
        url: data.url
      };
    } catch (error) {
      console.error('❌ Error creating checkout session:', error);
      throw error;
    }
  },

  // ✅ NUEVO: Enviar solo datos del cliente a n8n
  sendCustomerDataToN8N: async (customerEmail, customerName, cartItems = []) => {
    try {
      if (!n8nWebhookUrl) {
        console.log('⚠️ N8N no configurado');
        return;
      }

      const customerData = {
        event_type: 'cliente_registrado',
        source: 'formulario_checkout',
        timestamp: new Date().toISOString(),
        cliente: {
          email: customerEmail,
          nombre: customerName,
          fecha_registro: new Date().toISOString()
        },
        carrito: {
          total_items: cartItems.length,
          items: cartItems.map(item => ({
            nombre: item.nombre,
            precio: item.precio,
            cantidad: item.quantity,
            subtotal: item.precio * (item.quantity || 1)
          })),
          total: cartItems.reduce((sum, item) => sum + (item.precio * (item.quantity || 1)), 0)
        },
        proceso: 'iniciado',
        estado: 'pendiente_pago'
      };

      console.log('📤 Enviando datos del cliente a n8n:', customerData);

      // Enviar a n8n - no nos importa si falla, solo intentamos
      fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
      })
      .then(response => {
        if (response.ok) {
          console.log('✅ Datos del cliente enviados a n8n');
        } else {
          console.log('⚠️ N8N respondió con error, pero continuamos');
        }
      })
      .catch(error => {
        console.log('⚠️ Error enviando a n8n, pero continuamos con el pago ', error);
      });

    } catch (error) {
      console.log('⚠️ Error en sendCustomerDataToN8N, pero continuamos:', error.message);
    }
  },

  // ✅ SIMULAR PAGO EXITOSO Y ENVIAR CONFIRMACIÓN
  simulateSuccessfulPayment: async (customerEmail, customerName, cartItems, sessionId) => {
    try {
      if (!n8nWebhookUrl) {
        console.log('⚠️ N8N no configurado para confirmación');
        return;
      }

      const paymentData = {
        event_type: 'pago_simulado_exitoso',
        source: 'simulacion_frontend',
        timestamp: new Date().toISOString(),
        cliente: {
          email: customerEmail,
          nombre: customerName
        },
        pago: {
          id_sesion: sessionId || 'simulated_' + Date.now(),
          estado: 'paid',
          moneda: 'USD',
          monto_total: cartItems.reduce((sum, item) => sum + (item.precio * (item.quantity || 1)), 0),
          metodo: 'tarjeta_credito',
          simulacion: true
        },
        productos: {
          cantidad_total: cartItems.length,
          items: cartItems.map(item => ({
            id: item._id,
            nombre: item.nombre,
            precio: item.precio,
            cantidad: item.quantity
          }))
        },
        proceso: 'completado',
        estado: 'pago_exitoso',
        debug: {
          simulacion: true,
          timestamp: new Date().toISOString()
        }
      };

      console.log('🎯 Enviando pago simulado a n8n:', paymentData);

      // Enviar confirmación a n8n
      fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      })
      .then(response => {
        if (response.ok) {
          console.log('✅ Confirmación de pago enviada a n8n');
        }
      })
      .catch(error => {
        console.log('⚠️ Error enviando confirmación, pero no afecta el proceso ', error);
      });

    } catch (error) {
      console.log('⚠️ Error en simulateSuccessfulPayment:', error.message);
    }
  },

  redirectToCheckout: async (checkoutData) => {
    if (!checkoutData || !checkoutData.url) {
      throw new Error('No hay URL de checkout disponible');
    }
    window.location.href = checkoutData.url;
  },

  isConfigured: () => {
    return !!stripePublicKey && stripePublicKey.startsWith('pk_');
  }
};