import React, { useState } from 'react';
import { LinkedList, DoublyLinkedList } from './structures/LinkedLists';

export default function App() {
  const [vista, setVista] = useState('reproductor');

  const [reproductor] = useState(() => {
    const lista = new LinkedList();
    lista.append({ id: 1, titulo: 'in & out', artista: 'red velvet' });
    lista.append({ id: 2, titulo: 'Good Day', artista: 'IU' });
    lista.append({ id: 3, titulo: 'Hit em', artista: 'MEOVV' });
    return lista;
  });
  const [nodoActualCancion, setNodoActualCancion] = useState(reproductor.head);

  const [historial] = useState(() => {
    const dlist = new DoublyLinkedList();
    dlist.visit('https://google.com');
    dlist.visit('https://github.com');
    dlist.visit('https://react.dev');
    return dlist;
  });
  const [paginaActual, setPaginaActual] = useState(historial.current ? historial.current.value : '');

  const siguienteCancion = () => {
    if (nodoActualCancion && nodoActualCancion.next) {
      setNodoActualCancion(nodoActualCancion.next);
    }
  };

  const irAtras = () => {
    const url = historial.goBack();
    if (url) setPaginaActual(url);
  };

  const irAdelante = () => {
    const url = historial.goForward();
    if (url) setPaginaActual(url);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '30px auto', fontFamily: 'Arial' }}>
      <nav style={{ marginBottom: '20px' }}>
        <button onClick={() => setVista('reproductor')} style={{ marginRight: '10px' }}>Vista 1: Reproductor</button>
        <button onClick={() => setVista('historial')}>Vista 2: Navegador Web</button>
      </nav>

      {vista === 'reproductor' ? (
        <div style={{ padding: '15px', border: '1px solid #aaa', borderRadius: '8px' }}>
          <h3> Reproductor de Música (Lista Simplemente Enlazada)</h3>
          {nodoActualCancion ? (
            <div>
              <p><strong>Reproduciendo:</strong> {nodoActualCancion.value.titulo} - {nodoActualCancion.value.artista}</p>
              <button onClick={siguienteCancion} disabled={!nodoActualCancion.next}>
                Siguiente Canción 
              </button>
            </div>
          ) : <p>Fin de la lista</p>}
        </div>
      ) : (
        <div style={{ padding: '15px', border: '1px solid #aaa', borderRadius: '8px' }}>
          <h3> Historial Web (Lista Doblemente Enlazada)</h3>
          <p><strong>URL Actual:</strong> {paginaActual}</p>
          <button onClick={irAtras} disabled={!historial.current || !historial.current.prev} style={{ marginRight: '10px' }}>
            ⬅ Atrás
          </button>
          <button onClick={irAdelante} disabled={!historial.current || !historial.current.next}>
            Adelante 
          </button>
        </div>
      )}
    </div>
  );
}