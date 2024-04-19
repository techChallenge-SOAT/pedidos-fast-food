import { v4 as uuidv4 } from 'uuid';

export default class Item {
  id: string;
  categoria: string;
  nome: string;
  descricao: string;
  preco_unitario: number;

  constructor(
    categoria: string,
    nome: string,
    descricao: string,
    preco_unitario: number,
  ) {
    this.id = uuidv4();
    this.categoria = categoria;
    this.nome = nome;
    this.descricao = descricao;
    this.preco_unitario = preco_unitario;
  }
}
