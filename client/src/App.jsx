
import React, { Profiler } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';


import Login from './components/login';
import SignUp from './components/signup';

// import Home from './components/Home';
// import Profile from './components/Profile';
import TwitterProfile from './components/TwitterProfile';




function App() {

  
  return (
    <div>
    <Router>
      <div className="min-h-screen bg-gradient-to-r from-blue-400 to-green-300"> {/* Apply background here */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/twitterprofile" element={<TwitterProfile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;