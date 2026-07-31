/*
  Warnings:

  - You are about to drop the `confirmacaopresenca` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `confirmacaopresenca` DROP FOREIGN KEY `ConfirmacaoPresenca_eventoId_fkey`;

-- DropTable
DROP TABLE `confirmacaopresenca`;
