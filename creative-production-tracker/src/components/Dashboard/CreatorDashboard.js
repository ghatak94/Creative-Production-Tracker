import React, { use, useEffect, useState } from "react";
import "./CreatorDashboard.css";

export default function CreatorDashboard({ onLogout }) {
  const [upload, setUpload] = useState({
    campaign: [],
    selectedCampaign: "",
    fileLink: "",
    deadline: "",
    notes: "",
  });

  const handleChange = (e) => {
    setUpload({ ...upload, [e.target.name]: e.target.value });
  };
  const SubmitCreativeWebhookUrl = process.env.REACT_APP_SubmitCreative_WEBHOOK_URL;
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(SubmitCreativeWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(upload),
    });

    alert("✅ Work submitted to Marketing Team!");
    setUpload({ fileLink: "", notes: "", selectedCampaign: "", campaign: [], deadline: "" });
  };

  // Fetch assigned campaigns on component mount
  useEffect(() => {
    const fetchCampaign = async () => {
      try {
      const AssignedEmailId = "ghatakmeghna94@gmail.com";
      const res = await fetch(
        `https://meghsd.app.n8n.cloud/webhook/get-campaigns?email=${encodeURIComponent(AssignedEmailId)}`
      );
      const data = await res.json();
      console.log("Fetched campaigns:", data);
      setUpload((prev) => ({
          ...prev,
          campaign: data.records || [],
        }));
    } catch (error) {
      console.error("Error fetching campaigns:", error);  
    }; 
     };
    fetchCampaign();    
  }, []); 


  return (
      <div className="dashboard-card">
        <div className="top-bar">
          <h2>🎥 Creator Upload Dashboard</h2>
          <button onClick={onLogout} className="logout-btn">Logout</button>
        </div>

        <p>Upload your completed creative for review</p>

        <form onSubmit={handleSubmit} className="upload-form">
          <select
        name="campaign"
        value={upload.selectedCampaign}
        onChange={(e) =>
          setUpload((prev) => ({ ...prev, selectedCampaign: e.target.value }))
        }
        required
      >
        <option value="" disabled>
          Select Campaign
        </option>
        {upload.campaign.length > 0 &&
          upload.campaign.map((c, index) => (
            <option key={index} value={c["Campaign"]}>
              {c["Campaign"]}
            </option>
          ))}
      </select>
          <input
            type="url"
            name="fileLink"
            placeholder="Paste your Drive / File Link"
            value={upload.fileLink}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="deadline"
            value={upload.deadline}
            onChange={handleChange}
            required
          />
          <textarea
            name="notes"
            placeholder="Any notes for the marketing team?"
            value={upload.notes}
            onChange={handleChange}
          />
          <button type="submit">Send for Approval 🚀</button>
        </form>
      </div>
 
  );
}
