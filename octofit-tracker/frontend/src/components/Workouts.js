import React, { useState, useEffect } from "react";

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
    : "http://localhost:8000/api/workouts/";

  useEffect(() => {
    console.log("Workouts Component - Fetching from:", apiUrl);

    fetch(apiUrl)
      .then((response) => {
        console.log("Workouts Component - Response status:", response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Workouts Component - Raw data received:", data);
        // Handle both paginated (.results) and plain array responses
        const workoutsData = data.results || data;
        console.log(
          "Workouts Component - Processed workouts data:",
          workoutsData,
        );
        setWorkouts(workoutsData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Workouts Component - Error fetching workouts:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading)
    return (
      <div className="container mt-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading workouts...</span>
        </div>
        <p className="ms-3 d-inline">Loading workouts...</p>
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

  const getDifficultyBadge = (difficulty) => {
    const badges = {
      Beginner: "bg-success",
      Intermediate: "bg-warning text-dark",
      Advanced: "bg-danger",
    };
    return badges[difficulty] || "bg-secondary";
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">💪 OctoFit Workout Programs</h2>
      <div className="row">
        {workouts.map((workout, index) => (
          <div key={workout.id || index} className="col-md-6 mb-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-header bg-gradient">
                <h5 className="card-title mb-0 text-white">{workout.name}</h5>
              </div>
              <div className="card-body">
                <p className="card-text text-muted">{workout.description}</p>
                <div className="mb-3">
                  <span
                    className={`badge ${getDifficultyBadge(workout.difficulty)} me-2`}
                  >
                    {workout.difficulty}
                  </span>
                  <span className="badge bg-info">{workout.category}</span>
                </div>
                <div className="row mb-3">
                  <div className="col-6">
                    <small className="text-muted">Duration</small>
                    <p className="mb-0">
                      <strong>{workout.duration_minutes}</strong> min
                    </p>
                  </div>
                  <div className="col-6">
                    <small className="text-muted">Calories</small>
                    <p className="mb-0">
                      <strong>{workout.calories_estimate}</strong> kcal
                    </p>
                  </div>
                </div>
                {workout.exercises && workout.exercises.length > 0 && (
                  <div>
                    <h6 className="border-bottom pb-2">Exercises</h6>
                    <div className="table-responsive">
                      <table className="table table-sm table-hover">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Exercise</th>
                          </tr>
                        </thead>
                        <tbody>
                          {workout.exercises.map((exercise, idx) => (
                            <tr key={idx}>
                              <th scope="row">{idx + 1}</th>
                              <td>{exercise}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
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

export default Workouts;
