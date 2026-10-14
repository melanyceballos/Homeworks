import React, { useState, useEffect } from 'react';
import { FormularioContacto } from './components/FormularioContacto';
import { ListaContactos } from './components/ListaContactos';

export default function App() {
  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setContactos([
        { id: 1, nombre: 'Melany Ceballos', telefono: '1111111' },
        { id: 2, nombre: 'Martha Ortiz', telefono: '2222222' }
      ]);
      setCargando(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const agregarContacto = (nuevoContacto) => {
    setContactos((prev) => [...prev, nuevoContacto]); 
  };

  const eliminarContacto = (id) => {
    setContactos((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', fontFamily: 'Arial' }}>
      <h2> Agenda de contactos</h2>
      {cargando ? (
        <h3> Cargando contactos, por favor espere...</h3> 
      ) : (
        <>
          <FormularioContacto onAgregar={agregarContacto} />
          <ListaContactos contactos={contactos} onEliminar={eliminarContacto} />
        </>
      )}
    </div>
  );
}