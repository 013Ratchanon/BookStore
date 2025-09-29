import React from "react";
import { Link } from "react-router-dom";

const menuItems = [
  { name: "AddBook", url: "/AddBook" },
  { name: "Book", url: "/BookPage" },
  { name: "Journal", url: "/" },
  { name: "Comic", url: "/" },
];
const linkStyle = {
  color: "#bdbdbd",
  fontWeight: 600,
  fontSize: "1.1rem",
  textDecoration: "none",
  padding: "0.5rem 1rem",
  borderRadius: "0.5rem",
  display: "inline-block",
  transition: "background .2s, color .2s",
};

const NavBar = () => {
  const handleMouseOver = (e) => {
    e.currentTarget.style.background = "#616161";
    e.currentTarget.style.color = "#fff";
  };

  const handleMouseOut = (e) => {
    e.currentTarget.style.background = "transparent";
    e.currentTarget.style.color = "#bdbdbd";
  };

  return (
    <nav
      style={{
        background: "linear-gradient(90deg, #232526 0%, #414345 100%)",
        boxShadow: "0 2px 8px rgba(44,62,80,0.10)",
        padding: "0.5rem 0",
        position: "sticky",
        top: 0,
        zIndex: 100,
        minHeight: "64px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 2rem",
          maxWidth: "100vw",
          boxSizing: "border-box",
        }}
      >
        <Link
          to="/"
          style={{
            fontSize: "2rem",
            fontWeight: 900,
            color: "#fff",
            letterSpacing: "2px",
            textDecoration: "none",
            padding: "0.5rem 0",
          }}
        >
          🚀 BookStore
        </Link>

        <ul
          style={{
            display: "flex",
            gap: "1.5rem",
            listStyle: "none",
            margin: 0,
            padding: 0,
            flex: 1,
            justifyContent: "flex-start",
          }}
        >
          {menuItems.map(({ name, url }, i) => (
            <li key={i}>
              <Link
                to={url}
                style={linkStyle}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            justifyContent: "flex-end",
            minWidth: "250px",
          }}
        ></div>
      </div>
    </nav>
  );
};

export default NavBar;
