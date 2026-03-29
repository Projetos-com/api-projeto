import express from "express";
import { tarefas, gerarNovoId } from "./dados.js";

console.log("Arquivo server.js foi executado");

const app = express();
const PORTA = 3000;

app.use(express.json());



app.get("/tarefas", (req, res) => {
  return res.status(200).json(tarefas);
});



app.post("/tarefas", (req, res) => {
  const { titulo } = req.body;

  if (!titulo || titulo.trim() === "") {
    return res.status(400).json({
      erro: "Título é obrigatório."
    });
  }

  const novaTarefa = {
    id: gerarNovoId(),
    titulo: titulo,
    concluida: false
  };

  tarefas.push(novaTarefa);

  return res.status(201).json(novaTarefa);
});



app.put("/tarefas/:id", (req, res) => {
  const { id } = req.params;
  const { titulo, concluida } = req.body;

  const tarefa = tarefas.find(t => t.id == id);

  if (!tarefa) {
    return res.status(404).json({
      erro: "Tarefa não encontrada"
    });
  }

  if (titulo !== undefined) {
    if (titulo.trim() === "") {
      return res.status(400).json({
        erro: "Título não pode ser vazio"
      });
    }
    tarefa.titulo = titulo;
  }

  if (concluida !== undefined) {
    tarefa.concluida = concluida;
  }

  return res.status(200).json(tarefa);
});



app.delete("/tarefas/:id", (req, res) => {
  const { id } = req.params;

  const index = tarefas.findIndex(t => t.id == id);

  if (index === -1) {
    return res.status(404).json({
      erro: "Tarefa não encontrada"
    });
  }

  tarefas.splice(index, 1);

  return res.status(200).json({
    mensagem: "Tarefa removida com sucesso"
  });
});



app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});