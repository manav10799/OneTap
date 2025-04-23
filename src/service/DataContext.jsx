// src/service/DataContext.js
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);

  const apiUrl = import.meta.env.VITE_BACKEND_URL + "/logs";

  const fetchLogs = useCallback(async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setLogs(data);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return (
    <DataContext.Provider value={{ logs, setLogs, fetchLogs }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
