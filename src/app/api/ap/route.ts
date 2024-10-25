import { getAllRemoteUsers } from "@/lib/api";
import { createPost } from "@/lib/activitypub/deliver-post";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET() {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const users = await getAllRemoteUsers();
    return NextResponse.json(users, { status: 200 });
}

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    type RequestBody = {
        newsId: number,
        title: string,
        content: string,
    }

    const requestBody: RequestBody = await req.json();

    try {
        await createPost(requestBody.newsId, requestBody.content);
        return NextResponse.json({ message: "Post created" }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ message: e }, { status: 400 });
    }
}
