require("dotenv").config();

const jwt = require("jsonwebtoken");
async function autenticar(req, res, next) {
  const { authorization } = req.headers;

  try {
    if (!authorization) {
      return res.status(400).json({ mensagem: "Token Invalido" });
    }

    const token = authorization.replace("Bearer ", "");

    if (!token) {
      return res.status(400).json({ mensagem: "Token Invalido" });
    }

    const tokenValido = jwt.verify(token, process.env.PASSWORD_JWT);

    req.usuario = tokenValido.id;

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ mensagem: "Erro no servidor " + error.message });
  }
}

module.exports = autenticar;
