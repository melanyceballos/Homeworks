import React, { useState, useContext } from 'react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { TaskPage } from './pages/TaskPage';
import './styles/App.scss';

function MainApp() {
  const { user, logout, loading } = useContext(AuthContext);
  const [view, setView] = useState('login');

  if (loading) return <div className="container"><p>Cargando...</p></div>;

  return (
    <div className="container">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>App de Tareas Firebase (Challenge 7)</h2>
        {user && (
          <div>
            <span>{user.email}</span>
            <button onClick={logout} className="btn danger" style={{ marginLeft: '10px' }}>Salir</button>
          </div>
        )}
      </header>

      {user ? (
        <TaskProvider>
          <TaskPage />
        </TaskProvider>
      ) : (
        view === 'login' ? (
          <LoginPage onSwitchToRegister={() => setView('register')} />
        ) : (
          <RegisterPage onSwitchToLogin={() => setView('login')} />
        )
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}