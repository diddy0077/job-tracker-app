import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Card({ item }) {
  const getStatusClasses = (status) => {
    switch (status) {
      case 'Applied':
        return 'bg-blue-100 text-blue-600';
      case 'Interviewing':
        return 'bg-green-100 text-green-600';
      case 'Offer':
        return 'bg-yellow-100 text-yellow-600';
      case 'Rejected':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <motion.div
      className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl transition-all duration-300 transform"
      whileHover={{
        scale: 1.02,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-white font-bold text-lg mb-1">{item.role}</h2>
          <h3 className="text-slate-300 text-sm">Company: {item.company}</h3>
        </div>
        <span className={`text-xs font-semibold py-1 px-3 rounded-full border ${getStatusClasses(item.status)}`}>
          {item.status.toUpperCase()}
        </span>
      </div>
      <p className="text-sm text-slate-500 mb-4">Applied on: {item.dateApplied}</p>
      <Link
        to={`/applications/${item.id}`}
        className="inline-block text-indigo-500 font-medium text-sm py-2 px-4 rounded-full border border-indigo-500 hover:bg-indigo-500 hover:text-white transition-colors duration-300"
      >
        View Details &rarr;
      </Link>
    </motion.div>
  );
}
