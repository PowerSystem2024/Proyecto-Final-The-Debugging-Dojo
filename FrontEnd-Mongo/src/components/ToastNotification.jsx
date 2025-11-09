// src/components/ToastNotification.jsx
import React, { useEffect } from "react";

const TYPE_CLASS = {
  success: "toast-success",
  error: "toast-error",
  info: "toast-info",
};

export default function ToastNotification({
  message,
  type = "success",
  duration = 3000,
  onClose,
  showIcon = false,   // <- opcional
  icon = null,        // <- permite pasar uno custom si querés
}) {
  useEffect(() => {
    const t = setTimeout(() => onClose?.(), duration);
    return () => clearTimeout(t);
  }, [duration, onClose]);

  return (
    <div className={`toast ${TYPE_CLASS[type]}`}>
      {showIcon && icon ? <span className="toast-icon">{icon}</span> : null}
      <span className="toast-msg">{message}</span>
      <button className="close" aria-label="Cerrar" onClick={onClose}>×</button>
    </div>
  );
}
