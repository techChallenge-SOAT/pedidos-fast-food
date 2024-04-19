import { ItemRepository } from '../../../adapters/postgres/item/ItemRepository';

export class BuscarItemPorIDUseCase {
  static async execute(id: string) {
    return ItemRepository.buscarPorId(id);
  }
}
