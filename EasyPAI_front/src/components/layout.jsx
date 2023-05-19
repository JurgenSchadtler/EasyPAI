import React from "react";
import MainNavbar from "../components/navbar";

const Layout = ({ children }) => {
  return (
    <div style={{backgroundColor:'#F1F5FB', minHeight:'100vh'}}>
      <MainNavbar />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
