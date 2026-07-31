import { Router } from "express";
import { PerguntaController } from "../controllers/pergunta.controller";

const router = Router();
const controller = new PerguntaController();

// Rotas fixas — precisam vir antes de "/:id"
router.get("/estatisticas", controller.estatisticas);
router.get("/questionario/:questionarioId", controller.listarPorQuestionario);
router.get("/tipo/:tipo", controller.listarPorTipo);

// CRUD
router.get("/", controller.listar);
router.post("/", controller.criar);
router.get("/:id", controller.buscar);
router.put("/:id", controller.atualizar);
router.delete("/:id", controller.excluir);

// Opções e respostas
router.get("/:id/opcoes", controller.listarOpcoes);
router.post("/:id/opcoes", controller.adicionarOpcao);
router.delete("/:id/opcoes/:opcaoId", controller.removerOpcao);
router.get("/:id/respostas", controller.listarRespostas);

export default router;
