-- DropTable
DROP TABLE IF EXISTS "Expense" CASCADE;
DROP TABLE IF EXISTS "User" CASCADE;
DROP TABLE IF EXISTS "ReadingLog" CASCADE;

-- CreateTable
CREATE TABLE IF NOT EXISTS "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "reading_logs" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bookTitle" TEXT NOT NULL,
    "minutesRead" INTEGER NOT NULL,
    "genre" TEXT NOT NULL,
    "note" TEXT NOT NULL DEFAULT '',
    "favorite" BOOLEAN NOT NULL DEFAULT false,
    "readOn" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reading_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "reading_logs_userId_idx" ON "reading_logs"("userId");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "reading_logs_userId_readOn_idx" ON "reading_logs"("userId", "readOn");

-- AddForeignKey
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'reading_logs_userId_fkey'
    ) THEN
        ALTER TABLE "reading_logs" ADD CONSTRAINT "reading_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;
