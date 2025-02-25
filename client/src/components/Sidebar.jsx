import React, { useEffect, useState } from 'react'
import "remixicon/fonts/remixicon.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
const SideBar = () => {
      const [isSidebarOpen, setIsSidebarOpen] = useState(false);
      useEffect(() => {
        const handleZoom = () => {
          const zoomLevel = window.outerWidth / window.innerWidth;
          if (zoomLevel < 1.5) {
            setIsSidebarOpen(false);
          }
        };
    
        window.addEventListener("resize", handleZoom);
        return () => window.removeEventListener("resize", handleZoom);
      }, []);
  return (
    <div>
       <button
        className="fixed top-4 left-4 z-50 p-2 bg-gray-800 rounded-lg lg:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <i className="ri-menu-line text-xl"></i>
      </button>

      {/* Left Sidebar */}
      <div
        className={`w-100 bg-gray-800 p-6 fixed lg:sticky top-0 h-screen overflow-y-auto transform transition-transform duration-200 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:relative z-40`}
      >
        {/* Twitter Logo */}
        <div className="flex items-center justify-center">
          <FontAwesomeIcon icon={faTwitter} style={{ color: "#ffffff" }} size="2x" />
        </div>

        {/* User Profile Section */}
        <div className="mt-8 text-center">
          {/* Profile Picture */}
          <div className="flex justify-center">
            <img
              src="/src/assets/profile-0.jpeg"
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
            <span className="text-lg">Home</span>
          </a>
          <a href="/explore" className="flex items-center text-gray-400 hover:text-white">
            <i className="ri-search-line text-xl mr-3"></i>
            <span className="text-lg">Explore</span>
          </a>
          
          
          <a href="#" className="flex items-center text-gray-400 hover:text-white">
            <i className="ri-bookmark-line text-xl mr-3"></i>
            <span className="text-lg">Bookmarks</span>
          </a>
          <a href="/TwitterProfile" className="flex items-center text-gray-400 hover:text-white">
            <i className="ri-user-line text-xl mr-3"></i>
            <span className="text-lg">Profile</span>
          </a>
          
        </div>
      </div>

    </div>
  )
}

export default SideBar