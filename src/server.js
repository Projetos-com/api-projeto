console.log("Arquivo server.js foi executado");

import express from "express";
import { tarefas, gerarNovoId } from "./dados.js";

const app = express();
const PORTA = 3000;

// Permite receber JSON
app.use(express.json());


// ======================
// ROTA GET - LISTAR
// ======================
app.get("/tarefas", (req, res) => {
  return res.status(200).json(tarefas);
});


// ======================
// ROTA POST - CRIAR
// ======================
app.post("/tarefas", (req, res) => {
  const { titulo } = req.body;

  // Validação
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


// Inicia o servidor
app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});