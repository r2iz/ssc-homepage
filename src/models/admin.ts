import { Post } from "@prisma/client";

export type AdminApi = {
    posts: Post[],
    postsCount: number,
    draftPosts: Post[],
    draftPostsCount: number,
    publishedPosts: Post[]
}