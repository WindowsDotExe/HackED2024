import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import './feed.css';

function Feed() {
    const auth = getAuth();
    const db = getFirestore();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [isSelectingPreferences, setIsSelectingPreferences] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                console.log('User is logged in:', user);
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists() && !docSnap.data().isSelectingPreferences) {
                    setUser(user);
                    setIsSelectingPreferences(false);
                    setPreferences(docSnap.data().preferences);
                } else {
                    console.log('User is still selecting preferences or document does not exist.');
                    navigate('/signup-preferences'); // Replace with your preferences route
                }
            } else {
                console.log('No user is logged in');
                navigate('/login'); // Replace '/login' with your login route
            }
        });

        return unsubscribe;
    }, [auth, db, navigate]);

    const [preferences, setPreferences] = useState(null);

    const handleSignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log('User signed out');
            navigate('/login'); // Replace '/login' with your login route
        }).catch((error) => {
            // An error happened.
            console.error('Sign out error', error);
        });
    };

    if (isSelectingPreferences || !user) {
        // If user is not logged in or is selecting preferences, render nothing or a loading indicator
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Feed here</h2>
            {/* Render your preferences or other components based on preferences */}
            <button onClick={handleSignOut}>Signout</button>
        </div>
    );
}

export default Feed;