import express, { Request, Response } from 'express';
// Value objects
import Pedido from '../../../application/valueObjects/Pedido';
import PedidoItem from '../../../application/valueObjects/PedidoItem';
// Use Cases
import { BuscarUltimosPedidosUseCase } from '../../../application/useCases/pedido/BuscarUltimosPedidosUseCase';
import { CriarPedidoUseCase } from '../../../application/useCases/pedido/CriarPedidoUseCase';
import { BuscarPedidoPorIdUseCase } from '../../../application/useCases/pedido/BuscarPedidoPorIdUseCase';
import { AlterarStatusDoPedidoUseCase } from '../../../application/useCases/pedido/AlterarStatusDoPedidoUseCase';
import { ConverteStringParaStatusUseCase } from '../../../application/useCases/pedido/ConverteStringParaStatusUseCase';
import { BuscarStatusDoPagamentoDoPedidoUseCase } from '../../../application/useCases/pedido/BuscarStatusDoPagamentoDoPedidoUseCase';

const router = express.Router();

router.get('/', async (_, res: Response) => {
  try {
    const pedidos = await BuscarUltimosPedidosUseCase.execute();
    return res.status(200).json(pedidos);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar os pedidos.' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  const cliente_cpf = String(req.body.cliente_cpf);

  if (
    !req.body.itens ||
    !Array.isArray(req.body.itens) ||
    req.body.itens.length === 0
  ) {
    console.log('req.body.itens', req.body.itens);
    throw new Error('Itens inválidos');
  }

  const itens_pedido = req.body.itens.map(
    (item_pedido: PedidoItem) =>
      new PedidoItem(item_pedido.item_id, item_pedido.quantidade),
  );

  const pedido = new Pedido(cliente_cpf);

  try {
    const cliente = await CriarPedidoUseCase.execute(pedido, itens_pedido);
    return res.status(201).json(cliente);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao adicionar o pedido.' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const clientes = await BuscarPedidoPorIdUseCase.execute(id);
    return res.status(200).json(clientes);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar o pedido.' });
  }
});

router.get('/:id/pagamento', async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const status = await BuscarStatusDoPagamentoDoPedidoUseCase.execute(id);
    return res.status(200).json(status);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar o pedido.' });
  }
});

router.patch('/:id', async (req: Request, res: Response) => {
  const id = String(req.params.id);
  const statusFromBody = String(req.body.status);

  try {
    const status = ConverteStringParaStatusUseCase.execute(statusFromBody);
    const cliente = await AlterarStatusDoPedidoUseCase.execute(id, status);
    return res.status(201).json(cliente);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao atualizar o pedido.' });
  }
});

export default router;
