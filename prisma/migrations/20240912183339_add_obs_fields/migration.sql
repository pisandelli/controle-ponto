/*
  Warnings:

  - You are about to drop the `ObsLogs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `ObsLogs` DROP FOREIGN KEY `ObsLogs_logId_fkey`;

-- DropIndex
DROP INDEX `TimeLogs_userId_email_fkey` ON `TimeLogs`;

-- AlterTable
ALTER TABLE `TimeLogs` ADD COLUMN `obsEnd` VARCHAR(191) NULL,
    ADD COLUMN `obsStart` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `ObsLogs`;
