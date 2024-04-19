import { PedidoRepository } from '../../../adapters/postgres/pedido/PedidoRepository';

export class BuscarUltimosPedidosUseCase {
  static async execute() {
    return PedidoRepository.buscarUltimos();
  }
}
