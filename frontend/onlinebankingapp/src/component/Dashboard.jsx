import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import './style/Dashboard.css'; // Ensure you have your CSS file

const Dashboard = () => {
    const { currentUser, signOut } = useAuth(); // Include signOut from context
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        setUsers(storedUsers);
    }, []);

    if (!currentUser) return <p>Loading...</p>;

    const handleLogout = () => {
        signOut(); // Clear user session
        navigate("/signin"); // Redirect to login page
    };

    return (
        <div className="dashboard-container">
            <h2>Dashboard</h2>
            <p>Welcome, {currentUser.fullName}!</p>
            <p>Role: {currentUser.role}</p>

            {currentUser.profilePicture && (
                <div className="profile-picture-container">
                    <img src={currentUser.profilePicture} alt="Profile" />
                </div>
            )}

            <div className="allowed-menus">
                <p>Allowed Menus:</p>
                <ul>
                    {currentUser.role === "admin" ? (
                        <li>
                            <button onClick={() => navigate("/admin/users")}>
                                Manage Users
                            </button>
                        </li>
                    ) : (
                        <>
                            <li>User Menu</li>
                            <li>
                                <button onClick={() => navigate("/settings")}>
                                    Settings
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </div>

            <button onClick={handleLogout} className="logout-button">
                Logout
            </button>
        </div>
    );
};

export default Dashboard;
