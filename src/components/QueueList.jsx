export function QueueList({ queueItems, onDequeuePerson }) {
  return <section><h3>Turnos FIFO · {queueItems.length}</h3><button onClick={onDequeuePerson} disabled={!queueItems.length}>Atender siguiente</button>{queueItems.length ? <ol>{queueItems.map((person, index) => <li key={person.id}><strong>{person.name}</strong> — ${person.amount} · Llegada: {person.arrivalDate}{index === 0 ? ' (siguiente)' : ''}</li>)}</ol> : <p>La fila está vacía.</p>}</section>;
}
