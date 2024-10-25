"use client";

import { useEffect, useState } from "react";
import { AdminApiRequest } from "@/lib/request";
import { Button } from "@/components/ui/button";
import { PlusCircle, X, Pencil } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { User } from "@prisma/client";

export default function UsersPage() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [email, setEmail] = useState("");
    const [selectedUser, setSelectedUser] = useState(null as User | null);
    const [users, setUsers] = useState([] as User[]);
    const [refresh, setRefresh] = useState(false);

    // Fetch users from the API
    useEffect(() => {
        const users = AdminApiRequest.getUsers();
        users.then((res) => {
            setUsers(res);
        });
    }, [refresh]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (editMode && selectedUser) {
            await AdminApiRequest.updateUser(selectedUser.id, email);
        } else {
            await AdminApiRequest.createUser(email);
        }

        setIsFormOpen(false);
        setEmail("");
        setSelectedUser(null);
        setEditMode(false);
        setRefresh(!refresh);
    };

    const handleEditUser = (user: User) => {
        setEditMode(true);
        setEmail(user.email);
        setSelectedUser(user);
        setIsFormOpen(true);
    };

    const handleDeleteUser = async (userId: number) => {
        await AdminApiRequest.deleteUser(userId);
        const updatedUsers = users.filter((user) => user.id !== userId);
        setUsers(updatedUsers);
    };

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold">ユーザー管理</h1>
                <Button
                    onClick={() => {
                        setEditMode(false);
                        setEmail("");
                        setIsFormOpen(true);
                    }}
                >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    新規ユーザー
                </Button>
            </div>

            <div className="space-y-4">
                {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between">
                        <div>
                            <p>{user.email}</p>
                        </div>
                        <div className="flex space-x-2">
                            <Button variant="ghost" size="icon" onClick={() => handleEditUser(user)}>
                                <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteUser(user.id)} // Corrected the delete function syntax
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-bold">
                                {editMode ? "ユーザーを編集" : "新規ユーザー作成"}
                            </h2>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsFormOpen(false)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">メールアドレス</Label>
                                <Input
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="管理ページにアクセス可能なメールを入力"
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                {editMode ? "更新" : "作成"}
                            </Button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
