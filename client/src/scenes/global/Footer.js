import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Footer() {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login");
  };
  return (
    <div
      className="footer-container"
      id="footer"
      style={{
        backgroundColor: "#22222a",
        width: "100vw",
        // height: "60vh",
        padding: "5%",
        gap: "2%",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        // gridTemplateColumns: "1fr 1fr 1fr 1fr",
      }}
    >
      <div>
        <h1>MOI APP</h1>
        <h3>Made Easy</h3>
      </div>
      <div>
        <h2
          style={{
            fontWeight: 600,
            fontFamily: "Poppins",
            fontSize: "20px",
            lineHeight: "24px",
            textAlign: "left",
            color: "#fff",
          }}
        >
          About Moi-App
        </h2>
        <h3
          style={{
            fontWeight: 400,
            fontFamily: "Poppins",
            fontSize: "15px",
            lineHeight: "20px",
            textAlign: "left",
            color: "#fff",
          }}
          onMouseEnter={(e) => {
            e.target.style.color = "#50bcd9";
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "#fff";
          }}
        >
          Events
        </h3>
        <h3
          style={{
            fontWeight: 400,
            fontFamily: "Poppins",
            fontSize: "15px",
            lineHeight: "20px",
            textAlign: "left",
            color: "#fff",
          }}
          onMouseEnter={(e) => {
            e.target.style.color = "#50bcd9";
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "#fff";
          }}
        >
          Ecards
        </h3>
      </div>
      <div>
        <h2
          style={{
            fontWeight: 600,
            fontFamily: "Poppins",
            fontSize: "20px",
            lineHeight: "24px",
            textAlign: "left",
            color: "#fff",
          }}
        >
          Help
        </h2>
        <h3
          style={{
            fontWeight: 400,
            fontFamily: "Poppins",
            fontSize: "15px",
            lineHeight: "20px",
            textAlign: "left",
            color: "#fff",
          }}
          onMouseEnter={(e) => {
            e.target.style.color = "#50bcd9";
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "#fff";
          }}
        >
          Contact Us
        </h3>
        <h3
          style={{
            fontWeight: 400,
            fontFamily: "Poppins",
            fontSize: "15px",
            lineHeight: "20px",
            textAlign: "left",
            color: "#fff",
          }}
          onMouseEnter={(e) => {
            e.target.style.color = "#50bcd9";
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "#fff";
          }}
        >
          FAQ
        </h3>
      </div>
      <div
        className="footer-outer-button"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "5%",
          paddingTop: "1%",
        }}
      >
        <button className="footer-button" onClick={navigateToLogin}>
          Login
        </button>
        <button className="footer1-button" onClick={navigateToLogin}>
          SignUp
        </button>
      </div>
    </div>
  );
}
