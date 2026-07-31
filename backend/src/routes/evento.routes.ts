import { Router } from "express";
import { EventoController } from "../controllers/evento.controller";

const router = Router();
const controller = new EventoController();

// Rotas fixas — precisam vir antes de "/:id"
router.get("/proximos", controller.listarProximos);
router.get("/categoria/:categoriaId", controller.listarPorCategoria);
router.get("/campus/:campus", controller.listarPorCampus);

// CRUD
router.get("/", controller.listar);
router.post("/", controller.criar);
router.get("/:id", controller.buscar);
router.put("/:id", controller.atualizar);
router.delete("/:id", controller.excluir);

export default router;
