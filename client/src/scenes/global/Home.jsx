import React from "react";
import "./Navbar.css";
import Navbar from "./Navbar";
import About from "./About";
import Slider from "./Slider";
import FirstPage from "./FirstPage";
import Services from "./Services";
import ImageSlider from "./ImageSlider";

export default function Home() {
 

  return (
    <div className="home-container">
     <Navbar />
    <ImageSlider />
     {/* <Slider /> */}
     <FirstPage />
    <About />
    <Services />
    </div>
  );
}
