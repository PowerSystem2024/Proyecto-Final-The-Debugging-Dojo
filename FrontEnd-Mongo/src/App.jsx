import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Productos from './pages/Productos';
import Carrito from './pages/Carrito';
import ProductoDetail from './pages/ProductoDetail';
import PagoExitoso from './pages/PagoExitoso'; // ← Asegúrate de tener esta importación
import Footer from './pages/Footer'; // ← Importa el Footer
import DebugEnv from './components/DebugEnv';
import './index.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Navbar />
          <DebugEnv />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/producto/:id" element={<ProductoDetail />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/pago-exitoso" element={<PagoExitoso />} /> {/* ← Esta ruta */}
              <Route path="*" element={
                <div className="not-found">
                  <h2>404 - Página No Encontrada</h2>
                  <p>La página que buscas no existe.</p>
                </div>
              } />
            </Routes>
          </main>
          <Footer /> {/* ← Agrega el Footer aquí */}
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;