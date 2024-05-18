import { BuscarItensUseCase } from '../BuscarItensUseCase';
import { ItemRepository } from '../../../../adapters/postgres/item/ItemRepository';

jest.mock('../../../../adapters/postgres/item/ItemRepository');

describe('BuscarItensUseCase', () => {
  it('should call ItemRepository.buscarTodos', async () => {
    const mockBuscarTodos = jest.fn();
    (ItemRepository.buscarTodos as jest.Mock) = mockBuscarTodos;

    await BuscarItensUseCase.execute();

    expect(mockBuscarTodos).toHaveBeenCalled();
  });
});