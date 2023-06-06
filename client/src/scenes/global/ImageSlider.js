import React, { useState, useEffect } from "react";
import "./ImageSlider.css";

const ImageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? 7 : prevSlide - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 7 ? 0 : prevSlide + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide === 7 ? 0 : prevSlide + 1));
    }, 3000); // Change the interval time (in milliseconds) as needed

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="slider-wrapper">
      <div
        className="slide-container"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        <img src="/img/birthday.png" alt="Slide 1" />
        <img src="/img/wedding.png" alt="Slide 2" />
        <img src="/img/housing.png" alt="Slide 3" />
        <img src="/img/naming.png" alt="Slide 4" />
        <img src="/img/betrothal.png" alt="Slide 5" />
        <img src="/img/birthday.jpg" alt="Slide 6" />
        <img src="/img/engage.png" alt="Slide 7" />
        <img src="/img/house.png" alt="Slide 8" />
      </div>
      <div className="arrow-container">
        {currentSlide > 0 && (
          <button className="arrow arrow-left" onClick={handlePrevSlide}>
            &lt;
          </button>
        )}
        {currentSlide < 7 && (
          <button className="arrow arrow-right" onClick={handleNextSlide}>
            &gt;
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageSlider;
