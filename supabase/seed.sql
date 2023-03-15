ALTER TABLE "Building" enable ROW LEVEL SECURITY;

ALTER TABLE "User" enable ROW LEVEL SECURITY;

ALTER TABLE "Notification" enable ROW LEVEL SECURITY;

ALTER TABLE "Resident" enable ROW LEVEL SECURITY;

ALTER TABLE "Post" enable ROW LEVEL SECURITY;

ALTER TABLE "Comment" enable ROW LEVEL SECURITY;

ALTER TABLE "Like" enable ROW LEVEL SECURITY;

ALTER TABLE "Channel" enable ROW LEVEL SECURITY;

ALTER TABLE "Member" enable ROW LEVEL SECURITY;

ALTER TABLE "Message" enable ROW LEVEL SECURITY;

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
                        'userId',
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

ALTER VIEW channels
SET (security_invoker = ON);

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