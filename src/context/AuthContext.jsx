import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('parcial2_session_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (email, password) => {
    if (!email || !email.includes('@')) {
      throw new Error('Por favor ingrese un correo válido.');
    }
    if (!password || password.length < 3) {
      throw new Error('La contraseña debe tener al menos 3 caracteres.');
    }

    const userData = { email, name: email.split('@')[0] };
    setUser(userData);
    localStorage.setItem('parcial2_session_user', JSON.stringify(userData));
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('parcial2_session_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};