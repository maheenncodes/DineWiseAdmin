import React from "react";
import "./StaffCard.scss"; // Import styles for the staff card

const StaffCard = ({ user }) => {
  return (
    <div className="staff-card">
      <img src={user.photo} alt={user.name} className="staff-photo" />
      <div className="staff-details">
        <h2>{user.name}</h2>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Bio: {user.bio}</p>
      </div>
    </div>
  );
};

export default StaffCard;
