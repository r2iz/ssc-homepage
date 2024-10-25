import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const resource = searchParams.get('resource');
    const domain = process.env.SITE_URL;
    const userName = process.env.USER_NAME;
    const username_lower = userName?.toLowerCase();

    if (resource === `acct:${userName}@${domain}` || resource === `acct:@${userName}@${domain}` || resource === `acct:${username_lower}@${domain}` || resource === `acct:@${username_lower}@${domain}`) {
        return NextResponse.json({
            subject: `acct:${userName}@${domain}`,
            links: [
                {
                    rel: "self",
                    type: "application/activity+json",
                    href: `https://${domain}/ap/${userName}`
                }
            ]
        });
    }

    return NextResponse.json({ error: "Resource not found" }, { status: 404 });
}
