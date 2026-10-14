import React, { useState } from 'react';

export const FormularioContacto = ({ onAgregar }) => {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim() || !telefono.trim()) return;

    onAgregar({ id: Date.now(), nombre, telefono });
    setNombre('');
    setTelefono('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Nombre completo"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        style={{ marginRight: '10px', padding: '6px' }}
      />
      <input
        type="text"
        placeholder="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        style={{ marginRight: '10px', padding: '6px' }}
      />
      <button type="submit" style={{ padding: '6px 12px', cursor: 'pointer' }}>Agregar Contacto</button>
    </form>
  );
};