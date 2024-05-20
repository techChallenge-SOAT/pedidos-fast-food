import { PedidoRepository } from '../../../adapters/postgres/pedido/PedidoRepository';
import { Status } from '../../../domain/models/Pedido';
import { ProducaoFastFoodService } from '../../../adapters/services/producao-fast-food/ProducaoFastFoodService';

export class AlterarStatusDoPedidoUseCase {
  static async execute(id_pedido: string, status: Status) {
    if (!Object.values(Status).includes(status)) {
      throw new Error(`Status inválido ${status}`);
    }

    const resultado = await PedidoRepository.atualizarStatus(id_pedido, status);

    if (status === Status.Pago) {
      const pedido = await PedidoRepository.buscarPorId(id_pedido);
      if (!pedido) {
        throw new Error('Pedido não encontrado');
      }
      await ProducaoFastFoodService.notificarProducao(pedido);
    }

    return resultado;
  }
}
