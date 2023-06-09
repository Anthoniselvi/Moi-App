import React, { useState } from "react";

import Carousel from "react-elastic-carousel";

import "./styles.css";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3 },
  //   { width: 1200, itemsToShow: 4 },
];

function NewTestimonal() {
  const cards = [
    {
      image: "/img/cap.png",
      title: "Web Developer",
      name: "Vanessa Martinez",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit Sit veritatis labore provident non tempora odio est suntipsum",
      // clickEvent: sliderClick
    },
    {
      image: "/img/gift1.png",
      title: "Stack Developer",
      name: "Vanessa Martinez",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit Sit veritatis labore provident non tempora odio est suntipsum",
      // clickEvent: sliderClick
    },
    {
      image: "/img/tree.png",
      title: "Frontend Developer",
      name: "Vanessa Martinez",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit Sit veritatis labore provident non tempora odio est suntipsum",
      // clickEvent: sliderClick
    },
    {
      image: "/img/cap.png",
      title: "Backend Developer",
      name: "Vanessa Martinez",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit Sit veritatis labore provident non tempora odio est suntipsum",
      // clickEvent: sliderClick
    },
    {
      image: "/img/tree.png",
      title: "Web Designer",
      name: "Vanessa Martinez",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit Sit veritatis labore provident non tempora odio est suntipsum",
      // clickEvent: sliderClick
    },
    {
      image: "/img/gift1.png",
      title: "Administrator",
      name: "Vanessa Martinez",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit Sit veritatis labore provident non tempora odio est suntipsum",
      // clickEvent: sliderClick
    },
  ];

  return (
    <div className="carousel-container" id="testimonal">
      <hr className="seperator" />
      <div className="carousel-wrapper">
        <Carousel breakPoints={breakPoints}>
          {cards.map((card) => {
            return (
              <div className="card swiper-slide">
                <div className="card__image">
                  <img src={card.image} alt="card image" />
                </div>
                <div className="card__content">
                  <span className="card__title">{card.title}</span>
                  <span className="card__name">{card.name}</span>
                  <p className="card__text">{card.description}</p>
                  <button className="card__btn">View More</button>
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
}
export default NewTestimonal;
