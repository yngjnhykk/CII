import React from "react";
import { Routes, Route } from "react-router";
import Simulator from "./pages/Simulator";
import MainPage from "./pages/shipManagment/ShipManagement";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}></Route>
      <Route path="/simulator" element={<Simulator />}></Route>
    </Routes>
  );
}

export default Router;
