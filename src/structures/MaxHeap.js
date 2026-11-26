export class MaxHeap {
  constructor(compare = (a, b) => a.popularity - b.popularity) {
    this.items = [];
    this.compare = compare;
  }

  size() { return this.items.length; }
  peek() { return this.items[0] ?? null; }
  toArray() { return [...this.items]; }

  swap(first, second) {
    [this.items[first], this.items[second]] = [this.items[second], this.items[first]];
  }

  push(value) {
    this.items.push(value);
    this.percolateUp(this.items.length - 1);
    return this;
  }

  pop() {
    if (!this.items.length) return null;
    const maximum = this.items[0];
    const last = this.items.pop();
    if (this.items.length) {
      this.items[0] = last;
      this.percolateDown(0);
    }
    return maximum;
  }

  percolateUp(index) {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.compare(this.items[index], this.items[parent]) <= 0) break;
      this.swap(index, parent);
      index = parent;
    }
  }

  percolateDown(index) {
    while (true) {
      let largest = index;
      const left = index * 2 + 1;
      const right = left + 1;
      if (left < this.size() && this.compare(this.items[left], this.items[largest]) > 0) largest = left;
      if (right < this.size() && this.compare(this.items[right], this.items[largest]) > 0) largest = right;
      if (largest === index) return;
      this.swap(index, largest);
      index = largest;
    }
  }

  heapify(values) {
    this.items = [...values];
    for (let index = Math.floor(this.items.length / 2) - 1; index >= 0; index -= 1) this.percolateDown(index);
    return this;
  }
}

export function getTopSongs(songs, count = 5) {
  const heap = new MaxHeap().heapify(songs);
  const top = [];
  while (heap.size() && top.length < count) top.push(heap.pop());
  return top;
}
