// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        background: "linear-gradient(120deg, #232526 0%, #757575 100%)",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          fontSize: "8rem",
          marginBottom: "-2rem",
          animation: "bounce 2s infinite",
        }}
      ></div>
      <h1
        style={{
          fontSize: "7rem",
          fontWeight: 900,
          color: "#ff1744",
          textShadow: "0 4px 24px #000",
        }}
      >
        404
      </h1>
      <h2
        style={{
          fontSize: "2.5rem",
          fontWeight: 700,
          marginTop: "1rem",
          color: "#fff",
        }}
      >
        ไม่พบหน้านี้!
      </h2>
      <p
        style={{
          fontSize: "1.3rem",
          marginTop: "1rem",
          color: "#bdbdbd",
          maxWidth: 500,
        }}
      >
        ขออภัย หน้าที่คุณค้นหาไม่พบ หรืออาจถูกย้ายไปแล้ว
        <br />
        <span style={{ fontSize: "2rem" }}>🔍</span>
      </p>
      <Link to="/" style={{ textDecoration: "none", marginTop: "2.5rem" }}>
        <button
          style={{
            padding: "1rem 2.5rem",
            borderRadius: "1rem",
            background: "linear-gradient(90deg, #ff1744 0%, #616161 100%)",
            color: "#fff",
            fontWeight: 700,
            fontSize: "1.3rem",
            border: "none",
            boxShadow: "0 4px 24px #0008",
            cursor: "pointer",
            transition: "background .2s",
          }}
        >
          ⬅️ กลับสู่หน้าแรก
        </button>
      </Link>
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

export default NotFound;
