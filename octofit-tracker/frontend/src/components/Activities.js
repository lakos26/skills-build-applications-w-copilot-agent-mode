import React, { useState, useEffect } from "react";

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
    : "http://localhost:8000/api/activities/";

  useEffect(() => {
    console.log("Activities Component - Fetching from:", apiUrl);

    fetch(apiUrl)
      .then((response) => {
        console.log("Activities Component - Response status:", response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Activities Component - Raw data received:", data);
        // Handle both paginated (.results) and plain array responses
        const activitiesData = data.results || data;
        console.log(
          "Activities Component - Processed activities data:",
          activitiesData,
        );
        setActivities(activitiesData);
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "Activities Component - Error fetching activities:",
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
          <span className="visually-hidden">Loading activities...</span>
        </div>
        <p className="ms-3 d-inline">Loading activities...</p>
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
      <h2 className="mb-4">🏃 OctoFit Activities</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">User</th>
              <th scope="col">Activity Type</th>
              <th scope="col">Duration (min)</th>
              <th scope="col">Calories</th>
              <th scope="col">Distance (km)</th>
              <th scope="col">Date</th>
              <th scope="col">Notes</th>
            </tr>
          </thead>
          <tbody>
            {activities.slice(0, 20).map((activity, index) => (
              <tr key={activity.id || index}>
                <th scope="row">{index + 1}</th>
                <td>
                  <strong>{activity.user_name}</strong>
                </td>
                <td>
                  <span className="badge bg-info">
                    {activity.activity_type}
                  </span>
                </td>
                <td>{activity.duration_minutes}</td>
                <td>
                  <span className="badge bg-warning text-dark">
                    {activity.calories_burned}
                  </span>
                </td>
                <td>{activity.distance_km}</td>
                <td>{new Date(activity.date).toLocaleDateString()}</td>
                <td>
                  <small className="text-muted">{activity.notes}</small>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {activities.length > 20 && (
          <p className="text-muted">
            Showing first 20 of {activities.length} activities
          </p>
        )}
      </div>
    </div>
  );
};

export default Activities;
