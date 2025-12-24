import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Homepage from './pages/Homepage.jsx'
import About from './pages/About.jsx'
import NavBar from './components/NavBar.jsx'
import Footer from './components/Footer.jsx'
import ErrorPage from './components/ErrorPage.jsx'
import Creations from './pages/Creations.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import AddCreations from './pages/admin_ManageCreations.jsx'
import ManageCommunityPosts from './pages/admin_ManageCommunityPosts.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CommunityPosts from './pages/CommunityPosts.jsx'

const router = createBrowserRouter([


  {

    path: '/',
    element: <Homepage/>,
    errorElement: <ErrorPage/>

  },

  {

    path: '/about',
    element: <About/>,

  },

  {

    path: '/creations',
    element: <Creations/>,

  },

  {

    path: '/login',
    element: <Login/>,

  },

  {

    path: '/register',
    element: <Register/>,

  },

  {

    path: '/admin-manage-creations',
    element: <AddCreations/>,

  },

  {

    path: '/communityposts',
    element: <CommunityPosts/>,

  },

  {

    path: '/admin-manage-communityposts',
    element: <ManageCommunityPosts/>,

  }

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NavBar></NavBar>
    <RouterProvider router={router}></RouterProvider>
    <Footer></Footer>
  </StrictMode>,
)
