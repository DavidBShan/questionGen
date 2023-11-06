import { firebase_app } from "@/app/firebase/config";
import { getFirestore, collection, getDocs, setDoc, updateDoc, doc } from 'firebase/firestore/lite';

const db = getFirestore(firebase_app);
const usersCol = collection(db, 'users');

export const uploadUserData = async (userId: any, newMembership?: string, newQuizzesAnswered?: number, newSentMessagesTutor?: number) => {
    
    const user = await getUserData(userId);
    
    //For quizzesAnswered and sentMessagesTutor are added +1 to their current value
    // if the value of their newQuizzesAnswered or newSentMessagesTutor is '-1'

    const updatedUser = {
        uid: userId.email,
        membership: (newMembership === "same" ? user.membership : newMembership) || user.membership,
        quizzesAnswered: (newQuizzesAnswered == -1 ? user.quizzesAnswered + 1 : newQuizzesAnswered) || user.quizzesAnswered,
        sentMessagesTutor: (newSentMessagesTutor == -1 ? user.sentMessagesTutor + 1 : newSentMessagesTutor) || user.sentMessagesTutor

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
            quizzesAnswered: 0,
            sentMessagesTutor: 0
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

export const getSentMessagesTutor = async (userId: any, setSentMessagesTutor: any) => {
    const userData = await getUserData(userId);
    setSentMessagesTutor(userData?.sentMessagesTutor || 0);
};

export const handleSentMessagesTutor = async (userId: any) => {

    console.log("UPDATING USER");

    const db = getFirestore(firebase_app);
    const userCol = collection(db, 'users');

    const snapshot = await getDocs(userCol);
    const userData = snapshot.docs.map(doc => doc.data());

    const individualUser = userData.find(membership => membership.uid === userId.email);
    
    const updatedUser = {
        uid: userId.email,
        membership: individualUser?.membership,
        quizzesAnswered: individualUser?.quizzesAnswered,
        sentMessagesTutor: individualUser?.sentMessagesTutor + 1
    };
    await updateDoc(doc(userCol, userId.email), updatedUser);
    console.log(updatedUser);
} 