import { getPostById } from '@/lib/api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const { id } = params;

    if (!id) {
        return { status: 400, data: { error: 'Bad request' } };
    }

    const post = await getPostById(Number(id));
    if (!post) {
        return { status: 404, data: { error: 'Resource not found' } };
    }

    const postContent = "新しいニュースが投稿されました！\n" + post.content + "\n\n" + "https://" + process.env.SITE_URL + "/news/" + id;

    const Note = {
        '@context': 'https://www.w3.org/ns/activitystreams',
        type: 'Note',
        id: `https://${process.env.SITE_URL}/news/${id}`,
        attributedTo: `https://${process.env.SITE_URL}/ap/${process.env.USER_NAME}`,
        content: postContent,
        published: new Date(post.createdAt).toISOString(),
        to: ['https://www.w3.org/ns/activitystreams#Public'],
    };
    return NextResponse.json(Note, { status: 200 });
}