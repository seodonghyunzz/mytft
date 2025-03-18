'use client'
import { useEffect, useState } from "react";

export default function MatchCount({ matchDetails, puuid }) {
    const [myPlacements, setMyPlacements] = useState([]); 

    useEffect(() => {
        if (!Array.isArray(matchDetails) || matchDetails.length === 0 || !puuid) {
            return;
        }

        const placements = matchDetails
            .map((match) => match.info.participants.find((p) => p.puuid === puuid)?.placement)
            .filter((placement) => placement !== undefined);

        setMyPlacements(placements);
    }, [matchDetails, puuid]);

    return (
        <div className="match_count">
            {myPlacements.length > 0 ? (
                <ul>
                    {myPlacements.map((placement, index) => (
                        <li key={index} className={`placementCard placement-${placement}`}>{placement}</li>
                    ))}
                </ul>
            ) : (
                "로딩 중..."
            )}
        </div>
    );
}