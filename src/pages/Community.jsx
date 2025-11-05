import React, { useState } from "react";
import BrowserWindow from "../components/BrowserWindow";
import "./Community.css";

function Community() {
  const [activeTab, setActiveTab] = useState("officers");
  const [searchQuery, setSearchQuery] = useState("");

  const officers = [
    {
      name: "Krrish Kohli",
      title: "President",
      description: "Leads the club and coordinates activities.",
      image: "/krrish.png",
      social: {
        website: "#",
        twitter: "#",
        linkedin: "#",
      },
    },
    {
      name: "Bryan Tineo",
      title: "Webmaster",
      description: "Manages workshops and website development.",
      image: "/bryan.jpg",
      social: {
        website: "https://bryantineo.dev/",
        twitter: "https://x.com/bryanmax92001",
        linkedin: "https://www.linkedin.com/in/bryan-tineo/",
      },
    },
    {
      name: "Katherine Hernandez",
      title: "Web Developer",
      description: "Focuses on UI and web development.",
      image: "/katherine.jpg",
      social: {
        website: "#",
        twitter: "#",
        linkedin: "#",
      },
    },
    {
      name: "Kesh Jindal",
      title: "Community Lead",
      description: "Handles community engagement and outreach.",
      image: "/kesh.jpg",
      social: {
        website: "#",
        twitter: "#",
        linkedin: "#",
      },
    },
  ];

  const filteredOfficers = officers.filter(
    (officer) =>
      officer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      officer.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <BrowserWindow>
      <div className="community-content">
        <div className="community-header">
          <div className="community-tabs">
            <button
              className={`tab ${activeTab === "officers" ? "active" : ""}`}
              onClick={() => setActiveTab("officers")}
            >
              Officers
            </button>
            <button
              className={`tab ${activeTab === "members" ? "active" : ""}`}
              onClick={() => setActiveTab("members")}
            >
              Members Highlight
            </button>
          </div>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {activeTab === "officers" && (
          <div className="profiles-grid">
            {filteredOfficers.map((officer, index) => (
              <div key={index} className="profile-card">
                <div className="profile-image-container">
                  <img
                    src={officer.image}
                    alt={officer.name}
                    className="profile-image"
                  />
                </div>
                <h3 className="profile-name">{officer.name}</h3>
                <p className="profile-title">{officer.title}</p>
                <p className="profile-description">{officer.description}</p>
                <div className="profile-social">
                  <a
                    href={officer.social.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  </a>
                  <a
                    href={officer.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon twitter-icon"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a
                    href={officer.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "members" && (
          <div className="profiles-grid">
            <p className="coming-soon">Members Highlight coming soon...</p>
          </div>
        )}
      </div>
    </BrowserWindow>
  );
}

export default Community;
