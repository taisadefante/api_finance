# Minhas finanças

## Banco de Dados - ok


usuarios
id - sequencial e unico
nome - texto
email - unico
senha - criptografar

transacoes
id - sequencial e unico
descricao
valor - numero em centavos (10,00 \* 100 = 1000)
tipo - entrada ou saida

## Rotas


POST /usuarios - cadastrar usuario - ok
POST /login - realizar login do usuario gerar token com jwt - ok

### Toda as rotas abaixo devem estar autenticadas



- autenticar usuario
  => usuarios - ok
  GET /usuarios - detalhar usuario


=> transações
GET /transacao => lista todas as transações
POST /transacao => cadastra uma transação

=> transações - ok
GET /transacao => lista todas as transações - ok
POST /transacao => cadastra uma transação - ok
PUT /transacao/:id => altera uma transação
DELETE /transacao/:id => deleta uma transação
