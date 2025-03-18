import getMatchDataFetch from "@/lib/matchApi";
import { NextResponse } from "next/server";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const puuid = searchParams.get("puuid");

    try {
        if (!puuid) {
            return NextResponse.json(
                { error: "Missing 'puuid' parameter" },
                { status: 400 }
            );
        }
        const data = await getMatchDataFetch(puuid);

        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        console.error("Error in GET /api/fetchMatchData:", error);
        return NextResponse.json(
            { error: "Failed to fetch match data", details: error.message },
            { status: 500 }
        );
    }
}