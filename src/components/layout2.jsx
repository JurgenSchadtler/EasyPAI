/**
 * @file layout.jsx
 * @description Layout component providing a common structure for the application with a main navbar and children components/content.
 * @author jludwolf
 * @created May 18, 2023
 */

import React from "react";

import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Layout2 = ({ children }) => {
  const navigate = useNavigate();

  const onReturnClick = () => {
    navigate("/");
  };

  return (
    <div className="transfer-div">
      <div className="transfer-header-div">
        <BiArrowBack className="back-icon" onClick={onReturnClick} />
      </div>
      <div className="transfer-main-div">{children}</div>
    </div>
  );
};

export default Layout2;
