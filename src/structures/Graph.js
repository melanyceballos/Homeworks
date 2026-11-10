const normalize = value => String(value).trim().toLocaleLowerCase('es');
export class Graph {
  constructor() { this.nodes = new Map(); this.adjacency = new Map(); }
  addNode(node) { if (!node?.id || !['person', 'city'].includes(node.type)) throw new TypeError('Cada nodo requiere id y tipo person/city.'); if (this.nodes.has(node.id)) return false; this.nodes.set(node.id, { ...node }); this.adjacency.set(node.id, new Set()); return true; }
  addCity(name) { const clean = name.trim(); if (!clean) throw new TypeError('La ciudad requiere un nombre.'); const key = `city:${normalize(clean)}`; this.addNode({ id: key, type: 'city', name: clean }); return key; }
  addPerson(name, age, cityName) { const clean = name.trim(); if (!clean || !Number.isInteger(Number(age)) || Number(age) < 0) throw new TypeError('Nombre y edad válida son obligatorios.'); const cityId = this.addCity(cityName); const id = `person:${normalize(clean)}:${this.nodes.size}`; this.addNode({ id, type: 'person', name: clean, age: Number(age), cityId }); this.addEdge(id, cityId); return id; }
  searchNode(query) { if (this.nodes.has(query)) return this.nodes.get(query); const q = normalize(query); return [...this.nodes.values()].find(node => normalize(node.name) === q) ?? null; }
  addEdge(from, to) { if (!this.nodes.has(from) || !this.nodes.has(to)) return false; this.adjacency.get(from).add(to); this.adjacency.get(to).add(from); return true; }
  isEmpty() { return this.nodes.size === 0; }
  removeNode(id) { const node = this.nodes.get(id); if (!node) return false; for (const neighbor of this.adjacency.get(id)) { this.adjacency.get(neighbor).delete(id); if (node.type === 'city' && this.nodes.get(neighbor)?.type === 'person') this.nodes.get(neighbor).cityId = null; } this.adjacency.delete(id); this.nodes.delete(id); return true; }
  printAdjacency(id) { return this.adjacency.has(id) ? [...this.adjacency.get(id)].map(key => this.nodes.get(key)) : []; }
  peopleInCity(cityName) { const city = this.searchNode(cityName); if (!city || city.type !== 'city') return []; return this.printAdjacency(city.id).filter(node => node.type === 'person'); }
  print() { return [...this.nodes.values()].map(node => ({ ...node, neighbors: [...this.adjacency.get(node.id)] })); }
  toD3Graph() { return { nodes: [...this.nodes.values()].map(({ id, type, name }) => ({ id, name, type, color: type === 'person' ? '#2563eb' : '#f59e0b' })), links: [...this.adjacency].flatMap(([from, tos]) => [...tos].filter(to => from < to).map(to => ({ source: from, target: to }))) }; }
  cities() { return [...this.nodes.values()].filter(node => node.type === 'city'); }
}
