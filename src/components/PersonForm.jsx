import React, { useState } from 'react';

export const PersonForm = ({ onEnqueuePerson }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !amount.trim()) return;

    const randomOffset = Math.floor(Math.random() * 3600000);
    const arrivalDate = new Date(Date.now() - randomOffset).toLocaleString();

    onEnqueuePerson({
      id: Date.now(),
      name,
      amount: parseFloat(amount),
      arrivalDate
    });

    setName('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Nombre del cliente"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: '6px', flex: 1 }}
      />
      <input
        type="number"
        placeholder="Monto a retirar"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ padding: '6px', flex: 1 }}
      />
      <button type="submit" style={{ padding: '6px 12px', cursor: 'pointer', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px' }}>
        Unirse a la Cola
      </button>
    </form>
  );
};