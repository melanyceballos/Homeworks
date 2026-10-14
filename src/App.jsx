import React, { useState } from 'react';
import { Stack } from './structures/Stack';
import { BookForm } from './components/BookForm';
import { BookList } from './components/BookList';

export default function App() {
  const [stackInstance] = useState(() => {
    const s = new Stack();
    s.push({ id: 1, name: 'Cien años de soledad', isbn: '978-0307474728', author: 'Gabriel García Márquez', editorial: 'Sudamericana' });
    s.push({ id: 2, name: 'El señor de los anillos', isbn: '978-8445071410', author: 'J.R.R. Tolkien', editorial: 'Minotauro' });
    return s;
  });

  const [books, setBooks] = useState(() => stackInstance.toArray());

  const handleAddBook = (book) => {
    stackInstance.push(book);
    setBooks(stackInstance.toArray());
  };

  const handlePopBook = () => {
    stackInstance.pop();
    setBooks(stackInstance.toArray());
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'Arial' }}>
      <h2>Gestión de Pila de Libros (Challenge 4)</h2>
      <BookForm onAddBook={handleAddBook} />
      <BookList books={books} onPopBook={handlePopBook} />
    </div>
  );
}