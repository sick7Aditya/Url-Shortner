import React from 'react'
import { useNavigate, Link } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  function Logout() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <header
      style={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #A8A492",
        padding: "14px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <nav style={{ display: "flex", gap: "28px" }}>
        {["Home", "About", "Profile"].map((page) => (
          <Link
            key={page}
            to={`/${page}`}
            style={{ color: "#A8A492", textDecoration: "none", fontSize: "0.9rem", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#524646")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#A8A492")}
          >
            {page}
          </Link>
        ))}
      </nav>

      <button
        onClick={Logout}
        style={{
          backgroundColor: "transparent",
          color: "#EC5B38",
          border: "1px solid #EC5B38",
          padding: "8px 18px",
          borderRadius: "10px",
          fontSize: "0.85rem",
          fontWeight: 600,
          cursor: "pointer",
          letterSpacing: "1px",
          textTransform: "uppercase",
          transition: "all 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#EC5B38";
          e.currentTarget.style.color = "#ffffff";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = "#EC5B38";
        }}
      >
        Logout
      </button>
    </header>
  );
}

export default Navbar;