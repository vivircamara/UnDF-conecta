import { Router } from "express";
import { AvaliacaoController } from "../controllers/avaliacao.controller";

const router = Router();
const controller = new AvaliacaoController();

// Rotas fixas — precisam vir antes de "/:id"
router.get("/estatisticas", controller.estatisticas);
router.get("/dashboard", controller.dashboard);
router.get("/questionario/:questionarioId/media", controller.calcularMedia);
router.get("/questionario/:questionarioId/participacao", controller.participacao);
router.get("/questionario/:questionarioId", controller.listarPorQuestionario);

// CRUD
// Sem GET "/" — o controller não expõe listagem geral de avaliações (ver observação no chat)
router.post("/", controller.criar);
router.get("/:id", controller.buscar);
router.put("/:id", controller.atualizar);
router.delete("/:id", controller.excluir);

// Respostas
router.get("/:id/respostas", controller.listarRespostas);
router.post("/:id/respostas", controller.adicionarResposta);

export default router;
