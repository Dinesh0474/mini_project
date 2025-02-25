import { useState, useEffect } from "react";
import CreatePost from "../components/CreatePost";
import SideBar from "../components/SideBar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [posts, setPost] = useState([]);
  const [commentsState, setCommentsState] = useState([]);
  const [like, setLike] = useState(0);
  const user_id = localStorage.getItem("user_id");
  const [bookmarkedTweets, setBookmarkedTweets] = useState([]);

  useEffect(() => {
    const getPostsAndBookmarks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/tweets/info");
        setPost(response.data.tweets);

        setCommentsState(response.data.tweets.map(() => ({ isCommenting: false, comment: "", replies: [] })));

        const bookmarksResponse = await axios.get(`http://localhost:3000/bookmarks/${user_id}`);
        setBookmarkedTweets(bookmarksResponse.data);
      } catch (err) {
        console.log("Error in fetching posts or bookmarks: ", err);
      }
    };

    getPostsAndBookmarks();
  }, []);

  const likePost = async (tweetId, index) => {
    try {
      const updatedPosts = [...posts];
      
      const response = await axios.post("http://localhost:3000/likes/", {
        tweetId: tweetId,
        userId: user_id,
      });

      if (response.data.message) {
        updatedPosts[index].likeCount = parseInt(updatedPosts[index].likeCount) - 1;
      } else {
        updatedPosts[index].likeCount = parseInt(updatedPosts[index].likeCount) + 1;
      }
      setPost(updatedPosts);
    } catch (err) {
      console.log("Error in adding like", err);
    }
  };

  const handleBookmarkClick = async (tweetId) => {
    try {
      const alreadyBookmarked = bookmarkedTweets.some((tweet) => tweet.tweetId === tweetId);

      if (!alreadyBookmarked) {
        const response = await axios.post("http://localhost:3000/bookmarks/", { tweetId, userId: user_id });

        if(response.data.isAlreadyBookmarked){
          toast.error("This post is already bookmarked.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false, 
            closeOnClick: true, 
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          toast.success("Post bookmarked successfully!");
          setBookmarkedTweets((prevState) => [
            ...prevState,
            { tweetId, userId: user_id, timestamp: Date.now() },
          ]);
        }
      } else {
        toast.info("This post is already bookmarked.");
      }
    } catch (error) {
      console.error("Error bookmarking post:", error);
      toast.error("Error bookmarking post!");
    }
  };

  const getReplies = async (tweetId, index) => {
    try {
      const response = await axios.get(`http://localhost:3000/replies/${tweetId}`);

      const updatedCommentsState = [...commentsState];
      updatedCommentsState[index].replies = response.data;
      setCommentsState(updatedCommentsState);
    } catch (err) {
      console.log("Error fetching replies:", err);
    }
  };

  const handleCommentToggle = async (index, tweetId) => {
    const updatedCommentsState = [...commentsState];
    updatedCommentsState[index].isCommenting = !updatedCommentsState[index].isCommenting;
    setCommentsState(updatedCommentsState);

    if (updatedCommentsState[index].isCommenting) {
      await getReplies(tweetId, index);
    }
  };

  const handlePostComment = async (index, tweetId) => {
    const commentText = commentsState[index].comment;
    if (commentText.trim()) {
      try {
        const response = await axios.post("http://localhost:3000/replies", {
          userId: user_id,
          tweetId: tweetId,
          text: commentText,
        });

        setCommentsState((prevState) =>
          prevState.map((item, idx) =>
            idx === index
              ? {
                  ...item,
                  isCommenting: false,
                  comment: "",
                  replies: [...item.replies, response.data], // Add new reply to the list
                }
              : item
          )
        );
      } catch (error) {
        console.log("Error posting comment:", error);
      }
    }
  };

  const handleCancelComment = (index) => {
    setCommentsState((prevState) =>
      prevState.map((item, idx) =>
        idx === index
          ? { ...item, isCommenting: false, comment: "" }
          : item
      )
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <SideBar bookmarkedTweets={bookmarkedTweets} />

      <div className="flex-1 bg-gray-900 p-6 max-w-3xl mx-auto">
        <CreatePost />

        <div className="mt-8">
          {posts.map((post, index) => (
            <div key={post.tweetId} className="bg-gray-800 rounded-lg p-4 mb-6 overflow-hidden">
              <div className="flex items-center">
                <img
                  src={`/src/assets/profile-3.jpg`}
                  alt="Profile"
                  className="w-14 h-14 rounded-full"
                />
                <div className="ml-2">
                  <h3 className="text-sm font-semibold">{post.name}</h3>
                  <span className="text-sm text-gray-400">{post.username}</span>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm">{post.text}</p>
                <p className="text-sm text-blue-500 mt-1">{post.hashtags}</p>
              </div>

              <div className="flex justify-center mt-4">
                <img src={post.imagePath} alt="" className="max-w-2xl h-100 rounded-lg" />
              </div>

              <div className="flex justify-between items-center mt-4 w-full">
                <div className="flex items-center space-x-4">
                  {!commentsState[index].isCommenting && (
                    <i
                      className="ri-chat-3-line text-gray-400 cursor-pointer"
                      onClick={() => handleCommentToggle(index, post.tweetId)}
                    ></i>
                  )}
                </div>

                <div className="flex items-center space-x-4">
                  <i
                    className={`ri-bookmark-${bookmarkedTweets.some((tweet) => tweet.tweetId === post.tweetId) ? 'fill' : 'line'} text-gray-400 cursor-pointer`}
                    onClick={() => handleBookmarkClick(post.tweetId)}
                  ></i>
                  <span className="text-gray-400">{post.shares || "0"}</span>
                </div>

                <div className="flex items-center space-x-4">
                  <i className="ri-heart-line text-gray-400" onClick={() => likePost(post.tweetId, index)}></i>
                  <span className="text-gray-400">{post.likeCount || "0"}</span>
                </div>
              </div>

              {commentsState[index].isCommenting && (
                <div className="mt-4">
                  <div className="bg-gray-700 p-4 rounded-lg">
                    {commentsState[index].replies.map((reply) => (
                      <div key={reply.id} className="mb-2">
                        <p>Username : {reply.username}</p>
                        <p className="text-sm">{reply.text}</p>
                      </div>
                    ))}
                  </div>

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
                      onClick={() => handlePostComment(index, post.tweetId)}
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
          ))}
        </div>
      </div>

      <div className="w-100 bg-gray-800 p-6 sticky top-0 h-screen overflow-y-auto hidden lg:block">
        <div className="flex flex-col items-center m-2 pl-2 bg-gray-700 rounded-full px-4 py-2 gap">
          <p>"Jworld is evolving! 🚀"
          </p>
          <p>"Your thoughts, your world! 🌎"

          </p>
          <p>"Stay connected, stay updated! 📢"
          </p>

        </div>
      </div>

    </div>
  );
};

export default Home;
