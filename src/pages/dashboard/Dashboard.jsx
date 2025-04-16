import React from "react";
import SideBar from "../../components/header/SideBar/Sidebar";
import Home from "./Home/Home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RecentActivity from "./RecentActivity/RecentActivity";

export default function Dashboard() {
  return (
    <div className="h-full flex">
        <SideBar></SideBar>
        <div className="dark:bg-neutral-900 w-full">
          <Routes>
            <Route path="/dashboard" element={<Home />}></Route>
            <Route path="/files" element={<RecentActivity />}></Route>
          </Routes>
        </div>
    </div>
  );
}
