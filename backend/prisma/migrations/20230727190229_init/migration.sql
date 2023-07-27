-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Bets" (
    "key" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "leagueId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "home" TEXT NOT NULL,
    "visit" TEXT NOT NULL,
    "bet" TEXT NOT NULL,
    "sum" INTEGER NOT NULL,
    "quotient" INTEGER NOT NULL,
    "result" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Bets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
