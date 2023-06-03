/*
  Warnings:

  - You are about to alter the column `status` on the `Solved` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Enum(EnumId(0))`.
  - You are about to drop the column `credit` on the `User` table. All the data in the column will be lost.
  - Added the required column `speaker` to the `Chatlog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Chatlog` ADD COLUMN `speaker` ENUM('User', 'Chatbot') NOT NULL;

-- AlterTable
ALTER TABLE `Solved` MODIFY `status` ENUM('Solved', 'Wrong') NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `credit`,
    ADD COLUMN `unbannedAt` DATETIME(3) NULL;
