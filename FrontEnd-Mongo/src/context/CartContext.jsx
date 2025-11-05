import React, { createContext, useContext, useReducer } from 'react';

// Crear Context
const CartContext = createContext();

// Initial State
const initialState = {
  items: [],
  total: 0,
  itemCount: 0
};

// Reducer para manejar acciones del carrito
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item._id === action.payload._id);
      
      if (existingItem) {
        // Si ya existe, aumentar cantidad
        const updatedItems = state.items.map(item =>
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        
        return {
          ...state,
          items: updatedItems,
          total: state.total + action.payload.precio,
          itemCount: state.itemCount + 1
        };
      } else {
        // Si es nuevo, agregar al carrito
        const newItem = { ...action.payload, quantity: 1 };
        return {
          ...state,
          items: [...state.items, newItem],
          total: state.total + action.payload.precio,
          itemCount: state.itemCount + 1
        };
      }

    case 'REMOVE_FROM_CART':
      const itemToRemove = state.items.find(item => item._id === action.payload);
      const filteredItems = state.items.filter(item => item._id !== action.payload);
      
      return {
        ...state,
        items: filteredItems,
        total: state.total - (itemToRemove.precio * itemToRemove.quantity),
        itemCount: state.itemCount - itemToRemove.quantity
      };

    case 'UPDATE_QUANTITY':
      const { id, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item._id === id);
      
      if (itemToUpdate) {
        const quantityDiff = quantity - itemToUpdate.quantity;
        const updatedItems = state.items.map(item =>
          item._id === id ? { ...item, quantity } : item
        );
        
        return {
          ...state,
          items: updatedItems,
          total: state.total + (itemToUpdate.precio * quantityDiff),
          itemCount: state.itemCount + quantityDiff
        };
      }
      return state;

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
};

// Provider Component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const value = {
    items: state.items,
    total: state.total,
    itemCount: state.itemCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar el context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de CartProvider');
  }
  return context;
};