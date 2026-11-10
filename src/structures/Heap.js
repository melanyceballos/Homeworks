export class MinHeap {
  constructor(compare = (a, b) => a.popularity - b.popularity) { this.items = []; this.compare = compare; }
  size() { return this.items.length; }
  peek() { return this.items[0] ?? null; }
  swap(a, b) { [this.items[a], this.items[b]] = [this.items[b], this.items[a]]; }
  push(value) { this.items.push(value); this.percolateUp(this.items.length - 1); return this; }
  pop() { if (!this.items.length) return null; const min = this.items[0], last = this.items.pop(); if (this.items.length) { this.items[0] = last; this.percolateDown(0); } return min; }
  percolateUp(index) { while (index > 0) { const parent = Math.floor((index - 1) / 2); if (this.compare(this.items[index], this.items[parent]) >= 0) break; this.swap(index, parent); index = parent; } }
  percolateDown(index) { for (;;) { let smallest = index, left = 2 * index + 1, right = left + 1; if (left < this.size() && this.compare(this.items[left], this.items[smallest]) < 0) smallest = left; if (right < this.size() && this.compare(this.items[right], this.items[smallest]) < 0) smallest = right; if (smallest === index) return; this.swap(index, smallest); index = smallest; } }
  heapify(values) { this.items = [...values]; for (let i = Math.floor(this.items.length / 2) - 1; i >= 0; i--) this.percolateDown(i); return this; }
  toArray() { return [...this.items]; }
}
export function searchTopK(trie, prefix, k) { const count = Math.max(0, Math.floor(Number(k) || 0)); if (!count) return []; const heap = new MinHeap(); for (const product of trie.getWordsWithPrefix(prefix)) { heap.push(product); if (heap.size() > count) heap.pop(); } const results = []; while (heap.size()) results.push(heap.pop()); return results.reverse(); }
