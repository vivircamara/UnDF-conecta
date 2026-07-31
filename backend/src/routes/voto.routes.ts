import { Router } from "express";
import { VotoController } from "../controllers/voto.controller";

const router = Router();
const controller = new VotoController();

// Rotas fixas — precisam vir antes de "/:id"
router.get("/estatisticas", controller.estatisticas);
router.get("/post/:postId/usuario/:usuarioIdentificador", controller.verificarCurtida);
router.delete("/post/:postId/usuario/:usuarioIdentificador", controller.removerCurtida);
router.get("/post/:postId/quantidade", controller.quantidadePorPost);
router.get("/post/:postId", controller.listarPorPost);

// CRUD
router.get("/", controller.listar);
router.post("/", controller.criar);
router.get("/:id", controller.buscar);
router.delete("/:id", controller.excluir);

export default router;
