import React, { useEffect, useState } from "react";
import { getJSON, deleteReq } from "../api";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  async function load() {
    try {
      const data = await getJSON("employees/");
      setEmployees(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load employees:", error);
      setEmployees([]);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function remove(id) {
    if (!window.confirm("Delete employee?")) return;
    try {
      await deleteReq(`employees/${id}/`);
      load();
    } catch (error) {
      console.error("Failed to delete employee:", error);
    }
  }

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No employees found.
              </td>
            </tr>
          ) : (
            employees.map((e) => (
              <tr key={e.id}>
                <td>
                  {e.first_name} {e.last_name}
                </td>
                <td>{e.email}</td>
                <td>{e.department?.name || "-"}</td>
                <td>{e.designation}</td>
                <td>{e.salary}</td>
                <td>
                  <button onClick={() => remove(e.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
