import { useEffect, useState } from 'react';
import axios from 'axios';
 
const BookmarksPage = () => {
  const [bookmarkedTweets, setBookmarkedTweets] = useState([]);
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // To handle any potential errors
  const userId = localStorage.getItem("user_id");
  console.log(userId);
 
  useEffect(() => {
    // Fetch bookmarks for the user
    const fetchBookmarks = async () => {
      try {
        setLoading(true); // Set loading to true while fetching
        const response = await axios.get(`http://localhost:3000/bookmarks/${userId}`);
       
        // Assuming response.data is the list of bookmarked tweets
        if (response.data) {
          setBookmarkedTweets(response.data); // Set the bookmarks data
          // console.log(bookmarkedTweets);
        }
      } catch (error) {
        setError('Error fetching bookmarks'); // Handle error
        console.error('Error fetching bookmarks:', error);
      } finally {
        setLoading(false); // Set loading to false once fetching is done
      }
    };
 
    if (userId) {
      fetchBookmarks();
    }
  }, [userId]);
 
  const handleRemoveBookmark = async (tweetId) => {
    try {
      console.log("Removing bookmark", tweetId, userId);
     
      // Perform the delete request to remove the bookmark
      await axios.delete(`http://localhost:3000/bookmarks/${userId}/${tweetId}`);
      console.log("Successfully deleted bookmark");
 
     
      // Update the state by filtering out the removed tweet
      setBookmarkedTweets(prevTweets =>
        prevTweets.filter(bookmark => bookmark.tweetId !== tweetId)
      ); // Ensure you're using the latest state
 
    } catch (error) {
      setError('Error removing bookmark');
      console.error('Error removing bookmark:', error);
    }
  };
 
  return (
    <div className="min-h-screen bg-gray-900 text-white py-8">
      {loading ? (
        <p className="text-center text-xl">Loading...</p> // Show loading text while data is being fetched
      ) : error ? (
        <p className="text-center text-xl text-red-500">{error}</p> // Display error message if something went wrong
      ) : bookmarkedTweets.length === 0 ? (
        <p className="text-center text-xl">No posts bookmarked yet!</p> // Handle case where there are no bookmarks
      ) : (
        <div className="container mx-auto px-4">
          <h2 className='font-sans text-center text-5xl py-5'>Saved Posts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {bookmarkedTweets.map((bookmark) => (
              <div key={bookmark.tweetId} className="tweet-card bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all">
                {bookmark.image_url && (
                  <img
                    src={bookmark.image_url}
                    alt="Tweet"
                    className="w-full h-80 object-contain rounded-t-lg"
                  />
                )}
                <div className="p-4">
                  <p className="text-lg text-gray-300">{bookmark.text}</p>
                  <button
                    onClick={() => handleRemoveBookmark(bookmark.tweetid)} // Ensure tweetId is used here
                    className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Remove Bookmark
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
 
export default BookmarksPage;
 
 