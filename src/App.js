import React, { useState, useContext } from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import Login from "./Login component/Login";

import useToken from "./components/useToken";
import Header from "./components/Header";
import { GlobalProvider } from "./contex/GlobalState";
import AddPackage from "./components/AddPackage";
import PackageDetails from "./components/PackageDetails";
import { GlobalContex } from "./contex/GlobalState";

function App() {
  const { token, setToken } = useToken();
  const { data } = useContext(GlobalContex);

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <GlobalProvider>
      <Header />
      <AddPackage />
      <Routes>
        {!token && <Route path="/login" element={<Login />}></Route>}
        {token && <Route path="/dashboard" element={<Dashboard />}></Route>}
        <Route
          path="/packages/:id"
          element={<PackageDetails data={data} />}
        ></Route>
        <Route
          path="*"
          element={<Navigate to={token ? "/dashboard" : "/login"} />}
        ></Route>
      </Routes>
    </GlobalProvider>
  );
}

export default App;
