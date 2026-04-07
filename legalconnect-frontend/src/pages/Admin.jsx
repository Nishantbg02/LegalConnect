import { useEffect, useState } from "react";
import api from "../services/api";

export default function Admin() {
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await api.get("/auth/admin");
        setData(res.data);
      } catch (err) {
        console.log(err);
        setData("Access Denied ❌");
      }
    };

    fetchAdmin();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">👑 Admin Panel</h1>

      <div className="mt-4 bg-yellow-100 p-4 rounded">{data}</div>
    </div>
  );
}
