-- CreateTable
CREATE TABLE "XAcount" (
    "id" TEXT NOT NULL,
    "xid" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "profile_image_url" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "XAcount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "XAcount_xid_key" ON "XAcount"("xid");

-- CreateIndex
CREATE UNIQUE INDEX "XAcount_username_key" ON "XAcount"("username");

-- CreateIndex
CREATE UNIQUE INDEX "XAcount_name_key" ON "XAcount"("name");

-- CreateIndex
CREATE UNIQUE INDEX "XAcount_profile_image_url_key" ON "XAcount"("profile_image_url");

-- CreateIndex
CREATE UNIQUE INDEX "XAcount_userId_key" ON "XAcount"("userId");

-- AddForeignKey
ALTER TABLE "XAcount" ADD CONSTRAINT "XAcount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
