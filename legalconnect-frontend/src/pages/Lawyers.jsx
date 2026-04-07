import { useEffect, useState } from "react";
import api from "../services/api";

export default function Lawyers() {
  const [lawyers, setLawyers] = useState([]);

  useEffect(() => {
    fetchLawyers();
  }, []);

  const fetchLawyers = async () => {
    try {
      const res = await api.get("/lawyer");
      setLawyers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Lawyers 👨‍⚖️</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {lawyers.map((l) => (
          <div key={l.id} className="p-4 border rounded shadow">
            <h3 className="text-lg font-bold">{l.name}</h3>
            <p>Specialization: {l.specialization}</p>
            <p>Experience: {l.experience} years</p>
          </div>
        ))}
      </div>
    </div>
  );
}
