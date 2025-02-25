import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

const Explore = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]); // State to hold posts related to clicked hashtag
  const [selectedHashtag, setSelectedHashtag] = useState(null);


  const recommendations = [
    { id: 1, name: "#luffy" },
    { id: 2, name: "#zoro" },
    { id: 3, name: "#Sanji" },
    { id: 4, name: "#react" },
  ];

  // Fetch posts from API
  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/tweets");
      setPost(response.data); // Save posts to state
    } catch (err) {
      console.log("Error in fetching posts: ", err);
    }
  };

  useEffect(() => {
    getData();
  }, []); // Fetch data on mount

  // Function to fetch search suggestions
  const fetchSuggestions = async (query) => {
    if (query.length === 0) {
      setSuggestions([]); // Clear suggestions if query is empty
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/profiles/search?q=${query}`);
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchSuggestions(query);
    }, 500);

    return () => clearTimeout(timeoutId); // Cleanup timeout on query change
  }, [query]);

  // Function to open modal with the selected post
  const openModal = (post) => {
    setSelectedPost(post);
    setModalOpen(true); // Open the modal
  };

  // Function to close the modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedPost(null); // Clear selected post
    setRelatedPosts([]); // Clear related posts when closing the modal
  };

  // Function to handle hashtag click and filter posts based on the clicked hashtag
  const handleHashtagClick = (hashtag) => {
    console.log("Selected Hashtag: ", hashtag);  // Debugging line
    setSelectedHashtag(hashtag);  // Set the selected hashtag
    const filteredPosts = post.filter((item) =>
      item.hashtags.includes(hashtag) // Filter posts by the selected hashtag
    );
    setRelatedPosts(filteredPosts); // Update the related posts
  };
  

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 shadow-sm">
        <div className="container mx-auto flex items-center justify-between p-4">
          <div className="flex items-center justify-center ml-5">
            <a href="/home" className="flex items-center">
            {/* <FontAwesomeIcon icon={faTwitter} style={{ color: "#ffffff" }} size="2x" /> */}
            <h1 className="ml-2 text-white">JWorld</h1>
            </a>
          </div>

          <div id="web" className="flex-1 flex justify-center mt-5 relative">
            <input
              type="text"
              placeholder="Search your world"
              className="w-full sm:w-96 md:w-[500px] h-12 px-6 py-2 border border-gray-700 rounded-full bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={query}
              onChange={(e) => setQuery(e.target.value)} // Update query on input change
            />

            {query.length > 0 && (
              <section className="absolute top-full mt-1 w-full sm:w-96 md:w-[500px] bg-gray-800 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
                {loading ? (
                  <p className="text-white text-center py-2">Loading...</p>
                ) : (
                  <div className="px-4 py-2">
                    {suggestions.length > 0 ? (
                      <div className="flex flex-col space-y-1 mb-2">
                        {suggestions.map((suggestion) => (
                          <div
                            key={suggestion.id}
                            className="bg-gray-700 p-3 text-gray-300 hover:bg-gray-600 cursor-pointer rounded-lg transition-all"
                          >
                            {suggestion.username}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-400 text-center">No suggestions found</p>
                    )}
                  </div>
                )}
              </section>
            )}
          </div>
        </div>
      </header>

      <main className="bg-gray-900 py-6">
        <div className="container mx-auto">
          <section className="mt-4 px-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {recommendations.map((item) => (
                <div
                key={item.id}
                className={`flex flex-col items-center justify-center p-4  rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer
                  ${selectedHashtag === item.name ? 'bg-gray-500' : 'bg-gray-800'}`} // Change background color based on selectedHashtag
                onClick={() => handleHashtagClick(item.name)}
              >
                <p className="mt-1 text-sm font-medium text-gray-300">
                  {item.name}
                </p>
              </div>
              
              ))}
            </div>
          </section>

          <h4 className="mt-5 text-sm font-bold text-white mb-4">Top Posts</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {relatedPosts.length > 0
              ? relatedPosts.map((item) => (
                  <img
                    key={item.tweet_id}
                    src={item.imagepath}
                    alt="Related Post"
                    className="w-full h-2/3 rounded-lg shadow-md cursor-pointer object-cover"
                    onClick={() => openModal(item)}
                  />
                ))
              : post.map((item) => (
                  <img
                    key={item.tweet_id}
                    src={item.imagepath}
                    alt="Post"
                    className="w-full h-2/3 rounded-lg shadow-md cursor-pointer object-cover"
                    onClick={() => openModal(item)}
                  />
                ))}
          </div>

          {modalOpen && selectedPost && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
              <div className="bg-gray-900 p-6 rounded-lg max-w-4xl w-full flex">
                <div className="flex-none w-1/2 pr-4">
                  <img
                    src={selectedPost.imagepath}
                    alt="Selected Post"
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                </div>
                <div className="flex-1 w-1/2">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-white font-serif text-4xl">{selectedPost.username}</h3>
                    <button onClick={closeModal} className="text-white text-xl font-bold cursor-pointer">
                      &times;
                    </button>
                  </div>
                  <div className="text-white p-10 text-xl">
                    <p className="mt-4">{selectedPost.tweet_text}</p>
                    <p className="mt-2 text-sm">
                      <strong>Created At:</strong> {new Date(selectedPost.tweet_created_at).toLocaleString()}
                    </p>
                    <p className="mt-2 text-sm">
                      <strong>Hashtags:</strong>{" "}
                      {selectedPost.hashtags.map((hashtag, index) => (
                        <span
                          key={index}
                          className="text-blue-500 cursor-pointer"
                          onClick={() => handleHashtagClick(hashtag)}
                        >
                          {hashtag}
                          {index < selectedPost.hashtags.length - 1 && ", "}
                        </span>
                      ))}
                    </p>
                    <p className="mt-2 text-sm">
                      <strong>Likes:</strong> {selectedPost.like_count}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* <h1>Related posts</h1> */}
          {/* {relatedPosts.length > 0 && (
            <section className="mt-5 px-4">
              <h3 className="text-white text-lg font-semibold">Related Posts</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {relatedPosts.map((item) => (
                  <img
                    key={item.tweet_id}
                    src={item.imagepath}
                    alt="Related Post"
                    className="w-full rounded-lg shadow-md cursor-pointer"
                    onClick={() => openModal(item)}
                  />
                ))}
              </div>
            </section>
          )} */}
        </div>
      </main>
    </div>
  );
};

export default Explore;
