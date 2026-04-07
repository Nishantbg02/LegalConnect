import { useEffect, useState } from "react";
import api from "../services/api";

export default function BookAppointment() {
  const [form, setForm] = useState({
    clientName: "",
    email: "",
    lawyerName: "",
    date: "",
    timeSlot: "",
  });

  const [lawyers, setLawyers] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  // ⏱ Available slots
  const timeSlots = ["10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM"];

  // ✅ FETCH LAWYERS
  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const res = await api.get("/lawyer");
        setLawyers(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchLawyers();
  }, []);

  // ✅ FETCH BOOKED SLOTS (CLEAN FIX)
  useEffect(() => {
    const fetchSlots = async () => {
      try {
        setLoadingSlots(true);

        const res = await api.get("/appointment/slots", {
          params: {
            lawyerName: form.lawyerName,
            date: form.date,
          },
        });

        setBookedSlots(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingSlots(false);
      }
    };

    if (form.lawyerName && form.date) {
      fetchSlots();
    }
  }, [form.lawyerName, form.date]);

  // ✅ HANDLE INPUT
  const handleChange = (e) => {
    const { name, value } = e.target;

    // reset time slot when lawyer/date changes
    if (name === "lawyerName" || name === "date") {
      setForm((prev) => ({
        ...prev,
        [name]: value,
        timeSlot: "",
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // ✅ SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.lawyerName || !form.date || !form.timeSlot) {
      alert("Please select lawyer, date and time slot ❌");
      return;
    }

    try {
      await api.post("/appointment/book", form);

      alert("Appointment booked ✅");

      setForm({
        clientName: "",
        email: "",
        lawyerName: "",
        date: "",
        timeSlot: "",
      });

      setBookedSlots([]);
    } catch (err) {
      console.log(err);
      alert(err.response?.data || "Error booking ❌");
    }
  };

  // ✅ Disable past dates
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Book Appointment 📅</h2>

        {/* Name */}
        <input
          type="text"
          name="clientName"
          placeholder="Your Name"
          value={form.clientName}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* Lawyer */}
        <select
          name="lawyerName"
          value={form.lawyerName}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Lawyer</option>
          {lawyers.map((l) => (
            <option key={l.id} value={l.name}>
              {l.name} ({l.specialization})
            </option>
          ))}
        </select>

        {/* Date */}
        <input
          type="date"
          name="date"
          value={form.date}
          min={today} // 🚀 disable past
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* Slots */}
        <select
          name="timeSlot"
          value={form.timeSlot}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">
            {loadingSlots ? "Loading slots..." : "Select Time Slot"}
          </option>

          {timeSlots.map((slot) => {
            const isBooked = bookedSlots.includes(slot);

            return (
              <option key={slot} value={slot} disabled={isBooked}>
                {slot} {isBooked ? "❌ (Booked)" : "✅"}
              </option>
            );
          })}
        </select>

        {/* Button */}
        <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
          Book Appointment
        </button>
      </form>
    </div>
  );
}
