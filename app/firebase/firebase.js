import { initializeApp } from "firebase/app";
import { collection, deleteDoc, doc, getDocs, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_STRORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_APPID,
    measurementId:process.env.NEXT_PUBLIC_MEASUREMENTID
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function getFavorites() {
    const querySnapshot = await getDocs(collection(db, "favorites"));
    return querySnapshot.docs.map((doc => ({
        id: doc.id,
        ...doc.data()
    })));
}
export async function addFavorites( { gameName, gameTag, puuid, profileIconId, summonerLevel,rank} ) {
    const docRef = doc(db, "favorites",puuid);
    const newFavorite = {
        gameName,
        gameTag,
        puuid,
        profileIconId,
        summonerLevel,
        rank
    }
    try {
        await setDoc(docRef, newFavorite);
    } catch (error) {
        console.error(error);
    }
    return newFavorite;
}
export async function deleteFavorites(puuid) {
    const docRef = doc(db, "favorites",puuid);
    try {
        await deleteDoc(docRef);
    } catch (error) {
        console.error(error);
    }
}   