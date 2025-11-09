import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { itemCount } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);
  const [elevated, setElevated] = useState(false);
  const location = useLocation();

  // Cierra el drawer al cambiar de ruta
  useEffect(() => setOpen(false), [location.pathname]);

  // Sombra al hacer scroll
  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloqueo de scroll SOLO en body
  useEffect(() => {
    const body = document.body;
    if (open) {
      const sw = window.innerWidth - document.documentElement.clientWidth;
      body.style.overflow = "hidden";
      if (sw > 0) body.style.paddingRight = `${sw}px`;
    } else {
      body.style.overflow = "";
      body.style.paddingRight = "";
    }
    return () => { body.style.overflow = ""; body.style.paddingRight = ""; };
  }, [open]);

  // Esc para cerrar y cerrar si pasa a desktop
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    const onResize = () => { if (window.innerWidth > 900) setOpen(false); };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const linkCx   = ({ isActive }) => `nv-link${isActive ? " active" : ""}`;
  const drawerCx = ({ isActive }) => `nv-drawer-link${isActive ? " active" : ""}`;

  return (
    <header className={`nv-wrap ${elevated ? "nv-wrap--elevated" : "nv-wrap--top"}`} role="banner">
      <nav className="nv-nav" aria-label="Principal">
        <Link to="/" className="nv-brand" aria-label="TechStore">
          <span className="nv-logo" aria-hidden>🛍️</span>
          <span className="nv-brand-text">TechStore</span>
        </Link>

        <button
          className="nv-burger"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="mobile-drawer"
          onClick={() => setOpen(v => !v)}
        >
          <span /><span /><span />
        </button>

        <div className="nv-links">
          <NavLink to="/" end className={linkCx}>Inicio</NavLink>
          <NavLink to="/productos" className={linkCx}>Productos</NavLink>
          <NavLink to="/carrito" className={({ isActive }) => `nv-link nv-cart${isActive ? " active" : ""}`}>
            <span className="nv-cart-ico" aria-hidden>🛒</span> Carrito
            {itemCount > 0 && <span className="nv-badge">{itemCount}</span>}
          </NavLink>

          {isAuthenticated ? (
            <div className="nv-user">
              <span className="nv-hi">Hola, {user?.nombre || "usuario"}</span>
              <button onClick={logout} className="nv-btn">Cerrar sesión</button>
            </div>
          ) : (
            <div className="nv-auth">
              <NavLink to="/login" className={linkCx}>Iniciar sesión</NavLink>
              <NavLink to="/register" className="nv-btn nv-btn--primary">Registrarse</NavLink>
            </div>
          )}
        </div>
      </nav>

      {open && <div className="nv-dim" onClick={() => setOpen(false)} />}

      <aside
        id="mobile-drawer"
        className={`nv-drawer ${open ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menú móvil"
      >
        <NavLink to="/" end className={drawerCx}>Inicio</NavLink>
        <NavLink to="/productos" className={drawerCx}>Productos</NavLink>
        <NavLink to="/carrito" className={drawerCx}>
          🛒 Carrito {itemCount > 0 && <span className="nv-badge-sm">{itemCount}</span>}
        </NavLink>

        {isAuthenticated ? (
          <>
            <span className="nv-drawer-hi">Hola, {user?.nombre || "usuario"}</span>
            <button onClick={logout} className="nv-drawer-btn">Cerrar sesión</button>
          </>
        ) : (
          <>
            <NavLink to="/login" className={drawerCx}>Iniciar sesión</NavLink>
            <NavLink to="/register" className="nv-drawer-btn nv-drawer-btn--primary">Registrarse</NavLink>
          </>
        )}
      </aside>
    </header>
  );
};

export default Navbar;
