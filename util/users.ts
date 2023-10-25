import { firebase_app } from "@/app/firebase/config";
import { getFirestore, collection, getDocs, setDoc, updateDoc, doc } from 'firebase/firestore/lite';

const db = getFirestore(firebase_app);
const usersCol = collection(db, 'users');

const uploadUserData = async (user:any, userId: any, newMembership?: string, newQuizzesAnswered?: number) => {
    const updatedUser = {
        uid: userId.email,
        membership: newMembership || user.membership,
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



// export const handleMembershipType = async (userId: any, setMembershipType?: any) => {

//     const snapshot = await getDocs(usersCol);
    
//     const userData = snapshot.docs.map(doc => doc.data());
//     const user = userData.find(user => user.uid === userId.email);

//     if (setMembershipType) {
//         setMembershipType(user?.membership);
//     }

//     if (user == null) {
//         const updatedUser = {
//             uid: userId.email,
//             membership: "free",
//             quizzesAnswered: 0
//         };

//         if (setMembershipType) {
//             setMembershipType(updatedUser.membership);
//         }

//         await updateDoc(doc(usersCol, userId.email), updatedUser);
//     }
// } 
