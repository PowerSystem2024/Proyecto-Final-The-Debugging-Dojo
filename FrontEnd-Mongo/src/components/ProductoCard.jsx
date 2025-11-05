import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductoCard = ({ producto }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate(); // ← Agregar este hook

  const handleAddToCart = (e) => {
    e.stopPropagation(); // ← Prevenir que el click se propague al contenedor principal
    addToCart(producto);
    alert(`¡${producto.nombre} añadido al carrito!`);
  };

  const handleCardClick = () => {
    console.log('🖱️ Clicked product ID:', producto._id); // Debug
    navigate(`/producto/${producto._id}`); // ← Navegar al detalle del producto
  };

  return (
    <div className="producto-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <div className="producto-image">
        <img 
          src={producto.imagen || '/placeholder-image.jpg'} 
          alt={producto.nombre}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200/4A5568/FFFFFF?text=Imagen+No+Disponible';
          }}
        />
      </div>
      
      <div className="producto-info">
        <h3 className="producto-nombre">{producto.nombre}</h3>
        <p className="producto-descripcion">{producto.descripcion}</p>
        
        <div className="producto-details">
          <span className="producto-precio">${producto.precio}</span>
          <span className={`producto-stock ${producto.stock < 5 ? 'low-stock' : ''}`}>
            Stock: {producto.stock}
          </span>
          <span className="producto-categoria">{producto.categoria}</span>
        </div>
        
        <button 
          className="btn-add-to-cart"
          onClick={handleAddToCart}
          disabled={producto.stock === 0}
        >
          {producto.stock === 0 ? 'Sin Stock' : '🛒 Añadir al Carrito'}
        </button>
      </div>
    </div>
  );
};

export default ProductoCard;