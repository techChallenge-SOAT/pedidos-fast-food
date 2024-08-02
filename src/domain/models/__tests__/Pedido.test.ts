import Pedido from "../Pedido";
import { Status } from "../Pedido";

describe("Pedido", () => {
  it("should create an instance of Pedido", () => {
    const pedido = new Pedido("1", "1", new Date(), Status.Recebido);
    expect(pedido).toBeInstanceOf(Pedido);
    expect(pedido.id).toBe("1");
    expect(pedido.status).toBe(Status.Recebido);
  });
});
