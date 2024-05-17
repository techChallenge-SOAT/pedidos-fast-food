import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export class PagamentoFastFoodService {
    static async efetuarPagamento(id_pedido: string, valor_total: number) {
        const url = process.env.PAGAMENTO_FAST_FOOD_URL;
        if (!url) {
          throw new Error('PAGAMENTO_SERVICO_URL não está definido');
        }
    
        try {
          await axios.post(url, {
            id_pedido,
            valor: valor_total,
          });
        } catch (error) {
          console.error('Erro ao enviar solicitação de pagamento:', error);
        }
      }
}