import React, { useState, useContext } from 'react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { FileSystemProvider } from './context/FileSystemContext';
import { Navbar } from './components/Navbar';
import { FileExplorer } from './components/FileExplorer';
import { LoginForm } from './components/LoginForm';
import { CreateNodeModal } from './components/CreateNodeModal';
import './index.css';

function MainContent() {
  const { isAuthenticated } = useContext(AuthContext);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedParentNode, setSelectedParentNode] = useState(null);

  return (
    <div className="app-container">
      <Navbar onOpenAuthModal={() => setShowAuthModal(true)} />

      <main>
        {isAuthenticated ? (
          <FileExplorer onOpenCreateModal={(node) => setSelectedParentNode(node)} />
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '50px 20px',
            backgroundColor: 'var(--bg-card)',
            borderRadius: '10px',
            border: '1px solid var(--border-color)'
          }}>
            <h2>🔒 Acceso Restringido</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
              Debes iniciar sesión para poder ver y gestionar las carpetas y archivos.
            </p>
            <button 
              onClick={() => setShowAuthModal(true)} 
              className="btn-primary"
              style={{ fontSize: '1rem', padding: '10px 20px' }}
            >
              Iniciar Sesión
            </button>
          </div>
        )}
      </main>

      {showAuthModal && !isAuthenticated && (
        <LoginForm onClose={() => setShowAuthModal(false)} />
      )}

      {selectedParentNode && isAuthenticated && (
        <CreateNodeModal
          parentNode={selectedParentNode}
          onClose={() => setSelectedParentNode(null)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <FileSystemProvider>
        <MainContent />
      </FileSystemProvider>
    </AuthProvider>
  );
}