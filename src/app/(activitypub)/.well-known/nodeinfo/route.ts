import { NextResponse } from "next/server";

export function GET() {
    return NextResponse.json({
        links: [
            {
                rel: "http://nodeinfo.diaspora.software/ns/schema/2.1",
                href: "/.well-known/nodeinfo/2.1"
            }
        ]
    });
}
