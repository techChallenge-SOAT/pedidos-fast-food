import { PedidoRepository } from "../../pedido/PedidoRepository";
import { Pedido as PedidoModel } from "../../models/PedidoItemModels";
import Pedido from "../../../../application/valueObjects/Pedido";

jest.mock("../../models/PedidoItemModels");

describe("PedidoRepository", () => {
  beforeEach(() => {
    (PedidoModel.create as jest.Mock).mockClear();
    (PedidoModel.findByPk as jest.Mock).mockClear();
    (PedidoModel.findOne as jest.Mock).mockClear();
    (PedidoModel.findAll as jest.Mock).mockClear();
  });

  it("should create a Pedido", async () => {
    const pedido = new Pedido("12345678901");
    await PedidoRepository.criar(pedido);
    expect(PedidoModel.create).toHaveBeenCalledWith(
      expect.objectContaining({
        cliente_cpf: "12345678901",
      }),
    );
  });

  it("should find a Pedido by id", async () => {
    await PedidoRepository.buscarPorId("1");
    expect(PedidoModel.findByPk).toHaveBeenCalledWith("1", {
      include: [{ as: "itens", model: expect.any(Function) }],
    });
  });
});
