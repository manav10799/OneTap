import React ,{ useEffect, useState } from 'react';
import Dashboard from './pages/dashboard/Dashboard';
import Header from './components/header/Header';
import { ThemeProvider } from './theme/themeContext';
import { CssVarsProvider } from '@mui/joy/styles';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Login from "./Login/Login";
import UserContext from './service/UserContext';
 
function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = () => {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/auth/user", { withCredentials: true })
        .then((response) => {
          if (response.data) setUser(response.data);
        })
        .catch((err) => {
          setUser(null);
          console.error(err);
        });
    };
  
    // Only call after short delay so cookie has time to sync
    const timeout = setTimeout(fetchUser, 500); // 500ms delay
  
    return () => clearTimeout(timeout); // cleanup
  }, []);
  

  return (
    <div className="App h-screen">
      <UserContext.Provider value={{user}}>
      <CssVarsProvider>
        <ThemeProvider>
            {user && <Header user={user} setUser={setUser} />}  
            <Routes>
              <Route path="*" element={user ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/login" element={<Login user={user} setUser={setUser} />} />
            </Routes>
        </ThemeProvider>
      </CssVarsProvider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
