import { PedidoRepository } from '../../../adapters/postgres/pedido/PedidoRepository';
import { Status } from '../../../domain/models/Pedido';
//TODO: renomear esse use case pra ser menos verboso
export class BuscarStatusDoPagamentoDoPedidoUseCase {
  static async execute(id_pedido: string) {
    const statusAtual = await PedidoRepository.obterStatus(id_pedido);

    if (statusAtual === Status.Recebido) {
      return { status: 'Aguardando Pagamento' };
    }

    if (statusAtual !== Status.Cancelado) {
      return { status: 'Pago' };
    }

    return { status: 'Cancelado' };
  }
}
