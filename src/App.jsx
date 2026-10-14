import React, { useState, useContext } from 'react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { PrivateRoute } from './components/PrivateRoute';
import { LoginPage } from './pages/LoginPage';
import { BooksPage } from './pages/BooksPage';
import { AtmPage } from './pages/AtmPage';

function AppContent() {
  const [activeTab, setActiveTab] = useState('login');
  const { user, logout } = useContext(AuthContext);

  return (
    <div style={{ maxWidth: '600px', margin: '30px auto', fontFamily: 'Arial' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Demo Auth + Rutas Privadas (Challenge 6)</h2>
        {user && (
          <div>
            <span>Hola, <strong>{user.name}</strong></span>
            <button onClick={logout} style={{ marginLeft: '10px', padding: '4px 8px', cursor: 'pointer' }}>Salir</button>
          </div>
        )}
      </header>

      <nav style={{ marginBottom: '20px' }}>
        <button onClick={() => setActiveTab('login')} style={{ marginRight: '8px' }}>Login</button>
        <button onClick={() => setActiveTab('books')} style={{ marginRight: '8px' }}>Página Privada 1</button>
        <button onClick={() => setActiveTab('atm')}>Página Privada 2</button>
      </nav>

      {activeTab === 'login' && <LoginPage />}
      {activeTab === 'books' && (
        <PrivateRoute>
          <BooksPage />
        </PrivateRoute>
      )}
      {activeTab === 'atm' && (
        <PrivateRoute>
          <AtmPage />
        </PrivateRoute>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}