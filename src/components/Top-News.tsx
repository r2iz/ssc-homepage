import { getRecentPosts } from "@/lib/api";
import Link from "next/link";

export default async function TopNews() {
    const posts = await getRecentPosts(2);

    return (
        <section className="bg-muted py-12 md:py-16 lg:py-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid gap-8">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">最新ニュース</h2>
                        <div className="mt-4">
                            <div className="grid gap-6">
                                {/* 最新のニュースを2件表示 */}
                                {posts.map((post, index) => (
                                    <Link href={`/news/${post.id}`} key={index}>
                                        <div className="rounded-lg p-6 hover:bg-gray-200 transition duration-300 cursor-pointer flex items-start gap-4 border-b border-gray-300">
                                            {/* タイトル */}
                                            <div className="flex-shrink-0 w-1/5">
                                                <h3 className="mb-2 text-xl font-semibold">{post.title}</h3>
                                                <p className="text-sm text-gray-600">
                                                    {new Date(post.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                            {/* コンテンツ */}
                                            <div className="flex-grow">
                                                <p>{post.content.substring(0, 100)}...</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}