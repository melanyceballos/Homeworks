import { useEffect, useMemo, useState } from 'react';
import { ArrowDownWideNarrow, ArrowRight, AudioLines, ChevronDown, CircleHelp, Clock3, Disc3, Headphones, ListFilter, Music2, Pause, Play, Search, SlidersHorizontal, Sparkles, Volume2 } from 'lucide-react';
import Sidebar from './components/Sidebar';
import SongRow, { Cover } from './components/SongRow';
import SongGraph from './components/SongGraph';
import { connections, songs } from './data/songs';
import { MaxHeap } from './structures/MaxHeap';
import { Trie } from './structures/Trie';
import './styles/main.scss';

const genres = ['Todo', 'Urbano', 'Pop', 'Alternativa'];
const playlists = ['Para concentrarte', 'Tarde tranquila', 'Ritmo latino'];
const playlistGenre = { 'Para concentrarte': 'Alternativa', 'Tarde tranquila': 'Pop', 'Ritmo latino': 'Urbano' };

function getSavedFavorites() {
  try { return JSON.parse(localStorage.getItem('sonora-favorites') ?? '[]'); }
  catch { return []; }
}

export default function App() {
  const trie = useMemo(() => {
    const index = new Trie();
    songs.forEach((song) => index.insert(song));
    return index;
  }, []);
  const [query, setQuery] = useState('');
  const [activeNav, setActiveNav] = useState('Inicio');
  const [activeGenre, setActiveGenre] = useState('Todo');
  const [playingId, setPlayingId] = useState(null);
  const [selectedSongId, setSelectedSongId] = useState(songs[0]?.id ?? '');
  const [favorites, setFavorites] = useState(getSavedFavorites);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    localStorage.setItem('sonora-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const suggestions = query.trim() ? trie.getWordsWithPrefix(query) : [];
  const ranking = useMemo(() => {
    const heap = new MaxHeap().heapify(songs);
    const result = [];
    while (heap.size() && result.length < 5) result.push(heap.pop());
    return result;
  }, []);

  const selectedSong = songs.find((song) => song.id === selectedSongId) ?? songs[0];
  const currentSongId = selectedSong?.id ?? '';
  const recommendationGraph = useMemo(() => {
    const adjacency = Object.fromEntries(songs.map((song) => [song.id, []]));
    connections.forEach(([from, to]) => { adjacency[from].push(to); adjacency[to].push(from); });
    return adjacency;
  }, []);
  const recommendations = (recommendationGraph[currentSongId] ?? []).map((id) => songs.find((song) => song.id === id)).filter(Boolean);

  let visibleSongs = songs;
  let sectionTitle = activeNav === 'Favoritos' ? 'Tus canciones favoritas' : activeNav === 'Novedades' ? 'Lo más escuchado' : activeNav === 'Explorar' ? 'Explora el catálogo' : playlists.includes(activeNav) ? activeNav : 'Canciones para ti';
  if (activeNav === 'Favoritos') visibleSongs = songs.filter((song) => favorites.includes(song.id));
  else if (playlists.includes(activeNav)) visibleSongs = songs.filter((song) => song.genre === playlistGenre[activeNav]);
  else if (activeNav === 'Novedades') visibleSongs = ranking;
  if (activeGenre !== 'Todo') visibleSongs = visibleSongs.filter((song) => song.genre === activeGenre);
  if (query.trim()) {
    const matched = new Set(suggestions.map((song) => song.id));
    visibleSongs = songs.filter((song) => matched.has(song.id));
    sectionTitle = suggestions.length ? `Resultados para “${query}”` : 'No encontramos esa canción';
  }
  const shownSongs = showAll ? visibleSongs : visibleSongs.slice(0, 6);

  function playSong(song) {
    setPlayingId((current) => current === song.id ? null : song.id);
    setSelectedSongId(song.id);
  }

  function toggleFavorite(id) {
    setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  function navigate(label) {
    setActiveNav(label);
    setActiveGenre('Todo');
    setQuery('');
    setShowAll(false);
  }

  function searchFor(song) {
    setQuery(song.title);
    setSelectedSongId(song.id);
  }

  return (
    <div className="app-shell">
      <Sidebar active={activeNav} onNavigate={navigate} playlists={playlists} onPlaylist={navigate} favoritesCount={favorites.length} />
      <main className="main-content" id="inicio">
        <header className="topbar">
          <div className="breadcrumb"><span>Tu espacio</span><span className="breadcrumb-slash">/</span><strong>{activeNav}</strong></div>
          <div className="topbar-actions"><button className="help-button" aria-label="Ayuda"><CircleHelp size={17} /></button><button className="profile-button"><span className="avatar">MC</span><span>Melany</span><ChevronDown size={15} /></button></div>
        </header>

        <section className="welcome-banner">
          <div className="welcome-copy"><span className="eyebrow"><Sparkles size={13} /> TU BANDA SONORA DE HOY</span><h1>Hola, Melany.<br /><em>¿Qué quieres escuchar?</em></h1><p>Encuentra algo nuevo o vuelve a tu canción favorita.</p></div>
          <div className="banner-art" aria-hidden="true"><div className="art-disc"><div className="disc-center"><AudioLines size={32} /></div></div><span className="art-spark art-spark-one">✳</span><span className="art-spark art-spark-two">✦</span><span className="art-orbit" /></div>
          <div className="banner-caption"><span>SONIDO EN MOVIMIENTO</span><AudioLines size={16} /></div>
        </section>

        <section className="search-section" aria-label="Buscador de canciones">
          <div className="search-wrap"><Search size={20} /><input value={query} onChange={(event) => { setQuery(event.target.value); setShowAll(false); }} placeholder="Busca una canción, artista o título..." aria-label="Buscar canción por título" /><kbd>⌘ K</kbd>{query && <button className="clear-search" onClick={() => setQuery('')} aria-label="Limpiar búsqueda">×</button>}</div>
          {query.trim() && <div className="suggestion-panel"><div className="suggestion-heading">{suggestions.length ? 'SUGERENCIAS DEL TRIE' : 'SIN SUGERENCIAS'}<span>{suggestions.length} {suggestions.length === 1 ? 'canción' : 'canciones'}</span></div>{suggestions.slice(0, 5).map((song) => <button className="suggestion-item" key={song.id} onClick={() => searchFor(song)}><Cover song={song} className="suggestion-cover" /><span><strong>{song.title}</strong><small>{song.artist}</small></span><ArrowRight size={16} /></button>)}</div>}
        </section>

        <div className="content-grid">
          <div className="primary-column">
            <section className="music-section">
              <div className="section-heading"><div><span className="section-kicker"><Music2 size={14} /> TU MÚSICA</span><h2>{sectionTitle}</h2></div><button className="text-link" onClick={() => setShowAll((value) => !value)}>{showAll ? 'Ver menos' : 'Ver todas'} <ArrowRight size={15} /></button></div>
              {!query.trim() && activeNav !== 'Favoritos' && !playlists.includes(activeNav) && <div className="filter-row"><div className="genre-filters" aria-label="Filtrar por género">{genres.map((genre) => <button key={genre} onClick={() => setActiveGenre(genre)} className={`filter-chip ${activeGenre === genre ? 'is-selected' : ''}`}>{genre}</button>)}</div><button className="filter-options"><SlidersHorizontal size={15} /> Filtros <ChevronDown size={13} /></button></div>}
              {shownSongs.length ? <div className="song-table"><div className="table-labels"><span>#</span><span>TÍTULO</span><span>ÁLBUM</span><span><Clock3 size={14} /></span></div>{shownSongs.map((song, index) => <SongRow key={song.id} song={song} index={index} active={playingId === song.id} isFavorite={favorites.includes(song.id)} onPlay={playSong} onFavorite={toggleFavorite} />)}</div> : <div className="empty-state"><Headphones size={26} /><strong>{activeNav === 'Favoritos' ? 'Aún no guardas canciones' : 'Prueba otra búsqueda'}</strong><span>{activeNav === 'Favoritos' ? 'Usa el corazón junto a una canción para guardarla aquí.' : 'Escribe el comienzo de un título para ver sugerencias.'}</span></div>}
            </section>

            <section className="recommendation-section">
              <div className="section-heading"><div><span className="section-kicker"><Sparkles size={14} /> CONEXIONES MUSICALES</span><h2>Si te gusta <em>{selectedSong.title}</em></h2></div><span className="graph-badge">GRAFO NO DIRIGIDO</span></div>
              <div className="recommendation-card"><div className="recommendation-info"><p>Las canciones se conectan por afinidad de estilo. Elige un nodo para explorar su vecindad.</p><div className="related-list">{recommendations.slice(0, 3).map((song) => <button key={song.id} onClick={() => { setSelectedSongId(song.id); setPlayingId(song.id); }}><span className="related-dot" /><span>{song.title}</span><small>{song.artist}</small></button>)}</div></div><SongGraph songs={songs} connections={connections} selectedId={currentSongId} onSelect={(song) => setSelectedSongId(song.id)} /></div>
            </section>
          </div>

          <aside className="discovery-column">
            <section className="ranking-card"><div className="ranking-heading"><div><span className="section-kicker"><ArrowDownWideNarrow size={14} /> RANKING EN VIVO</span><h2>Top canciones</h2></div><span className="top-five">TOP 5</span></div><p className="ranking-caption">Lo que más está sonando ahora.</p><div className="ranking-list">{ranking.map((song, index) => <button className="ranking-item" key={song.id} onClick={() => playSong(song)}><span className={`rank-number ${index === 0 ? 'rank-first' : ''}`}>{String(index + 1).padStart(2, '0')}</span><Cover song={song} className="rank-cover" /><span className="rank-info"><strong>{song.title}</strong><small>{song.artist}</small></span><span className="rank-score">{song.popularity}<small> ♥</small></span></button>)}</div><div className="heap-note"><span className="heap-icon"><ListFilter size={14} /></span><span>Ordenado con <strong>Max Heap</strong></span><i /></div></section>
            <section className="now-playing-card"><div className="mini-heading"><span>EN REPRODUCCIÓN</span><Volume2 size={15} /></div><div className="now-cover-wrap"><Cover song={selectedSong} className="now-cover" /><span className="cover-eq"><i /><i /><i /><i /><i /></span></div><div className="now-track"><div><strong>{selectedSong.title}</strong><span>{selectedSong.artist}</span></div><button className={`now-favorite ${favorites.includes(selectedSong.id) ? 'is-favorite' : ''}`} aria-label="Alternar favorita" onClick={() => toggleFavorite(selectedSong.id)}><HeartIcon filled={favorites.includes(selectedSong.id)} /></button></div><div className="player-progress"><span /><i /></div><div className="player-times"><span>1:24</span><span>{selectedSong.duration}</span></div><div className="player-controls"><span /><button className="big-play" aria-label={playingId === selectedSong.id ? 'Pausar' : 'Reproducir'} onClick={() => playSong(selectedSong)}>{playingId === selectedSong.id ? <Pause size={19} fill="currentColor" /> : <Play size={19} fill="currentColor" />}</button><span /></div></section>
            <div className="tip-card"><span className="tip-icon"><Disc3 size={17} /></span><div><strong>Dato sonoro</strong><p>Tu buscador recorre un Trie letra por letra para encontrar canciones al instante.</p></div></div>
          </aside>
        </div>
        <footer className="page-footer"><span>SONORA <i>·</i> APRENDER ESCUCHANDO</span><span>Hecho con ♡ y estructuras de datos</span></footer>
      </main>
      <footer className="mobile-player"><div className="mobile-now"><Cover song={selectedSong} className="mobile-cover" /><span><strong>{selectedSong.title}</strong><small>{selectedSong.artist}</small></span></div><button aria-label={playingId === selectedSong.id ? 'Pausar' : 'Reproducir'} onClick={() => playSong(selectedSong)}>{playingId === selectedSong.id ? <Pause size={20} /> : <Play size={20} fill="currentColor" />}</button></footer>
    </div>
  );
}

function HeartIcon({ filled }) {
  return <span className={filled ? 'heart-symbol is-favorite' : 'heart-symbol'}>♥</span>;
}
