const normalize = (value) => String(value ?? '').trim().toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, ' ');

export class TrieNode {
  constructor() {
    this.character = null;
    this.children = new Map();
    this.isEndOfWord = false;
    this.song = null;
  }
}

export class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(song) {
    const key = normalize(song.title);
    if (!key) throw new TypeError('La canción debe tener un título.');
    let node = this.root;
    for (const character of key) {
      if (!node.children.has(character)) {
        const child = new TrieNode();
        child.character = character;
        node.children.set(character, child);
      }
      node = node.children.get(character);
    }
    node.isEndOfWord = true;
    node.song = song;
    return song;
  }

  #findNode(value) {
    let node = this.root;
    for (const character of normalize(value)) {
      node = node.children.get(character);
      if (!node) return null;
    }
    return node;
  }

  search(title) {
    const node = this.#findNode(title);
    return node?.isEndOfWord ? node.song : null;
  }

  startsWith(prefix) {
    return Boolean(normalize(prefix)) && Boolean(this.#findNode(prefix));
  }

  getWordsWithPrefix(prefix) {
    const key = normalize(prefix);
    if (!key) return [];
    const start = this.#findNode(key);
    if (!start) return [];
    const songs = [];
    const collect = (node) => {
      if (node.isEndOfWord) songs.push(node.song);
      for (const child of node.children.values()) collect(child);
    };
    collect(start);
    return songs;
  }
}
