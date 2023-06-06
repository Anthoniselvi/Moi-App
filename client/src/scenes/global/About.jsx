import React from "react";
import "./Navbar.css";


export default function About() {
  const phImagePath = "/img/layout.png";
  return (
    <div className="about-container">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" style={{ width: "100vw" }}>
        <path style={{ width: "100vw" }}
          fill="#b7e5fc"
          //   fill-opacity="0"
          d="M0,256L1440,128L1440,0L0,0Z"
        />
      </svg>
      <div className="image-container">
        <img src={phImagePath} alt="display" />
      </div>
    </div>
  );
}
