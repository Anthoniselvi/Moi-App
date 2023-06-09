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
      description: "This is a description",
      // clickEvent: sliderClick
    },
    {
      image: "/img/engage.png",
      title: "Engagement",
      description: "This is a second description",
      // clickEvent: sliderClick
    },
    {
      image: "/img/wedding.png",
      title: "Wedding",
      description: "This is a third description",
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
    <div className="carousel-container">
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
                height: "250px",
                width: "100%",
                margin: "15px",
              }}
              key={item.title}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{ width: "100%", height: "70%" }}
              />
              <p>{item.title}</p>
              <p>{item.description}</p>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
export default NewSlide;
