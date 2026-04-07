import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  // ✅ DIRECT INIT (NO useEffect needed)
  const [user] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [stats, setStats] = useState({
    totalLawyers: 0,
    totalAppointments: 0,
    pendingAppointments: 0,
  });

  // ✅ fetch function
  const fetchAdminStats = async () => {
    try {
      const lawyersRes = await api.get("/lawyer");
      const appointmentsRes = await api.get("/appointment/all");

      const totalAppointments = appointmentsRes.data.length;
      const pendingAppointments = appointmentsRes.data.filter(
        (a) => a.status === "Pending",
      ).length;

      setStats({
        totalLawyers: lawyersRes.data.length,
        totalAppointments,
        pendingAppointments,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ ONLY for admin stats
  useEffect(() => {
    if (user?.role === "Admin") {
      fetchAdminStats();
    }
  }, [user]);

  if (!user) return null;

  const isAdmin = user.role === "Admin";

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Welcome, {user.name} 👋</h2>

      <div className="bg-white p-4 rounded shadow mb-6">
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
      </div>

      {isAdmin && (
        <>
          <h3 className="text-xl font-semibold mb-4">Admin Overview 📊</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded shadow text-center">
              <h4 className="text-lg font-bold">👨‍⚖️ Lawyers</h4>
              <p className="text-2xl mt-2">{stats.totalLawyers}</p>
            </div>

            <div className="bg-white p-6 rounded shadow text-center">
              <h4 className="text-lg font-bold">📅 Appointments</h4>
              <p className="text-2xl mt-2">{stats.totalAppointments}</p>
            </div>

            <div className="bg-white p-6 rounded shadow text-center">
              <h4 className="text-lg font-bold">⏳ Pending</h4>
              <p className="text-2xl mt-2">{stats.pendingAppointments}</p>
            </div>
          </div>
        </>
      )}

      <div className="bg-green-200 p-4 mt-6 rounded">
        <strong>Secure API:</strong> You are authorized 🔐
      </div>
    </div>
  );
}
