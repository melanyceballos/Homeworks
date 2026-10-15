import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FileSystemContext } from '../context/FileSystemContext';
import { 
  Folder, 
  FolderOpen, 
  FileText, 
  ChevronRight, 
  ChevronDown, 
  Plus, 
  Trash2,
  UserCheck 
} from 'lucide-react';

export const NodeItem = ({ node, onOpenCreateModal }) => {
  const [isOpen, setIsOpen] = useState(true);
  const { isAuthenticated } = useContext(AuthContext);
  const { removeItem } = useContext(FileSystemContext);

  const isFolder = node.type === 'folder';

  const toggleOpen = (e) => {
    e.stopPropagation();
    if (isFolder) {
      setIsOpen(!isOpen);
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (confirm(`¿Seguro que deseas eliminar "${node.name}"?`)) {
      removeItem(node.id);
    }
  };

  const handleAddChild = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      alert('Debe iniciar sesión para poder crear un archivo o carpeta.');
      return;
    }
    onOpenCreateModal(node);
  };

  return (
    <div className="node-wrapper">
      <div className={`node-row ${isFolder ? 'folder-row' : 'file-row'}`} onClick={toggleOpen}>
        <div className="node-info">
          {isFolder ? (
            <span className="chevron-icon">
              {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </span>
          ) : (
            <span className="chevron-spacer"></span>
          )}

          {isFolder ? (
            isOpen ? <FolderOpen size={18} className="icon-folder" /> : <Folder size={18} className="icon-folder" />
          ) : (
            <FileText size={18} className="icon-file" />
          )}

          <span className="node-name">{node.name}</span>
          
          <span className="node-creator" title="Creado por">
            <UserCheck size={13} /> {node.createdBy}
          </span>
        </div>

        <div className="node-actions">
          {isFolder && (
            <button
              onClick={handleAddChild}
              className="btn-action btn-add"
              title="Agregar elemento hijo"
            >
              <Plus size={15} />
            </button>
          )}

          {node.id !== 'root' && (
            <button
              onClick={handleDelete}
              className="btn-action btn-delete"
              title="Eliminar elemento"
            >
              <Trash2 size={15} />
            </button>
          )}
        </div>
      </div>

      {isFolder && isOpen && node.children && node.children.length > 0 && (
        <div className="node-children">
          {node.children.map((childNode) => (
            <NodeItem
              key={childNode.id}
              node={childNode}
              onOpenCreateModal={onOpenCreateModal}
            />
          ))}
        </div>
      )}
    </div>
  );
};