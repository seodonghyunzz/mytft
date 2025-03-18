import getSummonerFetch from "@/lib/summonerApi";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const puuid = searchParams.get("puuid");

    try {
        if(!puuid) return;
        const data = await getSummonerFetch(puuid);
        
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