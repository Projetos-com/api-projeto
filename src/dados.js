export const tarefas = [
  { id: 1, titulo: "Estudar Node", concluida: false },
  { id: 2, titulo: "Fazer telas no Figma", concluida: true }
];

export function gerarNovoId() {
  if (tarefas.length === 0) return 1;
  return tarefas[tarefas.length - 1].id + 1;
}