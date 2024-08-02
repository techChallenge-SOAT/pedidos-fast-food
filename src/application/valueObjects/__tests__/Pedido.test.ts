import Pedido from "../Pedido";

describe("Pedido", () => {
  it("should create a new Pedido instance", () => {
    const cliente_cpf = "123456789";
    const data_pedido = new Date();

    const pedido = new Pedido(cliente_cpf, data_pedido);

    expect(pedido.cliente_cpf).toBe(cliente_cpf);
    expect(pedido.data_pedido).toBe(data_pedido);
  });
});
