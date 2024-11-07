import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header/Header";
import "./AppLayout.css";

function AppLayout() {
    return (
        <div className="page-container">
            <Header />
            <Outlet />
        </div>
    );
}

export default AppLayout;
