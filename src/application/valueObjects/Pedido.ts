import { v4 as uuidv4 } from 'uuid';
import { Status } from '../../domain/models/Pedido';

export default class Pedido {
  id: string;
  cliente_cpf?: string;
  data_pedido?: Date;
  status: Status;

  constructor(cliente_cpf?: string, data_pedido?: Date) {
    this.id = uuidv4();
    this.cliente_cpf = cliente_cpf;
    this.data_pedido = data_pedido;
    this.status = Status.Recebido;
  }
}
