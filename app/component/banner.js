
'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Banner() {
    const [searchText, setSearchText] = useState("");
    const router = useRouter();
    const routeToSearch = () => {
        if(searchText.includes("#")){
          router.push(`/search?query=${searchText}`);
        }else{
            alert("enter in the format of playerName#GameTag");
        }
    }
    return (
        <div className="banner">           
            <div className="logo">
                <a href="/"><img src="/TftLogo.svg" alt="logo" /></a>
                <div className="search">
                    <input type="text"
                           value={searchText} 
                           onChange={(e) => setSearchText(e.target.value)} 
                           onKeyDown={(e) => {
                               if (e.key === "Enter") {
                                   routeToSearch();
                               }
                           }}
                           placeholder="플레이어#tag"/>
                    <button onClick={routeToSearch}>search</button>
                </div>
            </div>
        </div>
    )
}