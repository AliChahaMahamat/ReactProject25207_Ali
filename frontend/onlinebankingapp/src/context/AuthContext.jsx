import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const signUp = (user) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if the username or email already exists
    const existingUser = users.find(
      (u) => u.username === user.username || u.email === user.email
    );
    if (existingUser) {
      alert("Username or Email already exists!");
      return;
    }

    // Assign default role if not provided
    if (!user.role) {
      user.role = "user";
    }

    users.push(user); // Add new user
    localStorage.setItem("users", JSON.stringify(users));
  };

  const signIn = (username, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.username === username && u.password === password);

    if (user) {
      setCurrentUser(user); // Set current user if found
      return user;
    }

    return null; // Return null if no matching user is found
  };

  const signOut = () => setCurrentUser(null);

  const resetPassword = (email, newPassword) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find the user by email
    const user = users.find((u) => u.email === email);

    if (user) {
      user.password = newPassword; // Update the password
      localStorage.setItem("users", JSON.stringify(users)); // Save updated users
      alert("Password updated successfully!");
      return true;
    }

    alert("Email not found!");
    return false;
  };

  const updateUser = (updatedProfile) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find the existing user
    const existingUser = users.find((user) => user.username === updatedProfile.username);

    if (existingUser) {
      // Merge existing user data with updated profile
      const updatedUser = {
        ...existingUser,
        ...updatedProfile, // Updated fields from the form
      };

      // Replace the old user with the updated user in the users list
      const updatedUsers = users.map((user) =>
        user.username === updatedUser.username ? updatedUser : user
      );

      // Save updated users list
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setCurrentUser(updatedUser); // Update context with the new profile
      alert("Profile updated successfully!");
    } else {
      alert("User not found!");
    }
  };


  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signUp,
        signIn,
        signOut,
        resetPassword,
        updateUser, // Include updateUser in context
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
