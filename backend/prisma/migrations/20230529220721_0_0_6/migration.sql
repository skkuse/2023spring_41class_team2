/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Problem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[problemfilename]` on the table `ProblemFile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[path]` on the table `ProblemFile` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Problem` ADD COLUMN `code` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Problem_title_key` ON `Problem`(`title`);

-- CreateIndex
CREATE UNIQUE INDEX `ProblemFile_problemfilename_key` ON `ProblemFile`(`problemfilename`);

-- CreateIndex
CREATE UNIQUE INDEX `ProblemFile_path_key` ON `ProblemFile`(`path`);
