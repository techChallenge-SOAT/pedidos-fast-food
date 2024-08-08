import { BuscarPedidoPorIdUseCase } from "../BuscarPedidoPorIdUseCase";
import { PedidoRepository } from "../../../../adapters/postgres/pedido/PedidoRepository";

const buscarPorIdMock = jest.fn();

PedidoRepository.buscarPorId = buscarPorIdMock;

describe("BuscarPedidoPorIdUseCase", () => {
  it("should return the order if it exists", async () => {
    const pedido = { id: "1", status: "Recebido" };
    buscarPorIdMock.mockResolvedValue(pedido);

    const result = await BuscarPedidoPorIdUseCase.execute("1");

    expect(result).toEqual(pedido);
  });

  it("should throw an error if the order does not exist", async () => {
    buscarPorIdMock.mockResolvedValue(null);

    await expect(BuscarPedidoPorIdUseCase.execute("1")).rejects.toThrow(
      "Pedido não encontrado",
    );
  });
});
