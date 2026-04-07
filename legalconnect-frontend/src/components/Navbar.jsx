import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  // ✅ sync user on load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const isAdmin = user?.role === "Admin";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

    alert("Logged out successfully 🚪");
    navigate("/login");
  };

  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center shadow-md">
      {/* LOGO */}
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate(user ? "/dashboard" : "/")}
      >
        LegalConnect
      </h1>

      <div className="space-x-6 flex items-center">
        {/* 🔥 SMART HOME */}
        <Link to={user ? "/dashboard" : "/"} className="hover:text-gray-300">
          Home
        </Link>

        {!user ? (
          <>
            <Link to="/login" className="hover:text-gray-300">
              Login
            </Link>
            <Link to="/register" className="hover:text-gray-300">
              Register
            </Link>
          </>
        ) : (
          <>
            {/* 👤 USER NAME */}
            <span className="text-green-400 font-semibold">👤 {user.name}</span>

            {/* 📊 DASHBOARD */}
            <Link to="/dashboard" className="hover:text-gray-300">
              Dashboard
            </Link>

            {/* 👤 CLIENT ROUTES */}
            {!isAdmin && (
              <>
                <Link to="/book" className="hover:text-gray-300">
                  Book
                </Link>

                <Link to="/my-appointments" className="hover:text-gray-300">
                  My Appointments
                </Link>

                <Link to="/lawyers" className="hover:text-gray-300">
                  Lawyers
                </Link>
              </>
            )}

            {/* 👑 ADMIN ROUTES */}
            {isAdmin && (
              <>
                <Link to="/admin-appointments" className="hover:text-gray-300">
                  Appointments
                </Link>

                <Link to="/admin-lawyers" className="hover:text-gray-300">
                  Manage Lawyers
                </Link>
              </>
            )}

            {/* 🚪 LOGOUT */}
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
