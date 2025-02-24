import "remixicon/fonts/remixicon.css";
import { useState, useEffect } from "react";
import CreatePost from "../components/CreatePost";
import SideBar from "../components/SideBar";

const Home = () => {


const user_id=localStorage.getItem("user_id");
  const posts = [
    {
      name: "Jimmy ki",
      description: "Creative soul who loves experimenting with new ideas.",
      hashtags: ["#Innovation", "#CreativeMinds", "#NewIdeas"],
      username: "jimmyki_",
      likes: "22k",
      comments: "1.5k",
      shares: "900",
      views: "120k",
    },
    {
      name: "Varun kill",
      description: "Adventurer, constantly exploring new paths.",
      hashtags: ["#Adventure", "#Explorer", "#Wanderlust"],
      username: "varunkillx",
      likes: "1.9k",
      comments: "350",
      shares: "120",
      views: "18k",
    },
    {
      name: "hdgfu dh",
      description: "Someone who thrives in chaos and finds beauty in it.",
      hashtags: ["#ChaosTheory", "#BeautyInTheMess", "#CreativeProcess"],
      username: "hdgfu_dh",
      likes: "3.5k",
      comments: "420",
      shares: "210",
      views: "32k",
    },
    {
      name: "difikn",
      description: "A digital wizard who's always on the cutting edge of tech.",
      hashtags: ["#TechGuru", "#DigitalInnovator", "#FutureForward"],
      username: "difikn_tech",
      likes: "18k",
      comments: "2.1k",
      shares: "1.2k",
      views: "95k",
    },
    {
      name: "cvbjb",
      description: "A curious mind always searching for answers.",
      hashtags: ["#Curiosity", "#ExploreTheUnknown", "#QuestForKnowledge"],
      username: "cvbjb_quest",
      likes: "750",
      comments: "88",
      shares: "45",
      views: "6.2k",
    },
    {
      name: "dfvub",
      description: "Bringing unique perspectives to every challenge.",
      hashtags: ["#NewPerspective", "#ProblemSolver", "#ThinkDifferent"],
      username: "dfvub_vision",
      likes: "9.2k",
      comments: "1.1k",
      shares: "560",
      views: "40k",
    },
    {
      name: "ndgk",
      description: "Thriving in the midst of complexity and finding solutions.",
      hashtags: ["#Complexity", "#Solutions", "#Innovation"],
      username: "ndgk_solver",
      likes: "11.8k",
      comments: "950",
      shares: "490",
      views: "56k",
    },
    {
      name: "Fragment",
      description: "A philosopher at heart with a love for deep thinking.",
      hashtags: ["#Philosophy", "#DeepThoughts", "#Mindfulness"],
      username: "fragment_x",
      likes: "2.3k",
      comments: "300",
      shares: "180",
      views: "15k",
    },
    {
      name: "dgk",
      description: "Eager to solve problems, no matter the difficulty.",
      hashtags: ["#ProblemSolver", "#CreativeMind", "#Innovator"],
      username: "dgk_ideas",
      likes: "5.6k",
      comments: "700",
      shares: "390",
      views: "22k",
    },
    {
      name: "kknk",
      description: "Chasing dreams with no limits in sight.",
      hashtags: ["#ChaseYourDreams", "#NoLimits", "#Ambition"],
      username: "kknk_dreamer",
      likes: "1.2k",
      comments: "210",
      shares: "140",
      views: "9k",
    },
    {
      name: "jsngrfjnklf",
      description: "Always in the pursuit of knowledge and new experiences.",
      hashtags: ["#LearningJourney", "#KnowledgeSeeker", "#EndlessGrowth"],
      username: "jsngrfjnklf_",
      likes: "890",
      comments: "120",
      shares: "65",
      views: "5.7k",
    },
    {
      name: "ndgnk",
      description: "Dedicated to breaking down barriers and pushing limits.",
      hashtags: ["#BreakingBarriers", "#PushLimits", "#Innovator"],
      username: "ndgnk_pioneer",
      likes: "6.4k",
      comments: "780",
      shares: "350",
      views: "28k",
    },
    {
      name: "njnk",
      description: "Inspiring others with unique perspectives and ideas.",
      hashtags: ["#Inspiration", "#UniqueIdeas", "#CreativeVision"],
      username: "njnk_inspire",
      likes: "4.1k",
      comments: "500",
      shares: "270",
      views: "18k",
    },
    {
      name: "Jimmy ki",
      description: "Driven by passion and purpose, always moving forward.",
      hashtags: ["#PurposeDriven", "#PassionFuel", "#ForwardThinking"],
      username: "jimmyki_dream",
      likes: "12.7k",
      comments: "1.3k",
      shares: "720",
      views: "62k",
    },
    {
      name: "Varun kill",
      description: "Challenging conventional wisdom and thinking outside the box.",
      hashtags: ["#ChallengeTheNorm", "#ThinkOutsideTheBox", "#Disrupt"],
      username: "varunkill_thinker",
      likes: "7.9k",
      comments: "980",
      shares: "480",
      views: "35k",
    },
  ];

  const accountsToFollow = posts.slice(0, 8);  // Get first 8 accounts
  const [isCommenting, setIsCommenting] = useState(false);
  const [comment, setComment] = useState('');

  const [commentsState, setCommentsState] = useState(
    posts.map(() => ({ isCommenting: false, comment: "" })) // Initialize state for each post
  );

  // Toggle the comment section visibility for a specific post
  const handleCommentToggle = (index) => {
    setCommentsState(prevState =>
      prevState.map((item, idx) =>
        idx === index
          ? { ...item, isCommenting: !item.isCommenting } // Toggle visibility for the specific post
          : item
      )
    );
  };



  // Handle posting a comment for the specific post
  const handlePostComment = (index) => {
    // Perform the logic to post the comment (e.g., save it to the backend)

    // After posting, close the comment box and reset the comment
    setCommentsState(prevState =>
      prevState.map((item, idx) =>
        idx === index
          ? { ...item, isCommenting: false, comment: "" } // Close the comment box and reset
          : item
      )
    );
  };

  // Handle canceling the comment input for the specific post
  const handleCancelComment = (index) => {
    setCommentsState(prevState =>
      prevState.map((item, idx) =>
        idx === index
          ? { ...item, isCommenting: false, comment: "" } // Close the comment box and reset
          : item
      )
    );
  };







  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Menu Button for Small and Medium Devices */}
      <SideBar />

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-900 p-6 max-w-3xl mx-auto">
        {/* Stories Section */}
        <div className="mt-8">
          {/* Stories Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold">Stories</h1>
            <a href="#" className="text-blue-500 flex items-center">
              <i className="ri-play-circle-line text-xl"></i>
              <span className="ml-2">Watch all</span>
            </a>
          </div>

          {/* Stories Carousel */}
          <div className="flex space-x-4 mt-4 overflow-x-auto hide-scrollbar">
            {[...Array(15)].map((_, i) => (
              <div key={i} className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full border-2 border-blue-500 flex items-center justify-center">
                  <img
                    src={`/src/assets/profile-${i}.jpeg`}
                    alt="Profile"
                    className="w-14 h-14 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* For You Heading */}
        {/*          */}
        <CreatePost />

        {/* Feed Section */}
        <div className="mt-8 ">
          {posts.map((post, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-4 mb-6  overflow-hidden">
              {/* Profile and Name */}
              <div className="flex items-center">
                <img
                  src={`/src/assets/Posts/posts-${index}.jpeg`}
                  alt="Profile"
                  className="w-14 h-14 rounded-full"
                />
                <div className="ml-2">
                  <h3 className="text-sm font-semibold">{post.name}</h3>
                  <span className="text-sm text-gray-400">{post.username}</span>
                </div>
              </div>

              {/* Description and Hashtags */}
              <div className="mt-4">
                <p className="text-sm">{post.description}</p>
                <p className="text-sm text-blue-500 mt-1">
                  {post.hashtags.join(" ")}
                </p>
              </div>

              {/* Post Image */}
              <div className="flex justify-center mt-4">

                <img
                  src={`/src/assets/profile-${index}.jpeg`}
                  alt=""
                  className=" max-w-2xl  h-100 rounded-lg"
                />
              </div>

              {/* Like, Comment, Share, and Views Icons */}
              <div className="flex justify-between items-center mt-4 w-full">

                <div className="flex items-center space-x-4">
                  {!commentsState[index].isCommenting && (
                    <i
                      className="ri-chat-3-line text-gray-400 cursor-pointer"
                      onClick={() => handleCommentToggle(index)}
                    ></i>
                  )}

                  <span className="text-gray-400">{post.comments || "0"}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <i className="ri-repeat-line text-gray-400"></i>
                  <span className="text-gray-400">{post.shares || "0"}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <i className="ri-heart-line text-gray-400"></i>
                  <span className="text-gray-400">{post.likes || "0"}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <i className="ri-eye-line text-gray-400"></i>
                  <span className="text-gray-400">{post.views || "0"}</span>
                </div>


              </div>
              <div key={post.id}>
                <div>
                  {/* Post content */}
                  <p>{post.content}</p>

                  {/* Comment Section */}
                  {commentsState[index].isCommenting && (
                    <div className="mt-4">
                      <textarea
                        className="w-full p-2 border border-gray-700 bg-gray-800 text-white rounded-md"
                        placeholder="Write a comment..."
                        value={commentsState[index].comment}
                        onChange={(e) => {
                          const updatedCommentsState = [...commentsState];
                          updatedCommentsState[index].comment = e.target.value;
                          setCommentsState(updatedCommentsState);
                        }}
                      ></textarea>

                      <div className="mt-2 flex space-x-4">
                        <button
                          onClick={() => handlePostComment(index)}
                          className="bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-500"
                        >
                          Post
                        </button>
                        <button
                          onClick={() => handleCancelComment(index)}
                          className="bg-gray-600 text-white px-4 py-2 rounded-full hover:bg-gray-500"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}


                </div>
              </div>


            </div>
          ))}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-100 bg-gray-800 p-6 sticky top-0 h-screen overflow-y-auto hidden lg:block">
        {/* Search Bar */}
        <div className="flex items-center bg-gray-700 rounded-full px-4 py-2">
          <i className="ri-search-line text-gray-400"></i>
          <input
            type="text"
            placeholder="Search Twitter"
            className="bg-transparent ml-2 w-full focus:outline-none"
          />
        </div>

        {/* Profiles to Follow */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Who to follow</h2>
          {accountsToFollow.map((profile, index) => (
            <div key={index} className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <img
                  src={`/src/assets/profile-${index + 1}.jpeg`}
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-2">
                  <h3 className="text-lg font-semibold">{profile.name}</h3>
                  <span className="text-sm text-gray-400">{profile.username}</span>
                </div>
              </div>
              <button className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                Follow
              </button>
            </div>
          ))}
        </div>

        {/* Trending Hashtags */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Trending Hashtags</h2>

          {accountsToFollow.map((profile, index) => (
            <div key={index} className="mt-4 flex flex-wrap gap-2">
              <p className="text-sm text-blue-500 mt-1">
                {profile.hashtags.join(" ")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;