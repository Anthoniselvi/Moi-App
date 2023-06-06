import React from "react";
import { Carousel } from "@trendyol-js/react-carousel";

export default function Services() {
  return (
    <div className="services-container">
      <Carousel show={3.5} slide={1} swiping={true}>
        <div style={{ backgroundColor: "#2d66c3" }}>Create Account 🌐</div>
        <div style={{ backgroundColor: "#f44336" }}>Create Events👩🏻‍💻</div>

        <div style={{ backgroundColor: "#d53f8c" }}>Create Entries</div>

        <div style={{ backgroundColor: "#f27a1a" }}>View Reports</div>
      </Carousel>
    </div>
  );
}
