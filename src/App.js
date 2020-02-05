import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Routes from "./routes";
import TopBar from "./components/TOPBAR/topBar";

const App = () => {
  return (
    <>
      <Router>
        <TopBar />
        <Routes />
      </Router>
    </>
  );
};

export default App;
