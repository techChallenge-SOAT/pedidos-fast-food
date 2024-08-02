import express from "express";
import bodyParser from "body-parser";
import itemRoutes from "./routes/itemRoutes";
import pedidoRoutes from "./routes/pedidoRoutes";

const app = express();

app.use(bodyParser.json());

app.use("/itens", itemRoutes);

app.use("/pedidos", pedidoRoutes);

app.get("/", (req, res) => {
  res.send("Sistema de Pedidos");
});

export { app };
