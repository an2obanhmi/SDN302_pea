-- DropTable
DROP TABLE IF EXISTS "Expense" CASCADE;

-- CreateTable
CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "ReadingLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bookTitle" TEXT NOT NULL,
    "minutesRead" INTEGER NOT NULL,
    "genre" TEXT NOT NULL,
    "note" TEXT NOT NULL DEFAULT '',
    "favorite" BOOLEAN NOT NULL DEFAULT false,
    "readOn" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReadingLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "ReadingLog_userId_idx" ON "ReadingLog"("userId");

-- AddForeignKey
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'ReadingLog_userId_fkey'
    ) THEN
        ALTER TABLE "ReadingLog" ADD CONSTRAINT "ReadingLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;
