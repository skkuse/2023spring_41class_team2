/*
  Warnings:

  - A unique constraint covering the columns `[userid,problemid]` on the table `Solved` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE `ProblemFile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `problemid` INTEGER NOT NULL,
    `problemfilename` VARCHAR(191) NOT NULL,
    `path` VARCHAR(191) NOT NULL,
    `mimetype` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Solved_userid_problemid_key` ON `Solved`(`userid`, `problemid`);

-- AddForeignKey
ALTER TABLE `ProblemFile` ADD CONSTRAINT `ProblemFile_problemid_fkey` FOREIGN KEY (`problemid`) REFERENCES `Problem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
