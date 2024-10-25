import { fetchActor } from "@/lib/activitypub/fetch-actor";
import crypto from "node:crypto";

export function getSignatureHeader(req: Request) {
    const signatureHeader = req.headers.get('signature')?.split(',')
        .map(pair => pair.split('=').map(value => value.replace(/^"|"$/g, '')))
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    let keyId: string;
    let headers: string;
    let signature: string;

    if (signatureHeader && typeof signatureHeader === 'object' && 'keyId' in signatureHeader && 'headers' in signatureHeader && 'signature' in signatureHeader) {
        keyId = signatureHeader.keyId as string;
        headers = signatureHeader.headers as string;
        signature = signatureHeader.signature as string;
    } else {
        throw new Error("Invalid signature header");
    }

    return { keyId, headers, signature };
}

export async function verifySignature(req: Request, user: string) {
    const signatureHeader = getSignatureHeader(req);

    const { keyId, headers, signature } = signatureHeader;

    const actor = await fetchActor(keyId);
    const publicKeyPem = actor.publicKey.publicKeyPem;
    const publicKey = crypto.createPublicKey(publicKeyPem);

    const comparisonString = headers.split(' ').map((signedHeaderName) => {
        if (signedHeaderName === '(request-target)') {
            return `(request-target): post /ap/${user}/inbox`;
        } else {
            return `${signedHeaderName}: ${req.headers.get(signedHeaderName)}`;
        }
    }).join('\n');

    const isVerified = crypto.verify(
        'sha256',
        Buffer.from(comparisonString),
        publicKey,
        Buffer.from(signature, 'base64')
    );

    return isVerified;
}