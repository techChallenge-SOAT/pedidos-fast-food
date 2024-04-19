import { ItemRepository } from '../../../adapters/postgres/item/ItemRepository';

export class BuscarItensUseCase {
  static async execute() {
    return ItemRepository.buscarTodos();
  }
}
