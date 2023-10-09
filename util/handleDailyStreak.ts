import { firebase_app } from "@/app/firebase/config";
import { getFirestore, collection, getDocs, addDoc, setDoc, updateDoc, doc } from 'firebase/firestore/lite';
import { serverTimestamp } from "firebase/firestore/lite";

export const handleDailyStreak = async (userId: any, setDailyStreak: any) => {
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
    } else {
        const now = new Date();
        const lastAccess = userStreak.lastAccess.toDate();
        const isSameDay = now.getFullYear() === lastAccess.getFullYear() && now.getMonth() === lastAccess.getMonth() && now.getDate() === lastAccess.getDate();
        if (!isSameDay) {
            setDailyStreak(userStreak.streak+1);
            const updatedStreak = {
                uid: userId.email,
                lastAccess: serverTimestamp(),
                streak: userStreak.streak + 1
            };
            await updateDoc(doc(streakCol, userId.email), updatedStreak);
        }
    }
} 