import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, deleteDoc, doc, query, where, getDocs } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyBylIVXyTgotJOLuljVRiPik9a7dt0Af_M",
  authDomain: "expense-ccb54.firebaseapp.com",
  projectId: "expense-ccb54",
  storageBucket: "expense-ccb54.firebasestorage.app", 
  messagingSenderId: "326244261878",
  appId: "1:326244261878:web:b99d30f0ec638b4952f1d7",
  measurementId: "G-LEGDVNBNZ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// Google Authentication
export const loginWithGoogle = () => signInWithPopup(auth, provider);
export const logout = () => signOut(auth);

// Firestore Functions

// Add a transaction to Firestore with the user's ID
export const addTransactionToFirestore = async (userId, data) => {
  try {
    const docRef = await addDoc(collection(db, 'transactions'), { 
      ...data, 
      userId, 
      timestamp: new Date() 
    });
    console.log("✅ Firestore Write Success:", docRef.id);
  } catch (error) {
    console.error("❌ Firestore Write Failed:", error);
  }
};



export const getTransactionsFromFirestore = async (userId) => {
  try {
    
    const q = query(collection(db, 'transactions'), where("userId", "==", userId));
    const snapshot = await getDocs(q);
    
   
    return snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));
  } catch (error) {
    console.error("Error getting transactions: ", error);
    return [];  
  }
};


export const deleteTransactionFromFirestore = async (id) => {
  try {

    await deleteDoc(doc(db, 'transactions', id));
  } catch (error) {
    console.error("Error deleting transaction: ", error);
  }
};
