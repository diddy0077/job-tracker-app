import React,{useEffect,useState} from 'react'

const ScrollToTop = () => {
    const [visible, setVisible] = useState(false)
  useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  window.addEventListener("scroll", handleScroll);

  // cleanup to remove the listener when the component unmounts
  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
  }, []);
  

  return (
    <>
      {visible && <button onClick={() => (window.scrollTo({top: 0, behavior: 'smooth'}))} className='cursor-pointer fixed bottom-4 right-4 bg-indigo-500 p-4 rounded-full'>
      <svg className='fill-white' stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"></path></svg>
    </button>}
    </>
  )
}

export default ScrollToTop