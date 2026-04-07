import { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminLawyers() {
  const [lawyers, setLawyers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    specialization: "",
    experience: "",
  });

  const [loading, setLoading] = useState(false);

  // ✅ FETCH LAWYERS
  const fetchLawyers = async () => {
    try {
      const res = await api.get("/lawyer");
      setLawyers(res.data);
    } catch (err) {
      console.log("Fetch error:", err.response?.data || err);
    }
  };

  useEffect(() => {
    fetchLawyers();
  }, []);

  // ✅ HANDLE INPUT
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ ADD LAWYER (FIXED)
  const addLawyer = async () => {
    if (!form.name || !form.specialization || !form.experience) {
      alert("All fields required ❌");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        name: form.name,
        specialization: form.specialization,
        experience: Number(form.experience), // ✅ FIX (important)
      };

      await api.post("/lawyer", payload);

      alert("Lawyer added successfully ✅");

      setForm({
        name: "",
        specialization: "",
        experience: "",
      });

      fetchLawyers(); // refresh
    } catch (err) {
      console.log("Add error:", err.response?.data);

      alert(
        typeof err.response?.data === "string"
          ? err.response.data
          : JSON.stringify(err.response?.data),
      );
    } finally {
      setLoading(false);
    }
  };

  // ✅ DELETE LAWYER
  const deleteLawyer = async (id) => {
    try {
      await api.delete(`/lawyer/${id}`);
      alert("Deleted successfully ✅");
      fetchLawyers();
    } catch (err) {
      console.log(err);
      alert("Delete failed ❌");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Manage Lawyers 👨‍⚖️</h2>

      {/* FORM */}
      <div className="bg-white p-6 rounded-xl shadow mb-6 space-y-4">
        <input
          name="name"
          placeholder="Lawyer Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="specialization"
          placeholder="Specialization"
          value={form.specialization}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="experience"
          type="number" // ✅ IMPORTANT FIX
          placeholder="Experience (years)"
          value={form.experience}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button
          onClick={addLawyer}
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Lawyer"}
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {lawyers.length === 0 ? (
          <p>No lawyers found</p>
        ) : (
          lawyers.map((l) => (
            <div
              key={l.id}
              className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold text-lg">{l.name}</h3>
                <p className="text-gray-600">
                  Specialization: {l.specialization}
                </p>
                <p className="text-gray-600">
                  Experience: {l.experience} years
                </p>
              </div>

              <button
                onClick={() => deleteLawyer(l.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
