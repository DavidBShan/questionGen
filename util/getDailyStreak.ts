import { firebase_app } from "@/app/firebase/config";
import { getFirestore, collection, getDocs, setDoc, doc, updateDoc} from 'firebase/firestore/lite';
import { serverTimestamp } from "firebase/firestore/lite";

export const getDailyStreak = async (userId: any, setDailyStreak: any) => {
    const db = getFirestore(firebase_app);
    const streakCol = collection(db, 'streak');
    const streakSnapshot = await getDocs(streakCol);
    const streakData = streakSnapshot.docs.map(doc => doc.data());
    const userStreak = streakData.find(streak => streak.uid === userId.email);
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1); 
    if (!userStreak) {
        const newStreak = {
            uid: userId.email,
            lastAccess: serverTimestamp(),
            streak: 0
        };
        await setDoc(doc(streakCol, userId.email), newStreak);
        setDailyStreak(0);
    }else{
        const now = new Date();
        const lastAccess = userStreak.lastAccess.toDate();
        const isSameDay = now.getFullYear() === lastAccess.getFullYear() && now.getMonth() === lastAccess.getMonth() && now.getDate() === lastAccess.getDate();
        const isYesterday = yesterday.getFullYear() === lastAccess.getFullYear() && yesterday.getMonth() === lastAccess.getMonth() && yesterday.getDate() === lastAccess.getDate();
        if (!isSameDay && !isYesterday) {
                setDailyStreak(userStreak.streak+1);
                const updatedStreak = {
                    uid: userId.email,
                    lastAccess: serverTimestamp(),
                    streak: 0
                };
                await updateDoc(doc(streakCol, userId.email), updatedStreak);
            }
        setDailyStreak(userStreak.streak);
    }
}