import React from "react";
import Sidebar from "../components/client-sidebar/sidebar";
import Navbar from "../components/client-navbar/navbar";
import MapComponent from "../components/client-map/map";
const Dashboard = () => {
  return (
    <div className="bg-slate-50">
      <Navbar />
      <div className="main max-w-full flex flex-1 justify-between">
        <Sidebar />
        <div className="fixed w-screen left-[76px] top-[48px]">
          <MapComponent />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
