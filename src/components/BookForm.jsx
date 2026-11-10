import { useState } from 'react';
export function BookForm({ onAddBook }) {
  const [book, setBook] = useState({ name: '', isbn: '', author: '', editorial: '' });
  const submit = (event) => { event.preventDefault(); if (Object.values(book).some(value => !value.trim())) return; onAddBook({ id: crypto.randomUUID(), ...Object.fromEntries(Object.entries(book).map(([key, value]) => [key, value.trim()])) }); setBook({ name: '', isbn: '', author: '', editorial: '' }); };
  const fields = [['name', 'Nombre'], ['isbn', 'ISBN'], ['author', 'Autor'], ['editorial', 'Editorial']];
  return <form onSubmit={submit}>{fields.map(([name, label]) => <label key={name}>{label}<input required name={name} value={book[name]} onChange={event => setBook({ ...book, [name]: event.target.value })} /></label>)}<button>Apilar libro</button></form>;
}
