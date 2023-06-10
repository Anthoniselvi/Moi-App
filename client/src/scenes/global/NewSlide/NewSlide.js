import React, { useState } from "react";

import Carousel from "react-elastic-carousel";

import "./styles.css";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

function NewSlide() {
  const items = [
    {
      image: "/img/birthday.png",
      title: "Birthday",
      description:
        "Capture and cherish every gift that comes your way on your birthday with GiftBook.",
      // clickEvent: sliderClick
    },
    {
      image: "/img/wedding.png",
      title: "Wedding",
      description:
        "Preserve the love and generosity of your wedding guests with GiftBook. A timeless keepsake of your cherished gifts.",
      // clickEvent: sliderClick
    },
    {
      image: "/img/house.png",
      title: "House Warming",
      description:
        "Remember the love, treasure the gifts. GiftBook helps you honor the generosity of your housewarming guests",
      // clickEvent: sliderClick
    },
    {
      image: "/img/betrothal.jpeg",
      title: "Baby Shower",
      description: "This is a fourth description",
      // clickEvent: sliderClick
    },
    {
      image: "/img/naming.jpeg",
      title: "Naming Ceremony",
      description: "This is a fifth description",
      // clickEvent: sliderClick
    },
    {
      image: "/img/house.png",
      title: "Home Function",
      description: "This is a sixth description",
      // clickEvent: sliderClick
    },
    {
      image: "/img/birthday.jpeg",
      title: "Birthday",
      description: "This is a seventh description",
      // clickEvent: sliderClick
    },
  ];

  return (
    <div className="carousel-container" style={{ backgroundColor: "#fff" }}>
      <h1
        style={{
          color: "#101a34",
          fontWeight: 600,
          fontFamily: "Poppins",
          fontSize: "30px",
        }}
      >
        Giftbook for any occassion
      </h1>
      {/* <hr className="seperator" /> */}
      <div className="carousel-wrapper">
        <Carousel breakPoints={breakPoints}>
          {items.map((item) => (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "400px",
                width: "100%",
                margin: "15px",
                // border: "1px solid grey",
                borderRadius: "8px",
                boxShadow: "0 0 8px 0 rgba(8,18,53,.25)",
              }}
              key={item.title}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{ width: "100%", height: "50%", overflow: "hidden" }}
              />
              <div style={{ width: "100%", height: "35%" }}>
                <p
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: 600,
                    fontSize: "15px",
                    color: "#101a34",
                    textAlign: "center",
                  }}
                >
                  {item.title}
                </p>
                <p
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: 400,
                    fontSize: "12px",
                    lineHeight: "20px",
                    color: "#5e6577",
                    textAlign: "center",
                  }}
                >
                  {item.description}
                </p>
              </div>
              <div style={{ width: "100%", height: "15%" }}>
                <button
                  style={{
                    backgroundColor: "#fff",
                    fontFamily: "Poppins",
                    fontWeight: 600,
                    fontSize: "12px",
                    lineHeight: "20px",
                    textAlign: "center",
                    color: "#0d5577",
                    border: "1px solid #0d5577",
                    borderRadius: "20px",
                    padding: "5px 20px",
                    width: "60%",
                    margin: "0% 20%",
                  }}
                >
                  Create Event
                </button>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
export default NewSlide;
