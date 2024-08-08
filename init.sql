CREATE TABLE itens (
  id UUID PRIMARY KEY,
  categoria VARCHAR(255) NOT NULL,
  nome VARCHAR(255) NOT NULL,
  descricao VARCHAR(255) NOT NULL,
  preco_unitario DECIMAL NOT NULL
);

CREATE TYPE status_pedido AS ENUM ('recebido', 'pago', 'em preparação', 'cancelado', 'pronto', 'finalizado');

CREATE TABLE pedidos (
  id UUID PRIMARY KEY,
  cliente_cpf VARCHAR(11),
  data_pedido TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
status status_pedido NOT NULL DEFAULT 'recebido'
);

CREATE TABLE pedidos_itens (
  pedido_id UUID NOT NULL,
  item_id UUID NOT NULL,
  quantidade INTEGER NOT NULL,
  PRIMARY KEY (pedido_id, item_id),
  FOREIGN KEY (pedido_id) REFERENCES pedidos (id),
  FOREIGN KEY (item_id) REFERENCES itens (id)
);

-- Inserir um item na tabela "itens"
INSERT INTO itens (id, categoria, nome, descricao, preco_unitario)
VALUES ('21d0a7d2-88ad-4d98-81d0-2fab0ce8ede8', 'Lanche', 'Hambúrguer com Queijo', 'Delicioso hambúrguer grelhado com queijo derretido', 39.99);

-- Inserir um pedido na tabela "pedidos"
INSERT INTO pedidos (id, cliente_cpf, data_pedido, status)
VALUES ('371a1359-37fe-468c-9f36-b2509fed34e7', '11122233300', CURRENT_TIMESTAMP, 'recebido');

-- Inserir um item de pedido na tabela "pedidos_itens"
INSERT INTO pedidos_itens (pedido_id, item_id, quantidade)
VALUES ('371a1359-37fe-468c-9f36-b2509fed34e7', '21d0a7d2-88ad-4d98-81d0-2fab0ce8ede8', 2);