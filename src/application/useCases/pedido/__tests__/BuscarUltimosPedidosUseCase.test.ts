import { BuscarUltimosPedidosUseCase } from '../BuscarUltimosPedidosUseCase';
import { PedidoRepository } from '../../../../adapters/postgres/pedido/PedidoRepository';

const buscarUltimosMock = jest.fn();

PedidoRepository.buscarUltimos = buscarUltimosMock;

describe('BuscarUltimosPedidosUseCase', () => {
  it('should return the last orders', async () => {
    const pedidos = [
      { id: '123e4567-e89b-12d3-a456-426614174000', status: 'Recebido' },
      { id: '123e4567-e89b-12d3-a456-426614174001', status: 'Pago' },
    ];
    buscarUltimosMock.mockResolvedValue(pedidos);

    const result = await BuscarUltimosPedidosUseCase.execute();

    expect(result).toEqual(pedidos);
  });
});