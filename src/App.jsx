import React ,{ useEffect, useState } from 'react';
import Dashboard from './pages/dashboard/Dashboard';
import Header from './components/header/Header';
import { ThemeProvider } from './theme/themeContext';
import { CssVarsProvider } from '@mui/joy/styles';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UserContext from './service/UserContext';
 
function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App h-screen">
      <UserContext.Provider value={{user}}>
      <CssVarsProvider>
        <ThemeProvider>
            {<Header/>}  
            <Routes>
              <Route path="*" element={ <Dashboard />} />
            </Routes>
        </ThemeProvider>
      </CssVarsProvider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
