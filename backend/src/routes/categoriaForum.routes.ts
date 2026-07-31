import { Router } from "express";
import { CategoriaForumController } from "../controllers/categoriaForum.controller";

const router = Router();
const controller = new CategoriaForumController();

// Rotas fixas — precisam vir antes de "/:id"
router.get("/estatisticas", controller.estatisticas);
router.get("/com-publicacoes", controller.listarComPublicacoes);
router.get("/mais-utilizadas", controller.listarMaisUtilizadas);
router.get("/nome/:nome", controller.buscarPorNome);

// CRUD
router.get("/", controller.listar);
router.post("/", controller.criar);
router.get("/:id", controller.buscar);
router.put("/:id", controller.atualizar);
router.delete("/:id", controller.excluir);

// Relacionamentos
router.get("/:id/publicacoes", controller.listarPublicacoes);

export default router;
