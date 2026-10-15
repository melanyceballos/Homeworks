import React, { createContext, useState, useContext } from 'react';
import { FileTree } from '../structures/FileTree';
import { AuthContext } from './AuthContext';

export const FileSystemContext = createContext();

const STORAGE_KEY = 'parcial2_filesystem_tree';

export const FileSystemProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  
  const [tree, setTree] = useState(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        return FileTree.fromJSON(JSON.parse(savedData));
      } catch (err) {
        console.error('Error rehidratando el árbol:', err);
      }
    }
    return new FileTree();
  });

  const persistTree = (updatedTree) => {
    const newInstance = FileTree.fromJSON(updatedTree.toJSON());
    setTree(newInstance);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTree.toJSON()));
  };

  const createItem = (parentId, name, type) => {
    if (!user) {
      throw new Error('Debe iniciar sesión para poder crear un archivo o carpeta.');
    }

    const updatedTree = FileTree.fromJSON(tree.toJSON());
    updatedTree.addNode(parentId, name, type, user.email);
    persistTree(updatedTree);
  };

  const removeItem = (nodeId) => {
    if (!user) {
      throw new Error('Debe estar autenticado para realizar cambios.');
    }

    const updatedTree = FileTree.fromJSON(tree.toJSON());
    const deleted = updatedTree.deleteNode(nodeId);
    if (deleted) {
      persistTree(updatedTree);
    }
  };

  return (
    <FileSystemContext.Provider value={{ tree, createItem, removeItem }}>
      {children}
    </FileSystemContext.Provider>
  );
};