import { Router } from "express";
import { ForumController } from "../controllers/forum.controller";

const router = Router();
const controller = new ForumController();

// Rotas fixas — precisam vir antes de "/:id"
router.get("/estatisticas", controller.estatisticas);
router.get("/populares", controller.listarPopulares);
router.get("/recentes", controller.listarRecentes);
router.get("/busca", controller.pesquisar);
router.get("/categoria/:categoriaId", controller.listarPorCategoria);
router.get("/status/:status", controller.listarPorStatus);
router.get("/autor/:autorNome", controller.listarPorAutor);

// CRUD
router.get("/", controller.listar);
router.post("/", controller.criar);
router.get("/:id", controller.buscar);
router.put("/:id", controller.atualizar);
router.delete("/:id", controller.excluir);

// Ações e relacionamentos
router.patch("/:id/status", controller.alterarStatus);
router.get("/:id/comentarios", controller.listarComentarios);
router.get("/:id/curtidas", controller.listarCurtidas);

export default router;
