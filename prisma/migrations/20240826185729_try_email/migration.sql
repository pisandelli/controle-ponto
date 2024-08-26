/*
  Warnings:

  - You are about to drop the column `userId` on the `TimeLogs` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `TimeLogs` DROP FOREIGN KEY `TimeLogs_userId_email_fkey`;

-- DropIndex
DROP INDEX `Users_userId_email_key` ON `Users`;

-- AlterTable
ALTER TABLE `TimeLogs` DROP COLUMN `userId`;
