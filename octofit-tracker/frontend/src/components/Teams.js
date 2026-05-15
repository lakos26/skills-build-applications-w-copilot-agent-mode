import React, { useState, useEffect } from "react";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
    : "http://localhost:8000/api/teams/";

  useEffect(() => {
    console.log("Teams Component - Fetching from:", apiUrl);

    fetch(apiUrl)
      .then((response) => {
        console.log("Teams Component - Response status:", response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Teams Component - Raw data received:", data);
        // Handle both paginated (.results) and plain array responses
        const teamsData = data.results || data;
        console.log("Teams Component - Processed teams data:", teamsData);
        setTeams(teamsData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Teams Component - Error fetching teams:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading)
    return (
      <div className="container mt-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading teams...</span>
        </div>
        <p className="ms-3 d-inline">Loading teams...</p>
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
      <h2 className="mb-4">👥 OctoFit Teams</h2>
      <div className="row">
        {teams.map((team, index) => (
          <div key={team.id || index} className="col-md-6 mb-3">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-primary text-white">
                <h5 className="card-title mb-0">{team.name}</h5>
              </div>
              <div className="card-body">
                <p className="card-text text-muted">{team.description}</p>
                <div className="d-flex align-items-center mb-3">
                  <span className="badge bg-info me-2">Members</span>
                  <strong>{team.members ? team.members.length : 0}</strong>
                </div>
                {team.members && team.members.length > 0 && (
                  <div className="table-responsive">
                    <table className="table table-sm table-hover">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Member Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {team.members.map((member, idx) => (
                          <tr key={idx}>
                            <th scope="row">{idx + 1}</th>
                            <td>{member}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams;
