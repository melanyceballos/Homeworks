import React, { useState } from 'react';
import { NaryTree, NaryTreeNode } from './structures/NaryTree';
import { Sidebar } from './components/Sidebar';

const InicioComponent = () => <div><h4>Página de Inicio</h4><p>Bienvenido al sistema.</p></div>;
const PerfilComponent = () => <div><h4>Perfil de Usuario</h4><p>Detalles del perfil.</p></div>;
const AjustesComponent = () => <div><h4>Ajustes</h4><p>Configuración general.</p></div>;
const ReportesComponent = () => <div><h4>Reportes</h4><p>Métricas y estadísticas.</p></div>;

export default function App() {
  const [menuTree] = useState(() => {
    const tree = new NaryTree('Menú Principal');

    const inicio = tree.root.addChild(new NaryTreeNode('Inicio', '/inicio', InicioComponent));
    const usuario = tree.root.addChild(new NaryTreeNode('Usuario', '/usuario'));
    usuario.addChild(new NaryTreeNode('Mi Perfil', '/usuario/perfil', PerfilComponent));
    usuario.addChild(new NaryTreeNode('Ajustes', '/usuario/ajustes', AjustesComponent));

    const admin = tree.root.addChild(new NaryTreeNode('Administración', '/admin'));
    admin.addChild(new NaryTreeNode('Reportes', '/admin/reportes', ReportesComponent));

    return tree;
  });

  const [selectedNode, setSelectedNode] = useState(() => menuTree.root.children[0]);

  const SelectedComponent = selectedNode?.component || (() => <p>Seleccione una opción válida.</p>);

  return (
    <div style={{ display: 'flex', fontFamily: 'Arial' }}>
      <Sidebar tree={menuTree} onSelect={(node) => setSelectedNode(node)} />
      <main style={{ padding: '20px', flex: 1 }}>
        <h2>Menú basado en Árbol N-ario (Challenge 9)</h2>
        <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '6px' }}>
          <SelectedComponent />
        </div>
      </main>
    </div>
  );
}