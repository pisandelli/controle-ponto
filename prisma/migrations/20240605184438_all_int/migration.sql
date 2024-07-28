-- AlterTable
ALTER TABLE `TimeLogs` MODIFY `endTime` INTEGER NOT NULL,
    MODIFY `pauseDuration` VARCHAR(191) NULL,
    MODIFY `totalDuration` VARCHAR(191) NOT NULL;
