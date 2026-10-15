import React, { useContext } from 'react';
import { FileSystemContext } from '../context/FileSystemContext';
import { NodeItem } from './NodeItem';
import { HardDrive } from 'lucide-react';

export const FileExplorer = ({ onOpenCreateModal }) => {
  const { tree } = useContext(FileSystemContext);

  return (
    <div className="explorer-container">
      <div className="explorer-header">
        <HardDrive size={20} />
        <h3>Estructura del Árbol de Directorios</h3>
      </div>

      <div className="explorer-tree">
        <NodeItem node={tree.root} onOpenCreateModal={onOpenCreateModal} />
      </div>
    </div>
  );
};