import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { X, Lock, Mail } from 'lucide-react';

export const LoginForm = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      login(email, password);
      onClose();
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Autenticación de Usuario</h3>
          <button onClick={onClose} className="btn-icon"><X size={20} /></button>
        </div>

        {errorMsg && <div className="error-badge">{errorMsg}</div>}

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label><Mail size={16} /> Correo Electrónico</label>
            <input
              type="email"
              placeholder="usuario@dominio.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label><Lock size={16} /> Contraseña</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-secondary">Cancelar</button>
            <button type="submit" className="btn-primary">Ingresar</button>
          </div>
        </form>
      </div>
    </div>
  );
};