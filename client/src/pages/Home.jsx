// import "remixicon/fonts/remixicon.css";
// import { useState, useEffect } from "react";
// import CreatePost from "../components/CreatePost";
// import SideBar from "../components/SideBar";
// import axios from "axios";

// const Home = () => {
//   const [posts, setPost] = useState([]);
//   const [commentsState, setCommentsState] = useState([]);
//   const [like, setLike] = useState(0);
//   const user_id = localStorage.getItem("user_id");

//   console.log(user_id);

//   const likePost = async (tweetId) => {
//     try {
//       console.log("tzzzweetssssssId", tweetId);
//       setLike(like => like + 1);
//       const response = await axios.post("http://localhost:3000/likes/", {
//         tweetId: tweetId,
//         userId: user_id,
//       });
//       console.log("like is added", like);
//       console.log(response.data);
//     } catch (err) {
//       console.log("Error in adding like", err);
//     }
//   };

//   const getPost = async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/tweets/info");
//       console.log(response.data);

//       // Ensure that the posts are properly mapped
//       setPost(response.data.tweets);  // Make sure that response.data.tweets exists

//       // Initialize comment state
//       setCommentsState(response.data.tweets.map(() => ({ isCommenting: false, comment: "" })));
//     } catch (err) {
//       console.log("Error in fetching posts: ", err);
//     }
//   };

//   useEffect(() => {
//     getPost(); // Fetch posts on component mount
//   }, []); // Empty dependency array means it runs only once

//   const handleCommentToggle = (index) => {
//     setCommentsState((prevState) =>
//       prevState.map((item, idx) =>
//         idx === index
//           ? { ...item, isCommenting: !item.isCommenting }
//           : item
//       )
//     );
//   };

//   const handlePostComment = (index) => {
//     const commentText = commentsState[index].comment;
//     if (commentText.trim()) {
//       console.log("Posting comment:", commentText);
//       setCommentsState((prevState) =>
//         prevState.map((item, idx) =>
//           idx === index
//             ? { ...item, isCommenting: false, comment: "" }
//             : item
//         )
//       );
//     }
//   };

//   const handleCancelComment = (index) => {
//     setCommentsState((prevState) =>
//       prevState.map((item, idx) =>
//         idx === index
//           ? { ...item, isCommenting: false, comment: "" }
//           : item
//       )
//     );
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-900 text-white">
//       <SideBar />

//       <div className="flex-1 bg-gray-900 p-6 max-w-3xl mx-auto">
//         <CreatePost />

//         <div className="mt-8">
//           {posts.map((post, index) => (
//             <div key={post.tweet_id} className="bg-gray-800 rounded-lg p-4 mb-6 overflow-hidden">
//               <div className="flex items-center">
//                 <img
//                   src={`/src/assets/Posts/posts-${index}.jpeg`}
//                   alt="Profile"
//                   className="w-14 h-14 rounded-full"
//                 />
//                 <div className="ml-2">
//                   <h3 className="text-sm font-semibold">{post.name}</h3>
//                   <span className="text-sm text-gray-400">{post.tweetUserName}</span>
//                 </div>
//               </div>

//               <div className="mt-4">
//                 <p className="text-sm">{post.text}</p>
//                 <p className="text-sm text-blue-500 mt-1">{post.hashtags}</p>
//               </div>

//               <div className="flex justify-center mt-4">
//                 <img src={post.imagePath} alt="" className="max-w-2xl h-100 rounded-lg" />
//               </div>

//               <div className="flex justify-between items-center mt-4 w-full">
//                 <div className="flex items-center space-x-4">
//                   {!commentsState[index].isCommenting && (
//                     <i
//                       className="ri-chat-3-line text-gray-400 cursor-pointer"
//                       onClick={() => handleCommentToggle(index)}
//                     ></i>
//                   )}
//                   <span className="text-gray-400">{post.comments || "0"}</span>
//                 </div>
//                 <div className="flex items-center space-x-4">
//                   <i className="ri-repeat-line text-gray-400"></i>
//                   <span className="text-gray-400">{post.shares || "0"}</span>
//                 </div>
//                 <div className="flex items-center space-x-4">
//                   <i className="ri-heart-line text-gray-400" onClick={() => likePost(post.tweet_id)}></i>
//                   <span className="text-gray-400">{post.likes || "0"}</span>
//                 </div>
//                 <div className="flex items-center space-x-4">
//                   <i className="ri-eye-line text-gray-400"></i>
//                   <span className="text-gray-400">{post.views || "0"}</span>
//                 </div>
//               </div>

//               {commentsState[index].isCommenting && (
//                 <div className="mt-4">
//                   <textarea
//                     className="w-full p-2 border border-gray-700 bg-gray-800 text-white rounded-md"
//                     placeholder="Write a comment..."
//                     value={commentsState[index].comment}
//                     onChange={(e) => {
//                       const updatedCommentsState = [...commentsState];
//                       updatedCommentsState[index].comment = e.target.value;
//                       setCommentsState(updatedCommentsState);
//                     }}
//                   ></textarea>

//                   <div className="mt-2 flex space-x-4">
//                     <button
//                       onClick={() => handlePostComment(index)}
//                       className="bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-500"
//                     >
//                       Post
//                     </button>
//                     <button
//                       onClick={() => handleCancelComment(index)}
//                       className="bg-gray-600 text-white px-4 py-2 rounded-full hover:bg-gray-500"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="w-100 bg-gray-800 p-6 sticky top-0 h-screen overflow-y-auto hidden lg:block">
//         <div className="flex items-center bg-gray-700 rounded-full px-4 py-2">
//           <i className="ri-search-line text-gray-400"></i>
//           <input
//             type="text"
//             placeholder="Search Twitter"
//             className="bg-transparent ml-2 w-full focus:outline-none"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;


import "remixicon/fonts/remixicon.css";
import { useState, useEffect } from "react";
import CreatePost from "../components/CreatePost";
import SideBar from "../components/SideBar";
import axios from "axios";

const Home = () => {
  const [posts, setPost] = useState([]);
  const [like,setLike] = useState(0);
  const [commentsState, setCommentsState] = useState([]);
  const [newComment, setNewComment] = useState("");
  const user_id = localStorage.getItem("user_id");

  console.log(user_id);

  // const likePost = async (tweetId) => {
  //   try {
  //     setLike(like => like + 1);
  //     const response = await axios.post("http://localhost:3000/likes/", {
  //       tweetId: tweetId,
  //       userId: user_id,
  //     });
  //     console.log("like is added", like);
  //     console.log(response.data);
  //   } catch (err) {
  //     console.log("Error in adding like", err);
  //   }
  // };

  const likePost = async (tweetId, index) => {
    try {
      // Optimistically update the like count
      const updatedPosts = [...posts];
      console.log(updatedPosts[index], posts[index]);
      
      //updatedPosts[index].likeCount = parseInt(updatedPosts[index].likeCount) + 1; // Increment the like count
      //setPost(updatedPosts);  // Update the posts state immediately to reflect the new like count
  
      const response = await axios.post("http://localhost:3000/likes/", {
        tweetId: tweetId,
        userId: user_id,
      });
  
      console.log("Like is added", response.data);
      console.log(response.data.message);
      if(response.data.message){
        updatedPosts[index].likeCount = parseInt(updatedPosts[index].likeCount) - 1;
      }else{
        updatedPosts[index].likeCount = parseInt(updatedPosts[index].likeCount) + 1;
      }
      setPost(updatedPosts);
    } catch (err) {
      console.log("Error in adding like", err);
    }
  };
  

  const getPost = async () => {
    try {
      const response = await axios.get("http://localhost:3000/tweets/info");
      console.log(response.data);

      // Ensure that the posts are properly mapped
      setPost(response.data.tweets);  // Make sure that response.data.tweets exists

      // Initialize comment state
      setCommentsState(response.data.tweets.map(() => ({ isCommenting: false, comment: "", replies: [] })));
    } catch (err) {
      console.log("Error in fetching posts: ", err);
    }
  };

  const getReplies = async (tweetId, index) => {
    try {
      const response = await axios.get(`http://localhost:3000/replies/${tweetId}`);
      console.log(response.data);

      const updatedCommentsState = [...commentsState];
      updatedCommentsState[index].replies = response.data;
      setCommentsState(updatedCommentsState);
    } catch (err) {
      console.log("Error fetching replies:", err);
    }
  };

  useEffect(() => {
    getPost(); // Fetch posts on component mount
  }, []); // Empty dependency array means it runs only once

  const handleCommentToggle = async (index, tweetId) => {
    // Only fetch replies if the comment section is being opened (not closed)
    const updatedCommentsState = [...commentsState];
    updatedCommentsState[index].isCommenting = !updatedCommentsState[index].isCommenting;
    setCommentsState(updatedCommentsState);
  
    // Fetch replies only when the comment section is opened
    if (updatedCommentsState[index].isCommenting) {
      try {
        await getReplies(tweetId, index); // Fetch replies
      } catch (err) {
        console.log("Error fetching replies:", err);
      }
    }
  };
  

  const handlePostComment = async (index, tweetId) => {
    console.log(tweetId)
    const commentText = commentsState[index].comment;
    if (commentText.trim()) {
      try {
        // Post the new comment
        const response = await axios.post("http://localhost:3000/replies", {
          userId: user_id,
          tweetId: tweetId,
          text: commentText,
        });
        
        console.log("New comment posted:", response.data);
        
        // Add the new comment to the replies list
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
      <SideBar />

      <div className="flex-1 bg-gray-900 p-6 max-w-3xl mx-auto">
        <CreatePost />

        <div className="mt-8">
          {posts.map((post, index) => (
            <div key={post.tweetId} className="bg-gray-800 rounded-lg p-4 mb-6 overflow-hidden">
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
                  {/* <span className="text-gray-400">{post.comments}</span> */}
                </div>
                {/* <div className="flex items-center space-x-4">
                  <i className="ri-repeat-line text-gray-400"></i>
                  <span className="text-gray-400">{post.shares || "0"}</span>
                </div> */}
                <div className="flex items-center space-x-4">
                  <i className="ri-heart-line text-gray-400" onClick={() => likePost(post.tweetId, index)}></i>
                  <span className="text-gray-400">{post.likeCount|| "0"}</span>
                </div>
              </div>

              {commentsState[index].isCommenting && (
                <div className="mt-4">
                  <div className="bg-gray-700 p-4 rounded-lg">
                    {/* Display existing comments */}
                    {commentsState[index].replies.map((reply) => (
                      <div key={reply.id} className="mb-2">
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
        <div className="flex items-center bg-gray-700 rounded-full px-4 py-2">
          <i className="ri-search-line text-gray-400"></i>
          <input
            type="text"
            placeholder="Search Twitter"
            className="bg-transparent ml-2 w-full focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
