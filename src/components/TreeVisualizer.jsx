import Tree from 'react-d3-tree';
export function TreeVisualizer({ data }) { return <div style={{ width: '100%', height: 420, border: '1px solid #ddd' }}>{data ? <Tree data={[data]} orientation="vertical" translate={{ x: 350, y: 60 }} /> : <p>Árbol vacío</p>}</div>; }
