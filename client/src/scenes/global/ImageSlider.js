import React, { useState } from "react";
import "./ImageSlider.css";

const ImageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrevSlide = () => {
    setCurrentSlide(currentSlide - 1);
  };

  const handleNextSlide = () => {
    setCurrentSlide(currentSlide + 1);
  };

  return (
    <div className="slider-wrapper">
      <div
        className="slide-container"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        <img src="/img/featured.png" alt="Slide 1" />
        <img src="/img/featured2.png" alt="Slide 2" />
        <img src="/img/featured3.png" alt="Slide 3" />
      </div>
      <div className="arrow-container">
        {currentSlide > 0 && (
          <button className="arrow arrow-left" onClick={handlePrevSlide}>
            &lt;
          </button>
        )}
        {currentSlide < 2 && (
          <button className="arrow arrow-right" onClick={handleNextSlide}>
            &gt;
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageSlider;
