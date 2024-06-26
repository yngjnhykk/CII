import React from "react";
import { Routes, Route } from "react-router";
import List from "./pages/List";
import Register from "./pages/Register";
import Simulator from "./pages/Simulator";
import Dashboard from "./pages/Dashboard";

function Router() {
  return (
    <div className={'mx-auto'}  style={{ width: '80%' }}>
    <Routes>
      <Route path="/" element={<List />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/simulator" element={<Simulator />}></Route>
      <Route path="/dashboard/:id" element={<Dashboard />}></Route>
    </Routes>
    </div>

  );
}

export default Router;
