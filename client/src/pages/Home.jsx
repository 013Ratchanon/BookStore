import React from "react";
import { Link } from "react-router";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-100 to-gray-300 px-4 py-12">
      <div className="max-w-3xl text-center bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          🎉 ยินดีต้อนรับสู่ระบบร้านหนังสือ
        </h1>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/BookPage"
            className="btn btn-primary btn-lg w-full sm:w-auto"
          >
            🔍 ดูหนังสือ
          </Link>

          <Link
            to="/addactivity"
            className="btn btn-secondary btn-lg w-full sm:w-auto"
          >
            🔍 ดูหนังสือการ์ตูน
          </Link>
        </div>
      </div>

      <p className="mt-12 text-sm text-gray-500">
        © 2025 Nakhon Pathom Rajabhat University - Science Day
      </p>
    </div>
  );
};

export default Home;
