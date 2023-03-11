CREATE TYPE "BuildingType" AS ENUM ('apartment', 'community');

CREATE TYPE "ResidentRole" AS ENUM ('resident');

CREATE TYPE "PostType" AS ENUM ('ad', 'post', 'item', 'event');

CREATE TABLE "Building" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "type" "BuildingType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Building_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "Building" enable ROW LEVEL SECURITY;

CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "meta" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "User" enable ROW LEVEL SECURITY;

CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "buildingId" TEXT NOT NULL,
    "actor" UUID NOT NULL,
    "type" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "readAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "Notification" enable ROW LEVEL SECURITY;

CREATE TABLE "Resident" (
    "id" TEXT NOT NULL,
    "buildingId" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "floor" TEXT,
    "apartment" TEXT,
    "role" "ResidentRole" NOT NULL DEFAULT 'resident',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Resident_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "Resident" enable ROW LEVEL SECURITY;

CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "buildingId" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "type" "PostType" NOT NULL,
    "meta" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "Post" enable ROW LEVEL SECURITY;

CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "postId" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "Comment" enable ROW LEVEL SECURITY;

CREATE TABLE "Like" (
    "id" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "postId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "Like" enable ROW LEVEL SECURITY;

CREATE TABLE "Channel" (
    "id" TEXT NOT NULL,
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Channel_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "Channel" enable ROW LEVEL SECURITY;

CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "checkedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "Member" enable ROW LEVEL SECURITY;

CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "body" TEXT NOT NULL,
    "meta" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "Message" enable ROW LEVEL SECURITY;

CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

ALTER TABLE "Notification"
ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Notification"
ADD CONSTRAINT "Notification_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Resident"
ADD CONSTRAINT "Resident_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Resident"
ADD CONSTRAINT "Resident_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Post"
ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Post"
ADD CONSTRAINT "Post_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Comment"
ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Comment"
ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Like"
ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Like"
ADD CONSTRAINT "Like_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Member"
ADD CONSTRAINT "Member_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Member"
ADD CONSTRAINT "Member_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Message"
ADD CONSTRAINT "Message_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Message"
ADD CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

GRANT USAGE ON schema public TO postgres,
    anon,
    authenticated,
    service_role;

GRANT ALL PRIVILEGES ON ALL TABLES IN schema public TO postgres,
    anon,
    authenticated,
    service_role;

GRANT ALL PRIVILEGES ON ALL functions IN schema public TO postgres,
    anon,
    authenticated,
    service_role;

GRANT ALL PRIVILEGES ON ALL sequences IN schema public TO postgres,
    anon,
    authenticated,
    service_role;

ALTER DEFAULT PRIVILEGES IN schema public
GRANT ALL ON TABLES TO postgres,
    anon,
    authenticated,
    service_role;

ALTER DEFAULT PRIVILEGES IN schema public
GRANT ALL ON functions TO postgres,
    anon,
    authenticated,
    service_role;

ALTER DEFAULT PRIVILEGES IN schema public
GRANT ALL ON sequences TO postgres,
    anon,
    authenticated,
    service_role;