import React from "react";
import "./Navbar.css";
import Navbar from "./Navbar";
import About from "./About";
import Slider from "./Slider";
import FirstPage from "./FirstPage";
import Services from "./Services";
import ImageSlider from "./ImageSlider";
import Testimonal from "./testimonal";
import ReactSlide from "./ReactSlide";
import Works from "./Works";
import SubWorks from "./SubWorks";
import Faq from "./Faq";
import Footer from "./Footer";

export default function Home() {
 

  return (
    <div className="home-container">
     <Navbar />
    {/* <ImageSlider /> */}
     {/* <Slider /> */}
     <FirstPage />
    <About />
    <Services />
    <Testimonal />
    <ReactSlide />
    <Works />
    <SubWorks />
    <Faq />
    <Footer />
    </div>
  );
}