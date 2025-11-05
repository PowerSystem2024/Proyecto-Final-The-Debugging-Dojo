import React, { useState, useEffect } from 'react';
import { productosAPI } from '../services/api';
import ProductoList from '../components/ProductoList';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productosAPI.getAll();
      setProductos(response.data.data.productos);
    } catch (err) {
      console.error('Error cargando productos:', err);
      setError('Error al cargar los productos. Verifica que el servidor esté corriendo.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerDetalle = (id) => {
    // Navegar al detalle del producto
    alert(`Ver detalle del producto: ${id}`);
  };

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={cargarProductos} className="btn-retry">
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="productos-page">
      <div className="page-header">
        {/* <h1>Nuestros Productos</h1>
        <p>Encuentra lo último en tecnología</p> */}
        <div className="productos-stats">
          {/* <span>{productos.length} productos encontrados</span> */}
        </div>
      </div>

      <ProductoList 
        productos={productos} 
        onVerDetalle={handleVerDetalle}
        loading={loading}
      />
    </div>
  );
};

export default Productos;