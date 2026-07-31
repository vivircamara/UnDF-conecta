import { Router } from "express";
import { ComentarioController } from "../controllers/comentario.controller";

const router = Router();
const controller = new ComentarioController();

// Rotas fixas — precisam vir antes de "/:id"
router.get("/estatisticas", controller.estatisticas);
router.get("/oficiais", controller.listarOficiais);
router.get("/recentes", controller.listarRecentes);
router.get("/post/:postId", controller.listarPorPost);
router.get("/autor/:autorNome", controller.listarPorAutor);

// CRUD
router.get("/", controller.listar);
router.post("/", controller.criar);
router.get("/:id", controller.buscar);
router.put("/:id", controller.atualizar);
router.delete("/:id", controller.excluir);

// Ações
router.patch("/:id/oficial", controller.marcarComoOficial);
router.patch("/:id/desoficializar", controller.removerOficial);

export default router;
