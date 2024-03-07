/*
  Warnings:

  - The values [VISITED,DONTVISIT,DOG,NIGHT] on the enum `Observation` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Observation_new" AS ENUM ('EMPTY', 'NO_LLEGAR', 'INGLES', 'OTRO_IDIOMA', 'DUERME_DE_DIA', 'VARON_VISITA', 'PERRO_AFUERA', 'PERRO_EN_CASA', 'TESTIGOS', 'VIOLENTO', 'NO_TRASPASAR', 'CANDADO');
ALTER TABLE "House" ALTER COLUMN "observation" DROP DEFAULT;
ALTER TABLE "House" ALTER COLUMN "observation" TYPE "Observation_new" USING ("observation"::text::"Observation_new");
ALTER TYPE "Observation" RENAME TO "Observation_old";
ALTER TYPE "Observation_new" RENAME TO "Observation";
DROP TYPE "Observation_old";
ALTER TABLE "House" ALTER COLUMN "observation" SET DEFAULT 'EMPTY';
COMMIT;
