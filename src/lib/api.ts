import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const findPosts = async (published?: boolean, limit?: number) => {
    return prisma.post.findMany({
        where: published !== undefined ? { published } : undefined,
        orderBy: { createdAt: 'desc' },
        take: limit
    });
};

const countPosts = async (published?: boolean) => {
    return prisma.post.count({ where: published !== undefined ? { published } : undefined });
};

export const getPosts = () => findPosts();
export const getDraftPosts = () => findPosts(false);
export const getPublishedPosts = () => findPosts(true);
export const getRecentPosts = (limit: number) => findPosts(false, limit);

export const getPostCount = () => countPosts();
export const getDraftPostCount = () => countPosts(false);
export const getPublishedPostCount = () => countPosts(true);

export const createPost = async (data: { title: string; content: string; published: boolean }) => {
    return prisma.post.create({ data });
};

export const updatePost = async (id: number, data: { title: string; content: string; published: boolean }) => {
    return prisma.post.update({ where: { id }, data });
};

export const deletePost = async (id: number) => {
    return prisma.post.delete({ where: { id } });
};

export const getPostById = async (id: number) => {
    return prisma.post.findUnique({ where: { id } });
};

export const incrementPostView = async (id: number) => {
    return prisma.post.update({ where: { id }, data: { count: { increment: 1 } } });
};

export const getUserByEmail = (email: string) => prisma.user.findUnique({ where: { email } });
export const getAllUsers = () => prisma.user.findMany({ orderBy: { id: 'asc' } });

export const createUser = (email: string) => prisma.user.create({ data: { email } });
export const updateUser = (id: number, email: string) => prisma.user.update({ where: { id }, data: { email } });
export const deleteUser = (id: number) => prisma.user.delete({ where: { id } });

export const createRemoteUser = (keyid: string, inbox: string, sharedInbox?: string) =>
    prisma.actor.create({ data: { keyid, inbox, sharedInbox: sharedInbox || "" } });
export const getAllRemoteUsers = () => prisma.actor.findMany();
export const getRemoteUser = (keyid: string) => prisma.actor.findUnique({ where: { keyid } });
export const updateRemoteUser = (keyid: string, inbox: string, sharedInbox: string) =>
    prisma.actor.update({ where: { keyid }, data: { inbox, sharedInbox } });
export const deleteRemoteUser = (keyid: string) => prisma.actor.delete({ where: { keyid } });

export const api = {
    prisma,
    getPosts,
    getDraftPosts,
    getPublishedPosts,
    getRecentPosts,
    getPostCount,
    getDraftPostCount,
    getPublishedPostCount,
    createPost,
    updatePost,
    deletePost,
    getPostById,
    incrementPostView,
    getUserByEmail,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    createRemoteUser,
    getAllRemoteUsers,
    getRemoteUser,
    updateRemoteUser,
    deleteRemoteUser,
};
