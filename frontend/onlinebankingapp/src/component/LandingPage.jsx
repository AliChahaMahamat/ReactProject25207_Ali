import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./style/LandingPage.css";

const LandingPage = () => (
    <div className="landing">
        <div className="landing-content">
            <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                Welcome to CBT Online Banking System
            </motion.h1>
            <motion.p
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
            >
                Experience seamless, secure, and efficient banking at your fingertips. Join us today and take control of your finances like never before.
            </motion.p>
            <motion.p
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
            >
                Whether you're here to manage your account, explore our services, or sign up for the first time, we’ve got you covered. Your journey starts here.
            </motion.p>
            <div style={{ marginTop: "1.5rem" }}>
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.5 }}
                    style={{ display: "inline-block" }}
                >
                    <Link to="/signup" style={{ margin: "0 1rem", textDecoration: "none", fontWeight: "bold" }}>
                        Sign Up
                    </Link>
                </motion.div>
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 2 }}
                    style={{ display: "inline-block" }}
                >
                    <Link to="/signin" style={{ margin: "0 1rem", textDecoration: "none", fontWeight: "bold" }}>
                        Sign In
                    </Link>
                </motion.div>
            </div>
        </div>
    </div>
);

export default LandingPage;
