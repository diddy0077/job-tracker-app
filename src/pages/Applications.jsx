import React,{useEffect, useState} from 'react'
import { useSearchParams } from 'react-router-dom'
import Card from '../components/Card'
import { motion } from 'framer-motion';

const Applications = ({applications, setApplications}) => {
const filters = ['All', 'Applied', 'Interviewing', 'Offer', 'Rejected']
  const [searchParams, setSearchParams] = useSearchParams()
  const isActive = searchParams.get('status')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
   const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const getApplications = async () => {
      setLoading(true)
      try {
        const res = await fetch('http://localhost:5000/applications')
        if (!res.ok) {
          throw {
            message: 'Error fetching Applications',
            statusText: res.statusText,
            status: res.status
          }
        }
        const data = await res.json()
        setTimeout(() => {
          setApplications(data)
          setLoading(false)
        }, 3000)
      }
      catch(error) {
        setError(error)
        console.log(error)
        setLoading(false)
      }
      
    }
    getApplications()
  }, [setApplications])

 const filteredApplications = applications.filter((item) => {
  const matchedStatus = isActive
    ? item.status.toLowerCase() === isActive.toLowerCase()
    : true;  

  const matchedRole = item.role.toLowerCase().includes(searchValue.toLowerCase());
  const matchedCompany = item.company.toLowerCase().includes(searchValue.toLowerCase());

  return matchedStatus && (matchedRole || matchedCompany);
});



const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };


  if (loading) {
    return <div className='flex items-center justify-center h-screen'>
      <div className='w-15 h-15 border border-indigo-600 rounded-full border-t-transparent animate-spin border-5'></div>
    </div>
  }

  if (error) {
    return <p>{error.message}</p>
  }


  return (
   <main className="bg-gradient-to-br from-gray-950 via-slate-900 to-zinc-950 min-h-screen p-6 md:px-[8rem] px-6 text-slate-100 font-sans">
      {/* Page Header */}
      <motion.div
        className="my-8 text-center md:text-left"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-extrabold text-white">
          All Applications
        </h1>
        <p className="text-lg text-slate-400 mt-2">
          Track and manage all your job applications in one place.
        </p>
      </motion.div>

      {/* Main Content Area */}
      <div className='flex flex-col lg:flex-row gap-8'>
        {/* Left Side: Search, Filters, and Applications Grid */}
        <div className="flex-grow">
          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by company or role..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-900 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>

          {/* Filter Buttons */}
          <section className='mb-8'>
            <div className='flex flex-wrap gap-4'>
              {filters.map((item) => (
                <button
                  key={item}
                  onClick={() => (item !== 'All' ? setSearchParams({ status: item.toLowerCase() }) : setSearchParams({}))}
                  className={`${
                    isActive === item.toLowerCase()
                      ? 'bg-indigo-500 text-white shadow-md'
                      : 'bg-slate-800 text-slate-400'
                  } font-semibold py-2 px-4 text-sm rounded-xl transition duration-300 hover:bg-indigo-500 hover:text-white cursor-pointer`}
                >
                  {item}
                </button>
              ))}
            </div>
          </section>

          {/* Applications Grid */}
          {!loading && !error && filteredApplications.length > 0 ? (
            <motion.section
              className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {filteredApplications.map((job) => (
                <motion.div key={job.id} variants={itemVariants} whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <Card item={job} />
                </motion.div>
              ))}
            </motion.section>
          ) : (
            <div className="text-center text-slate-400 py-10">
              <p>No applications matched your search criteria.</p>
            </div>
          )}
        </div>

        {/* Right Side: Recent Activity */}
        {/* <div className="bg-slate-900 rounded-3xl shadow-2xl p-6 border border-slate-700 md:w-full lg:w-1/3 min-w-[300px]">
          <motion.h2
            className="text-white font-bold text-2xl mb-4 border-b border-slate-700 pb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Recent Activity
          </motion.h2>
          <ul className="space-y-4">
            {activityLog.map((log) => (
              <motion.li
                key={log.id}
                className="p-4 bg-slate-800 rounded-xl border border-slate-700"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + log.id * 0.1 }}
              >
                <div className="flex justify-between items-center text-sm">
                  <p className="text-slate-300">
                    <span dangerouslySetInnerHTML={{ __html: log.text }} />
                  </p>
                  <span className="text-xs text-slate-500">{log.date}</span>
                </div>
              </motion.li>
            ))}
          </ul>
        </div> */}
      </div>
    </main>
  )
}

export default Applications