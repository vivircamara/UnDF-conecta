/*
  Warnings:

  - A unique constraint covering the columns `[postId,usuarioIdentificador]` on the table `ForumVote` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `usuarioIdentificador` to the `ForumVote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `forumvote` ADD COLUMN `usuarioIdentificador` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `ForumVote_postId_usuarioIdentificador_key` ON `ForumVote`(`postId`, `usuarioIdentificador`);
