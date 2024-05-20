import { PedidoRepository } from '../../../adapters/postgres/pedido/PedidoRepository';
import { Status } from '../../../domain/models/Pedido';
import { ProducaoFastFoodService } from '../../../adapters/services/producao-fast-food/ProducaoFastFoodService';

export class AlterarStatusDoPedidoUseCase {
  static async execute(id_pedido: string, status: Status) {
    if (!Object.values(Status).includes(status)) {
      throw new Error(`Status inválido ${status}`);
    }

    const pedidoAtual = await PedidoRepository.buscarPorId(id_pedido);
    if (!pedidoAtual) {
      throw new Error('Pedido não encontrado');
    }

    if (pedidoAtual.status !== Status.Recebido && status === Status.Pago) {
      throw new Error('Somente status "Recebido" pode ser atualizado para "Pago"');
    }

    const resultado = await PedidoRepository.atualizarStatus(id_pedido, status);

    if (status === Status.Pago) {
      await ProducaoFastFoodService.notificarProducao(pedidoAtual);
    }

    return resultado;
  }
}