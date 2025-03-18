export default async function getMatchDetailsFetch(matchId) {
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    const endpoint = `https://asia.api.riotgames.com/tft/match/v1/matches/${matchId}?api_key=${API_KEY}`
    
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const response = await fetch(endpoint)
    if (!response.ok) {
        throw new Error(`Failed to fetch ${endpoint} data: ${response.status} ${response.statusText}`);
    }
    const data = await response.json(); 
    return data;
}