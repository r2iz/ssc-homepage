import { AdminApi } from "@/models/admin";
import { Post } from "@prisma/client";

async function createPost(title: string, content: string, published:boolean) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content, published }),
    }
    const data = await fetch('/api/admin', options).then((res) => res.json());
    return data
}

async function getPosts(): Promise<AdminApi> {
    const req = await fetch('/api/admin')
    const data = await req.json();
    return data;
}

async function updatePost(id: number, title: string, content: string, published:boolean) {
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, title, content, published }),
    }
    const data = await fetch('/api/admin', options).then((res) => res.json());
    return data
}

async function deletePost(id: number) {
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
    }
    const data = await fetch('/api/admin', options).then((res) => res.json());
    return data
}

async function getUsers() {
    const req = await fetch('/api/users')
    const data = await req.json();
    return data;
}

async function createUser(email: string) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    }
    const data = await fetch('/api/users', options).then((res) => res.json());
    return data
}

async function updateUser(id: number, email: string) {
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, email }),
    }
    const data = await fetch('/api/users', options).then((res) => res.json());
    return data
}

async function deleteUser(id: number) {
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
    }
    const data = await fetch('/api/users', options).then((res) => res.json());
    return data
}

async function getRemoteUsers() {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const data = await fetch('/api/ap', options).then((res) => res.json());
    return data
}

async function createPostDeliver(newsId: number, title: string, content: string) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            newsId: newsId,
            title: title,
            content: content
        }),
    }
    const data = await fetch('/api/ap', options).then((res) => res.json());
    return data
}

export const AdminApiRequest = {
    createPost,
    getPosts,
    updatePost,
    deletePost,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    getRemoteUsers,
    createPostDeliver
};

async function getPublishedPosts(): Promise<Post[]> {
    return fetch('/api/posts').then((res) => res.json());
}

export const PostsApi = {
    getPublishedPosts
};