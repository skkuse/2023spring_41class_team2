-- AlterTable
ALTER TABLE `User` ADD COLUMN `credit` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `isBanned` BOOLEAN NOT NULL DEFAULT false;
