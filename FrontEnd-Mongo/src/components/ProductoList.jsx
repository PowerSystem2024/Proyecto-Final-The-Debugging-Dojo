
import ProductoCard from './ProductoCard';

const ProductoList = ({ productos, onVerDetalle, loading }) => {
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (!productos || productos.length === 0) {
    return (
      <div className="no-products">
        <h3>No se encontraron productos</h3>
        <p>Intenta recargar la página o verificar la conexión con el servidor.</p>
      </div>
    );
  }

  return (
    <div className="productos-grid">
      {productos.map((producto) => (
        <ProductoCard
          key={producto._id}
          producto={producto}
          onVerDetalle={onVerDetalle}
        />
      ))}
    </div>
  );
};

export default ProductoList;