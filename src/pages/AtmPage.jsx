import { useContext } from 'react'; import { AuthContext } from '../context/AuthContext';
export function AtmPage() { const { user } = useContext(AuthContext); return <section><h2>Panel del cajero</h2><p>Acceso autorizado para {user.email}.</p></section>; }
