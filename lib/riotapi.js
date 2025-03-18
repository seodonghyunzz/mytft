export default async function getDataFetch(endpoint) {
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    endpoint = endpoint+API_KEY

    await new Promise(resolve => setTimeout(resolve, 100));

    const response = await fetch(endpoint)
    if (!response.ok) {
        throw new Error(`Failed to fetch ${endpoint} data: ${response.status} ${response.statusText}`);
    }
    const rankData = await response.json();
    
    const summonerResponses = await Promise.all(rankData.entries.slice(0,20).map(async(item) => {
        try {
            const response =  await fetch(`https://kr.api.riotgames.com/tft/summoner/v1/summoners/${item.summonerId}?api_key=${API_KEY}`)
            if (!response.ok) {
                throw new Error(`Failed to fetch summoner data for ${item.summonerId}: ${response.status}`);
            }
            return await response.json() 
        } catch (error) {
            console.error(error);
            return null;
        }
    }));
    
    const summonerPuuidResponses = await Promise.all(summonerResponses.map(async(item) => {
        try {
            const response =  await fetch(`https://americas.api.riotgames.com/riot/account/v1/accounts/by-puuid/${item.puuid}?api_key=${API_KEY}`)
            if (!response.ok) {
                console.error(`Failed to fetch PUUID data for ${item.puuid}: ${response.status}`);
                return null;
              }
            return await response.json()
        } catch (error) {
            console.error(error);
            return null;
        }
    }));
    
    
    const data = rankData.entries.slice(0,10).map((item,index) => {
        return {...item, ...summonerPuuidResponses[index]}
    });
    return data
 }