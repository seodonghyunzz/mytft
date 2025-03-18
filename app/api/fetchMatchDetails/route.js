import getMatchDetailsFetch from "@/lib/matchDetailsApi";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const matchId = searchParams.get("matchId");
    try {
        if(!matchId) return;
        const data = await getMatchDetailsFetch(matchId);
        
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}