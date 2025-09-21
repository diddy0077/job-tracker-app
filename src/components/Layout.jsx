import React,{useState} from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Layout = () => {
  const [openForm, setOpenForm] = useState(false)
  return (
    <div>
      <Header setOpenForm={setOpenForm} />
      <Outlet context={{ openForm, setOpenForm }} />
      <Footer/>
    </div>
  )
}

export default Layout