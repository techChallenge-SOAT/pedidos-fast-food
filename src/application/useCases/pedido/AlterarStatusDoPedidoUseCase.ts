import { PedidoRepository } from '../../../adapters/postgres/pedido/PedidoRepository';
import { Status } from '../../../domain/models/Pedido';
import { ProducaoFastFoodService } from '../../../adapters/services/producao-fast-food/ProducaoFastFoodService';

export class AlterarStatusDoPedidoUseCase {
  static async execute(id_pedido: string, status: Status) {
    const statusAtual = await PedidoRepository.obterStatus(id_pedido);

    if (statusAtual !== Status.Recebido || status !== Status.Pago) {
      throw new Error(
        'Somente status "Recebido" pode ser atualizado para "Pago"',
      );
    }

    if (!Object.values(Status).includes(status)) {
      throw new Error('Status inválido');
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
