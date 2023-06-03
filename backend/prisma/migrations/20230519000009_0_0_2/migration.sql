/*
  Warnings:

  - You are about to drop the column `hidden` on the `Problem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Problem` DROP COLUMN `hidden`,
    ADD COLUMN `isHidden` BOOLEAN NOT NULL DEFAULT false;
