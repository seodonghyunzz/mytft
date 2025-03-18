'use client'
import { getFavorites, deleteFavorites, addFavorites } from "../firebase/firebase";
import { useEffect, useState } from "react";

export default function Favorites() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const data = await getFavorites();
                setFavorites(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchFavorites();      
    }, []);
    
    const deleteFavoritesFunction = async (id) => {
        try {
            await deleteFavorites(id);
            const data = await getFavorites();
            setFavorites(data);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className="favorites">
            <p className="contents_title">즐겨찾기</p>
            <div className="favorites_container">
                {favorites.map((favorite) => (
                    <div key={favorite.id} className="favorite_card" >
                        <button className="favorite_delete" onClick={() => deleteFavoritesFunction(favorite.id)}>x</button>             
                        <img src={`https://ddragon.leagueoflegends.com/cdn/13.17.1/img/profileicon/${favorite.profileIconId}.png`}
                        className="favorite_profile_img" onError={(e) => e.target.src = "https://ddragon.leagueoflegends.com/cdn/13.17.1/img/profileicon/29.png"}
                        onClick={() => window.location.href = `/search?query=${favorite.gameName}#${favorite.gameTag}`}/>
                        <div className="favorite_info" onClick={() => window.location.href = `/search?query=${favorite.gameName}#${favorite.gameTag}`}>
                            <div className="favorite_info_name">
                                <p>{favorite.gameName}</p>#<p>{decodeURIComponent( favorite.gameTag )}</p>
                            </div>   
                            <div>       
                                <div className={`favorite_info_tier rank-${favorite.rank}`}>{favorite.rank}</div>
                                <div className="favorite_info_level">Lv{favorite.summonerLevel}</div>
                            </div>  
                        </div>                      
                    </div>
                ))}
            </div>
        </div>
    )
}