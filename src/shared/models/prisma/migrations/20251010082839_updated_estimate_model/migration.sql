/*
  Warnings:

  - You are about to drop the column `project_id` on the `estimates` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `middleName` on the `users` table. All the data in the column will be lost.
  - Added the required column `profit` to the `estimates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectId` to the `estimates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `estimates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `middle_name` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."estimates" DROP CONSTRAINT "estimates_project_id_fkey";

-- AlterTable
ALTER TABLE "estimates" DROP COLUMN "project_id",
ADD COLUMN     "profit" BOOLEAN NOT NULL,
ADD COLUMN     "projectId" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "middleName",
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL,
ADD COLUMN     "middle_name" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "estimates" ADD CONSTRAINT "estimates_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estimates" ADD CONSTRAINT "estimates_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
