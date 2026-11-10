export class NaryTreeNode {
  constructor(title, link = null, component = null) { if (!title) throw new TypeError('El título es obligatorio.'); this.title = title; this.link = link; this.component = component; this.children = []; this.parent = null; }
  addChild(child) { if (!(child instanceof NaryTreeNode)) throw new TypeError('El hijo debe ser un NaryTreeNode.'); child.parent = this; this.children.push(child); return child; }
}
export class NaryTree { constructor(title = 'Menú') { this.root = new NaryTreeNode(title); } find(title) { const walk = node => node.title === title ? node : node.children.map(walk).find(Boolean) || null; return walk(this.root); } }
