create database minhas_financas;

create table usuarios(
	id serial primary key,
  nome text not null,
  email text not null,
  senha text not null
);

create table transacoes(
	id serial primary key,
  descricao text not null,
  valor integer not null,
  tipo text not null

alter table transacoes add column usuario_id integer;

ALTER TABLE transacoes
ADD CONSTRAINT usuario_transacao FOREIGN KEY (usuario_id) REFERENCES usuarios(id);

