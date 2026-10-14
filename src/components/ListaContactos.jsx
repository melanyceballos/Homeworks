import React from 'react';
import { ItemContacto } from './ItemContacto';

export const ListaContactos = ({ contactos, onEliminar }) => {
  if (contactos.length === 0) {
    return <p>No hay contactos guardados.</p>;
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {contactos.map((contacto) => (
        <ItemContacto key={contacto.id} contacto={contacto} onEliminar={onEliminar} />
      ))}
    </ul>
  );
};