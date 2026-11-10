export class Node { constructor(value) { this.value = value; this.next = null; } }
export class LinkedList { constructor() { this.head = null; this.tail = null; this.length = 0; } append(value) { const node = new Node(value); if (!this.head) this.head = this.tail = node; else { this.tail.next = node; this.tail = node; } this.length++; return node; } }
export class DoublyNode { constructor(value) { this.value = value; this.next = null; this.prev = null; } }
export class DoublyLinkedList {
  constructor() { this.head = null; this.tail = null; this.current = null; this.length = 0; }
  visit(value) { const node = new DoublyNode(value); if (!this.current) this.head = this.tail = this.current = node; else { let discarded = this.current.next; while (discarded) { const next = discarded.next; discarded.prev = discarded.next = null; this.length--; discarded = next; } node.prev = this.current; this.current.next = node; this.current = this.tail = node; } this.length++; return node; }
  goBack() { if (this.current?.prev) this.current = this.current.prev; return this.current?.value ?? null; }
  goForward() { if (this.current?.next) this.current = this.current.next; return this.current?.value ?? null; }
}
