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

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/profile" replace /> },
      //for the users' profile page
      { path: '/profile', element: <Profile />, errorElement: <ErrorPage /> },
      //for users clicking on OTHER USERS' profile pages (get a read only view)
      { path: "profile/:name", element: <Profile /> },
      { path: '/frogfriends', element: <FriendsIndex /> },
      { path: '/thepond', element: <PostsIndex /> }
    ],
  },
  //putting this here so it isn't blocked by the authenticate thing to access app outlet context
  {
    path: '/register', element: <Register />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
