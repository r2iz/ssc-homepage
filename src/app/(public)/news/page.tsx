import { getPublishedPosts } from "@/lib/api";
import Link from "next/link";

export default async function Page() {
    const posts = await getPublishedPosts();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">ニュース</h1>
            <div className="grid gap-6">
                {posts.map((post) => (
                    <Link key={post.id} href={`/news/${post.id}`}>
                        <div className="rounded-lg shadow p-4 hover:bg-gray-200 cursor-pointer">
                            <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                            <p className="text-sm text-gray-600 mb-4">
                                {new Date(post.createdAt).toLocaleDateString()}
                            </p>
                            <p>{post.content.substring(0, 50)}...</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}