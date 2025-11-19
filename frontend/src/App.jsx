import React from 'react';
import Navbar from './components/shared/Navbar.jsx';
import Login from './components/auth/Login.jsx';
import Signup from './components/auth/Signup.jsx';
import Home from './components/Home.jsx';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router';

const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },
])

const App = () => {
  return (
    <div>
      <RouterProvider router = {appRouter}></RouterProvider>
    </div>
  )
}

export default App