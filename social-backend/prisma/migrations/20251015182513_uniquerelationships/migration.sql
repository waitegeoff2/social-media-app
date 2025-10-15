/*
  Warnings:

  - A unique constraint covering the columns `[requestfromId,requesttoId]` on the table `Request` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Request_requestfromId_requesttoId_key" ON "Request"("requestfromId", "requesttoId");
