import { Router } from "express";
import { OpcaoEnqueteController } from "../controllers/opcaoEnquete.controller";

const router = Router();
const controller = new OpcaoEnqueteController();

// Rotas fixas — precisam vir antes de "/:id"
router.get("/estatisticas", controller.estatisticas);
router.get("/mais-votada", controller.maisVotada);
router.get("/enquete/:enqueteId", controller.listarPorEnquete);

// CRUD
router.get("/", controller.listar);
router.post("/", controller.criar);
router.get("/:id", controller.buscar);
router.put("/:id", controller.atualizar);
router.delete("/:id", controller.excluir);

// Consulta
router.get("/:id/percentual", controller.percentual);

// Nota: "/:id/incrementar" (controller.incrementarVotos) foi deixado de fora
// de propósito — o voto já é registrado via POST /enquetes/:id/votar,
// que valida se a opção pertence à enquete. Ter as duas rotas ativas
// criaria dois caminhos para a mesma ação. Se precisar reativar,
// é só descomentar a linha abaixo:
// router.patch("/:id/incrementar", controller.incrementarVotos);

export default router;
