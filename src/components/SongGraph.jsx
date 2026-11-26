import { useMemo } from 'react';
import { Graph } from '../structures/Graph';
import { Cover } from './SongRow';

const positions = [
  [56, 34], [81, 28], [80, 70], [55, 76], [31, 68], [20, 42], [34, 22],
];

export default function SongGraph({ songs, connections, selectedId, onSelect }) {
  const graph = useMemo(() => {
    const value = new Graph();
    songs.forEach((song) => value.addNode(song));
    connections.forEach(([from, to]) => value.addEdge(from, to));
    return value;
  }, [songs, connections]);
  const related = graph.getNeighbors(selectedId);
  const visibleNodes = [graph.searchNode(selectedId), ...related].filter(Boolean).slice(0, 7);
  const coordinates = new Map(visibleNodes.map((song, index) => [song.id, positions[index]]));
  const visibleEdges = graph.getNeighbors(selectedId).filter((song) => coordinates.has(song.id));

  return (
    <div className="graph-layout">
      <div className="graph-canvas" role="img" aria-label={`Grafo de canciones relacionadas con ${graph.searchNode(selectedId)?.title ?? 'la canción seleccionada'}`}>
        <svg className="graph-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {visibleEdges.map((song) => <line key={song.id} x1={coordinates.get(selectedId)?.[0]} y1={coordinates.get(selectedId)?.[1]} x2={coordinates.get(song.id)?.[0]} y2={coordinates.get(song.id)?.[1]} />)}
          {visibleEdges.map((song, index) => graph.getNeighbors(song.id).filter((neighbor) => neighbor.id !== selectedId && coordinates.has(neighbor.id) && visibleEdges.findIndex((candidate) => candidate.id === neighbor.id) > index).map((neighbor) => <line key={`${song.id}-${neighbor.id}`} x1={coordinates.get(song.id)[0]} y1={coordinates.get(song.id)[1]} x2={coordinates.get(neighbor.id)[0]} y2={coordinates.get(neighbor.id)[1]} className="secondary-edge" />))}
        </svg>
        {visibleNodes.map((song) => {
          const [left, top] = coordinates.get(song.id);
          return <button key={song.id} className={`graph-node ${song.id === selectedId ? 'is-selected' : ''}`} style={{ left: `${left}%`, top: `${top}%` }} onClick={() => onSelect(song)} aria-label={`Ver recomendaciones de ${song.title}`}><Cover song={song} /><span>{song.title}</span></button>;
        })}
      </div>
      <div className="graph-legend"><span><i className="legend-dot current" /> Seleccionada</span><span><i className="legend-dot related" /> Conectada en el grafo</span></div>
    </div>
  );
}
