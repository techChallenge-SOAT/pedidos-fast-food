import { app } from './adapters/http/server';
import { pollQueue as pullPayment } from './adapters/sqs/ProcessarMensagemCozinha';
import { pollQueue as pullProduction } from './adapters/sqs/ProcessarMensagemPagamento';


const port = process.env.PORT || 3000;

pullProduction().catch(error => {
  console.error('Error starting the SQS polling:', error);
});

pullPayment().catch(error => {
  console.error('Error starting the SQS polling:', error);
});

app.listen(port, () => {
  console.log(`Servidor executando na porta ${port}`);
});
