import { FC, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

interface PostFormProps {
    isFormOpen: boolean;
    setIsFormOpen: (open: boolean) => void;
    editMode: boolean;
    title: string;
    setTitle: (title: string) => void;
    content: string;
    setContent: (content: string) => void;
    isPublished: boolean;
    setIsPublished: (published: boolean) => void;
    handleSubmit: (e: FormEvent) => void;
}

const PostForm: FC<PostFormProps> = ({
                                         isFormOpen,
                                         setIsFormOpen,
                                         editMode,
                                         title,
                                         setTitle,
                                         content,
                                         setContent,
                                         isPublished,
                                         setIsPublished,
                                         handleSubmit,
                                     }) => {
    if (!isFormOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold">
                        {editMode ? "記事を編集" : "新規記事作成"}
                    </h2>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsFormOpen(false)}
                    >
                        <X className="h-4 w-4" />
                        <span className="sr-only">閉じる</span>
                    </Button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">タイトル</Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="記事のタイトルを入力"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="content">内容</Label>
                        <Textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="記事の内容を入力"
                            required
                            rows={5}
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="published"
                            checked={isPublished}
                            onCheckedChange={setIsPublished}
                        />
                        <Label htmlFor="published">公開する</Label>
                    </div>
                    <Button type="submit" className="w-full">
                        {editMode ? "更新" : "投稿"}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default PostForm;
