import React, { useState } from "react";
import "./MarketingDashboard.css";

export default function MarketingDashboard({ onLogout }) {
  const [showForm, setShowForm] = useState(false);
  const platformOptions = ["Instagram", "YouTube", "Facebook", "Twitter", "LinkedIn"];
const typeOptions = ["Video", "Image", "Banner", "Blog Post", "Infographic"];

const [brief, setBrief] = useState({
  briefTitle: "",
  campaignName: "",
  platform: "",
  type: "",
  guidelines: "",
  deadline: "",
  assignedTo: "",
});
const briefWebhookUrl = process.env.REACT_APP_CreateBrief_WEBHOOK_URL;

  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      campaign: "Diwali 2025",
      creator: "Priya Sharma",
      link: "https://drive.google.com/example",
      status: "Pending",
    },
  ]);

  const handleBriefChange = (e) => {
    setBrief({ ...brief, [e.target.name]: e.target.value });
  };

  const handleBriefSubmit = async (e) => {
    e.preventDefault();
    await fetch(briefWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(brief),
    });

    alert("🎉 Campaign brief created and sent to creator!");
    setBrief({
      campaignName: "",
      platform: "",
      type: "",
      deadline: "",
      assignedTo: "",
    });
    setShowForm(false);
  };

  const updateStatus = async (id, status) => {
    const updated = submissions.map((s) =>
      s.id === id ? { ...s, status } : s
    );
    setSubmissions(updated);

    // await fetch("https://your-n8n-webhook-url/approve-campaign", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ id, status }),
    // });
  };

  return (
    <div className="marketing-dashboard">
      <div className="top-bar">
        <h2>📢 Marketing Dashboard</h2>
        <button onClick={onLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <div className="dashboard-content">
        <div className="left-panel">
          <button className="open-form-btn" onClick={() => setShowForm(true)}>
            ➕ Create New Campaign Brief
          </button>
        </div>

        <div className="approval-section">
          <h3>Review & Approve Submissions</h3>
          <div className="submission-list">
            {submissions.map((item) => (
              <div key={item.id} className="submission-flex">
                <div>
                <h4 style={{marginBottom: 0}}>{item.campaign}</h4>
                <p style={{marginTop: 10}}>
                  <strong>Creator:</strong> {item.creator}
                </p>
                </div>
                <div>
                <div className="action-btns">
                  <button onClick={() => updateStatus(item.id, "Approved")}>
                    Approve 
                  </button>
                  <button onClick={() => updateStatus(item.id, "Rejected")}>
                    Reject 
                  </button>
                  
                </div>
                <p className={`status ${item.status.toLowerCase()}`}>
                  Status: {item.status}
                </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Create New Campaign Brief</h3>
              <button className="close-btn" onClick={() => setShowForm(false)}>
                ✖
              </button>
            </div>
            <form onSubmit={handleBriefSubmit} className="brief-form">
              <input
                type="text"
                name="briefTitle"
                placeholder="Brief Title"
                value={brief.briefTitle}
                onChange={handleBriefChange}
                required
              />
              <input
                type="text"
                name="campaignName"
                placeholder="Campaign Name"
                value={brief.campaignName}
                onChange={handleBriefChange}
                required
              />
              
              <select
                name="platform"
                value={brief.platform}
                onChange={handleBriefChange}
                required
              >
                <option value="Select Type">Select Platform</option>
                {platformOptions.map((p, index) => (
                  <option key={index} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              <select
                name="type"
                value={brief.type}  
                onChange={handleBriefChange}
                required
              >
                <option value="Select Type">Select Type</option>
                {typeOptions.map((t, index) => (
                  <option key={index} value={t}>
                    {t} 
                  </option>
                ))}
              </select>
              
              <input
                type="date"
                name="deadline"
                value={brief.deadline}
                onChange={handleBriefChange}
                required
              />
              <input
                type="text"
                name="assignedTo"
                placeholder="Assigned Creator Name"
                value={brief.assignedTo}
                onChange={handleBriefChange}
                required
              />
              <textarea
                name="guidelines"
                placeholder="Creative Guidelines"
                value={brief.guidelines}
                onChange={handleBriefChange}
                required
              ></textarea>
              <button type="submit">Create Brief ✨</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
