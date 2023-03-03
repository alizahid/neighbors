-- view: channels
CREATE OR REPLACE VIEW channels WITH (security_invoker) AS
SELECT "Channel".id,
    "Channel".message,
    COALESCE("Member".members, '[]') AS members,
    "Channel"."updatedAt"
FROM "Channel"
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
        FROM "Member"
            INNER JOIN "User" ON "User".id = "Member"."userId"
        WHERE "Member"."channelId" = "Channel".id
    ) "Member" ON TRUE
ORDER BY "Channel"."updatedAt" DESC;

-- view: messages
CREATE OR REPLACE VIEW messages WITH (security_invoker) AS
SELECT "Message".id,
    "Message"."channelId",
    "Message".body,
    "Message".meta,
    json_build_object(
        'id',
        "User"."id",
        'name',
        "User".name,
        'image',
        "User".image
    ) AS user,
    "Message"."createdAt"
FROM "Message"
    INNER JOIN "User" ON "Message"."userId" = "User".id
ORDER BY "Message"."createdAt";