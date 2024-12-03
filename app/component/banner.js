
'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Banner() {
    const [searchText, setSearchText] = useState("");
    const router = useRouter();
    const routeToSearch = () => {
          router.push(`/search?query=${searchText}`);
    }
    return (
        <div className="banner">
            <p>banner</p>
            <div className="logo">
                <p>My TFT</p>
                <div className="search">
                    <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
                    <button onClick={routeToSearch}>search</button>
                </div>
            </div>
        </div>
    )
}