import React from "react";
import { Carousel } from "@trendyol-js/react-carousel";

export default function Services() {
  return (
    <div className="services-container">
      <Carousel show={3.5} slide={1} swiping={true}>
        <div
          style={{
            backgroundColor: "#2d66c3",
            width: "300px",
            height: "300px",
            objectFit: "cover",
          }}
        >
          <img
            src="/img/wedding.png"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <h2 style={{ color: "#121212s" }}>Wedding</h2>
        </div>
        <div
          style={{
            backgroundColor: "#2d66c3",
            width: "300px",
            height: "300px",
            objectFit: "cover",
          }}
        >
          <img
            src="/img/housing.png"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        <div
          style={{
            backgroundColor: "#2d66c3",
            width: "300px",
            height: "300px",
            objectFit: "cover",
          }}
        >
          <img
            src="/img/betrothal.jpeg"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        <div
          style={{
            backgroundColor: "#2d66c3",
            width: "300px",
            height: "300px",
            objectFit: "cover",
          }}
        >
          <img
            src="/img/engage.png"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </Carousel>
    </div>
  );
}
