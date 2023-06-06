import React from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import "./Slider.css";

const ReactSlide = () => {
  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };
  const slides = [
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
    <div id="main-slider-container">
      <MdChevronLeft
        size={40}
        className="slider-icon left"
        onClick={slideLeft}
        color="red"
      />
      <div id="slider">
        {slides.map((slide, index) => {
          return (
            <div
              className="slider-card"
              key={index}
              onClick={() => slide.clickEvent()}
            >
              <div
                className="slider-card-image"
                style={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: "cover",
                }}
              ></div>
              <p className="slider-card-title">{slide.title}</p>
              <p className="slider-card-description">{slide.description}</p>
            </div>
          );
        })}
      </div>
      <MdChevronRight
        size={40}
        className="slider-icon right"
        onClick={slideRight}
        color="red"
      />
    </div>
  );
};

export default ReactSlide;
