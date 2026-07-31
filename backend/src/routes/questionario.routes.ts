import { Router } from "express";
import { QuestionarioController } from "../controllers/questionario.controller";

const router = Router();
const controller = new QuestionarioController();

// Rotas fixas — precisam vir antes de "/:id"
router.get("/estatisticas", controller.estatisticas);
router.get("/ativos", controller.listarAtivos);
router.get("/finalizados", controller.listarFinalizados);

// CRUD
router.get("/", controller.listar);
router.post("/", controller.criar);
router.get("/:id", controller.buscar);
router.put("/:id", controller.atualizar);
router.delete("/:id", controller.excluir);

// Ações e relacionamentos
router.patch("/:id/encerrar", controller.encerrar);
router.get("/:id/perguntas", controller.listarPerguntas);
router.get("/:id/respostas", controller.listarRespostas);

export default router;
