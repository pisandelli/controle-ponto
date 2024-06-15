/*
  Warnings:

  - You are about to alter the column `pauseDuration` on the `TimeLogs` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `TimeLogs` MODIFY `pauseDuration` INTEGER NULL;

-- CreateTable
CREATE TABLE `ObsLogs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `logId` INTEGER NOT NULL,
    `startTimeObs` VARCHAR(191) NULL,
    `endTimeObs` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ObsLogs` ADD CONSTRAINT `ObsLogs_logId_fkey` FOREIGN KEY (`logId`) REFERENCES `TimeLogs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
