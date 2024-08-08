import Item from "../Item";

describe("Item", () => {
  it("should create an instance of Item", () => {
    const item = new Item(1, "categoria", "nome", "descricao", 100);
    expect(item).toBeInstanceOf(Item);
    expect(item.id).toBe(1);
    expect(item.categoria).toBe("categoria");
    expect(item.nome).toBe("nome");
    expect(item.descricao).toBe("descricao");
    expect(item.preco_unitario).toBe(100);
  });
});
