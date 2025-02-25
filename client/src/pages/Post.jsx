import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Post = () => {
  const [posts, setPost] = useState([]);
const user_id=localStorage.getItem("user_id");
console.log(user_id);

  const [commentsState, setCommentsState] = useState([]);
  const [like, setLike] = useState(0);
  const [comment, setComment] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    // Check if there's a token in localStorage
    const token = localStorage.getItem('token');
    
    if (!token) {
      // Redirect to login page if token is not found
      navigate('/login');
    }
  }, [navigate]);

const likePost= async(tweetId)=>{
    try{
      console.log("tzzzweetssssssId",tweetId);
      
        setLike(like=>like+1);
        const response=await axios.post(`http://localhost:3000/likes/`,{
          tweetId:tweetId,
            userId:user_id
        })
        console.log("like is added",like);
        
        console.log(response.data);
    }catch(err){
        console.log("Error in adding like",err);
    }
}
  // Fetch posts when component mounts
  const getPost = async () => {
    try {
      const response = await axios.get("http://localhost:3000/tweets");
      console.log(response.data);
      
      setPost(response.data);
      setCommentsState(
        response.data.map(() => ({ isCommenting: false, comment: "" })) // Initialize comment state for each post
      );
    } catch (err) {
      console.log("Error in fetching posts: ", err);
    }
  };

 

  // Toggle comment section visibility for a specific post
  const handleCommentToggle = (index) => {
    setCommentsState((prevState) =>
      prevState.map((item, idx) =>
        idx === index
          ? { ...item, isCommenting: !item.isCommenting }
          : item
      )
    );
  };

  // Handle posting a comment for a specific post
  const handlePostComment = (index) => {
    // Logic to post the comment (e.g., send to the backend)
    const commentText = commentsState[index].comment;
    if (commentText.trim()) {
      console.log("Posting comment:", commentText);
      // Reset comment state after posting
      setCommentsState((prevState) =>
        prevState.map((item, idx) =>
          idx === index
            ? { ...item, isCommenting: false, comment: "" }
            : item
        )
      );
    }
  };

  // Handle canceling the comment input for a specific post
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
    <div>
        <button onClick={getPost}>Get Post</button>
      <div className="mt-8 text-white">
        {posts.map((post, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-4 mb-6 overflow-hidden">
            {/* Profile and Name */}
            <div className="flex items-center">
              <img
                src={`/src/assets/Posts/posts-${index}.jpeg`} // Check if this path is correct
                alt="Profile"
                className="w-14 h-14 rounded-full"
              />
              <div className="ml-2">
                <h3 className="text-sm font-semibold text-white">{post.text}</h3>
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
                src={`${post.imagepath}`} // Check if this path is correct
                alt="Post"
                className="max-w-2xl h-100 rounded-lg"
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
              <div className="flex items-center space-x-4 cursor-pointer" onClick={()=>likePost(post.tweet_id)}>
                <i className="ri-heart-line text-red-500"></i>
                <span className="text-gray-400">{like}</span>
              </div>
              <div className="flex items-center space-x-4">
                <i className="ri-eye-line text-gray-400"></i>
                <span className="text-gray-400">{post.views || "0"}</span>
              </div>
            </div>

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
        ))}
      </div>
    </div>
  );
};

export default Post;
