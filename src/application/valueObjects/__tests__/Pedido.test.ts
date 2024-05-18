import Pedido from '../Pedido';
import { Status } from '../../../domain/models/Pedido'

describe('Pedido', () => {
    it('should create a new Pedido instance', () => {
        const id = '1';
        const cliente_cpf = '123456789';
        const data_pedido = new Date();
        const status = Status.Recebido;

        const pedido = new Pedido(cliente_cpf, data_pedido);

        expect(pedido.cliente_cpf).toBe(cliente_cpf);
        expect(pedido.data_pedido).toBe(data_pedido);
    });
});