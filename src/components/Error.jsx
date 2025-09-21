import React,{useEffect} from 'react'
import { useRevalidator } from 'react-router-dom'
   
const Error = () => {
  const revalidator = useRevalidator();
    useEffect(() => {
      const retry = () => {
         revalidator.revalidate()
      }
      window.addEventListener('online', retry)

      return (() => {
        window.removeEventListener('online', retry)
      })
    }, [revalidator])
    

  return (
    <div className='h-screen flex items-center justify-center flex-col'>
      <div className='w-15 h-15 border border-t-transparent border-indigo-500 border-5 rounded-full animate-spin'></div>
      <div className="p-6 text-center">
      <h2 className="text-red-500 text-xl font-bold">
        🚨 Failed to load Applications.
      </h2>
        <p className='text-gray-100 mt-4'>Please check your internet connection.</p>
        <button onClick={() => (revalidator.revalidate())} className='text-gray-100 bg-gray-700 p-2 rounded-lg mt-4 px-6 cursor-pointer transition duration-300 active:scale-[0.9] hover:-translate-y-[5px]'>Retry</button>
    </div>
      </div>
  )
}

export default Error