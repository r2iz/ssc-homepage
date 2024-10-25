import { NextRequest,NextResponse } from "next/server";
import { auth } from "@/auth";
import { api } from "@/lib/api";

export async function GET() {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const users = await api.getAllUsers()
    return NextResponse.json(users, { status: 201 });
}

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    try {
        const user = await api.createUser(data.email);
        return NextResponse.json(user, { status: 201 });
    }
    catch (e) {
        return NextResponse.json({ message: e }, { status: 400 });
    }
}

export async function PUT(req: NextRequest) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    try {
        const user = await api.updateUser(data.id,data.email);
        return NextResponse.json(user, { status: 200 });
    }
    catch (e) {
        return NextResponse.json({ message: e }, { status: 400 });
    }
}

export async function DELETE(req: NextRequest) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    try {
        const user = await api.deleteUser(data.id);
        return NextResponse.json(user, { status: 200 });
    }
    catch (e) {
        return NextResponse.json({ message: e }, { status: 400 });
    }
}