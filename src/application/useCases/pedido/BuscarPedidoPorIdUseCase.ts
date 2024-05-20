import { PedidoRepository } from '../../../adapters/postgres/pedido/PedidoRepository';

export class BuscarPedidoPorIdUseCase {
  static async execute(id: string) {
    const pedido = await PedidoRepository.buscarPorId(id);
    if (!pedido) {
      throw new Error('Pedido não encontrado');
    }
    return pedido;
  }
}
