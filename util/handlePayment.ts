import { firebase_app } from "@/app/firebase/config";
import { getFirestore, collection, getDocs, updateDoc, doc } from 'firebase/firestore/lite';
import { serverTimestamp } from "firebase/firestore/lite";

export const handlePayment = async (userId: any) => {
    const db = getFirestore(firebase_app);
    const userCol = collection(db, 'users');

    const snapshot = await getDocs(userCol);
    const userData = snapshot.docs.map(doc => doc.data());

    const individualUser = userData.find(membership => membership.uid === userId.email);

     const updatedUser = {
        uid: userId.email,
        membership: "pro",
        quizzesAnswered: individualUser?.quizzesAnswered,
        sentMessagesTutor: individualUser?.sentMessagesTutor
    };
    await updateDoc(doc(userCol, userId.email), updatedUser);
} 