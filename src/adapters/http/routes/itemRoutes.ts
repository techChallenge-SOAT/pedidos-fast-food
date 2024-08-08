import express, { Request, Response } from "express";
import { CriarItemUseCase } from "../../../application/useCases/item/CriarItemUseCase";
import { BuscarItemPorIDUseCase } from "../../../application/useCases/item/BuscarItemPorIDUseCase";
import { BuscarItensUseCase } from "../../../application/useCases/item/BuscarItensUseCase";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { categoria, nome, descricao, preco_unitario } = req.body;

  try {
    const item = await CriarItemUseCase.execute(
      categoria,
      nome,
      descricao,
      preco_unitario,
    );
    return res.status(201).json({ message: "Sucesso", item: item });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao adicionar o item." });
  }
});

router.get("/", async (_, res: Response) => {
  try {
    const itens = await BuscarItensUseCase.execute();
    return res.status(200).json(itens);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Erro ao buscar os itens." });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const itens = await BuscarItemPorIDUseCase.execute(id);
    return res.status(200).json(itens);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar o item." });
  }
});

export default router;
