import React, { useState } from "react";
import { useAuth } from "./AuthProvider";

const PasswordResetRequest = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { resetPassword } = useAuth();

  const handlePasswordReset = (e) => {
    e.preventDefault();

    const success = resetPassword(email, "new-default-password"); // Here, we just use a default password for simplicity.
    if (success) {
      setMessage("Password has been reset! You can now log in with the new password.");
    } else {
      setMessage("Error: Email not found.");
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handlePasswordReset}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PasswordResetRequest;
