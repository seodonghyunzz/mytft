import getPuuidFetch from "@/lib/puuidApi";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const gameName = searchParams.get("gameName");
    const gameTag = searchParams.get("gameTag");
    
    try {
        if(!gameName || !gameTag) return;
        const data = await getPuuidFetch(gameName, gameTag);
        
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