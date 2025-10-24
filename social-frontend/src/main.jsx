import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from "react-router";

import './index.css'
import App from './App.jsx'
import Profile from './pages/Profile/Profile.jsx';
import ErrorPage from './components/ErrorElement/ErrorElement.jsx';
import Register from './pages/Register/Register.jsx'
import FriendsIndex from './pages/FriendsIndex/FriendsIndex.jsx';
import PostsIndex from './pages/PostsIndex/PostsIndex.jsx';
import FriendProfile from './pages/FriendProfile/FriendProfile.jsx';
import EditProfileDetails from './pages/EditProfileDetails/EditProfileDetails.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/profile" replace /> },
      //current users' profile page
      { path: '/profile', element: <Profile />, errorElement: <ErrorPage /> },
      //dynamic routes for looking at other users' profiles
      { path: "profile/:userId", element: <FriendProfile /> },
      { path: '/frogfriends', element: <FriendsIndex /> },
      { path: '/thepond', element: <PostsIndex /> },
      { path: '/editprofile', element: <EditProfileDetails /> },
    ],
  },
  {
    path: '/register', element: <Register />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
