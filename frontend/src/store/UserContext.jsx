// context/UserContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in
        setCurrentUser(user);
        
        // Fetch additional user data from Firestore
        try {
          console.log('Fetching user data for UID:', user.uid);
          console.log('Collection path: users');
          console.log('Document path: users/' + user.uid);
          
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          console.log('Document exists:', userDoc.exists());
          console.log('Document ID:', userDoc.id);
          
          if (userDoc.exists()) {
            const data = userDoc.data();
            console.log('User data from Firestore:', data);
            setUserData(data);
          } else {
            console.log('User document does not exist for UID:', user.uid);
            console.log('This might be because the document was created with a random ID during signup.');
            console.log('Please check Firebase Console for document with ID:', user.uid);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        // User is signed out
        setCurrentUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <UserContext.Provider value={{ currentUser, userData, loading, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};