import React, { useState } from 'react';
import { Queue } from './structures/Queue';
import { PersonForm } from './components/PersonForm';
import { QueueList } from './components/QueueList';

export default function App() {
  const [queueInstance] = useState(() => {
    const q = new Queue();
    const carlosArrival = new Date(Date.now() - 1800000).toISOString();
    const anaArrival = new Date(Date.now() - 900000).toISOString();
    q.enqueue({ id: 1, name: 'Carlos Pérez', amount: 250000, arrivalAt: carlosArrival, arrivalDate: new Date(carlosArrival).toLocaleString() });
    q.enqueue({ id: 2, name: 'Ana Gómez', amount: 500000, arrivalAt: anaArrival, arrivalDate: new Date(anaArrival).toLocaleString() });
    return q;
  });

  const [queueItems, setQueueItems] = useState(() => queueInstance.toArray());

  const handleEnqueuePerson = (person) => {
    queueInstance.enqueue(person);
    setQueueItems(queueInstance.toArray());
  };

  const handleDequeuePerson = () => {
    queueInstance.dequeue();
    setQueueItems(queueInstance.toArray());
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'Arial' }}>
      <h2>Simulación Cajero Automático (Challenge 5)</h2>
      <PersonForm onEnqueuePerson={handleEnqueuePerson} />
      <QueueList queueItems={queueItems} onDequeuePerson={handleDequeuePerson} />
    </div>
  );
}
