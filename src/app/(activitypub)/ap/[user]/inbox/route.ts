import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { api } from "@/lib/api";
import { getSignatureHeader, verifySignature } from "@/lib/activitypub/verify";
import { fetchActor } from "@/lib/activitypub/fetch-actor";
import { acceptFollow } from "@/lib/activitypub/follow";

export async function POST(req: NextRequest, props: { params: Promise<{ user: string }> }) {
    const params = await props.params;
    const { user } = params;

    if(user !== process.env.USER_NAME) {
        return NextResponse.json({ error: "Resource not found" }, { status: 404 });
    }

    const activity = await req.json();

    const keyId = getSignatureHeader(req).keyId;
    const actor = await fetchActor(keyId);

    const isVerified = await verifySignature(req, user);

    if(!isVerified) {
        console.log('Signature verification failed');
        return NextResponse.json({ error: "Signature verification failed" }, { status: 400 });
    }

    if (activity.type === "Follow") {
        try {
            const checkActor = await api.getRemoteUser(keyId);
            if(checkActor) {
                return NextResponse.json({ error: "Actor already exists" }, { status: 400 });
            }

            await api.createRemoteUser(keyId, actor.inbox, actor.sharedInbox);
            await acceptFollow(actor.inbox, activity);

            return NextResponse.json({ message: "Follow activity processed" });
        } catch (error) {
            console.error(error);
            return NextResponse.json({ error: "Failed to create remote user" }, { status: 500 });
        }
    } else if (activity.type === "Undo" && activity.object.type === "Follow") {
        const actor = await api.getRemoteUser(keyId);
        if(!actor) {
            return NextResponse.json({ error: "Actor not found" }, { status: 400 });
        }

        await api.deleteRemoteUser(keyId);
        return NextResponse.json({ message: "Unfollow activity processed" });
    }

    return NextResponse.json({ error: "Unsupported activity type" }, { status: 400 });
}