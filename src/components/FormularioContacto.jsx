import { useState } from 'react';
export const FormularioContacto = ({ onAgregar }) => {
  const [nombre, setNombre] = useState(''), [telefono, setTelefono] = useState(''), [error, setError] = useState('');
  const handleSubmit = event => { event.preventDefault(); const cleanName = nombre.trim(), cleanPhone = telefono.trim(); if (cleanName.length < 2) { setError('El nombre debe tener al menos 2 caracteres.'); return; } if (!/^\+?[\d\s()-]{7,20}$/.test(cleanPhone)) { setError('Ingrese un teléfono válido (7 a 20 caracteres).'); return; } onAgregar({ id: crypto.randomUUID(), nombre: cleanName, telefono: cleanPhone }); setNombre(''); setTelefono(''); setError(''); };
  return <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}><label>Nombre completo <input type="text" required maxLength={80} value={nombre} onChange={e => setNombre(e.target.value)} /></label><label>Teléfono <input type="tel" required maxLength={20} value={telefono} onChange={e => setTelefono(e.target.value)} /></label><button type="submit">Agregar contacto</button>{error && <p role="alert">{error}</p>}</form>;
};
