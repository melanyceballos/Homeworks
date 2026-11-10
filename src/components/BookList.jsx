export function BookList({ books, onPopBook }) {
  return <section><h3>Libros · tope primero · {books.length}</h3><button onClick={onPopBook} disabled={!books.length}>Retirar libro (pop)</button>{books.length ? <ol>{books.map((book, index) => <li key={book.id}><strong>{book.name}</strong> — {book.author} · ISBN {book.isbn} · {book.editorial}{index === 0 ? ' (tope)' : ''}</li>)}</ol> : <p>La pila está vacía.</p>}</section>;
}
