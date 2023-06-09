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
      id="footer"
      style={{
        backgroundColor: "#22222a",
        width: "100vw",
        height: "60vh",
        padding: "5%",
        gap: "2%",
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        // alignItems: "center",
        // justifyContent: "top",
      }}
    >
      <div>
        <h1>MOI APP</h1>
        <h3>Made Easy</h3>
      </div>
      <div>
        <h2>About Moi-App</h2>
        <h3>Events</h3>
        <h3>Ecards</h3>
      </div>
      <div>
        <h2>Help</h2>
        <h3>Contact Us</h3>
        <h3>FAQ</h3>
      </div>
      <div>
        <button className="footer-button" onClick={navigateToLogin}>
          Login
        </button>
        {/* <button className="primary-button" onClick={navigateToLogin}>
          SignUp
        </button> */}
      </div>
    </div>
  );
}
