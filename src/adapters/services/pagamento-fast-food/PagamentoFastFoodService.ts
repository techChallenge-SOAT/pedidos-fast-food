import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export class PagamentoFastFoodService {
  static async efetuarPagamento({
    id_pedido = "",
    valor = 0,
    descricao_pedido = "",
    cpf_cliente = "",
  }) {
    const url = process.env.PAGAMENTO_FAST_FOOD_URL;
    if (!url) {
      throw new Error("PAGAMENTO_SERVICO_URL não está definido");
    }

    try {
      await axios.post(`${url}/pagamento`, {
        id_pedido,
        valor,
        descricao_pedido,
        cpf_cliente,
      });
    } catch (error) {
      console.error("Erro ao enviar solicitação de pagamento:", error);
    }
  }
}
