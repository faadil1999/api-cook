-- CreateTable
CREATE TABLE "Recipe" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "chefId" TEXT NOT NULL,
    CONSTRAINT "Recipe_chefId_fkey" FOREIGN KEY ("chefId") REFERENCES "Chef" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Chef" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "country" TEXT NOT NULL
);
