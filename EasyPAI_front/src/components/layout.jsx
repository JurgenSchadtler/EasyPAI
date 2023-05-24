/**
 * @file layout.jsx
 * @description Layout component providing a common structure for the application with a main navbar and children components/content.
 * @author jludwolf
 * @created May 18, 2023
 */

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
