import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import { Heart, MessageCircle, BadgeCheck } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../index.css';

function TwitterProfile() {
  const [profile, setProfile] = useState(null);
  const { userId } = useParams(); // Get userId from URL parameters
  const token = localStorage.getItem('token');
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
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
          setProfile(data); // Store the fetched profile data
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } else {
      console.error('Token not found in local storage');
    }
  }, [userId, token]);

  const logoutProfile = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    navigate('/');  // Redirect to homepage
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

  if (!profile) {
    return <div>No profile available.</div>;
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Profile Section */}
      <div className="bg-gray-800 p-4 rounded-lg ml-10 mr-10">
        <div className="relative">
          {/* Cover Image */}
          <div className="h-48 bg-gray-700 rounded-lg overflow-hidden">
            <div className="w-full h-full bg-[url(src/assets/banner.jpg)]"></div>
          </div>
          {/* Profile Image */}
          <div className="absolute top-32 left-4">
            <img
              src="src/assets/profile.jpg"
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-gray-900"
            />
          </div>
        </div>

        <div className="mt-20">
          <div className="flex justify-between">
            <div className="flex">
              <h2 className="text-2xl font-semibold">{profile.username}</h2>
              <BadgeCheck className="ml-2 text-blue-500" />
            </div>
            
          </div>
          <p className="text-gray-300">@{profile.username}</p>
          <p className="text-gray-300 mt-1">{profile.createdAt}</p>

          <div className="flex mt-4">
            <div className="mr-6">
              <span className="font-semibold">{profile.followersCount}</span>
              <span className="block text-sm">Followers</span>
            </div>
            <div className="mr-6">
              <span className="font-semibold">{profile.followingCount}</span>
              <span className="block text-sm">Following</span>
            </div>
          </div>

          <button className="mt-4 bg-gray-700 hover:bg-gray-600 text-white rounded-full px-4 py-2 w-full" onClick={() => followUser(profile.id)}>
            Follow
          </button>
        </div>
      </div>

      {/* Posts Section */}
      <div className="mt-8 mr-10 ml-10">
        {profile.posts?.map(post => (
          <div key={post.id} className="bg-gray-800 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <img src="src/assets/profile.jpg" alt="Profile" className="w-12 h-12 rounded-full" />
              <div className="ml-4">
                <p className="text-sm">{post.text}</p>
                <p className="text-sm text-blue-500 mt-1">{post.hashtags.join(" ")}</p>
              </div>
            </div>

            <div className="mt-4">
              <img src={post.image} alt="Post Image" className="rounded-lg w-full h-72 object-contain" />
            </div>

            <div className="flex justify-around items-center mt-6">
              <div className="flex items-center space-x-4">
                <MessageCircle />
                <span>{post.comments || "0"}</span>
              </div>
              <div className="flex items-center space-x-4">
                <Heart />
                <span>{post.likesCount || "0"}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TwitterProfile;
