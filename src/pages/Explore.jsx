import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

const Explore = () => {
  // State to track search query and suggestions
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Array of recommendations with icons and names (can be static or dynamic)
  const recommendations = [
    { id: 1, name: "#Traveling" },
    { id: 2, name: "#Mountains" },
    { id: 3, name: "#Technology" },
    { id: 4, name: "#Food" },
    { id: 5, name: "#Fitness" },
    { id: 6, name: "#Art" },
  ];
  

  // Function to fetch search suggestions
  const fetchSuggestions = async (query) => {
    if (query.length === 0) {
      setSuggestions([]); // Clear suggestions if query is empty
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/profiles/search?q=${query}`);
      setSuggestions(response.data); // Update suggestions with response
      console.log(response.data);  // For debugging purposes
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  // Debounce the search query to avoid multiple requests while typing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchSuggestions(query);
    }, 500); // Wait 500ms after typing to trigger the request

    return () => clearTimeout(timeoutId); // Cleanup timeout on query change
  }, [query]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Section */}
      <header className="bg-black shadow-sm">
        <div className="container mx-auto flex items-center justify-between p-4">
          {/* Logo */}
          <div className="flex items-center justify-center ml-5">
            <FontAwesomeIcon icon={faTwitter} style={{ color: "#ffffff" }} size="2x" />
            <h1 className="ml-2 text-white">JWorld</h1>
          </div>

          {/* Search Bar */}
          <div id="web" className="flex-1 flex justify-center mt-5 relative">
  <input
    type="text"
    placeholder="Search your world"
    className="w-full sm:w-96 md:w-[500px] h-12 px-6 py-2 border border-gray-700 rounded-full bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
    value={query}
    onChange={(e) => setQuery(e.target.value)} // Update query on input change
  />

  {/* Search Suggestions Section */}
  {query.length > 0 && (
    <section className="absolute top-full mt-1 w-full sm:w-96 md:w-[500px] bg-transparent rounded-lg shadow-md max-h-60 overflow-y-auto">
      {loading ? (
        <p className="text-white text-center py-2">Loading...</p>
      ) : (
        <div className="px-4 py-2">
          {suggestions.length > 0 ? (
            <div className="flex flex-col space-y-0 mb-2">
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="bg-gray-700 p-3  text-gray-300 hover:bg-gray-600 cursor-pointer "
                >
                  {suggestion.username} {/* Display the suggestion */}
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

      {/* Main Section */}
      <main className="bg-black py-6">
        <div className="container mx-auto">
          {/* Recommendation Section */}
          <section className="mt-4 px-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {recommendations.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col items-center justify-center p-4 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <p className="mt-1 text-sm font-medium text-gray-300">{item.name}</p>
                </div>
              ))}
            </div>
          </section>

          

          {/* Top Posts Section */}
          <h4 className="mt-5 text-sm font-bold text-white mb-4">Top Posts</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[0, 1, 2, 3, 4, 5, 6].map((item) => (
              <img key={item} src={`./img/feed${item}.jpg`} alt="" className="w-full rounded-lg shadow-md" />
            ))}
          </div>

          {/* Most Recent Section */}
          <h4 className="text-sm font-bold text-white mt-8 mb-4">Most Recent</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[7, 8, 9, 10, 11, 12, 13, 14].map((item) => (
              <img key={item} src={`./img/feed${item}.jpg`} alt="" className="w-full rounded-lg shadow-md" />
            ))}
          </div>
        </div>
      </main>

      {/* Footer Section (App Only) */}
      <footer className="fixed bottom-0 w-full bg-black p-4 flex items-center justify-between shadow-lg border-t border-gray-800">
        <i className="fas fa-home text-2xl text-gray-400"></i>
        <i className="fas fa-search text-2xl text-gray-400"></i>
        <i className="far fa-plus-square text-2xl text-gray-400"></i>
        <i className="far fa-heart text-2xl text-gray-400"></i>
        <img src="./img/user.jpg" alt="user" className="w-8 h-8 rounded-full" />
      </footer>
    </div>
  );
};

export default Explore;