import React from "react";
import BrowserWindow from "../components/BrowserWindow";
import "./About.css";
import logoImage from "../assets/GDG-removebg-preview.png";

function About() {
  return (
    <BrowserWindow>
      <div className="about-content">
        <h1 className="about-title">About</h1>
        <div className="title-underline"></div>

        <p className="about-text">
          We are a local community of developers who are passionate about
          Google's technologies. Our group conducts regular meetups and
          workshops on a variety of topics including web development, cloud
          computing, machine learning, and more. Whether you're a beginner or an
          experienced developer, we invite you to join us and collaborate on
          innovative projects.
        </p>

        <div className="gdg-branding">
          <img src={logoImage} alt="GDG Logo" className="gdg-logo" />
          <div className="gdg-text">
            <span className="gdg-google">Google</span>
            <span className="gdg-developers">Developers Group</span>
          </div>
        </div>
      </div>
    </BrowserWindow>
  );
}

export default About;
