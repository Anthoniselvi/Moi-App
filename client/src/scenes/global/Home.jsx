import React from "react";
import "./Navbar.css";
import Navbar from "./Navbar";
import About from "./About";
import FirstPage from "./FirstPage";
import Services from "./Services";
import ImageSlider from "./ImageSlider";
import ReactSlide from "./ReactSlide";
import Works from "./Works";
import SubWorks from "./SubWorks";
import Faq from "./Faq";
import Footer from "./Footer";
import NewSlide from "./NewSlide/NewSlide"
import NewTestimonal from "./Testimonal/Testimonal";

export default function Home() {
 

  return (
    <div className="home-container">
     <Navbar />
   {/* <ImageSlider /> */}
    <FirstPage />
    <About />
    <Services />
   
    <Works />
    <SubWorks />    
    <NewTestimonal />
    <Faq />
    <NewSlide />  {/* <ReactSlide /> */}
 
     <Footer /> 
    </div>
  );
}
