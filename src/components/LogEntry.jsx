import React from 'react';
import { motion } from 'framer-motion';


export default function LogEntry({ log }) {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const getDotColor = () => {
  if (log.message.includes("Status")) {
    if (log.message.includes("Rejected")) return "bg-red-500";
    if (log.message.includes("Offer")) return "bg-green-500";
    return "bg-blue-500";
  }
  return "bg-teal-500";
};


  return (
   <motion.div
            className="flex items-start space-x-4 mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className={`${getDotColor()} flex-shrink-0 w-3 h-3 rounded-full mt-2`}></div>
            <div className="flex-grow bg-slate-800 p-4 rounded-xl shadow-lg border border-slate-700">
                <p className="text-sm text-slate-200 font-medium">{log.message}</p>
                <p className="text-xs text-slate-500 mt-1">{formatTime(log.timeStamp)}</p>
            </div>
        </motion.div>
  );
}
