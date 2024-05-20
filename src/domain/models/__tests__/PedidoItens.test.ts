import PedidoItens from '../PedidoItens';

describe('PedidoItens', () => {
  it('should create an instance of PedidoItens', () => {
    const pedidoItens = new PedidoItens(1, 2, 'pedido1', 'item1');
    expect(pedidoItens).toBeInstanceOf(PedidoItens);
    expect(pedidoItens.id).toBe('item1');
    expect(pedidoItens.pedido_id).toBe('pedido1');
    expect(pedidoItens.item_id).toBe(1);
    expect(pedidoItens.quantidade).toBe(2);
  });

  it('should create an instance of PedidoItens without optional parameters', () => {
    const pedidoItens = new PedidoItens(1, 2);
    expect(pedidoItens).toBeInstanceOf(PedidoItens);
    expect(pedidoItens.id).toBeUndefined();
    expect(pedidoItens.pedido_id).toBeUndefined();
    expect(pedidoItens.item_id).toBe(1);
    expect(pedidoItens.quantidade).toBe(2);
  });
});