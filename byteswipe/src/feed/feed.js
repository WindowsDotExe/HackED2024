// import React, { useEffect, useState, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
// import { collection, getFirestore, query, doc, getDoc, where, getDocs, addDoc } from 'firebase/firestore';
// import CardComponent from '../components/CardComponent';
// import CommentComponent from '../components/CommentComponent';

// import './feed.css';

// function Feed() {
//     const auth = getAuth();
//     const db = getFirestore();
//     const navigate = useNavigate();

//     const [user, setUser] = useState(null);
//     const [isSelectingPreferences, setIsSelectingPreferences] = useState(true);
//     const [comments, setComments] = useState([]);
//     const articleId = 'P1vFgA5BKRXsXhgkpkjE'; // HARDCODED ONLY FOR TESTING
//     const [newComment, setNewComment] = useState(''); // Add a state for the new comment text

//     // Sample data for CardComponent props
//     const sampleHeading = "Sample Card Heading";
//     const sampleContent = "This is some sample content for the card.";
//     const sampleAudio = "path_to_sample_audio.mp3"; // Replace with an actual audio file path
//     const sampleUrl = "https://example.com";

//     const axios = require('axios');
//     const { JSDOM } = require('jsdom');
//     const { Readability } = require('@mozilla/readability');
    

//     async function fetchSummary(data) {
//         try {
//             const response = await fetch(
//                 "https://api-inference.huggingface.co/models/Falconsai/text_summarization",
//                 {
//                     headers: { Authorization: "Bearer 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" },
//                     method: "POST",
//                     body: JSON.stringify(data),
//                 }
//             );
//             const result = await response.json();
//             console.log(result);
//             return result;
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     }
    
//     useEffect(() => {
//         const textToSummarize = "This is";
//         fetchSummary({ "inputs": textToSummarize });
//     }, []);
    

//     const reqOptions = {
//         method: 'GET',
//         mode: 'cors',
//     };

//     // useEffect(() => {
//     //     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//     //         if (user) {
//     //             console.log('User is logged in:', user);
//     //             const docRef = doc(db, 'users', user.uid);
//     //             const docSnap = await getDoc(docRef);
//     //             if (docSnap.exists() && !docSnap.data().isSelectingPreferences) {
//     //                 setUser(user);
//     //                 setIsSelectingPreferences(false);
//     //                 setPreferences(docSnap.data().preferences);
//     //             } else {
//     //                 console.log('User is still selecting preferences or document does not exist.');
//     //                 navigate('/signup-preferences'); // Replace with your preferences route
//     //             }
//     //         } else {
//     //             console.log('No user is logged in');
//     //             navigate('/login'); // Replace '/login' with your login route
//     //         }
//     //     });

//     //     return unsubscribe;
//     // }, [auth, db, navigate]);

//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, async (user) => {
//             if (user) {
//                 console.log('User is logged in:', user);
//                 const docRef = doc(db, 'users', user.uid);
//                 const docSnap = await getDoc(docRef);
//                 if (docSnap.exists() && !docSnap.data().isSelectingPreferences) {
//                     setUser(user);
//                     setIsSelectingPreferences(false);
//                     setPreferences(docSnap.data().preferences); // Set user preferences
//                 } else {
//                     console.log('User is still selecting preferences or document does not exist.');
//                     navigate('/signup-preferences'); // Replace with your preferences route
//                 }
//             } else {
//                 console.log('No user is logged in');
//                 navigate('/login'); // Replace '/login' with your login route
//             }
//         });
    
//         return unsubscribe;
//     }, [auth, db, navigate]);
    

//     const fetchComments = useCallback(async () => {
//         const commentsRef = collection(db, 'comments');
//         const q = query(commentsRef, where('article', '==', articleId));
//         const querySnapshot = await getDocs(q);
    
//         const commentsWithUserNames = await Promise.all(querySnapshot.docs.map(async (commentDoc) => {
//             const commentData = commentDoc.data();
    
//             let authorName = 'Unknown';
//             let date = commentData.datePosted || 'Unknown date'; // Use the datePosted directly
    
//             if (commentData.by) {
//                 const userDocRef = doc(db, 'users', commentData.by);
//                 const userDocSnap = await getDoc(userDocRef);
//                 if (userDocSnap.exists()) {
//                     authorName = userDocSnap.data().name || authorName;
//                 }
//             }
    
//             return {
//                 id: commentDoc.id,
//                 content: commentData.content || '',
//                 authorId: commentData.by || '',
//                 authorName,
//                 date
//             };
//         }));
    
//         setComments(commentsWithUserNames);
//     }, [db, articleId]);
    
    

//     useEffect(() => {
//         fetchComments();
//     }, [fetchComments]);
    
//     function randomPreference() {
//         if (preferences && preferences.length > 0) {
//             const randomIndex = Math.floor(Math.random() * preferences.length);
//             return preferences[randomIndex];
//         }
//         return null; // or a default value if preferences are not loaded yet
//     }
    


//     const [preferences, setPreferences] = useState(null);
//     // console.log('preferences:', randomPreference());


//     useEffect(() => {
//         const fetchNews = async () => {
//             if (preferences) {
//                 const randomPref = randomPreference();
//                 console.log('randomPref:', randomPref);
//                 if (randomPref) {
//                     let url = 'https://newsapi.org/v2/top-headlines?' +
//                         'category=' + randomPref + '&country=ca&' +
//                         'sortBy=publishedAt&' + 'pageSize=20&' +
//                         'apiKey=92680690483a4092873a4584262298e6';

//                         axios.get(url).then(function(r1) {

//                             // At this point we will have some search results from the API. Take the first search result...
//                             let firstResult = r1.data.articles[0];
                          
//                             // ...and download the HTML for it, again with axios
//                             axios.get(firstResult.url).then(function(r2) {
                          
//                               // We now have the article HTML, but before we can use Readability to locate the article content we need jsdom to convert it into a DOM object
//                               let dom = new JSDOM(r2.data, {
//                                 url: firstResult.url
//                               });
                          
//                               // now pass the DOM document into readability to parse
//                               let article = new Readability(dom.window.document).parse();
                          
//                               // Done! The article content is in the textContent property
//                               console.log(article.textContent);
//                             })
//                           })
//                     try {
//                         const response = await fetch(url, reqOptions);
//                         const data = await response.json();
//                         console.log(data);
//                         // Do something with the fetched data
//                     } catch (error) {
//                         console.error('Error fetching news:', error);
//                     }
//                 }
//             }
//         };

//         fetchNews();
//     }, [preferences]); // Depend on preferences

//     // var url = 'https://newsapi.org/v2/top-headlines?category=' + randomPreference() + '&country=ca&pageSize=50&apiKey=df3ae33e2b74444e8b444ea458e99984';

//     // var url = "https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=df3ae33e2b74444e8b444ea458e99984"
    

//     // https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=df3ae33e2b74444e8b444ea458e99984

//     // var req = new Request(url);

//     // fetch(req).then(function(response) {
//     //     console.log(response.json());
//     // })




//     const handleSignOut = () => {
//         signOut(auth).then(() => {
//             // Sign-out successful.
//             console.log('User signed out');
//             navigate('/login'); // Replace '/login' with your login route
//         }).catch((error) => {
//             // An error happened.
//             console.error('Sign out error', error);
//         });
//     };

//     if (isSelectingPreferences || !user) {
//         // If user is not logged in or is selecting preferences, render nothing or a loading indicator
//         return <div>Loading...</div>;
//     }

//     const postComment = async () => {
//         if (newComment.trim()) {
//         // get the comment from the textarea
//         const commentTextArea = document.querySelector('.comment-form textarea');
//         const comment = commentTextArea.value.trim();
        
//         if (comment) {
//             // clear the textarea
//             commentTextArea.value = '';
            
//             // post the comment to the database
//             const commentsRef = collection(db, 'comments');
//             // get current date format as mm-dd-yyyy
//             const date = formatDate(new Date());
    
//             try {
//                 await addDoc(commentsRef, {
//                     article: articleId,
//                     by: user.uid,
//                     content: comment,
//                     datePosted: date
//                 });
//                 console.log('Comment posted!');
                
//                 // After posting, fetch comments again to update the list
//                 await fetchComments();
//             } catch (error) {
//                 console.error('Error posting comment: ', error);
//             }
//             setNewComment(''); // Clear the new comment text
//         }
//         }
//     };

//     const playAudio = () => {
//         // reads both heading and content aloud
//         let speech = new SpeechSynthesisUtterance();
//         speech.lang = 'en-US';
//         speech.text = sampleHeading + ". " + sampleContent; // Concatenating with a space for natural reading
//         speech.volume = 1;
//         speech.rate = 1;
//         speech.pitch = 1;
//         window.speechSynthesis.speak(speech);
//     };


//     function formatDate(date) {
//         let day = date.getDate().toString();
//         let month = (date.getMonth() + 1).toString(); // Months are zero-indexed
//         let year = date.getFullYear().toString();
    
//         // Pad the month and day with leading zeros if necessary
//         day = day.length < 2 ? '0' + day : day;
//         month = month.length < 2 ? '0' + month : month;
    
//         return `${month}-${day}-${year}`;
//     }

//     return (
//         <div>
//             <h2>Your Feed</h2>

//             <div className="cards-container">
//                 <CardComponent
//                     heading={sampleHeading}
//                     content={sampleContent}
//                     audio={sampleAudio}
//                     url={sampleUrl}
//                     onAudioPlay={playAudio}
//                 />
//             </div>

//             {/* Render your preferences or other components based on preferences */}
//             <button className="signout-button" onClick={handleSignOut}>Signout</button>
//             <h3>Comments:</h3>
//             <div className="comment-form">
//                 <textarea
//                     placeholder="Write a comment..."
//                     value={newComment}
//                     onChange={(e) => setNewComment(e.target.value)} // Use state to control the textarea
//                 />
//                 <button className="post-comment-button" onClick={postComment}>Post</button>
//             </div>


//             <div className="comments-section">
//             {comments.map(comment => (
//                 <CommentComponent
//                 key={comment.id}
//                 authorName={comment.authorName}
//                 content={comment.content}
//                 date={comment.date}
//                 />
//             ))}
//             </div>
//         </div>
//     );
// }

// export default Feed;

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
    const articleId = 'P1vFgA5BKRXsXhgkpkjE'; // HARDCODED ONLY FOR TESTING

    const [user, setUser] = useState(null);
    const [isSelectingPreferences, setIsSelectingPreferences] = useState(true);
    const [comments, setComments] = useState([]);
    const [articles, setArticles] = useState([]);
    const [newComment, setNewComment] = useState('');

    const [currentArticleIndex, setCurrentArticleIndex] = useState(0);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
                setIsSelectingPreferences(false);
            } else {
                navigate('/login');
            }
        });

        return unsubscribe;
    }, [auth, navigate]);

    const fetchComments = useCallback(async () => {
        // Fetch comments logic here
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

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        const apiKey = '92680690483a4092873a4584262298e6'; // Replace with your API key
        const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            setArticles(data.articles);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error('Error signing out:', error);
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
                            article: currentArticleIndex,
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

    if (isSelectingPreferences || !user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Your Feed</h2>
            <button onClick={handleSignOut}>Sign Out</button>

            {articles.map((article, index) => (
                <CardComponent
                    key={currentArticleIndex}
                    heading={articles[currentArticleIndex].title}
                    content={articles[currentArticleIndex].description}
                    url={articles[currentArticleIndex].url}
                />
              ))[0]}

            <button onClick={() => setCurrentArticleIndex(prevIndex => prevIndex - 1)}>Previous Article</button>
            <button onClick={() => setCurrentArticleIndex(prevIndex => prevIndex + 1)}>Next Article</button>

            <h3>Comments:</h3>
            <div className="comment-form">
                <textarea
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button onClick={postComment}>Post Comment</button>
            </div>

            <div className="comments-section">
                {comments
                    .filter(comment => comment.article === currentArticleIndex) // Filter comments for the current article
                    .map((comment) => (
                        <CommentComponent
                            key={currentArticleIndex}
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
