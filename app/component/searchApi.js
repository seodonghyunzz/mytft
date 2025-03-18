'use client'
import { useEffect, useState } from "react";
import MatchData from "./matchData";
import SummonerProfileCard from "./summonerProfileCard";
export default function SearchApi( { gameName, gameTag } ) {
    const [puuid, setPuuid] = useState([]);
    const [summonerId, setSummonerId] = useState([]);
    const [profileIconId, setProfileIconId] = useState([]);
    const [summonerLevel, setSummonerLevel] = useState([]);

    useEffect(() => {
        const fetchPuuidData = async () => {
            if (!gameName || !gameTag) return;
            try {
                const response = await fetch(`/api/fetchPuuid?gameName=${gameName}&gameTag=${gameTag}`)
                if (!response.ok) {
                    throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                setPuuid(data.puuid);
            } catch (error) {
                console.error(error);
            }
        }
        fetchPuuidData();
    }, [gameName, gameTag]);

    useEffect(() => {
        const fetchSummonerData = async () => {
            if (!puuid) return;
            try {
                const response = await fetch(`/api/fetchSummoner?puuid=${puuid}`)
                const data = await response.json();
                
                setSummonerId(data.id);
                setProfileIconId(data.profileIconId);
                setSummonerLevel(data.summonerLevel);
            } catch (error) {
                console.log(error);
            }
        }
        fetchSummonerData();
    }, [puuid]);
    

    return (
        <div className="search_page">
            <section className="summoner_section">
                <SummonerProfileCard summonerId={summonerId} gameName={gameName} gameTag={gameTag} profileIconId={profileIconId} summonerLevel={summonerLevel} puuid={puuid}/>
            </section>
            <section className="match_section">
                <MatchData puuid={puuid}/>
            </section>
        </div>
    )
}

