
import Ranktable from "./ranktable";
export default async function ranking() {
    const Challenger_Data = await getChallenger();
    const Grandmaster_Data = await getGrandmaster();
    const Master_Data = await getMaster();
    return ( 
        <Ranktable Challenger_Data={Challenger_Data} Grandmaster_Data={Grandmaster_Data} Master_Data={Master_Data}/>
    );
}

export async function getChallenger() {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY
  const response = await fetch(`https://kr.api.riotgames.com/tft/league/v1/challenger?queue=RANKED_TFT&api_key=${API_KEY}`)
  const rankData = await response.json();
    
    const summonerIds = rankData.entries.map((item) => {
      const summonerId = item.summonerId;
      const response = fetch(`https://kr.api.riotgames.com/tft/summoner/v1/summoners/${summonerId}?api_key=${API_KEY}`)
      return response
    });
    const summonerResponses = await Promise.all(summonerIds);
    const summonerData = await Promise.all(summonerResponses.map(response => response.json()));

    const summonerPuuids = summonerData.map((item) => {
      const puuid = item.puuid;
      const response = fetch(`https://americas.api.riotgames.com/riot/account/v1/accounts/by-puuid/${puuid}?api_key=${API_KEY}`)
      return response
    });
    const summonerPuuidResponses = await Promise.all(summonerPuuids);
    const summonerPuuidData = await Promise.all(summonerPuuidResponses.map(response => response.json()));
    
    const data = rankData.entries.map((item,index) => {
        return {...item, ...summonerPuuidData[index]}
    });
    return data
}
export async function getGrandmaster() {
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY
    const response = await fetch(`https://kr.api.riotgames.com/tft/league/v1/grandmaster?queue=RANKED_TFT&api_key=${API_KEY}`)
    const rankData = await response.json();
    
    const summonerIds = rankData.entries.map((item) => {
      const summonerId = item.summonerId;
      const response = fetch(`https://kr.api.riotgames.com/tft/summoner/v1/summoners/${summonerId}?api_key=${API_KEY}`)
      return response
    });
    const summonerResponses = await Promise.all(summonerIds);
    const summonerData = await Promise.all(summonerResponses.map(response => response.json()));

    const summonerPuuids = summonerData.map((item) => {
      const puuid = item.puuid;
      const response = fetch(`https://americas.api.riotgames.com/riot/account/v1/accounts/by-puuid/${puuid}?api_key=${API_KEY}`)
      return response
    });
    const summonerPuuidResponses = await Promise.all(summonerPuuids);
    const summonerPuuidData = await Promise.all(summonerPuuidResponses.map(response => response.json()));
    
    const data = rankData.entries.map((item,index) => {
        return {...item, ...summonerPuuidData[index]}
    });
    return data
  }
  export async function getMaster() {
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY
    const response = await fetch(`https://kr.api.riotgames.com/tft/league/v1/master?queue=RANKED_TFT&api_key=${API_KEY}`)
    const rankData = await response.json();
    
    const summonerIds = rankData.entries.map((item) => {
      const summonerId = item.summonerId;
      const response = fetch(`https://kr.api.riotgames.com/tft/summoner/v1/summoners/${summonerId}?api_key=${API_KEY}`)
      return response
    });
    const summonerResponses = await Promise.all(summonerIds);
    const summonerData = await Promise.all(summonerResponses.map(response => response.json()));

    const summonerPuuids = summonerData.map((item) => {
      const puuid = item.puuid;
      const response = fetch(`https://americas.api.riotgames.com/riot/account/v1/accounts/by-puuid/${puuid}?api_key=${API_KEY}`)
      return response
    });
    const summonerPuuidResponses = await Promise.all(summonerPuuids);
    const summonerPuuidData = await Promise.all(summonerPuuidResponses.map(response => response.json()));
    
    const data = rankData.entries.map((item,index) => {
        return {...item, ...summonerPuuidData[index]}
    });
    return data
  }