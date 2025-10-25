import React, { useState } from "react";
import "./CreatBrief.css";

export default function CreateBrief() {
  const [form, setForm] = useState({
    campaignName: "",
    platform: "",
    type: "",
    deadline: "",
    assignedTo: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await fetch("https://your-n8n-webhook-url/create-brief", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setIsSubmitting(false);
    alert("🎉 Campaign brief created and sent to creator!");
    setForm({
      campaignName: "",
      platform: "",
      type: "",
      deadline: "",
      assignedTo: "",
    });
  };

  return (
    <div className="brief-container">
      <div className="brief-card">
        <h2 className="brief-title">✨ Create New Campaign Brief</h2>
        <form onSubmit={handleSubmit} className="brief-form">
          <input
            type="text"
            name="campaignName"
            placeholder="Campaign Name"
            value={form.campaignName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="platform"
            placeholder="Platform (Instagram, YouTube)"
            value={form.platform}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="type"
            placeholder="Type (Video, Image, Banner)"
            value={form.type}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="deadline"
            value={form.deadline}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="assignedTo"
            placeholder="Assigned Creator Name"
            value={form.assignedTo}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Create Brief 🚀"}
          </button>
        </form>
      </div>
    </div>
  );
}
