import { useContext } from 'react'; import { AuthContext } from '../context/AuthContext';
export function BooksPage() { const { user } = useContext(AuthContext); return <section><h2>Biblioteca privada</h2><p>Sesión de {user.email}. Acceso autenticado.</p><p>Cien años de soledad · El principito</p></section>; }
