-- AlterTable
ALTER TABLE `TimeLogs` ADD COLUMN `pausaFim` INTEGER NULL,
    ADD COLUMN `pausaInicio` INTEGER NULL,
    MODIFY `endTime` INTEGER NULL,
    MODIFY `totalDuration` VARCHAR(191) NULL;
