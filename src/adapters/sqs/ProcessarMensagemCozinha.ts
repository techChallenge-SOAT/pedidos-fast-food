
import { sqs } from '../../config/sqs'
import axios from 'axios'
import dotenv from 'dotenv';
import { AlterarStatusDoPedidoUseCase } from '../../application/useCases/pedido/AlterarStatusDoPedidoUseCase';
import { ConverteStringParaStatusUseCase } from '../../application/useCases/pedido/ConverteStringParaStatusUseCase';
dotenv.config();

async function processCozinha(pedido: any) {
    try {
        const status = ConverteStringParaStatusUseCase.execute(pedido.status);
        await AlterarStatusDoPedidoUseCase.execute(pedido.id, status);
      } catch (error) {
        console.error(error);
      }
}
export async function pollQueue() {
    const params = {
        QueueUrl: process.env.SQS_PRODUCTION_QUEUE!,
        MaxNumberOfMessages: 10,
        VisibilityTimeout: 20,
        WaitTimeSeconds: 10
    };

    const data = await sqs.receiveMessage(params).promise();
    if (data.Messages) {
        for (const message of data.Messages) {
            if (message.ReceiptHandle && message.Body) {
                const productionData = JSON.parse(message.Body);
                await processCozinha(productionData);
                await sqs.deleteMessage({
                    QueueUrl: process.env.SQS_PRODUCTION_QUEUE!,
                    ReceiptHandle: message.ReceiptHandle!
                }).promise();
            }
        }
    }
}

setInterval(pollQueue, 5000)