import React, { useEffect, useState } from "react";
import {
  NavLink,
  useSearchParams,
  useLoaderData,
  Link,
} from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import AddApplicationForm from "../components/AddApplicationForm";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

import {
  FaRegFileAlt,
  FaRegCommentDots,
  FaHandshake,
  FaTimesCircle,
} from "react-icons/fa";

export async function HomeLoader() {
  const res = await fetch("http://localhost:5000/applications");
  if (!res.ok) {
    throw {
      message: "Failed to fetch vans",
      statusText: res.statusText,
      status: res.status,
    };
  }
  return res.json();
}

const HomePage = ({ setApplications }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const statusFilter = searchParams.get("status");
  const data = useLoaderData();
  const applications = data.applications || data;
  const recentApplications = applications.slice(0, 4);
  const [role, setRole] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [source, setSource] = useState("");
  const [formNotes, setFormNotes] = useState("");
  const [link, setLink] = useState("");
  const { openForm, setOpenForm } = useOutletContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const filteredApplications = recentApplications.filter((item) => {
    return statusFilter
      ? item.status.toLowerCase() === statusFilter
      : recentApplications;
  });

  const interviewCount = applications.filter((app) => {
    return app.status.toLowerCase() === "interviewing";
  }).length;

  const appliedCount = applications.filter((app) => {
    return app.status.toLowerCase() === "applied";
  }).length;

  const offersCount = applications.filter((app) => {
    return app.status.toLowerCase() === "offer";
  }).length;

  const rejectedCount = applications.filter((app) => {
    return app.status.toLowerCase() === "rejected";
  }).length;

  const summary = [
    {
      status: "Applied",
      count: appliedCount,
      icons: <FaRegFileAlt size={32} className="text-indigo-500" />,
      subtext: `total jobs applied`,
      className: "text-teal-600",
    },
    {
      status: "Interviewing",
      count: interviewCount,
      icons: <FaRegCommentDots size={32} className="text-indigo-500" />,
      subtext: `Total jobs interviewing`,
      className: "text-yellow-600",
    },
    {
      status: "Offers",
      count: offersCount,
      icons: <FaHandshake size={32} className="text-indigo-500" />,
      subtext: `Total jobs offered`,
      className: "text-green-600",
    },
    {
      status: "Rejected",
      count: rejectedCount,
      icons: <FaTimesCircle size={32} className="text-indigo-500" />,
      subtext: `Total jobs rejected`,
      className: "text-red-600",
    },
  ];

  const filtersBtn = ["All", "Applied", "Interviewing", "Offer", "Rejected"];

 

  function determineClassName(status) {
    let className;
    if (status === "interviewing") {
      className = "text-green-400 bg-green-100";
    } else if (status === "offer") {
      className = "text-[#ca8a04] bg-[#fef9c3]";
    } else if (status === "rejected") {
      className = "text-[#dc2626] bg-[#fee2e2]";
    } else if (status === "applied") {
      className = "text-[#0284c7] bg-[#e0f2fe]";
    } else {
      return null;
    }
    return className;
  }

  const [statusData, setStatusData] = useState([]);
  const colors = ["#4f46e5", "#16a34a", "#facc15", "#dc2626"];
  useEffect(() => {
    const newCounts = {
      Applied: 0,
      Interviewing: 0,
      Offer: 0,
      Rejected: 0,
    };
    applications.forEach((app) => {
      newCounts[app.status] += 1;
    });
    console.log(newCounts);
    const statusArray = Object.keys(newCounts).map((key) => {
      return {
        status: key,
        count: newCounts[key],
      };
    });
    setStatusData(statusArray);
  }, [applications]);

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

    const newActivityLog = {
      message: "Application Created",
      timeStamp: new Date().toISOString(),
    };

    const newApplication = {
      role,
      status,
      company: companyName,
      link,
      notes: formNotes,
      dateApplied: date,
      source,
      activityLog: [newActivityLog],
    };

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/applications/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newApplication),
      });

      const data = await res.json();
      console.log("Application Added", data);

      // ✅ Append instead of overwrite
      setApplications((prev) => [...prev, data]);
      toast.success("Application Added Successfully!");
      setTimeout(() => {
        setOpenForm(false);
      }, 2000);
    } catch (error) {
      console.log("Error Adding Application", error);
      toast.error("Something went wrong. Try again.");
      setError(error);
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <main className="bg-gradient-to-br from-gray-950 via-slate-900 to-zinc-950 min-h-screen p-6 md:px-[8rem] px-6 text-slate-100 font-sans">
      <div className="mt-8 text-center md:text-left">
        <h1 className="text-4xl font-extrabold text-white">Job Dashboard</h1>
        <p className="text-lg text-slate-400 mt-2">
          A quick overview of your applications.
        </p>
      </div>

      <motion.section
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full my-10"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {summary.map((item, index) => (
          <motion.div
            key={index}
            className="bg-slate-900  rounded-3xl py-8 px-8 flex flex-col items-center justify-center border border-slate-700 shadow-2xl overflow-hidden"
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              boxShadow:
                "0 10px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
              borderColor: item.className.replace("text", "border"),
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div
              className={`text-4xl mb-4 p-4 rounded-full bg-slate-800 border-2 ${item.className.replace(
                "text",
                "border"
              )}`}
            >
              {item.icons}
            </div>
            <p className={`text-4xl font-extrabold mb-1 ${item.className}`}>
              {item.count}
            </p>
            <p className="text-lg font-medium text-slate-400 text-center">
              {item.status}
            </p>
          </motion.div>
        ))}
      </motion.section>

      <motion.section
        className="flex flex-col md:flex-row items-stretch gap-6 max-w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div className="bg-slate-900 shadow-2xl rounded-3xl p-6 md:min-w-[400px] border border-gray-500">
          <h1 className="text-center font-bold text-2xl mb-4 text-white border-b border-b-slate-700 pb-2">
            Application Statuses
          </h1>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
              >
                {statusData.map((entry, index) => (
                  <Cell key={index} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />    
                <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-900 rounded-3xl border border-gray-500 shadow-2xl p-6 flex-grow">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
            <h1 className="text-white font-bold text-2xl mb-4 sm:mb-0">
              Recent Applications
            </h1>
            <button
              onClick={() => setOpenForm(true)}
              className="bg-indigo-600 text-white rounded-xl shadow-lg p-3 font-semibold text-sm cursor-pointer hover:bg-indigo-700 transition duration-300 transform hover:-translate-y-1"
            >
              + Add New Application
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            {filtersBtn.map((btn) => {
              const isActive = btn.toLowerCase() === statusFilter;
              return (
                <button
                  key={btn}
                  onClick={() => (btn === 'All' ? setSearchParams({}) : setSearchParams({status: btn.toLowerCase()}))}
                  className={`${
                    isActive
                      ? "bg-indigo-500 text-white shadow-md"
                      : "bg-slate-800 text-slate-400"
                  } font-semibold py-2 px-4 text-sm rounded-xl transition duration-300 hover:bg-indigo-500 hover:text-white cursor-pointer`}
                >
                  {btn}
                </button>
              );
            })}
          </div>

          {filteredApplications.length > 0 ? (
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 my-6"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {filteredApplications.map((app) => (
                <Link
                  to={`applications/${app.id}`}
                  key={app.id}
                  className={`flex items-start justify-between bg-slate-800 p-6 rounded-2xl shadow-sm border-2 border-transparent cursor-pointer transition-all duration-300 hover:shadow-md hover:border-b-4 hover:border-b-indigo-400`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="space-y-2">
                    <h2 className="text-white font-bold text-lg">
                      {app.company}
                    </h2>
                    <h3 className="text-slate-400 text-sm">{app.role}</h3>
                    <p className="text-xs text-slate-500">
                      Applied on: {app.dateApplied}
                    </p>
                  </div>
                  <p
                    className={`text-xs p-2 rounded-full py-1 font-semibold border ${determineClassName(
                      app.status.toLowerCase()
                    )}`}
                  >
                    {app.status.toUpperCase()}
                  </p>
                </Link>
              ))}
            </motion.div>
          ) : (
            <p className="text-slate-400 text-sm mt-5">
              No jobs matched your filter.
            </p>
          )}
        </div>
      </motion.section>
      <AddApplicationForm
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
    </main>
  );
};

export default HomePage;
