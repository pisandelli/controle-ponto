/*
  Warnings:

  - A unique constraint covering the columns `[userId,email]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `TimeLogs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `TimeLogs` DROP FOREIGN KEY `TimeLogs_userId_fkey`;

-- AlterTable
ALTER TABLE `TimeLogs` ADD COLUMN `email` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Users_userId_email_key` ON `Users`(`userId`, `email`);

-- AddForeignKey
ALTER TABLE `TimeLogs` ADD CONSTRAINT `TimeLogs_userId_email_fkey` FOREIGN KEY (`userId`, `email`) REFERENCES `Users`(`userId`, `email`) ON DELETE RESTRICT ON UPDATE CASCADE;
