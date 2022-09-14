-- CreateTable
CREATE TABLE "MessageBoard" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "messages" TEXT NOT NULL,

    CONSTRAINT "MessageBoard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "likes" INTEGER NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);
