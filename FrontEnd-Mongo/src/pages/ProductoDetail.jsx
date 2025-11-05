import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { productosAPI } from '../services/api';

const ProductoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        setLoading(true);
        console.log('🔄 Fetching producto with ID:', id);
        const response = await productosAPI.getById(id);
        console.log('📦 Full response:', response);
        
        // Diferentes estructuras posibles
        let productData;
        if (response.data.data?.producto) {
          productData = response.data.data.producto;
        } else if (response.data.producto) {
          productData = response.data.producto;
        } else {
          productData = response.data;
        }
        
        console.log('🎯 Product data:', productData);
        setProducto(productData);
      } catch (err) {
        console.error('❌ Error al cargar el producto:', err);
        setError('No se pudo cargar el producto');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProducto();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (producto) {
      addToCart(producto);
      alert(`¡${producto.nombre} añadido al carrito!`);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="producto-detail-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando producto...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="producto-detail-container">
        <div className="error-message">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={handleGoBack} className="btn-back">
            Volver Atrás
          </button>
          <Link to="/productos" className="btn-primary">
            Ver Todos los Productos
          </Link>
        </div>
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="producto-detail-container">
        <div className="not-found">
          <h2>Producto No Encontrado</h2>
          <p>El producto que buscas no existe.</p>
          <button onClick={handleGoBack} className="btn-back">
            Volver Atrás
          </button>
          <Link to="/productos" className="btn-primary">
            Ver Todos los Productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="producto-detail-container">
      <button onClick={handleGoBack} className="btn-back">
        ← Volver Atrás
      </button>
      
      <div className="producto-detail">
        <div className="producto-detail-image">
          <img 
            src={producto.imagen || '/placeholder-image.jpg'} 
            alt={producto.nombre}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/500x400/4A5568/FFFFFF?text=Imagen+No+Disponible';
            }}
          />
        </div>
        
        <div className="producto-detail-info">
          <h1 className="producto-detail-nombre">{producto.nombre}</h1>
          <p className="producto-detail-descripcion">{producto.descripcion}</p>
          
          <div className="producto-detail-meta">
            <div className="precio-section">
              <span className="producto-detail-precio">${producto.precio}</span>
            </div>
            
            <div className="stock-section">
              <span className={`producto-detail-stock ${producto.stock < 5 ? 'low-stock' : ''}`}>
                {producto.stock === 0 ? 'Agotado' : `Stock disponible: ${producto.stock}`}
              </span>
            </div>
            
            <div className="categoria-section">
              <span className="producto-detail-categoria">
                Categoría: {producto.categoria}
              </span>
            </div>
          </div>
          
          <div className="producto-detail-actions">
            <button 
              className="btn-add-to-cart-large"
              onClick={handleAddToCart}
              disabled={producto.stock === 0}
            >
              {producto.stock === 0 ? 'Producto Agotado' : '🛒 Añadir al Carrito'}
            </button>
            
            <Link to="/productos" className="btn-secondary">
              Ver Más Productos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductoDetail;