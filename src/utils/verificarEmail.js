const knex = require("../bancodedados/conexao");

async function verificarEmail(email) {
  console.log("email", email);
  const usuarioEmailExiste = await knex
    .select()
    .table("usuarios")
    .where({ email });

  if (usuarioEmailExiste.length) {
    return usuarioEmailExiste;
  }
  return false;
}

module.exports = verificarEmail;
