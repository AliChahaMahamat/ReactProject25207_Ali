# ReactProject25207





-Project Name: Online Banking system

Project Overview

Business Description
The Online Banking App is a comprehensive digital solution designed to streamline banking operations and enhance user convenience.
It provides customers with a secure platform to manage their finances, perform transactions, and access banking services 24/7.

Key Business Objectives:

Accessibility: Allow customers to manage accounts and perform transactions anytime, anywhere.
Efficiency: Reduce the need for in-branch visits by enabling online services.
Security: Ensure safe and secure transactions with robust authentication mechanisms.
Role Management: Provide distinct functionalities for different user roles, such as administrators and regular users.
Technical Description
The Online Banking App is built using a modern web stack, ensuring performance, scalability, and security.

Architecture:

Front End: Developed with React.js, providing a responsive and dynamic user interface.
Back End: Powered by Spring Boot, which handles business logic and integrates with the database.
Database: PostgreSQL 
Authentication and Authorization: Role-based access control (RBAC) is implemented to differentiate between Admin and User roles.
Core Functionalities:

User Role Management: Admins can manage user accounts, while users can perform banking operations.
Secure Login System: Passwords are encrypted, and tokens (JWT) are used for session management.
Transaction Management: Users can view transaction history, transfer funds, and pay bills.
Admin Dashboard: Provides tools for managing users,and generating reports.
Features
User Role Management:
Admin:
Manage user accounts (CRUD operation).
View all users
User:
Create account
Perform transactions (transfers, bill payments).
View account balance and transaction history.
Authentication & Security:
Role-based authentication using JWT.
Password encryption with BCrypt.
Account & Transaction Management:
Account balance inquiry.
Transaction history.
Fund transfers between accounts.
User Guide
How to Sign Up
Access the App: Open the Online Banking App.
Click on Sign Up:
Provide the necessary details:
username
    fullName
    email
    dob
    idType
    idNumber
    phoneNumber
    password: 
    confirmPassword: 
Role (User or Admin, managed by Admin during account creation).
Submit the Form
How to Sign In
Navigate to the Sign-In Page.
Enter Credentials:
username: Registered username .
Password: Enter your secure password.
Role-based Access:
Based on the role (Admin/User), users will be redirected to their respective dashboards.
Login Security: A session token (JWT) is generated upon successful login.
Technologies Used
Frontend: React.js
Backend: Spring Boot
Database: PostgreSQL
Authentication: Role-based 
Password Encryption: BCrypt
Build Tools: Maven






<img width="751" alt="image" src="https://github.com/user-attachments/assets/d75db34c-441a-4c83-bc52-b3257b8760cb">












<img width="619" alt="image" src="https://github.com/user-attachments/assets/dba1a2de-00d2-4b6e-a7e1-2ea5349adb8f">



