import { PrismaClient } from '@prisma/client';
import { generateKeyPairSync } from 'crypto';

const prisma = new PrismaClient();

export async function getKeyPair() {
    let keypair = await prisma.keypair.findFirst();
    if (!keypair) {
        console.log("generate keypair");
        const { publicKey, privateKey } = generateKeyPairSync("rsa", {
            modulusLength: 2048,
            publicKeyEncoding: {
                type: "spki",
                format: "pem",
            },
            privateKeyEncoding: {
                type: "pkcs8",
                format: "pem",
            },
        });
        keypair = await prisma.keypair.create({
            data: {
                keyId: `https://${process.env.SITE_URL}/ap/${process.env.USER_NAME}#main-key`,
                publicKey,
                privateKey,
            },
        });
    }
    return keypair;
}