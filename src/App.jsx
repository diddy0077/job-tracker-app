import React,{useState} from 'react'
import { Route,Routes, RouterProvider,createBrowserRouter,createRoutesFromElements, } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage,{HomeLoader} from './pages/HomePage'
import Applications from './pages/Applications'
import SingleApplicationPage from './pages/SingleApplicationPage'
import Stats from './pages/Stats'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";


const App = () => {
  const [applications, setApplications] = useState([])
  const router = createBrowserRouter(createRoutesFromElements(
        <Route path='/' element={<Layout/>}>
      <Route index loader={HomeLoader} element={<HomePage setApplications={setApplications} />} />
      <Route path='stats'  element={<Stats applications={applications}/>} />
      <Route path='applications' element={<Applications applications={applications} setApplications={setApplications} />} />
      <Route path='applications/:id'  element={<SingleApplicationPage setApplications={setApplications}/>}/>
        </Route>
   ))

  return (
    <div className='bg-gradient-to-br from-gray-950 via-slate-900 to-zinc-950'>
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
    </div>
  )     
}

export default App