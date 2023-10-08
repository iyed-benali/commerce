import React from 'react';
import "./Report.css"
const Report = () => {
  return (
    <div className="report-container">
      <h1>Report an Issue</h1>
      <p>
        If you encounter any problems or have concerns while using our platform, please let us know. Your feedback helps us improve our services.
      </p>
      <form>
        <div className="form-group">
          <label htmlFor="issueType">Issue Type:</label>
          <select id="issueType" name="issueType">
            <option value="bug">Bug</option>
            <option value="featureRequest">Feature Request</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="issueDescription">Issue Description:</label>
          <textarea id="issueDescription" name="issueDescription" rows="4" />
        </div>
        <button type="submit">Submit Report</button>
      </form>
    </div>
  );
};

export default Report;
