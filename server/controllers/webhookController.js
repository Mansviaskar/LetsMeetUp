import { verifyWebhook } from "@clerk/express/webhooks"
import { sql } from "../config/db.js";

export const handleClerkWebhook = async (req, res) => {
    try {
        const evt = await verifyWebhook(req)

        const eventType = evt.type;
        const data = evt.data;

        switch (eventType) {
            case "user.created": {
                const userId = data.id;
                const primaryEmail = data.email_addresses?.[0]?.email_address || "";
                const name = `${data.first_name || "User"} ${data.last_name}`.trim();
                const image = data.image_url || "";
                const plan = "free";

                await sql`
                INSERT INTO users (id, name, email, image, plan)
                VALUES (${userId}, ${name}, ${primaryEmail}, ${image}, ${plan})
                 ON CONFLICT (id) DO UPDATE SET
                 id = EXCLUDED.id,
                 name = EXCLUDED.name,
                 image = EXCLUDED.image,
                 plan = EXCLUDED.plan,
                 updated_at = NOW()`;
                 break;
            }

            case "user.updated": {
                const userId = data.id;
                const primaryEmail = data.email_addresses?.[0]?.email_address || "";
                const name = `${data.first_name || "User"} ${data.last_name}`;
                const image = data.image_url || "";

                await sql`
                INSERT INTO users (id, name, email, image)
                VALUES (${userId}, ${name}, ${primaryEmail}, ${image})
                 ON CONFLICT (id) DO UPDATE SET
                 id = EXCLUDED.id,
                 name = EXCLUDED.name,
                 image = EXCLUDED.image,
                 updated_at = NOW()`;
                 break;
            }

            case "user.deleted": {
                const userId = data.id;
                if(userId){
                    await sql`DELETE FROM users WHERE id = ${userId}`;
                }
                break;
            }

            default:
                console.log(`Unhandled Clerk webhook event type: ${eventType}`);
        }
        return res.status(200).json({ success: true, eventType });
    } catch (error) {
        console.error("Error verifying Clerk webhook:", error.message || error);
        return res.status(400).json({ error: "Webhook verification failed: "+(error.message || error)});
    }
}

/*
import { verifyWebhook } from "@clerk/express/webhooks";
import { sql } from "../config/db.js";

export const handleClerkWebhook = async (req, res) => {
    console.log("======================================");
    console.log("🔥 CLERK WEBHOOK RECEIVED");
    console.log("======================================");

    try {
        // Verify Clerk webhook
        const evt = await verifyWebhook(req);

        console.log("✅ WEBHOOK VERIFIED");
        console.log("Event type:", evt.type);

        const eventType = evt.type;
        const data = evt.data;

        // =====================================
        // USER CREATED
        // =====================================
        switch (eventType) {

            case "user.created": {

                console.log("👤 USER CREATED EVENT");

                const userId = data.id;

                const primaryEmail =
                    data.email_addresses?.[0]?.email_address || "";

                const name =
                    `${data.first_name || "User"} ${data.last_name || ""}`.trim();

                const image = data.image_url || "";

                const plan = "free";

                console.log("User information:");
                console.log({
                    userId,
                    primaryEmail,
                    name,
                    image,
                    plan,
                });

                // Insert user into Neon
                const result = await sql`
                    INSERT INTO users (
                        id,
                        name,
                        email,
                        image,
                        plan
                    )
                    VALUES (
                        ${userId},
                        ${name},
                        ${primaryEmail},
                        ${image},
                        ${plan}
                    )
                    ON CONFLICT (email)
                    DO UPDATE SET
                        id = EXCLUDED.id,
                        name = EXCLUDED.name,
                        image = EXCLUDED.image,
                        updated_at = NOW()
                    RETURNING *
                `;

                console.log("======================================");
                console.log("✅ USER SAVED TO NEON");
                console.log(result);
                console.log("======================================");

                break;
            }

            // =====================================
            // USER UPDATED
            // =====================================
            case "user.updated": {

                console.log("✏️ USER UPDATED EVENT");

                const userId = data.id;

                const primaryEmail =
                    data.email_addresses?.[0]?.email_address || "";

                const name =
                    `${data.first_name || "User"} ${data.last_name || ""}`.trim();

                const image = data.image_url || "";

                console.log("Updated user information:");
                console.log({
                    userId,
                    primaryEmail,
                    name,
                    image,
                });

                const result = await sql`
                    UPDATE users
                    SET
                        name = ${name},
                        email = ${primaryEmail},
                        image = ${image},
                        updated_at = NOW()
                    WHERE id = ${userId}
                    RETURNING *
                `;

                console.log("✅ USER UPDATED IN NEON");
                console.log(result);

                break;
            }

            // =====================================
            // USER DELETED
            // =====================================
            case "user.deleted": {

                console.log("🗑️ USER DELETED EVENT");

                const userId = data.id;

                if (userId) {

                    const result = await sql`
                        DELETE FROM users
                        WHERE id = ${userId}
                        RETURNING *
                    `;

                    console.log("✅ USER DELETED FROM NEON");
                    console.log(result);
                }

                break;
            }

            // =====================================
            // OTHER EVENTS
            // =====================================
            default: {

                console.log(
                    `⚠️ Unhandled Clerk event: ${eventType}`
                );

                break;
            }
        }

        // Send success response to Clerk
        return res.status(200).json({
            success: true,
            eventType,
        });

    } catch (error) {

        console.error("======================================");
        console.error("❌ CLERK WEBHOOK ERROR");
        console.error("======================================");

        console.error(error);
        console.error(error.message);
        console.error(error.stack);

        return res.status(400).json({
            success: false,
            error: error.message || "Webhook verification failed",
        });
    }
};
*/