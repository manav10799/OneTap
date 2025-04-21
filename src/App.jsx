import React, { useEffect, useState } from "react";
import Header from "./components/header/Header";
import { ThemeProvider } from "./theme/themeContext";
import { CssVarsProvider } from "@mui/joy/styles";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import UserContext from "./service/UserContext";
import SideBar from "./components/header/SideBar/Sidebar";
import Dashboard from "./pages/dashboard/Dashboard/Dashboard";
import RecentActivity from "./pages/dashboard/RecentActivity/RecentActivity";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App h-screen">
      <UserContext.Provider value={{ user }}>
        <CssVarsProvider>
          <ThemeProvider>
            <Header />
            <div className="h-full flex">
              <SideBar></SideBar>
              <div className="dark:bg-neutral-900 w-full">
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/files" element={<RecentActivity />} />
                  <Route
                    path="*"
                    element={<Navigate to="/dashboard" replace />}
                  />
                </Routes>
              </div>
            </div>
          </ThemeProvider>
        </CssVarsProvider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
