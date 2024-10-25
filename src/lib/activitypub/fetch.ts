import * as crypto from "node:crypto";
import { PrivateKey } from "@/models/key";
import { Sha256Signer } from "activitypub-http-signatures";

interface FetchOptions {
    method?: string;
    headers?: Record<string, string>;
    body?: string;
}

export async function signedFetch(url: string, key: PrivateKey, options: FetchOptions) {
    const digest = options.body ?
        `SHA-256=${crypto.createHash("sha256").update(options.body).digest("base64")}`
        : null;
    const headerNames = ["(request-target)", "host", "date", ...(digest ? ["digest"] : [])];
    const headers: Record<string, string> = {
        ...options.headers,
        ...(digest ? { digest } : {}),
    };

    const privateKey = key.privateKeyPem;
    const publicKeyId = key.keyId;

    const method = options.method || "GET";
    const signer = new Sha256Signer({
        publicKeyId,
        privateKey,
        headerNames,
    });

    const signature = signer.sign({ url, method, headers });
    return await fetch(url, {
        ...options,
        headers: new Headers({
            ...headers,
            signature,
            accept: "application/ld+json",
        }),
    });
}