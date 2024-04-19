import express from 'express';
import bodyParser from 'body-parser';
import itemRoutes from './routes/itemRoutes';
import pedidoRoutes from './routes/pedidoRoutes';
import { handleMercadoPagoWebhook } from './webhooks/handleMercadoPagoWebhook';

const app = express();

app.use(bodyParser.json());

app.use('/itens', itemRoutes);

app.use('/pedidos', pedidoRoutes);

app.use('/webhooks/mercadopago', handleMercadoPagoWebhook);

app.get('/', (req, res) => {
  res.send('Sistema de Pedidos');
});

export { app };
