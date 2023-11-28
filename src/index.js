require("dotenv").config();

const express = require("express");
const cors = require("cors");
const rotas = require("./rotas");

const app = express();

app.use(cors());
app.use(express.json());

app.use(rotas);

const porta = process.env.PORT || 3000;

app.listen(porta, () => {
  console.log("Servidor rodando na porta " + porta);
});
