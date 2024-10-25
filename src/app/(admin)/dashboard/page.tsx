"use client";
import { useEffect, useState } from "react";
import { AdminApiRequest } from "@/lib/request";
import Sidebar from "@/components/admin/Sidebar";
import Dashboard from "@/components/admin/Dashboard";
import PostForm from "@/components/admin/PostForm";
import UsersPage from "@/components/admin/Users";

import { Post } from "@prisma/client";

export default function BlogAdmin() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentPostId, setCurrentPostId] = useState<number | null>(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isPublished, setIsPublished] = useState(false);
    const [postCount, setPostCount] = useState(0);
    const [posts, setPosts] = useState<Post[]>([]);
    const [draftPostCount, setDraftPostCount] = useState(0);
    const [activeScreen, setActiveScreen] = useState("dashboard");
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const data = AdminApiRequest.getPosts();
        data.then((res) => {
            setPostCount(res.postsCount);
            setPosts(res.posts);
            setDraftPostCount(res.draftPostsCount);
        });
    }, [refresh]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const wasPublished = editMode && currentPostId
            ? posts.find((post) => post.id === currentPostId)?.published
            : false;

        try {
            if (editMode && currentPostId) {
                // 更新処理
                await AdminApiRequest.updatePost(currentPostId, title, content, isPublished);

                // 下書きから公開へ切り替わった場合
                if (wasPublished === false && isPublished === true) {
                    await AdminApiRequest.createPostDeliver(currentPostId,title,content); // ここで関数を発火
                }
            } else {
                // 新規投稿作成処理
                const newPostId = await AdminApiRequest.createPost(title, content, isPublished);

                // 新規投稿が公開された場合
                if (isPublished) {
                    await AdminApiRequest.createPostDeliver(newPostId.id,title, content); // 新しい投稿が公開された場合に発火
                }
            }

            // フォームをリセット
            setIsFormOpen(false);
            setTitle("");
            setContent("");
            setIsPublished(false);
            setEditMode(false);
            setCurrentPostId(null);
            setRefresh(!refresh);
        } catch (e) {
            console.error(e);
        }
    };

    const handleDeletePost = async (postId: number) => {
        try {
            await AdminApiRequest.deletePost(postId);
            setRefresh(!refresh);
        } catch (e) {
            console.error(e);
        }
    };

    const handleEditPost = (post: Post) => {
        setTitle(post.title);
        setContent(post.content);
        setIsPublished(post.published);
        setCurrentPostId(post.id);
        setEditMode(true);
        setIsFormOpen(true);
    };

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
            <main className="flex-1 overflow-y-auto p-6">
                {activeScreen === "dashboard" && (
                    <Dashboard
                        postCount={postCount}
                        draftPostCount={draftPostCount}
                        posts={posts}
                        handleEditPost={handleEditPost}
                        handleDeletePost={handleDeletePost}
                        setIsFormOpen={setIsFormOpen}
                    />
                )}
                {activeScreen === "users" && <UsersPage />}
                {/*{activeScreen === "settings" && <SettingsPage />}*/}
            </main>
            <PostForm
                isFormOpen={isFormOpen}
                setIsFormOpen={setIsFormOpen}
                editMode={editMode}
                title={title}
                setTitle={setTitle}
                content={content}
                setContent={setContent}
                isPublished={isPublished}
                setIsPublished={setIsPublished}
                handleSubmit={handleSubmit}
            />
        </div>
    );
}
