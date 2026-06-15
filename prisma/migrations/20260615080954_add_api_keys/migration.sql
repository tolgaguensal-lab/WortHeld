-- CreateTable
CREATE TABLE "ApiKey" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "keyPrefix" TEXT NOT NULL,
    "keyHash" TEXT NOT NULL,
    "userId" TEXT,
    "scopes" TEXT NOT NULL DEFAULT 'read',
    "rateLimit" INTEGER NOT NULL DEFAULT 100,
    "expiresAt" TIMESTAMP(3),
    "lastUsedAt" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApiKey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApiRequestLog" (
    "id" TEXT NOT NULL,
    "apiKeyId" TEXT NOT NULL,
    "endpoint" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "statusCode" INTEGER NOT NULL,
    "ip" TEXT,
    "userAgent" TEXT,
    "duration" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ApiRequestLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ApiKey_keyHash_key" ON "ApiKey"("keyHash");

-- CreateIndex
CREATE INDEX "ApiRequestLog_apiKeyId_createdAt_idx" ON "ApiRequestLog"("apiKeyId", "createdAt");

-- CreateIndex
CREATE INDEX "ApiRequestLog_createdAt_idx" ON "ApiRequestLog"("createdAt");

-- AddForeignKey
ALTER TABLE "ApiRequestLog" ADD CONSTRAINT "ApiRequestLog_apiKeyId_fkey" FOREIGN KEY ("apiKeyId") REFERENCES "ApiKey"("id") ON DELETE CASCADE ON UPDATE CASCADE;
