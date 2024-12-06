import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { currentUser, updateUser } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    username: currentUser.username,
    fullName: currentUser.fullName,
    email: currentUser.email,
    profilePicture: currentUser.profilePicture || "",
  });

  useEffect(() => {
    setProfile({
      ...profile,
      profilePicture: currentUser.profilePicture || "",
    });
  }, [currentUser]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfile({ ...profile, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(profile);
    navigate("/dashboard"); // Redirect to Dashboard after saving
  };

  const handleCancel = () => {
    navigate("/dashboard"); // Redirect to Dashboard without saving
  };

  return (
    <div>
      <h2>Settings</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Profile Picture:</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {profile.profilePicture && (
            <div>
              <img
                src={profile.profilePicture}
                alt="Profile"
                style={{ width: "100px", height: "100px", borderRadius: "50%" }}
              />
            </div>
          )}
        </div>
        <div>
          <label>Username:</label>
          <input type="text" value={profile.username} readOnly />
        </div>
        <div>
          <label>Full Name:</label>
          <input type="text" value={profile.fullName} readOnly />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={profile.email} readOnly />
        </div>
        <button type="submit">Save Changes</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default Settings;
