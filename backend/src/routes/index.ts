import { Router } from "express";

import healthRoutes from "./health.routes";
import categoriaEventoRoutes from "./categoriaEvento.routes";
import eventoRoutes from "./evento.routes";
import categoriaForumRoutes from "./categoriaForum.routes";
import forumRoutes from "./forum.routes";
import comentarioRoutes from "./comentario.routes";
import votoRoutes from "./voto.routes";
import questionarioRoutes from "./questionario.routes";
import perguntaRoutes from "./pergunta.routes";
import avaliacaoRoutes from "./avaliacao.routes";
import enqueteRoutes from "./enquete.routes";
import opcaoEnqueteRoutes from "./opcaoEnquete.routes";

const router = Router();

router.use("/health", healthRoutes);

// Calendário
router.use("/categorias-evento", categoriaEventoRoutes);
router.use("/eventos", eventoRoutes);

// Fórum
router.use("/categorias-forum", categoriaForumRoutes);
router.use("/forum", forumRoutes);
router.use("/comentarios", comentarioRoutes);
router.use("/votos", votoRoutes);

// Avaliação institucional
router.use("/questionarios", questionarioRoutes);
router.use("/perguntas", perguntaRoutes);
router.use("/avaliacoes", avaliacaoRoutes);

// Enquetes
router.use("/enquetes", enqueteRoutes);
router.use("/opcoes-enquete", opcaoEnqueteRoutes);

export default router;