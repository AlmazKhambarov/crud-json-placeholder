import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Layout/Header/Header";
import "./Layout.scss";
import { useDispatch } from "react-redux";
const Layout = () => {

  return (
    <div class={"layout"}>
      <Sidebar />
    </div>
  );
};

export default Layout;
