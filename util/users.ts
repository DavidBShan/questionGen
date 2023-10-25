import { firebase_app } from "@/app/firebase/config";
import { getFirestore, collection, getDocs, setDoc, updateDoc, doc } from 'firebase/firestore/lite';

const db = getFirestore(firebase_app);
const usersCol = collection(db, 'users');

export const uploadUserData = async (userId: any, newMembership?: string, newQuizzesAnswered?: number) => {
    
    const user = await getUserData(userId);
    
    const updatedUser = {
        uid: userId.email,
        membership: (newMembership === "same" ? user.membership : newMembership) || user.membership,
        quizzesAnswered: (newQuizzesAnswered == -1 ? user.quizzesAnswered + 1 : newQuizzesAnswered) || user.quizzesAnswered
    };
    await updateDoc(doc(usersCol, userId.email), updatedUser);
}

const getUserData = async (userId: any) => {
    const snapshot = await getDocs(usersCol);
    const usersData = snapshot.docs.map(doc => doc.data());
    const user = usersData.find(user => user.uid === userId.email);

    if (!user) {
        const updatedUser = {
            uid: userId.email,
            membership: "free",
            quizzesAnswered: 0
        };
        await setDoc(doc(usersCol, userId.email), updatedUser);
        return updatedUser;
    }

    return user;
};

export const getMembershipType = async (userId: any, setMembershipType: any) => {
    const userData = await getUserData(userId);
    setMembershipType(userData?.membership.toString() || "free");
};

export const getQuizzesAnswered = async (userId: any, setQuizzesAnswered: any) => {
    const userData = await getUserData(userId);
    setQuizzesAnswered(userData?.quizzesAnswered || 0);
};