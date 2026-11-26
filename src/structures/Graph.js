export class Graph {
  constructor() {
    this.nodes = [];
    this.adjacency = {};
  }

  addNode(node) {
    if (this.searchNode(node.id)) return false;
    this.nodes.push(node);
    this.adjacency[node.id] = [];
    return true;
  }

  searchNode(idOrTitle) {
    return this.nodes.find((node) => node.id === idOrTitle || node.title === idOrTitle) ?? null;
  }

  addEdge(firstId, secondId) {
    if (!this.searchNode(firstId) || !this.searchNode(secondId) || firstId === secondId) return false;
    if (!this.adjacency[firstId].includes(secondId)) this.adjacency[firstId].push(secondId);
    if (!this.adjacency[secondId].includes(firstId)) this.adjacency[secondId].push(firstId);
    return true;
  }

  getNeighbors(id) {
    return (this.adjacency[id] ?? []).map((neighborId) => this.searchNode(neighborId)).filter(Boolean);
  }

  printAdjacency(id) {
    return `${this.searchNode(id)?.title ?? id} → ${this.getNeighbors(id).map((node) => node.title).join(', ')}`;
  }

  printGraph() {
    return this.nodes.map((node) => ({ ...node, neighbors: this.getNeighbors(node.id) }));
  }
}
