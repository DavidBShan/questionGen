import { firebase_app } from "@/app/firebase/config";
import { getFirestore, collection, getDocs, updateDoc, doc } from 'firebase/firestore/lite';
import { serverTimestamp } from "firebase/firestore/lite";

export const handleDailyStreak = async (userId: any, setDailyStreak: any) => {
    const db = getFirestore(firebase_app);
    const streakCol = collection(db, 'streak');
    const streakSnapshot = await getDocs(streakCol);
    const streakData = streakSnapshot.docs.map(doc => doc.data());
    const userStreak = streakData.find(streak => streak.uid === userId.email);
    const now = new Date();
    const lastAccess = userStreak?.lastAccess.toDate();
    const isSameDay = now.getFullYear() === lastAccess.getFullYear() && now.getMonth() === lastAccess.getMonth() && now.getDate() === lastAccess.getDate();

    if (!isSameDay || userStreak?.streak == 0) {
        setDailyStreak(userStreak?.streak+1);
        const updatedStreak = {
            uid: userId.email,
            lastAccess: serverTimestamp(),
            streak: userStreak?.streak + 1
        };
        await updateDoc(doc(streakCol, userId.email), updatedStreak);
    }
} 