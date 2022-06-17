import React from "react";
import DDAlerts from "../DDAlerts/DDAlerts";
import DDNavbar from "../DDNavbar/DDNavbar";
import Footer from "../Footer/Footer";

const Layout = ({ children }) => {
  return (
    <>
      <DDNavbar />
      <DDAlerts />
      <div className="">{children && children}</div>;
      <Footer />
    </>
  );
};

export default Layout;
