import { NextResponse } from "next/server";
import { api } from "@/lib/api";

export async function GET() {
    const publishedPosts = await api.getPublishedPosts();
    return NextResponse.json(publishedPosts);
}