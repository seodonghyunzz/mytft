export default async function getLegueFetch(summonerId) {
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    const endpoint = `https://kr.api.riotgames.com/tft/league/v1/entries/by-summoner/${summonerId}?api_key=${API_KEY}`;
    const response = await fetch(endpoint);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${endpoint} data: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}