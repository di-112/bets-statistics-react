/*
  Warnings:

  - You are about to alter the column `quotient` on the `Bets` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Bets" (
    "key" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "leagueId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "home" TEXT NOT NULL,
    "visit" TEXT NOT NULL,
    "bet" TEXT NOT NULL,
    "sum" INTEGER NOT NULL,
    "quotient" REAL NOT NULL,
    "result" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Bets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Bets" ("bet", "date", "home", "key", "leagueId", "quotient", "result", "sum", "userId", "visit") SELECT "bet", "date", "home", "key", "leagueId", "quotient", "result", "sum", "userId", "visit" FROM "Bets";
DROP TABLE "Bets";
ALTER TABLE "new_Bets" RENAME TO "Bets";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
