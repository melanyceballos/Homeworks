import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const Navbar = ({ onOpenAuthModal }) => {
  const { user, logout, isAuthenticated } = useContext(AuthContext);

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <span style={{ fontSize: '1.4rem' }}></span>
        <h2>Explorador Árbol N-ario</h2>
      </div>

      <div className="navbar-user">
        {isAuthenticated && (
          <div className="user-info">
            <span className="user-email">
               {user.email}
            </span>
            <button onClick={logout} className="btn-logout" title="Cerrar sesión">
               Salir
            </button>
          </div>
        )}
      </div>
    </header>
  );
};