-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userid` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `nickname` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `isAdmin` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `User_userid_key`(`userid`),
    UNIQUE INDEX `User_nickname_key`(`nickname`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Problem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NULL,
    `answer` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `hidden` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Solved` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userid` VARCHAR(191) NOT NULL,
    `problemid` INTEGER NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SuggestedQuestion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `problemid` INTEGER NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `answer` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Chatlog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `solvedid` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `content` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Solved` ADD CONSTRAINT `Solved_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `User`(`userid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Solved` ADD CONSTRAINT `Solved_problemid_fkey` FOREIGN KEY (`problemid`) REFERENCES `Problem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SuggestedQuestion` ADD CONSTRAINT `SuggestedQuestion_problemid_fkey` FOREIGN KEY (`problemid`) REFERENCES `Problem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chatlog` ADD CONSTRAINT `Chatlog_solvedid_fkey` FOREIGN KEY (`solvedid`) REFERENCES `Solved`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
