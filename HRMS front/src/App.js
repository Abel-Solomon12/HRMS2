import React, { useState } from "react";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";
import DepartmentList from "./components/DepartmentList";
import JobOpeningList from "./components/JobOpeningList";
import Login from "./components/Login";

export default function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (username) => {
    setUser(username);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>HR Management System</h1>
        <button onClick={handleLogout} style={{ backgroundColor: "#e74c3c" }}>
          Logout
        </button>
      </div>

      <p>Welcome, {user}!</p>

      <div className="grid">
        <div className="card">
          <h2>Employees</h2>
          <EmployeeForm />
          <EmployeeList />
        </div>

        <div className="card">
          <h2>Departments</h2>
          <DepartmentList />
        </div>

        <div className="card">
          <h2>Job Openings</h2>
          <JobOpeningList />
        </div>
      </div>
    </div>
  );
}
