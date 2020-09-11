import React from "react";

// Page Components
import DashboardComponent from "./components/DashboardComponent";
import AppBar from "../components/layout/AppBar";

const Home = () => {
  React.useEffect(() => {
    document.title = "Dashboard";
  }, []);

  return (
    <>
      <AppBar page="profile" />
      <DashboardComponent />
    </>
  );
};

export default Home;
