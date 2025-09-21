import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaExclamationTriangle,FaArrowLeft} from "react-icons/fa";
import LogEntry from "../components/LogEntry";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import AddApplicationForm from "../components/AddApplicationForm";


const SingleApplication = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notes, setNotes] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [role, setRole] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [source, setSource] = useState("");
  const [formNotes, setFormNotes] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    const fetchApplication = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://job-tracker-app-jppo.onrender.com/applications/${id}`);
        if (!res.ok) throw new Error("Application not found");
        const data = await res.json();
        setTimeout(() => {
          setApplication(data);
          setLoading(false);
        },2000)
        setFormNotes(data.notes);
        setDate(data.dateApplied);
        setLink(data.link);
        setSource(data.source);
        setStatus(data.status);
        setCompanyName(data.company);
        setRole(data.role);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      } 
    };
    fetchApplication();
  }, [id]);

  const updateNotes = async () => {
    let logObject = {};
    if (application.notes !== notes) {
      logObject = {
        message: `Notes updated from ${application.notes} to ${notes}`,
        timeStamp: new Date().toISOString(),
      };
    } else {
      return;
    }
    const updatedApplication = {
      ...application,
      notes: notes,
      activityLog: [...application.activityLog, logObject],
    };
    try {
      const res = await fetch(`https://job-tracker-app-jppo.onrender.com/applications/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedApplication),
      });

      if (!res.ok) {
        throw new Error("Error updating notes");
      }

      const data = await res.json();
      console.log("Updated:", data);
      setApplication(data);
      setNotes("");
    } catch (error) {
      console.log(error);
    }
  };

  function determineClassName(status) {
  if (status === "Interviewing") return "text-indigo-600 bg-indigo-100";
  if (status === "Offer") return "text-green-600 bg-green-100";
  if (status === "Rejected") return "text-red-600 bg-red-100";
  if (status === "Applied") return "text-blue-600 bg-blue-100";
  return "text-slate-500 bg-slate-200";
}

  const deleteApplication = async () => {
    try {
      const res = await fetch(`https://job-tracker-app-jppo.onrender.com/applications/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Error Deleting Application");
      }

      let data = null;
      try {
        data = await res.json();
      } catch {
        data = null;
      }
      toast.success('Application Successfully Deleted!')
      navigate("/applications");
      console.log("Deleted:", data);
    } catch (error) {
      console.log("Failed to delete application:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !role ||
      !status ||
      !companyName ||
      !formNotes ||
      !date ||
      !link ||
      !source
    )
      return;
    const logs = [];
    if (application.company !== companyName) {
      logs.push({
        message: `Company changed from "${application.company}" to "${companyName}"`,
        timeStamp: new Date().toISOString(),
      });
    }
    if (application.role !== role) {
      logs.push({
        message: `Role changed from "${application.role}" to "${role}"`,
        timeStamp: new Date().toISOString(),
      });
    }
    if (application.dateApplied !== date) {
      logs.push({
        message: `Date Applied changed from "${application.dateApplied}" to "${date}"`,
        timeStamp: new Date().toISOString(),
      });
    }
    if (application.status !== status) {
      logs.push({
        message: `Status changed from "${application.status}" to "${status}"`,
        timeStamp: new Date().toISOString(),
      });
    }
    if (application.link !== link) {
      logs.push({
        message: `Link changed from "${application.link}" to "${link}"`,
        timeStamp: new Date().toISOString(),
      });
    }
    if (application.notes !== formNotes) {
      logs.push({
        message: `Notes changed from "${application.notes}" to "${formNotes}"`,
        timeStamp: new Date().toISOString(),
      });
    }
    if (logs.length === 0) return;
    const updatedApplication = {
      ...application,
      source,
      link,
      company: companyName,
      status,
      notes: formNotes,
      dateApplied: date,
      role,
      activityLog: [...application.activityLog, ...logs],
    };

    try {
      const res = await fetch(`https://job-tracker-app-jppo.onrender.com/applications/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedApplication),
      });
      if (!res.ok) {
        throw {
          message: "Error Updating Application",
        };
      }
      const data = await res.json();
      console.log("Updated:", data);
      setApplication(data);
      setOpenForm(false);
      toast.success('Application Updated Successfully!')
    } catch (error) {
      console.log("Error Updating Application", error);
    }
  };

  if (loading) {
    return <div className='flex items-center justify-center h-screen'>
      <div className='w-15 h-15 border border-indigo-600 rounded-full border-t-transparent animate-spin border-5'></div>
    </div>
  }
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (!application) return null;

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-zinc-950 font-sans antialiased text-slate-200 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mt-6 ml-5 mb-8 md:mb-5">
        <button
  onClick={() => navigate(-1)}
  className="flex items-center gap-2 bg-slate-700 text-slate-300 font-medium px-6 py-3 rounded-xl hover:bg-slate-600 transition transform hover:-translate-y-0.5 cursor-pointer"
>
  <FaArrowLeft />
  Go Back
</button>
      </div>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl">
        {/* Header and Status */}
        <motion.header
          className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              {application.role}
            </h1>
            <p className="text-lg text-slate-400 font-medium">
              at {application.company}
            </p>
          </div>
          <span
            className={`px-4 py-1.5 self-start rounded-full text-sm font-semibold border ${determineClassName(
              application.status
            )}`}
          >
            {application.status}
          </span>
        </motion.header>

        {/* Details Card */}
        <motion.div
          className="bg-slate-800 shadow-lg rounded-2xl p-6 border border-slate-700 mb-6 space-y-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="font-semibold text-sm text-slate-500 mb-1">
                Date Applied:
              </span>
              <p className="text-base text-slate-200 font-medium">
                {application.dateApplied}
              </p>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm text-slate-500 mb-1">
                Source:
              </span>
              <p className="text-base text-slate-200 font-medium">
                {application.source}
              </p>
            </div>
          </div>
          <div>
            <h2 className="font-semibold text-sm text-slate-500 mb-2">Notes</h2>
            <p className="text-slate-200 bg-slate-900 rounded-xl p-4 leading-relaxed border border-slate-700">
              {application.notes}
            </p>
          </div>
          <Link
            to={application.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-indigo-600 text-white font-medium px-6 py-3 rounded-xl shadow-lg hover:bg-indigo-700 transition transform hover:-translate-y-0.5"
          >
            View Application
          </Link>
        </motion.div>

        {/* Progress Timeline */}
        <motion.section
          className="mt-8 bg-slate-800 shadow-lg rounded-2xl p-6 border border-slate-700 mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl font-bold text-white mb-4">
            Application Progress
          </h2>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0">
            {["Applied", "Interviewing", "Offer", "Rejected"].map((step, i) => (
              <div key={i} className="flex items-center">
                <div
                  className={`w-6 h-6 rounded-full border-4 flex items-center justify-center transition-colors duration-300 ${
                    application.status === step
                      ? "bg-indigo-500 border-indigo-500 text-white"
                      : "bg-slate-900 border-slate-700 text-transparent"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span
                  className={`text-sm md:text-base font-medium ml-3 ${
                    application.status === step
                      ? "text-indigo-500 font-semibold"
                      : "text-slate-500"
                  }`}
                >
                  {step}
                </span>
                {i < 3 && (
                  <div
                    className="hidden md:block w-full h-1 bg-slate-700 mx-4"
                    style={{ flexGrow: 1 }}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </motion.section>

        {/* Notes Editor */}
        <motion.section
          className="mt-8 bg-slate-800 shadow-lg rounded-2xl p-6 border border-slate-700 mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-xl font-bold text-white mb-4">Update Notes</h2>
          <textarea
            onChange={(e) => setNotes(e.target.value)}
            value={notes}
            className="w-full border-2 border-slate-700 rounded-lg p-4 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 focus:border-indigo-400 transition-colors duration-300 bg-slate-900 text-white"
            rows="4"
            placeholder="Add more notes about this application..."
          />
          <button
            onClick={updateNotes}
            className="cursor-pointer mt-4 bg-indigo-600 text-white font-medium px-6 py-3 rounded-xl shadow-lg hover:bg-indigo-700 transition transform hover:-translate-y-0.5"
          >
            Save Notes
          </button>
        </motion.section>

        {/* Action Buttons */}
        <motion.div
          className="flex gap-4 mt-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={() => setOpenForm(true)}
            className="bg-yellow-500 text-white font-medium px-6 py-3 rounded-xl shadow-lg hover:bg-yellow-600 transition transform hover:-translate-y-0.5 cursor-pointer"
          >
            Edit
          </button>
          <button
            onClick={() => setOpenModal(true)}
            className="bg-red-600 text-white font-medium px-6 py-3 rounded-xl shadow-lg hover:bg-red-700 transition transform hover:-translate-y-0.5 cursor-pointer"
          >
            Delete
          </button>
          <button
            onClick={() => navigate(-1)}
            className="bg-slate-700 text-slate-300 font-medium px-6 py-3 rounded-xl hover:bg-slate-600 transition transform hover:-translate-y-0.5 cursor-pointer"
          >
            Go Back
          </button>
        </motion.div>

        {/* Activity Logs */}
        <motion.section
          className="bg-slate-800 rounded-2xl shadow-lg p-6 border border-slate-700 mt-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-xl font-bold text-white mb-4">Activity Logs</h2>
          <div className="relative">
            {application.activityLog && application.activityLog.length > 0 ? (
              <div className="relative border-l-2 border-slate-700 pl-8">
                {application.activityLog
                  .slice()
                  .reverse()
                  .map((log, index) => (
                    <LogEntry key={index} log={log} />
                  ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center text-slate-500 bg-slate-900 rounded-xl">
                <FaExclamationTriangle
                  size={48}
                  className="text-amber-500 mb-4"
                />
                <p className="text-lg font-medium">No activity logs yet.</p>
                <p className="text-sm mt-1">
                  Updates will appear here as you edit this application.
                </p>
              </div>
            )}
          </div>
        </motion.section>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {openModal && (
            <motion.section
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenModal(false)}
            >
              <motion.div
                className="bg-slate-800 rounded-2xl shadow-xl p-6 transform border border-slate-700"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-center mb-4">
                  <FaExclamationTriangle
                    size={48}
                    className="text-yellow-500"
                  />
                </div>
                <p className="font-semibold text-center text-lg text-white">
                  Are you sure you want to delete this application?
                </p>
                <p className="text-center text-sm text-slate-500 mt-2">
                  This action cannot be undone!
                </p>
                <div className="flex items-center justify-center gap-4 mt-6">
                  <button
                    onClick={() => setOpenModal(false)}
                    className="bg-slate-700 text-slate-300 font-medium px-6 py-3 rounded-xl hover:bg-slate-600 transition transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={deleteApplication}
                    className="bg-red-600 text-white font-medium px-6 py-3 rounded-xl shadow-lg hover:bg-red-700 transition transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    Confirm Delete
                  </button>
                </div>
              </motion.div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Edit Form Modal */}
        <AddApplicationForm
               isHome={false}
                openForm={openForm}
                setOpenForm={setOpenForm}
                role={role}
                setRole={setRole}
                companyName={companyName}
                setCompanyName={setCompanyName}
                link={link}
                setLink={setLink}
                status={status}
                source={source}
                date={date}
                setSource={setSource}
                setDate={setDate}
                setStatus={setStatus}
                formNotes={formNotes}
                setFormNotes={setFormNotes}
                handleSubmit={handleSubmit}
              />
      </div>
    </motion.div>
  );
};

export default SingleApplication;
