import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, getFirestore, query, doc, getDoc, where, getDocs, addDoc } from 'firebase/firestore';
import CardComponent from '../components/CardComponent';
import CommentComponent from '../components/CommentComponent';

import './feed.css';

function Feed() {
    const auth = getAuth();
    const db = getFirestore();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [isSelectingPreferences, setIsSelectingPreferences] = useState(true);
    const [comments, setComments] = useState([]);
    const articleId = 'P1vFgA5BKRXsXhgkpkjE'; // HARDCODED ONLY FOR TESTING
    const [newComment, setNewComment] = useState(''); // Add a state for the new comment text

    // Sample data for CardComponent props
    const sampleHeading = "Sample Card Heading";
    const sampleContent = "This is some sample content for the card.";
    const sampleAudio = "path_to_sample_audio.mp3"; // Replace with an actual audio file path
    const sampleUrl = "https://example.com";

    var url = 'https://newsapi.org/v2/top-headlines?' +
    'category=Technology&' +
    'country=ca&' +
    'pageSize=50&' + 
    'apiKey= 92680690483a4092873a4584262298e6';

    const reqOptions = {
        method: 'GET',
        mode: 'cors',
    };

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

    const fetchComments = useCallback(async () => {
        const commentsRef = collection(db, 'comments');
        const q = query(commentsRef, where('article', '==', articleId));
        const querySnapshot = await getDocs(q);
    
        const commentsWithUserNames = await Promise.all(querySnapshot.docs.map(async (commentDoc) => {
            const commentData = commentDoc.data();
    
            let authorName = 'Unknown';
            let date = commentData.datePosted || 'Unknown date'; // Use the datePosted directly
    
            if (commentData.by) {
                const userDocRef = doc(db, 'users', commentData.by);
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists()) {
                    authorName = userDocSnap.data().name || authorName;
                }
            }
    
            return {
                id: commentDoc.id,
                content: commentData.content || '',
                authorId: commentData.by || '',
                authorName,
                date
            };
        }));
    
        setComments(commentsWithUserNames);
    }, [db, articleId]);
    
    

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);
    
    
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

    const postComment = async () => {
        if (newComment.trim()) {
        // get the comment from the textarea
        const commentTextArea = document.querySelector('.comment-form textarea');
        const comment = commentTextArea.value.trim();
        
        if (comment) {
            // clear the textarea
            commentTextArea.value = '';
            
            // post the comment to the database
            const commentsRef = collection(db, 'comments');
            // get current date format as mm-dd-yyyy
            const date = formatDate(new Date());
    
            try {
                await addDoc(commentsRef, {
                    article: articleId,
                    by: user.uid,
                    content: comment,
                    datePosted: date
                });
                console.log('Comment posted!');
                
                // After posting, fetch comments again to update the list
                await fetchComments();
            } catch (error) {
                console.error('Error posting comment: ', error);
            }
            setNewComment(''); // Clear the new comment text
        }
        }
    };
    

    function formatDate(date) {
        let day = date.getDate().toString();
        let month = (date.getMonth() + 1).toString(); // Months are zero-indexed
        let year = date.getFullYear().toString();
    
        // Pad the month and day with leading zeros if necessary
        day = day.length < 2 ? '0' + day : day;
        month = month.length < 2 ? '0' + month : month;
    
        return `${month}-${day}-${year}`;
    }

    return (
        <div>
            <h2>Your Feed</h2>

            <div className="cards-container">
                <CardComponent
                    heading={sampleHeading}
                    content={sampleContent}
                    audio={sampleAudio}
                    url={sampleUrl}
                />
            </div>

            {/* Render your preferences or other components based on preferences */}
            <button className="signout-button" onClick={handleSignOut}>Signout</button>
            <h3>Comments:</h3>
            <div className="comment-form">
                <textarea
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)} // Use state to control the textarea
                />
                <button className="post-comment-button" onClick={postComment}>Post</button>
            </div>


            <div className="comments-section">
            {comments.map(comment => (
                <CommentComponent
                key={comment.id}
                authorName={comment.authorName}
                content={comment.content}
                date={comment.date}
                />
            ))}
            </div>
        </div>
    );
}

export default Feed;