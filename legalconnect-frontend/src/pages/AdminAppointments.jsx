import { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const res = await api.get("/appointment/all");
      setAppointments(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/appointment/status/${id}`, `"${status}"`, {
        headers: { "Content-Type": "application/json" },
      });

      alert(`Appointment ${status} ✅`);
      fetchAppointments();
    } catch (err) {
      console.log(err);
      alert("Error updating ❌");
    }
  };

  const getStatusStyle = (status) => {
    if (status === "Approved") return "text-green-600 bg-green-100";
    if (status === "Rejected") return "text-red-600 bg-red-100";
    return "text-yellow-600 bg-yellow-100";
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Manage Appointments 🛠️</h2>

      {loading ? (
        <p>Loading...</p>
      ) : appointments.length === 0 ? (
        <p>No appointments found</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {appointments.map((a) => (
            <div
              key={a.id}
              className="p-5 border rounded-xl shadow bg-white space-y-2"
            >
              <p>
                <b>Name:</b> {a.clientName}
              </p>
              <p>
                <b>Email:</b> {a.email}
              </p>

              <p>
                <b>Lawyer:</b>{" "}
                <span className="text-blue-600 font-medium">
                  {a.lawyerName}
                </span>
              </p>

              <p>
                <b>Date:</b> {new Date(a.date).toLocaleDateString()}
              </p>

              <p>
                <b>Time Slot:</b>{" "}
                <span className="text-purple-600 font-medium">
                  {a.timeSlot || "N/A"}
                </span>
              </p>

              {/* STATUS */}
              <div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusStyle(a.status)}`}
                >
                  {a.status}
                </span>
              </div>

              {/* 📝 CASE DETAILS */}
              {a.caseDetails && (
                <p className="text-sm text-gray-700">
                  <b>Case:</b> {a.caseDetails}
                </p>
              )}

              {/* 📄 DOCUMENT */}
              {a.documentPath && (
                <a
                  href={`https://localhost:7233/${a.documentPath}`}
                  target="_blank"
                  className="text-blue-500 underline text-sm"
                >
                  View Document 📄
                </a>
              )}

              {/* ACTIONS */}
              <div className="mt-3 flex gap-3">
                <button
                  disabled={a.status === "Approved"}
                  onClick={() => updateStatus(a.id, "Approved")}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded disabled:opacity-40"
                >
                  Approve
                </button>

                <button
                  disabled={a.status === "Rejected"}
                  onClick={() => updateStatus(a.id, "Rejected")}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded disabled:opacity-40"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
