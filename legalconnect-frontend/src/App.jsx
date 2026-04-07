import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import BookAppointment from "./pages/BookAppointment";
import MyAppointments from "./pages/MyAppointments";
import AdminAppointments from "./pages/AdminAppointments";
import Lawyers from "./pages/Lawyers";
import AdminLawyers from "./pages/AdminLawyers";

// Routes protection
import ProtectedRoute from "./utils/ProtectedRoute";
import PublicRoute from "./utils/PublicRoute";
import AdminRoute from "./utils/AdminRoute";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* 🏠 PUBLIC HOME */}
        <Route path="/" element={<Home />} />

        {/* 🔓 AUTH */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* 🔐 USER ROUTES */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/book"
          element={
            <ProtectedRoute>
              <BookAppointment />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-appointments"
          element={
            <ProtectedRoute>
              <MyAppointments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/lawyers"
          element={
            <ProtectedRoute>
              <Lawyers />
            </ProtectedRoute>
          }
        />

        {/* 👑 ADMIN ROUTES (NO ADMIN PANEL PAGE) */}
        <Route
          path="/admin-appointments"
          element={
            <AdminRoute>
              <AdminAppointments />
            </AdminRoute>
          }
        />

        <Route
          path="/admin-lawyers"
          element={
            <AdminRoute>
              <AdminLawyers />
            </AdminRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
