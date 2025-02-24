<div className="w-64 bg-gray-800 p-6 sticky top-0 h-screen overflow-y-auto">
{/* Twitter Logo */}
<div className="flex items-center justify-center">
  {/* Logo removed as per your request */}
</div>

{/* User Profile Section */}
<div className="mt-8 text-center">
  {/* Profile Picture */}
  <div className="flex justify-center">
    <img
      src="/src/assets/profile-2.jpeg"
      alt="Profile"
      className="w-16 h-16 rounded-full border-2 border-blue-500"
    />
  </div>

  {/* User Name and Verification Badge */}
  <div className="mt-2 flex items-center justify-center">
    <h1 className="text-lg font-semibold">Jainy Loe</h1>
    <img
      src="/src/assets/verify.png"
      alt="Verified"
      className="w-4 h-4 ml-1"
    />
  </div>

  {/* Username */}
  <span className="text-sm text-gray-400">@jainyloe</span>
</div>

{/* User Stats (Posts, Followers, Following) */}
<div className="mt-6 flex justify-between">
  <div className="text-center">
    <h3 className="text-lg font-semibold">89</h3>
    <span className="text-sm text-gray-400">Posts</span>
  </div>
  <div className="text-center">
    <h3 className="text-lg font-semibold">123M</h3>
    <span className="text-sm text-gray-400">Followers</span>
  </div>
  <div className="text-center">
    <h3 className="text-lg font-semibold">14</h3>
    <span className="text-sm text-gray-400">Following</span>
  </div>
</div>

{/* Sidebar Navigation Links */}
<div className="mt-8 space-y-4">
  <a href="#" className="flex items-center text-gray-400 hover:text-white">
    <i className="ri-home-7-line text-xl mr-3"></i>
    <span>Home</span>
  </a>
  <a href="#" className="flex items-center text-gray-400 hover:text-white">
    <i className="ri-search-line text-xl mr-3"></i>
    <span>Explore</span>
  </a>
  <a href="#" className="flex items-center text-gray-400 hover:text-white">
    <i className="ri-notification-3-line text-xl mr-3"></i>
    <span>Notifications</span>
  </a>
  <a href="#" className="flex items-center text-gray-400 hover:text-white">
    <i className="ri-mail-line text-xl mr-3"></i>
    <span>Messages</span>
  </a>
  <a href="#" className="flex items-center text-gray-400 hover:text-white">
    <i className="ri-bookmark-line text-xl mr-3"></i>
    <span>Bookmarks</span>
  </a>
  <a href="#" className="flex items-center text-gray-400 hover:text-white">
    <i className="ri-user-line text-xl mr-3"></i>
    <span>Profile</span>
  </a>
  <a href="#" className="flex items-center text-gray-400 hover:text-white">
    <i className="ri-settings-5-line text-xl mr-3"></i>
    <span>Settings</span>
  </a>
</div>
</div>