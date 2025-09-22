import React,{useState} from 'react'
import { Route,Routes, RouterProvider,createBrowserRouter,createRoutesFromElements, } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage,{HomeLoader} from './pages/HomePage'
import Applications from './pages/Applications'
import SingleApplicationPage from './pages/SingleApplicationPage'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ScrollToTop from './components/ScrollToTop'
import Error from './components/Error'
import { ApplicationProvider } from './components/Context'

const App = () => {
  const router = createBrowserRouter(createRoutesFromElements(
        <Route path='/' element={<Layout/>}>
      <Route index loader={HomeLoader} errorElement={<Error/>} element={<HomePage />} />
      <Route path='applications' element={<Applications  />} />
      <Route path='applications/:id'  element={<SingleApplicationPage />}/>
        </Route>
   ))

  return (
    <ApplicationProvider>
    <div className='bg-gradient-to-br from-gray-950 via-slate-900 to-zinc-950 no-scrollbar'>
      <RouterProvider router={router} />
       <ToastContainer 
        position="top-right"
        autoClose={3000} // closes after 3s
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" // or "light", "dark"
      />
      <ScrollToTop/>
      </div>
     </ApplicationProvider> 
  )     
}

export default App