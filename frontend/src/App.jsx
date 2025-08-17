import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { About, Blogs, BlogView, Comments, CreateBlog, Dashboard, Home, Login, Profile, SearchList, Signup, UpdateBlog, YourBlog } from './pages'
import { Footer, Navbar, ProtectedRoute } from './components'

const router = createBrowserRouter([
  {
    path: "/",
    element: <><Navbar/><Home /><Footer/></>
  },
  {
    path: "/blogs",
    element: <><Navbar/><Blogs /><Footer/></>
  },
  {
    path: "/about",
    element: <><Navbar/><About /><Footer/></>
  },
  {
    path: "/search",
    element: <><Navbar/><SearchList/><Footer/></>
  },
  {
    path: "/blogs/:blogId",
    element: <><Navbar/><ProtectedRoute><BlogView /></ProtectedRoute></>
  },
  {
    path:"/dashboard",
    element: <><Navbar/><ProtectedRoute><Dashboard/></ProtectedRoute></>,
    children:[
      {
        path: "write-blog",
        element:<><CreateBlog/></>
      },
      {
        path: "write-blog/:blogId",
        element: <><UpdateBlog /></>
      },
      {
        path: "your-blog",
        element:<YourBlog/>
      },
      {
        path: "comments",
        element:<Comments/>
      },
      {
        path: "profile",
        element:<Profile/>
      },
    ]
   },
  {
    path: "/signup",
    element: <><Navbar/><Signup /></> 
  },
  {
    path: "/login",
    element: <><Navbar/><Login /></>
  },
])

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
