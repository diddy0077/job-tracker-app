import React, { createContext, useState } from "react";

// create the context
export const ApplicationContext = createContext();

// provider component
export const ApplicationProvider = ({ children }) => {
  const [applications, setApplications] = useState([]);

  return (
    <ApplicationContext.Provider value={{ applications, setApplications }}>
      {children}
    </ApplicationContext.Provider>
  );
};
