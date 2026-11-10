export class QueueNode { constructor(value) { this.value = value; this.next = null; } }
export class Queue {
  constructor() { this.front = null; this.rear = null; this.length = 0; }
  enqueue(value) { const node = new QueueNode(value); const timestamp = Date.parse(value?.arrivalAt); if (Number.isFinite(timestamp) && this.front && Number.isFinite(Date.parse(this.front.value?.arrivalAt)) && timestamp < Date.parse(this.front.value.arrivalAt)) { node.next = this.front; this.front = node; } else if (Number.isFinite(timestamp) && this.front && Number.isFinite(Date.parse(this.rear.value?.arrivalAt))) { let current = this.front; while (current.next && Date.parse(current.next.value.arrivalAt) <= timestamp) current = current.next; node.next = current.next; current.next = node; if (!node.next) this.rear = node; } else { if (this.rear) this.rear.next = node; else this.front = node; this.rear = node; } this.length++; return value; }
  dequeue() { if (this.isEmpty()) return null; const value = this.front.value; this.front = this.front.next; this.length--; if (!this.front) this.rear = null; return value; }
  peek() { return this.front?.value ?? null; }
  isEmpty() { return this.length === 0; }
  size() { return this.length; }
  toArray() { const values = []; for (let node = this.front; node; node = node.next) values.push(node.value); return values; }
  print() { return this.toArray(); }
}
