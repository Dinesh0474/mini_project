
import React, { Profiler } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Home from './pages/Home';
import Post from './pages/Post';
import Explore from './pages/Explore';
import TwitterProfile from './pages/TwitterProfile';


// import Home from './components/Home';




function App() {

  
  return (
    <div>
    <Router>
      <div className="min-h-screen bg-gradient-to-r from-blue-400 to-green-300"> {/* Apply background here */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/post" element={<Post />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/twitterprofile" element={<TwitterProfile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;