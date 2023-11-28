const express = require("express");
const {
  cadastrarUsuario,
  login,
  detalharUsuario,
} = require("./controladores/usuarios");
const {
  cadastrarTransacao,
  listarTransacoes,
  alterarTransacao,
  deletarTransacao,
} = require("./controladores/transacoes");
const autenticar = require("./intermediarios/autenticar");

const rotas = express();

// liberada
rotas.post("/usuarios", cadastrarUsuario);
rotas.post("/login", login);

// precisa de autenticação
rotas.use(autenticar);

rotas.get("/usuarios", detalharUsuario);

rotas.post("/transacao", cadastrarTransacao);
rotas.get("/transacao", listarTransacoes);
rotas.put("/transacao/:id", alterarTransacao);
rotas.delete("/transacao/:id", deletarTransacao);

module.exports = rotas;
