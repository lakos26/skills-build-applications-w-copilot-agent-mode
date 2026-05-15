import React, { useState, useEffect } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`
    : "http://localhost:8000/api/users/";

  useEffect(() => {
    console.log("Users Component - Fetching from:", apiUrl);

    fetch(apiUrl)
      .then((response) => {
        console.log("Users Component - Response status:", response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Users Component - Raw data received:", data);
        // Handle both paginated (.results) and plain array responses
        const usersData = data.results || data;
        console.log("Users Component - Processed users data:", usersData);
        setUsers(usersData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Users Component - Error fetching users:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading)
    return (
      <div className="container mt-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading users...</span>
        </div>
        <p className="ms-3 d-inline">Loading users...</p>
      </div>
    );

  if (error)
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );

  return (
    <div className="container mt-4">
      <h2 className="mb-4">🦸 OctoFit Users</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Team</th>
              <th scope="col">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id || index}>
                <th scope="row">{index + 1}</th>
                <td>
                  <strong>{user.name}</strong>
                </td>
                <td>{user.email}</td>
                <td>
                  <span
                    className={`badge ${user.team === "Team Marvel" ? "bg-danger" : "bg-primary"}`}
                  >
                    {user.team}
                  </span>
                </td>
                <td>
                  <span className="badge bg-secondary">{user.role}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3">
        <p className="text-muted">
          <strong>Total Users:</strong> {users.length}
        </p>
      </div>
    </div>
  );
};

export default Users;
