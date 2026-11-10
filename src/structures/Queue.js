export class QueueNode { constructor(value) { this.value = value; this.next = null; } }
export class Queue {
  constructor() { this.front = null; this.rear = null; this.length = 0; }
  enqueue(value) { const node = new QueueNode(value); if (this.rear) this.rear.next = node; else this.front = node; this.rear = node; this.length++; return value; }
  dequeue() { if (this.isEmpty()) return null; const value = this.front.value; this.front = this.front.next; this.length--; if (!this.front) this.rear = null; return value; }
  peek() { return this.front?.value ?? null; }
  isEmpty() { return this.length === 0; }
  size() { return this.length; }
  toArray() { const values = []; for (let node = this.front; node; node = node.next) values.push(node.value); return values; }
}
