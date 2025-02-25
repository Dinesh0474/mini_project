import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserProfile from './pages/UserProfile';
import MagicMatch from './game/Magic_match/pages/Magic_match';

// Lazy load components
const Login = React.lazy(() => import('./pages/Login'));
const SignUp = React.lazy(() => import('./pages/Signup'));
const Home = React.lazy(() => import('./pages/Home'));
const Post = React.lazy(() => import('./pages/Post'));
const Explore = React.lazy(() => import('./pages/Explore'));
const TwitterProfile = React.lazy(() => import('./pages/TwitterProfile'));
const BookmarksPage = React.lazy(() => import('./pages/BookmarksPage'));

function App() {
  return (
    <div>
      <Router>
        <div className="min-h-screen bg-gray-900"> {/* Apply background here */}
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/home" element={<Home />} />
              <Route path="/post" element={<Post />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/bookmarks" element={<BookmarksPage />} />
              <Route path="/twitterprofile/:userId" element={<TwitterProfile />} />
              <Route path="/game" element={<MagicMatch />} />
              <Route path="/userprofile/:userId" element={<UserProfile />} />
              {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
            </Routes>
          </Suspense>
        </div>
      </Router>
    </div>
  );
}

export default App;
