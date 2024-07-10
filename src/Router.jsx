import React from "react";
import { Routes, Route } from "react-router";
import MainPage from "./pages/shipManagment/ShipManagement";
import Simulator from "./pages/simulator/Simulator";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}></Route>
      <Route path="/simulator" element={<Simulator />}></Route>
    </Routes>
  );
}

export default Router;
