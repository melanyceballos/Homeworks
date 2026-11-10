import { useState } from 'react';
import { createContactId, validateContact } from '../utils/contactValidation.js';
export const FormularioContacto = ({ onAgregar, existingIds = [] }) => {
  const [nombre, setNombre] = useState(''), [telefono, setTelefono] = useState(''), [error, setError] = useState('');
  const handleSubmit = event => { event.preventDefault(); const cleanName = nombre.trim(), cleanPhone = telefono.trim(); const validation = validateContact(cleanName, cleanPhone); if (validation) { setError(validation); return; } onAgregar({ id: createContactId(existingIds), nombre: cleanName, telefono: cleanPhone }); setNombre(''); setTelefono(''); setError(''); };
  return <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}><label>Nombre completo <input type="text" required maxLength={80} value={nombre} onChange={e => setNombre(e.target.value)} /></label><label>Teléfono <input type="tel" required maxLength={20} value={telefono} onChange={e => setTelefono(e.target.value)} /></label><button type="submit">Agregar contacto</button>{error && <p role="alert">{error}</p>}</form>;
};
