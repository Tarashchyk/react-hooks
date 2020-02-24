import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Routes from "./routes";
import TopBar from "./components/TOPBAR/topBar";
import { CurrentUserProvider } from "./contexts/currentUser";
import CurrentUserChecker from "./components/CurrentUserChecker/currentUserChecker";

const App = () => {
  return (
    <CurrentUserProvider>
      <CurrentUserChecker>
        <Router>
          <TopBar />
          <Routes />
        </Router>
      </CurrentUserChecker>
    </CurrentUserProvider>
  );
};

export default App;
