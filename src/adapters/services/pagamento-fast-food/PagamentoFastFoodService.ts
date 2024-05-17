import axios from 'axios';

export class PagamentoFastFoodService {
  static async efetuarPagamento(id_pedido: string, valor_total: number) {
    try {
      await axios.post('http://servico-pagamentos/pagamentos', {
        id_pedido,
        valor: valor_total,
      });
    } catch (error) {
      console.error('Erro ao enviar solicitação de pagamento:', error);
    }
  }
}