import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";


const EditUserForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    fullName: "",
    email: "",
    dob: "",
    idType: "",
    idNumber: "",
    phoneNumber: "",
    role: "",
  });

  useEffect(() => {
    if (location.state && location.state.user) {
      setUser(location.state.user);
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.username === user.username ? user : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    navigate("/admin/users"); // Redirect back to the user list
  };

  return (
    <div className="edit-user-container">
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit} className="edit-user-form">
        <label>
          Username (Read-Only)
          <input
            type="text"
            name="username"
            value={user.username}
            readOnly
            className="readonly-input"
          />
        </label>
        <label>
          Full Name
          <input
            type="text"
            name="fullName"
            value={user.fullName}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Date of Birth
          <input
            type="date"
            name="dob"
            value={user.dob}
            onChange={handleInputChange}
          />
        </label>
        <label>
          ID Type
          <input
            type="text"
            name="idType"
            value={user.idType}
            onChange={handleInputChange}
          />
        </label>
        <label>
          ID Number
          <input
            type="text"
            name="idNumber"
            value={user.idNumber}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Phone Number
          <input
            type="text"
            name="phoneNumber"
            value={user.phoneNumber}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Role
          <select
            name="role"
            value={user.role}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
        </label>
        <div className="form-actions">
          <button type="submit" className="save-button">
            Save Changes
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate("/admin/users")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserForm;
