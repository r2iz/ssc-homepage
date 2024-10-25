import { getPostById } from "@/lib/api";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

interface PostPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function Page(props: PostPageProps) {
    const params = await props.params;
    const post = await getPostById(Number(params.id));

    if (!post) {
        notFound();
    }

    if(post.published === false) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">{post.title}</h1>
            <p className="text-sm text-gray-600 mb-4">
                {new Date(post.createdAt).toLocaleDateString()}
            </p>
            <div className="prose">
                <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
        </div>
    );
}