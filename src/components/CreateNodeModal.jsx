import React, { useState, useContext } from 'react';
import { FileSystemContext } from '../context/FileSystemContext';
import { X, FolderPlus, FilePlus } from 'lucide-react';

export const CreateNodeModal = ({ parentNode, onClose }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('folder');
  const [error, setError] = useState('');
  const { createItem } = useContext(FileSystemContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('El nombre del elemento no puede estar vacío.');
      return;
    }

    try {
      createItem(parentNode.id, name.trim(), type);
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Crear en: {parentNode.name}</h3>
          <button onClick={onClose} className="btn-icon"><X size={20} /></button>
        </div>

        {error && <div className="error-badge">{error}</div>}

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Tipo de elemento:</label>
            <div className="radio-group">
              <label className={`radio-card ${type === 'folder' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="nodeType"
                  value="folder"
                  checked={type === 'folder'}
                  onChange={() => setType('folder')}
                />
                <FolderPlus size={18} /> Carpeta
              </label>

              <label className={`radio-card ${type === 'file' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="nodeType"
                  value="file"
                  checked={type === 'file'}
                  onChange={() => setType('file')}
                />
                <FilePlus size={18} /> Archivo
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Nombre del {type === 'folder' ? 'Directorio' : 'Archivo'}:</label>
            <input
              type="text"
              placeholder={type === 'folder' ? 'ej. Mis Documentos' : 'ej. reporte.pdf'}
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-secondary">Cancelar</button>
            <button type="submit" className="btn-primary">Crear Elemento</button>
          </div>
        </form>
      </div>
    </div>
  );
};