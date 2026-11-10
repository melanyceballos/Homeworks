const numbers = [4, 1, 7, 2, 9];
const objectList = [{ name: 'Ana', tags: ['estudiante'] }];
const shallowCopy = [...objectList];
const deepCopy = structuredClone(objectList);
// Spread only copies the outer array. Nested objects are still shared (shallow copy).
// structuredClone copies supported nested values too; spread is not a deep-copy method.
shallowCopy[0].tags.push('copia superficial');

const examples = [
  ['Recorrer · forEach', numbers, numbers.forEach(() => {}) ?? 'Recorre cada elemento; no crea otro arreglo.'],
  ['Transformar · map', numbers, numbers.map(n => n * 2)],
  ['Filtrar · filter', numbers, numbers.filter(n => n > 4)],
  ['Buscar · find / includes', numbers, { find: numbers.find(n => n > 4), includes7: numbers.includes(7) }],
  ['Comprobar · some / every', numbers, { someEven: numbers.some(n => n % 2 === 0), allPositive: numbers.every(n => n > 0) }],
  ['Reducir · reduce', numbers, numbers.reduce((sum, n) => sum + n, 0)],
  ['Agregar y eliminar · push / pop', [1, 2], (() => { const copy = [1, 2]; copy.push(3); const removed = copy.pop(); return { final: copy, removed }; })()],
  ['Ordenar · sort', numbers, [...numbers].sort((a, b) => a - b)],
  ['Copiar y combinar · slice / spread / concat', numbers, { copy: numbers.slice(), combined: [...numbers, ...[10, 11]], concat: numbers.concat([12]) }],
  ['Shallow vs deep copy', objectList, { shallowSharesNested: shallowCopy[0].tags === objectList[0].tags, deepSharesNested: deepCopy[0].tags === objectList[0].tags }],
];
export function ArrayMethods() { return <section><h2>Homework · Métodos de arrays</h2>{examples.map(([title, input, output]) => <article key={title}><h3>{title}</h3><p>Entrada: <code>{JSON.stringify(input)}</code></p><p>Resultado: <code>{typeof output === 'string' ? output : JSON.stringify(output)}</code></p></article>)}</section>; }
