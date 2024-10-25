import { NextResponse } from "next/server";

export function GET() {
    return NextResponse.json(
        {
            version: "2.1",
            software: {
                name: "聖光学院生徒会ホームページ",
                version: "0.0.0"
            },
            protocols: ["activitypub"],
            services: {
                inbound: [],
                outbound: []
            },
            openRegistrations: false,
            usage: {
                users: {
                    total: 1,
                    activeHalfyear: 1,
                    activeMonth: 1,
                },
            },
            metadata: {
                nodeDescription: "聖光学院生徒会ホームページ",
                nodeName: "SeikoStudentCouncil",
                tags: ["聖光学院", "生徒会"],
                uploadFilters: [],
            },
        }
    )
}