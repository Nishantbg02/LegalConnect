import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  // 🚀 Redirect if already logged in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* 🔥 HERO */}
      <div className="bg-gradient-to-r from-black to-gray-800 text-white py-24 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Find Trusted Lawyers ⚖️
        </h1>

        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Connect with experienced lawyers, book appointments, and manage your
          legal consultations easily.
        </p>

        <div className="mt-8 space-x-4">
          <Link
            to="/register"
            className="bg-white text-black px-6 py-2 rounded font-semibold hover:bg-gray-200 transition"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="border border-white px-6 py-2 rounded hover:bg-white hover:text-black transition"
          >
            Login
          </Link>
        </div>
      </div>

      {/* 🔥 FEATURES */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
          <h3 className="text-lg font-bold mb-2">👨‍⚖️ Verified Lawyers</h3>
          <p className="text-gray-600">
            Browse experienced lawyers across multiple specializations.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
          <h3 className="text-lg font-bold mb-2">📅 Easy Booking</h3>
          <p className="text-gray-600">
            Book appointments with available time slots instantly.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
          <h3 className="text-lg font-bold mb-2">🔐 Secure Platform</h3>
          <p className="text-gray-600">
            Your data is safe with authentication and role-based access.
          </p>
        </div>
      </div>

      {/* 🔥 HOW IT WORKS */}
      <div className="bg-white py-12">
        <h2 className="text-2xl font-bold text-center mb-8">How It Works 🚀</h2>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center px-6">
          <div>
            <div className="text-3xl mb-2">1️⃣</div>
            <h3 className="font-semibold">Register/Login</h3>
            <p className="text-gray-600 text-sm">
              Create an account to get started
            </p>
          </div>

          <div>
            <div className="text-3xl mb-2">2️⃣</div>
            <h3 className="font-semibold">Choose Lawyer</h3>
            <p className="text-gray-600 text-sm">
              Select lawyer based on specialization
            </p>
          </div>

          <div>
            <div className="text-3xl mb-2">3️⃣</div>
            <h3 className="font-semibold">Book Appointment</h3>
            <p className="text-gray-600 text-sm">
              Pick date & time slot easily
            </p>
          </div>
        </div>
      </div>

      {/* 🔥 CTA */}
      <div className="bg-black text-white py-14 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Get Legal Help?</h2>

        <Link
          to="/register"
          className="bg-white text-black px-6 py-2 rounded font-semibold hover:bg-gray-200 transition"
        >
          Create Account
        </Link>
      </div>

      {/* 🔥 FOOTER */}
      <div className="bg-gray-900 text-gray-400 text-center py-4 text-sm">
        © {new Date().getFullYear()} LegalConnect. All rights reserved.
      </div>
    </div>
  );
}
