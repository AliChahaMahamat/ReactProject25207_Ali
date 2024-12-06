import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./style/SignIn.css"; // Import the CSS file

const SignIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { signIn } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = signIn(username, password);
        if (!user) {
            setError("Invalid credentials");
            return;
        }
        navigate("/dashboard");
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Sign In</h2>
            {error && <p className="error">{error}</p>}
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Sign In</button>

            <p>Or</p>

            <div className="social-login-buttons">
                <button type="button" className="social-button google-button">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
                        alt="Google logo"
                    />
                    Sign in with Google
                </button>
                <button type="button" className="social-button facebook-button">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                        alt="Facebook logo"
                    />
                    Sign in with Facebook
                </button>
            </div>

            <p>
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
            <p>
                <Link to="/ForgotPassword">Forgot Password?</Link>
            </p>
        </form>
    );
};

export default SignIn;
