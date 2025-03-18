'use client'
import { useState , useEffect } from "react"
import { useRouter } from "next/navigation"
import MatchCount from "./matchCount";
export default function MatchData( { puuid } ) {
    const router = useRouter();
    const [matchData, setMatchData] = useState([]);
    const [matchDetails, setMatchDetails] = useState([]);
    const [placement,setPlacement] = useState([]);
    useEffect(() => {
        const fetchMatchData = async () => {
            if (!puuid) return;
            try {
                const response = await fetch(`/api/fetchMatchData?puuid=${puuid}`)
                if (!response.ok) {
                    throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`)
                }
                const data = await response.json();
                setMatchData(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchMatchData();
    }, [puuid])
    useEffect(() => {
        const fetchMatchDetails = async () => {
            if (!matchData) return;
            try {
                const matchDetailPromises = matchData.map(async (matchId) => {
                    const response = await fetch(`/api/fetchMatchDetails?matchId=${matchId}`)
                    if (!response.ok) {
                        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`)
                    }
                    return await response.json();
                });
                Promise.all(matchDetailPromises).then((matchDetails) => {
                    setMatchDetails(matchDetails);
                })              
            } catch (error) {
                console.error(error);
            }
        }
        fetchMatchDetails();
    }, [matchData])
    const calculateDate = (timestamp) => {
        const date = new Date(timestamp); 
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        
        return `${year}-${month}-${day}`;

    }
    const routeToSearch = (searchText) => {      
        router.push(`/search?query=${searchText}`);
    }
    return (
        <div>
            <div className="current_match_container">
                <div className="current_match_card">
                    <div className="match_count">
                        <p>Last 20 matches</p>
                        <MatchCount matchDetails={matchDetails} puuid={puuid}/>
                    </div>
                    
                </div>
            </div>
            <div className="match_details_container">
                <ul>
                {matchDetails.map((detail, index) => (               
                <li key={index}>                   
                    <ul>                   
                        {detail.info.participants
                            .filter((participant) => participant.puuid === puuid)
                            .map((participant, idx) => (
                                <li key={idx}>
                                    <div className="match_details_header">
                                        <p>{calculateDate(detail.info.game_datetime)}</p>
                                    </div>
                                    <div className="match_details_info">
                                        <div className={`placement placement-${participant.placement}`}>
                                            <p>#{participant.placement}</p>
                                        </div>
                                        <div className="traits" >
                                            {participant.traits
                                            .filter((trait) => trait.tier_current !== 0)
                                            .map((trait, idx) => ({
                                                ...trait,
                                                style: trait.tier_total == 1 ? 6 : trait.style
                                            }))
                                            .sort((a, b) => b.style - a.style)
                                            .map((trait, idx) => (                                             
                                                <div className={`traits_style style-${trait.style}`} key={idx}>
                                                <img src={`/traits/${trait.name}.svg`}></img>
                                                </div>
                                            ))}
                                        </div>
                                        
                                        <div className="champion_name">
                                            {participant.units.map((champion, idx) => (
                                                <div key={idx} className="champion_profile_box">
                                                    <div className="champion_tier">   
                                                            {[...Array(champion.tier)].map((_, index) => (
                                                                <span key={index}>⭐</span>
                                                              ))}
                                                    </div>
                                                    <div className={`champion_icon rarity-${champion.rarity}`} >          
                                                        {(champion.rarity === 8) ?        
                                                        <img src={`https://raw.communitydragon.org/latest/game/assets/ux/tft/championsplashes/patching/${champion.character_id.toLowerCase()}_teamplanner_splash_evolved.png`} alt={champion.character_id}/> 
                                                        : (champion.rarity === 9) ?
                                                        <img src="/champion/sion.png" alt="sion"/>
                                                        :<img src={`https://raw.communitydragon.org/latest/game/assets/ux/tft/championsplashes/patching/${champion.character_id.toLowerCase()}_teamplanner_splash.png`} alt={champion.character_id}/> 
                                                    }
                                                    </div>
                                                    <div className="champion_item">
                                                        {champion.itemNames
                                                            .filter((item) => item !== "TFT_Item_EmptyBag").
                                                            map((item, idx) => (
                                                            <img key={idx} src={`/item/${item}.png`} alt={item} width={17} height={17}/>
                                                        ))}
                                                    </div>
                                                </div>
                                           ))}
                                        </div>
                                        <div className="participants">
                                            <ul>
                                               {detail.info.participants.map((participant, idx) => (
                                                   <li key={idx}>
                                                       <span onClick={() => routeToSearch(participant.riotIdGameName+"#"+participant.riotIdTagline)}>{participant.riotIdGameName}</span>
                                                   </li>
                                               ))}
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                            ))}
                    </ul>
                </li>
                 ))}
                </ul>
            </div>
    </div>
    )
}