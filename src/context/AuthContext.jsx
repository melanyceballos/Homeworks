import { createContext, useState } from 'react';
export const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => { try { return JSON.parse(localStorage.getItem('demo-user')); } catch { return null; } });
  const login = (email, password) => { if (email.trim().toLowerCase() !== 'user@mail.com' || password !== '123') return false; const next = { email: 'user@mail.com', name: 'Usuario de demostración' }; setUser(next); localStorage.setItem('demo-user', JSON.stringify(next)); return true; };
  const logout = () => { setUser(null); localStorage.removeItem('demo-user'); };
  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}
