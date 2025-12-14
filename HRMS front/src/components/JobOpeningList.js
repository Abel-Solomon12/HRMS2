import React, { useEffect, useState } from "react";
import { getJSON, postJSON } from "../api";

export default function JobOpeningList() {
  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState("");
  const [requirements, setRequirements] = useState("");
  const [depts, setDepts] = useState([]);
  const [deptId, setDeptId] = useState("");

  async function loadData() {
    try {
      const deptData = await getJSON("departments/");
      const jobData = await getJSON("job-openings/");

      setDepts(Array.isArray(deptData) ? deptData : []);
      setJobs(Array.isArray(jobData) ? jobData : []);
    } catch (error) {
      console.error("Failed to load jobs or departments:", error);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function add(e) {
    e.preventDefault();

    const payload = {
      title,
      requirements,
      department: deptId, // serializer expects FK
    };

    try {
      await postJSON("job-openings/", payload);
      setTitle("");
      setRequirements("");
      setDeptId("");
      loadData();
    } catch (error) {
      console.error("Failed to add job:", error);
    }
  }

  return (
    <div>
      <form onSubmit={add} className="card">
        <input
          placeholder="Job title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <select
          value={deptId}
          onChange={(e) => setDeptId(e.target.value)}
          required
        >
          <option value="">Select department</option>
          {depts.map((d) => (
            <option key={d.department_id} value={d.department_id}>
              {d.name}
            </option>
          ))}
        </select>

        <input
          placeholder="Requirements"
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
        />

        <button type="submit">Add Job</button>
      </form>

      <ul>
        {jobs.length === 0 ? (
          <li>No job openings found.</li>
        ) : (
          jobs.map((j) => (
            <li key={j.id}>
              <strong>{j.title}</strong> — {j.department?.name || "-"}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
