import React from "react";
import BrowserWindow from "../components/BrowserWindow";
import "./Meetings.css";

function Meetings() {
  return (
    <BrowserWindow>
      <div className="meetings-content">
        <h1 className="meetings-title">Mission</h1>
        <div className="title-underline"></div>

        <p className="meetings-text">
          We are a community of Developers who are trying to bring Google's
          technology into campus through Workshops tailored on hands on learning
          of technical skills using Google's platforms and services.
        </p>

        <div className="meetings-image">
          <img
            src="/Meetings.png"
            alt="GDG Meetings"
            className="meetings-illustration"
          />
        </div>

        <p className="meetings-text">
          These workshops help accelerate students into the next tech level by
          providing practical, hands-on experience with cutting-edge
          technologies and fostering a collaborative learning environment.
        </p>
      </div>
    </BrowserWindow>
  );
}

export default Meetings;
