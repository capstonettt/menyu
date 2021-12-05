import React from "react";
import "../MenuStyling/MenuHeader.css";

const MenuHeader = ({ rLogo, rName }) => {
  console.log("rendering MenuHeader");
  return (
    <div className="menu-header">
      <div className="notch" />
      <img className="menu-header-image" src={rLogo} alt={rName} />
    </div>
  );
};

export default MenuHeader;
