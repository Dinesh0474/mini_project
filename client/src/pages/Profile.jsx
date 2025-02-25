import React from 'react';

function Profile() {
    const tweets = [
        'This is my first tweet! #react #tailwindcss',
        'Having a great day! #coding #javascript',
        'Learning new things every day.',
        'Just finished a coding challenge.',
        'Enjoying the weekend!',
        'Exploring new technologies.',
        'Coffe  e break! ☕',
        'Working on a new project.',
        'Hello, world!',
        'Another day, another line of code.',
        'Feeling productive today.',
        'Just pushed a new feature.',
        'Debugging is fun! (Sometimes...)',
      ];



  return (
    <div className="bg-gray-800 rounded-lg shadow-md w-full mx-auto">
      {/* Cover Photo */}
      <div className="relative h-58 bg-gray-200 rounded-t-lg overflow-hidden hover:scale-105">
        <img
          src="src\assets\cover image.jpg" // Replace with your cover photo URL
          alt="Cover"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Info */}
      <div className="relative p-4">
        {/* Profile Picture */}
        <div className="absolute -mt-27 left-4">
          <img
            src="src\assets\profile-1.jpg" // Replace with your profile picture URL
            alt="Profile"
            className="w-44 h-44 rounded-full border-4 border-white"
          />
          <div className="w-1/4 pr-4">

          </div>
        </div>


        {/* User Details */}
        <h2 className="text-xl px-7 text-white mt-18 font-semibold">Zara</h2>
          <p className="text-white px-7 text-md">zara22</p>
          <div className="mt-4 flex">
          <div className="mr-4 text-white text-center">
              <span className="font-semibold block">7</span>
              <span className="block">Posts</span>
            </div>

            <div className="mr-4 text-white text-center">
              <span className="font-semibold block">456</span>
              <span className="block">Followers</span>
            </div>
            
            <div className="text-white mr-4 text-center">
              <span className="font-semibold block">350</span>
              <span className="block">Following</span>
            </div>

            <div className="text-white text-center">
              <span className="font-semibold block">200</span>
              <span className="block">Likes</span>
            </div>
            
          </div>
          <div className="text-white mt-4 pl-4">
          
        <p className="mt-4 text-lg">“Helping millennial adults with money | Dog dad | Probably thinking about tacos.”</p>
        </div>

        {/* Edit Profile Button */}
        <div className="absolute top-4 right-4">
          <button className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white py-4 px-6 rounded-full px-4 py-2">
            Edit Profile
          </button>
        </div>
      </div>
      <div>


      <div className="bg-gray-900 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg p-4">
              {/* Post Image */}
              <img
                src={`src\assets\profile-${i}.jpg`} // Assuming images are named profile-0.jpeg, profile-1.jpeg, etc.
                alt="Post"
                className="w-full h-64 object-cover rounded-lg"
              />

              {/* Post Details */}
              <div className="mt-4 flex justify-between items-center">
                {/* {/* User Profile and Name */}
                <div className="flex items-center">
                   <img
                    src='src\assets\profile.jpg' // Assuming images are named posts-0.jpeg, posts-1.jpeg, etc.
                    alt="Profile"
                    className="w-8 h-8 rounded-full border-2 border-blue-500"></img>
                  <h3 className="ml-2 text-sm font-semibold">{tweets[i]}</h3>
                </div> 

                {/* Like and Comment Icons */}
                <div className="flex items-center space-x-4">
                  <i className="ri-heart-line text-gray-400"></i>
                  <span className="text-gray-400">74.8k</span>
                  <i className="ri-chat-3-line text-gray-400"></i>
                  <span className="text-gray-400">1.9k</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>



    </div>
  );
}

export default Profile;






// import React from 'react';

// function Profile() {
//   const names = ['User 1', 'User 2', 'User 3', 'User 4', 'User 5', 'User 6', 'User 7', 'User 8', 'User 9', 'User 10', 'User 11', 'User 12', 'User 13']; // Example names
//   const tweets = [
//     'This is my first tweet! #react #tailwindcss',
//     'Having a great day! #coding #javascript',
//     'Learning new things every day.',
//     'Just finished a coding challenge.',
//     'Enjoying the weekend!',
//     'Exploring new technologies.',
//     'Coffe  e break! ☕',
//     'Working on a new project.',
//     'Hello, world!',
//     'Another day, another line of code.',
//     'Feeling productive today.',
//     'Just pushed a new feature.',
//     'Debugging is fun! (Sometimes...)',
//   ];

//   return (
//     <div className="bg-gray-900 min-h-screen">
//       {/* Profile Header */}
//       <div className="bg-gray-800 p-4 border-b">
//         <div className="flex flex-col items-center">
//           <img
//             src="src\assets\profile.jpg" // Replace with your profile picture URL
//             alt="Profile"
//             className="w-20 h-20 rounded-full mb-4"
//           />
//           <h2 className="text-lg text-white font-semibold">Zara</h2>
//           <p className="text-gray-200">zara22</p>

//           <div className="flex mt-2">

            // <div className="mr-4 text-white text-center">
            //   <span className="font-semibold block">7</span>
            //   <span className="block">Posts</span>
            // </div>

            // <div className="mr-4 text-white text-center">
            //   <span className="font-semibold block">456</span>
            //   <span className="block">Followers</span>
            // </div>
            
            // <div className="text-white text-center">
            //   <span className="font-semibold block">456</span>
            //   <span className="block">Following</span>
            // </div>
            

//           </div>
//         </div>
//         <div className="flex justify-center mt-4">
//           <button className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white py-2 px-4 rounded-full">
//             Follow
//           </button>
//         </div>
//       </div>

//       {/* Posts Grid */}
    //   <div className="p-4">
    //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
    //       {[...Array(7)].map((_, i) => (
    //         <div key={i} className="bg-white rounded-lg p-4">
    //           {/* Post Image */}
    //           <img
    //             src={`/src/assets/profile-${i}.jpeg`} // Assuming images are named profile-0.jpeg, profile-1.jpeg, etc.
    //             alt="Post"
    //             className="w-full h-64 object-cover rounded-lg"
    //           />

    //           {/* Post Details */}
    //           <div className="mt-4 flex justify-between items-center">
    //             {/* {/* User Profile and Name */}
    //             <div className="flex items-center">
    //                <img
    //                 src='src\assets\profile.jpg' // Assuming images are named posts-0.jpeg, posts-1.jpeg, etc.
    //                 alt="Profile"
    //                 className="w-8 h-8 rounded-full border-2 border-blue-500"></img>
    //               <h3 className="ml-2 text-sm font-semibold">{tweets[i]}</h3>
    //             </div> 

    //             {/* Like and Comment Icons */}
    //             <div className="flex items-center space-x-4">
    //               <i className="ri-heart-line text-gray-400"></i>
    //               <span className="text-gray-400">74.8k</span>
    //               <i className="ri-chat-3-line text-gray-400"></i>
    //               <span className="text-gray-400">1.9k</span>
    //             </div>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
//     </div>
//   );
// }

// export default Profile;