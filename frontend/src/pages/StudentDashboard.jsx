import React, { useState } from "react";
import TakeQuiz from "./TakeQuiz";
import MyScore from "./MyScore";
import QuizStats from "./QuizStats";
import "./Dashboard.css"; // New CSS file

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState(""); // "", "take", "score", "stats"

  const renderMenu = () => (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h2 className="dashboard-title">Student Dashboard</h2>
        <p className="dashboard-subtitle">Welcome! Choose an option below:</p>
        <div className="dashboard-buttons">
          <button onClick={() => setActiveTab("take")} className="dashboard-button">
            Take a Quiz
          </button>
          <button onClick={() => setActiveTab("score")} className="dashboard-button">
            My Scores
          </button>
          <button onClick={() => setActiveTab("stats")} className="dashboard-button">
            Quiz Stats
          </button>
        </div>
      </div>
    </div>
  );

  const handleBack = () => setActiveTab(""); // Reset to menu

  const renderContent = () => {
    switch (activeTab) {
      case "take":
        return <TakeQuiz onBack={handleBack} />;
      case "score":
        return <MyScore onBack={handleBack} />;
      case "stats":
        return <QuizStats onBack={handleBack} />;
      default:
        return renderMenu();
    }
  };

  return <div>{renderContent()}</div>;
};

export default StudentDashboard;
