export class FileNode {
  constructor(id, name, type, createdBy) {
    this.id = id || Date.now().toString();
    this.name = name;
    this.type = type; 
    this.createdBy = createdBy; 
    
    this.children = type === 'folder' ? [] : null;
  }

  addChild(node) {
    if (this.type !== 'folder') {
      throw new Error('Un archivo no puede contener carpetas ni otros archivos.');
    }
    this.children.push(node);
  }
}

export class FileTree {
  constructor() {
    this.root = new FileNode('root', 'Unidad Principal', 'folder', 'sistema@app.com');
  }

  findNode(nodeId, current = this.root) {
    if (!current) return null;
    if (current.id === nodeId) return current;

    if (current.type === 'folder' && Array.isArray(current.children)) {
      for (const child of current.children) {
        const found = this.findNode(nodeId, child);
        if (found) return found;
      }
    }
    return null;
  }

  addNode(parentId, name, type, createdBy) {
    const parent = this.findNode(parentId);

    if (!parent) {
      throw new Error('El nodo padre especificado no existe.');
    }

    if (parent.type !== 'folder') {
      throw new Error('Solo se pueden crear elementos dentro de una carpeta.');
    }

    const newNode = new FileNode(Date.now().toString(), name, type, createdBy);
    parent.addChild(newNode);
    return newNode;
  }

  deleteNode(nodeId, current = this.root) {
    if (!current || current.type !== 'folder' || !current.children) return false;

    const index = current.children.findIndex((child) => child.id === nodeId);
    if (index !== -1) {
      current.children.splice(index, 1);
      return true;
    }

    for (const child of current.children) {
      if (child.type === 'folder') {
        const deleted = this.deleteNode(nodeId, child);
        if (deleted) return true;
      }
    }
    return false;
  }

  toJSON() {
    return JSON.parse(JSON.stringify(this.root));
  }

  static fromJSON(data) {
    const tree = new FileTree();
    if (data) {
      tree.root = FileTree.reconstructNode(data);
    }
    return tree;
  }

  static reconstructNode(data) {
    const node = new FileNode(data.id, data.name, data.type, data.createdBy);
    if (data.type === 'folder' && Array.isArray(data.children)) {
      node.children = data.children.map((childData) => FileTree.reconstructNode(childData));
    } else {
      node.children = null;
    }
    return node;
  }
}