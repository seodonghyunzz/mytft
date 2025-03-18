'use client'
import React from 'react'
import { useRouter } from 'next/navigation';
export default function ranktable( { Challenger_Data, Grandmaster_Data, Master_Data } ) {
    
    const router = useRouter();
    
    Challenger_Data.forEach(element => {
        element.rank = "Challenger";
    });
    Grandmaster_Data.forEach(element => {
        element.rank = "Grandmaster";
    });
    Master_Data.forEach(element => {
        element.rank = "Master";
    });
    
    const rankingData = [...Challenger_Data, ...Grandmaster_Data, ...Master_Data];
    const slicedRankingData = rankingData.slice(0,10);
    const calculateWinRate = (wins, losses) => {
        const totalGames = wins + losses;
        return totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0;
    }
    const calculateTotalGames = (wins, losses) => {
        return wins + losses;
    }
    const routeToSearch = (searchText) => {      
        router.push(`/search?query=${searchText}`);
    }
    return (
        <div className="ranking">
            <p className='contents_title'>순위표</p>
            <table className="ranking_table">
                <thead>
                    <tr>
                        <th>순위</th>
                        <th>닉네임</th>
                        <th>티어</th>
                        <th>LP</th>
                        <th>전체 게임 수</th>
                        <th>Top 4</th>
                        <th>Top 4(%)</th>
                    </tr>
                </thead>
                {slicedRankingData.map((item, index) => (
                   <tbody key={index}>
                        <tr>
                            <td>{index + 1}</td>
                            <td className="ranking_name" onClick={() => routeToSearch(item.gameName+"#"+item.tagLine)}>{item.gameName}#{item.tagLine}</td>
                            <td>{item.rank}</td>
                            <td>{item.leaguePoints}</td>
                            <td>{calculateTotalGames(item.wins, item.losses)}</td>
                            <td>{item.wins}</td>
                            <td>{calculateWinRate(item.wins, item.losses)}%</td>
                        </tr>
                    </tbody> 
                ))}
                    
                
            </table>
        </div>
    );
}