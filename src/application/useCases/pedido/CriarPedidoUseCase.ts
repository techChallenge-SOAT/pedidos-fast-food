import Pedido from '../../../application/valueObjects/Pedido';
import { ItemRepository } from '../../../adapters/postgres/item/ItemRepository';
import { PedidoRepository } from '../../../adapters/postgres/pedido/PedidoRepository';
import PedidoItem from '../../../application/valueObjects/PedidoItem';

export class CriarPedidoUseCase {
  static async execute(pedido: Pedido, itens: PedidoItem[]) {
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
    return pedido_recebido;
  }
}
