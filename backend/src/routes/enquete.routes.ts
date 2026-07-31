import { Router } from "express";
import { EnqueteController } from "../controllers/enquete.controller";

const router = Router();
const controller = new EnqueteController();

// Rotas fixas — precisam vir antes de "/:id"
router.get("/estatisticas", controller.estatisticas);
router.get("/ativas", controller.listarAtivas);
router.get("/finalizadas", controller.listarFinalizadas);

// CRUD
router.get("/", controller.listar);
router.post("/", controller.criar);
router.get("/:id", controller.buscar);
router.put("/:id", controller.atualizar);
router.delete("/:id", controller.excluir);

// Ações e relacionamentos
router.patch("/:id/encerrar", controller.encerrar);
router.get("/:id/opcoes", controller.listarOpcoes);
router.post("/:id/votar", controller.votar);
router.get("/:id/resultado", controller.resultado);

export default router;
