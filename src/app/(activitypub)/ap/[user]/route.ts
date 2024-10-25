import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getKeyPair } from "@/lib/key";

export async function GET(req: NextRequest, props: { params: Promise<{ user: string }> }) {
    const params = await props.params;
    const { user } = params;
    const username = process.env.USER_NAME;

    if(user !== username) {
        return NextResponse.json({ error: "Resource not found" }, { status: 404 });
    }

    const domain = process.env.SITE_URL;
    const key = await getKeyPair();
    const publicKey = key.publicKey;

    const header = new Headers();
    header.set("Content-Type", "application/activity+json");

    const actor = {
        "@context": "https://www.w3.org/ns/activitystreams",
        "id": `https://${domain}/ap/${user}`,
        "type": "Person",
        "name": "聖光学院生徒会",
        "preferredUsername": user,
        "summary": "聖光学院のニュースを配信します",
        "icon": {
            "mediaType": "image/jpg",
            "type": "Image",
            "url": `https://${domain}/icon.jpg`
        },
        "inbox": `https://${domain}/ap/${user}/inbox`,
        "outbox": `https://${domain}/ap/${user}/outbox`,
        // "followers": `https://${domain}/ap/${user}/followers`,
        // "following": `https://${domain}/ap/${user}/following`,
        "publicKey": {
            "id": `https://${domain}/ap/${user}#main-key`,
            "owner": `https://${domain}/ap/${user}`,
            "publicKeyPem": publicKey,
            "type": "key"
        }
    };

    return NextResponse.json(actor, { headers: header, status: 200 });
}