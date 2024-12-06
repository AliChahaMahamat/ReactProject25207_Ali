import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const AddUserForm = () => {
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
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!user.username) newErrors.username = "Username is required";
    if (!user.fullName) newErrors.fullName = "Full Name is required";
    if (!user.email || !/\S+@\S+\.\S+/.test(user.email))
      newErrors.email = "Valid Email is required";
    if (!user.dob) newErrors.dob = "Date of Birth is required";
    if (!user.idType) newErrors.idType = "ID Type is required";
    if (!user.idNumber) newErrors.idNumber = "ID Number is required";
    if (!user.phoneNumber || !/^\d{10}$/.test(user.phoneNumber))
      newErrors.phoneNumber = "Valid Phone Number is required";
    if (!user.role) newErrors.role = "Role is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = [...existingUsers, user];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    navigate("/admin/users");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleCancel = () => {
    navigate("/admin/users");
  };

  return (
    <div className="add-user-form-container">
      <h2>Add New User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            className={errors.username ? "error" : ""}
          />
          {errors.username && <span className="error-text">{errors.username}</span>}
        </div>

        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={user.fullName}
            onChange={handleChange}
            className={errors.fullName ? "error" : ""}
          />
          {errors.fullName && <span className="error-text">{errors.fullName}</span>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className={errors.email ? "error" : ""}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={user.dob}
            onChange={handleChange}
            className={errors.dob ? "error" : ""}
          />
          {errors.dob && <span className="error-text">{errors.dob}</span>}
        </div>

        <div className="form-group">
          <label>ID Type</label>
          <input
            type="text"
            name="idType"
            value={user.idType}
            onChange={handleChange}
            className={errors.idType ? "error" : ""}
          />
          {errors.idType && <span className="error-text">{errors.idType}</span>}
        </div>

        <div className="form-group">
          <label>ID Number</label>
          <input
            type="text"
            name="idNumber"
            value={user.idNumber}
            onChange={handleChange}
            className={errors.idNumber ? "error" : ""}
          />
          {errors.idNumber && <span className="error-text">{errors.idNumber}</span>}
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={user.phoneNumber}
            onChange={handleChange}
            className={errors.phoneNumber ? "error" : ""}
          />
          {errors.phoneNumber && (
            <span className="error-text">{errors.phoneNumber}</span>
          )}
        </div>

        <div className="form-group">
          <label>Role</label>
          <input
            type="text"
            name="role"
            value={user.role}
            onChange={handleChange}
            className={errors.role ? "error" : ""}
          />
          {errors.role && <span className="error-text">{errors.role}</span>}
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button">
            Add User
          </button>
          <button type="button" onClick={handleCancel} className="cancel-button">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUserForm;
