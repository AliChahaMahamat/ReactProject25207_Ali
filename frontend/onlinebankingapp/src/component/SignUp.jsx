import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./style/SignUp.css"; // Import the CSS file

const SignUp = () => {
    const [form, setForm] = useState({
        username: "",
        fullName: "",
        email: "",
        dob: "",
        idType: "NationalID", // Default value for the select dropdown
        idNumber: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        role: "user",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { signUp } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            !form.username ||
            !form.fullName ||
            !form.email ||
            !form.dob ||
            !form.idNumber ||
            !form.phoneNumber ||
            !form.password ||
            !form.confirmPassword
        ) {
            setError("All fields are required");
            return;
        }
        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        signUp(form);
        navigate("/signin");
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            {error && <p className="error">{error}</p>}
            <div className="form-pair">
                <input
                    type="text"
                    placeholder="Username"
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Full Name"
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                />
            </div>
            <div className="form-pair">
                <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <input
                    type="date"
                    placeholder="Date of Birth"
                    value={form.dob}
                    onChange={(e) => setForm({ ...form, dob: e.target.value })}
                />
            </div>
            <div className="form-pair">
                <select
                    value={form.idType}
                    onChange={(e) => setForm({ ...form, idType: e.target.value })}
                >
                    <option value="NationalID">National ID</option>
                    <option value="Passport">Passport</option>
                </select>
                <input
                    type="text"
                    placeholder="ID Number"
                    value={form.idNumber}
                    onChange={(e) => setForm({ ...form, idNumber: e.target.value })}
                />
            </div>
            <div className="form-pair">
                <input
                    type="text"
                    placeholder="Phone Number"
                    value={form.phoneNumber}
                    onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
            </div>
            <div className="form-pair">
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={form.confirmPassword}
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                />
                <select
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            <button type="submit">Sign Up</button>
            <p>
                Already have an account? <Link to="/signin">Sign In</Link>
            </p>
        </form>
    );
};

export default SignUp;
