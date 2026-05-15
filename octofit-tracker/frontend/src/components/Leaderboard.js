import React, { useState, useEffect } from "react";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
    : "http://localhost:8000/api/leaderboard/";

  useEffect(() => {
    console.log("Leaderboard Component - Fetching from:", apiUrl);

    fetch(apiUrl)
      .then((response) => {
        console.log(
          "Leaderboard Component - Response status:",
          response.status,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Leaderboard Component - Raw data received:", data);
        // Handle both paginated (.results) and plain array responses
        const leaderboardData = data.results || data;
        console.log(
          "Leaderboard Component - Processed leaderboard data:",
          leaderboardData,
        );
        setLeaderboard(leaderboardData);
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "Leaderboard Component - Error fetching leaderboard:",
          error,
        );
        setError(error.message);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading)
    return (
      <div className="container mt-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading leaderboard...</span>
        </div>
        <p className="ms-3 d-inline">Loading leaderboard...</p>
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
      <h2 className="mb-4">🏆 OctoFit Leaderboard</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">User</th>
              <th scope="col">Team</th>
              <th scope="col">Total Calories</th>
              <th scope="col">Total Distance (km)</th>
              <th scope="col">Total Duration (min)</th>
              <th scope="col">Total Workouts</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr
                key={entry.id || index}
                className={entry.rank <= 3 ? "table-warning" : ""}
              >
                <td>
                  <strong>#{entry.rank}</strong>
                  {entry.rank === 1 && " 🥇"}
                  {entry.rank === 2 && " 🥈"}
                  {entry.rank === 3 && " 🥉"}
                </td>
                <td>
                  <strong>{entry.user_name}</strong>
                </td>
                <td>
                  <span
                    className={`badge ${entry.team === "Team Marvel" ? "bg-danger" : "bg-primary"}`}
                  >
                    {entry.team}
                  </span>
                </td>
                <td>
                  <span className="badge bg-warning text-dark">
                    {entry.total_calories}
                  </span>
                </td>
                <td>{entry.total_distance}</td>
                <td>{entry.total_duration}</td>
                <td>
                  <span className="badge bg-info">{entry.total_workouts}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
