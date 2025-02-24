import React from 'react';
import { useState } from 'react';
import img from "../assets/profile-1.jpg"
import toi from "../assets/times.jpg"
import { Eye, Heart, MessageCircle, Repeat2 ,BadgeCheck } from 'lucide-react';
import '../index.css'

function TwitterProfile() {
      const posts = [
        {
         
          description: "Creative soul who loves experimenting with new ideas.",
          hashtags: ["#Innovation", "#CreativeMinds", "#NewIdeas"],
          username: "jimmyki_",
          likes: "22k",
          comments: "1.5k",
          shares: "900",
          views: "120k",
        },
        {
         
          description: "Adventurer, constantly exploring new paths.",
          hashtags: ["#Adventure", "#Explorer", "#Wanderlust"],
          username: "varunkillx",
          likes: "1.9k",
          comments: "350",
          shares: "120",
          views: "18k",
        },
        {
          
          description: "Someone who thrives in chaos and finds beauty in it.",
          hashtags: ["#ChaosTheory", "#BeautyInTheMess", "#CreativeProcess"],
          username: "hdgfu_dh",
          likes: "3.5k",
          comments: "420",
          shares: "210",
          views: "32k",
        }
    
      
 
      ];
     
    

     


      const [showMoreFollowers, setShowMoreFollowers] = useState(false);
  const initialFollowers = [
    { name: 'TIMES OF INDIA', username: '@timesofindiaaa', avatar: `${toi}` },
    // Add more initial followers here
  ];
  const additionalFollowers = [
    { name: 'Meowww (Cat Lover)', username: '@meoww', avatar: {} },
    { name: 'BBC News', username: '@bbcnews', avatar: 'src\assets\bbc.png' },
    { name: 'National Geographic', username: '@NatGeo', avatar: 'src\assets\profile-3.jpg' },
    { name: 'National Geographic', username: '@NatGeo', avatar: 'src\assets\profile-3.jpg' },
    { name: 'National Geographic', username: '@NatGeo', avatar: 'src\assets\profile-3.jpg' },
    // Add more followers here
  ];
  
  const followers = showMoreFollowers
    ? [...initialFollowers, ...additionalFollowers]
    : initialFollowers;
  const toggleShowMoreFollowers = () => {
    setShowMoreFollowers(!showMoreFollowers);
  };


  return (
    <div className="bg-gray-900 text-white min-h-screen">
     
      {/* Main Content */}
      <div className="flex flex-col md:flex-row">
        {/* Left Section (Profile Details) */}
        <div className="w-full md:w-[60%] md:pr-2 mb-4 md:mb-0">
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="relative">
              <div className="h-57 bg-gray-700 rounded-lg  overflow-hidden hover:scale-102">
              {/* <img
              src="src\assets\cover image.jpg" // Replace with your cover photo URL
              alt="Cover" */}
             <div className="w-full h-full bg-gray-950"/>    
                {/* Cover Image Placeholder */}
              </div>
            
              

              
              <div className="absolute -mt-15 left-4">
                <img
                  src="src\assets\profile.jpg" // Replace with your profile picture URL
                  alt="Profile"
                  className="w-30 h-30 rounded-full border-4 border-gray-900"
                />
              </div>
            </div>

            <div className="mt-17 ">
             <div className='flex text-xs'>
             <h2 className="text-2xl font-semibold px-4  flex">ZARA
              </h2>
              <BadgeCheck />
             </div>
              <p className="text-gray-300 pl-3">@zara_22</p>
              <p className="text-gray-300 pl-3 mt-2">Joined September 2023</p>
              <div className="flex mt-2 ">

              <div className="mr-4 text-white">
              <span className="font-semibold block pl-7 text-sm">456</span>
              <span className="block hover:cursor-pointer pl-3 text-sm">Followers</span>
            </div>
            <div className="mr-4 text-white">
              <span className="font-semibold block pl-4 text-sm">300</span>
              <span className="block hover:cursor-pointer text-sm">Following</span>
            </div>
                {/* <p className="mr-4 hover:cursor-pointer">0 Following</p>
                <p className='hover:cursor-pointer'>0 Followers</p> */}
              </div>

              <button className="mt-4 border border-gray-300  hover:cursor-pointer text-white rounded-full px-4 py-2 w-full">
                Edit profile
              </button>
              <div className="mt-4 flex justify-around">
                <button className="text-sm  hover:border-b-4 hover:border-blue-500">Posts</button>
                <button className="text-sm  hover:border-b-4 hover:border-blue-500">Replies</button>
                <button className="text-sm  hover:border-b-4 hover:border-blue-500">Highlights</button>
                {/* <button className="text-sm  hover:border-b-4 hover:border-blue-500">Articles</button> */}
                {/* <button className="text-sm  hover:border-b-4 hover:border-blue-500">Media</button> */}
                <button className="text-sm  hover:border-b-4 hover:border-blue-500">Likes</button>
              </div>
              <hr className="border-t border-gray-700 my-4" />




<div className="mt-8">
  
          {posts.map((post, index) => (
            <div key={index} className="bg-gray-900 rounded-lg p-7 mb-6 max-h-[675px]">
              
              <div className="flex items-center">
                <img
                  src="src\assets\profile.jpg"
                  alt="Profile"
                  className="w-12 h-12 mt-3 rounded-full"
                />
              <div className="mt-4">
                <p className="text-sm pl-4">{post.description}</p>
                <p className="text-sm pl-4 text-blue-500 mt-1">
                  {post.hashtags.join(" ")}
                </p>
              </div>
              </div>
 
             
              <div className="flex justify-center mt-4">
               
                <img
                  src={`/src/assets/profile-${index}.jpg`}
                  alt=""
                  className=" max-w-7xl rounded-lg h-100"
                />
              </div>
              
 
         
              <div className="flex justify-around items-center mt-7">
                <div className="flex items-center space-x-4">
                <MessageCircle />
                  <span className="text-gray-400">{post.comments || "0"}</span>
                </div>
                <div className="flex items-center space-x-4">
                <Repeat2 />
                  <span className="text-gray-400">{post.shares || "0"}</span>
                </div>
                <div className="flex items-center space-x-4">
                <Heart />
                  <span className="text-gray-400">{post.likes || "0"}</span>
                </div>
                <div className="flex items-center space-x-4">
                <Eye />
                  <span className="text-gray-400">{post.views || "0"}</span>
                </div>
              </div>
            </div>
            
          ))}
        </div>
            </div>
          </div>
          </div>

        {/* Middle Section (What's happening) */}
        <div className="w-full md:w-1/2 md:px-4 mb-4 md:mb-0">
<div className="mt-4">
        <h3 className="font-semibold text-lg">Who to follow</h3>
        {followers.map((follower, index) => (
          <div key={index} className="flex items-center mt-3 pl-4 bg-gray-800">
            <img
              src={follower.avatar}
              alt={follower.name}
              className="w-12 h-12 rounded-full mr-2"
            />
            <div className='h-20'>
              <h4 className=" hover:cursor-pointer text-md mt-3 pl-4">
                {follower.name}
              </h4>
              <p className="text-gray-500 text-md pl-4 ">{follower.username}</p>
            </div>
            <button className="bg-white text-black hover:bg-gray-300 rounded-xl px-4 py-4 mr-7 text-sm ml-auto">
              Follow
            </button>
          </div>
        ))}
        <button
          className="mt-2 text-blue-500 hover:cursor-pointer hover:border-blue-500 text-sm  "
          onClick={toggleShowMoreFollowers}
        >
          {showMoreFollowers ? 'Show less' : 'Show more'}
        </button>
      </div>

      <div className="mt-2">
          <div className="bg-gray-800 mt-4 rounded-lg p-4">
          <h3 className="font-semibold text-lg">What's happening</h3>
          <div className="flex items-center mt-2">
                  <img
                    src="src\assets\cat.jpg" // Replace with AK Kutty avatar URL
                    alt="AK Kutty"
                    className="w-14 h-12 rounded-sm mr-2"
                  />
                  <div className='pl-2'>
                    <h4 className="font-semibold text-md">GROK 3</h4>
                    <p className="text-gray-500 text-sm">Grok 3 is here. Try it for free.</p>
                    <p className="text-green-500">LIVE</p>
            </div>   
            </div>
            <hr className="border-t border-gray-700 my-4" />

            <div className="flex items-center mt-2">
                  <img
                    src="src\assets\BTS.avif" // Replace with AK Kutty avatar URL
                    alt="AK Kutty"
                    className="w-14 h-12 rounded-sm mr-2"
                  />
                  <div className='pl-2'>
                    <h4 className="font-semibold text-md">BTS 3</h4>
                    <p className="text-gray-500 text-sm">BTS in India.</p>
                    <p className="text-green-500">LIVE</p>
            </div>   
            </div>
            <hr className="border-t border-gray-700 my-4" />

            <div className="flex items-center mt-2">
                  <img
                    src="src\assets\gomez.webp" // Replace with AK Kutty avatar URL
                    alt="AK Kutty"
                    className="w-14 h-12 rounded-sm mr-2"
                  />
                  <div className='pl-2'>
                    <h4 className="font-semibold text-md">SELENA GOMEZ</h4>
                    <p className="text-gray-500 text-sm">Gomez is here!.</p>
                    <p className="text-green-500">LIVE</p>
            </div>
                  
            </div>

            </div>
            </div>

            <div className="mt-4 bg-gray-800 rounded-lg p-4">
              <h4 className="text-gray-300">Trending in India</h4>
              <p className="font-semibold text-lg">#PoonamPandey</p>
              <p className="text-gray-300">12.7K Tweets</p>
              <hr className="border-t border-gray-700 my-4" />
              <p className="text-gray-300">Trending in USA</p>
              <p className=" font-semibold text-lg">#TheProudFamily</p>
              <p className="text-gray-300">20.6K Tweets</p>
              <hr className="border-t border-gray-700 my-4" />
              <p className="text-gray-300">Trending in USA</p>
              <p className="font- text-lg">#TongueOutTuesday</p>
              <p className="text-gray-300">5,846K Tweets</p>
              <hr className="border-t border-gray-700 my-4" />
              <p className="text-gray-300">Entertainment Trending</p>
              <p className="font-semibold text-lg">#GoodBadUgly</p>
              <p className="text-gray-300">22.5K Tweets</p>
            </div>


      </div>
      </div>
    </div>
  );
}

export default TwitterProfile;
