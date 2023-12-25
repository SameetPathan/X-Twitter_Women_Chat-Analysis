import "./App.css";
import PieChart from "./components/ChartsTwits";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import BackgroundC from "./components/background";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [loggedStatus, setLoggedStatus] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(false);

  return (
    <Router>
      <Navbar setLoggedStatus={setLoggedStatus} loggedStatus={loggedStatus} setCurrentAccount={setCurrentAccount} />
      <Routes>
        {loggedStatus ? (
          <>
          <Route
            exact
            path="/"
            element={<Home></Home>}
          />
           <Route
            exact
            path="/charts"
            element={<PieChart></PieChart>}
          /></>
        ) : (
          <>
            <Route exact path="/" element={<BackgroundC />} />
            <Route path="*" element={<BackgroundC />} />
            <Route
            exact
            path="/charts"
            element={<PieChart></PieChart>}
          />
          </>
        )}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
