import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { parse } from 'json2csv'; // Add this import for CSV conversion
import "./style/UsersList.css";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(2); // Number of users per page
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [deleteUser, setDeleteUser] = useState(null); // For confirmation modal
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedUsers = [...users].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setUsers(sortedUsers);
  };

  const handleDelete = (username) => {
    const updatedUsers = users.filter((user) => user.username !== username);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    setDeleteUser(null); // Close the modal
  };

  const openDeleteConfirmation = (username) => {
    setDeleteUser(username); // Set the user to be deleted
  };

  const closeDeleteConfirmation = () => {
    setDeleteUser(null); // Close the modal without deleting
  };

  const handleEdit = (user) => {
    navigate("/admin/edit-user-form", { state: { user } });
  };

  const handleCreate = () => {
    navigate("/admin/add-user-form");
  };

  const handleLogout = () => {
    navigate("/signin");
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDownload = () => {
      const csv = parse(users);
      const blob = new Blob([csv], { type: 'text/csv' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'users_list.csv';
      link.click();
    };
  // Function to open confirmation modal
    const openDownloadConfirmation = () => {
      setShowConfirmation(true);
    };

    // Function to close confirmation modal (without downloading)
    const closeDownloadConfirmation = () => {
      setShowConfirmation(false);
    };

    // Function to confirm and download
    const confirmDownload = () => {
      setShowConfirmation(false); // Close the confirmation modal
      handleDownload(); // Proceed with downloading
    };

  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  return (
    <div className="users-list-container">
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      <h2>Manage Users</h2>
      <input
        type="text"
        placeholder="Search by Username or Full Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <button onClick={handleCreate} className="add-button">
        Add New User
      </button>
      <button onClick={openDownloadConfirmation} className="download-button">
          Download Users List
       </button>
      <table className="users-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("username")}>
              Username {sortConfig.key === "username" && (sortConfig.direction === "asc" ? <FaSortUp /> : <FaSortDown />)}
            </th>
            <th onClick={() => handleSort("fullName")}>
              Full Name {sortConfig.key === "fullName" && (sortConfig.direction === "asc" ? <FaSortUp /> : <FaSortDown />)}
            </th>
            <th onClick={() => handleSort("email")}>
              Email {sortConfig.key === "email" && (sortConfig.direction === "asc" ? <FaSortUp /> : <FaSortDown />)}
            </th>
            <th>Date of Birth</th>
            <th>ID Type</th>
            <th>ID Number</th>
            <th>Phone Number</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.username}>
              <td>{user.username}</td>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.dob}</td>
              <td>{user.idType}</td>
              <td>{user.idNumber}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleEdit(user)} className="edit-button">
                  Edit
                </button>
                <button
                  onClick={() => openDeleteConfirmation(user.username)}
                  className="delete-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          className={`pagination-button ${isPrevDisabled ? 'disabled' : ''}`}
          onClick={() => paginate(currentPage - 1)}
          disabled={isPrevDisabled}
        >
          &lt; Previous
        </button>
        <span className="page-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={`pagination-button ${isNextDisabled ? 'disabled' : ''}`}
          onClick={() => paginate(currentPage + 1)}
          disabled={isNextDisabled}
        >
          Next &gt;
        </button>
      </div>



      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="confirmation-modal">
          <div className="confirmation-dialog">
            <p>Are you sure you want to download the users list?</p>
            <div className="confirmation-actions">
              <button onClick={confirmDownload} className="confirm-button">
                Yes
              </button>
              <button
                onClick={closeDownloadConfirmation}
                className="cancel-button"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Delete Confirmation Modal */}
      {deleteUser && (
        <div className="confirmation-modal">
          <div className="confirmation-dialog">
            <p>Are you sure you want to delete this user?</p>
            <div className="confirmation-actions">
              <button
                onClick={() => handleDelete(deleteUser)}
                className="confirm-delete-button"
              >
                Yes
              </button>
              <button
                onClick={closeDeleteConfirmation}
                className="cancel-delete-button"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersList;

