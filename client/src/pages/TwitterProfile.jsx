import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useNavigate
import { Eye, Heart, MessageCircle, Trash2, BadgeCheck, ArrowLeft} from 'lucide-react';
import axios from 'axios';
// import toi from "../assets/toi.jpg";
import { toast, ToastContainer } from 'react-toastify';
import '../index.css';

function TwitterProfile() {
  const [profile, setProfile] = useState(null);
  const [showMoreFollowers, setShowMoreFollowers] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    age: '',
    profession: ''
  });
  const [randomUsers, setRandomUsers] = useState([]); // State for random users
  const [followedUsers, setFollowedUsers] = useState(new Set()); // State for followed users
  const { userId } = useParams(); // Get userId from URL parameters
  const token = localStorage.getItem('token');
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
   
    if (!token) {
      // Redirect to login page if token is not found
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    // Load followed users from local storage
    const followed = JSON.parse(localStorage.getItem('followedUsers')) || [];
    setFollowedUsers(new Set(followed));

    if (token) {
      // Fetch profile data
      fetch(`http://localhost:3000/profiles/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setProfile(data);
          setFormData({
            username: data.username,
            fullName: data.fullName,
            age: data.age,
            profession: data.profession
          }); // Initialize form data with current profile data
        })
        .catch(error => {
          console.error('Error:', error);
        });

      // Fetch random users to follow
      fetch('http://localhost:3000/profiles/', { // Adjusted to fetch random profiles
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setRandomUsers(data); // Store the fetched random users
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } else {
      console.error('Token not found in local storage');
    }
  }, [userId, token]);

  const toggleShowMoreFollowers = () => {
    setShowMoreFollowers(!showMoreFollowers);
  };

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const logoutProfile = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    navigate('/');
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/profiles/${userId}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: formData.username,
        fullName: formData.fullName,
        age: formData.age,
        profession: formData.profession
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(updatedProfile => {
        setProfile(updatedProfile); // Update the profile state with the new data
        setIsEditing(false); // Exit editing mode
        // navigate('/twitterprofile'); // Redirect to the profile page 
        window.location.reload(); // Reload the page to reflect the changes
      })
      .catch(error => {
        console.error('Error:', error); // Log the error for debugging
      });
  };

  const followUser = (followingId) => {
    fetch('http://localhost:3000/follows/', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        followerId: userId,
        followingId: followingId
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Followed user:', data);
        setFollowedUsers(prev => {
          const updated = new Set(prev).add(followingId);
          localStorage.setItem('followedUsers', JSON.stringify(Array.from(updated))); // Persist to local storage
          return updated;
        });
        // Update profile following count
        setProfile(prevProfile => ({
          ...prevProfile,
          followingCount: prevProfile.followingCount + 1
        }));
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const unfollowUser = (followingId) => {
    fetch(`http://localhost:3000/follows/${userId}/${followingId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Unfollowed user:', data);
        setFollowedUsers(prev => {
          const updated = new Set(prev);
          updated.delete(followingId); // Remove from followed users
          localStorage.setItem('followedUsers', JSON.stringify(Array.from(updated))); // Persist to local storage
          return updated;
        });
        // Update profile following count
        setProfile(prevProfile => ({
          ...prevProfile,
          followingCount: prevProfile.followingCount - 1
        }));
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const deletePost = async (postId) => {
    try {
      // Delete the post from the server
      const response = await axios.delete(`http://localhost:3000/tweets/${postId}`);
      console.log(response.data);

      // Remove the deleted post from the local state
      setProfile(prevProfile => ({
        ...prevProfile,
        posts: prevProfile.posts.filter(post => post.id !== postId) // Filter out the deleted post
      }));

      // Show a success message (Optional)
      toast.success("Post deleted successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false, 
        closeOnClick: true, 
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error('Error:', error);
      // Handle any errors here, such as showing an error message
      toast.error("Failed to delete post", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  if (!profile) {
    return <div>No profile available.</div>; // Display message if no profile is found
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Main Content */}
      <div className="flex flex-col md:flex-row">
        {/* Left Section (Profile Details) */}
        <div className="w-full md:w-[60%] md:pr-2 mb-4 md:mb-0">
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="relative">
              <div className="text-bold text-2xl pb-1" onClick={() => navigate('/home')}>
              <ArrowLeft />
              </div>
              <div className="h-57 bg-gray-700 rounded-lg overflow-hidden">
                <div className="w-full h-full bg-[url(/src/assets/banner.jpg)]" />
                {/* Cover Image Placeholder */}
              </div>

              <div className="absolute -mt-15 left-4">
                <img
                  src="/src/assets/profile.jpg" // Replace with your profile picture URL
                  alt="Profile"
                  className="w-30 h-30 rounded-full border-4 border-gray-900 "
                />
              </div>
            </div>

            <div className="mt-17 ">
              <div className='flex text-xs justify-between'>
                <div className='flex '>
                  <h2 className="text-2xl font-semibold px-4 flex">{profile.username}</h2>
                  <BadgeCheck />
                </div>
                <div>
                  <button onClick={logoutProfile} className="bg-blue-500 text-xl text-white rounded-full px-5 pt-2 pb-3 ml-2 mr-5">Logout</button>
                </div>
              </div>
              <p className="text-gray-300 pl-3">@{profile.username}</p>
              <p className="text-gray-300 pl-3 mt-2">{profile.createdAt}</p>
              <div className="flex mt-2 ">
                <div className="mr-4 text-white">
                  <span className="font-semibold block pl-7 text-sm">{profile.followersCount}</span>
                  <span className="block hover:cursor-pointer pl-3 text-sm">Followers</span>
                </div>
                <div className="mr-4 text-white">
                  <span className="font-semibold block pl-4 text-sm">{profile.followingCount}</span>
                  <span className="block hover:cursor-pointer text-sm">Following</span>
                </div>
              </div>

              <button className="mt-4 border border-gray-300 hover:cursor-pointer text-white rounded-full px-4 py-2 w-full" onClick={handleEditClick}>
                Edit profile
              </button>
              {isEditing && (
                <form onSubmit={handleSubmit} className="mt-4">
                  <div>
                    <label className="block text-sm">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full p-2 rounded bg-gray-700 text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full p-2 rounded bg-gray-700 text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm">Age</label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      className="w-full p-2 rounded bg-gray-700 text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm">Profession</label>
                    <input
                      type="text"
                      name="profession"
                      value={formData.profession}
                      onChange={handleChange}
                      className="w-full p-2 rounded bg-gray-700 text-white"
                      required
                    />
                  </div>
                  <button type="submit" className="mt-4 border border-gray-300 hover:cursor-pointer text-white rounded-full px-4 py-2 w-full">
                    Save Changes
                  </button>
                </form>
              )}

              <hr className="border-t border-gray-700 my-4" />

              <div className="mt-8">
                {profile?.posts?.map((post) => (
                  <div key={post.id} className="bg-gray-900 rounded-lg p-7 mb-6 max-h-[675px]">
                    <div className="flex items-center">
                      <img
                        src="/src/assets/profile.jpg"
                        alt="Profile"
                        className="w-12 h-12 mt-3 rounded-full"
                      />
                      <div className="mt-4">
                        <p className="text-sm pl-4">{post.text}</p>
                        <p className="text-sm pl-4 text-blue-500 mt-1">
                          {post.hashtags.join(" ")}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-center mt-4">
                      <img
                        src={post.image} // Use the image path from the post
                        alt=""
                        className="max-w-7xl rounded-lg h-100 overflow-hidden "
                      />
                    </div>

                    <div className="flex justify-around items-center mt-7">
                      <div className="flex items-center space-x-4">
                        <MessageCircle />
                        <span className="text-gray-400">{post.comments || "0"}</span>
                      </div>
                      <div className="flex items-center space-x-4" onClick={() => deletePost(post.id)}>
                        <Trash2 />
                        {/* <span className="text-gray-400">{post.shares || "0"}</span> */}
                      </div>
                      <div className="flex items-center space-x-4">
                        <Heart />
                        <span className="text-gray-400">{post.likesCount || "0"}</span>
                      </div>
                     
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section (Who's Following) */}
        <div className="w-full md:w-1/2 md:px-4 mb-4 md:mb-0">
          <div className="mt-4">
            <h3 className="font-semibold text-lg">Who to follow</h3>
            {randomUsers.map((user) => (
              <div key={user.id} className="flex items-center mt-3 pl-4 bg-gray-800">
                <img
                  src={`/src/assets/profile-${getRandomInt(0, 9)}.jpg`} // Ensure the avatar URL is correct
                  alt={user.name}
                  className="w-12 h-12 rounded-full mr-2"
                />
                <div className='h-20'>
                  <h4 className="hover:cursor-pointer text-md mt-3 pl-4">
                    {user.name}
                  </h4>
                  <p className="text-gray-500 text-md pl-4 ">{user.username}</p>
                </div>
                {followedUsers.has(user.id) ? (
                  <button
                    className="bg-red-500 text-white hover:bg-red-600 rounded-xl px-4 py-2 mr-7 text-sm ml-auto"
                    onClick={() => unfollowUser (user.id)} // Unfollow user
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    className="bg-white text-black hover:bg-gray-300 rounded-xl px-4 py-2 mr-7 text-sm ml-auto"
                    onClick={() => followUser (user.id)} // Follow user
                  >
                    Follow
                  </button>
                )}
              </div>
            ))}
            <button
              className="mt-2 text-blue-500 hover:cursor-pointer hover:border-blue-500 text-sm"
              onClick={toggleShowMoreFollowers}
            >
              {showMoreFollowers ? 'Show less' : 'Show more'}
            </button>
          </div>

          
        </div>
      </div>
    </div>
  );
}

export default TwitterProfile;
