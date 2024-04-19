import { PedidoRepository } from '../../../adapters/postgres/pedido/PedidoRepository';

export class BuscarPedidoPorIdUseCase {
  static async execute(id: string) {
    return PedidoRepository.buscarPorId(id);
  }
}
