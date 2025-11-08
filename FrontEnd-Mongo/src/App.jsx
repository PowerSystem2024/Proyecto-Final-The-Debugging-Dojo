import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Productos from './pages/Productos';
import Carrito from './pages/Carrito';
import PagoExitoso from './pages/PagoExitoso';
import Login from './pages/Login'; // 👈 Importar Login
import Register from './pages/Register'; // 👈 Importar Register
import './index.css';

function App() {
  return (
    <AuthProvider> {/* 👈 AuthProvider debe envolver todo */}
      <ToastProvider>
        <CartProvider>
          <Router>
            <div className="App">
              <Navbar />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/productos" element={<Productos />} />
                  <Route path="/carrito" element={<Carrito />} />
                  <Route path="/pago-exitoso" element={<PagoExitoso />} />
                  
                  {/* 👇 NUEVAS RUTAS DE AUTENTICACIÓN */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  
                  <Route path="*" element={
                    <div className="not-found">
                      <h2>404 - Página No Encontrada</h2>
                      <p>La página que buscas no existe.</p>
                    </div>
                  } />
                </Routes>
              </main>
            </div>
          </Router>
        </CartProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;