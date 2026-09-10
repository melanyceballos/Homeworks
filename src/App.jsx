import React, { useState, useEffect } from 'react';
import { 
  LinkedList, 
  DoublyLinkedList, 
  CircularLinkedList, 
  CircularDoublyLinkedList 
} from './Estructuras';

function App() {
  const [espera] = useState(new LinkedList());
  const [historial] = useState(new DoublyLinkedList());
  
  const [medicos] = useState(() => {
    const listaMedicos = new CircularLinkedList();
    listaMedicos.append('Dr. Marines');
    listaMedicos.append('Dra. Ceballos');
    listaMedicos.append('Dr. Ortiz');
    return listaMedicos;
  });

  const [comite] = useState(() => {
    const listaComite = new CircularDoublyLinkedList();
    listaComite.append('Director general');
    listaComite.append('Médico de cabecera');
    listaComite.append('Jefe de enfermería');
    return listaComite;
  });

  const [listaEsperaUI, setListaEsperaUI] = useState([]);
  const [listaHistorialUI, setListaHistorialUI] = useState([]);
  const [medicoActual, setMedicoActual] = useState(medicos.current ? medicos.current.value : '');
  const [nombrePaciente, setNombrePaciente] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const siguienteMedico = medicos.nextTurn();
      setMedicoActual(siguienteMedico);
    }, 10000);

    return () => clearInterval(timer);
  }, [medicos]);

  const agregarPaciente = () => {
    if (nombrePaciente.trim() !== '') {
      espera.append(nombrePaciente);
      setListaEsperaUI(espera.toArray());
      setNombrePaciente('');
    }
  };

  const atenderPaciente = () => {
    const pacienteAtendido = espera.removeFirst();
    
    if (pacienteAtendido) {
      historial.append(`${pacienteAtendido} (Atendido por ${medicoActual})`);
      setListaEsperaUI(espera.toArray());
      setListaHistorialUI(historial.toArray());
    } else {
      alert("No hay pacientes en espera.");
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1> Clínica</h1>
      <h2>Parcial 1 - Melany Ceballos Ortiz</h2>
      
      <div style={{ backgroundColor: '#e3f2fd', padding: '10px', borderRadius: '5px' }}>
        <h2>Médico de guardia actual: {medicoActual}</h2>
      </div>

      <hr style={{ margin: '20px 0' }} />

      <div>
        <h3>Agregar paciente a recepción</h3>
        <input 
          value={nombrePaciente}
          onChange={(e) => setNombrePaciente(e.target.value)}
          placeholder="Nombre del paciente"
          style={{ padding: '5px', marginRight: '10px' }}
        />
        <button onClick={agregarPaciente} style={{ padding: '5px 10px' }}>Agregar a Espera</button>
      </div>

      <div style={{ display: 'flex', gap: '40px', marginTop: '30px', flexWrap: 'wrap' }}>
        
        <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px', minWidth: '250px' }}>
          <h3>Pacientes en espera</h3>
          <button onClick={atenderPaciente} style={{ marginBottom: '10px' }}>Atender Siguiente</button>
          <ol>
            {listaEsperaUI.length === 0 ? <li>No hay pacientes</li> : null}
            {listaEsperaUI.map((paciente, index) => (
              <li key={index}>{paciente}</li>
            ))}
          </ol>
        </div>

        <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px', minWidth: '300px' }}>
          <h3>Historial de Atención</h3>
          <ul>
            {listaHistorialUI.length === 0 ? <li>No hay historial</li> : null}
            {listaHistorialUI.map((registro, index) => (
              <li key={index}>{registro}</li>
            ))}
          </ul>
        </div>

        <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px', minWidth: '250px' }}>
          <h3>Conoce nuestro</h3>
          <h3>Comité administrativo</h3>
          <ul>
            {comite.toArray().map((miembro, index) => (
              <li key={index}>{miembro}</li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}

export default App;