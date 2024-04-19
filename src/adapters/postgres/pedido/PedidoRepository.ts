import { Op, Sequelize } from 'sequelize';
import {
  Item as ItemModel,
  Pedido as PedidoModel,
} from '../models/PedidoItemModels';
import Pedido from '../../../application/valueObjects/Pedido';
import { v4 as uuidv4 } from 'uuid';

export class PedidoRepository {
  static async criar(pedido: Pedido) {
    const id = uuidv4();
    return await PedidoModel.create({
      id,
      cliente_cpf: pedido.cliente_cpf,
      status: 'recebido',
    });
  }

  static async buscarPorId(id: string) {
    return PedidoModel.findByPk(id, {
      include: [{ model: ItemModel, as: 'itens' }],
    });
  }

  static async adicionarItem(
    pedido: PedidoModel,
    item: ItemModel,
    quantidade: number,
  ) {
    if (quantidade <= 0) {
      throw new Error('Quantidade inválida');
    }
    return pedido.addIten(item, { through: { quantidade } });
  }

  static async atualizarStatus(id: string, status: string) {
    return PedidoModel.update({ status: status }, { where: { id: id } });
  }

  static async buscarUltimos() {
    return await PedidoModel.findAll({
      where: {
        status: {
          [Op.not]: 'Finalizado',
        },
      },
      limit: 10,
      order: [
        Sequelize.literal(`
      CASE
        WHEN status = 'pronto' THEN 1
        WHEN status = 'em preparação' THEN 2
        WHEN status = 'recebido' THEN 3
        ELSE 4
      END
      `),
        ['createdAt', 'ASC'],
      ],
      include: [
        {
          model: ItemModel,
          as: 'itens',
          through: { attributes: ['quantidade'] },
        },
      ],
    });
  }

  static async obterStatus(id: string): Promise<string | null> {
    try {
      const pedido = await PedidoModel.findByPk(id);
      return pedido ? pedido.status : null;
    } catch (error) {
      throw new Error(`Erro ao buscar status do pedido: ${error}`);
    }
  }
}
