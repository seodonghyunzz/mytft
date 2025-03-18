import getLegueFetch from "@/lib/summonerDetails";
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const summonerId = searchParams.get("summonerId");

    try {
        if (!summonerId) return;
        const data = await getLegueFetch(summonerId);

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