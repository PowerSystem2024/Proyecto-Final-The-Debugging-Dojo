import React from 'react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const ProductoCard = ({ producto, onVerDetalle }) => {
  const { addToCart } = useCart();
  const { success } = useToast();

  const handleAddToCart = (e) => {
    e.preventDefault();      // evita que el click dispare navegación
    e.stopPropagation();     // bloquea el click del contenedor
    addToCart(producto);
    success(`✅ ${producto.nombre} añadido al carrito`);
  };

  const handleClick = () => {
    if (onVerDetalle) {
      onVerDetalle(producto._id || producto.id);
    }
  };

  return (
    <div className="producto-card" onClick={handleClick}>
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
