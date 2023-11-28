require("dotenv").config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const knex = require("../bancodedados/conexao");
const verificarEmail = require("../utils/verificarEmail");

async function cadastrarUsuario(req, res) {
  const { nome, email, senha } = req.body;
  try {
    if (!nome || !email || !senha) {
      return res
        .status(400)
        .json({ mensagem: "Todos os campos precisam ser preenchidos" });
    }

    if (await verificarEmail(email)) {
      return res.status(400).json({ mensagem: "O email já está em uso" });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 6);

    await knex("usuarios").insert({ nome, email, senha: senhaCriptografada });

    return res.status(201).json();
  } catch (error) {
    return res
      .status(500)
      .json({ mensagem: "Erro no servidor " + error.message });
  }
}

async function login(req, res) {
  const { email, senha } = req.body;

  try {
    if (!email || !senha) {
      return res
        .status(400)
        .json({ mensagem: "Todos os campos precisam ser preenchidos" });
    }
    const usuario = await verificarEmail(email);
    if (!usuario) {
      return res.status(400).json({ mensagem: "Email ou senha Incorreto" });
    }

    const senhaConfere = await bcrypt.compare(senha, usuario[0].senha);

    if (!senhaConfere) {
      return res.status(401).json({ mensagem: "Não autorizado" });
    }

    const token = jwt.sign({ id: usuario[0].id }, process.env.PASSWORD_JWT, {
      expiresIn: "8h",
    });
    // const { senha: _, ...usuarioLogado } = usuario[0];
    const usuarioLogado = {
      id: usuario[0].id,
      nome: usuario[0].nome,
      email: usuario[0].email,
    };

    return res.status(200).json({ usuario: usuarioLogado, token });
  } catch (error) {
    return res
      .status(500)
      .json({ mensagem: "Erro no servidor " + error.message });
  }
}

async function detalharUsuario(req, res) {
  try {
    if (!req.usuario) {
      return res.status(400).json({ mensagem: "Usuario não encontrado" });
    }
    const usuario = await knex
      .select("id", "nome", "email")
      .table("usuarios")
      .where({ id: req.usuario });
    return res.status(200).json({ usuario });
  } catch (error) {
    return res
      .status(500)
      .json({ mensagem: "Erro no servidor " + error.message });
  }
}

module.exports = {
  cadastrarUsuario,
  login,
  detalharUsuario,
};
