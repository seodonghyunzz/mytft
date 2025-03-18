import getDataFetch from "@/lib/riotapi";
import Ranktable from "./ranktable";

export default async function Ranking() {
  try {
    const Challenger_Data = await getChallenger();
    if (Challenger_Data.length >= 10) {
      return <Ranktable Challenger_Data={Challenger_Data} Grandmaster_Data={[]} Master_Data={[]} />;
    }
    else if (Challenger_Data.length < 10) {
      const Grandmaster_Data = await getGrandmaster();

      if (Grandmaster_Data.length >= 10) {
        return <Ranktable Challenger_Data={Challenger_Data} Grandmaster_Data={Grandmaster_Data} Master_Data={[]} />; 
      }
      else if (Grandmaster_Data.length < 10) {
        const Master_Data = await getMaster();
        return <Ranktable Challenger_Data={Challenger_Data} Grandmaster_Data={Grandmaster_Data} Master_Data={Master_Data} />; 
      }
    }
  } catch (error) {
    console.error("Failed to fetch ranking data:", error);
    return <div>Error loading ranking data. Please try again later.</div>;
  }
}

export async function getChallenger() {
  const endpoint = "https://kr.api.riotgames.com/tft/league/v1/challenger?queue=RANKED_TFT&api_key=";
  return getDataFetch(endpoint)
}
export async function getGrandmaster() {
    const endpoint = "https://kr.api.riotgames.com/tft/league/v1/grandmaster?queue=RANKED_TFT&api_key="
    return getDataFetch(endpoint)
}
export async function getMaster() {
    const endpoint = "https://kr.api.riotgames.com/tft/league/v1/master?queue=RANKED_TFT&api_key="
    return getDataFetch(endpoint)
}
