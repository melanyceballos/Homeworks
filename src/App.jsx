import { useState } from 'react';

export function esParOImparRegular(numero) {
  if (typeof numero !== 'number' || !Number.isFinite(numero)) throw new TypeError('Ingrese un número válido.');
  return numero % 2 === 0 ? 'PAR' : 'IMPAR';
}
export const esParOImparArrow = (numero) => {
  if (typeof numero !== 'number' || !Number.isFinite(numero)) throw new TypeError('Ingrese un número válido.');
  return numero % 2 === 0 ? 'PAR' : 'IMPAR';
};
export default function App() {
  const [entrada, setEntrada] = useState('');
  const [resultado, setResultado] = useState('');
  const revisar = (e) => { e.preventDefault(); const n = Number(entrada); if (entrada.trim() === '' || !Number.isFinite(n)) { setResultado('Ingrese un número válido.'); return; } setResultado(`Regular: ${esParOImparRegular(n)} · Arrow: ${esParOImparArrow(n)}`); };
  return <main><h1>¿Par o impar?</h1><form onSubmit={revisar}><label>Número <input type="number" step="any" value={entrada} onChange={e => setEntrada(e.target.value)} /></label><button>Comprobar</button></form><p role="status">{resultado}</p></main>;
}
