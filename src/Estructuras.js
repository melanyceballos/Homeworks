export class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

export class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
    } else {
      this.tail.next = newNode;
    }
    this.tail = newNode;
    this.length++;
  }

  removeFirst() {
    if (!this.head) return null;
    const value = this.head.value;
    this.head = this.head.next;
    if (!this.head) {
        this.tail = null;
    }
    this.length--;
    return value;
  }
  
  toArray() {
    let current = this.head;
    let result = [];
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    return result;
  }
}

export class DoubleNode {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null; 
  }
}

export class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value) {
    const newNode = new DoubleNode(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      return;
    }
    this.tail.next = newNode;
    newNode.prev = this.tail;
    this.tail = newNode;
    this.length++;
  }
  
  toArray() {
    let current = this.head;
    let result = [];
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    return result;
  }
}

export class CircularLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.current = null; 
  }

  append(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      newNode.next = this.head;
      this.current = this.head;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
      this.tail.next = this.head; 
    }
  }

  nextTurn() {
    if (this.current) {
      this.current = this.current.next;
    }
    return this.current ? this.current.value : null;
  }
}

export class CircularDoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value) {
    const newNode = new DoubleNode(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      newNode.next = this.head;
      newNode.prev = this.tail;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      
      this.tail = newNode;
      
      this.tail.next = this.head;
      this.head.prev = this.tail;
    }
    this.length++;
  }

  toArray() {
    if (!this.head) return [];
    
    let current = this.head;
    let result = [];
    
    do {
      result.push(current.value);
      current = current.next;
    } while (current !== this.head);
    
    return result;
  }
}