'use client'
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import SearchApi from "../component/searchApi";
export default function Search() {
  const searchParams = useSearchParams();
  const gameName = searchParams.get("query");
  const [gameTag, setGameTag] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setGameTag(window.location.hash.substring(1));
    }
  }, []);

  return (
    <div className="search_page"><SearchApi gameName={gameName} gameTag={gameTag}/></div>
  )
}