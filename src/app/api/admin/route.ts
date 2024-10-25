import { api } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { AdminApi } from "@/models/admin";

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    try {
        const post = await api.createPost(data);
        return NextResponse.json(post, { status: 201 });
    }
    catch (e) {
        return NextResponse.json({ message: e }, { status: 400 });
    }
}

export async function GET() {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const posts = await api.getPosts();
    const postsCount = await api.getPostCount();
    const draftPosts = await api.getDraftPosts();
    const draftPostsCount = await api.getDraftPostCount();
    const publishedPosts = await api.getPublishedPosts();

    const response: AdminApi = {
        posts: posts,
        postsCount: postsCount,
        draftPosts: draftPosts,
        draftPostsCount: draftPostsCount,
        publishedPosts: publishedPosts
    }

    return NextResponse.json(response);
}

export async function PUT(req: NextRequest) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    try {
        const post = await api.updatePost(data.id,data);
        return NextResponse.json(post, { status: 200 });
    }
    catch (e) {
        return NextResponse.json({ message: e }, { status: 400 });
    }
}

export async function DELETE(req: NextRequest) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    try {
        const post = await api.deletePost(data.id);
        return NextResponse.json(post, { status: 200 });
    }
    catch (e) {
        return NextResponse.json({ message: e }, { status: 400 });
    }
}
