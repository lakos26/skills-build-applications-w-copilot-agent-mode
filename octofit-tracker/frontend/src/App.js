import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Users from "./components/Users";
import Teams from "./components/Teams";
import Activities from "./components/Activities";
import Leaderboard from "./components/Leaderboard";
import Workouts from "./components/Workouts";

function App() {
  const apiBaseUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
    : "http://localhost:8000";

  console.log("App Component - API Base URL:", apiBaseUrl);
  console.log(
    "App Component - CODESPACE_NAME:",
    process.env.REACT_APP_CODESPACE_NAME || "Not set (using localhost)",
  );

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              🏋️ OctoFit Tracker
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">
                    Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    Leaderboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    Workouts
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <div className="container mt-5">
                <div className="jumbotron text-center p-5">
                  <h1 className="display-3 mb-4">
                    Welcome to OctoFit Tracker! 🏋️
                  </h1>
                  <p className="lead fs-4 mb-4">
                    Track your fitness journey with your favorite superheroes
                  </p>
                  <hr className="my-4" />
                  <p className="fs-5 text-muted mb-4">
                    Navigate through the menu to view Users, Teams, Activities,
                    Leaderboard, and Workouts
                  </p>
                  <div className="row mt-5">
                    <div className="col-md-4 mb-3">
                      <div className="card border-0 shadow-sm">
                        <div className="card-body text-center">
                          <h3>🦸 12</h3>
                          <p className="text-muted">Superhero Users</p>
                          <Link
                            to="/users"
                            className="btn btn-outline-primary btn-sm"
                          >
                            View Users
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mb-3">
                      <div className="card border-0 shadow-sm">
                        <div className="card-body text-center">
                          <h3>👥 2</h3>
                          <p className="text-muted">Active Teams</p>
                          <Link
                            to="/teams"
                            className="btn btn-outline-primary btn-sm"
                          >
                            View Teams
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mb-3">
                      <div className="card border-0 shadow-sm">
                        <div className="card-body text-center">
                          <h3>🏃 80+</h3>
                          <p className="text-muted">Activities Logged</p>
                          <Link
                            to="/activities"
                            className="btn btn-outline-primary btn-sm"
                          >
                            View Activities
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5">
                    <Link
                      to="/leaderboard"
                      className="btn btn-primary btn-lg me-3"
                    >
                      🏆 View Leaderboard
                    </Link>
                    <Link to="/workouts" className="btn btn-success btn-lg">
                      💪 Browse Workouts
                    </Link>
                  </div>
                </div>
              </div>
            }
          />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
