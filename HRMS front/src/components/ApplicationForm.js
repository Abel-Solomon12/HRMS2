import React, { useEffect, useState } from "react";
import { getJSON, postJSON } from "../api";

export default function ApplicantForm() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    job_id: "",
    resume_url: "",
  });
  useEffect(() => {
    (async () => {
      setJobs(await getJSON("/jobs/"));
    })();
  }, []);

  function change(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  async function submit(e) {
    e.preventDefault();
    await postJSON("/applicants/", form);
    alert("Applied");
    setForm({ name: "", email: "", phone: "", job_id: "", resume_url: "" });
  }

  return (
    <form onSubmit={submit} className="card">
      <input
        name="name"
        value={form.name}
        onChange={change}
        placeholder="Name"
        required
      />
      <input
        name="email"
        value={form.email}
        onChange={change}
        placeholder="Email"
        required
      />
      <select name="job_id" value={form.job_id} onChange={change}>
        <option value="">Select job</option>
        {jobs.map((j) => (
          <option key={j.id} value={j.id}>
            {j.title}
          </option>
        ))}
      </select>
      <input
        name="resume_url"
        value={form.resume_url}
        onChange={change}
        placeholder="Resume URL"
      />
      <button type="submit">Apply</button>
    </form>
  );
}
