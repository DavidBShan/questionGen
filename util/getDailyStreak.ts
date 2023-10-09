import { firebase_app } from "@/app/firebase/config";
import { getFirestore, collection, getDocs, setDoc, doc} from 'firebase/firestore/lite';
import { serverTimestamp } from "firebase/firestore/lite";

export const getDailyStreak = async (userId: any, setDailyStreak: any) => {
    const db = getFirestore(firebase_app);
    const streakCol = collection(db, 'streak');
    const streakSnapshot = await getDocs(streakCol);
    const streakData = streakSnapshot.docs.map(doc => doc.data());
    const userStreak = streakData.find(streak => streak.uid === userId.email);
    if (!userStreak) {
        const newStreak = {
            uid: userId.email,
            lastAccess: serverTimestamp(),
            streak: 1
        };
        await setDoc(doc(streakCol, userId.email), newStreak);
        setDailyStreak(1);
    }else{
        setDailyStreak(userStreak.streak);
    }
}