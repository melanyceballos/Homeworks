import { Disc3, Headphones, Heart, Home, Library, ListMusic, Plus, Radio, Search, Sparkles } from 'lucide-react';

const mainLinks = [
  { label: 'Inicio', icon: Home },
  { label: 'Explorar', icon: Search },
  { label: 'Novedades', icon: Sparkles },
];

export default function Sidebar({ active, onNavigate, playlists, onPlaylist, favoritesCount }) {
  return (
    <aside className="sidebar">
      <a className="brand" href="#inicio" onClick={() => onNavigate('Inicio')}><span className="brand-mark"><Headphones size={19} /></span><span>sonora<span className="brand-dot">.</span></span></a>
      <nav className="side-nav" aria-label="Navegación principal">
        {mainLinks.map(({ label, icon: Icon }) => <button key={label} className={`nav-link ${active === label ? 'is-active' : ''}`} onClick={() => onNavigate(label)}><Icon size={19} /><span>{label}</span></button>)}
      </nav>
      <div className="sidebar-divider" />
      <div className="library-heading"><span><Library size={18} /> Tu biblioteca</span><button className="icon-button" aria-label="Crear playlist"><Plus size={18} /></button></div>
      <nav className="playlist-nav" aria-label="Biblioteca">
        <button className="nav-link" onClick={() => onNavigate('Favoritos')}><Heart size={18} /><span>Tus favoritas</span><small>{favoritesCount}</small></button>
        {playlists.map((playlist) => <button key={playlist} className={`nav-link ${active === playlist ? 'is-active' : ''}`} onClick={() => onPlaylist(playlist)}><ListMusic size={18} /><span>{playlist}</span></button>)}
      </nav>
      <div className="sidebar-note"><div className="note-icon"><Radio size={17} /></div><p>Un espacio para descubrir algo nuevo.</p><span>Tu música, a tu manera.</span></div>
      <div className="sidebar-foot"><Disc3 size={16} /><span>PARCIAL 3 · ESTRUCTURAS II</span></div>
    </aside>
  );
}
