import { useEffect, useState } from "react";
import api from "../services/api";

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 store input per appointment
  const [caseInputs, setCaseInputs] = useState({});

  const fetchAppointments = async () => {
    try {
      const res = await api.get("/appointment/my");
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

  const getStatusStyle = (status) => {
    if (status === "Approved") return "text-green-600 bg-green-100";
    if (status === "Rejected") return "text-red-600 bg-red-100";
    return "text-yellow-600 bg-yellow-100";
  };

  // ✅ handle input per card
  const handleInputChange = (id, field, value) => {
    setCaseInputs((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  // ✅ upload function
  const handleUpload = async (id) => {
    const data = caseInputs[id];

    if (!data?.file && !data?.caseDetails) {
      alert("Please add file or case details ❌");
      return;
    }

    const formData = new FormData();
    if (data?.file) formData.append("file", data.file);
    formData.append("caseDetails", data?.caseDetails || "");

    try {
      await api.post(`/appointment/upload/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Uploaded successfully ✅");

      // clear inputs
      setCaseInputs((prev) => ({
        ...prev,
        [id]: { file: null, caseDetails: "" },
      }));

      fetchAppointments();
    } catch (err) {
      console.log(err);
      alert("Upload failed ❌");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">My Appointments 📋</h2>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : appointments.length === 0 ? (
        <p className="text-gray-500">No appointments yet</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {appointments.map((a) => (
            <div
              key={a.id}
              className="p-5 rounded-xl shadow bg-white border space-y-2"
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
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusStyle(
                    a.status,
                  )}`}
                >
                  {a.status}
                </span>
              </div>

              {/* 🧠 STATUS MESSAGE */}
              {a.status === "Pending" && (
                <p className="text-yellow-600 text-sm">
                  ⏳ Waiting for admin approval
                </p>
              )}

              {a.status === "Rejected" && (
                <p className="text-red-600 text-sm">❌ Appointment rejected</p>
              )}

              {a.status === "Approved" && (
                <p className="text-green-600 text-sm">
                  ✅ You can upload case details
                </p>
              )}

              {/* 📝 EXISTING CASE */}
              {a.caseDetails && (
                <p className="text-sm text-gray-700">
                  <b>Case:</b> {a.caseDetails}
                </p>
              )}

              {/* 📄 EXISTING FILE */}
              {a.documentPath && (
                <a
                  href={`https://localhost:7233/${a.documentPath}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 underline text-sm"
                >
                  View Document 📄
                </a>
              )}

              {/* 🔥 ONLY SHOW WHEN APPROVED */}
              {a.status === "Approved" && (
                <div className="border-t pt-3 mt-3">
                  <p className="font-semibold text-sm mb-1">Add Case Details</p>

                  <textarea
                    placeholder="Describe your case..."
                    value={caseInputs[a.id]?.caseDetails || ""}
                    onChange={(e) =>
                      handleInputChange(a.id, "caseDetails", e.target.value)
                    }
                    className="w-full border p-2 rounded text-sm"
                  />

                  <input
                    type="file"
                    onChange={(e) =>
                      handleInputChange(a.id, "file", e.target.files[0])
                    }
                    className="mt-2 text-sm"
                  />

                  <button
                    onClick={() => handleUpload(a.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 mt-2 rounded text-sm"
                  >
                    Upload Case 📤
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
