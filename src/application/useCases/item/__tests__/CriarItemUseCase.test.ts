import { CriarItemUseCase } from "../CriarItemUseCase";
import { ItemRepository } from "../../../../adapters/postgres/item/ItemRepository";
import Item from "../../../valueObjects/Item";

jest.mock("../../../../adapters/postgres/item/ItemRepository");

describe("CriarItemUseCase", () => {
  it("should call ItemRepository.criar with correct parameters", async () => {
    const mockCriar = jest.fn();
    const mockBuscarPorNome = jest.fn().mockResolvedValue(null);
    (ItemRepository.criar as jest.Mock) = mockCriar;
    (ItemRepository.buscarPorNome as jest.Mock) = mockBuscarPorNome;

    const categoria = "teste categoria";
    const nome = "teste nome";
    const descricao = "teste descricao";
    const preco_unitario = 100;

    await CriarItemUseCase.execute(categoria, nome, descricao, preco_unitario);

    expect(mockCriar).toHaveBeenCalledWith(expect.any(Item));
    expect(mockCriar).toHaveBeenCalledTimes(1);
    const itemCriado = mockCriar.mock.calls[0][0] as Item;
    expect(itemCriado.categoria).toBe(categoria);
    expect(itemCriado.nome).toBe(nome);
    expect(itemCriado.descricao).toBe(descricao);
    expect(itemCriado.preco_unitario).toBe(preco_unitario);
  });
});
