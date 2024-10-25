import { FC } from "react";
import { Post } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Menu, PlusCircle, X } from "lucide-react";

interface DashboardProps {
    postCount: number;
    draftPostCount: number;
    posts: Post[];
    handleEditPost: (post: Post) => void;
    handleDeletePost: (postId: number) => void;
    setIsFormOpen: (open: boolean) => void;
}

const Dashboard: FC<DashboardProps> = ({
                                           postCount,
                                           draftPostCount,
                                           posts,
                                           handleEditPost,
                                           handleDeletePost,
                                           setIsFormOpen,
                                       }) => (
    <div>
        <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold">記事管理</h1>
            <Button onClick={() => setIsFormOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                新規記事
            </Button>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="rounded-lg shadow-sm hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">総記事数</CardTitle>
                    <Menu className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{postCount}</div>
                </CardContent>
            </Card>
            <Card className="rounded-lg shadow-sm hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">下書き</CardTitle>
                    <PlusCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{draftPostCount}</div>
                </CardContent>
            </Card>
        </div>

        <h2 className="mb-4 text-xl font-semibold">最近の記事</h2>

        {posts.map((post, index) => (
            <div
                key={index}
                className="space-y-4 mb-1 cursor-pointer"
                onClick={() => handleEditPost(post)}
            >
                <div className="rounded-lg bg-white p-4 shadow-sm hover:shadow-lg transition-shadow">
                    <h3 className="mb-2 font-semibold">{post.title}</h3>
                    <p className="text-sm text-gray-600">{new Date(post.createdAt).toLocaleString("ja-JP")}</p>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDeletePost(post.id);
                        }}
                    >
                        <X className="h-4 w-4" />
                        <span className="sr-only">削除</span>
                    </Button>
                </div>
            </div>
        ))}
    </div>
);

export default Dashboard;
