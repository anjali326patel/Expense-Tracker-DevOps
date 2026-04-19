import React from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ExpenseTracker from "./pages/ExpenseTracker";
import PrivateRoute from "./components/PrivateRoute";
import LandingPage from "./pages/LandingPage";
import NotFoundPage from "./pages/NotFoundPage";
const AllRoutes = () => {
  const token = sessionStorage.getItem("token");

  function LoginGuard() {
    if (!token) {
      return <LoginPage />;
    }
    return <Navigate to="/expenses" />;
  }

  function RegisterGuard() {
    if (!token) {
      return <RegisterPage />;
    }
    return <Navigate to="/expenses" />;
  }
  function LandingPageGuard() {
    if (!token) {
      return <LandingPage />;
    }
    return <Navigate to="/expenses" />;
  }

  return (
    <Routes>
	<Route path="/login" element={<LoginGuard />} />
	<Route path="/register" element={<RegisterGuard />} />
      <Route
        path="/expenses"
        element={
          <PrivateRoute>
            {" "}
            <ExpenseTracker />
          </PrivateRoute>
        }
      />
      <Route path="/" element={<LandingPageGuard />} />
      <Route path="*" element={<NotFoundPage/>}/> 
    </Routes>
  );
};

export default AllRoutes;
