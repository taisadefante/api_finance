const knex = require("../bancodedados/conexao");

async function cadastrarTransacao(req, res) {
  const { descricao, valor, tipo } = req.body;
  try {
    if (!descricao || !valor || !tipo) {
      return res.status(400).json({ mensagem: "Verifique os campos" });
    }

    await knex("transacoes").insert({
      descricao,
      valor,
      tipo,
      usuario_id: req.usuario,
    });
    return res.status(201).json();
  } catch (error) {
    return res
      .status(500)
      .json({ mensagem: "Erro no servidor " + error.message });
  }
}
async function listarTransacoes(req, res) {
  try {
    const transacoes = await knex("transacoes").where({
      usuario_id: req.usuario,
    });
    return res.status(200).json({ transacoes });
  } catch (error) {
    return res
      .status(500)
      .json({ mensagem: "Erro no servidor " + error.message });
  }
}

async function alterarTransacao(req, res) {
  const { descricao, valor, tipo } = req.body;
  const { id } = req.params;
  try {
    if (!descricao || !valor || !tipo) {
      return res.status(400).json({ mensagem: "Verifique os campos" });
    }

    const transacao = await knex("transacoes").where({
      id,
      usuario_id: req.usuario,
    });

    if (!transacao.length) {
      return res.status(400).json({ mensagem: "Transação não encontrada" });
    }
    await knex("transacoes")
      .update({
        descricao,
        valor,
        tipo,
      })
      .where({ id, usuario_id: req.usuario });
    return res.status(200).json();
  } catch (error) {
    return res
      .status(500)
      .json({ mensagem: "Erro no servidor " + error.message });
  }
}

async function deletarTransacao(req, res) {
  const { id } = req.params;
  try {
    const transacao = await knex("transacoes").where({
      id,
      usuario_id: req.usuario,
    });

    if (!transacao.length) {
      return res.status(400).json({ mensagem: "Transação não encontrada" });
    }
    await knex("transacoes").delete().where({ id, usuario_id: req.usuario });

    return res.status(200).json();
  } catch (error) {
    return res
      .status(500)
      .json({ mensagem: "Erro no servidor " + error.message });
  }
}

module.exports = {
  cadastrarTransacao,
  listarTransacoes,
  alterarTransacao,
  deletarTransacao,
};
