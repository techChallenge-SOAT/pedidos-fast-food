import { BuscarItemPorIDUseCase } from "../BuscarItemPorIDUseCase";
import { ItemRepository } from "../../../../adapters/postgres/item/ItemRepository";

jest.mock("../../../../adapters/postgres/item/ItemRepository");

describe("BuscarItemPorIDUseCase", () => {
  it("should call ItemRepository.buscarPorId with correct id", async () => {
    const mockBuscarPorId = jest.fn();
    (ItemRepository.buscarPorId as jest.Mock) = mockBuscarPorId;

    const id = "123e4567-e89b-12d3-a456-426614174000"; // UUID válido
    await BuscarItemPorIDUseCase.execute(id);

    expect(mockBuscarPorId).toHaveBeenCalledWith(id);
  });

  it("should return null if item is not found", async () => {
    const mockBuscarPorId = jest.fn().mockReturnValue(null);
    (ItemRepository.buscarPorId as jest.Mock) = mockBuscarPorId;

    const id = "123e4567-e89b-12d3-a456-426614174000"; // UUID válido
    const result = await BuscarItemPorIDUseCase.execute(id);

    expect(result).toBeNull();
  });
});
