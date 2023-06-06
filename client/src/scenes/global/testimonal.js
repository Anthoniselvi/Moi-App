import React, { useEffect } from "react";
import Swiper from "swiper";
import "swiper/swiper-bundle.min.css";
import "./styles.css";

const Testimonal = () => {
  useEffect(() => {
    const swiper = new Swiper(".mySwiper", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 300,
        modifier: 1,
        slideShadows: false,
      },
      pagination: {
        el: ".swiper-pagination",
      },
    });

    return () => {
      swiper.destroy();
    };
  }, []);

  return (
    <section className="swiper mySwiper">
      <h1 style={{ textAlign: "center" }}>Testimonals</h1>
      <div className="swiper-wrapper">
        <div className="card swiper-slide">
          <div className="card__image">
            <img src="/img/cap.png" alt="card image" />
          </div>
          <div className="card__content">
            <span className="card__title">Web Designer</span>
            <span className="card__name">Vanessa Martinez</span>
            <p className="card__text">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit
              veritatis labore provident non tempora odio est sunt, ipsum
            </p>
            <button className="card__btn">View More</button>
          </div>
        </div>

        <div className="card swiper-slide">
          <div className="card__image">
            <img src="/img/tree.png" alt="card image" />
          </div>
          <div className="card__content">
            <span className="card__title">Ui Designer</span>
            <span className="card__name">Sarah Bowen</span>
            <p className="card__text">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit
              veritatis labore provident non tempora odio est sunt, ipsum
            </p>
            <button className="card__btn">View More</button>
          </div>
        </div>

        <div className="card swiper-slide">
          <div className="card__image">
            <img src="/img/gift1.png" alt="card image" />
          </div>
          <div className="card__content">
            <span className="card__title">Web Developer</span>
            <span className="card__name">David Murphy</span>
            <p className="card__text">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit
              veritatis labore provident non tempora odio est sunt, ipsum
            </p>
            <button className="card__btn">Learn More</button>
          </div>
        </div>

        <div className="card swiper-slide">
          <div className="card__image">
            <img src="/img/tree.png" alt="card image" />
          </div>
          <div className="card__content">
            <span className="card__title">Mobile Designer</span>
            <span className="card__name">Kelsey West</span>
            <p className="card__text">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit
              veritatis labore provident non tempora odio est sunt, ipsum
            </p>
            <button className="card__btn">Learn More</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonal;
