import axios from 'axios';

// URL base de la API desde variables de entorno
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log('🔗 URL de API configurada:', API_BASE_URL);
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error de API:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const productosAPI = {
  getAll: () => api.get('/productos'),
  getById: (id) => api.get(`/productos/${id}`),
  create: (productoData) => api.post('/productos', productoData),
  update: (id, productoData) => api.put(`/productos/${id}`, productoData),
  delete: (id) => api.delete(`/productos/${id}`),
};

export default api;