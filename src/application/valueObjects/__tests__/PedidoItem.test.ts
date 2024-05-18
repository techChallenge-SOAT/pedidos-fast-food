import PedidoItem from '../PedidoItem';

describe('PedidoItem', () => {
    it('should create a new PedidoItem instance', () => {
        const item_id = '123';
        const quantidade = 2;
        const pedido_id = '456';

        const pedidoItem = new PedidoItem(item_id, quantidade, pedido_id);

        expect(pedidoItem.item_id).toBe(item_id);
        expect(pedidoItem.quantidade).toBe(quantidade);
        expect(pedidoItem.pedido_id).toBe(pedido_id);
    });

    it('should create a new PedidoItem instance without pedido_id', () => {
        const item_id = '123';
        const quantidade = 2;

        const pedidoItem = new PedidoItem(item_id, quantidade);

        expect(pedidoItem.item_id).toBe(item_id);
        expect(pedidoItem.quantidade).toBe(quantidade);
        expect(pedidoItem.pedido_id).toBeUndefined();
    });
});