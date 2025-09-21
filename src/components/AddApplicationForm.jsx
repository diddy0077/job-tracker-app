import React from "react";
import { motion } from 'framer-motion';


const AddApplicationForm = ({
  handleSubmit,
  openForm,
  setOpenForm,
  companyName,
  setCompanyName,
  role,
  setRole,
  status,
  setStatus,
  date,
  setDate,
  source,
  setSource,
  link,
  setLink,
  formNotes,
  setFormNotes,
  isHome
}) => {

  const formVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 25 } },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };


  return (
    <motion.section
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
        openForm ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      initial="hidden"
      animate={openForm ? "visible" : "hidden"}
      variants={overlayVariants}
      onClick={() => setOpenForm(false)}
    >
      <motion.form
        onSubmit={handleSubmit}
        className="bg-slate-800 max-h-[600px] no-scrollbar overflow-y-scroll rounded-2xl shadow-xl p-6 min-w-xs border border-slate-700"
        variants={formVariants}
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-xl font-bold text-white mb-4 border-b border-slate-700 pb-3">
          {isHome ? 'Add New Application' : 'Edit Application'}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="company-name" className="text-sm text-slate-400 font-medium">
              Company Name:
            </label>
            <input
              onChange={(e) => setCompanyName(e.target.value)}
              value={companyName}
              type="text"
              name="company-name"
              id="company-name"
              className="rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 border border-slate-700 bg-slate-900 p-3 text-sm text-white"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="role" className="text-sm text-slate-400 font-medium">
              Role / Position:
            </label>
            <input
              onChange={(e) => setRole(e.target.value)}
              value={role}
              type="text"
              name="role"
              id="role"
              className="rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 border border-slate-700 bg-slate-900 p-3 text-sm text-white"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="status" className="text-sm text-slate-400 font-medium">
              Status:
            </label>
            <select
              onChange={(e) => setStatus(e.target.value)}
              value={status}
              name="status"
              id="status"
              className="rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 border border-slate-700 bg-slate-900 p-3 text-sm text-white"
            >
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="date-applied" className="text-sm text-slate-400 font-medium">
              Date Applied:
            </label>
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
              name="date-applied"
              id="date-applied"
              className="rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 border border-slate-700 bg-slate-900 p-3 text-sm text-white"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="source" className="text-sm text-slate-400 font-medium">
              Source (e.g., LinkedIn, Indeed):
            </label>
            <input
              onChange={(e) => setSource(e.target.value)}
              value={source}
              type="text"
              name="source"
              id="source"
              className="rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 border border-slate-700 bg-slate-900 p-3 text-sm text-white"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="application-link" className="text-sm text-slate-400 font-medium">
              Application Link:
            </label>
            <input
              onChange={(e) => setLink(e.target.value)}
              value={link}
              type="url"
              name="application-link"
              id="application-link"
              className="rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 border border-slate-700 bg-slate-900 p-3 text-sm text-white"
            />
          </div>

          <div className="flex flex-col gap-1 col-span-1 md:col-span-2">
            <label htmlFor="Notes" className="text-sm text-slate-400 font-medium">
              Notes:
            </label>
            <textarea
              onChange={(e) => setFormNotes(e.target.value)}
              value={formNotes}
              rows="5"
              name="Notes"
              id="Notes"
              className="rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 border border-slate-700 bg-slate-900 p-3 text-sm text-white"
            ></textarea>
          </div>

          <div className="flex gap-4 col-span-1 md:col-span-2 justify-end">
            <button
              type="button"
              onClick={() => setOpenForm(false)}
              className="bg-slate-700 text-slate-300 font-medium px-6 py-3 rounded-xl hover:bg-slate-600 transition transform hover:-translate-y-0.5 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="cursor-pointer bg-indigo-600 text-white font-medium px-6 py-3 rounded-xl shadow-lg hover:bg-indigo-700 transition transform hover:-translate-y-0.5 cursor-pointer"
            >
              Submit
            </button>
          </div>
        </div>
      </motion.form>
    </motion.section>
  );
};

export default AddApplicationForm;
