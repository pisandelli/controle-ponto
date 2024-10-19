/*
  Warnings:

  - You are about to drop the column `day` on the `TimeLogs` table. All the data in the column will be lost.
  - Added the required column `today` to the `TimeLogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
-- ALTER TABLE `TimeLogs` DROP COLUMN `day`,
--     ADD COLUMN `today` VARCHAR(191) NOT NULL;

-- RENAME COLUMN
ALTER TABLE `TimeLogs` RENAME COLUMN `day` TO `today`;