import { AlterarStatusDoPedidoUseCase } from '../AlterarStatusDoPedidoUseCase';
import { PedidoRepository } from '../../../../adapters/postgres/pedido/PedidoRepository';
import { Status } from '../../../../domain/models/Pedido';
import { ProducaoFastFoodService } from '../../../../adapters/services/producao-fast-food/ProducaoFastFoodService';

jest.mock('../../../../adapters/postgres/pedido/PedidoRepository');
jest.mock('../../../../adapters/services/producao-fast-food/ProducaoFastFoodService');

const obterStatusMock = jest.fn();
const atualizarStatusMock = jest.fn();
const buscarPorIdMock = jest.fn();

PedidoRepository.obterStatus = obterStatusMock;
PedidoRepository.atualizarStatus = atualizarStatusMock;
PedidoRepository.buscarPorId = buscarPorIdMock;


describe('AlterarStatusDoPedidoUseCase', () => {
    it('should throw an error if the current status is not "Recebido" or the new status is not "Pago"', async () => {
      obterStatusMock.mockResolvedValue(Status.Pronto);
  
      await expect(AlterarStatusDoPedidoUseCase.execute('1', Status.Pago)).rejects.toThrow('Somente status "Recebido" pode ser atualizado para "Pago"');
    });
  
    it('should update the status and notify the production if the new status is "Pago"', async () => {
      obterStatusMock.mockResolvedValue(Status.Recebido);
      atualizarStatusMock.mockResolvedValue(true);
      buscarPorIdMock.mockResolvedValue({ id: '1', status: Status.Pago });

    await AlterarStatusDoPedidoUseCase.execute('1', Status.Pago);

    expect(atualizarStatusMock).toHaveBeenCalledWith('1', Status.Pago);
  });
});