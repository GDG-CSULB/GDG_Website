import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./BrowserWindow.css";

function BrowserWindow({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/community", label: "Community" },
    { path: "/meetings", label: "Mission" },
  ];

  const handleTabClick = (path) => {
    navigate(path);
  };

  const getCurrentTab = () => {
    const currentTab = tabs.find((tab) => tab.path === location.pathname);
    return currentTab ? currentTab.label.toLowerCase() : "home";
  };

  return (
    <div className="browser-page-container">
      <div className="browser-window">
        <div className="browser-header">
          <div className="browser-controls">
            <div className="control-btn close"></div>
            <div className="control-btn minimize"></div>
            <div className="control-btn maximize"></div>
          </div>
          <div className="browser-nav">
            <div className="nav-buttons">
              <button className="nav-btn back" disabled>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="nav-btn forward" disabled>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="address-bar">
              <span className="address-text">{getCurrentTab()}</span>
            </div>
            <div className="search-icon">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </div>
          </div>
        </div>
        <div className="browser-tabs">
          {tabs.map((tab) => (
            <div
              key={tab.path}
              className={`tab ${
                location.pathname === tab.path ? "active" : ""
              }`}
              onClick={() => handleTabClick(tab.path)}
            >
              <span className="tab-title">{tab.label}</span>
            </div>
          ))}
        </div>
        <div className="browser-content">{children}</div>
      </div>
    </div>
  );
}

export default BrowserWindow;
