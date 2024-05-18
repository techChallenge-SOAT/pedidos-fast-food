import Pedido from '../../../application/valueObjects/Pedido';
import { ItemRepository } from '../../../adapters/postgres/item/ItemRepository';
import { PedidoRepository } from '../../../adapters/postgres/pedido/PedidoRepository';
import PedidoItem from '../../../application/valueObjects/PedidoItem';
import { PagamentoFastFoodService } from '../../../adapters/services/pagamento-fast-food/PagamentoFastFoodService';

export class CriarPedidoUseCase {
  async execute(pedido: Pedido, itens: PedidoItem[]) {
    const valid_itens = await Promise.all(
      itens.map(async ({ item_id, quantidade }) => {
        const item = await ItemRepository.buscarPorId(item_id);
        if (!item) {
          throw new Error('Item não encontrado');
        }
        return { item, quantidade };
      }),
    );

    const pedido_recebido = await PedidoRepository.criar(pedido);
    
    await Promise.all(
      valid_itens.map(async ({ item, quantidade }) => {
        return PedidoRepository.adicionarItem(
          pedido_recebido,
          item,
          quantidade,
        );
      }),
    );

    const valor_total = valid_itens.reduce((total, { item, quantidade }) => total + item.preco_unitario * quantidade, 0);
    await PagamentoFastFoodService.efetuarPagamento(pedido_recebido.id, valor_total);

    return pedido_recebido;
  }
}
