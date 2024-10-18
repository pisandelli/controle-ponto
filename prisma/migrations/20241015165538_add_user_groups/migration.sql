/*
  Warnings:

  - Added the required column `groupId` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Users` ADD COLUMN `groupId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `UserGroups` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `UserGroups`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
