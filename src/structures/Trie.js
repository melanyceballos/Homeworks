const normalize = value => String(value).trim().toLocaleLowerCase('es').replace(/\s+/g, ' ');
export class TrieNode { constructor() { this.children = new Map(); this.isEndOfWord = false; this.product = null; } }
export class Trie { constructor() { this.root = new TrieNode(); }
  insert(name, popularity) { const clean = String(name).trim().replace(/\s+/g, ' '); const score = Number(popularity); if (!clean || !Number.isFinite(score)) throw new TypeError('Producto y popularidad válida son requeridos.'); let node = this.root; for (const char of normalize(clean)) { if (!node.children.has(char)) node.children.set(char, new TrieNode()); node = node.children.get(char); } node.isEndOfWord = true; node.product = { name: clean, popularity: score }; return node.product; }
  search(name) { let node = this.root; for (const char of normalize(name)) { node = node.children.get(char); if (!node) return null; } return node.isEndOfWord ? node.product : null; }
  startsWith(prefix) { if (!normalize(prefix)) return false; let node = this.root; for (const char of normalize(prefix)) { node = node.children.get(char); if (!node) return false; } return true; }
  getWordsWithPrefix(prefix) { const key = normalize(prefix); if (!key) return []; let node = this.root; for (const char of key) { node = node.children.get(char); if (!node) return []; } const out = []; const collect = current => { if (current.isEndOfWord) out.push(current.product); for (const child of current.children.values()) collect(child); }; collect(node); return out; }
}
