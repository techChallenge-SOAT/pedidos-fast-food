import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export class ProducaoFastFoodService {
  static async notificarProducao(pedido: any) {
    const url = process.env.PRODUCAO_FAST_FOOD_URL;
    if (!url) {
      throw new Error('PRODUCAO_FAST_FOOD_URL não está definido');
    }

    try {
      await axios.post(url, pedido);
    } catch (error) {
      console.error('Erro ao enviar solicitação para producao-fast-food:', error);
    }
  }
}