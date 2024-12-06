import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminMenu = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  if (currentUser?.role !== "admin") {
    navigate("/signin"); // Redirect if not admin
  }

  return (
    <div>
      <h2>Admin Menu</h2>
      <p>Welcome, {currentUser?.username} (Role: {currentUser?.role})</p>
      <ul>
        <li>
          <button onClick={() => navigate("/admin/users")}>Manage Users</button>
        </li>
        {/* You can add more admin functionalities here */}
      </ul>
    </div>
  );
};

export default AdminMenu;
