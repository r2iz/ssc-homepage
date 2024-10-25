import { signedFetch } from "@/lib/activitypub/fetch";
import { getKeyPair } from "@/lib/key";
import { api } from "@/lib/api";
import { PrivateKey } from "@/models/key";

type createActivity = {
    "@context": string,
    type: string | "Create",
    id: string,
    actor: string,
    object: object,
}

type deleteActivity = {
    "@context": string,
    type: string | "Delete",
    actor: string,
    object: string,
}

type noteActivity = {
    "@context": string,
    type: string,
    id: string,
    attributedTo: string,
    content: string,
    published: string,
    to: string[],
}

export async function createPost(newsId: number, content: string) {

    const postContent = "新しいニュースが投稿されました！\n" + content + "\n\n" + "https://" + process.env.SITE_URL + "/news/" + newsId;

    const key = await getKeyPair()
    const note: noteActivity = {
        "@context": "https://www.w3.org/ns/activitystreams",
        type: "Note",
        id: `https://${process.env.SITE_URL}/news/ap/${newsId}`,
        attributedTo: `https://${process.env.SITE_URL}/ap/${process.env.USER_NAME}`,
        content: postContent,
        published: new Date().toISOString(),
        to: ["https://www.w3.org/ns/activitystreams#Public"],
    }

    const create: createActivity = {
        "@context": "https://www.w3.org/ns/activitystreams",
        id: `https://${process.env.SITE_URL}/news/ap/${newsId}`,
        type: "Create",
        actor: `https://${process.env.SITE_URL}/ap/${process.env.USER_NAME}`,
        object: note,
    }

    const prisma = api.prisma;
    const remoteActors = await prisma.actor.findMany();

    const requestKey: PrivateKey = {
        keyId: `https://${process.env.SITE_URL}/ap/${process.env.USER_NAME}#main-key`,
        privateKeyPem: key.privateKey,
    }

    for (const actor of remoteActors) {
        const sentSharedInbox: string[] = [];
        if(actor.sharedInbox && !sentSharedInbox.includes(actor.sharedInbox)){
            await signedFetch(actor.sharedInbox, requestKey, {
                method: "POST",
                headers: {
                    "Content-Type": "application/ld+json",
                },
                body: JSON.stringify(create),
            });
            sentSharedInbox.push(actor.sharedInbox);
        } else{
            await signedFetch(actor.inbox, requestKey, {
                method: "POST",
                headers: {
                    "Content-Type": "application/ld+json",
                },
                body: JSON.stringify(create),
            });
        }
    }
}

export async function deletePost(newsId: number) {
    const key = await getKeyPair()
    const deleteActivity: deleteActivity = {
        "@context": "https://www.w3.org/ns/activitystreams",
        type: "Delete",
        actor: `https://${process.env.SITE_URL}/ap/${process.env.USER_NAME}`,
        object: `https://${process.env.SITE_URL}/news/${newsId}`,
    }

    const prisma = api.prisma;
    const remoteActors = await prisma.actor.findMany();

    const requestKey: PrivateKey = {
        keyId: `https://${process.env.SITE_URL}/ap/${process.env.USER_NAME}#main-key`,
        privateKeyPem: key.privateKey,
    }

    for (const actor of remoteActors) {
        await signedFetch(actor.inbox, requestKey, {
            method: "POST",
            headers: {
                "Content-Type": "application/ld+json",
            },
            body: JSON.stringify(deleteActivity),
        });
    }
}