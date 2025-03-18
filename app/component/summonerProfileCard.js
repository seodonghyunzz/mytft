'use client'
import {useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import { getFavorites,addFavorites, deleteFavorites } from "../firebase/firebase";

const tierImages = {
    "CHALLENGER": "/Emblem/Challenger_Emblem.png",
    "GRANDMASTER": "/Emblem/Grandmaster_Emblem.png",
    "MASTER": "/Emblem/Master_Emblem.png",
    "DIAMOND": "/Emblem/Diamond_Emblem.png",
    "EMERALD": "/Emblem/Emerald_Emblem.png",
    "PLATINUM": "/Emblem/Platinum_Emblem.png",
    "GOLD": "/Emblem/Gold_Emblem.png",
    "SILVER": "/Emblem/Silver_Emblem.png",
    "BRONZE": "/Emblem/Bronze_Emblem.png",
    "IRON": "/Emblem/Iron_Emblem.png",
    "UNRANKED": "/Emblem/Unranked_Emblem.png"
};



export default function SummonerProfileCard({summonerId, gameName, gameTag, profileIconId, summonerLevel,puuid}) {
    const [summonerProfileData, setSummonerProfileData] = useState(null);
    const [isFavorite, setIsFavorite] = useState("false")
    const router = useRouter();
    useEffect(() => {
            const fetchLegueData = async () => {
                if (!summonerId) {
                    return;
                }
                try {
                    const response = await fetch(`/api/fetchLegue?summonerId=${summonerId}`)
                    const data = await response.json();
                    setSummonerProfileData(data);
                } catch (error) {
                    console.log(error);
                }
            }
            fetchLegueData();
        }, [summonerId]);
        useEffect(() => {
            const fetchFavorites = async () => {
                try {
                    const data = await getFavorites();
                    setIsFavorite(data.some(item => item.puuid === puuid));
                } catch (error) {
                    console.error(error);
                }
            };
            fetchFavorites();
        },[puuid])
        const decodedGameTag = gameTag ? decodeURIComponent(gameTag) : null;
        const rankedData = summonerProfileData ? summonerProfileData?.find(item => item.queueType === "RANKED_TFT"): null;
        const tierEmblem = rankedData ? tierImages[rankedData?.tier] : tierImages["UNRANKED"] ;
        const profileIconsrc = `https://ddragon.leagueoflegends.com/cdn/13.17.1/img/profileicon/${profileIconId}.png`;
        const rank = rankedData ? rankedData?.tier : "UNRANKED";
        
        const toggleButton = async() => {
            if (!puuid) return;
            if ( isFavorite ){
                await deleteFavorites(puuid);
                setIsFavorite(false);
            } else {
                await addFavorites({gameName, gameTag, puuid, profileIconId, summonerLevel,rank});
                setIsFavorite(true);
            }
        }
        
    return (
        <div className="summonerProfileCard_container">
            <button className="summoner_favorites_btn" onClick={toggleButton}>{isFavorite? <img src="fullstar.png"/> : <img src="emptystar.png"/>}</button>
           {!summonerProfileData ? <p>Loading...</p> :
            <div className="summonerProfileCard">
                <div className="summonerName">
                    <div className="summonerProfileIconContainer">
                        <img 
                            src={profileIconsrc}  
                            className="summonerProfileIcon"
                        />
                        <div className="summonerLevelContainer">
                            <p>{summonerLevel}</p>
                        </div>
                    </div>
                    <p>{gameName}#</p> <p>{decodedGameTag}</p>
                </div>
                <div className="summonerRank">
                    <img src={tierEmblem} alt="tierEmblem" className="summonerRankEmblem"></img>
                    <p>{rankedData?.tier} {rankedData?.rank}</p>
                    <p>{rankedData?.leaguePoints}LP</p>
                </div>
                <div className="summonerWinRate">
                    <p>총 게임: {(rankedData?.wins + rankedData?.losses)}</p>
                    <p>Top 4: {rankedData?.wins}</p>
                    <p>Top 4(%): {(Math.round(rankedData?.wins/(rankedData?.wins + rankedData?.losses) * 10000))/100}%</p>
                </div>
            </div>
        }   
        </div>
    );
}