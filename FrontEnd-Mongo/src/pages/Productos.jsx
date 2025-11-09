import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { productosAPI } from '../services/api';
import ProductoList from '../components/ProductoList';  // <— FALTABA

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => { cargarProductos(); }, []);

  const cargarProductos = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await productosAPI.getAll();
      const data = res?.data?.data?.productos ?? res?.data?.productos ?? [];
      setProductos(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error cargando productos:', err);
      setError('Error al cargar los productos. Verifica que el servidor esté corriendo.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerDetalle = (id) => navigate(`/productos/${id}`);

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={cargarProductos} className="btn-retry">Reintentar</button>
      </div>
    );
  }

  return (
    <div className="productos-page">
      <div className="page-header"><div className="productos-stats" /></div>
      <ProductoList productos={productos} onVerDetalle={handleVerDetalle} loading={loading} />
    </div>
  );
};

export default Productos;
