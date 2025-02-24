// import React from 'react';

// function Home() {
//     const tweets = [
//         'This is my first tweet! #react #tailwindcss',
//         'Having a great day! #coding #javascript',
//         'Learning new things every day.',
//         'Just finished a coding challenge.',
//         'Enjoying the weekend!',
//         'Exploring new technologies.',
//         'Coffe  e break! ☕',
//         'Working on a new project.',
//         'Hello, world!',
//         'Another day, another line of code.',
//         'Feeling productive today.',
//         'Just pushed a new feature.',
//         'Debugging is fun! (Sometimes...)',
//       ];

//       const suggestions = [
//         { name: 'Tech Enthusiast', username: '@techenthusiast', avatar: 'path/to/tech-avatar.jpg' },
//         { name: 'Travel Blogger', username: '@travelblogger', avatar: 'path/to/travel-avatar.jpg' },
//         { name: 'Foodie Life', username: '@foodielife', avatar: 'path/to/food-avatar.jpg' },
//       ];



//   return (
//     <div className="bg-gray-800 rounded-lg shadow-md w-full mx-auto mt-8">
//       {/* Cover Photo */}
//       <div className="relative h-58 bg-gray-200 rounded-t-lg overflow-hidden hover:scale-105">
//         <img
//           src="src\assets\cover image.jpg" // Replace with your cover photo URL
//           alt="Cover"
//           className="w-full h-full object-cover"
//         />
//       </div>

//       {/* Profile Info */}
//       <div className="relative p-4">
//         {/* Profile Picture */}
//         <div className="absolute -mt-16 left-4">
//           <img
//             src="src\assets\profile-1.jpg" // Replace with your profile picture URL
//             alt="Profile"
//             className="w-32 h-32 rounded-full border-4 border-white"
//           />
//           <div className="w-1/4 pr-4">

//           </div>
//         </div>
//         <div className="bg-gray-800 text-white p-4 border-b flex justify-around">
//         <div className="text-center">
//           <span className="font-semibold block">123</span>
//           <span className="block">Tweets</span>
//         </div>
//         <div className="text-center">
//           <span className="font-semibold block">123</span>
//           <span className="block">Following</span>
//         </div>
//         <div className="text-center">
//           <span className="font-semibold block">456</span>
//           <span className="block">Followers</span>
//         </div>
//         <div className="text-center">
//           <span className="font-semibold block">789</span>
//           <span className="block">Likes</span>
//         </div>
//         <div className="text-center">
//           <span className="font-semibold block">10</span>
//           <span className="block">Moments</span>
//         </div>
//       </div>


//       <div className="flex flex-cols-1 md:flex-cols-2 lg:flex-cols-3 bg-gray-800 h-full">
//       <div className="flex p-4">
//         {/* Left Section (Profile and Bio) */}
//         <div className="w-1/4 p-4 pr-4">
//           <div className="bg-white rounded-lg shadow-md p-4">
//             <div className="flex flex-col">
              
//               <h2 className="text-lg font-bold">Zara</h2>
//               <p className="text-gray-500">zara22</p>
//               <p className="mt-4 text-lg">I'm the one that's got to die when it's time for me to die, so let me live my life the way I want to..</p>
//             </div>
//           </div>
//         </div>


                    
//     <div className="bg-gray-800 w-1/2 p-4">
//         <div className="grid grid-cols-1 gap-4">
//           {[...Array(7)].map((_, i) => (
//             <div key={i} className="bg-white rounded-lg p-4">
//               {/* Post Image */}
//               <img
//                 src={`/src/assets/profile-${i}.jpeg`} 
//                 alt="Post"
//                 className="w-full h-64 object-cover rounded-lg"
//               />

//               {/* Post Details */}
//               <div className="mt-4 flex justify-between items-center">
//                 {/* {/* User Profile and Name */}
//                 <div className="flex items-center">
//                    <img
//                     src='src\assets\profile.jpg' // Assuming images are named posts-0.jpeg, posts-1.jpeg, etc.
//                     alt="Profile"
//                     className="w-8 h-8 rounded-full border-2 border-blue-500"></img>
//                   <h3 className="ml-2 text-sm font-semibold">{tweets[i]}</h3>
//                 </div> 

//                 {/* Like and Comment Icons */}
//                 <div className="flex items-center space-x-4">
//                   <i className="ri-heart-line text-gray-400"></i>
//                   <span className="text-gray-400">74.8k</span>
//                   <i className="ri-chat-3-line text-gray-400"></i>
//                   <span className="text-gray-400">1.9k</span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//     </div>
   
                    

//         {/* Right Section (Who to Follow) */}
//         <div className="w-1/4 p-4 pl-4">
//           <div className="bg-white rounded-lg shadow-md p-4">
//             <h3 className="font-semibold mb-4">Who to Follow</h3>
//             {suggestions.map((suggestion, index) => (
//               <div key={index} className="flex items-center mb-4">
//                 <img
//                   src={suggestion.avatar}
//                   alt={suggestion.name}
//                   className="w-10 h-10 rounded-full mr-2"
//                 />
//                 <div>
//                   <h4 className="font-semibold text-sm">{suggestion.name}</h4>
//                   <p className="text-gray-500 text-xs">{suggestion.username}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
      
//     </div>
//     </div>

// );
// }

// export default Home;



import React from 'react'

const Home = () => {
  return (
    <div>Home</div>
  )
}

export default Home

