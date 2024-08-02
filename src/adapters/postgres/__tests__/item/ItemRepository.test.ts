import { ItemRepository } from "../../item/ItemRepository";
import { Item as ItemModel } from "../../models/PedidoItemModels";
import Item from "../../../../application/valueObjects/Item";

jest.mock("../../models/PedidoItemModels");

describe("ItemRepository", () => {
  beforeEach(() => {
    (ItemModel.create as jest.Mock).mockClear();
    (ItemModel.findByPk as jest.Mock).mockClear();
    (ItemModel.findOne as jest.Mock).mockClear();
    (ItemModel.findAll as jest.Mock).mockClear();
  });

  it("should create an item", async () => {
    const item = new Item("categoria", "nome", "descricao", 10);
    await ItemRepository.criar(item);
    expect(ItemModel.create).toHaveBeenCalledWith(
      expect.objectContaining({
        categoria: "categoria",
        nome: "nome",
        descricao: "descricao",
        preco_unitario: 10,
      }),
    );
  });

  it("should find an item by id", async () => {
    await ItemRepository.buscarPorId("1");
    expect(ItemModel.findByPk).toHaveBeenCalledWith("1");
  });

  it("should find an item by name", async () => {
    await ItemRepository.buscarPorNome("nome");
    expect(ItemModel.findOne).toHaveBeenCalledWith({ where: { nome: "nome" } });
  });

  it("should find all items", async () => {
    await ItemRepository.buscarTodos();
    expect(ItemModel.findAll).toHaveBeenCalledWith({
      order: [["nome", "ASC"]],
    });
  });
});
