import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link,useLocation,useNavigate } from 'react-router-dom';

// Mocked for a self-contained environment


// Inline SVG for the menu icon (hamburger)
const MenuIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);

// Inline SVG for the close icon (X)
const CloseIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const Header = ({ setOpenForm }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
  };
  
  const location = useLocation()
  const nav = useNavigate()
  function navigate() {
    if (location.pathname === '/') {
      setOpenForm(true)
    } else {
      nav('/')
      setTimeout(() => {
        setOpenForm(true)
      },2000)
    }
  }

    return (
        <motion.header
            className='bg-slate-900 h-26 text-white flex items-center justify-between px-6 shadow-xl relative border-b border-slate-700'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
        >
            <motion.h1
                className='font-bold text-xl text-white'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Link to='/'>Job Tracker</Link>
            </motion.h1>

            {/* Desktop Navigation */}
            <nav className='hidden md:flex items-center space-x-6'>
                <motion.div whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Link to='/' className='text-slate-300 text-md font-semibold hover:text-indigo-400 transition-colors duration-200'>
                        Dashboard
                    </Link>
                </motion.div>
                <div whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Link to='/applications' className='text-slate-300 text-md font-semibold hover:text-indigo-400 transition-colors duration-200'>
                        Applications
                    </Link>
                </div>
            </nav>

            {/* Desktop Add Application Button */}
            <div className='hidden md:block'>
                <motion.button
                    onClick={navigate}
                    className='cursor-pointer rounded-full bg-indigo-600 text-white px-4 py-2 font-semibold text-sm hover:bg-indigo-700 transition-colors duration-200 shadow-md'
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Add Application
                </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
                onClick={toggleMenu}
                className='md:hidden text-slate-300 hover:text-indigo-400 transition-colors duration-200 focus:outline-none'
                whileTap={{ scale: 0.9 }}
            >
                <AnimatePresence mode='wait'>
                    {menuOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: 180, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -180, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <CloseIcon />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="menu"
                            initial={{ rotate: -180, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 180, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <MenuIcon />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Mobile Menu (Full-screen overlay) */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className='fixed inset-0 z-50 bg-slate-900 border-l border-slate-700 md:hidden'
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    >
                        <div className='flex justify-end p-6'>
                            <button onClick={toggleMenu} className='text-slate-300 hover:text-indigo-400 focus:outline-none'>
                                <CloseIcon className='h-8 w-8' />
                            </button>
                        </div>
                        <nav className='flex flex-col items-center justify-center space-y-8 h-full -mt-16'>
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
                            >
                                <Link onClick={toggleMenu} to='/' className='text-white text-3xl font-bold hover:text-indigo-400 transition-colors duration-200'>
                                    Dashboard
                                </Link>
                            </motion.div>
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                            >
                                <Link onClick={toggleMenu} to='applications' className='text-white text-3xl font-bold hover:text-indigo-400 transition-colors duration-200'>
                                    Applications
                                </Link>
                            </motion.div>
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                            >
                                <button
                                    onClick={() => (toggleMenu(), setOpenForm(true))}
                                    className='cursor-pointer rounded-full bg-indigo-600 text-white px-6 py-3 font-semibold text-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md'
                                >
                                    Add Application
                                </button>
                            </motion.div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

export default Header

