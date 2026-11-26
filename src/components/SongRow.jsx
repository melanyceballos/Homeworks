import { Heart, Play } from 'lucide-react';

export function Cover({ song, className = '' }) {
  return <div className={`album-cover ${song.cover} ${className}`} aria-label={`Portada de ${song.album}`}><span>{song.symbol}</span></div>;
}

export default function SongRow({ song, index, active, isFavorite, onPlay, onFavorite, showPopularity = false }) {
  return (
    <div className={`song-row ${active ? 'is-playing' : ''}`}>
      <div className="song-index"><span>{String(index + 1).padStart(2, '0')}</span><button className="row-play" aria-label={`Reproducir ${song.title}`} onClick={() => onPlay(song)}><Play size={15} fill="currentColor" /></button></div>
      <Cover song={song} className="row-cover" />
      <div className="track-main"><strong>{song.title}</strong><span>{song.artist}</span></div>
      <span className="track-album">{song.album}</span>
      {showPopularity && <span className="popularity-score">{song.popularity}<small> pts</small></span>}
      <button className={`favorite-button ${isFavorite ? 'is-favorite' : ''}`} aria-label={isFavorite ? `Quitar ${song.title} de favoritas` : `Añadir ${song.title} a favoritas`} onClick={() => onFavorite(song.id)}><Heart size={17} fill={isFavorite ? 'currentColor' : 'none'} /></button>
      <span className="track-duration">{song.duration}</span>
    </div>
  );
}
