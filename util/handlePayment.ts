import { firebase_app } from "@/app/firebase/config";
import { getFirestore, collection, getDocs, updateDoc, doc } from 'firebase/firestore/lite';
import { serverTimestamp } from "firebase/firestore/lite";

export const handlePayment = async (userId: any) => {
    const db = getFirestore(firebase_app);
    const userCol = collection(db, 'users');
    const updatedUser = {
        uid: userId.email,
        membership: "premium",
        quizAnswered: 0,
    };
    await updateDoc(doc(userCol, userId.email), updatedUser);
} 