import { getKeyPair } from "@/lib/key";
import { PrivateKey } from "@/models/key";
import { signedFetch } from "@/lib/activitypub/fetch";

export async function acceptFollow (inbox: string, activity: object) {
    const acceptActivity = {
        "@context": "https://www.w3.org/ns/activitystreams",
        type: "Accept",
        actor: `https://${process.env.SITE_URL}/ap/${process.env.USER_NAME}`,
        object: activity
    }
    const options = {
        method: "POST",
        body: JSON.stringify(acceptActivity),
        headers: {
            "Content-Type": "application/activity+json",
        }
    }

    const key = await getKeyPair();
    const requestKey: PrivateKey = {
        keyId: `https://${process.env.SITE_URL}/ap/${process.env.USER_NAME}#main-key`,
        privateKeyPem: key.privateKey
    }

    await signedFetch(inbox, requestKey, options);
}