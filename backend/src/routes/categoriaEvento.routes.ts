import { Router } from "express";
import { CategoriaEventoController } from "../controllers/categoriaEvento.controller";

const router = Router();
const controller = new CategoriaEventoController();

// Rotas fixas — precisam vir antes de "/:id"
router.get("/estatisticas", controller.estatisticas);
router.get("/com-eventos", controller.listarComEventos);
router.get("/nome/:nome", controller.buscarPorNome);

// CRUD
router.get("/", controller.listar);
router.post("/", controller.criar);
router.get("/:id", controller.buscar);
router.put("/:id", controller.atualizar);
router.delete("/:id", controller.excluir);

// Relacionamentos
router.get("/:id/eventos", controller.listarEventos);

export default router;
