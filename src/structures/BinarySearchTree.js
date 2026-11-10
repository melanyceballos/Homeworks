export class TreeNode { constructor(value) { this.value = value; this.left = null; this.right = null; } }
export class BinarySearchTree {
  constructor() { this.root = null; this.size = 0; }
  insert(value) { if (!Number.isFinite(value)) throw new TypeError('El valor debe ser numérico.'); const node = new TreeNode(value); if (!this.root) { this.root = node; this.size++; return true; } let current = this.root; while (true) { if (value === current.value) return false; const side = value < current.value ? 'left' : 'right'; if (!current[side]) { current[side] = node; this.size++; return true; } current = current[side]; } }
  search(value) { let current = this.root; while (current) { if (value === current.value) return current; current = value < current.value ? current.left : current.right; } return null; }
  inOrder() { const out = []; const walk = node => { if (!node) return; walk(node.left); out.push(node.value); walk(node.right); }; walk(this.root); return out; }
  preOrder() { const out = []; const walk = node => { if (!node) return; out.push(node.value); walk(node.left); walk(node.right); }; walk(this.root); return out; }
  postOrder() { const out = []; const walk = node => { if (!node) return; walk(node.left); walk(node.right); out.push(node.value); }; walk(this.root); return out; }
  toD3() { const convert = node => node ? { name: String(node.value), children: [node.left, node.right].filter(Boolean).map(convert) } : null; return convert(this.root); }
}
