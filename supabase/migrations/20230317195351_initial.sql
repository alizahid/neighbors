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

CREATE TABLE "Device" (
    "id" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "token" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "buildingId" TEXT NOT NULL,
    "actors" UUID [],
    "type" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

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

CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "postId" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Like" (
    "id" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "postId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Channel" (
    "id" TEXT NOT NULL,
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Channel_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "checkedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

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

CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

ALTER TABLE "Device"
ADD CONSTRAINT "Device_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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

ALTER TABLE "Building" enable ROW LEVEL SECURITY;

ALTER TABLE "User" enable ROW LEVEL SECURITY;

ALTER TABLE "Device" enable ROW LEVEL SECURITY;

ALTER TABLE "Notification" enable ROW LEVEL SECURITY;

ALTER TABLE "Resident" enable ROW LEVEL SECURITY;

ALTER TABLE "Post" enable ROW LEVEL SECURITY;

ALTER TABLE "Comment" enable ROW LEVEL SECURITY;

ALTER TABLE "Like" enable ROW LEVEL SECURITY;

ALTER TABLE "Channel" enable ROW LEVEL SECURITY;

ALTER TABLE "Member" enable ROW LEVEL SECURITY;

ALTER TABLE "Message" enable ROW LEVEL SECURITY;

CREATE OR REPLACE VIEW channels AS
SELECT "Channel".id,
    "Channel".message,
    COALESCE("Member".members, '[]'::json) AS members,
    "Channel"."updatedAt"
FROM (
        "Channel"
        LEFT JOIN LATERAL (
            SELECT json_agg(
                    json_build_object(
                        'id',
                        "Member"."userId",
                        'name',
                        "User".name,
                        'image',
                        "User".image,
                        'checkedAt',
                        "Member"."checkedAt"
                    )
                ) AS members
            FROM (
                    "Member"
                    JOIN "User" ON (("User".id = "Member"."userId"))
                )
            WHERE ("Member"."channelId" = "Channel".id)
        ) "Member" ON (TRUE)
    )
ORDER BY "Channel"."updatedAt" DESC;

CREATE OR REPLACE VIEW messages AS
SELECT "Message".id,
    "Message"."channelId",
    "Message".body,
    "Message".meta,
    json_build_object(
        'id',
        "User".id,
        'name',
        "User".name,
        'image',
        "User".image
    ) AS "user",
    "Message"."createdAt"
FROM (
        "Message"
        JOIN "User" ON (("Message"."userId" = "User".id))
    )
ORDER BY "Message"."createdAt";

ALTER VIEW channels
SET (security_invoker = ON);

ALTER VIEW messages
SET (security_invoker = ON);

ALTER publication supabase_realtime
ADD TABLE "Channel";

ALTER publication supabase_realtime
ADD TABLE "Message";

CREATE policy "allow access to own channels" ON "Channel" AS permissive FOR
SELECT TO authenticated USING (
        (
            auth.uid() IN (
                SELECT "Member"."userId"
                FROM "Member"
                WHERE ("Member"."channelId" = "Channel".id)
            )
        )
    );

CREATE policy "allow access to all members" ON "Member" AS permissive FOR
SELECT TO authenticated USING (TRUE);

CREATE policy "allow access to own messages" ON "Message" AS permissive FOR
SELECT TO authenticated USING (
        (
            auth.uid() IN (
                SELECT "Member"."userId"
                FROM "Member"
                WHERE ("Member"."channelId" = "Message"."channelId")
            )
        )
    );

CREATE policy "allow access to all users" ON "User" AS permissive FOR
SELECT TO authenticated USING (TRUE);

CREATE policy "allow insert access to own images" ON "storage"."objects" AS permissive FOR
INSERT TO authenticated WITH CHECK (
        (
            (bucket_id = 'images'::text)
            AND (auth.uid() = owner)
        )
    );

CREATE policy "allow read access to all images" ON "storage"."objects" AS permissive FOR
SELECT TO authenticated USING ((bucket_id = 'images'::text));

CREATE policy "allow select access to own images" ON "storage"."objects" AS permissive FOR
SELECT TO authenticated USING (
        (
            (bucket_id = 'images'::text)
            AND (auth.uid() = owner)
        )
    );

CREATE policy "allow update access to own images" ON "storage"."objects" AS permissive FOR
UPDATE TO authenticated USING (
        (
            (bucket_id = 'images'::text)
            AND (auth.uid() = owner)
        )
    );