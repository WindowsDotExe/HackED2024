import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, getDocs, updateDoc, collection } from 'firebase/firestore';
import './SignupPreferences.css';

function SignupPreferences() {
    const navigate = useNavigate()
    const auth = getAuth();
    const db = getFirestore();
    const [isSelectingPreferences, setIsSelectingPreferences] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [isLoadingCategories, setLoadingCategories] = useState(true);  // manage loading state here

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async user => {
            if (user) {
                const docRef = doc(db, "users", user.uid);
                console.log(user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists() && docSnap.data().isSelectingPreferences) {
                    setIsSelectingPreferences(true);
                } else {
                    navigate('/signup-preferences'); //
                    setIsSelectingPreferences(false);
                }
            } else {
                navigate('/login');
            }
            fetchCategories();
            setIsLoading(false);
        }, [auth, db, navigate]);

        return () => unsubscribe();
    }, [auth, db, navigate]); // Corrected dependency array

    function disableUserSelectingPreferences() {
        const user = auth.currentUser;
        if (user) {
            const docRef = doc(db, "users", user.uid);
            updateDoc(docRef, {
                isSelectingPreferences: false
            }).then(() => {
                console.log("Preferences updated");
            }).catch(error => {
                console.error("Error updating preferences: ", error);
            });
        }
    }

    function addPreferenceCategories() {
        const user = auth.currentUser;
        if (user) {
            const docRef = doc(db, "users", user.uid);
            updateDoc(docRef, {
                preferences: Array.from(selectedCategories)
            }).then(() => {
                console.log("Preferences updated");
            }).catch(error => {
                console.error("Error updating preferences: ", error);
            });
        }
    }

    async function fetchCategories() {
        try {
            setLoadingCategories(true); // Start loading
            const categoriesRef = collection(db, "categories");
            const querySnapshot = await getDocs(categoriesRef);
            const categoryList = querySnapshot.docs.map(doc => doc.data().name); // Assuming each document has a 'name' field
            setCategories(categoryList);
            setLoadingCategories(false); // End loading
        } catch (error) {
            console.error("Error fetching categories: ", error);
            setLoadingCategories(false); // End loading on error
        }
    }

    
    

    // const categories = [
    //     'Health', 'International Relations', 'Economics', 'Environment', 
    //     'Technology', 'Politics', 'Social Justice', 'Space Exploration', 
    //     'Cybersecurity', 'Entertainment', 'Sports', 'Education', 
    //     'Science', 'Business and Finance', 'Humanitarian Crises', 
    //     'Artificial Intelligence', 'Weather/Climate', 'Travel and Tourism', 
    //     'Cultural Events'
    // ];

    // const categories = fetchCategories();

    const minSelection = 5;
    const [selectedCategories, setSelectedCategories] = useState(new Set());

    const toggleCategory = (category) => {
        setSelectedCategories(prevSelected => {
            const newSelected = new Set(prevSelected);
            if (newSelected.has(category)) {
                newSelected.delete(category);
            } else {
                newSelected.add(category);
            }
            console.log(newSelected);
            return newSelected;
        });
    };

    if (isLoadingCategories) {
        return <div>Loading categories...</div>; // Display a loading message or spinner
    }
    return (
        <div>
            <div id="categories">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => toggleCategory(category)}
                        className={`category-btn ${selectedCategories.has(category) ? 'selected' : ''}`}
                    >
                        {category}
                    </button>
                ))}
            </div>
            <button 
    id="nextButton" 
    disabled={selectedCategories.size < minSelection} 
    onClick={() => {
        disableUserSelectingPreferences();
        addPreferenceCategories();
        navigate('/feed');
    }}
>
    Next
</button>
        </div>
    );
}

export default SignupPreferences;
