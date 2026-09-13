import React from 'react';

export const ItemContacto = ({ contacto, onEliminar }) => {
  return (
    <li style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', padding: '8px', border: '1px solid #ccc' }}>
      <div>
        <strong>{contacto.nombre}</strong> - <span>{contacto.telefono}</span>
      </div>
      <button onClick={() => onEliminar(contacto.id)} style={{ backgroundColor: '#ff4d4d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        Eliminar
      </button>
    </li>
  );
};