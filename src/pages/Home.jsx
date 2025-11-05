import React, { useState, useEffect, useRef } from "react";
import BrowserWindow from "../components/BrowserWindow";
import "./Home.css";
import logoImage from "../assets/GDG-removebg-preview.png";

function Home() {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef(null);

  // Fetch events from GDG Community API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);

        // Using the correct endpoint from the network tab
        // Chapter ID 2983 is for "GDG on Campus California State University, Long Beach"
        const chapterId = 2983;
        const apiUrl = `https://gdg.community.dev/api/event_slim/for_chapter/${chapterId}/?page_size=4&status=Live`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`Failed to fetch events: ${response.status}`);
        }

        const data = await response.json();

        // Log the data structure to help debug
        console.log("Fetched events data:", data);

        // API returns events in data.results array
        const eventsArray = data.results || [];

        if (!Array.isArray(eventsArray)) {
          console.warn("Events data is not an array:", eventsArray);
          throw new Error("Invalid events data format");
        }

        // Transform API data to match our meeting format
        // API already filters by status=Live, so we show all returned events
        // Sort by date and limit to first 3
        const upcomingEvents = eventsArray
          .filter((event) => {
            // Validate that event has required fields
            if (!event.start_date) {
              console.warn("Event missing start_date:", event);
              return false;
            }
            const eventDate = new Date(event.start_date);
            if (isNaN(eventDate.getTime())) {
              console.warn("Invalid date format:", event.start_date);
              return false;
            }
            return true; // Show all Live events returned by API
          })
          .sort((a, b) => {
            const dateA = new Date(a.start_date);
            const dateB = new Date(b.start_date);
            return dateA - dateB;
          })
          .slice(0, 3) // Get first 3 events
          .map((event) => {
            const eventDate = new Date(event.start_date);

            // Format date (e.g., "April 30")
            const dateOptions = { month: "long", day: "numeric" };
            const formattedDate = eventDate.toLocaleDateString(
              "en-US",
              dateOptions
            );

            // Format time (e.g., "3:00 PM")
            // Use the event timezone if available, otherwise use local timezone
            const timeOptions = {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
              timeZone: event.event_timezone || undefined,
            };
            const formattedTime = eventDate.toLocaleTimeString(
              "en-US",
              timeOptions
            );

            return {
              date: formattedDate,
              topic: event.title || "Event",
              time: formattedTime,
              url: event.static_url || null,
              id: event.id || null,
            };
          });

        console.log("Processed upcoming events:", upcomingEvents);
        setMeetings(upcomingEvents);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError(err.message);
        // Don't set fallback events - just leave meetings empty
        setMeetings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (isPaused) {
      // Clear any pending timeout when paused
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      return;
    }

    const scheduleNext = () => {
      if (isPaused) return; // Don't schedule if paused

      if (showEmailForm) {
        // Currently showing email form, switch to default after 7 seconds
        timeoutRef.current = setTimeout(() => {
          if (!isPaused) {
            setShowEmailForm(false);
            scheduleNext();
          }
        }, 7000);
      } else {
        // Currently showing default, switch to email form after 8 seconds
        timeoutRef.current = setTimeout(() => {
          if (!isPaused) {
            setShowEmailForm(true);
            scheduleNext();
          }
        }, 8000);
      }
    };

    scheduleNext();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [showEmailForm, isPaused]);

  return (
    <BrowserWindow>
      <div className="home-content-wrapper">
        <header className="hero">
          <nav className="top-nav">
            <div className="logo-container">
              <img src={logoImage} alt="GDG Logo" className="logo-img" />
              <span className="logo-text">GDG</span>
            </div>
            <div className="nav-links">
              <a href="/meetings">Mission</a>
              <a href="/community">Community</a>
              <a href="/about">About</a>
            </div>
          </nav>

          <div className="hero-content">
            <h1>Welcome to GDG @ CSULB</h1>

            <div className="content-switcher">
              {showEmailForm ? (
                <div
                  key="email-form"
                  className="content-section email-form-section"
                >
                  <p className="animated-subtitle">
                    Where our club members can find the next meetings, sign up
                    for emails, reserve spots, interact, and learn about club.
                  </p>
                  <div className="email-input-group">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="email-input"
                      onFocus={() => setIsPaused(true)}
                      onBlur={() => setIsPaused(false)}
                    />
                    <button className="subscribe-btn">Subscribe</button>
                  </div>
                </div>
              ) : (
                <div
                  key="default-content"
                  className="content-section default-content-section"
                >
                  <p className="animated-subtitle">
                    Where our club members can find the next meetings, sign
                  </p>
                  <div className="social-buttons">
                    <a
                      href="https://www.instagram.com/gdg_csulb/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-btn instagram"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                      Instagram
                    </a>
                    <a
                      href="https://discord.gg/eu9R9u4x9f"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-btn discord"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                      </svg>
                      Discord
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <section className="meetings-section">
          <h2>Upcoming Meetings</h2>
          {loading ? (
            <div className="loading-message">Loading events...</div>
          ) : error ? (
            <div className="error-message">
              Unable to load events. Please try again later.
            </div>
          ) : meetings.length > 0 ? (
            <div className="meetings-grid">
              {meetings.map((meeting, index) => (
                <div key={meeting.id || index} className="meeting-card">
                  <div className="meeting-date">{meeting.date}</div>
                  <div className="meeting-topic">{meeting.topic}</div>
                  <div className="meeting-time">{meeting.time}</div>
                  {meeting.url ? (
                    <a
                      href={meeting.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="reserve-btn"
                    >
                      Reserve Spot
                    </a>
                  ) : (
                    <button className="reserve-btn">Reserve Spot</button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="no-events-message">
              There are no events right now.
            </div>
          )}
        </section>
      </div>
    </BrowserWindow>
  );
}

export default Home;
